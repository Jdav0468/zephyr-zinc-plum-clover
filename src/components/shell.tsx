import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bookmark, Menu, Search, X } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { desks } from "@/lib/content/desks";
import { useSaved } from "@/lib/saved";
import { EmailShare } from "@/components/email-share";
import { cn } from "@/lib/cn";

export type CornerJoke = { setup: string; punchline: string };

const links = [
  { to: "/", label: "Today" },
  { to: "/archive", label: "Archive" },
  { to: "/diesel", label: "Diesel" },
  { to: "/glossary", label: "Glossary" },
  { to: "/subscribe", label: "Sign up" },
  { to: "/saved", label: "Saved" },
] as const;

export function Shell({ children, joke }: { children: ReactNode; joke: CornerJoke }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const savedCount = useSaved((s) => s.slugs.length);

  useEffect(() => {
    void useSaved.persist.rehydrate();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    void navigate({ to: "/search", search: { q: query } });
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-paper">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-3 sm:block sm:px-6">
          <a
            href="https://ro-maclogistics.com/"
            className="relative z-10 inline-flex items-center gap-2 self-start"
            title="Go to Ro-Mac Logistics' website"
          >
            <img src="/romac-mark.png" alt="" className="h-10 w-auto" />
            <span className="text-sm font-semibold text-navy underline decoration-line underline-offset-4">
              Ro-Mac's website
            </span>
          </a>
          <p className="pointer-events-none mt-2 text-center font-serif text-sm text-ink-soft italic sm:absolute sm:inset-x-0 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2 sm:text-base">
            Moving Your Future Forward
          </p>
        </div>
        <div className="mast-rule" />
        <div className="relative mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex justify-center">
            <Link to="/" className="group flex items-center gap-4">
              <img
                src="/romac-lockup.png"
                alt="Ro-Mac Logistics"
                className="h-24 w-auto sm:h-28"
              />
              <span className="border-l border-navy pl-4 text-left">
                <span className="kicker">Daily freight briefing</span>
                <span className="mt-1 block font-serif text-2xl leading-none text-ink sm:text-4xl">
                  The Brief
                </span>
              </span>
            </Link>
          </div>
          <button
            type="button"
            className="absolute top-5 right-4 inline-flex h-11 w-11 items-center justify-center border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-ink-soft sm:text-base">
            What is happening in transportation, written for people who do not
            already speak the industry.
          </p>
          <div className="mt-1 flex justify-center">
            <EmailShare label="Email this page to someone" />
          </div>
        </div>
        <div className="hairline" />
        <nav
          className="mx-auto hidden max-w-6xl flex-col px-6 md:flex"
          aria-label="Primary"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex h-11 items-center px-3 text-sm font-semibold text-ink-soft hover:text-ink"
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{
                  className: "inline-flex h-11 items-center px-3 text-sm font-semibold text-navy",
                }}
              >
                {l.label}
                {l.to === "/saved" && savedCount > 0 ? (
                  <span className="ml-2 font-mono text-xs tabular-nums text-muted">{savedCount}</span>
                ) : null}
              </Link>
            ))}
            </div>
            <form onSubmit={onSearch} className="flex items-center gap-2" role="search">
              <label className="sr-only" htmlFor="site-search">
                Search the brief
              </label>
              <input
                id="site-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the brief"
                className="h-11 w-44 border border-line bg-sheet px-3 text-sm text-ink placeholder:text-faint"
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center gap-2 bg-navy px-3 text-sm font-semibold text-sheet"
              >
                <Search className="size-4" aria-hidden="true" />
                Search
              </button>
            </form>
          </div>
          <div className="flex flex-wrap items-center border-t border-line">
            {desks
              .filter((d) => d.id !== "news" && d.id !== "diesel")
              .map((d) => (
                <Link
                  key={d.id}
                  to="/desk/$desk"
                  params={{ desk: d.id }}
                  className="inline-flex h-11 items-center px-3 text-sm text-muted hover:text-ink"
                  activeProps={{
                    className: "inline-flex h-11 items-center px-3 text-sm font-semibold text-navy",
                  }}
                >
                  {d.id === "cdl" ? "Drivers" : d.id === "laws" ? "Laws" : d.id === "fraud" ? "Fraud" : d.label}
                </Link>
              ))}
          </div>
        </nav>
        {open ? (
          <div id="mobile-nav" className="border-t border-line px-4 py-4 md:hidden">
            <form onSubmit={onSearch} className="mb-4 flex gap-2" role="search">
              <label className="sr-only" htmlFor="mobile-search">
                Search the brief
              </label>
              <input
                id="mobile-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                className="h-11 min-w-0 flex-1 border border-line bg-sheet px-3 text-sm"
              />
              <button type="submit" className="h-11 bg-navy px-4 text-sm font-semibold text-sheet">
                Search
              </button>
            </form>
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="flex h-11 items-center border border-line px-3 text-sm font-semibold"
                >
                  {l.to === "/saved" ? <Bookmark className="mr-2 size-4" /> : null}
                  {l.label}
                </Link>
              ))}
              {desks.map((d) => (
                <Link
                  key={d.id}
                  to="/desk/$desk"
                  params={{ desk: d.id }}
                  className="flex h-11 items-center border border-line px-3 text-sm"
                >
                  {d.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>
      <aside className="border-b border-line bg-wash" aria-label="Quote of the day">
        <div className="mx-auto max-w-3xl px-4 py-5 text-center sm:px-6">
          <p className="text-xs font-bold tracking-widest text-navy uppercase">Quote of the day</p>
          <p className="mt-2 font-serif text-2xl leading-tight font-semibold text-ink">{joke.punchline}</p>
          <p className="mt-2 text-sm leading-snug text-ink-soft">{joke.setup}</p>
        </div>
      </aside>
      <main className={cn("mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10")}>{children}</main>
      <footer className="border-t border-navy bg-sheet text-ink">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
          <div>
            <img src="/romac-mark.png" alt="" className="h-12 w-auto" />
            <p className="mt-4 font-serif text-2xl">The Ro-Mac Brief</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Published by Ro-Mac Logistics for shippers, warehouse teams, drivers' families,
              and anyone who shares the highway. We explain the news. We do not sell a miracle fix.
            </p>
          </div>
          <div>
            <p className="kicker">Read next</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/diesel" className="underline decoration-line underline-offset-4">Diesel desk</Link></li>
              <li><Link to="/glossary" className="underline decoration-line underline-offset-4">Glossary</Link></li>
              <li><Link to="/subscribe" className="underline decoration-line underline-offset-4">Sign up for the brief</Link></li>
            </ul>
          </div>
          <div>
            <p className="kicker">A note on the numbers</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Diesel figures are the EIA weekly on-highway series unless we say otherwise.
              Enforcement counts are attributed to the agency that published them. This is
              not legal, insurance, or contracting advice. Check the original source before
              you rely on a figure in a contract.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
