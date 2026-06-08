import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type LayerKey =
  | "rivers"
  | "glaciers"
  | "water"
  | "risk"
  | "hydro"
  | "reservoirs"
  | "population"
  | "agriculture"
  | "protected";

export type LayerState = Record<LayerKey, boolean>;
export type LayerOpacity = Record<LayerKey, number>; // 0..100
export type Basemap = "light" | "terrain" | "satellite" | "hybrid" | "dark";
export type PresetView =
  | "none"
  | "water-scarcity"
  | "glacier-risk"
  | "hydropower"
  | "climate-hotspots"
  | "transboundary";

export interface SpatialQuery {
  active: boolean;
  accessMaxOn: boolean;
  accessMax: number;        // %
  glacierRetreatOn: boolean;
  glacierRetreatMin: number; // %/decade
  popDensityOn: boolean;
  popDensityMin: number;     // /km²
  riskOn: boolean;
}

export const defaultQuery: SpatialQuery = {
  active: false,
  accessMaxOn: true, accessMax: 60,
  glacierRetreatOn: true, glacierRetreatMin: 5,
  popDensityOn: false, popDensityMin: 50,
  riskOn: false,
};

const defaults: LayerState = {
  rivers: true,
  glaciers: true,
  water: true,
  risk: true,
  hydro: true,
  reservoirs: false,
  population: true,
  agriculture: false,
  protected: true,
};

const defaultOpacity: LayerOpacity = {
  rivers: 90, glaciers: 90, water: 80, risk: 70, hydro: 95,
  reservoirs: 90, population: 100, agriculture: 70, protected: 80,
};

interface Ctx {
  layers: LayerState;
  toggle: (k: LayerKey) => void;
  setAll: (v: boolean) => void;
  basemap: Basemap;
  setBasemap: (b: Basemap) => void;
  opacity: LayerOpacity;
  setOpacity: (k: LayerKey, v: number) => void;
  preset: PresetView;
  applyPreset: (p: PresetView) => void;
  query: SpatialQuery;
  setQuery: (q: SpatialQuery) => void;
  highlightLayer: string | null;
  setHighlightLayer: (s: string | null) => void;
}

const LayerContext = createContext<Ctx | null>(null);

const presetMap: Record<Exclude<PresetView, "none">, Partial<LayerState>> = {
  "water-scarcity":    { rivers: true,  glaciers: false, water: true,  risk: true,  hydro: false, reservoirs: true,  population: true,  agriculture: true,  protected: false },
  "glacier-risk":      { rivers: true,  glaciers: true,  water: false, risk: true,  hydro: false, reservoirs: false, population: false, agriculture: false, protected: true  },
  "hydropower":        { rivers: true,  glaciers: false, water: false, risk: false, hydro: true,  reservoirs: true,  population: true,  agriculture: false, protected: false },
  "climate-hotspots":  { rivers: false, glaciers: true,  water: true,  risk: true,  hydro: false, reservoirs: false, population: true,  agriculture: false, protected: true  },
  "transboundary":     { rivers: true,  glaciers: true,  water: true,  risk: false, hydro: true,  reservoirs: true,  population: true,  agriculture: true,  protected: false },
};

export function LayerProvider({ children }: { children: ReactNode }) {
  // Hydrate from URL hash if present (#v=...)
  const initial = (() => {
    if (typeof window === "undefined") return null;
    try {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash.startsWith("v=")) return null;
      const json = atob(decodeURIComponent(hash.slice(2)));
      return JSON.parse(json);
    } catch { return null; }
  })();

  const [layers, setLayers] = useState<LayerState>(initial?.layers ?? defaults);
  const [basemap, setBasemap] = useState<Basemap>(initial?.basemap ?? "light");
  const [opacity, setOpacityState] = useState<LayerOpacity>(initial?.opacity ?? defaultOpacity);
  const [preset, setPreset] = useState<PresetView>(initial?.preset ?? "none");
  const [query, setQueryState] = useState<SpatialQuery>(initial?.query ?? defaultQuery);
  const [highlightLayer, setHighlightLayer] = useState<string | null>(null);

  const applyPreset = (p: PresetView) => {
    setPreset(p);
    if (p === "none") return;
    setLayers((prev) => ({ ...prev, ...presetMap[p] }));
  };

  // expose state on window for share helpers (read-only snapshot)
  useEffect(() => {
    if (typeof window === "undefined") return;
    (window as unknown as { __aqua?: unknown }).__aqua = { layers, basemap, opacity, preset, query };
  }, [layers, basemap, opacity, preset, query]);

  return (
    <LayerContext.Provider
      value={{
        layers,
        toggle: (k) => setLayers((p) => ({ ...p, [k]: !p[k] })),
        setAll: (v) =>
          setLayers(Object.fromEntries(Object.keys(defaults).map((k) => [k, v])) as LayerState),
        basemap,
        setBasemap,
        opacity,
        setOpacity: (k, v) => setOpacityState((p) => ({ ...p, [k]: v })),
        preset,
        applyPreset,
        query,
        setQuery: setQueryState,
        highlightLayer,
        setHighlightLayer,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
}

export function useLayers() {
  const ctx = useContext(LayerContext);
  if (!ctx) throw new Error("useLayers must be used within LayerProvider");
  return ctx;
}