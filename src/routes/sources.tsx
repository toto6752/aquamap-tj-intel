import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  CheckCircle,
  Circle,
  CircleHalf,
  ArrowSquareOut,
  CaretDown,
  LockKey,
  ShieldCheck,
  Clock,
  Quotes,
} from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "Data Sources — AquaMap TJ" },
      {
        name: "description",
        content:
          "Public, citable datasets and institutional sources powering AquaMap TJ.",
      },
    ],
  }),
  component: SourcesPage,
});

type Status = "connected" | "partial" | "planned";

interface SrcDetail {
  headline: string;
  reason?: string;
  timeline?: string;
  current?: string;
  impact?: string;
  trigger?: string;
  benefit?: string;
}

interface Src {
  name: string;
  desc: string;
  type: string;
  updated: string;
  freq: string;
  status: Status;
  url: string;
  detail?: SrcDetail;
}

const sources: Src[] = [
  {
    name: "UNEP — Atlas of Environmental Change",
    desc: "Satellite-based assessment of glacier retreat, land cover and water security for Tajikistan.",
    type: "Environmental atlas",
    updated: "June 2, 2025",
    freq: "Quarterly",
    status: "connected",
    url: "https://www.unep.org/",
  },
  {
    name: "FAO AQUASTAT",
    desc: "Global water resources and irrigation statistics, country-level surface and groundwater.",
    type: "Water statistics",
    updated: "May 15, 2025",
    freq: "Annual",
    status: "connected",
    url: "https://www.fao.org/aquastat/en/",
  },
  {
    name: "World Bank — Climate Knowledge Portal",
    desc: "Historical and projected climate indicators for Tajikistan.",
    type: "Climate indicators",
    updated: "June 1, 2025",
    freq: "Annual",
    status: "connected",
    url: "https://climateknowledgeportal.worldbank.org/country/tajikistan",
  },
  {
    name: "World Bank — Open Data",
    desc: "Socio-economic, infrastructure and water access indicators.",
    type: "Socio-economic",
    updated: "June 3, 2025",
    freq: "Weekly",
    status: "connected",
    url: "https://data.worldbank.org/country/TJ",
  },
  {
    name: "Asian Development Bank — Country Programs",
    desc: "Project-level water and energy investment data.",
    type: "Investment",
    updated: "May 10, 2025",
    freq: "Quarterly",
    status: "partial",
    url: "https://www.adb.org/countries/tajikistan/main",
    detail: {
      headline: "API in progress",
      reason: "Awaiting official API credentials",
      timeline: "Expected Q3 2025",
      current: "70% available (manual curation)",
      impact: "Will enable real-time hydropower project tracking",
    },
  },
  {
    name: "UNECE Water Convention",
    desc: "Transboundary water cooperation, basin agreements and reporting.",
    type: "Policy",
    updated: "April 2025",
    freq: "Event-based",
    status: "partial",
    url: "https://unece.org/water",
    detail: {
      headline: "Reporting cycles only",
      reason: "Full basin-level data requires multi-country coordination",
      timeline: "Ongoing",
      current: "Policy documents and agreements available",
      impact: "Will enable transboundary water cooperation tracking",
    },
  },
  {
    name: "NASA EarthData",
    desc: "MODIS, Landsat and ICESat-2 satellite products for glacier, snow and surface water monitoring.",
    type: "Remote sensing",
    updated: "Daily (Real-time)",
    freq: "Real-time",
    status: "partial",
    url: "https://www.earthdata.nasa.gov/",
    detail: {
      headline: "Requires API setup",
      reason: "Real-time satellite data requires technical integration",
      timeline: "Expected July 2025",
      current: "Static Landsat/MODIS products available",
      impact: "Will unlock real-time glacier & snow monitoring",
    },
  },
  {
    name: "ICWC — Interstate Commission for Water Coordination",
    desc: "Central Asian basin allocations for the Amu Darya and Syr Darya.",
    type: "Transboundary allocation",
    updated: "May 2025",
    freq: "Annual",
    status: "partial",
    url: "http://www.icwc-aral.uz/",
    detail: {
      headline: "Static allocations",
      reason: "Real-time telemetry not publicly shared",
      timeline: "Under negotiation",
      current: "Annual allocation tables available",
      impact: "Will unlock real-time basin monitoring",
    },
  },
  {
    name: "Randolph Glacier Inventory 7.0",
    desc: "Standardised global glacier inventory listing 13,542 glaciers in Tajikistan.",
    type: "Glacier inventory",
    updated: "Versioned (2024)",
    freq: "Versioned",
    status: "connected",
    url: "https://www.glims.org/rgi_user_guide/welcome.html",
  },
  {
    name: "JMP — WHO / UNICEF",
    desc: "Joint Monitoring Programme for water, sanitation and hygiene.",
    type: "WASH access",
    updated: "April 2025",
    freq: "Biennial",
    status: "connected",
    url: "https://washdata.org/",
  },
  {
    name: "EM-DAT — UCLouvain",
    desc: "International disaster database with historical hydrometeorological events.",
    type: "Disasters",
    updated: "Daily (Real-time)",
    freq: "Real-time",
    status: "connected",
    url: "https://www.emdat.be/",
  },
  {
    name: "National Water Information System (Tajikistan)",
    desc: "Future government gauging network and water-quality observations.",
    type: "National telemetry",
    updated: "Planned Q3 2025",
    freq: "Real-time (planned)",
    status: "planned",
    url: "",
    detail: {
      headline: "Planned Q3 2025",
      trigger: "Requires partnership with Ministry of Energy & Water",
      benefit: "Real-time gauging stations + water quality data",
      impact: "Will enable live dashboard for water managers",
    },
  },
  {
    name: "Ministry of Energy and Water Resources (MEWR)",
    desc: "National hydropower production, reservoir operations and grid data.",
    type: "Energy",
    updated: "Planned Q4 2025",
    freq: "Monthly (planned)",
    status: "planned",
    url: "",
    detail: {
      headline: "Planned Q4 2025",
      trigger: "Data sharing agreement being finalized",
      benefit: "Real-time hydropower generation + reservoir levels",
      impact: "Will make Analytics tab fully real-time",
    },
  },
  {
    name: "TajNCID",
    desc: "Tajikistan National Center for Innovative Development — domestic glacier & hydrology data infrastructure.",
    type: "Research",
    updated: "May 2025",
    freq: "Periodic",
    status: "partial",
    url: "",
    detail: {
      headline: "Research data",
      reason: "Institutional data sharing framework in development",
      timeline: "Expected Q4 2025",
      current: "Periodic research publications and datasets",
      impact: "Will integrate domestic hydrology research",
    },
  },
  {
    name: "Dushanbe Water Process",
    desc: "UN-recognised flagship water diplomacy initiative hosted by Tajikistan.",
    type: "Diplomatic",
    updated: "Ongoing",
    freq: "Event-based",
    status: "connected",
    url: "https://dushanbewaterprocess.org/",
  },
];

