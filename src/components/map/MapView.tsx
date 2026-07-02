import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLayers, LayerKey } from "../layout/LayerContext";
import { useI18n } from "@/lib/i18n";
import { basins } from "@/lib/basins";
import {
  regions, rivers, glaciers, hydropower, riskZones, reservoirs,
  populationCenters, agriculturalZones, protectedAreas,
} from "@/lib/mock-data";

const basemaps: Record<string, string | string[]> = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  terrain: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  hybrid: [
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
  ],
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};

const riskColor = { high: "#e85d5d", moderate: "#f3a847", low: "#54b97a" };

export function MapView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileRef = useRef<L.TileLayer[]>([]);
  const layerGroupsRef = useRef<Record<string, L.LayerGroup>>({});
  const queryGroupRef = useRef<L.LayerGroup | null>(null);
  const basinsGroupRef = useRef<L.LayerGroup | null>(null);
  const { layers, basemap, opacity, query, highlightLayer, viewMode, setSelectedBasin } = useLayers();
  const { t, lang } = useI18n();

  const addTiles = (map: L.Map, key: string) => {
    tileRef.current.forEach((tl) => map.removeLayer(tl));
    tileRef.current = [];
    const urls = basemaps[key] ?? basemaps.light;
    const arr = Array.isArray(urls) ? urls : [urls];
    arr.forEach((u) => {
      const tl = L.tileLayer(u, { maxZoom: 18, attribution: "© OpenStreetMap · Esri · CartoDB" }).addTo(map);
      tileRef.current.push(tl);
    });
  };

  // Rebuild popups when language changes
  useEffect(() => {
    if (!ref.current) return;
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
    const map = L.map(ref.current, {
      center: [38.86, 71.27], zoom: 7, zoomControl: false, attributionControl: true,
    });
    L.control.zoom({ position: "topright" }).addTo(map);
    addTiles(map, basemap);
    mapRef.current = map;
    (window as unknown as { __aquaMap?: L.Map }).__aquaMap = map;

    const groups: Record<string, L.LayerGroup> = {
      regions: L.layerGroup().addTo(map),
      rivers: L.layerGroup().addTo(map),
      glaciers: L.layerGroup().addTo(map),
      water: L.layerGroup().addTo(map),
      risk: L.layerGroup().addTo(map),
      hydro: L.layerGroup().addTo(map),
      reservoirs: L.layerGroup().addTo(map),
      population: L.layerGroup().addTo(map),
      agriculture: L.layerGroup().addTo(map),
      protected: L.layerGroup().addTo(map),
    };
    layerGroupsRef.current = groups;
    queryGroupRef.current = L.layerGroup().addTo(map);
    basinsGroupRef.current = L.layerGroup();

    regions.forEach((r) => {
      const poly = L.polygon(r.polygon, {
        color: riskColor[r.risk], weight: 1.5,
        fillColor: riskColor[r.risk], fillOpacity: 0.18,
      })
        .bindPopup(
          `<div style="font-family:inherit;min-width:180px">
            <div style="font-weight:600;font-size:13px">${r.name}</div>
            <div style="font-size:11px;color:#6b7a90">${t("map.capital")}: ${r.capital}</div>
            <div style="margin-top:6px;font-size:12px">${t("map.waterAccess")}: <b>${r.access}%</b></div>
            <div style="font-size:12px">${t("map.population")}: <b>${r.population}</b></div>
          </div>`
        )
        .on("mouseover", (e) => e.target.setStyle({ fillOpacity: 0.32 }))
        .on("mouseout", (e) => e.target.setStyle({ fillOpacity: 0.18 }));
      groups.regions.addLayer(poly);
    });

    rivers.forEach((rv) => {
      L.polyline(rv.path, { color: "#3a82c4", weight: 3, opacity: 0.85 })
        .bindTooltip(rv.name, { sticky: true })
        .addTo(groups.rivers);
    });

    glaciers.forEach((g) => {
      L.circleMarker(g.coords, {
        radius: 7 + Math.min(8, g.areaKm2 / 100),
        color: "#7fb8d8", fillColor: "#cfe6f3", fillOpacity: 0.85, weight: 2,
      })
        .bindPopup(`<b>${g.name}</b><br/>${t("map.area")}: ${g.areaKm2} km²`)
        .addTo(groups.glaciers);
    });

    hydropower.forEach((h) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="width:26px;height:26px;border-radius:8px;background:linear-gradient(135deg,#7c5cff,#5a8bff);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(92,76,255,0.35);color:white;font-size:14px;font-weight:700">⚡</div>`,
        iconSize: [26, 26], iconAnchor: [13, 13],
      });
      L.marker(h.coords, { icon }).bindPopup(`<b>${h.name}</b><br/>${t("map.capacity")}: ${h.capacity}`).addTo(groups.hydro);
    });

    riskZones.forEach((rz) => {
      L.circle(rz.coords, {
        radius: 25000, color: "#e85d5d", fillColor: "#e85d5d",
        fillOpacity: 0.18, weight: 1.5, dashArray: "4 4",
      })
        .bindPopup(`<b>${rz.name}</b><br/>${t("map.type")}: ${rz.type}`)
        .addTo(groups.risk);
    });

    reservoirs.forEach((r) => {
      L.circleMarker(r.coords, {
        radius: 8, color: "#3a82c4", fillColor: "#7fb8d8", fillOpacity: 0.9, weight: 2,
      }).bindPopup(`<b>${r.name}</b>`).addTo(groups.reservoirs);
    });

    populationCenters.forEach((p) => {
      const icon = L.divIcon({
        className: "",
        html: `<div style="display:flex;flex-direction:column;align-items:center"><div style="width:10px;height:10px;border-radius:99px;background:#f3a847;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.2)"></div><div style="margin-top:2px;background:white;padding:1px 6px;border-radius:6px;font-size:10px;font-weight:600;color:#3b4a63;box-shadow:0 1px 3px rgba(0,0,0,0.1);white-space:nowrap">${p.name}</div></div>`,
        iconSize: [60, 30], iconAnchor: [30, 5],
      });
      L.marker(p.coords, { icon }).addTo(groups.population);
    });

    agriculturalZones.forEach((coords) => {
      L.polygon(coords, { color: "#54b97a", fillColor: "#a7e0bd", fillOpacity: 0.3, weight: 1, dashArray: "3 3" })
        .addTo(groups.agriculture);
    });

    protectedAreas.forEach((coords) => {
      L.polygon(coords, { color: "#3a7f5a", fillColor: "#9ec9b0", fillOpacity: 0.22, weight: 1.2 })
        .bindTooltip(t("map.parkName"), { sticky: true })
        .addTo(groups.protected);
    });

    regions.forEach((r) => {
      L.circleMarker(
        [r.polygon[0][0] + 0.1, r.polygon[0][1] + 0.1],
        { radius: 6, color: "#4a8cd6", fillColor: "#cfe6f3", fillOpacity: 0.7, weight: 2 }
      )
        .bindTooltip(`${t("map.waterAccess")}: ${r.access}%`, { sticky: true })
        .addTo(groups.water);
    });

    // Apply current visibility
    (Object.keys(layers) as (keyof typeof layers)[]).forEach((k) => {
      const g = groups[k];
      if (!g) return;
      if (!layers[k] && map.hasLayer(g)) map.removeLayer(g);
    });

    return () => { map.remove(); mapRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Sync view mode (districts vs basins)
  useEffect(() => {
    const map = mapRef.current;
    const groups = layerGroupsRef.current;
    const bg = basinsGroupRef.current;
    if (!map || !bg) return;
    bg.clearLayers();
    if (viewMode === "basins") {
      if (groups.regions && map.hasLayer(groups.regions)) map.removeLayer(groups.regions);
      basins.forEach((b) => {
        const poly = L.polygon(b.polygon, {
          color: b.color, weight: 2, fillColor: b.color, fillOpacity: 0.25,
        })
          .on("click", () => setSelectedBasin(b.key))
          .on("mouseover", (e) => e.target.setStyle({ fillOpacity: 0.4 }))
          .on("mouseout", (e) => e.target.setStyle({ fillOpacity: 0.25 }));
        bg.addLayer(poly);
        const label = L.marker(b.labelAt, {
          interactive: false,
          icon: L.divIcon({
            className: "",
            html: `<div style="background:rgba(255,255,255,0.9);padding:2px 8px;border-radius:6px;font-size:11px;font-weight:700;color:${b.color};border:1px solid ${b.color};box-shadow:0 2px 6px rgba(0,0,0,0.1);white-space:nowrap">${t("basin." + b.key)}</div>`,
            iconSize: [1, 1], iconAnchor: [0, 0],
          }),
        });
        bg.addLayer(label);
      });
      if (!map.hasLayer(bg)) bg.addTo(map);
    } else {
      if (map.hasLayer(bg)) map.removeLayer(bg);
      if (groups.regions && !map.hasLayer(groups.regions)) groups.regions.addTo(map);
    }
  }, [viewMode, lang, setSelectedBasin, t]);

  // Sync basemap
  useEffect(() => {
    if (!mapRef.current) return;
    addTiles(mapRef.current, basemap);
  }, [basemap]);

  // Sync layer visibility
  useEffect(() => {
    const map = mapRef.current;
    const groups = layerGroupsRef.current;
    if (!map) return;
    (Object.keys(layers) as (keyof typeof layers)[]).forEach((k) => {
      const g = groups[k];
      if (!g) return;
      if (layers[k]) { if (!map.hasLayer(g)) g.addTo(map); }
      else { if (map.hasLayer(g)) map.removeLayer(g); }
    });
  }, [layers]);

  // Sync per-layer opacity
  useEffect(() => {
    const groups = layerGroupsRef.current;
    (Object.keys(opacity) as LayerKey[]).forEach((k) => {
      const g = groups[k];
      if (!g) return;
      const o = (opacity[k] ?? 100) / 100;
      g.eachLayer((layer) => {
        const anyL = layer as unknown as { setOpacity?: (n: number) => void; setStyle?: (s: object) => void };
        if (typeof anyL.setOpacity === "function") anyL.setOpacity(o);
        if (typeof anyL.setStyle === "function") anyL.setStyle({ opacity: o, fillOpacity: o * 0.35 });
      });
    });
  }, [opacity]);

  // Legend hover highlight
  useEffect(() => {
    const groups = layerGroupsRef.current;
    Object.entries(groups).forEach(([k, g]) => {
      g.eachLayer((layer) => {
        const anyL = layer as unknown as { setStyle?: (s: object) => void };
        if (typeof anyL.setStyle !== "function") return;
        if (!highlightLayer) anyL.setStyle({ weight: 1.5 });
        else if (k === highlightLayer) anyL.setStyle({ weight: 4 });
        else anyL.setStyle({ weight: 1 });
      });
    });
  }, [highlightLayer]);

  // Spatial query highlights
  useEffect(() => {
    const qg = queryGroupRef.current;
    if (!qg) return;
    qg.clearLayers();
    if (!query.active) return;
    regions.forEach((r) => {
      const glacierRetreat = r.name.includes("Badakhshan") ? 8 : r.name.includes("Khatlon") ? 3 : 4;
      const popDensity = r.name.includes("Sughd") ? 90 : r.name.includes("Khatlon") ? 130 : r.name.includes("Badakhshan") ? 4 : 60;
      const okAccess = !query.accessMaxOn || r.access < query.accessMax;
      const okGlacier = !query.glacierRetreatOn || glacierRetreat > query.glacierRetreatMin;
      const okPop = !query.popDensityOn || popDensity > query.popDensityMin;
      const okRisk = !query.riskOn || r.risk === "high";
      if (okAccess && okGlacier && okPop && okRisk) {
        L.polygon(r.polygon, {
          color: "#7c5cff", weight: 3, dashArray: "6 4",
          fillColor: "#7c5cff", fillOpacity: 0.22,
        }).bindTooltip(`✓ Matches query · ${r.name}`, { sticky: true }).addTo(qg);
      }
    });
  }, [query]);

  return <div ref={ref} className="absolute inset-0" />;
}
