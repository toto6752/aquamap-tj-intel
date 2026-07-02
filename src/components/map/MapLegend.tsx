import { Snowflake, Lightning, Waves, Drop, X } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";
import { useLayers } from "../layout/LayerContext";

export function MapLegend() {
  const { t } = useI18n();
  const { layers, setHighlightLayer, legendVisible, setLegendVisible } = useLayers();
  if (!legendVisible) return null;
  const items = [
    { color: "#54b97a", label: t("legend.high") },
    { color: "#f3a847", label: t("legend.mod") },
    { color: "#e85d5d", label: t("legend.low") },
  ];
  const dynamic: { key: string; label: string; Icon: typeof Drop; color: string }[] = [
    { key: "rivers", label: t("legend.rivers"), Icon: Waves, color: "text-river" },
    { key: "glaciers", label: t("legend.glaciers"), Icon: Snowflake, color: "text-glacier" },
    { key: "hydro", label: t("legend.hydro"), Icon: Lightning, color: "text-hydro" },
    { key: "reservoirs", label: t("legend.reservoirs"), Icon: Drop, color: "text-primary" },
  ].filter((d) => (layers as Record<string, boolean>)[d.key]);
  return (
    <div className="panel p-3.5 w-[240px] backdrop-blur-md bg-card/95 relative group animate-in fade-in duration-200">
      <button
        onClick={() => setLegendVisible(false)}
        title={t("legend.hide")}
        aria-label={t("legend.hide")}
        className="absolute top-1.5 right-1.5 p-1 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground opacity-0 group-hover:opacity-100 md:opacity-0 max-md:opacity-40 transition"
      >
        <X size={12} />
      </button>
      <div className="text-[10px] font-bold tracking-wider text-muted-foreground mb-2.5">
        {t("legend.title")}
      </div>
      <div className="space-y-1.5">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm" style={{ background: it.color, opacity: 0.6 }} />
            <span className="text-[12px] text-foreground">{it.label}</span>
          </div>
        ))}
      </div>
      {dynamic.length > 0 && <div className="h-px bg-border my-2.5" />}
      <div className="space-y-1">
        {dynamic.map((d) => (
          <button
            key={d.key}
            onMouseEnter={() => setHighlightLayer(d.key)}
            onMouseLeave={() => setHighlightLayer(null)}
            className="w-full flex items-center gap-2 text-[12px] text-foreground px-1.5 py-1 rounded-md hover:bg-secondary transition"
          >
            <d.Icon size={14} weight="fill" className={d.color} /> {d.label}
          </button>
        ))}
      </div>
      <div className="h-px bg-border my-2.5" />
      <div className="text-[9.5px] text-muted-foreground leading-relaxed">
        Data © UNEP, World Bank, NASA, FAO<br />Tiles © OpenStreetMap · CartoDB · Esri
      </div>
    </div>
  );
}