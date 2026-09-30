import { createFileRoute, Link } from "@tanstack/react-router";
import { PostMeta } from "@/components/post-meta";
import { loadFeed } from "@/lib/daily.functions";

export const Route = createFileRoute("/archive")({
  loader: () => loadFeed(),
  head: () => ({
    meta: [
      { title: "Archive — The Ro-Mac Brief" },
      { name: "description", content: "Every Ro-Mac Logistics briefing, newest first." },
    ],
  }),
  component: ArchivePage,
});

function ArchivePage() {
  const { posts } = Route.useLoaderData();
  return (
    <div>
      <p className="kicker">Archive</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">Every briefing</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        {posts.length} pieces, newest first. Start with any headline. Each one opens with a
        plain-language box if you do not work in freight.
      </p>
      <ul className="mt-8 divide-y divide-line border-t border-ink">
        {posts.map((post) => (
          <li key={post.slug} className="grid gap-2 py-5 md:grid-cols-4">
            <PostMeta post={post} />
            <div className="md:col-span-3">
              <h2 className="font-serif text-2xl font-semibold">
                <Link to="/brief/$slug" params={{ slug: post.slug }} className="hover:text-navy">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-ink-soft">{post.dek}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
