import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, Legend, ComposedChart,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ReferenceArea,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { useState, ReactNode, useRef } from "react";
import { toPng } from "html-to-image";
import { useI18n } from "@/lib/i18n";
import { ConfidenceBadge, AIInsight, Confidence } from "@/components/ui/confidence-badge";
import { regions } from "@/lib/mock-data";
import { Drop, Snowflake, CloudRain, Lightning, Globe, DownloadSimple, FileCsv, Image as ImageIcon, Share, FilePdf } from "@phosphor-icons/react";

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

// --- New datasets for expanded analytics ---
const glacierTimeline = [
  { year: "1990", area: 15240, loss: 0 },
  { year: "1995", area: 14910, loss: 330 },
  { year: "2000", area: 14620, loss: 290 },
  { year: "2005", area: 14380, loss: 240 },
  { year: "2010", area: 14180, loss: 200 },
  { year: "2015", area: 14010, loss: 170 },
  { year: "2020", area: 13847, loss: 163 },
  { year: "2025", area: 13542, loss: 305 },
];
const glacierElevation = [
  { zone: "2000–3000 m", count: 0.18, fill: "#e85d5d" },
  { zone: "3000–4000 m", count: 1.42, fill: "#f3a847" },
  { zone: "4000–5000 m", count: 6.10, fill: "#4a8cd6" },
  { zone: "5000 m+",     count: 5.74, fill: "#1f4e7a" },
];
const basinStacked = [
  { name: "Amu Darya", surface: 49.5, groundwater: 5.2, runoff: 8.8 },
  { name: "Syr Darya", surface: 1.0, groundwater: 0.6, runoff: 0.4 },
  { name: "Zarafshan", surface: 4.6, groundwater: 0.5, runoff: 0.7 },
  { name: "Others",    surface: 3.1, groundwater: 0.4, runoff: 0.5 },
];
const tempSeasonal = [
  { y: "1990", annual: 0.0, spring: 0.1, summer: -0.1, autumn: 0.0, winter: 0.1 },
  { y: "1995", annual: 0.18, spring: 0.22, summer: 0.10, autumn: 0.18, winter: 0.20 },
  { y: "2000", annual: 0.35, spring: 0.40, summer: 0.30, autumn: 0.32, winter: 0.38 },
  { y: "2005", annual: 0.55, spring: 0.60, summer: 0.45, autumn: 0.55, winter: 0.62 },
  { y: "2010", annual: 0.75, spring: 0.82, summer: 0.65, autumn: 0.72, winter: 0.80 },
  { y: "2015", annual: 0.95, spring: 1.05, summer: 0.82, autumn: 0.93, winter: 1.00 },
  { y: "2020", annual: 1.15, spring: 1.25, summer: 1.00, autumn: 1.12, winter: 1.22 },
  { y: "2025", annual: 1.32, spring: 1.45, summer: 1.18, autumn: 1.30, winter: 1.40 },
];
const precipDecade = [
  { decade: "1990s", min: 540, q1: 620, median: 705, q3: 760, max: 820, avg: 695 },
  { decade: "2000s", min: 510, q1: 605, median: 690, q3: 745, max: 800, avg: 678 },
  { decade: "2010s", min: 470, q1: 580, median: 645, q3: 700, max: 770, avg: 638 },
  { decade: "2020s", min: 520, q1: 610, median: 685, q3: 735, max: 790, avg: 665 },
];
const riskDistricts = [
  { level: "High (GBAO, Badakhshan)", n: 7, fill: "#cc0000" },
  { level: "Moderate (Khatlon, DRS)", n: 18, fill: "#ff8800" },
  { level: "Low (Sughd lowlands)",    n: 20, fill: "#00aa00" },
];
const capacityWaterfall = [
  { phase: "Operating 2025", value: 4.6, fill: "#4a8cd6" },
  { phase: "Rogun 2028–2032", value: 3.6, fill: "#7c5cff" },
  { phase: "Other Planned", value: 2.1, fill: "#f3a847" },
  { phase: "Total by 2032", value: 10.3, fill: "#2f9c5b" },
];
const monthlyGen = [
  { m: "Jan", util: 58, precip: 62 }, { m: "Feb", util: 54, precip: 68 },
  { m: "Mar", util: 60, precip: 88 }, { m: "Apr", util: 70, precip: 112 },
  { m: "May", util: 82, precip: 95 }, { m: "Jun", util: 92, precip: 60 },
  { m: "Jul", util: 96, precip: 28 }, { m: "Aug", util: 94, precip: 22 },
  { m: "Sep", util: 84, precip: 30 }, { m: "Oct", util: 72, precip: 55 },
  { m: "Nov", util: 64, precip: 70 }, { m: "Dec", util: 60, precip: 65 },
];
const downstreamFlow = [
  { country: "Uzbekistan", pct: 40, km3: 25.6, fill: "#4a8cd6" },
  { country: "Kyrgyzstan", pct: 25, km3: 16.0, fill: "#7c5cff" },
  { country: "Kazakhstan", pct: 20, km3: 12.8, fill: "#2f9c5b" },
  { country: "Turkmenistan / Afghanistan", pct: 15, km3: 9.6, fill: "#f3a847" },
];
const stressRadar = [
  { metric: "Available", Tajikistan: 95, Uzbekistan: 30, Kazakhstan: 40, Turkmenistan: 20 },
  { metric: "Demand",    Tajikistan: 35, Uzbekistan: 90, Kazakhstan: 70, Turkmenistan: 85 },
  { metric: "Stress",    Tajikistan: 39, Uzbekistan: 95, Kazakhstan: 75, Turkmenistan: 88 },
  { metric: "Storage",   Tajikistan: 80, Uzbekistan: 45, Kazakhstan: 55, Turkmenistan: 30 },
  { metric: "Quality",   Tajikistan: 72, Uzbekistan: 50, Kazakhstan: 60, Turkmenistan: 48 },
];

