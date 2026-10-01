export type DailyJoke = { setup: string; punchline: string };

// Short stand-up bits. Premise, then the button. Safe to forward.
export const jokeBank: DailyJoke[] = [
  {
    setup: "Dispatch said, make up a little time.",
    punchline: "Sure. Soon as traffic, weather, and physics sign the release.",
  },
  {
    setup: "A green light at the scale is a religious experience.",
    punchline: "It's the only review in trucking that doesn't come with a lecture.",
  },
  {
    setup: "They call the first two hours free time.",
    punchline: "Free for who? I brought the truck. They brought a clipboard and a vibe.",
  },
  {
    setup: "The shipper said the freight was ready.",
    punchline: "Ready is a word. A forklift is evidence.",
  },
  {
    setup: "Parking after five is a sport.",
    punchline: "The prize is a spot next to a reefer that runs all night like it's mad at you.",
  },
  {
    setup: "The officer asked what I was hauling.",
    punchline: "Sailboat fuel. She asked for placards. The wind does not take placards.",
  },
  {
    setup: "Dispatch has two clocks.",
    punchline: "The one in the truck, and the imaginary one they use for my arrival.",
  },
  {
    setup: "A four-wheeler thinks a blinker is a courtesy.",
    punchline: "On a truck it's a legal document. I filed it. You did not read it.",
  },
  {
    setup: "Driver friendly means there is a chair.",
    punchline: "The chair has tenure. The vending machine has opinions. You have two hours.",
  },
  {
    setup: "A car cut me off, then hit the brakes.",
    punchline: "Buddy, I am 80,000 pounds of already committed. My stopping distance is a novella.",
  },
  {
    setup: "The lumper fee is a cover charge.",
    punchline: "I already bought the ticket. The show is a man on a forklift and my own money leaving.",
  },
  {
    setup: "I backed in on the first try.",
    punchline: "No witnesses. In trucking that's not a skill. That's a cold case.",
  },
  {
    setup: "Detention is in the contract.",
    punchline: "So is Bigfoot, if you read the comments. Only one of them has ever paid me.",
  },
  {
    setup: "Hundred-mile coffee is not a drink.",
    punchline: "It's a threat the diner makes, and a promise the thermos keeps.",
  },
  {
    setup: "This should be easy, dispatch said.",
    punchline: "Those four words have ended more afternoons than weather.",
  },
  {
    setup: "The appointment was a window.",
    punchline: "I arrived in the window. The dock arrived in a different genre.",
  },
  {
    setup: "Team drivers share a bunk the size of a rumor.",
    punchline: "One sleeps. One pretends the other snores in a foreign language.",
  },
  {
    setup: "A wide load does not negotiate with a bridge.",
    punchline: "The bridge has been there longer, and it does not check its email.",
  },
  {
    setup: "Empty miles are not empty.",
    punchline: "They're full of diesel, and the fuel gauge is a better accountant than I am.",
  },
  {
    setup: "The ELD does not nag.",
    punchline: "It takes notes, shares them with the company, and never blinks. That's a witness.",
  },
  {
    setup: "The bill said 12 pallets.",
    punchline: "The dock produced 12 pallets and a surprise. The surprise did not have a weight.",
  },
  {
    setup: "Hotshot means now.",
    punchline: "Now is a small van with a big opinion and no interest in your appointment.",
  },
  {
    setup: "PrePass green is the good ending.",
    punchline: "Red is the universe saying, let's review your life choices on the shoulder.",
  },
  {
    setup: "Who's in charge at the dock?",
    punchline: "A clipboard. It cannot drive, it cannot load, and somehow it outranks both of us.",
  },
  {
    setup: "Cheap diesel was at the last exit.",
    punchline: "So was a parking spot. I missed both and called it a strategy.",
  },
  {
    setup: "Nose-in at the dock is a choice.",
    punchline: "Unless the forklift learned to drive through an engine, detention starts never.",
  },
  {
    setup: "The rate was all-in.",
    punchline: "All-in did not include the waiting, the lumper, or the part where I age.",
  },
  {
    setup: "Shiny side up is the whole prayer.",
    punchline: "Four words. Keep the truck upright. Everything else is commentary.",
  },
  {
    setup: "The lane was a straight shot.",
    punchline: "Construction brought cones, a flagger, and a new definition of straight.",
  },
  {
    setup: "They said the receiver was great.",
    punchline: "Great is what brokers say. The receiver had not received the memo, or me.",
  },
  {
    setup: "Check-in wanted the pickup number.",
    punchline: "I had it. They wanted it on a different form, in a different decade.",
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
