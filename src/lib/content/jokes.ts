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
    setup: "Nothing says welcome like a scale.",
    punchline: "And a number you did not come here to hear.",
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
  {
    setup: "The tarp was called a fifteen-minute job.",
    punchline: "The wind was not copied on that email.",
  },
  {
    setup: "Fuel was cheap at the last exit.",
    punchline: "The last exit was in 2019.",
  },
  {
    setup: "The ELD asked if I was still driving.",
    punchline: "I asked it the same question.",
  },
  {
    setup: "The rate confirmation said team drivers.",
    punchline: "The team was me and a thermos.",
  },
  {
    setup: "Wide load means extra room.",
    punchline: "It does not mean the bridge got the memo.",
  },
  {
    setup: "Detention starts after two hours.",
    punchline: "The clock at the dock starts when it feels like it.",
  },
  {
    setup: "The seal number had to match.",
    punchline: "The seal had other plans and a head start.",
  },
  {
    setup: "Empty miles are not really empty.",
    punchline: "They are full of diesel and regret.",
  },
  {
    setup: "The warehouse said pull forward.",
    punchline: "Forward was a suggestion. The bollard was a fact.",
  },
  {
    setup: "Hotshot means it has to move now.",
    punchline: "Now arrived fashionably late, in a Sprinter.",
  },
  {
    setup: "The BOL said 12 pallets.",
    punchline: "The dock said 12 pallets and a surprise.",
  },
  {
    setup: "I asked for the consignee.",
    punchline: "They sent me a phone number that rings in 2004.",
  },
  {
    setup: "The lane was a straight shot.",
    punchline: "Construction had a different geometry.",
  },
  {
    setup: "They said the freight rides itself.",
    punchline: "It does not. It needs straps, a prayer, and a second look.",
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
