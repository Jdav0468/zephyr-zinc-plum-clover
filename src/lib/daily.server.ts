import { z } from "zod";
import { getSql, type Sql } from "@/lib/db";
import { desks, type DeskId } from "@/lib/content/desks";
import { latestDiesel } from "@/lib/content/diesel";
import {
  jokeForDate,
  jokeNeedsRewrite,
  type DailyJoke,
} from "@/lib/content/jokes";
import {
  relatedFrom,
  searchIn,
  withEditions,
  type Block,
  type Post,
  type Source,
} from "@/lib/content/posts";

export type DieselLive = {
  week: string;
  label: string;
  price: number;
  sourceLabel: string;
  sourceHref: string | null;
};

const deskIds = desks.map((desk) => desk.id) as [DeskId, ...DeskId[]];

const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("p"), text: z.string().min(40).max(900) }),
  z.object({ type: z.literal("h"), text: z.string().min(3).max(120) }),
  z.object({
    type: z.literal("ul"),
    items: z.array(z.string().min(8).max(280)).min(2).max(5),
  }),
  z.object({
    type: z.literal("note"),
    title: z.string().min(3).max(80),
    text: z.string().min(40).max(700),
  }),
]);

const editionSchema = z.object({
  title: z.string().min(12).max(140),
  dek: z.string().min(40).max(320),
  desk: z.enum(deskIds),
  minutes: z.number().int().min(3).max(9),
  plain: z.string().min(40).max(500),
  blocks: z.array(blockSchema).min(4).max(10),
  sources: z
    .array(
      z.object({
        label: z.string().min(8).max(180),
        href: z.string().url(),
      }),
    )
    .min(2)
    .max(5),
  diesel: z
    .object({
      week: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      label: z.string().min(3).max(40),
      price: z.number().gt(2).lt(12),
      sourceLabel: z.string().min(8).max(180),
      sourceHref: z.string().url(),
    })
    .nullable(),
});

export type EnsureResult =
  | { state: "ready"; created: boolean; title: string; jokeCreated: boolean }
  | { state: "pending"; jokeCreated: boolean }
  | { state: "skipped"; reason: string; jokeCreated: boolean };

type EditionRow = {
  slug: string;
  edition_date: string;
  title: string | null;
  dek: string | null;
  desk: string | null;
  minutes: number | null;
  plain: string | null;
  blocks: unknown;
  sources: unknown;
};

const jobs = globalThis as typeof globalThis & {
  __romacDaily?: Promise<EnsureResult>;
};

function chicagoToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function asJson<T>(value: unknown): T | null {
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }
  return value as T;
}

function rowToPost(row: EditionRow): Post | null {
  if (!row.title || !row.dek || !row.plain || !row.desk || row.minutes == null) return null;
  if (!deskIds.includes(row.desk as DeskId)) return null;
  const blocks = asJson<Block[]>(row.blocks);
  const sources = asJson<Source[]>(row.sources);
  if (!Array.isArray(blocks) || !Array.isArray(sources)) return null;
  const date = String(row.edition_date).slice(0, 10);
  return {
    slug: row.slug,
    title: row.title,
    dek: row.dek,
    date,
    desk: row.desk as DeskId,
    minutes: row.minutes,
    plain: row.plain,
    blocks,
    sources,
  };
}

async function readEditions(sql: Sql): Promise<Post[]> {
  const rows = await sql.query<EditionRow>(
    `select slug, edition_date, title, dek, desk, minutes, plain, blocks, sources
     from editions
     where status = 'ready'
     order by edition_date desc`,
  );
  return rows.map(rowToPost).filter((post): post is Post => Boolean(post));
}

