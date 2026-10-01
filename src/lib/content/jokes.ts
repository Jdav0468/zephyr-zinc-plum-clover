export type DailyJoke = { setup: string; punchline: string };

// Work jokes told like stand-up: recognizable premise, then the button.
export const jokeBank: DailyJoke[] = [
  {
    setup: "Per my last email.",
    punchline: "That is not a greeting. That is a crime scene, and you are the chalk outline.",
  },
  {
    setup: "Reply all is the only time the whole company agrees.",
    punchline: "What they agree on is that you should not have done that.",
  },
  {
    setup: "The invite said optional.",
    punchline: "Optional like a fire drill. You can skip it. Then someone tells you what you missed, which is another meeting.",
  },
  {
    setup: "The printer says it is jammed.",
    punchline: "I opened it. There is no jam. There is a grievance.",
  },
  {
    setup: "Urgent was in the subject line.",
    punchline: "I opened it. Potluck sign-up. The emergency was potato salad.",
  },
  {
    setup: "We circled back.",
    punchline: "Circling back is what you call it when nobody did the thing, and now the thing has frequent-flyer miles.",
  },
  {
    setup: "Can everyone see my screen?",
    punchline: "No. And we will spend four minutes on the wrong screen. This is also called teamwork.",
  },
  {
    setup: "Thanks in advance.",
    punchline: "I have not agreed to this. You thanked me for a favor that is still in the parking lot.",
  },
  {
    setup: "I'll be there in five minutes.",
    punchline: "Five minutes saw the email, formed a committee, and will circle back.",
  },
  {
    setup: "My boss said the meeting would be quick.",
    punchline: "Quick means eight people and a slideshow. The slideshow had an agenda. We are now in the agenda's meeting.",
  },
  {
    setup: "Just a quick question.",
    punchline: "It was not a question. It was a project, wearing a question's coat.",
  },
  {
    setup: "Let's take this offline.",
    punchline: "Offline is where emails go to get a longer email.",
  },
  {
    setup: "The deadline was Friday.",
    punchline: "Friday looked at the deadline, said per my last email, and left.",
  },
  {
    setup: "I looped in the right person.",
    punchline: "The right person has an out-of-office that says loop in someone else. We are a circle now.",
  },
  {
    setup: "Who owns this?",
    punchline: "Twelve people were copied. Ownership was not. Ownership is out today.",
  },
  {
    setup: "Please see attached.",
    punchline: "I saw. There was no attached. I have never felt more seen.",
  },
  {
    setup: "We need a decision today.",
    punchline: "Today has scheduled a meeting to decide whether to decide. I am optional, which means I am going.",
  },
  {
    setup: "The spreadsheet is the source of truth.",
    punchline: "There are three. They have not been introduced. I would not put them in the same room.",
  },
  {
    setup: "End of day.",
    punchline: "End of day means 5 for me and whenever you are still at your desk for you. Those are different time zones.",
  },
  {
    setup: "Any updates?",
    punchline: "The update is that I am writing the update. The update is now late because of the update.",
  },
  {
    setup: "I am heads down.",
    punchline: "This is what we say when we are reading the email about being heads down.",
  },
  {
    setup: "Let's not boil the ocean.",
    punchline: "So we scheduled an hour to discuss the ocean, the pot, and who brought the pot.",
  },
  {
    setup: "Reply all was an accident.",
    punchline: "The accident has a reply chain. The chain has opinions. One opinion is yours, in writing, forever.",
  },
  {
    setup: "We actioned it.",
    punchline: "The action was forwarding it to someone who will action it by forwarding it. The work is in great shape.",
  },
  {
    setup: "Hop on a quick call.",
    punchline: "The call is to plan the call. I have blocked 30 minutes to learn when we are meeting.",
  },
  {
    setup: "The status is pending.",
    punchline: "Pending got a promotion. It has reports now. One of them is me.",
  },
  {
    setup: "Same page.",
    punchline: "We are on the same page. The page is blank. Leadership calls this alignment.",
  },
  {
    setup: "The out-of-office is on.",
    punchline: "So is the person. The out-of-office is the only one answering, and it is more helpful.",
  },
  {
    setup: "I saved the file.",
    punchline: "The file saved itself somewhere with a name like Final_final_v7. We do not speak of v6.",
  },
  {
    setup: "It was a working lunch.",
    punchline: "The lunch worked. I took notes. The notes say we should have a working lunch.",
  },
  {
    setup: "Following up on my follow-up.",
    punchline: "At this point the follow-up has a desk, a badge, and a better attendance record than I do.",
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
