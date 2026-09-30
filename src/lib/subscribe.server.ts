import { getSql } from "@/lib/db";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanEmail(email: string): string | null {
  const value = email.trim().toLowerCase();
  if (!emailPattern.test(value) || value.length > 120) return null;
  return value;
}

export async function joinList(email: string) {
  const value = cleanEmail(email);
  if (!value) return { ok: false as const, error: "Enter a real email address." };
  const sql = await getSql();
  const rows = await sql.query<{ email: string }>(
    `insert into subscribers (email) values ($1)
     on conflict (email) do nothing
     returning email`,
    [value],
  );
  return { ok: true as const, status: rows.length > 0 ? ("joined" as const) : ("already" as const) };
}

export async function leaveList(email: string) {
  const value = cleanEmail(email);
  if (!value) return { ok: false as const, error: "Enter the email you signed up with." };
  const sql = await getSql();
  const rows = await sql.query<{ email: string }>(
    `delete from subscribers where email = $1 returning email`,
    [value],
  );
  return { ok: true as const, status: rows.length > 0 ? ("removed" as const) : ("missing" as const) };
}
