import { Sun, Mountains, GlobeHemisphereEast } from "@phosphor-icons/react";
import { useLayers } from "../layout/LayerContext";
import { useI18n } from "@/lib/i18n";

export function BasemapSwitcher() {
  const { basemap, setBasemap } = useLayers();
  const { t } = useI18n();
  const opts = [
    { id: "light" as const, label: t("basemap.light"), Icon: Sun },
    { id: "terrain" as const, label: t("basemap.terrain"), Icon: Mountains },
    { id: "satellite" as const, label: t("basemap.satellite"), Icon: GlobeHemisphereEast },
  ];
  return (
    <div className="panel flex p-1 gap-0.5 bg-card/95 backdrop-blur-md">
      {opts.map((o) => {
        const active = basemap === o.id;
        return (
          <button
            key={o.id}
            onClick={() => setBasemap(o.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-medium transition ${
              active ? "grad-blue text-white shadow-sm" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            <o.Icon size={13} weight={active ? "fill" : "regular"} />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
