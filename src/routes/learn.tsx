import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Drop, Snowflake, Lightning, CloudRain, Globe, Flask,
  ArrowSquareOut, MapPin, ChartLine, Clock, Scales,
} from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";
import { regions } from "@/lib/mock-data";
import { getExtraTabs, getWaterTypes, type ExtraTab } from "@/lib/learn-extras";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learn — AquaMap TJ" },
      { name: "description", content: "Comprehensive knowledge hub on Tajikistan's water, glaciers, hydropower, climate, and regional impact." },
    ],
  }),
  component: LearnPage,
});

type TabKey = "water" | "glaciers" | "hydro" | "climate" | "regional" | "research" | "policy" | "intl" | "refs";

interface Stat { v: string; l: string; }
interface Section { h: string; body: string; }
interface TabContent {
  key: TabKey;
  emoji: string;
  tKey: string;
  Icon: typeof Drop;
  color: string;
  bg: string;
  title: string;
  intro: string;
  highlights: Stat[];
  sections: Section[];
  links?: { label: string; href: string }[];
  facts?: { text: string; source: string; href: string }[];
  related?: { label: string; to: string }[];
}

const tabs: TabContent[] = [
  {
    key: "water", emoji: "💧", tKey: "learn.tab.water", Icon: Drop, color: "text-info", bg: "bg-info/10",
    title: "Tajikistan's Water Wealth",
    intro: "Tajikistan is the source of Central Asia's largest river systems — holding 55.4% of total Aral Sea basin drainage and feeding tens of millions of people downstream.",
    highlights: [
      { v: "947+", l: "rivers" },
      { v: "28,500 km", l: "total river length" },
      { v: "64 km³", l: "annual runoff" },
      { v: "55.4%", l: "of Aral Sea basin flow" },
    ],
    sections: [
      { h: "Overview", body: "Tajikistan's high-altitude geography concentrates an enormous freshwater inventory. Snow- and glacier-fed rivers generate 64 km³ of annual runoff, a baseline volume that supports irrigation, energy, and drinking water across five downstream countries." },
      { h: "Key Rivers", body: "Amu Darya (formed by Panj + Vakhsh) is the dominant transboundary system. Syr Darya contributes ~1% from Tajik territory. Zerafshan flows west into Uzbekistan; Kofarnihon drains the south. Smaller tributaries feed irrigation networks across Sughd and Khatlon." },
      { h: "Lakes", body: "Karakul (3,914 m — one of the world's highest lakes), Sarez (landslide-dammed, 17 km³, potential GLOF risk), Iskanderkul (alpine glacial lake in the Fann Mountains) are the most significant." },
      { h: "Water Allocation", body: "Under the ICWC framework, Tajikistan receives only 15–18% of the allocable Amu Darya flow despite generating ~55% of total basin water — a recurring source of regional tension." },
      { h: "Transboundary Issues", body: "Tajikistan supplies water to Uzbekistan, Kazakhstan, Afghanistan, Turkmenistan, and Kyrgyzstan. Summer/winter trade-offs between irrigation (downstream) and energy (upstream) drive policy negotiation." },
    ],
    facts: [
      { text: "Tajikistan has 947 rivers totalling ~28,500 km of length.", source: "World Bank Open Data 2024", href: "https://data.worldbank.org/country/TJ" },
      { text: "Annual runoff: 64 km³ — one of the highest per-capita volumes in Central Asia.", source: "FAO AQUASTAT 2025", href: "https://www.fao.org/aquastat/" },
      { text: "Generates 55.4% of Aral Sea basin water but receives only 15–18% via the ICWC allocation framework.", source: "UNECE Water Convention 2024", href: "https://unece.org/water" },
    ],
    related: [
      { label: "Basin Water Availability", to: "/analytics" },
      { label: "Seasonal Runoff Pattern", to: "/analytics" },
    ],
  },
  {
    key: "glaciers", emoji: "🏔️", tKey: "learn.tab.glaciers", Icon: Snowflake, color: "text-glacier", bg: "bg-glacier/15",
    title: "The Frozen Water Towers",
    intro: "Tajikistan's 14,000+ glaciers are the largest ice reservoir in arid Central Asia — and they are retreating faster than the global average.",
    highlights: [
      { v: "14,000+", l: "glaciers" },
      { v: "8,476 km²", l: "current area" },
      { v: "845 km³", l: "ice volume (13× annual runoff)" },
      { v: "-30%", l: "area loss in 50–60 years" },
    ],
    sections: [
      { h: "Facts", body: "Total area ~8,476–11,146 km² depending on inventory (TajNCID vs RGI 7.0). Ice volume estimated at ~845 km³ — about 13× total annual river runoff." },
      { h: "Notable Glaciers", body: "Vanjyakh (Fedchenko) is the world's 10th largest glacier — 77 km long, melting up to 16 m/year. Grumm-Grzhimaylo, Garmo, Bivachny, and Medvezhiy are also major Pamir glaciers." },
      { h: "Retreat Data", body: "Roughly 20% volume loss and 30% area loss over the past 50–60 years. Over 1,000 small glaciers have completely disappeared since the 1930s." },
      { h: "Why It Matters", body: "Glaciers contribute up to 25% of summer runoff for the Amu Darya basin, serving 70M+ people downstream across Central Asia and northern Afghanistan." },
      { h: "Future Projections", body: "Pyanj basin: -75.5% glacier volume by 2050. Vakhsh basin: -53%. Amu Darya total runoff projected to fall 30% by mid-century after a temporary 'peak water' window." },
    ],
    facts: [
      { text: "13,542 glaciers covering ~13,542 km² as of 2025 (down from ~15,240 km² in 1990).", source: "RGI 7.0 · TajNCID", href: "https://www.glims.org/rgi_user_guide/welcome.html" },
      { text: "Vanjyakh (Fedchenko) — the world's 10th largest glacier — is melting up to 16 m/year.", source: "ScienceDirect 2026", href: "https://www.sciencedirect.com/" },
      { text: "Pyanj basin projected to lose −75.5% of glacier volume by 2050.", source: "UNEP Atlas 2025", href: "https://www.unep.org/" },
    ],
    related: [
      { label: "Glacier Retreat Timeline", to: "/analytics" },
      { label: "Glaciers by Elevation Zone", to: "/analytics" },
    ],
  },
  {
    key: "hydro", emoji: "⚡", tKey: "learn.tab.hydro", Icon: Lightning, color: "text-hydro", bg: "bg-hydro/10",
    title: "Central Asia's Energy Tower",
    intro: "Tajikistan ranks #1 globally in hydropower potential per km² and #2 per capita — but uses only ~3% of its estimated potential.",
    highlights: [
      { v: "527 TWh/yr", l: "estimated potential" },
      { v: "~18 TWh/yr", l: "current production" },
      { v: "95%+", l: "of electricity from hydro" },
      { v: "335 m", l: "Rogun dam height (world's tallest)" },
    ],
    sections: [
      { h: "Nurek HPP", body: "3,400 MW after rehabilitation. 300 m dam on the Vakhsh River. Operational since 1972. Covers 70%+ of national demand and irrigates ~700 km² of farmland." },
      { h: "Rogun HPP", body: "Under construction on the Vakhsh, upstream of Nurek. 335 m — will be the world's tallest dam. 3,780 MW planned. World Bank approved a $350M grant in December 2024. Full completion targeted ~2033." },
      { h: "Other Plants", body: "Sangtuda-1 (670 MW), Sangtuda-2 (220 MW), Baipaza (600 MW), Qairokkum (126 MW) round out the operational fleet, alongside many small hydro stations in GBAO and Sughd." },
      { h: "Grid & Export", body: "95%+ of electricity comes from hydropower. Tajikistan exports surplus summer generation to Uzbekistan, Afghanistan, and Pakistan via CASA-1000 (Central Asia–South Asia transmission)." },
    ],
    facts: [
      { text: "527 TWh/year estimated potential — only ~3% currently utilised.", source: "MEWR Tajikistan", href: "https://mewr.tj/" },
      { text: "Rogun Dam will reach 335 m — the tallest dam in the world — and add 3.6 GW of capacity.", source: "World Bank 2024", href: "https://www.worldbank.org/en/country/tajikistan" },
      { text: "95%+ of national electricity is generated from hydropower; CASA-1000 exports to PK/AF.", source: "ADB Energy Outlook", href: "https://www.adb.org/" },
    ],
    related: [
      { label: "Hydropower Capacity Roadmap", to: "/analytics" },
      { label: "Monthly Generation vs Precipitation", to: "/analytics" },
    ],
  },
  {
    key: "climate", emoji: "🌡️", tKey: "learn.tab.climate", Icon: CloudRain, color: "text-destructive", bg: "bg-destructive/10",
    title: "Climate Crisis in the Mountains",
    intro: "Tajikistan is warming at twice the global average. Floods, mudslides, and droughts cause 500–600 emergencies every year.",
    highlights: [
      { v: "+1.2°C", l: "since baseline (2× global avg)" },
      { v: "1,826", l: "disasters in 2020–2023" },
      { v: "$30M+", l: "annual economic losses" },
      { v: "17 km³", l: "Sarez Lake — GLOF risk" },
    ],
    sections: [
      { h: "Temperature", body: "+1.2°C rise since baseline — roughly double the global average of 0.6°C. Pamir region projected to warm +2.0°C by 2050." },
      { h: "Disasters", body: "500–600 emergency events recorded annually. 1,826 natural disasters between 2020 and 2023 alone, with 100+ deaths and $30M+ in damages." },
      { h: "Disaster Types", body: "Floods are the primary hazard, followed by mudslides, avalanches, and droughts. Glacial lake outburst floods (GLOFs) are an emerging high-impact risk." },
      { h: "High-Risk Regions", body: "GBAO (Pamir slopes), Khatlon (lowland flooding), Rasht Valley, and the Zerafshan corridor face the highest combined exposure." },
      { h: "Sarez Lake Risk", body: "Formed by the 1911 Usoi landslide. Holds 17 km³ of water. A breach could cascade through the Bartang–Panj–Amu Darya system, threatening millions downstream." },
      { h: "2025 Milestones", body: "The UN General Assembly declared 2025 the International Year of Glaciers' Preservation at Tajikistan's urging. The Dushanbe Glaciers Declaration was signed the same year." },
    ],
    facts: [
      { text: "Temperature has risen +1.2 °C since baseline — roughly 2× the global average.", source: "World Bank Climate Portal", href: "https://climateknowledgeportal.worldbank.org/country/tajikistan" },
      { text: "1,826 natural disasters recorded between 2020–2023, with $30M+ in annual losses.", source: "EM-DAT / CoES Tajikistan", href: "https://www.emdat.be/" },
      { text: "Sarez Lake holds 17 km³ — a GLOF breach could cascade through the Amu Darya system.", source: "UNEP Atlas 2025", href: "https://www.unep.org/" },
    ],
    related: [
      { label: "Temperature Trend by Season", to: "/analytics" },
      { label: "Climate Risk — Districts Affected", to: "/analytics" },
    ],
  },
  {
    key: "regional", emoji: "🌍", tKey: "learn.tab.regional", Icon: Globe, color: "text-success", bg: "bg-success/10",
    title: "Beyond Tajikistan's Borders",
    intro: "As Central Asia's 'water tower', Tajikistan supplies more than 60% of the region's freshwater. Decisions made here ripple across five countries.",
    highlights: [
      { v: "60%+", l: "of Central Asia's freshwater" },
      { v: "5", l: "downstream countries served" },
      { v: "55.4%", l: "of Aral Sea basin flow" },
      { v: "2025", l: "UN Int. Year of Glaciers" },
    ],
    sections: [
      { h: "Water Tower Role", body: "Glacier melt and snowpack in the Pamir and Alay ranges feed the Amu Darya and tributaries, providing the dominant freshwater input to lower-elevation neighbours." },
      { h: "Downstream Countries", body: "Uzbekistan, Kazakhstan, Turkmenistan, and Afghanistan rely on Tajik-origin runoff for irrigation, drinking water, and ecosystems — including the recovering Aral Sea basin." },
      { h: "Aral Sea", body: "Tajikistan contributes 55.4% of total Aral Sea basin flow. Reductions in Amu Darya volume directly impede ongoing restoration efforts in the Northern Aral." },
      { h: "Transboundary Tensions", body: "Tajikistan needs winter energy storage (turbines run when reservoirs are full). Downstream Uzbekistan needs summer irrigation releases. These goals are seasonally opposite." },
      { h: "ICWC Framework", body: "The Interstate Commission for Water Coordination of Central Asia handles annual allocations between the five basin states. Talks are typically tense and politically charged." },
      { h: "International Year 2025", body: "On Tajikistan's initiative, the UN declared 2025 the International Year of Glaciers' Preservation — a global awareness campaign anchored by the Dushanbe Water Process." },
    ],
    facts: [
      { text: "Tajikistan supplies 60%+ of Central Asia's freshwater to 40M+ downstream residents.", source: "UNECE 2024", href: "https://unece.org/water" },
      { text: "Uzbekistan receives ~40% of Tajik outflow; Kyrgyzstan and Kazakhstan share another 45%.", source: "ICWC · CAWater-Info", href: "http://www.cawater-info.net/" },
      { text: "2025 declared the UN International Year of Glaciers' Preservation — at Tajikistan's initiative.", source: "UN General Assembly", href: "https://www.un.org/" },
    ],
    related: [
      { label: "Downstream Water Dependency", to: "/analytics" },
      { label: "Water Stress Index — Central Asia", to: "/analytics" },
    ],
  },
  {
    key: "research", emoji: "🔬", tKey: "learn.tab.research", Icon: Flask, color: "text-primary", bg: "bg-primary-soft",
    title: "Data Sources & Science",
    intro: "Every figure on AquaMap TJ is anchored in peer-reviewed inventories, international assessments, and government statistics.",
    highlights: [
      { v: "UNEP 2025", l: "Atlas of Environmental Change" },
      { v: "RGI 7.0", l: "13,542 glaciers documented" },
      { v: "WB 2024", l: "Water Security Assessment" },
      { v: "2026", l: "ScienceDirect glacier review" },
    ],
    sections: [
      { h: "UNEP Atlas of Environmental Change for Tajikistan (Sept 2025)", body: "Satellite-based assessment of glacier retreat, land-cover change, and water security across the country. Primary source for headline statistics." },
      { h: "RGI 7.0 — Randolph Glacier Inventory", body: "Global standardized inventory listing 13,542 glaciers in Tajikistan around the year 2000, with current updates feeding climate models." },
      { h: "World Bank Tajikistan Water Security Assessment (2024)", body: "Sector-wide review of clean water access, irrigation efficiency, hydropower investment, and climate adaptation needs." },
      { h: "ScienceDirect — Current status and recent changes of glaciers in Tajikistan (January 2026)", body: "Peer-reviewed synthesis quantifying volume and area change across major Pamir glaciers, including Vanjyakh/Fedchenko retreat rates." },
      { h: "Dushanbe Water Process", body: "Official UN-recognized statistics from Tajikistan's flagship water diplomacy initiative, hosted by the government and supported by UN-Water." },
      { h: "TajNCID", body: "Tajikistan National Center for Innovative Development of Science and Technology — domestic glacier and hydrology data infrastructure." },
    ],
    links: [
      { label: "UNEP Atlas of Tajikistan", href: "https://www.unep.org/" },
      { label: "Randolph Glacier Inventory", href: "https://www.glims.org/rgi_user_guide/welcome.html" },
      { label: "World Bank — Tajikistan", href: "https://www.worldbank.org/en/country/tajikistan" },
      { label: "Dushanbe Water Process", href: "https://dushanbewaterprocess.org/" },
    ],
  },
];

