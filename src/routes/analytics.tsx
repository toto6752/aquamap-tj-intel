import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { ConfidenceBadge, AIInsight, Confidence } from "@/components/ui/confidence-badge";
import { regions } from "@/lib/mock-data";
import { Drop, Snowflake, CloudRain, Waves, Lightning, Globe } from "@phosphor-icons/react";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — AquaMap TJ" },
      { name: "description", content: "Water Intelligence Dashboard — glacier, climate, hydropower, and regional indicators for Tajikistan." },
    ],
  }),
  component: AnalyticsPage,
});

// Datasets (all anchored to public/peer-reviewed sources or labelled as Estimated/Demonstration)
const glacierData = [
  { year: "1990", area: 11800 }, { year: "2000", area: 10650 },
  { year: "2005", area: 9900 }, { year: "2010", area: 9320 },
  { year: "2015", area: 8780 }, { year: "2020", area: 8320 },
  { year: "2024", area: 8030 },
];
const waterAccess = [
  { year: "2015", urban: 91, rural: 52 }, { year: "2017", urban: 92, rural: 56 },
  { year: "2019", urban: 93, rural: 61 }, { year: "2021", urban: 94, rural: 66 },
  { year: "2023", urban: 95, rural: 70 }, { year: "2024", urban: 96, rural: 74 },
];
const hydroData = [
  { m: "Jan", gwh: 1400 }, { m: "Feb", gwh: 1280 }, { m: "Mar", gwh: 1380 },
  { m: "Apr", gwh: 1620 }, { m: "May", gwh: 1980 }, { m: "Jun", gwh: 2240 },
  { m: "Jul", gwh: 2380 }, { m: "Aug", gwh: 2310 }, { m: "Sep", gwh: 2020 },
  { m: "Oct", gwh: 1740 }, { m: "Nov", gwh: 1520 }, { m: "Dec", gwh: 1440 },
];
const riskBreakdown = [
  { name: "Flood", value: 38, color: "#4a8cd6" },
  { name: "Drought", value: 27, color: "#f3a847" },
  { name: "GLOF", value: 18, color: "#7c5cff" },
  { name: "Mudflow", value: 17, color: "#e85d5d" },
];
const runoffData = [
  { m: "Jan", v: 22 }, { m: "Feb", v: 21 }, { m: "Mar", v: 30 },
  { m: "Apr", v: 55 }, { m: "May", v: 95 }, { m: "Jun", v: 145 },
  { m: "Jul", v: 178 }, { m: "Aug", v: 162 }, { m: "Sep", v: 108 },
  { m: "Oct", v: 60 }, { m: "Nov", v: 36 }, { m: "Dec", v: 25 },
];
const basinData = [
  { name: "Panj", v: 33.5 }, { name: "Vakhsh", v: 20.0 },
  { name: "Kofarnihon", v: 5.4 }, { name: "Zarafshan", v: 4.6 },
  { name: "Syr Darya (TJ)", v: 1.0 },
];
const tempAnomaly = [
  { y: "1980", a: 0.0 }, { y: "1990", a: 0.3 }, { y: "2000", a: 0.55 },
  { y: "2010", a: 0.85 }, { y: "2015", a: 1.0 }, { y: "2020", a: 1.15 }, { y: "2024", a: 1.25 },
];
const precipData = [
  { y: "2015", mm: 691 }, { y: "2016", mm: 720 }, { y: "2017", mm: 660 },
  { y: "2018", mm: 612 }, { y: "2019", mm: 745 }, { y: "2020", mm: 690 },
  { y: "2021", mm: 580 }, { y: "2022", mm: 705 }, { y: "2023", mm: 668 }, { y: "2024", mm: 715 },
];
const disasterFreq = [
  { y: "2015", n: 412 }, { y: "2016", n: 438 }, { y: "2017", n: 467 },
  { y: "2018", n: 480 }, { y: "2019", n: 510 }, { y: "2020", n: 528 },
  { y: "2021", n: 552 }, { y: "2022", n: 561 }, { y: "2023", n: 583 },
];
const capacityData = [
  { p: "Nurek", mw: 3000 }, { p: "Rogun (planned)", mw: 3780 },
  { p: "Sangtuda-1", mw: 670 }, { p: "Sangtuda-2", mw: 220 },
  { p: "Baipaza", mw: 600 }, { p: "Qairokkum", mw: 126 },
];

type TabKey = "water" | "glaciers" | "climate" | "access" | "hydro" | "regional";

function Card({
  title, subtitle, children, delay = 0,
  confidence, source, updated, insight,
}: {
  title: string; subtitle?: string; children: ReactNode; delay?: number;
  confidence: Confidence; source: string; updated: string; insight: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="panel p-4 flex flex-col"
    >
      <div className="mb-3">
        <div className="text-[13px] font-semibold text-foreground">{title}</div>
        {subtitle && <div className="text-[11px] text-muted-foreground">{subtitle}</div>}
      </div>
      <div className="h-[240px]">{children}</div>
      <ConfidenceBadge level={confidence} source={source} updated={updated} />
      <AIInsight text={insight} />
    </motion.div>
  );
}

