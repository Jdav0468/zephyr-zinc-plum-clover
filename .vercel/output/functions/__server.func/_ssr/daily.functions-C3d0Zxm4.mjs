import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/daily.functions-C3d0Zxm4.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadFeed_createServerFn_handler = createServerRpc({
	id: "e8fb36c0d7bd0a2b4eacec51f7f372a124970e1048d35837613d900dc0743f08",
	name: "loadFeed",
	filename: "src/lib/daily.functions.ts"
}, (opts) => loadFeed.__executeServer(opts));
var loadFeed = createServerFn({ method: "GET" }).handler(loadFeed_createServerFn_handler, async () => {
	const { loadFeedData } = await import("./daily.server-CVoKyefZ.mjs").then((n) => n.t);
	return loadFeedData();
});
var loadArticle_createServerFn_handler = createServerRpc({
	id: "2529e4be843778d73df1f601e229f68e04f3919d54ccf9ed4dad31b2fef64c0f",
	name: "loadArticle",
	filename: "src/lib/daily.functions.ts"
}, (opts) => loadArticle.__executeServer(opts));
var loadArticle = createServerFn({ method: "GET" }).validator((slug) => slug).handler(loadArticle_createServerFn_handler, async ({ data: slug }) => {
	const { loadArticleData } = await import("./daily.server-CVoKyefZ.mjs").then((n) => n.t);
	return loadArticleData(slug);
});
var loadSearch_createServerFn_handler = createServerRpc({
	id: "a9e192a0ee3efb2573dcc1dceeeaf96650922a09df5a3ddf5167d6f106ef3d30",
	name: "loadSearch",
	filename: "src/lib/daily.functions.ts"
}, (opts) => loadSearch.__executeServer(opts));
var loadSearch = createServerFn({ method: "GET" }).validator((q) => typeof q === "string" ? q.slice(0, 80) : "").handler(loadSearch_createServerFn_handler, async ({ data: q }) => {
	const { loadSearchData } = await import("./daily.server-CVoKyefZ.mjs").then((n) => n.t);
	return loadSearchData(q);
});
var loadDesk_createServerFn_handler = createServerRpc({
	id: "869b49c37692671e737eb73eafe90de0b1a265ffd60996ff89100a4b3859f21d",
	name: "loadDesk",
	filename: "src/lib/daily.functions.ts"
}, (opts) => loadDesk.__executeServer(opts));
var loadDesk = createServerFn({ method: "GET" }).validator((id) => id).handler(loadDesk_createServerFn_handler, async ({ data: id }) => {
	const { loadDeskData } = await import("./daily.server-CVoKyefZ.mjs").then((n) => n.t);
	return loadDeskData(id);
});
var fileToday_createServerFn_handler = createServerRpc({
	id: "30b566f10d2c47a5d0896daaf321918b1e273b53b65ed31bc735f8d082c01e2e",
	name: "fileToday",
	filename: "src/lib/daily.functions.ts"
}, (opts) => fileToday.__executeServer(opts));
var fileToday = createServerFn({ method: "POST" }).handler(fileToday_createServerFn_handler, async () => {
	const { ensureToday } = await import("./daily.server-CVoKyefZ.mjs").then((n) => n.t);
	return ensureToday();
});
//#endregion
export { fileToday_createServerFn_handler, loadArticle_createServerFn_handler, loadDesk_createServerFn_handler, loadFeed_createServerFn_handler, loadSearch_createServerFn_handler };