async function readDiesel(sql: Sql): Promise<DieselLive | null> {
  const rows = await sql.query<{
    week_of: string;
    price: string;
    label: string;
    source_label: string;
    source_href: string | null;
  }>(
    `select week_of, price, label, source_label, source_href
     from diesel_ticks
     order by week_of desc
     limit 1`,
  );
  const row = rows[0];
  if (!row) return null;
  const price = Number(row.price);
  const week = String(row.week_of).slice(0, 10);
  if (!Number.isFinite(price) || week <= latestDiesel.week) return null;
  return {
    week,
    label: row.label,
    price,
    sourceLabel: row.source_label,
    sourceHref: row.source_href,
  };
}

async function merged(sql: Sql) {
  const [editions, diesel] = await Promise.all([readEditions(sql), readDiesel(sql)]);
  return { posts: withEditions(editions), diesel };
}

export type { DailyJoke };

async function ensureJoke(sql: Sql, date: string): Promise<boolean> {
  const have = await sql.query<DailyJoke>(
    `select setup, punchline from daily_jokes where joke_date = $1::date`,
    [date],
  );
  if (have[0] && !jokeNeedsRewrite(have[0])) return false;
  const joke = jokeForDate(date);
  const inserted = await sql.query<{ joke_date: string }>(
    `insert into daily_jokes (joke_date, setup, punchline)
     values ($1::date, $2, $3)
     on conflict (joke_date) do update
       set setup = excluded.setup, punchline = excluded.punchline
     returning joke_date::text`,
    [date, joke.setup, joke.punchline],
  );
  return inserted.length > 0;
}

export async function readLatestJoke(sql: Sql): Promise<DailyJoke> {
  const rows = await sql.query<DailyJoke>(
    `select setup, punchline from daily_jokes order by joke_date desc limit 1`,
  );
  return rows[0] ?? jokeForDate(chicagoToday());
}

function extractText(body: Record<string, unknown>): string {
  if (typeof body.output_text === "string") return body.output_text;
  if (typeof body.content === "string") return body.content;
  const chunks: string[] = [];
  const output = Array.isArray(body.output) ? body.output : [];
  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const content = (item as { content?: unknown }).content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (!part || typeof part !== "object") continue;
      const text = (part as { text?: unknown }).text;
      if (typeof text === "string") chunks.push(text);
    }
  }
  return chunks.join("\n");
}

function extractCitations(body: Record<string, unknown>): string[] {
  const urls = new Set<string>();
  const add = (value: unknown) => {
    if (typeof value === "string" && value.startsWith("http")) urls.add(value);
    if (value && typeof value === "object" && "url" in value) {
      const url = (value as { url?: unknown }).url;
      if (typeof url === "string" && url.startsWith("http")) urls.add(url);
    }
  };
  if (Array.isArray(body.citations)) body.citations.forEach(add);
  const output = Array.isArray(body.output) ? body.output : [];
  for (const item of output) {
    if (!item || typeof item !== "object") continue;
    const content = (item as { content?: unknown }).content;
    if (!Array.isArray(content)) continue;
    for (const part of content) {
      if (!part || typeof part !== "object") continue;
      const annotations = (part as { annotations?: unknown }).annotations;
      if (Array.isArray(annotations)) annotations.forEach(add);
    }
  }
  return [...urls];
}

function parseJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = (fenced?.[1] ?? text).trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("no json");
  return JSON.parse(raw.slice(start, end + 1));
}

function hostOf(href: string): string {
  return new URL(href).host.replace(/^www\./, "");
}

function cited(href: string, citations: string[]): boolean {
  if (!href.startsWith("https://")) return false;
  if (citations.length === 0) return true;
  const host = hostOf(href);
  return citations.some((citation) => {
    try {
      return hostOf(citation) === host;
    } catch {
      return citation.includes(host);
    }
  });
}

async function assignedDesk(sql: Sql): Promise<DeskId> {
  const rows = await sql.query<{ count: number }>(
    `select count(*)::int as count from editions where status = 'ready'`,
  );
  const count = Number(rows[0]?.count ?? 0);
  return deskIds[count % deskIds.length] ?? "news";
}

