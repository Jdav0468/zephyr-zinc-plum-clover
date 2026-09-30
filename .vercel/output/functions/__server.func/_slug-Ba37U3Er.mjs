import { C as require_jsx_runtime, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Ba37U3Er.js
var import_jsx_runtime = require_jsx_runtime();
function MissingBrief() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Missing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-serif text-4xl font-semibold",
				children: "That briefing is not on the desk."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/archive",
				className: "mt-6 inline-flex h-11 items-center bg-navy px-4 text-sm font-semibold text-sheet",
				children: "Browse the archive"
			})
		]
	});
}
//#endregion
export { MissingBrief as notFoundComponent };
