export type DailyJoke = { setup: string; punchline: string };

// Misdirection. The last line is the turn, not a caption. Safe to forward.
export const jokeBank: DailyJoke[] = [
  {
    setup: "I told my boss I needed a day off.",
    punchline: "He said, me too. We went back to work. Team building.",
  },
  {
    setup: "My review said I take too much initiative.",
    punchline: "So I decided not to read the rest.",
  },
  {
    setup: "They said dress for the job you want.",
    punchline: "I came in wearing a bathrobe. They said not that job.",
  },
  {
    setup: "I asked what my title meant.",
    punchline: "They said it means you answer the phone. The phone is the title.",
  },
  {
    setup: "Boss said we're a family.",
    punchline: "I asked about the inheritance. He said wrong family.",
  },
  {
    setup: "I called in sick.",
    punchline: "He said I didn't sound sick. I said I don't sound at work either. That's the system.",
  },
  {
    setup: "They told me to do more with less.",
    punchline: "I did less. They said I had misunderstood the assignment. I had not.",
  },
  {
    setup: "The meeting invite said optional.",
    punchline: "I tested it. It was not optional. Science.",
  },
  {
    setup: "I got employee of the month.",
    punchline: "The prize was a mug that says employee of the month. I already had the job.",
  },
  {
    setup: "I told my boss three companies were after me.",
    punchline: "He asked which ones. Gas, electric, and cable.",
  },
  {
    setup: "They asked for my two weeks.",
    punchline: "I said I can do it in one if nobody calls a meeting.",
  },
  {
    setup: "My coworker said this will only take a second.",
    punchline: "He was right. The second took forty minutes. The second was honest. He was not.",
  },
  {
    setup: "I suggested we cancel the meeting.",
    punchline: "They scheduled a meeting to discuss it.",
  },
  {
    setup: "Boss said think outside the box.",
    punchline: "I did. He said the box was load-bearing. Get back in.",
  },
  {
    setup: "I asked for a raise.",
    punchline: "They gave me a new title. The title cannot buy lunch.",
  },
  {
    setup: "Someone said sorry for the late email.",
    punchline: "If they were sorry, there would be no email. There was an email.",
  },
  {
    setup: "I have a work phone and a personal phone.",
    punchline: "Both rang at dinner. Collaboration.",
  },
  {
    setup: "They said the door is always open.",
    punchline: "I walked in. They were on a call. The door was a metaphor. I was not.",
  },
  {
    setup: "I finished early.",
    punchline: "This was treated as a scheduling error.",
  },
  {
    setup: "The training was mandatory.",
    punchline: "The quiz asked if I had enjoyed the training. I did not enjoy the question.",
  },
  {
    setup: "I replied all by accident.",
    punchline: "Everyone replied all to say don't reply all. We are nothing if not consistent.",
  },
  {
    setup: "Boss asked if I had a minute.",
    punchline: "I said yes. That was the mistake. The minute brought slides.",
  },
  {
    setup: "They moved me to a window seat.",
    punchline: "The window faces the parking lot. I can see my car. It looks free.",
  },
  {
    setup: "I was told to take ownership.",
    punchline: "I asked if ownership came with keys. It came with a spreadsheet.",
  },
  {
    setup: "The printer works if you stand there.",
    punchline: "I am not in IT. I am a presence. The presence is billable, apparently not.",
  },
  {
    setup: "We had a brainstorm.",
    punchline: "It rained ideas. We left with the same umbrella.",
  },
  {
    setup: "I said I was at capacity.",
    punchline: "They added a small thing. The small thing brought friends.",
  },
  {
    setup: "The survey was anonymous.",
    punchline: "It asked for my department, my role, and my birthday. Very anonymous. Very festive.",
  },
  {
    setup: "I logged off on time.",
    punchline: "Someone Slacked great, you're still online. I was not. My ghost has a better work ethic.",
  },
  {
    setup: "They said culture eats strategy.",
    punchline: "Culture ate the strategy. We still have a meeting about the strategy.",
  },
  {
    setup: "I asked what success looks like.",
    punchline: "They said you'll know. I do not know. This is also called success, pending.",
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
