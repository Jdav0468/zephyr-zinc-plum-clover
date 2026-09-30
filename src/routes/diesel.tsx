import { createFileRoute, Link } from "@tanstack/react-router";
import { DieselChart, RegionTable, SurchargeCalc } from "@/components/diesel-panel";
import { dieselYearAgo, latestDiesel } from "@/lib/content/diesel";
import { loadFeed } from "@/lib/daily.functions";
import { formatDate, money } from "@/lib/format";

export const Route = createFileRoute("/diesel")({
  loader: () => loadFeed(),
  head: () => ({
    meta: [
      { title: "Diesel desk — The Ro-Mac Brief" },
      {
        name: "description",
        content:
          "The EIA weekly diesel price freight contracts use, by region, with a plain fuel-surcharge calculator.",
      },
    ],
  }),
  component: DieselPage,
});

function DieselPage() {
  const { diesel } = Route.useLoaderData();
  const price = diesel?.price ?? latestDiesel.price;
  const weekDelta = price - (diesel ? latestDiesel.price : 6.285);
  const yearDelta = price - dieselYearAgo;
  const weekDetail = diesel
    ? `Was ${money(latestDiesel.price)} on ${formatDate(latestDiesel.week)}`
    : "Was $6.285 on September 14";
  const latestDetail = diesel
    ? `Week of ${diesel.label}. ${diesel.sourceLabel}`
    : "Week of September 21, 2026";
  return (
    <div>
      <p className="kicker">Diesel desk</p>
      <h1 className="mt-2 max-w-3xl font-serif text-4xl leading-tight font-semibold">
        The number behind the fuel line.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Freight contracts do not use the price painted on a single truck stop. They use a
        weekly U.S. average from the Energy Information Administration. Here is the latest
        published reading, what it replaced, and how a surcharge is built from it.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Latest weekly average" value={money(price)} detail={latestDetail} />
        <Stat label="Versus prior week" value={`${weekDelta >= 0 ? "+" : ""}${money(weekDelta)}`} detail={weekDetail} />
        <Stat label="Versus a year ago" value={`+${money(yearDelta)}`} detail="Was $3.749" />
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-2xl font-semibold">Eight weeks, one direction</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          EIA weekly U.S. on-highway diesel. August 3 through September 21, 2026. No estimated weeks.
        </p>
        <div className="mt-4 border border-line bg-sheet p-4">
          <DieselChart tick={diesel} />
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Same week, by region</h2>
          <p className="mt-2 text-sm text-muted">
            California is not the national average. The Gulf Coast is not California. A contract
            that says “DOE” almost always means the U.S. line, unless it names a region.
          </p>
          <div className="mt-4">
            <RegionTable />
          </div>
        </div>
        <div>
          <h2 className="font-serif text-2xl font-semibold">What a surcharge is doing</h2>
          <div className="mt-4">
            <SurchargeCalc price={price} />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            A different daily survey, such as AAA, can print another national average on the same
            morning. That does not mean one of them is fake. They sample different stations on
            different clocks. If a contract names the DOE or EIA weekly index, use this page, not a pump photo.
          </p>
          <Link
            to="/brief/$slug"
            params={{ slug: "diesel-record-6529" }}
            className="mt-4 inline-flex h-11 items-center text-sm font-semibold text-navy underline decoration-line underline-offset-4"
          >
            Read: diesel just set a record
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border border-line bg-sheet p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-serif text-3xl tabular-nums">{value}</p>
      <p className="mt-2 text-sm text-ink-soft">{detail}</p>
    </div>
  );
}
