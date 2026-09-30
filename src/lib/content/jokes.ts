export type DailyJoke = { setup: string; punchline: string };

export const jokeBank: DailyJoke[] = [
  {
    setup: "The GPS said I had arrived.",
    punchline: "The guard said that was a personal opinion.",
  },
  {
    setup: "Dispatch sent a quick question.",
    punchline: "I am still in that question.",
  },
  {
    setup: "They called it a one-hour window.",
    punchline: "The window was painted shut.",
  },
  {
    setup: "Door 12 told me to go to door 12.",
    punchline: "We are no longer speaking.",
  },
  {
    setup: "The shipper said easy in, easy out.",
    punchline: "I have grandchildren now.",
  },
  {
    setup: "The scale said I was heavy.",
    punchline: "It meant the trailer. I took it personally anyway.",
  },
  {
    setup: "Check-in asked for my pickup number.",
    punchline: "I gave them my hopes. They wanted the number.",
  },
  {
    setup: "The lumper quoted a price.",
    punchline: "Then a higher price. Then a whole personality.",
  },
  {
    setup: "I asked who was in charge.",
    punchline: "Six people pointed at a clipboard.",
  },
  {
    setup: "My ETA was 2:10.",
    punchline: "Reality filed a different plan and did not cc me.",
  },
  {
    setup: "The sign said the restroom was driver friendly.",
    punchline: "The restroom has never met a driver.",
  },
  {
    setup: "I backed in on the first try.",
    punchline: "Nobody saw it. I will be talking about this for years.",
  },
  {
    setup: "The broker said the receiver was great.",
    punchline: "The receiver has not heard this rumor.",
  },
  {
    setup: "The appointment was 7 a.m. sharp.",
    punchline: "Sharp left at 7:01 and did not leave a note.",
  },
  {
    setup: "The load was must-deliver.",
    punchline: "The dock was must-wander.",
  },
  {
    setup: "The truck-stop coffee could strip paint.",
    punchline: "I ordered a second cup. Out of respect.",
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
