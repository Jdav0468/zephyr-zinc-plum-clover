import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as chartWeeks, c as latestDiesel, i as DOE_INDEX_NOTE, o as dieselRegions, s as dieselYearAgo } from "./daily.server-CVoKyefZ.mjs";
import { n as money } from "./format-6f5FKyBb.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/diesel-panel-Dfip7xi1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DieselSnapshot({ tick }) {
	const price = tick?.price ?? latestDiesel.price;
	const when = tick?.label ?? "Sep 21, 2026";
	const delta = price - dieselYearAgo;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "border border-line bg-sheet p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Diesel desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-serif text-4xl leading-none font-semibold tabular-nums text-ink",
				children: money(price)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"U.S. average, week of ",
					when,
					". Up ",
					money(delta, 3),
					" from a year ago."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm leading-relaxed text-ink-soft",
				children: "This is the weekly government number freight contracts use. It is not the sign at one truck stop, and it is a series record."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/diesel",
				className: "mt-5 inline-flex h-11 items-center bg-navy px-4 text-sm font-semibold text-sheet",
				children: "Open the diesel desk"
			})
		]
	});
}
function DieselChart({ tick }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	const data = chartWeeks(tick ?? null);
	const prices = data.map((week) => week.price);
	const min = Math.min(...prices);
	const max = Math.max(...prices);
	const domain = max <= 7 && min >= 5 ? [5, 7] : [Math.floor(min * 2) / 2, Math.ceil(max * 2) / 2];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-72 w-full text-navy",
		children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-line)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "var(--color-muted)",
							fontSize: 12
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						domain,
						tick: {
							fill: "var(--color-muted)",
							fontSize: 12
						},
						axisLine: false,
						tickLine: false,
						width: 48,
						tickFormatter: (v) => `$${v.toFixed(2)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						formatter: (value) => [money(Number(value)), "Diesel"],
						labelFormatter: (label) => `Week of ${label}`,
						contentStyle: {
							background: "var(--color-sheet)",
							border: "1px solid var(--color-line)",
							borderRadius: 0,
							color: "var(--color-ink)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "price",
						stroke: "currentColor",
						strokeWidth: 2,
						dot: {
							r: 3,
							fill: "currentColor"
						},
						isAnimationActive: false
					})
				]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full w-full bg-paper-2",
			"aria-hidden": "true"
		})
	});
}
function RegionTable() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[32rem] text-left text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
					className: "sr-only",
					children: "EIA on-highway diesel by region, week of September 21, 2026"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-ink text-xs tracking-wide text-muted uppercase",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4 font-semibold",
							children: "Region"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4 font-semibold",
							children: "$/gal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-4 font-semibold",
							children: "Week"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-semibold",
							children: "Year"
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: dieselRegions.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-3 pr-4 font-medium text-ink",
							children: row.region
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-4 font-mono tabular-nums",
							children: row.price.toFixed(3)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-3 pr-4 font-mono text-warn tabular-nums",
							children: ["+", row.week.toFixed(3)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-3 font-mono text-warn tabular-nums",
							children: ["+", row.year.toFixed(3)]
						})
					]
				}, row.region)) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-xs leading-relaxed text-muted",
			children: DOE_INDEX_NOTE
		})]
	});
}
function SurchargeCalc({ price = latestDiesel.price }) {
	const [base, setBase] = (0, import_react.useState)("1.20");
	const [mpg, setMpg] = (0, import_react.useState)("6.5");
	const [miles, setMiles] = (0, import_react.useState)("500");
	const b = Number(base);
	const m = Number(mpg);
	const mi = Number(miles);
	const perMile = Number.isFinite(b) && Number.isFinite(m) && m > 0 ? (price - b) / m : null;
	const trip = perMile != null && Number.isFinite(mi) && mi >= 0 ? perMile * mi : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "border border-line bg-sheet p-5",
		onSubmit: (e) => e.preventDefault(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Try the formula"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm leading-relaxed text-ink-soft",
				children: [
					"Surcharge per mile = (DOE price − contract base) ÷ miles per gallon. The DOE price is fixed here at ",
					money(price),
					". The other two numbers belong to the contract, not the government."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold",
						children: ["Base price", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "decimal",
							value: base,
							onChange: (e) => setBase(e.target.value),
							className: "mt-1 h-11 w-full border border-line bg-paper px-3 font-mono tabular-nums"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold",
						children: ["Miles per gallon", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "decimal",
							value: mpg,
							onChange: (e) => setMpg(e.target.value),
							className: "mt-1 h-11 w-full border border-line bg-paper px-3 font-mono tabular-nums"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold",
						children: ["Loaded miles", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "decimal",
							value: miles,
							onChange: (e) => setMiles(e.target.value),
							className: "mt-1 h-11 w-full border border-line bg-paper px-3 font-mono tabular-nums"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-sm text-muted",
					children: "Per mile"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "font-serif text-3xl tabular-nums",
					children: perMile == null ? "—" : money(perMile)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-sm text-muted",
					children: "On this trip"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "font-serif text-3xl tabular-nums",
					children: trip == null ? "—" : money(trip, 2)
				})] })]
			})
		]
	});
}
//#endregion
export { SurchargeCalc as i, DieselSnapshot as n, RegionTable as r, DieselChart as t };
