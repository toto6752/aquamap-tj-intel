import { X } from "@phosphor-icons/react";
import { basins } from "@/lib/basins";
import { useLayers } from "../layout/LayerContext";
import { useI18n } from "@/lib/i18n";

export function BasinPanel() {
  const { selectedBasin, setSelectedBasin } = useLayers();
  const { t } = useI18n();
  if (!selectedBasin) return null;
  const b = basins.find((x) => x.key === selectedBasin);
  if (!b) return null;
  return (
    <div className="absolute top-3 right-3 z-[500] w-[300px] panel p-4 bg-card/98 backdrop-blur-md animate-in fade-in slide-in-from-right-4 duration-200">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-[11px] font-bold tracking-wider" style={{ color: b.color }}>
            {t("basin.panelTitle")}
          </div>
          <div className="text-[16px] font-semibold text-foreground">{t("basin." + b.key)}</div>
        </div>
        <button
          onClick={() => setSelectedBasin(null)}
          className="p-1 rounded-md hover:bg-secondary text-muted-foreground"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-lg bg-secondary/50 p-2">
          <div className="text-[10px] text-muted-foreground">{t("basin.annualVolume")}</div>
          <div className="text-[15px] font-bold text-foreground">{b.volumeKm3} km³/yr</div>
        </div>
        <div className="rounded-lg bg-secondary/50 p-2">
          <div className="text-[10px] text-muted-foreground">{t("basin.share")}</div>
          <div className="text-[15px] font-bold text-foreground">{b.sharePct}%</div>
        </div>
      </div>
      <div className="text-[11px] font-bold tracking-wider text-muted-foreground mt-2 mb-1">
        {t("basin.tributaries")}
      </div>
      <div className="text-[12px] text-foreground mb-3">{t(`basin.${b.key}.tributaries`)}</div>
      <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-1">
        {t("basin.downstream")}
      </div>
      <div className="text-[12px] text-foreground mb-3">{t(`basin.${b.key}.downstream`)}</div>
      <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-1">
        {t("basin.challenges")}
      </div>
      <div className="text-[12px] text-foreground leading-relaxed">{t(`basin.${b.key}.challenges`)}</div>
    </div>
  );
}