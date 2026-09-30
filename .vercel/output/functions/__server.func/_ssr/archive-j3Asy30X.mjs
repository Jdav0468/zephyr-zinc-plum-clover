import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Route$7 } from "./router-CeXtHNKM.mjs";
import { t as PostMeta } from "./post-meta-B49Ab_ys.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/archive-j3Asy30X.js
var import_jsx_runtime = require_jsx_runtime();
function ArchivePage() {
	const { posts } = Route$7.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: "Archive"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-serif text-4xl font-semibold",
			children: "Every briefing"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 max-w-2xl text-ink-soft",
			children: [posts.length, " pieces, newest first. Start with any headline. Each one opens with a plain-language box if you do not work in freight."]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 divide-y divide-line border-t border-ink",
			children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-2 py-5 md:grid-cols-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostMeta, { post }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl font-semibold",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/brief/$slug",
							params: { slug: post.slug },
							className: "hover:text-navy",
							children: post.title
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-ink-soft",
						children: post.dek
					})]
				})]
			}, post.slug))
		})
	] });
}
//#endregion
export { ArchivePage as component };
