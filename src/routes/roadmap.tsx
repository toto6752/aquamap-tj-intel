import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { motion } from "framer-motion";
import {
  Waves, ChartLineUp, Drop, Flask, Snowflake, Warning,
  CloudRain, Brain, MapTrifold, Compass,
} from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — AquaMap TJ" },
      { name: "description", content: "Strategic roadmap for AquaMap TJ — toward a national-grade water intelligence system." },
    ],
  }),
  component: RoadmapPage,
});

type Phase = "now" | "next" | "vision";
interface Item { Icon: typeof Waves; title: string; desc: string; phase: Phase; }

const items: Item[] = [
  { Icon: Waves, title: "Real-time hydrological stations", desc: "Live telemetry from gauged sites across the Vakhsh, Panj, Kofarnihon and Zarafshan basins.", phase: "next" },
  { Icon: ChartLineUp, title: "River discharge monitoring", desc: "Continuous discharge curves integrated into the analytics dashboard.", phase: "next" },
  { Icon: Drop, title: "Reservoir monitoring", desc: "Nurek, Qairokkum and (when commissioned) Rogun reservoir levels & releases.", phase: "next" },
  { Icon: Flask, title: "Water quality monitoring", desc: "Turbidity, nitrate and salinity tracking aligned to the EU WFD framework.", phase: "vision" },
  { Icon: Snowflake, title: "Satellite glacier tracking", desc: "Quarterly area updates using Sentinel-2 and ICESat-2.", phase: "next" },
  { Icon: Warning, title: "Flood early warning systems", desc: "Multi-basin nowcasting tied to telemetered upstream gauges & rainfall radar.", phase: "vision" },
  { Icon: CloudRain, title: "Drought prediction systems", desc: "Seasonal SPI/SPEI forecasts with regional confidence bands.", phase: "vision" },
  { Icon: Brain, title: "AI-powered decision support", desc: "AquaAI extended to scenario planning for reservoirs, irrigation and emergencies.", phase: "now" },
  { Icon: MapTrifold, title: "Governmental GIS layers", desc: "Direct integration of MEWR & CoES vector layers via OGC services.", phase: "vision" },
  { Icon: Compass, title: "Public participation portal", desc: "Citizen-reported water incidents validated by basin authorities.", phase: "vision" },
];

const phaseMeta: Record<Phase, { tKey: string; color: string; bg: string; ring: string }> = {
  now: { tKey: "rd.phase.now", color: "text-success", bg: "bg-success/10", ring: "ring-success/30" },
  next: { tKey: "rd.phase.next", color: "text-info", bg: "bg-info/10", ring: "ring-info/30" },
  vision: { tKey: "rd.phase.vision", color: "text-primary", bg: "bg-primary-soft", ring: "ring-primary/20" },
};

function RoadmapPage() {
  const { t } = useI18n();
  const grouped = (["now", "next", "vision"] as const).map((p) => ({ p, list: items.filter((i) => i.phase === p) }));

  return (
    <AppShell showSidebars={false}>
      <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
        <div className="panel p-6 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 grad-blue opacity-95" />
          <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative text-white max-w-2xl">
            <div className="text-[11px] uppercase tracking-widest font-semibold opacity-80">{t("nav.roadmap")}</div>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">{t("rd.title")}</h1>
            <p className="text-sm opacity-90 mt-2">{t("rd.subtitle")}</p>
          </div>
        </div>

        <div className="space-y-5">
          {grouped.map(({ p, list }) => {
            const meta = phaseMeta[p];
            return (
              <section key={p}>
                <div className="flex items-center gap-2 mb-2.5 px-1">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md ${meta.bg} ${meta.color} text-[11px] font-bold uppercase tracking-wider ring-1 ${meta.ring}`}>
                    {t(meta.tKey)}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{list.length} initiative{list.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {list.map((it, i) => (
                    <motion.div key={it.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      className="panel p-4 flex gap-3">
                      <div className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${meta.bg} ${meta.color}`}>
                        <it.Icon size={20} weight="duotone" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[13.5px] text-foreground leading-snug">{it.title}</div>
                        <div className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{it.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
