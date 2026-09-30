import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$4, u as useSaved } from "./router-CeXtHNKM.mjs";
import { t as PostMeta } from "./post-meta-B49Ab_ys.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-Cjjcra2H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SavedPage() {
	const { posts: all } = Route$4.useLoaderData();
	const [ready, setReady] = (0, import_react.useState)(false);
	const slugs = useSaved((s) => s.slugs);
	(0, import_react.useEffect)(() => setReady(true), []);
	const posts = slugs.map((slug) => all.find((post) => post.slug === slug)).filter((post) => Boolean(post));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: "Saved"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-serif text-4xl font-semibold",
			children: "Kept on this device."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-ink-soft",
			children: "Saved briefings stay in this browser. They are not an account, and they do not follow you to another phone."
		}),
		!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-muted",
			children: "Checking what you saved…"
		}) : null,
		ready && posts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 text-ink-soft",
			children: [
				"Nothing saved yet. Open any briefing and use Save.",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/archive",
					className: "text-navy underline",
					children: "Browse the archive."
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-line border-t border-ink",
			children: ready ? posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostMeta, { post }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-serif text-2xl font-semibold",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/brief/$slug",
						params: { slug: post.slug },
						className: "hover:text-navy",
						children: post.title
					})
				})]
			}, post.slug)) : null
		})
	] });
}
//#endregion
export { SavedPage as component };
