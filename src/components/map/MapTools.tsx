import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, Funnel, DownloadSimple, Share, Image as ImageIcon, FileCode,
  CaretDown, Check, Bookmark,
} from "@phosphor-icons/react";
import { useLayers, PresetView, defaultQuery } from "../layout/LayerContext";
import { toPng } from "html-to-image";
import {
  regions, rivers, glaciers, hydropower, riskZones, reservoirs, populationCenters,
} from "@/lib/mock-data";
import { toast } from "sonner";

const presets: { id: PresetView; label: string; desc: string }[] = [
  { id: "water-scarcity", label: "Water Scarcity Assessment", desc: "Access, rivers, reservoirs, agriculture" },
  { id: "glacier-risk", label: "Glacier Risk Zones", desc: "Glaciers, risk overlays, protected areas" },
  { id: "hydropower", label: "Hydropower Potential", desc: "Dams, rivers, reservoirs, population" },
  { id: "climate-hotspots", label: "Climate Hotspots", desc: "Glaciers, risk, water access, protected" },
  { id: "transboundary", label: "Transboundary Impact", desc: "Cross-border systems & infrastructure" },
];

function buildGeoJSON() {
  const features: GeoJSON.Feature[] = [];
  regions.forEach((r) => features.push({
    type: "Feature",
    properties: { name: r.name, capital: r.capital, access: r.access, risk: r.risk, population: r.population, kind: "region" },
    geometry: { type: "Polygon", coordinates: [r.polygon.map(([lat, lng]) => [lng, lat])] },
  }));
  rivers.forEach((rv) => features.push({
    type: "Feature",
    properties: { name: rv.name, kind: "river" },
    geometry: { type: "LineString", coordinates: rv.path.map(([lat, lng]) => [lng, lat]) },
  }));
  [...glaciers, ...hydropower, ...reservoirs, ...populationCenters, ...riskZones].forEach((p) => {
    const [lat, lng] = (p as { coords: [number, number] }).coords;
    features.push({
      type: "Feature",
      properties: { ...p, coords: undefined },
      geometry: { type: "Point", coordinates: [lng, lat] },
    });
  });
  return { type: "FeatureCollection" as const, features };
}

