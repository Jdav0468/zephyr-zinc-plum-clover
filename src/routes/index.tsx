import { createFileRoute, Link } from "@tanstack/react-router";
import { DieselSnapshot } from "@/components/diesel-panel";
import { DeskBot } from "@/components/desk-bot";
import { SignupForm } from "@/components/signup";
import { PostMeta } from "@/components/post-meta";
import { desks } from "@/lib/content/desks";
import { starterSlugs } from "@/lib/content/posts";
import { loadFeed } from "@/lib/daily.functions";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/")({
  loader: () => loadFeed(),
  component: Home,
});

function Home() {
  const { posts, diesel } = Route.useLoaderData();
  const lead = posts[0];
  const rest = posts.slice(1, 5);
  const starters = starterSlugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  if (!lead) return null;
  const filedByBot = lead.slug.startsWith("edition-");

  return (
    <div>
      <p className="text-sm text-muted">
        <time dateTime={lead.date}>{formatDate(lead.date, true)}</time>
        <span className="px-2 text-faint">/</span>
        {filedByBot ? "Filed by the desk bot" : "Edition for readers outside the cab"}
      </p>
      <div className="mt-2">
        <DeskBot />
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <article className="lg:col-span-2">
          <PostMeta post={lead} />
          <h1 className="mt-3 font-serif text-4xl leading-tight font-semibold text-ink">
            <Link to="/brief/$slug" params={{ slug: lead.slug }} className="hover:text-navy">
              {lead.title}
            </Link>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{lead.dek}</p>
          <div className="mt-5 border-l-2 border-navy pl-4">
            <p className="kicker">If this is not your industry</p>
            <p className="mt-2 text-base leading-relaxed text-ink-soft">{lead.plain}</p>
          </div>
          <Link
            to="/brief/$slug"
            params={{ slug: lead.slug }}
            className="mt-6 inline-flex h-11 items-center bg-navy px-4 text-sm font-semibold text-sheet"
          >
            Read the briefing
          </Link>
        </article>
        <DieselSnapshot tick={diesel} />
      </div>

      <section className="mt-12 border-t border-ink pt-8">
        <h2 className="font-serif text-2xl font-semibold">Also on the desk</h2>
        <ul className="mt-4 divide-y divide-line">
          {rest.map((post) => (
            <li key={post.slug} className="py-5">
              <PostMeta post={post} />
              <h3 className="mt-2 font-serif text-2xl leading-snug font-semibold">
                <Link to="/brief/$slug" params={{ slug: post.slug }} className="hover:text-navy">
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 max-w-3xl text-ink-soft">{post.dek}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <SignupForm />
      </section>

      <section className="mt-12 border border-navy bg-sheet px-5 py-8 sm:px-8">
        <p className="kicker">New here</p>
        <h2 className="mt-2 max-w-xl font-serif text-3xl leading-tight font-semibold">
          Four pieces that make the rest of the news readable.
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {starters.map((post, i) => (
            <li key={post.slug}>
              <Link
                to="/brief/$slug"
                params={{ slug: post.slug }}
                className="block border border-line p-4 hover:border-navy"
              >
                <span className="font-mono text-sm text-navy">0{i + 1}</span>
                <span className="mt-2 block font-serif text-xl leading-snug">{post.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold">Desks</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {desks.map((desk) => (
            <li key={desk.id}>
              <Link
                to="/desk/$desk"
                params={{ desk: desk.id }}
                className="flex h-full flex-col border border-line bg-sheet p-4 hover:border-navy"
              >
                <span className="kicker">{desk.label}</span>
                <span className="mt-2 text-sm leading-relaxed text-ink-soft">{desk.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
