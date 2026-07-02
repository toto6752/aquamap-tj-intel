import { useLayers } from "../layout/LayerContext";
import { useI18n } from "@/lib/i18n";

export function BasinSwitcher() {
  const { viewMode, setViewMode } = useLayers();
  const { t } = useI18n();
  const opts: { id: "districts" | "basins"; label: string }[] = [
    { id: "districts", label: t("view.districts") },
    { id: "basins", label: t("view.basins") },
  ];
  return (
    <div className="panel flex p-1 gap-0.5 bg-card/95 backdrop-blur-md">
      {opts.map((o) => {
        const active = viewMode === o.id;
        return (
          <button
            key={o.id}
            onClick={() => setViewMode(o.id)}
            className={`px-2.5 py-1.5 rounded-md text-[12px] font-medium transition ${
              active ? "grad-blue text-white shadow-sm" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}