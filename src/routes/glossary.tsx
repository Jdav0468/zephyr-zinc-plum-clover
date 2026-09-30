import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { glossary } from "@/lib/content/glossary";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Glossary — The Ro-Mac Brief" },
      {
        name: "description",
        content: "Plain-language definitions for the words trucking news assumes you already know.",
      },
    ],
  }),
  component: GlossaryPage,
});

function GlossaryPage() {
  const [q, setQ] = useState("");
  const terms = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return glossary;
    return glossary.filter((term) =>
      `${term.term} ${term.aka ?? ""} ${term.def}`.toLowerCase().includes(needle),
    );
  }, [q]);

  return (
    <div>
      <p className="kicker">Glossary</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">Words the industry skips past.</h1>
      <p className="mt-3 max-w-2xl text-lg text-ink-soft">
        If a headline uses a term you do not know, it is probably here. These are working
        definitions for a general reader, not the full regulation.
      </p>
      <label className="mt-6 block max-w-md text-sm font-semibold" htmlFor="term-filter">
        Filter
        <input
          id="term-filter"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try CDL, broker, surcharge"
          className="mt-1 h-11 w-full border border-line bg-sheet px-3 font-normal"
        />
      </label>
      <p className="mt-3 text-sm text-muted">{terms.length} terms</p>
      <dl className="mt-4 divide-y divide-line border-t border-ink">
        {terms.map((term) => (
          <div key={term.term} className="grid gap-2 py-5 md:grid-cols-3">
            <dt className="font-serif text-xl font-semibold">
              {term.term}
              {term.aka ? <span className="mt-1 block font-sans text-sm font-normal text-muted">Also called {term.aka}</span> : null}
            </dt>
            <dd className="text-ink-soft md:col-span-2">{term.def}</dd>
          </div>
        ))}
      </dl>
      {terms.length === 0 ? <p className="mt-4 text-muted">No term matches that.</p> : null}
    </div>
  );
}
