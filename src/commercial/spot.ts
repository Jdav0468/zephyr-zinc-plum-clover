export const DURATION = 41.85;

export const NARRATION = [
  "October. The nights get longer. Something is riding with the freight.",
  "The scariest thing in this business is not Halloween. It is a load nobody is watching. Don't look away.",
  "Ro-Mac finds the truck. Negotiates the rate. And stays with the load.",
  "Across the lower forty-eight. One desk. The whole way.",
  "Flatbeds. Hotshots. Dry vans. Name the piece. We'll name the truck.",
  "Ro-Mac Logistics. You are never left in the dark. Call eight one six, five oh five, forty-four oh five.",
].join(" ");

export type Beat = {
  id: string;
  at: number;
  mark: string;
  kicker: string;
  title: string;
  body: string;
};

export const beats: Beat[] = [
  {
    id: "open",
    at: 0,
    mark: "Oct",
    kicker: "October",
    title: "The nights get longer.",
    body: "Something is riding with the freight.",
  },
  {
    id: "scare",
    at: 8.43,
    mark: "Scare",
    kicker: "Don't look away",
    title: "Not Halloween.",
    body: "A load nobody is watching.",
  },
  {
    id: "stay",
    at: 16.73,
    mark: "Stay",
    kicker: "Ro-Mac",
    title: "We find the truck.",
    body: "And we do not leave it.",
  },
  {
    id: "route",
    at: 22.13,
    mark: "Route",
    kicker: "The long dark",
    title: "The lower forty-eight.",
    body: "One desk. The whole way.",
  },
  {
    id: "haul",
    at: 26.63,
    mark: "Haul",
    kicker: "Name the piece",
    title: "We'll name the truck.",
    body: "Flatbeds. Hotshots. Dry vans.",
  },
  {
    id: "sign",
    at: 33.02,
    mark: "Sign",
    kicker: "Ro-Mac Logistics",
    title: "Never left in the dark.",
    body: "(816) 505-4405",
  },
];

export type Visual = "film" | "dock" | "flatbed" | "hero";

export function beatAt(t: number): Beat {
  let current = beats[0];
  for (const beat of beats) {
    if (t >= beat.at) current = beat;
  }
  return current;
}

export function visualAt(t: number): Visual {
  if (t < 16.73) return "film";
  if (t < 26.63) return "dock";
  if (t < 33.02) return "flatbed";
  return "hero";
}

export function formatClock(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}
