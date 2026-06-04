import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { motion } from "framer-motion";
import { Database, CheckCircle, Circle, CircleHalf, ArrowSquareOut } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "Data Sources — AquaMap TJ" },
      { name: "description", content: "Public, citable datasets and institutional sources powering AquaMap TJ." },
    ],
  }),
  component: SourcesPage,
});

type Status = "connected" | "partial" | "planned";

interface Src {
  name: string;
  desc: string;
  type: string;
  freq: string;
  status: Status;
  url: string;
}

const sources: Src[] = [
  { name: "UNEP — Atlas of Environmental Change", desc: "Satellite-based assessment of glacier retreat, land cover and water security for Tajikistan.", type: "Environmental atlas", freq: "Annual", status: "connected", url: "https://www.unep.org/" },
  { name: "FAO AQUASTAT", desc: "Global water resources and irrigation statistics, country-level surface and groundwater.", type: "Water statistics", freq: "Periodic", status: "connected", url: "https://www.fao.org/aquastat/en/" },
  { name: "World Bank — Climate Knowledge Portal", desc: "Historical and projected climate indicators for Tajikistan.", type: "Climate indicators", freq: "Annual", status: "connected", url: "https://climateknowledgeportal.worldbank.org/country/tajikistan" },
  { name: "World Bank — Open Data", desc: "Socio-economic, infrastructure and water access indicators.", type: "Socio-economic", freq: "Annual", status: "connected", url: "https://data.worldbank.org/country/TJ" },
  { name: "Asian Development Bank — Country Programs", desc: "Project-level water and energy investment data.", type: "Investment", freq: "Quarterly", status: "partial", url: "https://www.adb.org/countries/tajikistan/main" },
  { name: "UNECE Water Convention", desc: "Transboundary water cooperation, basin agreements and reporting.", type: "Policy", freq: "Reporting cycles", status: "partial", url: "https://unece.org/water" },
  { name: "NASA EarthData", desc: "MODIS, Landsat and ICESat-2 satellite products for glacier, snow and surface water monitoring.", type: "Remote sensing", freq: "Daily–monthly", status: "partial", url: "https://www.earthdata.nasa.gov/" },
  { name: "ICWC — Interstate Commission for Water Coordination", desc: "Central Asian basin allocations for the Amu Darya and Syr Darya.", type: "Transboundary allocation", freq: "Annual", status: "partial", url: "http://www.icwc-aral.uz/" },
  { name: "Randolph Glacier Inventory 7.0", desc: "Standardised global glacier inventory listing 13,542 glaciers in Tajikistan.", type: "Glacier inventory", freq: "Versioned", status: "connected", url: "https://www.glims.org/rgi_user_guide/welcome.html" },
  { name: "JMP — WHO / UNICEF", desc: "Joint Monitoring Programme for water, sanitation and hygiene.", type: "WASH access", freq: "Biennial", status: "connected", url: "https://washdata.org/" },
  { name: "EM-DAT — UCLouvain", desc: "International disaster database with historical hydrometeorological events.", type: "Disasters", freq: "Continuous", status: "connected", url: "https://www.emdat.be/" },
  { name: "National Water Information System (Tajikistan)", desc: "Future government gauging network and water-quality observations.", type: "National telemetry", freq: "Real-time (planned)", status: "planned", url: "" },
  { name: "Ministry of Energy and Water Resources (MEWR)", desc: "National hydropower production, reservoir operations and grid data.", type: "Energy", freq: "Monthly (planned)", status: "planned", url: "" },
  { name: "TajNCID", desc: "Tajikistan National Center for Innovative Development — domestic glacier & hydrology data infrastructure.", type: "Research", freq: "Periodic", status: "partial", url: "" },
  { name: "Dushanbe Water Process", desc: "UN-recognised flagship water diplomacy initiative hosted by Tajikistan.", type: "Diplomatic", freq: "Event-based", status: "connected", url: "https://dushanbewaterprocess.org/" },
];

const statusMeta: Record<Status, { Icon: typeof CheckCircle; tKey: string; color: string; bg: string }> = {
  connected: { Icon: CheckCircle, tKey: "src.status.connected", color: "text-success", bg: "bg-success/10" },
  partial: { Icon: CircleHalf, tKey: "src.status.partial", color: "text-warning", bg: "bg-warning/10" },
  planned: { Icon: Circle, tKey: "src.status.planned", color: "text-muted-foreground", bg: "bg-secondary" },
};

function SourcesPage() {
  const { t } = useI18n();
  const counts = sources.reduce((acc, s) => { acc[s.status] = (acc[s.status] ?? 0) + 1; return acc; }, {} as Record<Status, number>);

  return (
    <AppShell showSidebars={false}>
      <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
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
                  <span key={s} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur text-[12px] font-semibold">
                    <meta.Icon size={12} weight="fill" /> {t(meta.tKey)} · {counts[s] ?? 0}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="panel p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="text-left py-2 px-3 font-semibold">{t("src.col.name")}</th>
                <th className="text-left py-2 px-3 font-semibold hidden md:table-cell">{t("src.col.type")}</th>
                <th className="text-left py-2 px-3 font-semibold hidden lg:table-cell">{t("src.col.freq")}</th>
                <th className="text-left py-2 px-3 font-semibold">{t("src.col.status")}</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s, i) => {
                const meta = statusMeta[s.status];
                return (
                  <motion.tr key={s.name}
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                    className="border-b border-border/60 last:border-0 hover:bg-secondary/40 transition">
                    <td className="py-3 px-3 align-top">
                      <div className="font-semibold text-[13px] text-foreground flex items-center gap-1.5">
                        {s.name}
                        {s.url && (
                          <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <ArrowSquareOut size={11} weight="bold" />
                          </a>
                        )}
                      </div>
                      <div className="text-[11.5px] text-muted-foreground leading-snug mt-0.5">{s.desc}</div>
                      <div className="md:hidden mt-1 text-[11px] text-muted-foreground">{s.type} · {s.freq}</div>
                    </td>
                    <td className="py-3 px-3 align-top text-[12px] text-foreground hidden md:table-cell">{s.type}</td>
                    <td className="py-3 px-3 align-top text-[12px] text-muted-foreground hidden lg:table-cell">{s.freq}</td>
                    <td className="py-3 px-3 align-top">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${meta.bg} ${meta.color} text-[11px] font-semibold`}>
                        <meta.Icon size={11} weight="fill" /> {t(meta.tKey)}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
