//#region node_modules/.nitro/vite/services/ssr/assets/format-6f5FKyBb.js
var MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
var WEEKDAYS = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
function formatDate(iso, withWeekday = false) {
	const [y, m, d] = iso.split("-").map(Number);
	const base = `${MONTHS[(m ?? 1) - 1] ?? ""} ${d}, ${y}`;
	if (!withWeekday) return base;
	return `${WEEKDAYS[new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1)).getUTCDay()]}, ${base}`;
}
function money(n, digits = 3) {
	return n.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
//#endregion
export { money as n, formatDate as t };
