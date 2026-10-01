export type DailyJoke = { setup: string; punchline: string };

// setup is the attribution. punchline is the quote, shown large.
export const jokeBank: DailyJoke[] = [
  {
    setup: "Benjamin Franklin",
    punchline: "Well done is better than well said.",
  },
  {
    setup: "Robert Frost",
    punchline: "The best way out is always through.",
  },
  {
    setup: "Calvin Coolidge",
    punchline: "Nothing in the world can take the place of persistence.",
  },
  {
    setup: "John Wooden",
    punchline: "Be quick, but don't hurry.",
  },
  {
    setup: "Maya Angelou",
    punchline: "Do the best you can until you know better. Then when you know better, do better.",
  },
  {
    setup: "Colin Powell",
    punchline: "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.",
  },
  {
    setup: "Lao Tzu",
    punchline: "The journey of a thousand miles begins with a single step.",
  },
  {
    setup: "Dwight D. Eisenhower",
    punchline: "Plans are nothing; planning is everything.",
  },
  {
    setup: "Benjamin Franklin",
    punchline: "Lost time is never found again.",
  },
  {
    setup: "John A. Shedd",
    punchline: "A ship in harbor is safe, but that is not what ships are built for.",
  },
  {
    setup: "Edmund Hillary",
    punchline: "It is not the mountain we conquer, but ourselves.",
  },
  {
    setup: "Aristotle",
    punchline: "Well begun is half done.",
  },
  {
    setup: "Confucius",
    punchline: "It does not matter how slowly you go as long as you do not stop.",
  },
  {
    setup: "The Ro-Mac Brief",
    punchline: "The load is not done when it leaves. It is done when it arrives as promised.",
  },
  {
    setup: "Benjamin Franklin",
    punchline: "An ounce of prevention is worth a pound of cure.",
  },
  {
    setup: "Robert Collier",
    punchline: "Success is the sum of small efforts, repeated day in and day out.",
  },
  {
    setup: "A proverb",
    punchline: "Measure twice, cut once.",
  },
  {
    setup: "The Ro-Mac Brief",
    punchline: "A green light at the scale is not luck. It is the paperwork done yesterday.",
  },
  {
    setup: "Steve Jobs",
    punchline: "The only way to do great work is to love what you do.",
  },
  {
    setup: "A proverb",
    punchline: "A place for everything, and everything in its place.",
  },
  {
    setup: "Theodore Roosevelt",
    punchline: "Do what you can, with what you have, where you are.",
  },
  {
    setup: "The Ro-Mac Brief",
    punchline: "On time is a promise. Early is a courtesy. Late needs a phone call.",
  },
  {
    setup: "Abraham Lincoln",
    punchline: "Things may come to those who wait, but only the things left by those who hustle.",
  },
  {
    setup: "A Russian proverb",
    punchline: "Trust, but verify.",
  },
  {
    setup: "Henry Ford",
    punchline: "Coming together is a beginning. Keeping together is progress. Working together is success.",
  },
  {
    setup: "The Ro-Mac Brief",
    punchline: "Shiny side up. Everything else is a detail.",
  },
  {
    setup: "Booker T. Washington",
    punchline: "Success is to be measured not so much by the position that one has reached in life as by the obstacles which he has overcome.",
  },
  {
    setup: "Thomas Edison",
    punchline: "There is no substitute for hard work.",
  },
  {
    setup: "The Ro-Mac Brief",
    punchline: "If it is not on the bill, it is not on the truck.",
  },
  {
    setup: "Ralph Waldo Emerson",
    punchline: "What you do speaks so loudly that I cannot hear what you say.",
  },
  {
    setup: "The Ro-Mac Brief",
    punchline: "Call before you are late. The dock cannot plan around a silence.",
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
