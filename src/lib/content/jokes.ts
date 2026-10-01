export type DailyJoke = { setup: string; punchline: string };

// Dry work jokes. The whole desk, not just the road. Safe to forward.
export const jokeBank: DailyJoke[] = [
  {
    setup: "The meeting could have been an email.",
    punchline: "The email could have been a no.",
  },
  {
    setup: "Someone marked it urgent.",
    punchline: "It was not. It was Tuesday.",
  },
  {
    setup: "I had a quick question.",
    punchline: "It is now a thread.",
  },
  {
    setup: "We circled back.",
    punchline: "We are still circling.",
  },
  {
    setup: "The printer is out of paper.",
    punchline: "This is the outage.",
  },
  {
    setup: "I'll be there in five minutes.",
    punchline: "Five minutes has entered a meeting.",
  },
  {
    setup: "It was a working lunch.",
    punchline: "The work ate. I did not.",
  },
  {
    setup: "Please see the attached.",
    punchline: "There was no attached.",
  },
  {
    setup: "We are all on the same page.",
    punchline: "The page is blank, but we are on it.",
  },
  {
    setup: "This will only take a minute.",
    punchline: "The minute has dependents.",
  },
  {
    setup: "I sent a follow-up.",
    punchline: "The follow-up is now the job.",
  },
  {
    setup: "Can everyone see my screen?",
    punchline: "No one can see the screen. We have accepted this.",
  },
  {
    setup: "The deadline was Friday.",
    punchline: "Friday has asked for an extension.",
  },
  {
    setup: "Let's take this offline.",
    punchline: "Offline is where it goes to live.",
  },
  {
    setup: "I looped in the right person.",
    punchline: "The right person is out of office until further notice.",
  },
  {
    setup: "Per my last email.",
    punchline: "Which was also per the one before that.",
  },
  {
    setup: "We need a decision today.",
    punchline: "Today has formed a committee.",
  },
  {
    setup: "The calendar invite said optional.",
    punchline: "Attendance was taken.",
  },
  {
    setup: "I saved the file.",
    punchline: "The file has saved itself somewhere else.",
  },
  {
    setup: "Who owns this?",
    punchline: "Everyone was copied. No one owns it.",
  },
  {
    setup: "The status is pending.",
    punchline: "Pending is the status. It has been promoted.",
  },
  {
    setup: "I'll have that to you by end of day.",
    punchline: "End of day has been moved to tomorrow morning, tentatively.",
  },
  {
    setup: "We should hop on a call.",
    punchline: "The call will be an email that could have been nothing.",
  },
  {
    setup: "Thanks in advance.",
    punchline: "A bold assumption, sent at 4:58.",
  },
  {
    setup: "The spreadsheet is the source of truth.",
    punchline: "There are three spreadsheets. They have not met.",
  },
  {
    setup: "I am heads down.",
    punchline: "My head is down. The work is also down there. We are looking at it.",
  },
  {
    setup: "Let's not boil the ocean.",
    punchline: "We have scheduled a meeting to discuss the ocean.",
  },
  {
    setup: "Reply all was an accident.",
    punchline: "The accident has replies.",
  },
  {
    setup: "The out of office is on.",
    punchline: "So is the person. This is a separate issue.",
  },
  {
    setup: "We actioned it.",
    punchline: "The action was forwarding it.",
  },
  {
    setup: "Any updates?",
    punchline: "The update is that there is no update. Sent with confidence.",
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
