export const desks = [
  {
    id: "government",
    label: "Government",
    blurb: "What agencies are doing, and what that changes on the road.",
  },
  {
    id: "laws",
    label: "Laws & rules",
    blurb: "The rulebook, translated out of regulation-speak.",
  },
  {
    id: "cdl",
    label: "Licenses & drivers",
    blurb: "Who is allowed to drive a truck, and how that license is earned.",
  },
  {
    id: "diesel",
    label: "Diesel",
    blurb: "The fuel number behind freight bills, surcharges, and empty miles.",
  },
  {
    id: "theft",
    label: "Cargo theft",
    blurb: "How freight disappears now — usually without a broken lock.",
  },
  {
    id: "fraud",
    label: "Fraudulent companies",
    blurb: "Fake carriers, stolen identities, and companies that vanish overnight.",
  },
  {
    id: "news",
    label: "The basics",
    blurb: "Foundations. Read these if the rest of the brief uses words you don't.",
  },
] as const;

export type DeskId = (typeof desks)[number]["id"];

export function getDesk(id: string) {
  return desks.find((d) => d.id === id);
}
