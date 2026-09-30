import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PostMeta } from "@/components/post-meta";
import { loadFeed } from "@/lib/daily.functions";
import { useSaved } from "@/lib/saved";

export const Route = createFileRoute("/saved")({
  loader: () => loadFeed(),
  head: () => ({
    meta: [
      { title: "Saved — The Ro-Mac Brief" },
      { name: "description", content: "Briefings you saved in this browser." },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { posts: all } = Route.useLoaderData();
  const [ready, setReady] = useState(false);
  const slugs = useSaved((s) => s.slugs);
  useEffect(() => setReady(true), []);
  const posts = slugs
    .map((slug) => all.find((post) => post.slug === slug))
    .filter((post): post is (typeof all)[number] => Boolean(post));

  return (
    <div>
      <p className="kicker">Saved</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">Kept on this device.</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Saved briefings stay in this browser. They are not an account, and they do not follow you to another phone.
      </p>
      {!ready ? <p className="mt-8 text-muted">Checking what you saved…</p> : null}
      {ready && posts.length === 0 ? (
        <p className="mt-8 text-ink-soft">
          Nothing saved yet. Open any briefing and use Save.{" "}
          <Link to="/archive" className="text-navy underline">
            Browse the archive.
          </Link>
        </p>
      ) : null}
      <ul className="mt-6 divide-y divide-line border-t border-ink">
        {ready
          ? posts.map((post) => (
              <li key={post.slug} className="py-5">
                <PostMeta post={post} />
                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  <Link to="/brief/$slug" params={{ slug: post.slug }} className="hover:text-navy">
                    {post.title}
                  </Link>
                </h2>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
