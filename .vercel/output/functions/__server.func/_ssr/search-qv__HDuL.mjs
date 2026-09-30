import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Route$3 } from "./router-CeXtHNKM.mjs";
import { t as PostMeta } from "./post-meta-B49Ab_ys.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-qv__HDuL.js
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q, results } = Route$3.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: "Search"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-serif text-4xl font-semibold",
			children: q ? `Results for “${q}”` : "Search the brief"
		}),
		!q ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-ink-soft",
			children: "Try diesel, English, chameleon, surcharge, or medical card."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-sm text-muted",
			children: [
				results.length,
				" ",
				results.length === 1 ? "briefing" : "briefings"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-line border-t border-ink",
			children: results.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostMeta, { post }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-serif text-2xl font-semibold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/brief/$slug",
							params: { slug: post.slug },
							className: "hover:text-navy",
							children: post.title
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-ink-soft",
						children: post.dek
					})
				]
			}, post.slug))
		})
	] });
}
//#endregion
export { SearchPage as component };