const statusMeta: Record<
  Status,
  { Icon: typeof CheckCircle; tKey: string; color: string; bg: string }
> = {
  connected: {
    Icon: CheckCircle,
    tKey: "src.status.connected",
    color: "text-success",
    bg: "bg-success/10",
  },
  partial: {
    Icon: CircleHalf,
    tKey: "src.status.partial",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  planned: {
    Icon: Circle,
    tKey: "src.status.planned",
    color: "text-muted-foreground",
    bg: "bg-secondary",
  },
};

function DetailRow({ detail, t }: { detail: SrcDetail; t: (k: string) => string }) {
  const items: { label: string; value?: string }[] = [
    { label: t("src.detail.reason"), value: detail.reason },
    { label: t("src.detail.timeline"), value: detail.timeline },
    { label: t("src.detail.current"), value: detail.current },
    { label: t("src.detail.impact"), value: detail.impact },
    { label: t("src.detail.trigger"), value: detail.trigger },
    { label: t("src.detail.benefit"), value: detail.benefit },
  ].filter((i) => i.value);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg bg-background/60 p-3 border border-border/60">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            {item.label}
          </div>
          <div className="text-[12px] text-foreground mt-0.5 leading-relaxed">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function SourcesPage() {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const counts = sources.reduce(
    (acc, s) => {
      acc[s.status] = (acc[s.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<Status, number>,
  );

  const toggle = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <AppShell showSidebars={false}>
      <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
        {/* Hero header */}
        <div className="panel p-6 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 grad-blue opacity-95" />
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative text-white max-w-2xl">
            <div className="text-[11px] uppercase tracking-widest font-semibold opacity-80 flex items-center gap-1.5">
              <Database size={12} weight="fill" /> {t("nav.sources")}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">{t("src.title")}</h1>
            <p className="text-sm opacity-90 mt-2">{t("src.subtitle")}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {(["connected", "partial", "planned"] as const).map((s) => {
                const meta = statusMeta[s];
                return (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur text-[12px] font-semibold"
                  >
                    <meta.Icon size={12} weight="fill" /> {t(meta.tKey)} ·{" "}
                    {counts[s] ?? 0}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sources table */}
        <div className="panel p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="text-left py-2 px-3 font-semibold min-w-[220px]">
                  {t("src.col.name")}
                </th>
                <th className="text-left py-2 px-3 font-semibold hidden md:table-cell">
                  {t("src.col.type")}
                </th>
                <th className="text-left py-2 px-3 font-semibold hidden lg:table-cell">
                  {t("src.col.updated")}
                </th>
                <th className="text-left py-2 px-3 font-semibold hidden lg:table-cell">
                  {t("src.col.freq")}
                </th>
                <th className="text-left py-2 px-3 font-semibold">
                  {t("src.col.status")}
                </th>
                <th className="text-left py-2 px-3 font-semibold hidden xl:table-cell">
                  {t("src.col.detail")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s, i) => {
                const meta = statusMeta[s.status];
                const isOpen = expanded.has(s.name);
                return (
                  <>
                    <motion.tr
                      key={s.name}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-border/60 last:border-0 hover:bg-secondary/40 transition cursor-pointer"
                      onClick={() => s.detail && toggle(s.name)}
                    >
                      <td className="py-3 px-3 align-top">
                        <div className="font-semibold text-[13px] text-foreground flex items-center gap-1.5">
                          {s.name}
                          {s.url && (
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ArrowSquareOut size={11} weight="bold" />
                            </a>
                          )}
                          {s.detail && (
                            <CaretDown
                              size={12}
                              weight="bold"
                              className={`text-muted-foreground transition-transform ml-0.5 ${isOpen ? "rotate-180" : ""}`}
                            />
                          )}
                        </div>
                        <div className="text-[11.5px] text-muted-foreground leading-snug mt-0.5">
                          {s.desc}
                        </div>
                        <div className="lg:hidden mt-1 text-[11px] text-muted-foreground flex flex-wrap gap-x-2">
                          <span>{s.type}</span>
                          <span>·</span>
                          <span>{s.updated}</span>
                          <span>·</span>
                          <span>{s.freq}</span>
                          {s.detail && (
                            <>
                              <span>·</span>
                              <span className="text-warning font-medium">
                                {s.detail.headline}
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 align-top text-[12px] text-foreground hidden md:table-cell">
                        {s.type}
                      </td>
                      <td className="py-3 px-3 align-top text-[12px] text-muted-foreground hidden lg:table-cell">
                        {s.updated}
                      </td>
                      <td className="py-3 px-3 align-top text-[12px] text-muted-foreground hidden lg:table-cell">
                        {s.freq}
                      </td>
                      <td className="py-3 px-3 align-top">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${meta.bg} ${meta.color} text-[11px] font-semibold`}
                        >
                          <meta.Icon size={11} weight="fill" /> {t(meta.tKey)}
                        </span>
                      </td>
                      <td className="py-3 px-3 align-top hidden xl:table-cell">
                        {s.detail ? (
                          <span className="text-[11px] font-medium text-warning">
                            {s.detail.headline}
                          </span>
                        ) : (
                          <span className="text-[11px] text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>
                    </motion.tr>
                    <AnimatePresence>
                      {isOpen && s.detail && (
                        <motion.tr
                          key={`${s.name}-detail`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <td colSpan={6} className="px-3 pb-3 pt-0">
                            <div className="rounded-xl bg-secondary/30 border border-border/60 p-4">
                              <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                                {t("src.col.detail")}
                              </div>
                              <DetailRow detail={s.detail} t={t} />
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Data Quality & Certification */}
        <div className="panel p-5 mt-4">
          <h2 className="text-lg font-bold text-foreground mb-1">
            {t("src.quality.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 rounded-lg bg-success/10 text-success">
                <LockKey size={18} weight="fill" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {t("src.quality.public")}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 rounded-lg bg-primary/10 text-primary">
                <ShieldCheck size={18} weight="fill" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {t("src.quality.verified")}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 rounded-lg bg-info/10 text-info">
                <Clock size={18} weight="fill" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {t("src.quality.timezone")}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 rounded-lg bg-accent/40 text-accent-foreground">
                <Quotes size={18} weight="fill" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {t("src.quality.citation")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
