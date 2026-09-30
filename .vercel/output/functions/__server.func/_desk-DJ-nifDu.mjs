import { C as require_jsx_runtime, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./_ssr/router-CeXtHNKM.mjs";
import { t as PostMeta } from "./_ssr/post-meta-B49Ab_ys.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_desk-DJ-nifDu.js
var import_jsx_runtime = require_jsx_runtime();
function DeskPage() {
	const { desk, posts } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: "Desk"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-serif text-4xl font-semibold",
			children: desk.label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-lg text-ink-soft",
			children: desk.blurb
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-8 divide-y divide-line border-t border-ink",
			children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "py-6",
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
						className: "mt-2 max-w-3xl text-ink-soft",
						children: post.dek
					})
				]
			}, post.slug))
		}),
		posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-muted",
			children: "Nothing filed on this desk yet."
		}) : null
	] });
}
//#endregion
export { DeskPage as component };
