export type DailyJoke = { setup: string; punchline: string };

export const jokeBank: DailyJoke[] = [
  {
    setup: "The broker called the rate competitive.",
    punchline: "Competitive with a bake sale.",
  },
  {
    setup: "GPS said recalculating.",
    punchline: "So was I. Only one of us was being paid for it.",
  },
  {
    setup: "Why was the appointment on time?",
    punchline: "It wasn't. That was the joke.",
  },
  {
    setup: "The shipper said the pallets were light.",
    punchline: "The forklift filed a dissenting opinion, in writing, on my back.",
  },
  {
    setup: "I asked the scale for mercy.",
    punchline: "It said mercy is not a certified unit of measure.",
  },
  {
    setup: "What do you call a two-hour window?",
    punchline: "A rumor with a timestamp.",
  },
  {
    setup: "The lumper had a menu.",
    punchline: "The special was whatever number made me flinch.",
  },
  {
    setup: "Door 14 sent me to door 14.",
    punchline: "Philosophers call that a paradox. I call it Tuesday.",
  },
  {
    setup: "The receiver is driver friendly.",
    punchline: "Translation: there is a chair, and the chair is not sorry.",
  },
  {
    setup: "A trucker walks into a scale house.",
    punchline: "The scale says, we're going to need a bigger apology.",
  },
  {
    setup: "Dispatch wanted a quick update.",
    punchline: "I sent a photo of the same cone. They called it content.",
  },
  {
    setup: "I backed in on the first try.",
    punchline: "Witnesses were unavailable. The legend, however, is load-ready.",
  },
  {
    setup: "Detention pay is real.",
    punchline: "So is Bigfoot. I have heard excellent podcasts about both.",
  },
  {
    setup: "The coffee had a warning label.",
    punchline: "It was the MC number.",
  },
  {
    setup: "Easy in, easy out, they said.",
    punchline: "I went in during one administration and came out in the next.",
  },
  {
    setup: "The tarp was a fifteen-minute job.",
    punchline: "The wind read that as a challenge and accepted.",
  },
  {
    setup: "Team drivers, the rate con said.",
    punchline: "My co-driver was a thermos. It did not take a turn.",
  },
  {
    setup: "Why did the wide load stop at the bridge?",
    punchline: "The bridge had a dress code, and optimism was not on it.",
  },
  {
    setup: "Empty miles don't count.",
    punchline: "Tell that to the fuel gauge. It keeps receipts.",
  },
  {
    setup: "My ELD and I are in couples therapy.",
    punchline: "It says I never listen. It is not wrong, and it is not invited.",
  },
  {
    setup: "The BOL said 12 pallets.",
    punchline: "Twelve was a biography. The dock preferred fiction.",
  },
  {
    setup: "Hotshot means now.",
    punchline: "Now arrived late, ordered a coffee, and asked who was in charge.",
  },
  {
    setup: "The seal had to match.",
    punchline: "The seal had already matched with a better trailer.",
  },
  {
    setup: "Who's in charge?",
    punchline: "A clipboard. It has no authority and absolute power.",
  },
  {
    setup: "Cheap fuel was at the last exit.",
    punchline: "So was my youth. We nodded and kept going.",
  },
  {
    setup: "Pull forward, the dock said.",
    punchline: "The bollard said that was adorable.",
  },
  {
    setup: "The rate was all-in.",
    punchline: "All-in did not cover the part where I age.",
  },
  {
    setup: "Driver-friendly restroom.",
    punchline: "Friendly like a cat that has just met you and already regrets it.",
  },
  {
    setup: "The lane was a straight shot.",
    punchline: "Construction brought a cone, a grudge, and a new map.",
  },
  {
    setup: "The freight rides itself.",
    punchline: "It does not. It needs straps and adult supervision.",
  },
  {
    setup: "Check-in asked for my number.",
    punchline: "I gave them the pickup number. They wanted a happier one.",
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
