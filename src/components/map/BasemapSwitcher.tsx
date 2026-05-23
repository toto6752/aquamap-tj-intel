import { Sun, Mountains, GlobeHemisphereEast } from "@phosphor-icons/react";
import { useLayers } from "../layout/LayerContext";

const opts = [
  { id: "light" as const, label: "Light", Icon: Sun },
  { id: "terrain" as const, label: "Terrain", Icon: Mountains },
  { id: "satellite" as const, label: "Satellite", Icon: GlobeHemisphereEast },
];

export function BasemapSwitcher() {
  const { basemap, setBasemap } = useLayers();
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