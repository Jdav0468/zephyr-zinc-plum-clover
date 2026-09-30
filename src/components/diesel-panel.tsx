import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dieselRegions, dieselYearAgo, DOE_INDEX_NOTE, latestDiesel, chartWeeks, type DieselTick } from "@/lib/content/diesel";
import { money } from "@/lib/format";

export function DieselSnapshot({ tick }: { tick?: DieselTick | null }) {
  const price = tick?.price ?? latestDiesel.price;
  const when = tick?.label ?? "Sep 21, 2026";
  const delta = price - dieselYearAgo;
  return (
    <aside className="border border-line bg-sheet p-5">
      <p className="kicker">Diesel desk</p>
      <p className="mt-3 font-serif text-4xl leading-none font-semibold tabular-nums text-ink">
        {money(price)}
      </p>
      <p className="mt-2 text-sm text-muted">
        U.S. average, week of {when}. Up {money(delta, 3)} from a year ago.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        This is the weekly government number freight contracts use. It is not the
        sign at one truck stop, and it is a series record.
      </p>
      <Link
        to="/diesel"
        className="mt-5 inline-flex h-11 items-center bg-navy px-4 text-sm font-semibold text-sheet"
      >
        Open the diesel desk
      </Link>
    </aside>
  );
}

export function DieselChart({ tick }: { tick?: DieselTick | null }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const data = chartWeeks(tick ?? null);
  const prices = data.map((week) => week.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const domain: [number, number] =
    max <= 7 && min >= 5 ? [5, 7] : [Math.floor(min * 2) / 2, Math.ceil(max * 2) / 2];
  return (
    <div className="h-72 w-full text-navy">
      {ready ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-line)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "var(--color-muted)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis
              domain={domain}
              tick={{ fill: "var(--color-muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={48}
              tickFormatter={(v: number) => `$${v.toFixed(2)}`}
            />
            <Tooltip
              formatter={(value) => [money(Number(value)), "Diesel"]}
              labelFormatter={(label) => `Week of ${label}`}
              contentStyle={{
                background: "var(--color-sheet)",
                border: "1px solid var(--color-line)",
                borderRadius: 0,
                color: "var(--color-ink)",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="currentColor"
              strokeWidth={2}
              dot={{ r: 3, fill: "currentColor" }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full w-full bg-paper-2" aria-hidden="true" />
      )}
    </div>
  );
}

export function RegionTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <caption className="sr-only">EIA on-highway diesel by region, week of September 21, 2026</caption>
        <thead>
          <tr className="border-b border-ink text-xs tracking-wide text-muted uppercase">
            <th className="py-2 pr-4 font-semibold">Region</th>
            <th className="py-2 pr-4 font-semibold">$/gal</th>
            <th className="py-2 pr-4 font-semibold">Week</th>
            <th className="py-2 font-semibold">Year</th>
          </tr>
        </thead>
        <tbody>
          {dieselRegions.map((row) => (
            <tr key={row.region} className="border-b border-line">
              <th className="py-3 pr-4 font-medium text-ink">{row.region}</th>
              <td className="py-3 pr-4 font-mono tabular-nums">{row.price.toFixed(3)}</td>
              <td className="py-3 pr-4 font-mono text-warn tabular-nums">+{row.week.toFixed(3)}</td>
              <td className="py-3 font-mono text-warn tabular-nums">+{row.year.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs leading-relaxed text-muted">{DOE_INDEX_NOTE}</p>
    </div>
  );
}

export function SurchargeCalc({ price = latestDiesel.price }: { price?: number }) {
  const [base, setBase] = useState("1.20");
  const [mpg, setMpg] = useState("6.5");
  const [miles, setMiles] = useState("500");
  const b = Number(base);
  const m = Number(mpg);
  const mi = Number(miles);
  const perMile = Number.isFinite(b) && Number.isFinite(m) && m > 0 ? (price - b) / m : null;
  const trip = perMile != null && Number.isFinite(mi) && mi >= 0 ? perMile * mi : null;

  return (
    <form className="border border-line bg-sheet p-5" onSubmit={(e) => e.preventDefault()}>
      <p className="kicker">Try the formula</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Surcharge per mile = (DOE price − contract base) ÷ miles per gallon. The DOE
        price is fixed here at {money(price)}. The other two numbers belong to the contract, not the government.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <label className="block text-sm font-semibold">
          Base price
          <input
            inputMode="decimal"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="mt-1 h-11 w-full border border-line bg-paper px-3 font-mono tabular-nums"
          />
        </label>
        <label className="block text-sm font-semibold">
          Miles per gallon
          <input
            inputMode="decimal"
            value={mpg}
            onChange={(e) => setMpg(e.target.value)}
            className="mt-1 h-11 w-full border border-line bg-paper px-3 font-mono tabular-nums"
          />
        </label>
        <label className="block text-sm font-semibold">
          Loaded miles
          <input
            inputMode="decimal"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
            className="mt-1 h-11 w-full border border-line bg-paper px-3 font-mono tabular-nums"
          />
        </label>
      </div>
      <dl className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-muted">Per mile</dt>
          <dd className="font-serif text-3xl tabular-nums">
            {perMile == null ? "—" : money(perMile)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-muted">On this trip</dt>
          <dd className="font-serif text-3xl tabular-nums">
            {trip == null ? "—" : money(trip, 2)}
          </dd>
        </div>
      </dl>
    </form>
  );
}
