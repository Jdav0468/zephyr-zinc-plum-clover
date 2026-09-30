import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as getDesk } from "./daily.server-CVoKyefZ.mjs";
import { t as formatDate } from "./format-6f5FKyBb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post-meta-B49Ab_ys.js
var import_jsx_runtime = require_jsx_runtime();
function PostMeta({ post }) {
	const desk = getDesk(post.desk);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted",
		children: [
			desk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/desk/$desk",
				params: { desk: desk.id },
				className: "kicker",
				children: desk.label
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
				dateTime: post.date,
				children: formatDate(post.date)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [post.minutes, " min read"] })
		]
	});
}
//#endregion
export { PostMeta as t };
