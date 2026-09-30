const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function formatDate(iso: string, withWeekday = false): string {
  const [y, m, d] = iso.split("-").map(Number);
  const month = MONTHS[(m ?? 1) - 1] ?? "";
  const base = `${month} ${d}, ${y}`;
  if (!withWeekday) return base;
  const utc = new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1));
  return `${WEEKDAYS[utc.getUTCDay()]}, ${base}`;
}

export function money(n: number, digits = 3): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
