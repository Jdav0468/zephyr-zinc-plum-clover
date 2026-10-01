export type DailyJoke = { setup: string; punchline: string };

export const jokeBank: DailyJoke[] = [
  {
    setup: "The broker said the rate was competitive.",
    punchline: "So is a wet handshake. Nobody leaves satisfied.",
  },
  {
    setup: "GPS said recalculating.",
    punchline: "That's what my ex said, right before she took the good blanket.",
  },
  {
    setup: "Why was the appointment on time?",
    punchline: "It wasn't. Foreplay was cancelled. So was the freight.",
  },
  {
    setup: "The shipper said the pallets were light.",
    punchline: "That's what she said. The forklift did not laugh.",
  },
  {
    setup: "I asked the scale to be gentle.",
    punchline: "It said gentle is extra, and I was already over.",
  },
  {
    setup: "What do you call a two-hour window?",
    punchline: "Edging. With paperwork.",
  },
  {
    setup: "The lumper had a menu.",
    punchline: "Full service cost more. I only wanted the trailer unloaded, not a relationship.",
  },
  {
    setup: "Door 14 sent me to door 14.",
    punchline: "I've had shorter arguments with people I was sleeping with.",
  },
  {
    setup: "The receiver is driver friendly.",
    punchline: "Friendly like a motel that rents by the hour and judges you anyway.",
  },
  {
    setup: "A trucker walks into a scale house.",
    punchline: "The scale says drop the attitude and about four hundred pounds. I said buy me dinner first.",
  },
  {
    setup: "Dispatch wanted a quickie.",
    punchline: "An update. They clarified. Too late. The mood was gone, and so was the window.",
  },
  {
    setup: "I backed in on the first try.",
    punchline: "Nobody saw it. Story of my love life, except this one counts.",
  },
  {
    setup: "Detention starts after two hours.",
    punchline: "So does regret. Only one of them is supposed to pay.",
  },
  {
    setup: "The truck-stop coffee could strip paint.",
    punchline: "And a bad decision. I ordered a second cup. For the decision.",
  },
  {
    setup: "Easy in, easy out, they said.",
    punchline: "I have heard that before. I was still there at dawn, underpaid.",
  },
  {
    setup: "The tarp was a fifteen-minute job.",
    punchline: "The wind got handsy. I did not consent, and neither did the freight.",
  },
  {
    setup: "Team drivers, the rate con said.",
    punchline: "One bunk, two people, zero eye contact. Marriage, but with an ELD.",
  },
  {
    setup: "Why did the wide load get pulled over?",
    punchline: "Too much ass for the lane, and the bridge was not in the mood.",
  },
  {
    setup: "Empty miles don't pay.",
    punchline: "Neither did the last date. At least the truck warned me on the gauge.",
  },
  {
    setup: "My ELD and I are in couples therapy.",
    punchline: "It watches me sleep and tells on me. That's not a partner. That's a narc.",
  },
  {
    setup: "The BOL said 12 pallets.",
    punchline: "Twelve was the safe word. The dock blew past it.",
  },
  {
    setup: "Hotshot means now.",
    punchline: "Now showed up late, smelled like diesel, and still expected a tip.",
  },
  {
    setup: "The seal had to match.",
    punchline: "The seal had already matched with someone who didn't ask questions.",
  },
  {
    setup: "Who's in charge?",
    punchline: "A clipboard with boundary issues and no safe word.",
  },
  {
    setup: "Cheap fuel was at the last exit.",
    punchline: "So was a decision I will not be putting on the BOL.",
  },
  {
    setup: "Pull forward, the dock said.",
    punchline: "I said not without dinner. The bollard did not negotiate.",
  },
  {
    setup: "The rate was all-in.",
    punchline: "All-in did not include the emotional labor, or the lumper's wandering hands.",
  },
  {
    setup: "Driver-friendly restroom.",
    punchline: "I have seen cleaner confessions. And more privacy.",
  },
  {
    setup: "The lane was a straight shot.",
    punchline: "Construction made it complicated. My ex could relate.",
  },
  {
    setup: "The freight rides itself.",
    punchline: "It does not. Nothing good does. Bring straps.",
  },
  {
    setup: "Check-in asked for my number.",
    punchline: "I gave them the pickup number. They looked disappointed. Join the club.",
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
