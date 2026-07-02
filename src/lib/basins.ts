import type { BasinKey } from "@/components/layout/LayerContext";

export interface BasinDef {
  key: BasinKey;
  color: string;
  volumeKm3: number;
  sharePct: number;
  polygon: [number, number][];
  labelAt: [number, number];
}

// Approximate polygons matching Tajikistan hydrographic basins.
// MVP-grade — swap in official shapefile for production.
export const basins: BasinDef[] = [
  {
    key: "syr",
    color: "#22a06b",
    volumeKm3: 13,
    sharePct: 20.3,
    polygon: [
      [40.15, 69.30], [40.55, 69.25], [40.95, 69.80],
      [41.05, 70.60], [40.75, 71.30], [40.30, 71.10],
      [40.05, 70.40], [40.05, 69.75],
    ],
    labelAt: [40.55, 70.20],
  },
  {
    key: "zeravshan",
    color: "#f59042",
    volumeKm3: 10.5,
    sharePct: 16.4,
    polygon: [
      [39.95, 68.15], [39.90, 69.20], [39.75, 70.40],
      [39.35, 70.75], [39.25, 69.80], [39.30, 68.50],
      [39.55, 68.10],
    ],
    labelAt: [39.65, 69.40],
  },
  {
    key: "amu",
    color: "#2c73c9",
    volumeKm3: 40,
    sharePct: 62.5,
    polygon: [
      [39.25, 68.10], [39.20, 69.80], [39.30, 70.75],
      [39.35, 72.20], [38.90, 72.90], [38.10, 72.60],
      [37.30, 72.00], [36.95, 71.10], [37.10, 69.80],
      [37.85, 68.55], [38.55, 68.05],
    ],
    labelAt: [38.20, 70.40],
  },
  {
    key: "other",
    color: "#8a94a6",
    volumeKm3: 0.5,
    sharePct: 0.8,
    polygon: [
      [39.35, 72.30], [39.55, 73.30], [39.30, 74.90],
      [38.20, 75.05], [37.35, 74.40], [37.55, 73.30],
      [38.30, 72.75], [38.90, 72.95],
    ],
    labelAt: [38.50, 73.80],
  },
];