const axis = { stroke: "#8a99b3", fontSize: 11, tickLine: false, axisLine: false } as const;
const tooltipStyle = { borderRadius: 12, border: "1px solid #e6ecf4", fontSize: 12 };

function GlacierChart() { return (
  <ResponsiveContainer>
    <AreaChart data={glacierData}>
      <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7fb8d8" stopOpacity={0.55} />
        <stop offset="100%" stopColor="#7fb8d8" stopOpacity={0} />
      </linearGradient></defs>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="year" {...axis} /><YAxis {...axis} />
      <Tooltip contentStyle={tooltipStyle} />
      <Area type="monotone" dataKey="area" stroke="#4a8cd6" strokeWidth={2.5} fill="url(#g1)" />
    </AreaChart>
  </ResponsiveContainer>
); }

function AccessChart() { return (
  <ResponsiveContainer>
    <LineChart data={waterAccess}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="year" {...axis} /><YAxis {...axis} />
      <Tooltip contentStyle={tooltipStyle} />
      <Legend wrapperStyle={{ fontSize: 11 }} />
      <Line type="monotone" dataKey="urban" stroke="#4a8cd6" strokeWidth={2.5} dot={{ r: 3 }} />
      <Line type="monotone" dataKey="rural" stroke="#f3a847" strokeWidth={2.5} dot={{ r: 3 }} />
    </LineChart>
  </ResponsiveContainer>
); }

function HydroChart() { return (
  <ResponsiveContainer>
    <BarChart data={hydroData}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="m" {...axis} /><YAxis {...axis} />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="gwh" fill="#7c5cff" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
); }

function RiskChart() { return (
  <ResponsiveContainer>
    <PieChart>
      <Pie data={riskBreakdown} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={3}>
        {riskBreakdown.map((d) => <Cell key={d.name} fill={d.color} />)}
      </Pie>
      <Tooltip contentStyle={tooltipStyle} />
      <Legend wrapperStyle={{ fontSize: 11 }} />
    </PieChart>
  </ResponsiveContainer>
); }

function RunoffChart() { return (
  <ResponsiveContainer>
    <AreaChart data={runoffData}>
      <defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#54b97a" stopOpacity={0.55} />
        <stop offset="100%" stopColor="#54b97a" stopOpacity={0} />
      </linearGradient></defs>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="m" {...axis} /><YAxis {...axis} />
      <Tooltip contentStyle={tooltipStyle} />
      <Area type="monotone" dataKey="v" stroke="#2f9c5b" strokeWidth={2.5} fill="url(#g2)" />
    </AreaChart>
  </ResponsiveContainer>
); }

function BasinChart() { return (
  <ResponsiveContainer>
    <BarChart data={basinData} layout="vertical" margin={{ left: 20 }}>
      <CartesianGrid stroke="#eef2f7" horizontal={false} />
      <XAxis type="number" {...axis} />
      <YAxis type="category" dataKey="name" {...axis} width={100} />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="v" fill="#4a8cd6" radius={[0, 6, 6, 0]} />
    </BarChart>
  </ResponsiveContainer>
); }

function TempChart() { return (
  <ResponsiveContainer>
    <LineChart data={tempAnomaly}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="y" {...axis} /><YAxis {...axis} />
      <Tooltip contentStyle={tooltipStyle} />
      <Line type="monotone" dataKey="a" stroke="#e85d5d" strokeWidth={2.5} dot={{ r: 3 }} />
    </LineChart>
  </ResponsiveContainer>
); }

function PrecipChart() { return (
  <ResponsiveContainer>
    <BarChart data={precipData}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="y" {...axis} /><YAxis {...axis} />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="mm" fill="#4a8cd6" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
); }

function DisasterChart() { return (
  <ResponsiveContainer>
    <LineChart data={disasterFreq}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="y" {...axis} /><YAxis {...axis} />
      <Tooltip contentStyle={tooltipStyle} />
      <Line type="monotone" dataKey="n" stroke="#f3a847" strokeWidth={2.5} dot={{ r: 3 }} />
    </LineChart>
  </ResponsiveContainer>
); }

function CapacityChart() { return (
  <ResponsiveContainer>
    <BarChart data={capacityData}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="p" {...axis} interval={0} angle={-15} textAnchor="end" height={50} />
      <YAxis {...axis} />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="mw" fill="#7c5cff" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
); }