async function writeEdition(sql: Sql, date: string, post: Post) {
  await sql.query(
    `update editions
     set status = 'ready', title = $1, dek = $2, desk = $3, minutes = $4, plain = $5,
         blocks = $6::jsonb, sources = $7::jsonb, error = null, ready_at = now()
     where edition_date = $8::date`,
    [
      post.title,
      post.dek,
      post.desk,
      post.minutes,
      post.plain,
      JSON.stringify(post.blocks),
      JSON.stringify(post.sources),
      date,
    ],
  );
}

async function draftEdition(sql: Sql, date: string, titles: string[], desk: DeskId): Promise<Post> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) throw new Error("AI is not available");

  const prompt = `You write one edition of The Ro-Mac Brief, a daily freight briefing for readers who do NOT work in trucking.
Today is ${date} (America/Chicago). Prefer a development reported in the last 7 days.
Assigned desk: ${desk}. Use that desk if you can verify a story. If you cannot, pick another desk from: ${deskIds.join(", ")}.
Do not repeat these headlines: ${titles.join(" | ") || "(none)"}.

Cover only what you can verify with web search: trucking news, laws, FMCSA or DOT action, diesel prices, cargo theft, illegal or non-domiciled CDLs, English-proficiency removals, or fraudulent carriers.
Check https://cdllife.com/news/ every time. Prefer a CDLLife story from the last 7 days when it is on those subjects, and cite the CDLLife article. Also cite the government, court, or company page behind it when you can find one. CDLLife is a trade outlet: if it is reporting a lawsuit or an accusation, say it is an allegation and do not treat it as proved.
The last verified EIA weekly U.S. on-highway diesel in this archive is $${latestDiesel.price.toFixed(3)} for the week of ${latestDiesel.week}. Set diesel to null unless you find a NEWER official EIA weekly U.S. number and an eia.gov URL. Never use a CDLLife, AAA, state, or truck-stop price for that field.

Write plain English. Open jargon in the same sentence you use it. Include one note block titled "Why this matters if you don't work in trucking".
Every figure must appear in a source you cite. Do not invent numbers, quotes, or company accusations. If a case is unfinished, say so.
Return ONLY JSON with this shape:
{"title":"","dek":"","desk":"${desk}","minutes":6,"plain":"","blocks":[{"type":"p","text":""},{"type":"h","text":""},{"type":"ul","items":["",""]},{"type":"note","title":"Why this matters if you don't work in trucking","text":""}],"sources":[{"label":"","href":"https://"}],"diesel":null}`;

  const response = await fetch("https://api.x.ai/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    signal: AbortSignal.timeout(50_000),
    body: JSON.stringify({
      model: "grok-4.5",
      max_output_tokens: 1800,
      input: [{ role: "user", content: prompt }],
      tools: [{ type: "web_search" }],
    }),
  });
  if (!response.ok) throw new Error(`xAI API error ${response.status}`);
  const body = (await response.json()) as Record<string, unknown>;
  const parsed = editionSchema.parse(parseJson(extractText(body)));
  const citations = extractCitations(body);
  const sources = parsed.sources.filter((source) => source.href.startsWith("https://"));
  if (sources.length < 2) throw new Error("need two https sources");
  if (citations.length > 0 && !sources.some((source) => cited(source.href, citations))) {
    throw new Error("sources were not in the search results");
  }
  if (!parsed.blocks.some((block) => block.type === "note")) throw new Error("missing note");

  const diesel = parsed.diesel;
  if (
    diesel &&
    diesel.week > latestDiesel.week &&
    diesel.sourceHref.startsWith("https://") &&
    hostOf(diesel.sourceHref).endsWith("eia.gov") &&
    (citations.length === 0 || cited(diesel.sourceHref, citations))
  ) {
    await sql.query(
      `insert into diesel_ticks (week_of, price, label, source_label, source_href)
       values ($1::date, $2, $3, $4, $5)
       on conflict (week_of) do nothing`,
      [diesel.week, diesel.price, diesel.label, diesel.sourceLabel, diesel.sourceHref],
    );
  }

  return {
    slug: `edition-${date}`,
    title: parsed.title,
    dek: parsed.dek,
    date,
    desk: parsed.desk,
    minutes: parsed.minutes,
    plain: parsed.plain,
    blocks: parsed.blocks,
    sources,
  };
}

