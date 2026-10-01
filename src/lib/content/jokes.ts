export type DailyJoke = { setup: string; punchline: string };

// Spoken bits. Scene, then the button. Safe to forward.
export const jokeBank: DailyJoke[] = [
  {
    setup: "Dispatch texted, you close?",
    punchline: "I'm at the gate. That's not close. Sometimes the gate and the dock aren't the same week.",
  },
  {
    setup: "Weigh station open.",
    punchline: "Suddenly I remember every paper I own, my childhood, and whether the mudflap is going through something.",
  },
  {
    setup: "Home time is a magic trick.",
    punchline: "Dispatch makes it disappear, then acts surprised you noticed.",
  },
  {
    setup: "The shipper said the freight was ready.",
    punchline: "Ready meant Dale was on his way. Dale was not on his way. Dale was a rumor.",
  },
  {
    setup: "Truck stop, 7 p.m. Fifty trucks. Two spots.",
    punchline: "Both spots were a suggestion someone had already taken.",
  },
  {
    setup: "They gave me a window from 8 to 10.",
    punchline: "I used 8. They used the idea of 10, and called me early.",
  },
  {
    setup: "Just one more load.",
    punchline: "In trucking, that sentence has ended more Fridays than traffic.",
  },
  {
    setup: "A blinker on a truck is not a question.",
    punchline: "It's a calendar invite. You missed it. I'm still coming.",
  },
  {
    setup: "Backing into a dock is the Olympics.",
    punchline: "The judges are strangers on their phones, and they all have notes.",
  },
  {
    setup: "A Prius cut me off, then slowed down to read a sign.",
    punchline: "Sir, I need a football field to stop. You needed a hobby.",
  },
  {
    setup: "The lumper fee is a cover charge.",
    punchline: "I drove the trailer 600 miles. Then I paid a man to do the part the building was built for.",
  },
  {
    setup: "I backed in on the first try.",
    punchline: "Nobody saw it. In this job, that's not talent. That's a missing witness.",
  },
  {
    setup: "Detention is in the rate confirmation.",
    punchline: "So is getting paid for it. I've seen one of those happen.",
  },
  {
    setup: "Hundred-mile coffee is not a beverage.",
    punchline: "You survive it, and then you can hear colors.",
  },
  {
    setup: "This should be easy, dispatch said.",
    punchline: "I have never heard those words and then had an easy day. Not once.",
  },
  {
    setup: "The GPS said arrive at 2.",
    punchline: "The dock said arrive at never. We settled. I sat in the lot and became a landmark.",
  },
  {
    setup: "Team driving is a marriage with an engine brake.",
    punchline: "One of you sleeps. The other pretends that's sleeping.",
  },
  {
    setup: "A wide load does not discuss things with a bridge.",
    punchline: "The bridge has seniority, and it does not check its messages.",
  },
  {
    setup: "Empty miles aren't empty.",
    punchline: "I'm hauling air. Air does not pay for the diesel it took to haul the air.",
  },
  {
    setup: "The logbook doesn't ask how I feel.",
    punchline: "It asks how long I've felt it, then it emails my boss.",
  },
  {
    setup: "The bill said 42,000 pounds.",
    punchline: "The scale said 46,000. Somebody packed optimism and didn't mark it.",
  },
  {
    setup: "Hotshot means now.",
    punchline: "Now showed up in a van, asked for the dock, and was already disappointed.",
  },
  {
    setup: "Green light at the scale.",
    punchline: "I have never loved a machine more. Not the truck. The light.",
  },
  {
    setup: "Who runs the dock?",
    punchline: "A clipboard. Can't drive. Can't load. Still your supervisor.",
  },
  {
    setup: "Cheap fuel was one exit back.",
    punchline: "So was a parking spot. I missed both and called the next hundred miles a plan.",
  },
  {
    setup: "He nosed into the dock and called for detention.",
    punchline: "The forklift cannot drive through an engine. That's not waiting. That's a hobby.",
  },
  {
    setup: "The rate was all-in.",
    punchline: "All-in did not include the waiting, the lumper, or me getting older in their lot.",
  },
  {
    setup: "Driver-friendly restroom.",
    punchline: "Friendly like a vending machine that's out of everything except regret.",
  },
  {
    setup: "The lane was a straight shot.",
    punchline: "Then a flagger, six cones, and a man waving like the road was a suggestion.",
  },
  {
    setup: "The broker said the receiver was easy.",
    punchline: "Easy meant a guard shack and a guy who had never heard of me, or the load.",
  },
  {
    setup: "Check-in asked if I was the driver.",
    punchline: "I hope so. I brought the truck, and it is not parallel parked.",
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
