import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PostMeta } from "@/components/post-meta";
import { getDesk } from "@/lib/content/desks";
import { loadDesk } from "@/lib/daily.functions";

export const Route = createFileRoute("/desk/$desk")({
  loader: async ({ params }) => {
    const desk = getDesk(params.desk);
    if (!desk) throw notFound();
    const posts = await loadDesk({ data: desk.id });
    return { desk, posts };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.desk.label} — The Ro-Mac Brief` },
          { name: "description", content: loaderData.desk.blurb },
        ]
      : [{ title: "Desk — The Ro-Mac Brief" }],
  }),
  notFoundComponent: () => (
    <div>
      <h1 className="font-serif text-4xl font-semibold">That desk does not exist.</h1>
      <Link to="/" className="mt-4 inline-flex h-11 items-center text-navy underline">
        Back to today
      </Link>
    </div>
  ),
  component: DeskPage,
});

function DeskPage() {
  const { desk, posts } = Route.useLoaderData();
  return (
    <div>
      <p className="kicker">Desk</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">{desk.label}</h1>
      <p className="mt-3 max-w-2xl text-lg text-ink-soft">{desk.blurb}</p>
      <ul className="mt-8 divide-y divide-line border-t border-ink">
        {posts.map((post) => (
          <li key={post.slug} className="py-6">
            <PostMeta post={post} />
            <h2 className="mt-2 font-serif text-2xl font-semibold">
              <Link to="/brief/$slug" params={{ slug: post.slug }} className="hover:text-navy">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 max-w-3xl text-ink-soft">{post.dek}</p>
          </li>
        ))}
      </ul>
      {posts.length === 0 ? <p className="mt-6 text-muted">Nothing filed on this desk yet.</p> : null}
    </div>
  );
}