function downloadBlob(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export function MapTools() {
  const { layers, basemap, opacity, preset, applyPreset, query, setQuery } = useLayers();
  const [open, setOpen] = useState<"views" | "query" | "export" | null>(null);
  const [savedViews, setSavedViews] = useState<{ name: string; q: typeof defaultQuery }[]>([]);

  const screenshot = async () => {
    const node = document.querySelector(".leaflet-container") as HTMLElement | null;
    if (!node) return;
    try {
      const dataUrl = await toPng(node, { backgroundColor: "#eaf2fb", pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a");
      a.href = dataUrl; a.download = `aquamap-${Date.now()}.png`; a.click();
      toast.success("Screenshot saved");
    } catch (e) {
      console.error(e);
      toast.error("Some tiles blocked screenshot — try after a moment");
    }
  };

  const exportGeoJSON = () => {
    const gj = buildGeoJSON();
    downloadBlob(JSON.stringify(gj, null, 2), "aquamap-tj.geojson", "application/geo+json");
    toast.success("GeoJSON exported");
  };

  const shareView = async () => {
    const state = { layers, basemap, opacity, preset, query };
    const hash = `#v=${encodeURIComponent(btoa(JSON.stringify(state)))}`;
    const url = `${window.location.origin}${window.location.pathname}${hash}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Shareable link copied", { description: "Anyone with this URL opens your exact map view." });
    } catch {
      toast(url);
    }
  };

  const saveQueryAsView = () => {
    const name = prompt("Save query as…", "My Priority Districts");
    if (!name) return;
    setSavedViews((s) => [...s, { name, q: { ...query } }]);
    toast.success(`Saved view: ${name}`);
  };

  return (
    <div className="panel p-1 flex gap-1 bg-card/95 backdrop-blur-md text-[12px]">
      {/* Views */}
      <ToolButton label="Views" Icon={Eye} active={open === "views"} onClick={() => setOpen(open === "views" ? null : "views")} />
      {/* Query */}
      <ToolButton label="Query" Icon={Funnel} active={open === "query" || query.active} onClick={() => setOpen(open === "query" ? null : "query")} />
      {/* Export */}
      <ToolButton label="Export" Icon={DownloadSimple} active={open === "export"} onClick={() => setOpen(open === "export" ? null : "export")} />
      <ToolButton label="Share" Icon={Share} onClick={shareView} />

      <AnimatePresence>
        {open === "views" && (
          <Dropdown onClose={() => setOpen(null)}>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 pb-1.5 font-semibold">Predefined views</div>
            {presets.map((p) => (
              <button
                key={p.id}
                onClick={() => { applyPreset(p.id); setOpen(null); toast.success(`Applied: ${p.label}`); }}
                className="w-full text-left px-2 py-2 rounded-md hover:bg-secondary transition flex items-start gap-2"
              >
                <span className="mt-0.5 w-4 h-4 rounded-full border border-border grid place-items-center shrink-0">
                  {preset === p.id && <Check size={11} weight="bold" className="text-primary" />}
                </span>
                <span>
                  <div className="text-[12.5px] font-semibold text-foreground">{p.label}</div>
                  <div className="text-[11px] text-muted-foreground">{p.desc}</div>
                </span>
              </button>
            ))}
            <button
              onClick={() => { applyPreset("none"); setOpen(null); }}
              className="w-full text-[11px] text-muted-foreground hover:text-foreground py-1.5"
            >Clear preset</button>
          </Dropdown>
        )}

        {open === "query" && (
          <Dropdown onClose={() => setOpen(null)} wide>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 pb-1.5 font-semibold">Show me areas where…</div>
            <QueryRow
              checked={query.accessMaxOn} onCheck={(v) => setQuery({ ...query, accessMaxOn: v })}
              label="Clean Water Access" suffix="%"
              op="<" value={query.accessMax} onValue={(v) => setQuery({ ...query, accessMax: v })}
              min={0} max={100} step={5}
            />
            <QueryRow
              checked={query.glacierRetreatOn} onCheck={(v) => setQuery({ ...query, glacierRetreatOn: v })}
              label="Glacier Retreat" suffix="%/decade"
              op=">" value={query.glacierRetreatMin} onValue={(v) => setQuery({ ...query, glacierRetreatMin: v })}
              min={0} max={20} step={1}
            />
            <QueryRow
              checked={query.popDensityOn} onCheck={(v) => setQuery({ ...query, popDensityOn: v })}
              label="Population Density" suffix="/km²"
              op=">" value={query.popDensityMin} onValue={(v) => setQuery({ ...query, popDensityMin: v })}
              min={0} max={300} step={10}
            />
            <label className="flex items-center gap-2 px-2 py-1.5 text-[12px] text-foreground cursor-pointer">
              <input type="checkbox" checked={query.riskOn} onChange={(e) => setQuery({ ...query, riskOn: e.target.checked })} />
              <span>Climate risk = <b>High</b></span>
            </label>

            <div className="flex gap-2 pt-2 px-1">
              <button
                onClick={() => setQuery({ ...query, active: true })}
                className="flex-1 px-3 py-2 rounded-md grad-blue text-white font-semibold text-[12px] shadow-sm hover:opacity-90"
              >Apply Query</button>
              <button
                onClick={saveQueryAsView}
                className="px-3 py-2 rounded-md border border-border text-[12px] font-semibold text-foreground hover:bg-secondary inline-flex items-center gap-1.5"
              ><Bookmark size={13} /> Save</button>
              <button
                onClick={() => setQuery({ ...defaultQuery })}
                className="px-3 py-2 rounded-md text-[12px] font-medium text-muted-foreground hover:text-foreground"
              >Reset</button>
            </div>
            {savedViews.length > 0 && (
              <div className="border-t border-border mt-2 pt-2">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground px-2 pb-1 font-semibold">Saved views</div>
                {savedViews.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setQuery({ ...s.q, active: true }); setOpen(null); }}
                    className="w-full text-left px-2 py-1.5 rounded-md hover:bg-secondary text-[12px] text-foreground"
                  >📌 {s.name}</button>
                ))}
              </div>
            )}
          </Dropdown>
        )}

        {open === "export" && (
          <Dropdown onClose={() => setOpen(null)}>
            <button onClick={() => { screenshot(); setOpen(null); }} className="exportRow">
              <ImageIcon size={14} /> Screenshot (PNG)
            </button>
            <button onClick={() => { exportGeoJSON(); setOpen(null); }} className="exportRow">
              <FileCode size={14} /> Export as GeoJSON
            </button>
            <button onClick={() => toast("GeoTIFF export coming Q4 2025", { description: "Raster export will use a backend pipeline." })} className="exportRow opacity-70">
              <DownloadSimple size={14} /> Export as GeoTIFF · roadmap
            </button>
            <button onClick={() => toast("Shapefile export coming Q4 2025", { description: "Vector export will be available with the data pipeline." })} className="exportRow opacity-70">
              <DownloadSimple size={14} /> Export as Shapefile · roadmap
            </button>
            <style>{`.exportRow{width:100%;display:flex;align-items:center;gap:8px;padding:8px 8px;border-radius:6px;font-size:12.5px;color:hsl(var(--foreground));} .exportRow:hover{background:hsl(var(--secondary));}`}</style>
          </Dropdown>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToolButton({ label, Icon, onClick, active }: { label: string; Icon: typeof Eye; onClick: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] font-semibold transition ${
        active ? "grad-blue text-white shadow-sm" : "text-foreground hover:bg-secondary"
      }`}
    >
      <Icon size={13} weight={active ? "fill" : "regular"} />
      {label}
      <CaretDown size={10} weight="bold" className="opacity-60" />
    </button>
  );
}

function Dropdown({ children, onClose, wide }: { children: React.ReactNode; onClose: () => void; wide?: boolean }) {
  return (
    <>
      <div className="fixed inset-0 z-[500]" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
        className={`absolute left-0 top-[calc(100%+6px)] panel p-2 bg-card shadow-xl z-[600] ${wide ? "w-[320px]" : "w-[260px]"}`}
      >
        {children}
      </motion.div>
    </>
  );
}

function QueryRow({
  checked, onCheck, label, op, value, onValue, min, max, step, suffix,
}: {
  checked: boolean; onCheck: (v: boolean) => void;
  label: string; op: "<" | ">"; value: number; onValue: (v: number) => void;
  min: number; max: number; step: number; suffix: string;
}) {
  return (
    <div className="px-2 py-1.5 rounded-md hover:bg-secondary/50 transition">
      <label className="flex items-center gap-2 text-[12px] text-foreground cursor-pointer">
        <input type="checkbox" checked={checked} onChange={(e) => onCheck(e.target.checked)} />
        <span className="flex-1">{label} <span className="font-bold">{op}</span> <span className="font-semibold tabular-nums">{value}{suffix}</span></span>
      </label>
      {checked && (
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onValue(Number(e.target.value))}
          className="w-full accent-primary mt-1"
        />
      )}
    </div>
  );
}