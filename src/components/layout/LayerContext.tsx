import { createContext, useContext, useState, ReactNode } from "react";

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

interface Ctx {
  layers: LayerState;
  toggle: (k: LayerKey) => void;
  setAll: (v: boolean) => void;
  basemap: "light" | "terrain" | "satellite";
  setBasemap: (b: "light" | "terrain" | "satellite") => void;
}

const LayerContext = createContext<Ctx | null>(null);

export function LayerProvider({ children }: { children: ReactNode }) {
  const [layers, setLayers] = useState<LayerState>(defaults);
  const [basemap, setBasemap] = useState<"light" | "terrain" | "satellite">("light");
  return (
    <LayerContext.Provider
      value={{
        layers,
        toggle: (k) => setLayers((p) => ({ ...p, [k]: !p[k] })),
        setAll: (v) =>
          setLayers(Object.fromEntries(Object.keys(defaults).map((k) => [k, v])) as LayerState),
        basemap,
        setBasemap,
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