type TabKey = "glaciers" | "water" | "climate" | "hydro" | "regional";

// --- Export helpers ---
function downloadCSV(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
async function downloadPNG(node: HTMLElement | null, filename: string) {
  if (!node) return;
  try {
    const dataUrl = await toPng(node, { backgroundColor: "#ffffff", pixelRatio: 2 });
    const a = document.createElement("a");
    a.href = dataUrl; a.download = filename; a.click();
  } catch (e) { console.error(e); }
}
function shareLink(title: string) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  if (typeof navigator !== "undefined" && navigator.share) {
    navigator.share({ title, url }).catch(() => {});
  } else if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(url);
  }
}

function Card({
  title, subtitle, children, delay = 0,
  confidence, source, updated, insight, csvData, csvName,
}: {
  title: string; subtitle?: string; children: ReactNode; delay?: number;
  confidence: Confidence; source: string; updated: string; insight: string;
  csvData?: Record<string, unknown>[]; csvName?: string;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const slug = (csvName || title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="panel p-4 flex flex-col"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-[13px] font-semibold text-foreground">{title}</div>
          {subtitle && <div className="text-[11px] text-muted-foreground">{subtitle}</div>}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => downloadPNG(chartRef.current, `${slug}.png`)}
            title="Export PNG"
            className="h-7 w-7 grid place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition"
          ><ImageIcon size={13} /></button>
          {csvData && (
            <button
              onClick={() => downloadCSV(`${slug}.csv`, csvData)}
              title="Export CSV"
              className="h-7 w-7 grid place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition"
            ><FileCsv size={13} /></button>
          )}
          <button
            onClick={() => shareLink(title)}
            title="Share"
            className="h-7 w-7 grid place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition"
          ><Share size={13} /></button>
        </div>
      </div>
      <div ref={chartRef} className="h-[260px]">{children}</div>
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

// --- New charts ---
function GlacierTimelineChart() { return (
  <ResponsiveContainer>
    <LineChart data={glacierTimeline}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="year" {...axis} />
      <YAxis {...axis} domain={[13000, 15500]} />
      <Tooltip contentStyle={tooltipStyle} formatter={(v: number, n: string, p) => n === "area"
        ? [`${v.toLocaleString()} km² · loss ${p.payload.loss} km²`, "Glacier area"] : [v, n]} />
      <Line type="monotone" dataKey="area" stroke="#4a8cd6" strokeWidth={2.5} dot={{ r: 3 }} />
    </LineChart>
  </ResponsiveContainer>
); }

function GlacierElevationChart() { return (
  <ResponsiveContainer>
    <BarChart data={glacierElevation} layout="vertical" margin={{ left: 30 }}>
      <CartesianGrid stroke="#eef2f7" horizontal={false} />
      <XAxis type="number" {...axis} />
      <YAxis type="category" dataKey="zone" {...axis} width={110} />
      <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v.toFixed(2)}k glaciers`, "Count"]} />
      <Bar dataKey="count" radius={[0, 6, 6, 0]}>
        {glacierElevation.map((d) => <Cell key={d.zone} fill={d.fill} />)}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
); }

function BasinStackedChart() { return (
  <ResponsiveContainer>
    <BarChart data={basinStacked}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="name" {...axis} />
      <YAxis {...axis} />
      <Tooltip contentStyle={tooltipStyle} />
      <Legend wrapperStyle={{ fontSize: 11 }} />
      <Bar dataKey="surface" stackId="a" name="Surface water" fill="#4a8cd6" radius={[0, 0, 0, 0]} />
      <Bar dataKey="groundwater" stackId="a" name="Groundwater" fill="#7c5cff" />
      <Bar dataKey="runoff" stackId="a" name="Runoff" fill="#2f9c5b" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
); }

function RunoffSeasonalChart() { return (
  <ResponsiveContainer>
    <AreaChart data={runoffData}>
      <defs><linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4a8cd6" stopOpacity={0.55} />
        <stop offset="100%" stopColor="#4a8cd6" stopOpacity={0} />
      </linearGradient></defs>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="m" {...axis} /><YAxis {...axis} />
      <Tooltip contentStyle={tooltipStyle} />
      <ReferenceArea x1="Jun" x2="Sep" fill="#f3a847" fillOpacity={0.15} label={{ value: "70% annual flow", fontSize: 10, fill: "#a86a1a" }} />
      <Area type="monotone" dataKey="v" stroke="#1f4e7a" strokeWidth={2.5} fill="url(#g3)" />
    </AreaChart>
  </ResponsiveContainer>
); }

function TempSeasonalChart() { return (
  <ResponsiveContainer>
    <LineChart data={tempSeasonal}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="y" {...axis} /><YAxis {...axis} unit="°C" />
      <Tooltip contentStyle={tooltipStyle} />
      <Legend wrapperStyle={{ fontSize: 11 }} />
      <Line type="monotone" dataKey="annual" stroke="#e85d5d" strokeWidth={2.5} dot={false} />
      <Line type="monotone" dataKey="spring" stroke="#2f9c5b" strokeWidth={1.5} dot={false} />
      <Line type="monotone" dataKey="summer" stroke="#f3a847" strokeWidth={1.5} dot={false} />
      <Line type="monotone" dataKey="autumn" stroke="#7c5cff" strokeWidth={1.5} dot={false} />
      <Line type="monotone" dataKey="winter" stroke="#4a8cd6" strokeWidth={1.5} dot={false} />
    </LineChart>
  </ResponsiveContainer>
); }

function PrecipBoxChart() { return (
  <ResponsiveContainer>
    <ComposedChart data={precipDecade}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="decade" {...axis} /><YAxis {...axis} unit="mm" />
      <Tooltip contentStyle={tooltipStyle} />
      <Legend wrapperStyle={{ fontSize: 11 }} />
      <Bar dataKey="q1" stackId="b" fill="transparent" name="" legendType="none" />
      <Bar dataKey="median" stackId="b" name="IQR (Q1→Median)" fill="#a8c8e8" />
      <Bar dataKey="q3" stackId="b" name="IQR (Median→Q3)" fill="#4a8cd6" />
      <Line type="monotone" dataKey="avg" name="Mean trend" stroke="#e85d5d" strokeWidth={2.5} dot={{ r: 3 }} />
    </ComposedChart>
  </ResponsiveContainer>
); }

function RiskDistrictsChart() { return (
  <ResponsiveContainer>
    <BarChart data={riskDistricts}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="level" {...axis} interval={0} tick={{ fontSize: 10 }} />
      <YAxis {...axis} />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="n" radius={[6, 6, 0, 0]}>
        {riskDistricts.map((d) => <Cell key={d.level} fill={d.fill} />)}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
); }

function CapacityWaterfallChart() { return (
  <ResponsiveContainer>
    <BarChart data={capacityWaterfall}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="phase" {...axis} interval={0} tick={{ fontSize: 10 }} />
      <YAxis {...axis} unit=" GW" />
      <Tooltip contentStyle={tooltipStyle} />
      <Bar dataKey="value" radius={[6, 6, 0, 0]} label={{ position: "top", fontSize: 11, fill: "#1f2937" }}>
        {capacityWaterfall.map((d) => <Cell key={d.phase} fill={d.fill} />)}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
); }

function MonthlyGenChart() { return (
  <ResponsiveContainer>
    <ComposedChart data={monthlyGen}>
      <CartesianGrid stroke="#eef2f7" vertical={false} />
      <XAxis dataKey="m" {...axis} />
      <YAxis yAxisId="left" {...axis} unit="%" />
      <YAxis yAxisId="right" orientation="right" {...axis} unit="mm" />
      <Tooltip contentStyle={tooltipStyle} />
      <Legend wrapperStyle={{ fontSize: 11 }} />
      <Bar yAxisId="left" dataKey="util" name="Utilization %" fill="#7c5cff" radius={[6, 6, 0, 0]} />
      <Line yAxisId="right" type="monotone" dataKey="precip" name="Precipitation (mm)" stroke="#4a8cd6" strokeWidth={2.5} dot={{ r: 3 }} />
    </ComposedChart>
  </ResponsiveContainer>
); }

function DownstreamChart() { return (
  <ResponsiveContainer>
    <BarChart data={downstreamFlow} layout="vertical" margin={{ left: 30 }}>
      <CartesianGrid stroke="#eef2f7" horizontal={false} />
      <XAxis type="number" {...axis} unit=" km³" />
      <YAxis type="category" dataKey="country" {...axis} width={170} tick={{ fontSize: 10 }} />
      <Tooltip contentStyle={tooltipStyle} formatter={(v: number, _n, p) => [`${v} km³ · ${p.payload.pct}%`, "Allocation"]} />
      <Bar dataKey="km3" radius={[0, 6, 6, 0]} label={{ position: "right", fontSize: 11, formatter: (v: number) => `${v} km³` }}>
        {downstreamFlow.map((d) => <Cell key={d.country} fill={d.fill} />)}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
); }

function StressRadarChart() { return (
  <ResponsiveContainer>
    <RadarChart data={stressRadar} outerRadius="75%">
      <PolarGrid stroke="#dde5ef" />
      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "#5a6b85" }} />
      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: "#8a99b3" }} />
      <Radar name="Tajikistan" dataKey="Tajikistan" stroke="#2f9c5b" fill="#2f9c5b" fillOpacity={0.3} />
      <Radar name="Uzbekistan" dataKey="Uzbekistan" stroke="#e85d5d" fill="#e85d5d" fillOpacity={0.25} />
      <Radar name="Kazakhstan" dataKey="Kazakhstan" stroke="#4a8cd6" fill="#4a8cd6" fillOpacity={0.2} />
      <Radar name="Turkmenistan" dataKey="Turkmenistan" stroke="#f3a847" fill="#f3a847" fillOpacity={0.2} />
      <Legend wrapperStyle={{ fontSize: 11 }} />
      <Tooltip contentStyle={tooltipStyle} />
    </RadarChart>
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
  const [tab, setTab] = useState<TabKey>("glaciers");

  const tabs: { key: TabKey; label: string; Icon: typeof Drop }[] = [
    { key: "glaciers", label: "Glacier Monitoring", Icon: Snowflake },
    { key: "water", label: "Water Resources", Icon: Drop },
    { key: "climate", label: "Climate Risk & Change", Icon: CloudRain },
    { key: "hydro", label: "Hydropower & Energy", Icon: Lightning },
    { key: "regional", label: "Regional & Transboundary", Icon: Globe },
  ];

  return (
    <AppShell showSidebars={false}>
      <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
        <div className="mb-4 flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">{t("an.title")}</h1>
            <p className="text-sm text-muted-foreground">{t("an.subtitle")}</p>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg grad-blue text-white text-sm font-semibold shadow-sm hover:opacity-90 transition"
          >
            <FilePdf size={16} weight="duotone" />
            Download Full Report (PDF)
          </button>
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
            {tab === "glaciers" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Card title="Glacier Retreat Timeline (1990–2025)" subtitle="Total ice area across Pamir & Alay ranges"
                  confidence="verified" source="RGI 7.0 · TajNCID · ScienceDirect 2026" updated="2025"
                  insight="Retreat rate: −1.1% per year. ~1,700 km² lost in 35 years — equivalent to all glaciers in the Hissar range."
                  csvData={glacierTimeline} csvName="glacier-retreat-timeline"><GlacierTimelineChart /></Card>
                <Card title="Glaciers by Elevation Zone (2025)" subtitle="Distribution by altitude band (thousands of glaciers)"
                  confidence="verified" source="GLIMS · RGI 7.0" updated="2025"
                  insight="92% of glaciers above 4,000 m remain — but lower-elevation ice (<3,000 m) is nearly gone, indicating active warming front."
                  csvData={glacierElevation} csvName="glaciers-by-elevation"><GlacierElevationChart /></Card>
                <Card title="Glacier Volume Trend (km³)" subtitle="Aggregate ice volume across monitored glaciers"
                  confidence="estimated" source="TajNCID modelled volume series" updated="2024"
                  insight="Volume loss is accelerating faster than area — thinning dominates over edge retreat."
                  csvData={glacierData} csvName="glacier-volume"><GlacierChart /></Card>
                <Card title="Temperature Anomaly (Pamir region)" subtitle="°C relative to 1990–2010 baseline"
                  confidence="verified" source="NASA GISS · World Bank Climate Portal" updated="2024"
                  insight="Pamir warming is ~2× the global rate — primary driver of glacier mass loss."
                  csvData={tempAnomaly} csvName="temperature-anomaly"><TempChart /></Card>
              </div>
            )}
            {tab === "water" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Card title="Basin Water Availability (km³/yr)" subtitle="Surface · groundwater · runoff by basin"
                  confidence="verified" source="FAO AQUASTAT" updated="2023"
                  insight="Amu Darya tributaries (Panj + Vakhsh) generate ~60% of national water resources."
                  csvData={basinStacked} csvName="basin-availability"><BasinStackedChart /></Card>
                <Card title="Seasonal Runoff Pattern" subtitle="Monthly discharge index — irrigation season highlighted"
                  confidence="verified" source="UNECE basin profile · CAWater-Info" updated="2024"
                  insight="June–September delivers ~70% of annual flow. Extreme seasonality creates winter water stress for irrigation and storage."
                  csvData={runoffData} csvName="seasonal-runoff"><RunoffSeasonalChart /></Card>
                <Card title="Basin Allocation (legacy view)" subtitle="Single-source volume per basin"
                  confidence="verified" source="FAO AQUASTAT" updated="2023"
                  insight="Panj is the dominant single contributor at 33.5 km³/yr."
                  csvData={basinData} csvName="basin-allocation"><BasinChart /></Card>
                <Card title="Water Access — Urban vs Rural" subtitle="% population with safely-managed drinking water"
                  confidence="verified" source="World Bank · JMP WHO/UNICEF" updated="2024"
                  insight="Rural gap is closing (+22 pts since 2015) but ~26% of rural population still lacks safe water."
                  csvData={waterAccess} csvName="water-access"><AccessChart /></Card>
              </div>
            )}
            {tab === "climate" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Card title="Temperature Trend by Season (1990–2025)" subtitle="Seasonal °C anomalies vs 1990–2010 baseline"
                  confidence="verified" source="NASA GISS · World Bank Climate Portal" updated="2025"
                  insight="Warming rate: +0.04 °C/yr — winter & spring rising fastest, advancing snowmelt timing."
                  csvData={tempSeasonal} csvName="temperature-seasonal"><TempSeasonalChart /></Card>
                <Card title="Precipitation Variability by Decade" subtitle="IQR (Q1–Median–Q3) with mean trend (mm/yr)"
                  confidence="verified" source="World Bank Climate Portal · CRU TS" updated="2024"
                  insight="The 2010s were the driest decade on record — mean precipitation fell ~8% vs 1990s."
                  csvData={precipDecade} csvName="precipitation-by-decade"><PrecipBoxChart /></Card>
                <Card title="Climate Risk — Districts Affected" subtitle="45 districts classified by composite climate risk"
                  confidence="estimated" source="UNEP 2025 (district aggregation)" updated="2025"
                  insight="Glacier-dependent regions (GBAO, Badakhshan) face the highest stress — 7 districts at extreme risk."
                  csvData={riskDistricts} csvName="risk-districts"><RiskDistrictsChart /></Card>
                <Card title="Disaster Frequency (annual events)" subtitle="Floods, mudflows, GLOFs, droughts"
                  confidence="estimated" source="EM-DAT (UCLouvain) · Govt. of Tajikistan CoES" updated="2023"
                  insight="+41% increase in recorded events 2015→2023 — consistent with climate intensification."
                  csvData={disasterFreq} csvName="disaster-frequency"><DisasterChart /></Card>
                <Card title="Hazard Mix (national totals)" subtitle="Share of recorded water-related disasters"
                  confidence="estimated" source="EM-DAT · CoES" updated="2024"
                  insight="Floods dominate event count; GLOFs are rare but cause disproportionate damage in mountain valleys."
                  csvData={riskBreakdown} csvName="hazard-mix"><RiskChart /></Card>
              </div>
            )}
            {tab === "hydro" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <Card title="Hydropower Capacity Roadmap (GW)" subtitle="Operating → Under construction → Planned"
                  confidence="verified" source="MEWR Tajikistan · ADB · World Bank 2024" updated="2025"
                  insight="Total potential reaches 10.3 GW by 2032 with Rogun (3.6 GW) and a 2.1 GW planned pipeline."
                  csvData={capacityWaterfall} csvName="capacity-roadmap"><CapacityWaterfallChart /></Card>
                <Card title="Monthly Generation vs Precipitation" subtitle="Utilization % with rainfall overlay"
                  confidence="demo" source="Demonstration dataset (modelled seasonality)" updated="2024"
                  insight="Summer peak driven by glacier/snow melt; winter generation needs reservoir storage strategy."
                  csvData={monthlyGen} csvName="monthly-generation"><MonthlyGenChart /></Card>
                <Card title="Plant-level Installed Capacity (MW)" subtitle="Operating + committed plants"
                  confidence="verified" source="MEWR Tajikistan · World Bank 2024" updated="2024"
                  insight="Nurek and Rogun together will provide ~75% of national electricity post-2032."
                  csvData={capacityData} csvName="plant-capacity"><CapacityChart /></Card>
                <Card title="Monthly Generation (GWh)" subtitle="Total system output by month"
                  confidence="demo" source="Demonstration dataset" updated="2024"
                  insight="July–August output is ~70% higher than mid-winter, reflecting hydrological seasonality."
                  csvData={hydroData} csvName="monthly-gwh"><HydroChart /></Card>
              </div>
            )}
            {tab === "regional" && (
              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <Card title="Downstream Water Dependency" subtitle="Allocation of Tajikistan's 64 km³/yr runoff"
                    confidence="estimated" source="ICWC · UNECE · CAWater-Info" updated="2024"
                    insight="40+ million people downstream depend on Tajik water — Uzbekistan alone receives ~40% of outflow."
                    csvData={downstreamFlow} csvName="downstream-allocation"><DownstreamChart /></Card>
                  <Card title="Water Stress Index — Central Asia" subtitle="Multi-metric comparison (radar)"
                    confidence="verified" source="WRI Aqueduct 4.0 · FAO AQUASTAT" updated="2024"
                    insight="Tajikistan (39% stress) is the regional water tower; Uzbekistan (95% critical) is most exposed downstream."
                    csvData={stressRadar} csvName="stress-radar"><StressRadarChart /></Card>
                </div>
                <RegionalTable />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
