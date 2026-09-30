import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, S as useRouter, Z as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as starterSlugs, u as desks } from "./daily.server-CVoKyefZ.mjs";
import { c as Route$8, d as fileToday } from "./router-CeXtHNKM.mjs";
import { t as formatDate } from "./format-6f5FKyBb.mjs";
import { t as PostMeta } from "./post-meta-B49Ab_ys.mjs";
import { n as DieselSnapshot } from "./diesel-panel-Dfip7xi1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cox73dHY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeskBot() {
	const router = useRouter();
	const [note, setNote] = (0, import_react.useState)("The desk bot checks public sources once a day.");
	(0, import_react.useEffect)(() => {
		let cancel = false;
		async function file() {
			for (let attempt = 0; attempt < 6; attempt += 1) {
				const result = await fileToday();
				if (cancel) return;
				if (result.state === "ready" && result.created) {
					setNote("Today's briefing is filed.");
					await router.invalidate();
					return;
				}
				if (result.state === "ready") {
					setNote("Today's briefing is already on the desk.");
					return;
				}
				if (result.state === "skipped") {
					setNote("The desk bot could not verify a new briefing today. Yesterday's stories stay up.");
					return;
				}
				setNote("The desk bot is filing today's briefing.");
				await new Promise((resolve) => setTimeout(resolve, 4e3));
			}
		}
		file().catch(() => {
			if (!cancel) setNote("The desk bot will try again on the next visit.");
		});
		return () => {
			cancel = true;
		};
	}, [router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: note
	});
}
function Home() {
	const { posts, diesel } = Route$8.useLoaderData();
	const lead = posts[0];
	const rest = posts.slice(1, 5);
	const starters = starterSlugs.map((slug) => posts.find((post) => post.slug === slug)).filter((post) => Boolean(post));
	if (!lead) return null;
	const filedByBot = lead.slug.startsWith("edition-");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
					dateTime: lead.date,
					children: formatDate(lead.date, true)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "px-2 text-faint",
					children: "/"
				}),
				filedByBot ? "Filed by the desk bot" : "Edition for readers outside the cab"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskBot, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-8 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostMeta, { post: lead }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-serif text-4xl leading-tight font-semibold text-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/brief/$slug",
							params: { slug: lead.slug },
							className: "hover:text-navy",
							children: lead.title
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft",
						children: lead.dek
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 border-l-2 border-navy pl-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: "If this is not your industry"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-base leading-relaxed text-ink-soft",
							children: lead.plain
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/brief/$slug",
						params: { slug: lead.slug },
						className: "mt-6 inline-flex h-11 items-center bg-navy px-4 text-sm font-semibold text-sheet",
						children: "Read the briefing"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DieselSnapshot, { tick: diesel })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12 border-t border-ink pt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl font-semibold",
				children: "Also on the desk"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-line",
				children: rest.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostMeta, { post }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-serif text-2xl leading-snug font-semibold",
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
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12 border border-navy bg-sheet px-5 py-8 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "New here"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 max-w-xl font-serif text-3xl leading-tight font-semibold",
					children: "Four pieces that make the rest of the news readable."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 grid gap-4 md:grid-cols-2",
					children: starters.map((post, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/brief/$slug",
						params: { slug: post.slug },
						className: "block border border-line p-4 hover:border-navy",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-sm text-navy",
							children: ["0", i + 1]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block font-serif text-xl leading-snug",
							children: post.title
						})]
					}) }, post.slug))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl font-semibold",
				children: "Desks"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-3 sm:grid-cols-2",
				children: desks.map((desk) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/desk/$desk",
					params: { desk: desk.id },
					className: "flex h-full flex-col border border-line bg-sheet p-4 hover:border-navy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "kicker",
						children: desk.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 text-sm leading-relaxed text-ink-soft",
						children: desk.blurb
					})]
				}) }, desk.id))
			})]
		})
	] });
}
//#endregion
export { Home as component };