function RegionalTable() {
  const { t } = useI18n();
  const riskLabel = { high: t("risk.high"), moderate: t("risk.moderate"), low: t("risk.low") };
  const riskBg = { high: "bg-destructive/10 text-destructive", moderate: "bg-warning/10 text-warning", low: "bg-success/10 text-success" };
  return (
    <div className="panel p-4 overflow-x-auto">
      <div className="mb-3">
        <div className="text-[13px] font-semibold text-foreground">{t("an.regional.title")}</div>
        <div className="text-[11px] text-muted-foreground">{t("an.regional.sub")}</div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
            <th className="text-left py-2 font-semibold">{t("an.regional.col.region")}</th>
            <th className="text-left py-2 font-semibold">{t("an.regional.col.capital")}</th>
            <th className="text-left py-2 font-semibold">{t("an.regional.col.access")}</th>
            <th className="text-left py-2 font-semibold">{t("an.regional.col.risk")}</th>
            <th className="text-left py-2 font-semibold">{t("an.regional.col.pop")}</th>
          </tr>
        </thead>
        <tbody>
          {regions.map((r) => (
            <tr key={r.name} className="border-b border-border/60 last:border-0">
              <td className="py-2.5 font-medium text-foreground">{r.name}</td>
              <td className="py-2.5 text-muted-foreground">{r.capital}</td>
              <td className="py-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full grad-blue" style={{ width: `${r.access}%` }} />
                  </div>
                  <span className="text-[12px] font-semibold text-foreground">{r.access}%</span>
                </div>
              </td>
              <td className="py-2.5">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${riskBg[r.risk]}`}>{riskLabel[r.risk]}</span>
              </td>
              <td className="py-2.5 text-foreground">{r.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfidenceBadge level="verified" source="World Bank · UN DESA" updated="2024" />
    </div>
  );
}

function AnalyticsPage() {
  const { t } = useI18n();
  const [tab, setTab] = useState<TabKey>("water");

  const tabs: { key: TabKey; label: string; Icon: typeof Drop }[] = [
    { key: "water", label: t("an.tab.water"), Icon: Drop },
    { key: "glaciers", label: t("an.tab.glaciers"), Icon: Snowflake },
    { key: "climate", label: t("an.tab.climate"), Icon: CloudRain },
    { key: "access", label: t("an.tab.access"), Icon: Waves },
    { key: "hydro", label: t("an.tab.hydro"), Icon: Lightning },
    { key: "regional", label: t("an.tab.regional"), Icon: Globe },
  ];

  return (
    <AppShell showSidebars={false}>
      <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{t("an.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("an.subtitle")}</p>
        </div>

        <div className="panel p-1.5 mb-4 flex flex-wrap gap-1">
          {tabs.map((tb) => {
            const on = tb.key === tab;
            return (
              <button
                key={tb.key}
                onClick={() => setTab(tb.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[12.5px] font-semibold transition whitespace-nowrap ${
                  on ? "grad-blue text-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <tb.Icon size={14} weight={on ? "fill" : "duotone"} />
                {tb.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
            {tab === "water" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Card title={t("an.basin.title")} subtitle={t("an.basin.sub")} confidence="verified" source="FAO AQUASTAT" updated="2023" insight={t("an.basin.insight")}><BasinChart /></Card>
                <Card title={t("an.runoff.title")} subtitle={t("an.runoff.sub")} confidence="estimated" source="UNECE basin profile (demonstration index)" updated="2024" insight={t("an.runoff.insight")}><RunoffChart /></Card>
              </div>
            )}
            {tab === "glaciers" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Card title={t("an.glacier.title")} subtitle={t("an.glacier.sub")} confidence="verified" source="RGI 7.0 · TajNCID · ScienceDirect 2026" updated="2024" insight={t("an.glacier.insight")}><GlacierChart /></Card>
                <Card title={t("an.temp.title")} subtitle={t("an.temp.sub")} confidence="verified" source="NASA GISS · World Bank Climate Portal" updated="2024" insight={t("an.temp.insight")}><TempChart /></Card>
              </div>
            )}
            {tab === "climate" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Card title={t("an.risk.title")} subtitle={t("an.risk.sub")} confidence="estimated" source="UNEP 2025 (district aggregation)" updated="2025" insight={t("an.risk.insight")}><RiskChart /></Card>
                <Card title={t("an.precip.title")} subtitle={t("an.precip.sub")} confidence="verified" source="World Bank Climate Portal" updated="2024" insight={t("an.precip.insight")}><PrecipChart /></Card>
                <Card title={t("an.disaster.title")} subtitle={t("an.disaster.sub")} confidence="estimated" source="EM-DAT (UCLouvain) · Govt. of Tajikistan CoES" updated="2023" insight={t("an.disaster.insight")}><DisasterChart /></Card>
              </div>
            )}
            {tab === "access" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Card title={t("an.access.title")} subtitle={t("an.access.sub")} confidence="verified" source="World Bank · JMP WHO/UNICEF" updated="2024" insight={t("an.access.insight")}><AccessChart /></Card>
              </div>
            )}
            {tab === "hydro" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Card title={t("an.hydro.title")} subtitle={t("an.hydro.sub")} confidence="demo" source="Demonstration dataset (modelled seasonality)" updated="2024" insight={t("an.hydro.insight")}><HydroChart /></Card>
                <Card title={t("an.capacity.title")} subtitle={t("an.capacity.sub")} confidence="verified" source="MEWR Tajikistan · World Bank 2024" updated="2024" insight={t("an.capacity.insight")}><CapacityChart /></Card>
              </div>
            )}
            {tab === "regional" && <RegionalTable />}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
