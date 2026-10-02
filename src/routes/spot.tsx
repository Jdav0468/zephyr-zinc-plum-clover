import { createFileRoute } from "@tanstack/react-router";
import { SpotPlayer } from "@/components/spot-player";
import { NARRATION } from "@/commercial/spot";

export const Route = createFileRoute("/spot")({
  head: () => ({
    meta: [
      { title: "Don't look away — The Ro-Mac Brief" },
      {
        name: "description",
        content:
          "Ro-Mac's October spot. The nights get longer. The scare is a load nobody is watching.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
      },
    ],
  }),
  component: SpotPage,
});

function SpotPage() {
  return (
    <div>
      <p className="kicker">October</p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight font-semibold">Don't look away.</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        The desk usually files the news. This month we cut a spot. The scare is not a costume. It is a
        load that goes quiet while nobody is watching.
      </p>
      <div className="mt-8">
        <SpotPlayer />
      </div>
      <h2 className="mt-10 font-serif text-2xl font-semibold">The read</h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">{NARRATION}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        A man's voice carries it. Ro-Mac is a brokerage — the trucks in the picture are the ones we find
        and stay with. Call (816) 505-4405.
      </p>
    </div>
  );
}
