import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as latestDiesel, s as dieselYearAgo } from "./daily.server-CVoKyefZ.mjs";
import { o as Route$6 } from "./router-CeXtHNKM.mjs";
import { n as money, t as formatDate } from "./format-6f5FKyBb.mjs";
import { i as SurchargeCalc, r as RegionTable, t as DieselChart } from "./diesel-panel-Dfip7xi1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diesel-BWkhljj2.js
var import_jsx_runtime = require_jsx_runtime();
function DieselPage() {
	const { diesel } = Route$6.useLoaderData();
	const price = diesel?.price ?? latestDiesel.price;
	const weekDelta = price - (diesel ? latestDiesel.price : 6.285);
	const yearDelta = price - dieselYearAgo;
	const weekDetail = diesel ? `Was ${money(latestDiesel.price)} on ${formatDate(latestDiesel.week)}` : "Was $6.285 on September 14";
	const latestDetail = diesel ? `Week of ${diesel.label}. ${diesel.sourceLabel}` : "Week of September 21, 2026";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: "Diesel desk"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 max-w-3xl font-serif text-4xl leading-tight font-semibold",
			children: "The number behind the fuel line."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-2xl text-lg text-ink-soft",
			children: "Freight contracts do not use the price painted on a single truck stop. They use a weekly U.S. average from the Energy Information Administration. Here is the latest published reading, what it replaced, and how a surcharge is built from it."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Latest weekly average",
					value: money(price),
					detail: latestDetail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Versus prior week",
					value: `${weekDelta >= 0 ? "+" : ""}${money(weekDelta)}`,
					detail: weekDetail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Versus a year ago",
					value: `+${money(yearDelta)}`,
					detail: "Was $3.749"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl font-semibold",
					children: "Eight weeks, one direction"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "EIA weekly U.S. on-highway diesel. August 3 through September 21, 2026. No estimated weeks."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 border border-line bg-sheet p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DieselChart, { tick: diesel })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10 grid gap-8 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl font-semibold",
					children: "Same week, by region"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "California is not the national average. The Gulf Coast is not California. A contract that says “DOE” almost always means the U.S. line, unless it names a region."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegionTable, {})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl font-semibold",
					children: "What a surcharge is doing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SurchargeCalc, { price })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-ink-soft",
					children: "A different daily survey, such as AAA, can print another national average on the same morning. That does not mean one of them is fake. They sample different stations on different clocks. If a contract names the DOE or EIA weekly index, use this page, not a pump photo."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/brief/$slug",
					params: { slug: "diesel-record-6529" },
					className: "mt-4 inline-flex h-11 items-center text-sm font-semibold text-navy underline decoration-line underline-offset-4",
					children: "Read: diesel just set a record"
				})
			] })]
		})
	] });
}
function Stat({ label, value, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-line bg-sheet p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-serif text-3xl tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-ink-soft",
				children: detail
			})
		]
	});
}
//#endregion
export { DieselPage as component };
