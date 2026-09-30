import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, S as useRouter, X as notFound, Z as require_react, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useNavigate, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as number, c as union, i as literal, o as object, s as string } from "../_libs/zod.mjs";
import { d as getDesk, l as __exportAll, n as ensureToday, u as desks } from "./daily.server-CVoKyefZ.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as Bookmark, i as Menu, n as TriangleAlert, r as Search, t as X } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/daily.functions-D9M2rhrC.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadFeed = createServerFn({ method: "GET" }).handler(createSsrRpc("e8fb36c0d7bd0a2b4eacec51f7f372a124970e1048d35837613d900dc0743f08"));
var loadArticle = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("2529e4be843778d73df1f601e229f68e04f3919d54ccf9ed4dad31b2fef64c0f"));
var loadSearch = createServerFn({ method: "GET" }).validator((q) => typeof q === "string" ? q.slice(0, 80) : "").handler(createSsrRpc("a9e192a0ee3efb2573dcc1dceeeaf96650922a09df5a3ddf5167d6f106ef3d30"));
var loadDesk = createServerFn({ method: "GET" }).validator((id) => id).handler(createSsrRpc("869b49c37692671e737eb73eafe90de0b1a265ffd60996ff89100a4b3859f21d"));
var fileToday = createServerFn({ method: "POST" }).handler(createSsrRpc("30b566f10d2c47a5d0896daaf321918b1e273b53b65ed31bc735f8d082c01e2e"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CeXtHNKM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var useSaved = create()(persist((set, get) => ({
	slugs: [],
	toggle: (slug) => {
		set({ slugs: get().slugs.includes(slug) ? get().slugs.filter((s) => s !== slug) : [slug, ...get().slugs] });
	}
}), {
	name: "romac-brief-saved",
	skipHydration: true
}));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var links = [
	{
		to: "/",
		label: "Today"
	},
	{
		to: "/archive",
		label: "Archive"
	},
	{
		to: "/diesel",
		label: "Diesel"
	},
	{
		to: "/glossary",
		label: "Glossary"
	},
	{
		to: "/saved",
		label: "Saved"
	}
];
function Shell({ children }) {
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const savedCount = useSaved((s) => s.slugs.length);
	(0, import_react.useEffect)(() => {
		useSaved.persist.rehydrate();
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	function onSearch(e) {
		e.preventDefault();
		const query = q.trim();
		navigate({
			to: "/search",
			search: { q: query }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-line bg-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/romac-mark.png",
								alt: "",
								className: "hidden h-10 w-auto sm:block"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-sm text-ink-soft italic sm:text-base",
								children: "Moving Your Future Forward"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: onSearch,
								className: "hidden items-center gap-2 md:flex",
								role: "search",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "sr-only",
										htmlFor: "site-search",
										children: "Search the brief"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "site-search",
										value: q,
										onChange: (e) => setQ(e.target.value),
										placeholder: "Search the brief",
										className: "h-11 w-52 border border-line bg-sheet px-3 text-sm text-ink placeholder:text-faint"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										className: "inline-flex h-11 items-center gap-2 bg-navy px-3 text-sm font-semibold text-sheet",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
											className: "size-4",
											"aria-hidden": "true"
										}), "Search"]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mast-rule" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "group flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/romac-lockup.png",
									alt: "Ro-Mac Logistics",
									className: "h-24 w-auto sm:h-28"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "border-l border-navy pl-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "kicker",
										children: "Daily freight briefing"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block font-serif text-2xl leading-none text-ink sm:text-4xl",
										children: "The Brief"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "inline-flex h-11 w-11 items-center justify-center border border-line md:hidden",
								"aria-expanded": open,
								"aria-controls": "mobile-nav",
								onClick: () => setOpen((v) => !v),
								children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "sr-only",
									children: open ? "Close menu" : "Open menu"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base",
							children: "What is happening in transportation, written for people who do not already speak the industry."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hairline" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "mx-auto hidden max-w-6xl flex-col px-6 md:flex",
						"aria-label": "Primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center",
							children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: l.to,
								className: "inline-flex h-11 items-center px-3 text-sm font-semibold text-ink-soft hover:text-ink",
								activeOptions: { exact: l.to === "/" },
								activeProps: { className: "inline-flex h-11 items-center px-3 text-sm font-semibold text-navy" },
								children: [l.label, l.to === "/saved" && savedCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 font-mono text-xs tabular-nums text-muted",
									children: savedCount
								}) : null]
							}, l.to))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center border-t border-line",
							children: desks.filter((d) => d.id !== "news" && d.id !== "diesel").map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/desk/$desk",
								params: { desk: d.id },
								className: "inline-flex h-11 items-center px-3 text-sm text-muted hover:text-ink",
								activeProps: { className: "inline-flex h-11 items-center px-3 text-sm font-semibold text-navy" },
								children: d.id === "cdl" ? "Drivers" : d.id === "laws" ? "Laws" : d.id === "fraud" ? "Fraud" : d.label
							}, d.id))
						})]
					}),
					open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "mobile-nav",
						className: "border-t border-line px-4 py-4 md:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: onSearch,
							className: "mb-4 flex gap-2",
							role: "search",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "sr-only",
									htmlFor: "mobile-search",
									children: "Search the brief"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "mobile-search",
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Search",
									className: "h-11 min-w-0 flex-1 border border-line bg-sheet px-3 text-sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "h-11 bg-navy px-4 text-sm font-semibold text-sheet",
									children: "Search"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: l.to,
								className: "flex h-11 items-center border border-line px-3 text-sm font-semibold",
								children: [l.to === "/saved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "mr-2 size-4" }) : null, l.label]
							}, l.to)), desks.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/desk/$desk",
								params: { desk: d.id },
								className: "flex h-11 items-center border border-line px-3 text-sm",
								children: d.label
							}, d.id))]
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: cn("mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10"),
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-navy bg-sheet text-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/romac-mark.png",
								alt: "",
								className: "h-12 w-auto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 font-serif text-2xl",
								children: "The Ro-Mac Brief"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted",
								children: "Published by Ro-Mac Logistics for shippers, warehouse teams, drivers' families, and anyone who shares the highway. We explain the news. We do not sell a miracle fix."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: "Read next"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/diesel",
									className: "underline decoration-line underline-offset-4",
									children: "Diesel desk"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/glossary",
									className: "underline decoration-line underline-offset-4",
									children: "Glossary"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/archive",
									className: "underline decoration-line underline-offset-4",
									children: "Full archive"
								}) })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "kicker",
							children: "A note on the numbers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: "Diesel figures are the EIA weekly on-highway series unless we say otherwise. Enforcement counts are attributed to the agency that published them. This is not legal, insurance, or contracting advice. Check the original source before you rely on a figure in a contract."
						})] })
					]
				})
			})
		]
	});
}
var styles_default = "/assets/styles-Cll-4mNL.css";
var APP_NAME = "The Ro-Mac Brief";
var Route$9 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "A daily briefing from Ro-Mac Logistics on trucking news, laws, diesel prices, cargo theft, illegal CDLs, and fraudulent carriers — written for people outside the industry."
			},
			{
				name: "theme-color",
				content: "#000000"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/png",
				href: "/romac-mark.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$7 = () => import("./routes-Cox73dHY.mjs");
var Route$8 = createFileRoute("/")({
	loader: () => loadFeed(),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./archive-j3Asy30X.mjs");
var Route$7 = createFileRoute("/archive")({
	loader: () => loadFeed(),
	head: () => ({ meta: [{ title: "Archive — The Ro-Mac Brief" }, {
		name: "description",
		content: "Every Ro-Mac Logistics briefing, newest first."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./diesel-BWkhljj2.mjs");
var Route$6 = createFileRoute("/diesel")({
	loader: () => loadFeed(),
	head: () => ({ meta: [{ title: "Diesel desk — The Ro-Mac Brief" }, {
		name: "description",
		content: "The EIA weekly diesel price freight contracts use, by region, with a plain fuel-surcharge calculator."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./glossary-bRdOAzx-.mjs");
var Route$5 = createFileRoute("/glossary")({
	head: () => ({ meta: [{ title: "Glossary — The Ro-Mac Brief" }, {
		name: "description",
		content: "Plain-language definitions for the words trucking news assumes you already know."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./saved-Cjjcra2H.mjs");
var Route$4 = createFileRoute("/saved")({
	loader: () => loadFeed(),
	head: () => ({ meta: [{ title: "Saved — The Ro-Mac Brief" }, {
		name: "description",
		content: "Briefings you saved in this browser."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./search-qv__HDuL.mjs");
var Route$3 = createFileRoute("/search")({
	validateSearch: (search) => ({ q: typeof search.q === "string" ? search.q : "" }),
	loaderDeps: ({ search }) => ({ q: search.q }),
	loader: ({ deps }) => loadSearch({ data: deps.q }),
	head: () => ({ meta: [{ title: "Search — The Ro-Mac Brief" }, {
		name: "description",
		content: "Search Ro-Mac Logistics briefings."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var Route$2 = createFileRoute("/api/daily")({ server: { handlers: { GET: async () => {
	try {
		const result = await ensureToday();
		return Response.json(result);
	} catch (error) {
		const message = error instanceof Error ? error.message : "daily bot failed";
		return Response.json({
			state: "skipped",
			reason: message
		}, { status: 500 });
	}
} } } });
var $$splitComponentImporter$1 = () => import("../_slug-DIq6z2NM.mjs");
var $$splitNotFoundComponentImporter$1 = () => import("../_slug-Ba37U3Er.mjs");
var Route$1 = createFileRoute("/brief/$slug")({
	loader: async ({ params }) => {
		const data = await loadArticle({ data: params.slug });
		if (!data) throw notFound();
		return data;
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.post.title} — The Ro-Mac Brief` }, {
		name: "description",
		content: loaderData.post.dek
	}] : [{ title: "Not found — The Ro-Mac Brief" }] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_desk-DJ-nifDu.mjs");
var $$splitNotFoundComponentImporter = () => import("../_desk-BJr00MUW.mjs");
var Route = createFileRoute("/desk/$desk")({
	loader: async ({ params }) => {
		const desk = getDesk(params.desk);
		if (!desk) throw notFound();
		return {
			desk,
			posts: await loadDesk({ data: desk.id })
		};
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [{ title: `${loaderData.desk.label} — The Ro-Mac Brief` }, {
		name: "description",
		content: loaderData.desk.blurb
	}] : [{ title: "Desk — The Ro-Mac Brief" }] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$8.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$9
	}),
	ArchiveRoute: Route$7.update({
		id: "/archive",
		path: "/archive",
		getParentRoute: () => Route$9
	}),
	DieselRoute: Route$6.update({
		id: "/diesel",
		path: "/diesel",
		getParentRoute: () => Route$9
	}),
	GlossaryRoute: Route$5.update({
		id: "/glossary",
		path: "/glossary",
		getParentRoute: () => Route$9
	}),
	SavedRoute: Route$4.update({
		id: "/saved",
		path: "/saved",
		getParentRoute: () => Route$9
	}),
	SearchRoute: Route$3.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => Route$9
	}),
	ApiDailyRoute: Route$2.update({
		id: "/api/daily",
		path: "/api/daily",
		getParentRoute: () => Route$9
	}),
	BriefSlugRoute: Route$1.update({
		id: "/brief/$slug",
		path: "/brief/$slug",
		getParentRoute: () => Route$9
	}),
	DeskDeskRoute: Route.update({
		id: "/desk/$desk",
		path: "/desk/$desk",
		getParentRoute: () => Route$9
	})
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$4 as a, Route$8 as c, fileToday as d, Route$3 as i, cn as l, Route as n, Route$6 as o, Route$1 as r, Route$7 as s, router_exports as t, useSaved as u };
