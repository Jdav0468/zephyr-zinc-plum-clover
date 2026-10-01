export type DailyJoke = { setup: string; punchline: string };

// Freight puns. Safe to forward.
export const jokeBank: DailyJoke[] = [
  {
    setup: "Why did the dispatcher cross the road?",
    punchline: "To get the driver to the other side by Monday.",
  },
  {
    setup: "The dock said it would be a short wait.",
    punchline: "It was a long weight.",
  },
  {
    setup: "Why was the flatbed so calm?",
    punchline: "It had a level head.",
  },
  {
    setup: "What did the reefer say to the produce?",
    punchline: "You need to chill.",
  },
  {
    setup: "Why did the shipper get in trouble?",
    punchline: "He kept pallet-ing excuses.",
  },
  {
    setup: "The load was late.",
    punchline: "It was past-due east.",
  },
  {
    setup: "Why don't trucks ever get lost in the paperwork?",
    punchline: "They stay on the bill of lading.",
  },
  {
    setup: "What do you call a nervous scale?",
    punchline: "A weigh station.",
  },
  {
    setup: "Why did the broker bring a ladder?",
    punchline: "The rate was over everyone's head.",
  },
  {
    setup: "Why did the driver bring a pencil to the scale?",
    punchline: "He heard it was a weigh station.",
  },
  {
    setup: "The trailer told a secret.",
    punchline: "It was off the record, but on the BOL.",
  },
  {
    setup: "Why was the hotshot always in a hurry?",
    punchline: "It had van-ishing time.",
  },
  {
    setup: "What do you call a truck that tells jokes?",
    punchline: "A haul lot of trouble.",
  },
  {
    setup: "The coffee at the truck stop was strong.",
    punchline: "It had been Joe for miles.",
  },
  {
    setup: "Why did the forklift get promoted?",
    punchline: "It knew how to raise the issue.",
  },
  {
    setup: "The appointment was flexible.",
    punchline: "Mostly in the sense that it bent.",
  },
  {
    setup: "Why did the tanker ace the test?",
    punchline: "It was a fuel-proof plan.",
  },
  {
    setup: "What did the wide load say to the bridge?",
    punchline: "I'm a little over, don't make a span of it.",
  },
  {
    setup: "Empty miles walked into a bar.",
    punchline: "The bartender said, we don't serve your type. No payload.",
  },
  {
    setup: "Why was the ELD a bad roommate?",
    punchline: "It kept logging everything.",
  },
  {
    setup: "The seal didn't match.",
    punchline: "Someone had broken the bond.",
  },
  {
    setup: "Why did the yard goat get the job?",
    punchline: "It was great at shifting responsibility.",
  },
  {
    setup: "PrePass turned green.",
    punchline: "That was a weigh to go.",
  },
  {
    setup: "Who runs the dock?",
    punchline: "A clipboard. It's board-certified.",
  },
  {
    setup: "Why did the driver sit so long?",
    punchline: "He was waiting for his ship to come in. It was a truck.",
  },
  {
    setup: "He parked nose-in.",
    punchline: "The forklift called it a dead end.",
  },
  {
    setup: "The rate was all-in.",
    punchline: "The lumper was an added fee-ture.",
  },
  {
    setup: "Why was the restroom driver friendly?",
    punchline: "It had a stall tactic.",
  },
  {
    setup: "The lane was a straight shot.",
    punchline: "Construction made it a detour de force.",
  },
  {
    setup: "Why did the freight go to therapy?",
    punchline: "It had too much baggage, and none of it was strapped.",
  },
  {
    setup: "Check-in asked for my number.",
    punchline: "I gave them the pickup. They wanted a callback.",
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