async function runEnsure(): Promise<EnsureResult> {
  const date = chicagoToday();
  const slug = `edition-${date}`;
  const sql = await getSql();
  const jokeCreated = await ensureJoke(sql, date);

  const ready = await sql.query<EditionRow>(
    `select slug, edition_date, title, dek, desk, minutes, plain, blocks, sources
     from editions where edition_date = $1::date and status = 'ready'`,
    [date],
  );
  const existing = ready[0] ? rowToPost(ready[0]) : null;
  if (existing) return { state: "ready", created: false, title: existing.title, jokeCreated };
  if (!process.env.XAI_API_KEY) return { state: "skipped", reason: "unavailable", jokeCreated };

  const claimed = await sql.query<{ attempts: number }>(
    `insert into editions (slug, edition_date, status, attempts, started_at)
     values ($1, $2::date, 'pending', 1, now())
     on conflict (edition_date) do nothing
     returning attempts`,
    [slug, date],
  );

  let own = claimed.length > 0;
  if (!own) {
    const stolen = await sql.query<{ attempts: number }>(
      `update editions
       set status = 'pending', attempts = attempts + 1, started_at = now(), error = null
       where edition_date = $1::date
         and status <> 'ready'
         and attempts < 3
         and (status = 'failed' or started_at < now() - interval '3 minutes')
       returning attempts`,
      [date],
    );
    own = stolen.length > 0;
  }

  if (!own) {
    const state = await sql.query<{ status: string; attempts: number }>(
      `select status, attempts from editions where edition_date = $1::date`,
      [date],
    );
    const row = state[0];
    if (row?.status === "ready") {
      return { state: "ready", created: false, title: slug, jokeCreated };
    }
    if (row && row.attempts >= 3 && row.status === "failed") {
      return { state: "skipped", reason: "paused", jokeCreated };
    }
    return { state: "pending", jokeCreated };
  }

  try {
    const feed = await merged(sql);
    const desk = await assignedDesk(sql);
    const post = await draftEdition(
      sql,
      date,
      feed.posts.slice(0, 8).map((item) => item.title),
      desk,
    );
    await writeEdition(sql, date, post);
    return { state: "ready", created: true, title: post.title, jokeCreated };
  } catch (error) {
    const message = error instanceof Error ? error.message : "draft failed";
    await sql.query(
      `update editions set status = 'failed', error = $2 where edition_date = $1::date and status = 'pending'`,
      [date, message.slice(0, 300)],
    );
    return { state: "skipped", reason: message.slice(0, 180), jokeCreated };
  }
}

export function ensureToday(): Promise<EnsureResult> {
  jobs.__romacDaily ??= runEnsure().finally(() => {
    jobs.__romacDaily = undefined;
  });
  return jobs.__romacDaily;
}

export async function loadFeedData() {
  const sql = await getSql();
  return merged(sql);
}

export async function loadArticleData(slug: string) {
  const sql = await getSql();
  const { posts } = await merged(sql);
  const post = posts.find((item) => item.slug === slug);
  if (!post) return null;
  return { post, related: relatedFrom(posts, post) };
}

export async function loadSearchData(q: string) {
  const sql = await getSql();
  const { posts } = await merged(sql);
  return { q, results: searchIn(posts, q) };
}

export async function loadDeskData(id: string) {
  const sql = await getSql();
  const { posts } = await merged(sql);
  return posts.filter((post) => post.desk === id);
}