const timelineEvents: { year: string; title: string; body: string }[] = [
  { year: "1924", title: "Soviet dam construction begins", body: "Early Soviet-era infrastructure on the Vakhsh & Syr Darya basins lays the groundwork for centrally-planned irrigation and energy systems." },
  { year: "1972", title: "Nurek HPP commissioned", body: "300 m dam on the Vakhsh becomes the tallest in the world at the time — provides 70%+ of national electricity for decades." },
  { year: "1991", title: "Independence; water conflicts emerge", body: "Collapse of Soviet allocation regime triggers transboundary tensions over Amu Darya and Syr Darya flows." },
  { year: "2007", title: "ICWC framework formalised", body: "The Interstate Commission for Water Coordination sets annual basin allocations — Tajikistan receives 15–18% of Amu Darya despite generating ~55%." },
  { year: "2018", title: "Rogun first unit online", body: "First two turbines of Rogun HPP begin operation; full 3.6 GW capacity targeted by 2032." },
  { year: "2025", title: "UN Year of Glaciers' Preservation", body: "Declared at Tajikistan's initiative; the Dushanbe Glaciers Declaration is signed." },
  { year: "2032", title: "Rogun phase 1 complete (projected)", body: "Total national hydropower capacity reaches ~10.3 GW; CASA-1000 exports scaled up." },
  { year: "2050", title: "Projected glacier loss milestone", body: "Pyanj basin glacier volume projected to fall by 75.5%; Amu Darya runoff begins post-peak decline." },
];

