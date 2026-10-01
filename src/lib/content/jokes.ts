export type DailyJoke = { setup: string; punchline: string };

// Deadpan. The joke is the flat sentence. Safe to forward.
export const jokeBank: DailyJoke[] = [
  {
    setup: "Dispatch asked if I could make up the time.",
    punchline: "I said no. They sent a follow-up.",
  },
  {
    setup: "The scale was open.",
    punchline: "We had hoped to avoid each other.",
  },
  {
    setup: "Home time was on the schedule.",
    punchline: "Dispatch has reviewed the schedule.",
  },
  {
    setup: "The freight was ready.",
    punchline: "This was not accurate.",
  },
  {
    setup: "There were two spots left at the truck stop.",
    punchline: "Both were already a theory.",
  },
  {
    setup: "The window was 8 to 10.",
    punchline: "I arrived at 8. They arrived at an opinion.",
  },
  {
    setup: "It was one more load.",
    punchline: "It was not.",
  },
  {
    setup: "I signaled.",
    punchline: "The car took this as a conversation.",
  },
  {
    setup: "The facility is driver friendly.",
    punchline: "There is a chair.",
  },
  {
    setup: "A car pulled in front of me and slowed down.",
    punchline: "I have 80,000 pounds of notes.",
  },
  {
    setup: "The lumper fee was optional.",
    punchline: "In the sense that waiting was also an option.",
  },
  {
    setup: "I backed in on the first try.",
    punchline: "There is no one to confirm this.",
  },
  {
    setup: "Detention is in the contract.",
    punchline: "Payment is in a different document. We have not found it.",
  },
  {
    setup: "The coffee was strong.",
    punchline: "It has been strong since March.",
  },
  {
    setup: "Dispatch said it should be easy.",
    punchline: "We are no longer using that word.",
  },
  {
    setup: "The GPS said 2:10.",
    punchline: "The dock has not been informed.",
  },
  {
    setup: "We are a team.",
    punchline: "One of us is asleep. This is the system.",
  },
  {
    setup: "The load was wide.",
    punchline: "The bridge was not interested.",
  },
  {
    setup: "The miles were empty.",
    punchline: "The fuel receipt was not.",
  },
  {
    setup: "The logbook asked how long I had been driving.",
    punchline: "It already knew.",
  },
  {
    setup: "The bill said 42,000.",
    punchline: "The scale disagreed, and it had a printer.",
  },
  {
    setup: "It was a hotshot.",
    punchline: "So was the waiting.",
  },
  {
    setup: "The scale gave me a green light.",
    punchline: "This was the highlight.",
  },
  {
    setup: "I asked who was in charge.",
    punchline: "They handed me a clipboard.",
  },
  {
    setup: "Fuel was cheaper at the last exit.",
    punchline: "I am aware of this now.",
  },
  {
    setup: "He parked nose-in and asked about detention.",
    punchline: "The forklift has not learned to drive through an engine.",
  },
  {
    setup: "The rate was all-in.",
    punchline: "The waiting was extra. This was explained later.",
  },
  {
    setup: "The restroom is driver friendly.",
    punchline: "We have met. It was brief.",
  },
  {
    setup: "The lane was direct.",
    punchline: "Construction has introduced a subplot.",
  },
  {
    setup: "The receiver was supposed to be easy.",
    punchline: "The receiver has not received this information.",
  },
  {
    setup: "Check-in asked if I was the driver.",
    punchline: "I had brought the truck, so the answer seemed likely.",
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
