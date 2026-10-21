import { createServerFn } from "@tanstack/react-start";
import type { EnsureResult } from "@/lib/daily.server";

export const loadFeed = createServerFn({ method: "GET" }).handler(async () => {
  const { loadFeedData } = await import("@/lib/daily.server");
  return loadFeedData();
});

export const loadArticle = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const { loadArticleData } = await import("@/lib/daily.server");
    return loadArticleData(slug);
  });

export const loadSearch = createServerFn({ method: "GET" })
  .validator((q: string) => (typeof q === "string" ? q.slice(0, 80) : ""))
  .handler(async ({ data: q }) => {
    const { loadSearchData } = await import("@/lib/daily.server");
    return loadSearchData(q);
  });

export const loadDesk = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { loadDeskData } = await import("@/lib/daily.server");
    return loadDeskData(id);
  });

export const fileToday = createServerFn({ method: "POST" }).handler(async (): Promise<EnsureResult> => {
  const { ensureToday } = await import("@/lib/daily.server");
  return ensureToday();
});

function chicagoToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export const loadTodayJoke = createServerFn({ method: "GET" }).handler(async () => {
  const { jokeForDate } = await import("@/lib/content/jokes");
  return jokeForDate(chicagoToday());
});
