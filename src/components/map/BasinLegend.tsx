import { basins } from "@/lib/basins";
import { useI18n } from "@/lib/i18n";

export function BasinLegend() {
  const { t } = useI18n();
  return (
    <div className="panel p-3 w-[220px] backdrop-blur-md bg-card/95">
      <div className="text-[10px] font-bold tracking-wider text-muted-foreground mb-2">
        {t("basin.legendTitle")}
      </div>
      <div className="space-y-1.5">
        {basins.map((b) => (
          <div key={b.key} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm border" style={{ background: b.color, opacity: 0.55, borderColor: b.color }} />
            <span className="text-[12px] text-foreground flex-1">{t("basin." + b.key)}</span>
            <span className="text-[10px] text-muted-foreground">{b.sharePct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}