function HistoricalTimeline() {
  const [active, setActive] = useState(0);
  return (
    <div className="panel p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-lg bg-primary-soft text-primary grid place-items-center"><Clock size={18} weight="duotone" /></div>
        <div>
          <h3 className="text-[15px] font-bold text-foreground">Historical Timeline</h3>
          <p className="text-[11.5px] text-muted-foreground">Century of water policy & infrastructure milestones</p>
        </div>
      </div>
      <div className="relative overflow-x-auto pb-2 scrollbar-thin">
        <div className="absolute left-0 right-0 top-[26px] h-0.5 bg-border" />
        <div className="relative flex gap-6 min-w-max px-2">
          {timelineEvents.map((e, i) => (
            <button
              key={e.year}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="flex flex-col items-center w-[88px] group"
            >
              <div className={`w-4 h-4 rounded-full border-2 border-card shadow-sm transition ${i === active ? "bg-primary scale-125" : "bg-muted-foreground/60 group-hover:bg-primary"}`} />
              <div className={`mt-2 text-[11.5px] font-bold tabular-nums ${i === active ? "text-primary" : "text-foreground"}`}>{e.year}</div>
              <div className="text-[10.5px] text-muted-foreground text-center leading-tight mt-0.5 line-clamp-2">{e.title}</div>
            </button>
          ))}
        </div>
      </div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
        className="mt-4 panel p-3.5 bg-secondary/40 border-border"
      >
        <div className="text-[12.5px] font-semibold text-foreground">
          <span className="text-primary">{timelineEvents[active].year}</span> · {timelineEvents[active].title}
        </div>
        <div className="text-[12px] text-muted-foreground leading-relaxed mt-1">{timelineEvents[active].body}</div>
      </motion.div>
    </div>
  );
}

