import { a as number, i as literal, n as array, o as object, r as discriminatedUnion, s as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desks-DpCumaeg.js
var desks = [
	{
		id: "government",
		label: "Government",
		blurb: "What agencies are doing, and what that changes on the road."
	},
	{
		id: "laws",
		label: "Laws & rules",
		blurb: "The rulebook, translated out of regulation-speak."
	},
	{
		id: "cdl",
		label: "Licenses & drivers",
		blurb: "Who is allowed to drive a truck, and how that license is earned."
	},
	{
		id: "diesel",
		label: "Diesel",
		blurb: "The fuel number behind freight bills, surcharges, and empty miles."
	},
	{
		id: "theft",
		label: "Cargo theft",
		blurb: "How freight disappears now — usually without a broken lock."
	},
	{
		id: "fraud",
		label: "Fraudulent companies",
		blurb: "Fake carriers, stolen identities, and companies that vanish overnight."
	},
	{
		id: "news",
		label: "The basics",
		blurb: "Foundations. Read these if the rest of the brief uses words you don't."
	}
];
function getDesk(id) {
	return desks.find((d) => d.id === id);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/daily.server-CVoKyefZ.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var _0002_editions_default = "create table if not exists editions (\n  slug text primary key,\n  edition_date date not null unique,\n  status text not null,\n  attempts integer not null default 0,\n  title text,\n  dek text,\n  desk text,\n  minutes integer,\n  plain text,\n  blocks jsonb,\n  sources jsonb,\n  error text,\n  started_at timestamptz not null default now(),\n  ready_at timestamptz\n);\n\ncreate table if not exists diesel_ticks (\n  week_of date primary key,\n  price numeric not null,\n  label text not null,\n  source_label text not null,\n  source_href text\n);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_editions.sql": _0002_editions_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
/** EIA weekly U.S. on-highway diesel, dollars per gallon. Verified survey weeks only. */
var dieselWeeks = [
	{
		week: "2026-08-03",
		label: "Aug 3",
		price: 5.348
	},
	{
		week: "2026-08-10",
		label: "Aug 10",
		price: 5.257
	},
	{
		week: "2026-08-17",
		label: "Aug 17",
		price: 5.454
	},
	{
		week: "2026-08-24",
		label: "Aug 24",
		price: 5.652
	},
	{
		week: "2026-08-31",
		label: "Aug 31",
		price: 5.599
	},
	{
		week: "2026-09-07",
		label: "Sep 7",
		price: 5.967
	},
	{
		week: "2026-09-14",
		label: "Sep 14",
		price: 6.285
	},
	{
		week: "2026-09-21",
		label: "Sep 21",
		price: 6.529
	}
];
var latestDiesel = dieselWeeks[dieselWeeks.length - 1];
function chartWeeks(tick) {
	const base = dieselWeeks.map((week) => ({
		week: week.week,
		label: week.label,
		price: week.price
	}));
	if (!tick || tick.week <= latestDiesel.week) return base;
	if (base.some((week) => week.week === tick.week)) return base;
	return [...base, tick];
}
var dieselYearAgo = 3.749;
var dieselRegions = [
	{
		region: "United States",
		price: 6.529,
		week: .244,
		year: 2.78
	},
	{
		region: "East Coast",
		price: 6.268,
		week: .11,
		year: 2.523
	},
	{
		region: "New England",
		price: 6.517,
		week: .315,
		year: 2.555
	},
	{
		region: "Central Atlantic",
		price: 6.546,
		week: .234,
		year: 2.638
	},
	{
		region: "Lower Atlantic",
		price: 6.139,
		week: .043,
		year: 2.475
	},
	{
		region: "Midwest",
		price: 6.68,
		week: .43,
		year: 2.949
	},
	{
		region: "Gulf Coast",
		price: 6.177,
		week: .15,
		year: 2.777
	},
	{
		region: "Rocky Mountain",
		price: 6.34,
		week: .274,
		year: 2.593
	},
	{
		region: "West Coast",
		price: 7.456,
		week: .206,
		year: 2.932
	},
	{
		region: "West Coast less California",
		price: 6.791,
		week: .225,
		year: 2.668
	},
	{
		region: "California",
		price: 8.246,
		week: .207,
		year: 3.261
	}
];
var DOE_INDEX_NOTE = "U.S. Energy Information Administration, weekly retail on-highway diesel, week of September 21, 2026. The next weekly release was scheduled for September 29, 2026. A daily pump average (such as AAA) is a different survey and will not match this number.";
var posts = [
	{
		slug: "federal-cdl-crackdown",
		title: "Washington opened a joint crackdown on fraud in trucking",
		dek: "Transportation, Homeland Security, and federal prosecutors are going after sham driving schools, licenses that should never have been issued, and drivers who cannot pass an English check at the roadside.",
		date: "2026-09-29",
		desk: "government",
		minutes: 7,
		plain: "A commercial driver's license is supposed to mean the person behind a 40-ton truck was trained, tested in English, and medically fit. Federal officials say too many licenses skipped those steps. This week they described a coordinated sweep of schools, testers, and state licensing agencies — not a new speed limit.",
		blocks: [
			{
				type: "p",
				text: "On September 28, the U.S. Department of Transportation said it was joining Homeland Security and the Justice Department in an interagency push against fraud in trucking. The public description is blunt: criminal networks and sloppy licensing have put unqualified drivers on the highway, and the agencies intend to use schools, roadside inspections, and state DMVs as the pressure points."
			},
			{
				type: "h",
				text: "What they say they already did"
			},
			{
				type: "p",
				text: "According to the department's own account of the last year and a half, enforcement has already knocked more than 28,000 drivers off the road for failing to speak English, pushed states to cancel more than 30,000 licenses officials say were illegally issued to foreign drivers, and removed more than 8,000 training schools from the federal registry. Those are the government's figures, not an industry estimate."
			},
			{
				type: "p",
				text: "The newest step is narrower and immediate. FMCSA said it is emergency-removing more than 110 entry-level driver training providers. The department tied those schools to more than 5,000 drivers who later failed English-language checks. A school taken off the Training Provider Registry has to stop teaching. Training it gave after removal does not qualify a student for a CDL."
			},
			{
				type: "h",
				text: "Why English is the test they keep naming"
			},
			{
				type: "p",
				text: "This is not a new rule invented this month. Federal regulations have long required a commercial driver to read and speak English well enough to talk with the public, understand signs, fill out reports, and answer an officer. The skills test itself is supposed to be given in English. What changed is enforcement. Since the summer of 2025, failing that check has been putting drivers out of service in large numbers — more than 28,000 out-of-service orders, by the department's count since June 2025."
			},
			{
				type: "p",
				text: "Out of service means the truck stays put. A shipper waiting on a delivery does not experience that as a policy debate. The load sits until a qualified driver arrives. That is why a licensing story in Washington shows up as a late truck in a warehouse."
			},
			{
				type: "h",
				text: "Where investigators are looking next"
			},
			{
				type: "ul",
				items: [
					"Third-party companies that give the driving test for the state. If the test was not really in English, or was never really given, the license is theater.",
					"State agencies that issue non-domiciled CDLs — licenses for drivers who are not residents — for longer than the person's legal stay, or to people who were never eligible.",
					"Medical examiners who sign a DOT physical without examining the driver.",
					"Companies that put visitor-visa holders behind the wheel of domestic freight, which those visas do not allow."
				]
			},
			{
				type: "note",
				title: "Why this matters if you don't work in trucking",
				text: "Highways are shared. A driver who cannot read a detour sign, a bridge weight limit, or an inspector's questions is a safety problem for everyone in the next lane, not only for the company that hired them. It is also a business problem: freight moved by a driver who gets shut down mid-route is freight that misses its appointment. The fair question for any carrier you hire is simple — can you show that your drivers were trained by a school still on the federal list, tested in English, and licensed within the rules?"
			},
			{
				type: "h",
				text: "What is not settled"
			},
			{
				type: "p",
				text: "A crackdown is not the same thing as a finished court case. Some state licensing fights are already in litigation, and a school or a driver can contest a removal. Treat the big round numbers as the government's description of its own enforcement, and look up a specific company before you decide it is dirty. Public records exist for that. Suspicion is not a DOT number."
			}
		],
		sources: [{
			label: "U.S. DOT briefing on the interagency trucking-fraud effort, September 28, 2026",
			href: "https://www.transportation.gov/briefing-room/us-transportation-secretary-duffy-us-homeland-security-secretary-mullin-white-house"
		}, {
			label: "FMCSA — federal motor carrier safety",
			href: "https://www.fmcsa.dot.gov/"
		}]
	},
	{
		slug: "diesel-record-6529",
		title: "Diesel just set a record: $6.529 a gallon",
		dek: "The weekly government average that freight contracts use hit the highest reading in the series that started in 1994. A year ago it was $3.749.",
		date: "2026-09-29",
		desk: "diesel",
		minutes: 6,
		plain: "When people say “diesel is up,” they often mean the sign at one truck stop. Contracts usually mean a different number: a national average the U.S. Energy Information Administration publishes once a week. For the week of September 21, 2026, that number was $6.529. It is the highest weekly reading on record.",
		blocks: [
			{
				type: "p",
				text: "The EIA survey for the week of September 21 printed $6.529 per gallon for U.S. on-highway diesel, up 24.4 cents from the week before and up $2.780 from $3.749 a year earlier. The same series bottomed near a dollar in 1999 and, until this month, the famous peak was 2022, when the weekly average topped out around $5.81. This reading cleared that."
			},
			{
				type: "p",
				text: "September has been a straight climb: $5.967 on September 7, $6.285 on September 14, $6.529 on September 21. The 2025 average for the whole year was $3.660. Through September 21, the 2026 year-to-date average of the weekly readings was $4.974 — and that average is being dragged up by a very expensive autumn, not by a mildly pricey spring."
			},
			{
				type: "h",
				text: "The national number hides a wide map"
			},
			{
				type: "p",
				text: "California averaged $8.246. The Lower Atlantic, which includes much of the Southeast, averaged $6.139. The Midwest jumped 43 cents in a single week, to $6.680. A shipper in Georgia and a shipper in California are not living in the same fuel market, even when a contract quotes “the DOE average.”"
			},
			{
				type: "h",
				text: "Why the sign at the truck stop will not match"
			},
			{
				type: "p",
				text: "Three different “diesel prices” circulate at once. The EIA weekly number is a retail survey used in fuel surcharges, and it lags the week. A daily average such as AAA moves faster and will not match — around September 29, daily national pump quotes were in the mid-$6.40s even while the last weekly index still said $6.529. Futures for ultra-low-sulfur diesel, the wholesale benchmark traders watch, were nearer $4.50 a gallon. The gap between a wholesale benchmark and the pump is tax, refining, distribution, and station margin. None of those is the number your surcharge uses unless the contract says so."
			},
			{
				type: "note",
				title: "Why this matters if you don't work in trucking",
				text: "Fuel is the biggest cost a truck can actually feel week to week. A truck that burns about 100 gallons — a long day, not a coast-to-coast trip — pays roughly $653 at $6.529, against about $375 at last year's neighborhood of $3.75. Somebody pays that difference: the carrier, then the shipper through a surcharge, then the shelf price. If a freight invoice suddenly has a large fuel line, this weekly number is the first place to look. The diesel desk on this site shows the regions and a plain calculator."
			},
			{
				type: "p",
				text: "The EIA was scheduled to publish the next weekly reading on September 29. Until that table is out, $6.529 remains the latest official index. Do not rewrite a contract off a screenshot of a truck-stop sign."
			}
		],
		sources: [{
			label: "EIA weekly retail gasoline and diesel prices",
			href: "https://www.eia.gov/dnav/pet/pet_pri_gnd_dcus_nus_w.htm"
		}, {
			label: "EIA gasoline and diesel fuel update",
			href: "https://www.eia.gov/petroleum/gasdiesel/"
		}]
	},
	{
		slug: "english-proficiency-explained",
		title: "Why a driver can be shut down for not speaking English",
		dek: "It sounds like politics. At the scale, it is a practical rule about signs, crashes, and the person who has to explain what is in the trailer.",
		date: "2026-09-23",
		desk: "cdl",
		minutes: 6,
		plain: "Inspectors can park a truck if the driver cannot communicate in English. That is a federal safety rule, older than the current crackdown. The argument for it is not etiquette. It is whether the driver can read a warning and answer questions when something goes wrong.",
		blocks: [
			{
				type: "p",
				text: "Picture a weigh station. The officer needs to know what the truck weighs, whether the driver is inside legal hours, and what is in the boxes. If a placard says the load is flammable, the driver needs to understand the instruction that follows. If a bridge sign says the truck will not fit, the driver needs to be able to read it without a passenger translating at 60 miles an hour."
			},
			{
				type: "h",
				text: "What the rule actually requires"
			},
			{
				type: "p",
				text: "Federal motor carrier rules say a driver must read and speak English well enough to converse with the general public, understand highway signs in English, respond to official inquiries, and make entries on reports and records. The commercial skills test is supposed to be conducted in English. A school or a state that tests in another language and then issues a standard CDL is not doing a favor. It is skipping the rule the license claims to represent."
			},
			{
				type: "p",
				text: "Enforcement tightened in 2025. Failing the English check can now take a driver out of service instead of ending as a paperwork citation the truck drives away from. The Transportation Department says that change produced more than 28,000 out-of-service orders between June 2025 and the latest crackdown announcements."
			},
			{
				type: "h",
				text: "What this is not"
			},
			{
				type: "p",
				text: "It is not a ban on drivers who speak another language at home. Plenty of safe, legal drivers are bilingual. The check is whether English works on the job: signs, shipping papers, and a conversation with an officer. It is also not proof, by itself, that a driver is in the country unlawfully. Immigration status and English proficiency are related in the current investigations because sham schools and bad licenses often fail both tests at once. They are still different questions."
			},
			{
				type: "note",
				title: "Why this matters if you don't work in trucking",
				text: "If your delivery is late because a driver was placed out of service, ask whether it was hours, a brake, or an English-proficiency order. Those have different fixes. The first two are a relief driver or a mechanic. The third means the carrier put someone in the seat who cannot lawfully continue the trip. That is a hiring problem, and it is fair to ask how the company screens for it before the next load."
			}
		],
		sources: [{
			label: "FMCSA regulations and safety programs",
			href: "https://www.fmcsa.dot.gov/"
		}, {
			label: "U.S. DOT description of English-proficiency out-of-service orders since June 2025",
			href: "https://www.transportation.gov/briefing-room/us-transportation-secretary-duffy-us-homeland-security-secretary-mullin-white-house"
		}]
	},
	{
		slug: "non-domiciled-cdl",
		title: "What a “non-domiciled CDL” is, without the jargon",
		dek: "States can license some drivers who don't live there. Federal auditors say several states issued those licenses to people who were not eligible, or for years longer than the law allows.",
		date: "2026-09-18",
		desk: "laws",
		minutes: 7,
		plain: "Most commercial licenses are issued by the state where the driver lives. A non-domiciled CDL is the exception: a license for someone who is not a resident, often because their permission to be in the United States is temporary. The license is supposed to expire when that permission expires. When it doesn't, you get the phrase people are using — an illegal CDL.",
		blocks: [
			{
				type: "p",
				text: "“Illegal CDL” is not a formal grade of license. It is a description of a license that should not exist in the form it was printed. The driver may have a card that looks real, because a state DMV printed it. The problem is that the state broke the federal rules that tell states who may receive one."
			},
			{
				type: "h",
				text: "How it is supposed to work"
			},
			{
				type: "p",
				text: "A person lawfully in the U.S. on a status that allows it can, in limited cases, get a commercial learner's permit or CDL from a state where they are not domiciled. The license term is not supposed to outlast their lawful presence. Employment-based categories and a check against federal immigration records became much stricter after an FMCSA emergency action in September 2025. A standard eight-year license, handed to someone whose documents expire in a year, is the pattern auditors keep finding."
			},
			{
				type: "p",
				text: "FMCSA has estimated roughly 200,000 non-domiciled CDL holders, about 5 percent of roughly 3.8 million CDL holders counted in 2024. The agency's own projection, reported in the trade press, was that the tighter rule could remove on the order of 194,000 of those credentials over about two years if states issued only a small number of new ones. That projection is a forecast, and parts of the rule have been headed toward court. The direction of enforcement is not ambiguous even where the lawsuits are."
			},
			{
				type: "h",
				text: "What auditors have said about states"
			},
			{
				type: "p",
				text: "FMCSA's pattern with a state is public and repetitive: stop issuing non-domiciled credentials, pull back the ones that do not comply, audit internally, and prove it. Reporting on those audits has named California, Pennsylvania, Minnesota, New York, Texas, South Dakota, Colorado, Washington, and North Carolina. Coverage of a New York sample described about half of the reviewed non-domiciled records as out of compliance, including systems that defaulted to multi-year terms regardless of whether the driver's immigration documents lasted that long."
			},
			{
				type: "p",
				text: "The safety case the agency has put on the record includes fatal crashes involving non-domiciled CDL holders, some of whom had been issued the wrong kind of license and could not communicate in English. A crash is not proof of a nationality. It is evidence that a licensing shortcut has consequences outside the DMV."
			},
			{
				type: "note",
				title: "Why this matters if you don't work in trucking",
				text: "A plastic card from a state is not the same thing as a driver who met the federal standard. Carriers are responsible for who they put in the seat anyway — the state error does not move the liability onto the DMV when a truck wrecks. If you hire trucks, ask how the company confirms a license is valid for the term the driver will be working, not just whether a card scans."
			}
		],
		sources: [{
			label: "FMCSA",
			href: "https://www.fmcsa.dot.gov/"
		}, { label: "FleetOwner, federal enforcement outlook, January 30, 2026 — summary of FMCSA's non-domiciled estimates and state audits" }]
	},
	{
		slug: "cargo-theft-playbook",
		title: "Cargo theft usually does not look like a movie",
		dek: "The trailer is not always cut open at a truck stop. More often, a criminal convinces a warehouse to load the freight onto the wrong truck.",
		date: "2026-09-15",
		desk: "theft",
		minutes: 7,
		plain: "Strategic cargo theft means someone pretends to be a legitimate trucking company, picks up your freight with paperwork that looks right, and never delivers it. CargoNet, a database insurers use, recorded more than 3,600 of these incidents in 2025. The number has been rising by double digits year over year.",
		blocks: [
			{
				type: "p",
				text: "The old picture is still real: a parked trailer, a cut seal, cases of energy drinks missing by morning. That is straight theft, and it still happens at truck stops and unsecured yards. The faster-growing problem is identity theft aimed at the shipment itself. The criminals do not break in. They are invited to the dock."
			},
			{
				type: "h",
				text: "A typical fictitious pickup"
			},
			{
				type: "ul",
				items: [
					"A load is posted on a board, or a broker emails a carrier who has hauled for them before.",
					"Someone answers using a real company's name, a DOT number copied from a public database, and an email that is one letter off.",
					"They send a certificate of insurance that was edited, and a driver who arrives on time, polite, with a matching pickup number.",
					"The dock loads a trailer of electronics, seafood, liquor, or pharmaceuticals. Those loads are worth stealing and easy to resell.",
					"The truck leaves. Tracking goes dark, or it pings in the wrong direction. The real carrier, whose name was borrowed, never knew the load existed."
				]
			},
			{
				type: "p",
				text: "Double brokering is the cousin of this scam. A company accepts a load and then secretly gives it to someone else, sometimes a thief, sometimes just a cheaper truck so they can keep the spread. Either way, you no longer know who has your freight. Strategic theft and double brokering use the same weakness: the industry still confirms identity by email more often than it should."
			},
			{
				type: "h",
				text: "What actually helps"
			},
			{
				type: "ul",
				items: [
					"Look the carrier up on FMCSA's public SAFER site. Confirm the legal name, the DOT number, and that authority is active. A brand-new authority hauling a six-figure load is a question, not a coincidence.",
					"Call a phone number from that public record, not the number in the signature block of the email that asked for the load.",
					"At the dock, match the truck and the driver to the carrier you booked. A different company name on the door is a stop-the-line moment, not a clerical quirk.",
					"Treat last-minute changes of carrier, dispatcher, or pickup driver as the crime, until someone proves they are not."
				]
			},
			{
				type: "note",
				title: "Why this matters if you don't work in trucking",
				text: "Stolen freight is why some products vanish between the port and the store, and why insurance on some lanes has gotten harder to buy. If you are a small shipper, you do not need a security department. You need the habit of confirming the company at your door is the company you hired. The warehouse worker with the clipboard is often the last person who can stop the theft."
			}
		],
		sources: [{ label: "Industry reporting citing CargoNet's count of strategic cargo-theft incidents in 2025" }, {
			label: "FMCSA SAFER company snapshot",
			href: "https://safer.fmcsa.dot.gov/"
		}]
	},
	{
		slug: "chameleon-carriers",
		title: "The trucking company that dies on Friday and opens Monday",
		dek: "Bad crashes, unpaid judgments, and federal out-of-service orders are supposed to follow a carrier. Chameleon companies shed them by changing the name on the door.",
		date: "2026-09-11",
		desk: "fraud",
		minutes: 6,
		plain: "A chameleon carrier is a company that closes after it gets in trouble and reappears as a “new” carrier with a clean federal record. Often the address, the trucks, and the people are the same. The safety history is not, because the new DOT number starts near zero.",
		blocks: [
			{
				type: "p",
				text: "Every for-hire carrier has a file: inspections, crashes, violations, insurance, and whether authority is active. Shippers and brokers are told to read that file. The file only works if the company stays the same company. Reincarnation is how bad operators stay in business. They revoke the old authority or let insurance lapse, apply again, and the public scoreboard looks like a startup."
			},
			{
				type: "h",
				text: "What the pattern looks like"
			},
			{
				type: "ul",
				items: [
					"A shared physical address or principal with a carrier that was just shut down.",
					"Authority that is only weeks old, bidding on freight that established carriers are also chasing.",
					"Trucks whose vehicle identification numbers, or drivers, already show up under a different company name in inspection history.",
					"A dispatcher who cannot explain who owns the company, or who gets angry when you ask."
				]
			},
			{
				type: "p",
				text: "Chameleons are not only a safety story. The same reset makes cargo theft easier. A fraudulent DOT number can book a valuable load, disappear, and come back next month as someone else. Investigators describe it as one infrastructure serving two crimes: highway risk, and stolen freight."
			},
			{
				type: "h",
				text: "“New” is not the same word as “criminal”"
			},
			{
				type: "p",
				text: "Real companies do start every week. A new authority plus a careful owner plus leased trucks from a reputable dealer is ordinary. The warning light is the combination: new authority, evasive answers, a recycled address, and a load valuable enough to be worth stealing. One of those facts is a question. All four is a no."
			},
			{
				type: "note",
				title: "Why this matters if you don't work in trucking",
				text: "When a carrier's record looks empty, empty is not the same as clean. It may mean the record was abandoned with the old name. If you are comparing two cheap quotes and one company has existed for three weeks, the discount may be the cost of a file that was wiped on purpose."
			}
		],
		sources: [{
			label: "FMCSA SAFER and company safety data",
			href: "https://safer.fmcsa.dot.gov/"
		}]
	},
	{
		slug: "double-brokering",
		title: "Double brokering, explained like a package that changed hands",
		dek: "You hired one company. A second company, then a third, took the job without telling you. Sometimes the freight arrives. Sometimes that was the point of the handoff.",
		date: "2026-09-08",
		desk: "fraud",
		minutes: 6,
		plain: "Brokering means finding a truck for a load and charging for the introduction. Double brokering means the company that accepted the load gives it to someone else, who may give it to someone else again, and nobody told the shipper. The person who loaded the dock is no longer sure who is legally responsible.",
		blocks: [
			{
				type: "p",
				text: "A lawful brokerage is ordinary. Big shippers use brokers because they do not want to call two hundred trucking companies before lunch. The broker is supposed to hire a carrier, stay responsible for that choice, and pay the carrier. The shipper pays the broker. One chain. Everyone can be identified."
			},
			{
				type: "h",
				text: "Where it breaks"
			},
			{
				type: "p",
				text: "A second broker, or a carrier who is quietly acting like a broker, takes the load and re-sells it. They might do it to skim a margin: they were offered $2,000, they find a truck for $1,400, and they keep the difference without the authority or the insurance to be in the middle. Or they do it because the “carrier” never had a truck. The load is the bait."
			},
			{
				type: "p",
				text: "The practical mess is payment and blame. The truck that actually hauled the freight does not get paid, because the money stopped at the company in the middle, which has already closed its bank account. The shipper's customer did not get the goods. Each contract says someone else was supposed to vet the driver. Cargo insurance arguments start with “that was not our truck.”"
			},
			{
				type: "h",
				text: "Signs a handoff is happening"
			},
			{
				type: "ul",
				items: [
					"The company name on the truck is not the company on the rate confirmation.",
					"You are asked to pay a different business name than the one you contracted.",
					"A “dispatcher” will not give you the driver's phone number, or gets hostile when the warehouse wants to see the CDL.",
					"Tracking links that are screenshots, not a live device on the tractor you loaded."
				]
			},
			{
				type: "note",
				title: "Why this matters if you don't work in trucking",
				text: "If you have ever been told “the carrier fell through” three times on one shipment, you may have been inside a brokering chain rather than a run of bad luck. Ask one question in writing: who is the motor carrier of record, what is their DOT number, and will that name be on the door of the truck? If the answer changes between Tuesday and the dock, do not load."
			}
		],
		sources: [{
			label: "FMCSA — brokers, freight forwarders, and operating authority",
			href: "https://www.fmcsa.dot.gov/"
		}]
	},
	{
		slug: "fuel-surcharge-plain",
		title: "The fuel line on a freight bill is a formula, not a mood",
		dek: "Diesel moved. The surcharge moved. Here is the arithmetic most contracts are actually doing, and the places it gets abused.",
		date: "2026-09-04",
		desk: "diesel",
		minutes: 6,
		plain: "A fuel surcharge is an extra amount added to a trucking price so the trucking company is not bankrupted by a diesel spike, and the customer is not stuck overpaying when fuel falls. It is negotiated. The government publishes the diesel average. It does not publish your surcharge.",
		blocks: [
			{
				type: "p",
				text: "Most highway contracts peg the surcharge to the EIA weekly on-highway diesel average — the same series that printed $6.529 for the week of September 21, 2026. A simple version of the formula is: take today's DOE price, subtract a base price written in the contract, and divide by the truck's miles per gallon. That result is dollars per mile."
			},
			{
				type: "p",
				text: "Say the base in the contract is $1.20 and the truck averages 6.5 miles per gallon. ($6.529 − $1.20) ÷ 6.5 is about $0.82 per mile. On a 500-mile run that is roughly $410 of fuel surcharge, on top of the linehaul rate. Change the miles per gallon or the base and the invoice changes. There is a calculator on the diesel desk set to the latest weekly index so you can see the levers."
			},
			{
				type: "h",
				text: "What people argue about"
			},
			{
				type: "ul",
				items: [
					"The base price. A low base makes the surcharge look huge even if the underlying haul rate was discounted to match. Read both numbers.",
					"The miles per gallon. A contract that assumes 5 mpg collects more per mile than one that assumes 7. It may or may not match the truck.",
					"Which week's index applies. Serious contracts name the EIA week, so nobody substitutes a convenient truck-stop receipt.",
					"Empty miles and multi-stop routes. If the formula only pays the loaded miles, the carrier eats the fuel to reposition the truck."
				]
			},
			{
				type: "p",
				text: "A surcharge is not a tax, and it is not optional just because fuel “feels high.” If it is in the contract, it is part of the price. If it is not in the contract, a surprise fuel line is a dispute, not a law of nature."
			},
			{
				type: "note",
				title: "Why this matters if you don't work in trucking",
				text: "This is the mechanism that moves a diesel headline into a product price. When the weekly index jumps a dollar, invoices across the country reprice on the same day the contract says they do. You do not have to be a fuel trader to check the math. You need the contract's base, the mpg it assumes, and the EIA week it names."
			}
		],
		sources: [{
			label: "EIA weekly on-highway diesel",
			href: "https://www.eia.gov/petroleum/gasdiesel/"
		}]
	},
	{
		slug: "hours-and-elds",
		title: "The clock inside the truck",
		dek: "Drivers cannot legally drive until they drop. The limits are specific, and an electronic box in the cab is what makes them hard to pencil away.",
		date: "2026-08-28",
		desk: "laws",
		minutes: 6,
		plain: "Hours-of-service rules cap how long a commercial driver may drive and stay on duty before resting. An electronic logging device, the ELD, records those hours from the truck's engine so a paper logbook cannot be rewritten at the coffee counter.",
		blocks: [
			{
				type: "p",
				text: "For most long-haul property drivers the core limits, in plain numbers, are these. After 10 hours off duty, a driver may drive up to 11 hours, but only inside a 14-hour window that starts when they come on duty. They must take a 30-minute break after 8 hours of driving. Across a week they cannot exceed 60 hours on duty in 7 days, or 70 hours in 8 days, unless they take a 34-hour restart that zeros that weekly clock. There are short-haul exceptions and special cases for bad weather and split sleep. The shape of the rule is the part to remember: driving time and the length of the workday are both limited."
			},
			{
				type: "h",
				text: "Why the ELD exists"
			},
			{
				type: "p",
				text: "Paper logs were easy to falsify and easy to demand. A shipper or a dispatcher could pressure a driver to “make it work,” and the logbook would agree. The ELD takes the driving record from the truck. It does not make the driver honest about every on-duty minute at a dock, and inspectors still find unassigned driving and devices that are not really certified. It did remove the most casual version of the lie."
			},
			{
				type: "p",
				text: "When a driver runs out of hours, the freight waits. That is the rule working, not a driver being difficult. A warehouse that burns three hours loading a truck can push a legal trip into an illegal one. Detention — sitting unpaid while a dock runs late — is how a shipper accidentally creates an hours violation and then complains about a late delivery the next morning."
			},
			{
				type: "note",
				title: "Why this matters if you don't work in trucking",
				text: "If you are the one setting appointments, the driver's clock is part of your schedule. A pickup that slips from 8 a.m. to 1 p.m. may have just erased the delivery you wanted tonight. Asking a driver to “just finish it” is asking them to break a fatigue rule written because tired driving kills people who are not in the truck."
			}
		],
		sources: [{
			label: "FMCSA hours-of-service rules",
			href: "https://www.fmcsa.dot.gov/regulations/hours-of-service"
		}]
	},
	{
		slug: "dot-mc-authority",
		title: "DOT number, MC number, authority: three different things",
		dek: "A company can have a federal ID and still not be allowed to haul your freight. This is the mix-up that fraudulent carriers count on.",
		date: "2026-08-21",
		desk: "news",
		minutes: 5,
		plain: "A DOT number identifies a company in the safety system. Operating authority — what people still call an MC number — is the permission to get paid to haul other people's goods. Insurance has to be on file or that permission switches off. Fraudulent outfits flash the ID and hope you do not check the permission.",
		blocks: [
			{
				type: "h",
				text: "DOT number"
			},
			{
				type: "p",
				text: "The Department of Transportation number is an identity. Private fleets that only haul their own goods often have one. It lets inspectors attach roadside inspections and crashes to the right company. Having a DOT number does not mean the company is allowed to haul freight for hire."
			},
			{
				type: "h",
				text: "Operating authority"
			},
			{
				type: "p",
				text: "If a carrier or broker moves regulated freight across state lines for money, it generally needs active operating authority from FMCSA. For years that authority came with an “MC” number. FMCSA has been moving off the MC prefix, which is why you will hear both “MC” and “authority” for the same idea. What matters is the status: authorized, not revoked, not inactive."
			},
			{
				type: "h",
				text: "Insurance"
			},
			{
				type: "p",
				text: "Authority stays active only while the required insurance filing is in place. When insurance lapses, authority is supposed to go with it. A PDF certificate emailed by a dispatcher can be edited. The filing FMCSA shows is the one that counts. This is also why a chameleon company is in a hurry: new authority, just enough insurance to book a load, then gone."
			},
			{
				type: "note",
				title: "Why this matters if you don't work in trucking",
				text: "Anyone can quote you a price. The five-minute check is whether the name on the invoice, the name on the truck, and the name with active authority are the same name. SAFER, the FMCSA public search, is free. If a salesperson tells you the check is unnecessary because they are “in the system,” that sentence is the reason to do the check."
			}
		],
		sources: [{
			label: "FMCSA SAFER",
			href: "https://safer.fmcsa.dot.gov/"
		}]
	},
	{
		slug: "fake-medical-cards",
		title: "The physical that never happened",
		dek: "Every commercial driver needs a medical certificate. Federal investigators say some clinics sell the signature. The risk is a driver who should not have been driving, with paperwork that says otherwise.",
		date: "2026-08-14",
		desk: "cdl",
		minutes: 5,
		plain: "Before a driver can hold a CDL, a certified medical examiner has to say they meet the physical standards. That certificate is the “medical card.” Fraud is either a real examiner who signs without examining, or a piece of paper that never touched an examiner at all.",
		blocks: [
			{
				type: "p",
				text: "The exam is there for conditions that matter at highway speed: vision, hearing, blood pressure, insulin-treated diabetes under the current standards, seizure history, and anything that can cause a sudden loss of consciousness. It is not a fitness-influencer checkup. It is a screen for “can this person safely control a heavy vehicle today.”"
			},
			{
				type: "p",
				text: "Examiners who do DOT physicals are supposed to be listed on a national registry, and results are supposed to be filed electronically so a driver cannot shop a paper card that no doctor remembers. The Justice Department's trucking-fraud work has specifically named medical practitioners suspected of falsifying those exams. Separately, roadside inspections still find cards that do not match the registry."
			},
			{
				type: "h",
				text: "How this connects to illegal licenses"
			},
			{
				type: "p",
				text: "A fraudulent school, a look-the-other-way tester, a medical card that was paid for, and a state that issues a non-domiciled license for too many years are often the same business model. Each document looks valid in isolation. Together they manufacture a driver who never passed the process the public thinks a CDL represents."
			},
			{
				type: "note",
				title: "Why this matters if you don't work in trucking",
				text: "You will not see the medical card. The carrier is required to. If you run a fleet, or you are a driver being told to “use this clinic, they don't hassle people,” that recommendation is the red flag. A hassle-free exam is sometimes an exam that did not happen."
			}
		],
		sources: [{
			label: "FMCSA medical programs",
			href: "https://www.fmcsa.dot.gov/regulations/medical"
		}]
	},
	{
		slug: "who-pays-when-freight-is-stolen",
		title: "A load disappears. Who pays?",
		dek: "There is no single answer, which is why the argument starts while the freight is still missing. The contract decides more than the press release does.",
		date: "2026-08-07",
		desk: "theft",
		minutes: 6,
		plain: "When a shipment is stolen, people reach for one word: insurance. There are several kinds, they do not all cover theft-by-deception, and the company you paid may not be the company that was supposed to carry the coverage. The first hour is paperwork, not a siren.",
		blocks: [
			{
				type: "h",
				text: "Three different policies get confused"
			},
			{
				type: "ul",
				items: [
					"The carrier's cargo insurance covers freight in its care, usually with exclusions and a dollar limit that may be far below a trailer of phones or pharmaceuticals.",
					"The broker's legal liability is not the same policy. A broker who hired a careful carrier is in a different position from a broker who hired a DOT number that was two weeks old.",
					"The shipper's own cargo or stock-throughput policy may be the only coverage that actually pays a fictitious pickup, and only if the shipper bought that coverage."
				]
			},
			{
				type: "p",
				text: "Motor truck cargo policies often expect theft to look like theft: forced entry, a police report, a seal. Strategic theft can fail those boxes because the warehouse loaded the thief on purpose. That gap is why some shippers discover, after the loss, that they were uninsured for the exact crime that is growing."
			},
			{
				type: "h",
				text: "What to write down immediately"
			},
			{
				type: "ul",
				items: [
					"The carrier name and DOT number on the rate confirmation, and the name on the truck that actually loaded.",
					"Driver name, as written on the identification the dock saw. If the dock did not look, say so. It matters later.",
					"Pickup time, seal number, and the last tracking point.",
					"A police report. Many policies require one even when everyone knows the truck is three states away."
				]
			},
			{
				type: "p",
				text: "Then the commercial fight begins. The broker says the carrier is liable. The carrier says that was not their driver. The insurance company says the loss is excluded. None of that brings the freight back the same day. It does decide whether the shipper eats the wholesale cost."
			},
			{
				type: "note",
				title: "Why this matters if you don't work in trucking",
				text: "If you own the goods, “the trucking company has insurance” is not a complete sentence. Ask, before the shipment, who pays if a fictitious carrier picks it up, what the dollar limit is, and whether your own policy fills the hole. After the theft, the honest answer is often nobody, unless you arranged it when the freight was still on the floor."
			}
		],
		sources: [{
			label: "FMCSA insurance filing basics, via SAFER",
			href: "https://safer.fmcsa.dot.gov/"
		}]
	}
];
function byDateDesc(a, b) {
	if (a.date !== b.date) return a.date < b.date ? 1 : -1;
	const aBot = a.slug.startsWith("edition-") ? 0 : 1;
	const bBot = b.slug.startsWith("edition-") ? 0 : 1;
	if (aBot !== bBot) return aBot - bBot;
	return a.title.localeCompare(b.title);
}
function withEditions(extra) {
	const seen = /* @__PURE__ */ new Set();
	return [...extra, ...posts].filter((post) => {
		if (seen.has(post.slug)) return false;
		seen.add(post.slug);
		return true;
	}).sort(byDateDesc);
}
function relatedFrom(list, post, count = 3) {
	const same = list.filter((p) => p.slug !== post.slug && p.desk === post.desk);
	const rest = list.filter((p) => p.slug !== post.slug && p.desk !== post.desk);
	return [...same, ...rest].sort(byDateDesc).slice(0, count);
}
function blockText(block) {
	if (block.type === "ul") return block.items.join(" ");
	if (block.type === "note") return `${block.title} ${block.text}`;
	return block.text;
}
function searchIn(list, query) {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	return list.filter((p) => {
		const desk = getDesk(p.desk)?.label ?? "";
		const blob = [
			p.title,
			p.dek,
			p.plain,
			desk,
			...p.blocks.map(blockText)
		].join(" ").toLowerCase();
		return q.split(/\s+/).every((word) => blob.includes(word));
	});
}
var starterSlugs = [
	"dot-mc-authority",
	"hours-and-elds",
	"fuel-surcharge-plain",
	"cargo-theft-playbook"
];
var daily_server_exports = /* @__PURE__ */ __exportAll({
	ensureToday: () => ensureToday,
	loadArticleData: () => loadArticleData,
	loadDeskData: () => loadDeskData,
	loadFeedData: () => loadFeedData,
	loadSearchData: () => loadSearchData
});
var deskIds = desks.map((desk) => desk.id);
var blockSchema = discriminatedUnion("type", [
	object({
		type: literal("p"),
		text: string().min(40).max(900)
	}),
	object({
		type: literal("h"),
		text: string().min(3).max(120)
	}),
	object({
		type: literal("ul"),
		items: array(string().min(8).max(280)).min(2).max(5)
	}),
	object({
		type: literal("note"),
		title: string().min(3).max(80),
		text: string().min(40).max(700)
	})
]);
var editionSchema = object({
	title: string().min(12).max(140),
	dek: string().min(40).max(320),
	desk: _enum(deskIds),
	minutes: number().int().min(3).max(9),
	plain: string().min(40).max(500),
	blocks: array(blockSchema).min(4).max(10),
	sources: array(object({
		label: string().min(8).max(180),
		href: string().url()
	})).min(2).max(5),
	diesel: object({
		week: string().regex(/^\d{4}-\d{2}-\d{2}$/),
		label: string().min(3).max(40),
		price: number().gt(2).lt(12),
		sourceLabel: string().min(8).max(180),
		sourceHref: string().url()
	}).nullable()
});
var jobs = globalThis;
function chicagoToday(now = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "America/Chicago",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(now);
}
function asJson(value) {
	if (typeof value === "string") try {
		return JSON.parse(value);
	} catch {
		return null;
	}
	return value;
}
function rowToPost(row) {
	if (!row.title || !row.dek || !row.plain || !row.desk || row.minutes == null) return null;
	if (!deskIds.includes(row.desk)) return null;
	const blocks = asJson(row.blocks);
	const sources = asJson(row.sources);
	if (!Array.isArray(blocks) || !Array.isArray(sources)) return null;
	const date = String(row.edition_date).slice(0, 10);
	return {
		slug: row.slug,
		title: row.title,
		dek: row.dek,
		date,
		desk: row.desk,
		minutes: row.minutes,
		plain: row.plain,
		blocks,
		sources
	};
}
async function readEditions(sql) {
	return (await sql.query(`select slug, edition_date, title, dek, desk, minutes, plain, blocks, sources
     from editions
     where status = 'ready'
     order by edition_date desc`)).map(rowToPost).filter((post) => Boolean(post));
}
async function readDiesel(sql) {
	const row = (await sql.query(`select week_of, price, label, source_label, source_href
     from diesel_ticks
     order by week_of desc
     limit 1`))[0];
	if (!row) return null;
	const price = Number(row.price);
	const week = String(row.week_of).slice(0, 10);
	if (!Number.isFinite(price) || week <= latestDiesel.week) return null;
	return {
		week,
		label: row.label,
		price,
		sourceLabel: row.source_label,
		sourceHref: row.source_href
	};
}
async function merged(sql) {
	const [editions, diesel] = await Promise.all([readEditions(sql), readDiesel(sql)]);
	return {
		posts: withEditions(editions),
		diesel
	};
}
function extractText(body) {
	if (typeof body.output_text === "string") return body.output_text;
	if (typeof body.content === "string") return body.content;
	const chunks = [];
	const output = Array.isArray(body.output) ? body.output : [];
	for (const item of output) {
		if (!item || typeof item !== "object") continue;
		const content = item.content;
		if (!Array.isArray(content)) continue;
		for (const part of content) {
			if (!part || typeof part !== "object") continue;
			const text = part.text;
			if (typeof text === "string") chunks.push(text);
		}
	}
	return chunks.join("\n");
}
function extractCitations(body) {
	const urls = /* @__PURE__ */ new Set();
	const add = (value) => {
		if (typeof value === "string" && value.startsWith("http")) urls.add(value);
		if (value && typeof value === "object" && "url" in value) {
			const url = value.url;
			if (typeof url === "string" && url.startsWith("http")) urls.add(url);
		}
	};
	if (Array.isArray(body.citations)) body.citations.forEach(add);
	const output = Array.isArray(body.output) ? body.output : [];
	for (const item of output) {
		if (!item || typeof item !== "object") continue;
		const content = item.content;
		if (!Array.isArray(content)) continue;
		for (const part of content) {
			if (!part || typeof part !== "object") continue;
			const annotations = part.annotations;
			if (Array.isArray(annotations)) annotations.forEach(add);
		}
	}
	return [...urls];
}
function parseJson(text) {
	const raw = (text.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? text).trim();
	const start = raw.indexOf("{");
	const end = raw.lastIndexOf("}");
	if (start < 0 || end < start) throw new Error("no json");
	return JSON.parse(raw.slice(start, end + 1));
}
function hostOf(href) {
	return new URL(href).host.replace(/^www\./, "");
}
function cited(href, citations) {
	if (!href.startsWith("https://")) return false;
	if (citations.length === 0) return true;
	const host = hostOf(href);
	return citations.some((citation) => {
		try {
			return hostOf(citation) === host;
		} catch {
			return citation.includes(host);
		}
	});
}
async function assignedDesk(sql) {
	const rows = await sql.query(`select count(*)::int as count from editions where status = 'ready'`);
	return deskIds[Number(rows[0]?.count ?? 0) % deskIds.length] ?? "news";
}
async function writeEdition(sql, date, post) {
	await sql.query(`update editions
     set status = 'ready', title = $1, dek = $2, desk = $3, minutes = $4, plain = $5,
         blocks = $6::jsonb, sources = $7::jsonb, error = null, ready_at = now()
     where edition_date = $8::date`, [
		post.title,
		post.dek,
		post.desk,
		post.minutes,
		post.plain,
		JSON.stringify(post.blocks),
		JSON.stringify(post.sources),
		date
	]);
}
async function draftEdition(sql, date, titles, desk) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) throw new Error("AI is not available");
	const prompt = `You write one edition of The Ro-Mac Brief, a daily freight briefing for readers who do NOT work in trucking.
Today is ${date} (America/Chicago). Prefer a development reported in the last 7 days.
Assigned desk: ${desk}. Use that desk if you can verify a story. If you cannot, pick another desk from: ${deskIds.join(", ")}.
Do not repeat these headlines: ${titles.join(" | ") || "(none)"}.

Cover only what you can verify with web search: trucking news, laws, FMCSA or DOT action, diesel prices, cargo theft, illegal or non-domiciled CDLs, English-proficiency removals, or fraudulent carriers.
The last verified EIA weekly U.S. on-highway diesel in this archive is $${latestDiesel.price.toFixed(3)} for the week of ${latestDiesel.week}. Set diesel to null unless you find a NEWER official EIA weekly U.S. number and an eia.gov URL. Never use AAA or a truck-stop price for that field.

Write plain English. Open jargon in the same sentence you use it. Include one note block titled "Why this matters if you don't work in trucking".
Every figure must appear in a source you cite. Do not invent numbers, quotes, or company accusations. If a case is unfinished, say so.
Return ONLY JSON with this shape:
{"title":"","dek":"","desk":"${desk}","minutes":6,"plain":"","blocks":[{"type":"p","text":""},{"type":"h","text":""},{"type":"ul","items":["",""]},{"type":"note","title":"Why this matters if you don't work in trucking","text":""}],"sources":[{"label":"","href":"https://"}],"diesel":null}`;
	const response = await fetch("https://api.x.ai/v1/responses", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		signal: AbortSignal.timeout(5e4),
		body: JSON.stringify({
			model: "grok-4.5",
			max_output_tokens: 1800,
			input: [{
				role: "user",
				content: prompt
			}],
			tools: [{ type: "web_search" }]
		})
	});
	if (!response.ok) throw new Error(`xAI API error ${response.status}`);
	const body = await response.json();
	const parsed = editionSchema.parse(parseJson(extractText(body)));
	const citations = extractCitations(body);
	const sources = parsed.sources.filter((source) => source.href.startsWith("https://"));
	if (sources.length < 2) throw new Error("need two https sources");
	if (citations.length > 0 && !sources.some((source) => cited(source.href, citations))) throw new Error("sources were not in the search results");
	if (!parsed.blocks.some((block) => block.type === "note")) throw new Error("missing note");
	const diesel = parsed.diesel;
	if (diesel && diesel.week > latestDiesel.week && diesel.sourceHref.startsWith("https://") && hostOf(diesel.sourceHref).endsWith("eia.gov") && (citations.length === 0 || cited(diesel.sourceHref, citations))) await sql.query(`insert into diesel_ticks (week_of, price, label, source_label, source_href)
       values ($1::date, $2, $3, $4, $5)
       on conflict (week_of) do nothing`, [
		diesel.week,
		diesel.price,
		diesel.label,
		diesel.sourceLabel,
		diesel.sourceHref
	]);
	return {
		slug: `edition-${date}`,
		title: parsed.title,
		dek: parsed.dek,
		date,
		desk: parsed.desk,
		minutes: parsed.minutes,
		plain: parsed.plain,
		blocks: parsed.blocks,
		sources
	};
}
async function runEnsure() {
	const date = chicagoToday();
	const slug = `edition-${date}`;
	const sql = await getSql();
	const ready = await sql.query(`select slug, edition_date, title, dek, desk, minutes, plain, blocks, sources
     from editions where edition_date = $1::date and status = 'ready'`, [date]);
	const existing = ready[0] ? rowToPost(ready[0]) : null;
	if (existing) return {
		state: "ready",
		created: false,
		title: existing.title
	};
	if (!process.env.XAI_API_KEY) return {
		state: "skipped",
		reason: "unavailable"
	};
	let own = (await sql.query(`insert into editions (slug, edition_date, status, attempts, started_at)
     values ($1, $2::date, 'pending', 1, now())
     on conflict (edition_date) do nothing
     returning attempts`, [slug, date])).length > 0;
	if (!own) own = (await sql.query(`update editions
       set status = 'pending', attempts = attempts + 1, started_at = now(), error = null
       where edition_date = $1::date
         and status <> 'ready'
         and attempts < 3
         and (status = 'failed' or started_at < now() - interval '3 minutes')
       returning attempts`, [date])).length > 0;
	if (!own) {
		const row = (await sql.query(`select status, attempts from editions where edition_date = $1::date`, [date]))[0];
		if (row?.status === "ready") return {
			state: "ready",
			created: false,
			title: slug
		};
		if (row && row.attempts >= 3 && row.status === "failed") return {
			state: "skipped",
			reason: "paused"
		};
		return { state: "pending" };
	}
	try {
		const feed = await merged(sql);
		const desk = await assignedDesk(sql);
		const post = await draftEdition(sql, date, feed.posts.slice(0, 8).map((item) => item.title), desk);
		await writeEdition(sql, date, post);
		return {
			state: "ready",
			created: true,
			title: post.title
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "draft failed";
		await sql.query(`update editions set status = 'failed', error = $2 where edition_date = $1::date and status = 'pending'`, [date, message.slice(0, 300)]);
		return {
			state: "skipped",
			reason: message.slice(0, 180)
		};
	}
}
function ensureToday() {
	jobs.__romacDaily ??= runEnsure().finally(() => {
		jobs.__romacDaily = void 0;
	});
	return jobs.__romacDaily;
}
async function loadFeedData() {
	return merged(await getSql());
}
async function loadArticleData(slug) {
	const { posts } = await merged(await getSql());
	const post = posts.find((item) => item.slug === slug);
	if (!post) return null;
	return {
		post,
		related: relatedFrom(posts, post)
	};
}
async function loadSearchData(q) {
	const { posts } = await merged(await getSql());
	return {
		q,
		results: searchIn(posts, q)
	};
}
async function loadDeskData(id) {
	const { posts } = await merged(await getSql());
	return posts.filter((post) => post.desk === id);
}
//#endregion
export { chartWeeks as a, latestDiesel as c, getDesk as d, DOE_INDEX_NOTE as i, __exportAll as l, ensureToday as n, dieselRegions as o, starterSlugs as r, dieselYearAgo as s, daily_server_exports as t, desks as u };
