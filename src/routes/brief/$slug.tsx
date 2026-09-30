import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Blocks } from "@/components/blocks";
import { PostMeta } from "@/components/post-meta";
import { EmailShare } from "@/components/email-share";
import { SaveButton } from "@/components/save-button";
import { loadArticle } from "@/lib/daily.functions";

export const Route = createFileRoute("/brief/$slug")({
  loader: async ({ params }) => {
    const data = await loadArticle({ data: params.slug });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — The Ro-Mac Brief` },
          { name: "description", content: loaderData.post.dek },
        ]
      : [{ title: "Not found — The Ro-Mac Brief" }],
  }),
  notFoundComponent: MissingBrief,
  component: Article,
});

function Article() {
  const { post, related } = Route.useLoaderData();
  const filedByBot = post.slug.startsWith("edition-");

  return (
    <article className="mx-auto max-w-3xl">
      <PostMeta post={post} />
      <h1 className="mt-3 font-serif text-4xl leading-tight font-semibold">{post.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">{post.dek}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <SaveButton slug={post.slug} />
        <EmailShare label="Email this story" title={post.title} />
        <span className="text-sm text-muted">{post.minutes} minute read</span>
      </div>
      <aside className="mt-8 border border-line bg-sheet px-4 py-4 sm:px-5">
        <p className="kicker">If this is not your industry</p>
        <p className="mt-2 text-base leading-relaxed text-ink-soft">{post.plain}</p>
      </aside>
      <div className="mt-8">
        <Blocks blocks={post.blocks} />
      </div>
      <section className="mt-10 border-t border-line pt-6">
        <h2 className="font-serif text-xl font-semibold">Sources</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-soft">
          {post.sources.map((source) => (
            <li key={source.label}>
              {source.href ? (
                <a href={source.href} className="underline decoration-line underline-offset-4">
                  {source.label}
                </a>
              ) : (
                source.label
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          The Ro-Mac Brief summarizes public reporting for a general reader. Figures can be revised
          by the agency that published them. This is not legal advice.
          {filedByBot
            ? " This edition was filed by the desk bot from the sources below, not typed in by hand."
            : ""}
        </p>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-xl font-semibold">Keep reading</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {related.map((item) => (
            <li key={item.slug} className="py-4">
              <Link to="/brief/$slug" params={{ slug: item.slug }} className="font-serif text-lg hover:text-navy">
                {item.title}
              </Link>
              <p className="mt-1 text-sm text-muted">{item.dek}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function MissingBrief() {
  return (
    <div className="mx-auto max-w-xl py-10">
      <p className="kicker">Missing</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">That briefing is not on the desk.</h1>
      <Link to="/archive" className="mt-6 inline-flex h-11 items-center bg-navy px-4 text-sm font-semibold text-sheet">
        Browse the archive
      </Link>
    </div>
  );
}