function RegionalCompare() {
  const [selected, setSelected] = useState<string[]>([regions[0].name, regions[3].name]);
  const toggle = (name: string) => {
    setSelected((s) => s.includes(name) ? s.filter((x) => x !== name) : s.length < 3 ? [...s, name] : s);
  };
  const rows = regions.filter((r) => selected.includes(r.name));
  const synth = (r: typeof regions[number]) => {
    const glacier = r.name.includes("Badakhshan") ? "High (Pamir)" : r.name.includes("DRS") || r.name.includes("Republican") ? "Medium" : "Low";
    const hydro = r.name.includes("Khatlon") ? "Nurek · Sangtuda" : r.name.includes("Republican") || r.name.includes("DRS") ? "Rogun" : r.name.includes("Sughd") ? "Qairokkum" : "Micro-hydro";
    const climate = r.risk === "high" ? "Extreme" : r.risk === "moderate" ? "Elevated" : "Stable";
    return { glacier, hydro, climate };
  };
  return (
    <div className="panel p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-9 h-9 rounded-lg bg-success/10 text-success grid place-items-center"><Scales size={18} weight="duotone" /></div>
        <div>
          <h3 className="text-[15px] font-bold text-foreground">Regional Comparison Tool</h3>
          <p className="text-[11.5px] text-muted-foreground">Select up to 3 regions to compare side-by-side</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {regions.map((r) => {
          const on = selected.includes(r.name);
          return (
            <button
              key={r.name}
              onClick={() => toggle(r.name)}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition border ${
                on ? "grad-blue text-white border-transparent shadow-sm" : "border-border text-foreground hover:bg-secondary"
              }`}
            >{r.name}</button>
          );
        })}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[12.5px]">
          <thead>
            <tr className="text-[10.5px] uppercase tracking-wider text-muted-foreground border-b border-border">
              <th className="text-left py-2 font-semibold">Metric</th>
              {rows.map((r) => <th key={r.name} className="text-left py-2 font-semibold">{r.name}</th>)}
            </tr>
          </thead>
          <tbody>
            <CompareRow label="Capital" rows={rows} value={(r) => r.capital} />
            <CompareRow label="Water access" rows={rows} value={(r) => `${r.access}%`} />
            <CompareRow label="Population" rows={rows} value={(r) => r.population} />
            <CompareRow label="Climate risk" rows={rows} value={(r) => synth(r).climate} />
            <CompareRow label="Glacier dependence" rows={rows} value={(r) => synth(r).glacier} />
            <CompareRow label="Hydropower assets" rows={rows} value={(r) => synth(r).hydro} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CompareRow({ label, rows, value }: { label: string; rows: typeof regions; value: (r: typeof regions[number]) => string }) {
  return (
    <tr className="border-b border-border/60 last:border-0">
      <td className="py-2 font-medium text-muted-foreground">{label}</td>
      {rows.map((r) => <td key={r.name} className="py-2 text-foreground">{value(r)}</td>)}
    </tr>
  );
}

function LearnPage() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<TabKey>("water");
  const extraTabs: ExtraTab[] = getExtraTabs(lang);
  const allTabs: TabContent[] = [
    ...tabs,
    ...extraTabs.map((e) => ({ ...e, key: e.key as TabKey })),
  ];
  const current = allTabs.find((tb) => tb.key === active) ?? allTabs[0];
  const waterTypes = getWaterTypes(lang);

  return (
    <AppShell showSidebars={false}>
      <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
        {/* Hero */}
        <div className="panel p-6 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 grad-blue opacity-95" />
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative text-white max-w-2xl">
            <div className="text-[11px] uppercase tracking-widest font-semibold opacity-80">{t("nav.learn")}</div>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">{t("learn.title")}</h1>
            <p className="text-sm opacity-90 mt-2">{t("learn.subtitle")}</p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="panel p-1.5 mb-4 flex flex-wrap gap-1 overflow-x-auto">
          {allTabs.map((tb) => {
            const on = tb.key === active;
            return (
              <button
                key={tb.key}
                onClick={() => setActive(tb.key)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12.5px] font-semibold transition whitespace-nowrap ${
                  on ? "grad-blue text-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <span>{tb.emoji}</span>
                <span>{t(tb.tKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Active tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="panel p-5">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${current.bg} ${current.color}`}>
                  <current.Icon size={22} weight="duotone" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-foreground tracking-tight">{current.title}</h2>
                  <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">{current.intro}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-5">
                {current.highlights.map((s) => (
                  <div key={s.l} className={`rounded-xl p-3 ${current.bg} border border-border/40`}>
                    <div className={`text-lg font-bold tracking-tight ${current.color}`}>{s.v}</div>
                    <div className="text-[10.5px] text-muted-foreground leading-snug mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {current.sections.map((sec, i) => (
                <motion.article
                  key={sec.h}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="panel p-4"
                >
                  <h3 className="font-semibold text-[14px] text-foreground">{sec.h}</h3>
                  <p className="text-[12.5px] text-muted-foreground mt-1.5 leading-relaxed">{sec.body}</p>
                </motion.article>
              ))}
            </div>

            {current.facts && current.facts.length > 0 && (
              <div className="panel p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={16} weight="duotone" className="text-primary" />
                  <h3 className="text-[14px] font-bold text-foreground">Key Facts</h3>
                </div>
                <ul className="space-y-2.5">
                  {current.facts.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[12.5px] text-foreground leading-relaxed">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>
                        {f.text}{" "}
                        <a href={f.href} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-primary hover:underline">
                          [{f.source}]<ArrowSquareOut size={10} weight="bold" />
                        </a>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link to="/" className="panel p-4 hover:bg-secondary/40 transition flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-lg grad-blue text-white grid place-items-center shrink-0">
                  <MapPin size={20} weight="fill" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-bold text-foreground">Explore on Interactive Map</div>
                  <div className="text-[11.5px] text-muted-foreground">Toggle layers, query regions, and export GeoJSON.</div>
                </div>
                <ArrowSquareOut size={16} weight="bold" className="text-muted-foreground group-hover:text-primary transition" />
              </Link>
              <Link to="/analytics" className="panel p-4 hover:bg-secondary/40 transition flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-lg bg-info/10 text-info grid place-items-center shrink-0">
                  <ChartLine size={20} weight="duotone" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-bold text-foreground">Related Analytics</div>
                  <div className="text-[11.5px] text-muted-foreground">
                    {current.related?.map((r) => r.label).join(" · ") || "Open the analytics dashboard"}
                  </div>
                </div>
                <ArrowSquareOut size={16} weight="bold" className="text-muted-foreground group-hover:text-primary transition" />
              </Link>
            </div>

            {active === "regional" && <RegionalCompare />}
            {(active === "water" || active === "hydro" || active === "climate") && <HistoricalTimeline />}

            {(active === "water" || active === "refs") && (
              <div className="panel p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Drop size={16} weight="duotone" className="text-info" />
                  <div>
                    <h3 className="text-[14px] font-bold text-foreground">{t("learn.waterTypes.title")}</h3>
                    <p className="text-[11.5px] text-muted-foreground">{t("learn.waterTypes.sub")}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {waterTypes.map((w) => (
                    <div key={w.key} className={`rounded-xl p-3 border border-border/40 ${w.bg}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-lg leading-none">{w.emoji}</span>
                        <w.Icon size={16} weight="duotone" className={w.color} />
                        <span className="text-[13px] font-bold text-foreground">{w.name}</span>
                      </div>
                      <p className="text-[11.5px] text-muted-foreground leading-snug mt-1.5">{w.def}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {current.links && current.links.length > 0 && (
              <div className="panel p-4">
                <h3 className="font-semibold text-[13px] text-foreground mb-2">{t("learn.external")}</h3>
                <div className="flex flex-wrap gap-2">
                  {current.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-[12px] font-medium text-foreground hover:bg-secondary transition"
                    >
                      {l.label}
                      <ArrowSquareOut size={12} weight="bold" className="text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  );
}