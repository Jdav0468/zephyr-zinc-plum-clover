import { createFileRoute, Link } from "@tanstack/react-router";
import { PostMeta } from "@/components/post-meta";
import { loadSearch } from "@/lib/daily.functions";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  loaderDeps: ({ search }) => ({ q: search.q }),
  loader: ({ deps }) => loadSearch({ data: deps.q }),
  head: () => ({
    meta: [
      { title: "Search — The Ro-Mac Brief" },
      { name: "description", content: "Search Ro-Mac Logistics briefings." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, results } = Route.useLoaderData();
  return (
    <div>
      <p className="kicker">Search</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">
        {q ? `Results for “${q}”` : "Search the brief"}
      </h1>
      {!q ? (
        <p className="mt-3 max-w-xl text-ink-soft">
          Try diesel, English, chameleon, surcharge, or medical card.
        </p>
      ) : (
        <p className="mt-3 text-sm text-muted">
          {results.length} {results.length === 1 ? "briefing" : "briefings"}
        </p>
      )}
      <ul className="mt-6 divide-y divide-line border-t border-ink">
        {results.map((post) => (
          <li key={post.slug} className="py-5">
            <PostMeta post={post} />
            <h2 className="mt-2 font-serif text-2xl font-semibold">
              <Link to="/brief/$slug" params={{ slug: post.slug }} className="hover:text-navy">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-ink-soft">{post.dek}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
