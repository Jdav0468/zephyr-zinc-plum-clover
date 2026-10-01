export type DailyJoke = { setup: string; punchline: string };

export const jokeBank: DailyJoke[] = [
  {
    setup: "The broker said it was a quick in and out.",
    punchline: "So was the Titanic.",
  },
  {
    setup: "Dispatch asked for an update.",
    punchline: "I said I was still a truck. They seemed disappointed.",
  },
  {
    setup: "The appointment was 8 sharp.",
    punchline: "The dock was 8 dull, and proud of it.",
  },
  {
    setup: "Shipper said the freight was ready.",
    punchline: "The freight has not been informed.",
  },
  {
    setup: "I asked the scale for a second opinion.",
    punchline: "It said the first one was already rude enough.",
  },
  {
    setup: "The lumper fee included a tip.",
    punchline: "The tip was come back tomorrow.",
  },
  {
    setup: "GPS said I had arrived.",
    punchline: "The guard said that was between me and my therapist.",
  },
  {
    setup: "They called it driver assist.",
    punchline: "I assisted by holding the clipboard and judging everyone.",
  },
  {
    setup: "The receiver is driver friendly.",
    punchline: "They have a chair. The chair has seen things.",
  },
  {
    setup: "Nothing says welcome like a scale.",
    punchline: "And a number that just ended your whole morning.",
  },
  {
    setup: "The load was fragile.",
    punchline: "The dock treated that as a suggestion.",
  },
  {
    setup: "I backed in on the first try.",
    punchline: "The camera was off. I will be insufferable about this.",
  },
  {
    setup: "Detention starts after two hours.",
    punchline: "The clock starts when the dock feels emotionally ready.",
  },
  {
    setup: "The coffee could strip paint.",
    punchline: "It also has its own MC number.",
  },
  {
    setup: "Door 12 sent me to door 12.",
    punchline: "We are in counseling.",
  },
  {
    setup: "The tarp was a fifteen-minute job.",
    punchline: "The wind was not copied on that email, and it is furious.",
  },
  {
    setup: "Team drivers, the rate con said.",
    punchline: "The team was me and a thermos with trust issues.",
  },
  {
    setup: "Wide load means extra room.",
    punchline: "The bridge still gets a vote, and the bridge voted no.",
  },
  {
    setup: "Empty miles don't pay.",
    punchline: "They do charge interest, in diesel.",
  },
  {
    setup: "The ELD asked if I was still driving.",
    punchline: "I asked if it was still snitching. We left it there.",
  },
  {
    setup: "The BOL said 12 pallets.",
    punchline: "The dock said 12 pallets and a plot twist.",
  },
  {
    setup: "Hotshot means it has to move now.",
    punchline: "Now showed up late, in a Sprinter, acting famous.",
  },
  {
    setup: "The seal number had to match.",
    punchline: "The seal had already left for a better lane.",
  },
  {
    setup: "I asked who was in charge.",
    punchline: "Six people pointed at a clipboard. The clipboard shrugged.",
  },
  {
    setup: "Fuel was cheap at the last exit.",
    punchline: "The last exit was in a different decade.",
  },
  {
    setup: "The warehouse said pull forward.",
    punchline: "Forward was a vibe. The bollard was a fact.",
  },
  {
    setup: "The rate was all-in.",
    punchline: "All-in did not include the part where I wait.",
  },
  {
    setup: "Restroom said driver friendly.",
    punchline: "The restroom has never met a driver and would like to keep it that way.",
  },
  {
    setup: "The lane was a straight shot.",
    punchline: "Construction brought its own geometry and a cone with opinions.",
  },
  {
    setup: "They said the freight rides itself.",
    punchline: "It does not. It needs straps, a prayer, and a second look.",
  },
  {
    setup: "Check-in wanted my pickup number.",
    punchline: "I offered my hopes. They were not in the system.",
  },
];

const keepers = new Set(jokeBank.map((joke) => joke.punchline));

export function jokeForDate(date: string): DailyJoke {
  let n = 0;
  for (const ch of date) n = (n * 33 + ch.charCodeAt(0)) >>> 0;
  return jokeBank[n % jokeBank.length];
}

export function jokeNeedsRewrite(joke: DailyJoke): boolean {
  return !keepers.has(joke.punchline);
}
