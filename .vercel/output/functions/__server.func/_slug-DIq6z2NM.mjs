import { o as __toESM } from "./_runtime.mjs";
import { C as require_jsx_runtime, Z as require_react, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Bookmark } from "./_libs/lucide-react.mjs";
import { l as cn, r as Route$1, u as useSaved } from "./_ssr/router-CeXtHNKM.mjs";
import { t as PostMeta } from "./_ssr/post-meta-B49Ab_ys.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DIq6z2NM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Blocks({ blocks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "prose-brief text-base leading-relaxed text-ink-soft",
		children: blocks.map((block, i) => {
			if (block.type === "p") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: block.text }, i);
			if (block.type === "h") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-ink",
				children: block.text
			}, i);
			if (block.type === "ul") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item)) }, i);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "border border-navy bg-wash px-4 py-4 text-ink sm:px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: block.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base leading-relaxed",
					children: block.text
				})]
			}, i);
		})
	});
}
function SaveButton({ slug }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	const saved = useSaved((s) => s.slugs.includes(slug));
	const toggle = useSaved((s) => s.toggle);
	(0, import_react.useEffect)(() => {
		setReady(true);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => toggle(slug),
		"aria-pressed": ready ? saved : false,
		className: cn("inline-flex h-11 items-center gap-2 border px-3 text-sm font-semibold", ready && saved ? "border-navy bg-navy text-sheet" : "border-line bg-sheet text-ink"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
			className: "size-4",
			"aria-hidden": "true"
		}), ready && saved ? "Saved" : "Save"]
	});
}
function Article() {
	const { post, related } = Route$1.useLoaderData();
	const filedByBot = post.slug.startsWith("edition-");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostMeta, { post }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-serif text-4xl leading-tight font-semibold",
				children: post.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg leading-relaxed text-ink-soft",
				children: post.dek
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { slug: post.slug }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-muted",
					children: [post.minutes, " minute read"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-8 border border-line bg-sheet px-4 py-4 sm:px-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "If this is not your industry"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base leading-relaxed text-ink-soft",
					children: post.plain
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blocks, { blocks: post.blocks })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 border-t border-line pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-xl font-semibold",
						children: "Sources"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm text-ink-soft",
						children: post.sources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: source.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: source.href,
							className: "underline decoration-line underline-offset-4",
							children: source.label
						}) : source.label }, source.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-xs leading-relaxed text-muted",
						children: ["The Ro-Mac Brief summarizes public reporting for a general reader. Figures can be revised by the agency that published them. This is not legal advice.", filedByBot ? " This edition was filed by the desk bot from the sources below, not typed in by hand." : ""]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-xl font-semibold",
					children: "Keep reading"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-line border-y border-line",
					children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/brief/$slug",
							params: { slug: item.slug },
							className: "font-serif text-lg hover:text-navy",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: item.dek
						})]
					}, item.slug))
				})]
			})
		]
	});
}
//#endregion
export { Article as component };
