export type Term = {
  term: string;
  aka?: string;
  def: string;
};

export const glossary: Term[] = [
  {
    term: "Carrier",
    def: "The trucking company that actually moves the freight. A carrier has trucks, drivers, and permission from the federal government to haul for hire.",
  },
  {
    term: "Shipper",
    def: "The company that owns the goods and needs them moved — a factory, a retailer, a farm, a warehouse. Shippers hire carriers or brokers.",
  },
  {
    term: "Broker",
    def: "A middleman who finds a truck for a shipper's load and takes a fee. A legitimate broker does not haul the freight itself and does not secretly hand the load to another broker.",
  },
  {
    term: "Bill of lading",
    aka: "BOL",
    def: "The paperwork that says what is on the truck, who shipped it, and where it is going. It is both a receipt and a contract for that shipment.",
  },
  {
    term: "DOT number",
    def: "An identification number the Federal Motor Carrier Safety Administration assigns to a company that operates commercial vehicles. It is like a business ID for safety records. It is not, by itself, permission to haul freight for money.",
  },
  {
    term: "MC number",
    aka: "operating authority",
    def: "The older name for for-hire operating authority. If a carrier wants to be paid to haul other people's goods across state lines, it generally needs active authority, not just a DOT number. People still say “MC number” even though the prefix is being retired.",
  },
  {
    term: "FMCSA",
    def: "The Federal Motor Carrier Safety Administration, the U.S. Department of Transportation agency that writes and enforces the safety rules for trucks and buses.",
  },
  {
    term: "CDL",
    def: "Commercial driver's license. The license required to drive a heavy truck. States issue it, but they have to follow federal standards.",
  },
  {
    term: "CLP",
    def: "Commercial learner's permit. The step before a full CDL. The new driver must be accompanied by a properly licensed driver.",
  },
  {
    term: "Non-domiciled CDL",
    def: "A commercial license a state issues to someone who is not a resident of that state — often a person whose legal presence in the U.S. is temporary. Federal rules limit who can get one, and for how long. A license issued outside those rules is the kind of “illegal CDL” investigators mean.",
  },
  {
    term: "English language proficiency",
    aka: "ELP",
    def: "A long-standing federal rule: a commercial driver must be able to read road signs in English and speak well enough to talk with police and inspectors. Failing it can take the driver out of service, meaning the truck does not move until a qualified driver takes over.",
  },
  {
    term: "Out of service",
    aka: "OOS",
    def: "An inspector's order that a driver or a truck cannot keep operating until a specific problem is fixed. It is not a ticket you pay and drive away from.",
  },
  {
    term: "ELDT",
    def: "Entry-level driver training. Since 2022, new CDL applicants must train with a provider listed on the federal Training Provider Registry. A school that is removed from that list cannot legally train new drivers.",
  },
  {
    term: "Training Provider Registry",
    aka: "TPR",
    def: "The FMCSA list of schools allowed to give entry-level driver training. If a school is not on it, the training does not count.",
  },
  {
    term: "ELD",
    def: "Electronic logging device. A unit plugged into the truck that records when the driver is driving, on duty, or off duty. It replaced most paper logbooks so hours-of-service rules can be checked.",
  },
  {
    term: "Hours of service",
    aka: "HOS",
    def: "The federal limits on how long a truck driver may drive and be on duty before resting. The point is fatigue, not paperwork for its own sake.",
  },
  {
    term: "Medical card",
    aka: "DOT physical",
    def: "A certificate that a driver passed a physical from an examiner on the national registry. It covers vision, blood pressure, conditions that can cause a sudden loss of control, and similar issues. A penciled-in or bought certificate is fraud.",
  },
  {
    term: "Chameleon carrier",
    def: "A trucking company that shuts down after crashes, violations, or unpaid bills and reopens under a new name, often at the same address, to hide its record. Same people, “new” company.",
  },
  {
    term: "Double brokering",
    def: "A load is given to a broker or carrier, who secretly gives it to someone else. The truck that shows up may not be the company you hired. Payment gets tangled, and the freight is easier to steal.",
  },
  {
    term: "Strategic cargo theft",
    def: "Theft by trick, not by bolt cutters. Criminals pretend to be a real carrier, pick up a load with forged emails and a lookalike truck, and disappear. The trailer seal may never be broken because the whole trailer is gone.",
  },
  {
    term: "DOE diesel index",
    aka: "EIA weekly on-highway diesel",
    def: "The U.S. average diesel price published each week by the Energy Information Administration. Most fuel surcharges in freight contracts use this number, not the price on the sign at a single truck stop.",
  },
  {
    term: "Fuel surcharge",
    def: "An extra line on a freight invoice that rises and falls with diesel. It is meant to stop every fuel spike from requiring a brand-new contract. The formula is negotiated; it is not set by the government.",
  },
  {
    term: "PADD",
    def: "Petroleum Administration for Defense Districts — the regions the Energy Department uses when it reports fuel prices. “Gulf Coast” and “West Coast” in a diesel table are PADDs, not weather reports.",
  },
  {
    term: "SAFER",
    def: "A public FMCSA search where anyone can look up a carrier's DOT number, authority, insurance filing, and whether the company is allowed to operate. It is the first check before you hand someone a load.",
  },
];
