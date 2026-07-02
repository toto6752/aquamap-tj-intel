import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { MapClient } from "@/components/map/MapClient";
import { MapLegend } from "@/components/map/MapLegend";
import { BasemapSwitcher } from "@/components/map/BasemapSwitcher";
import { MapTools } from "@/components/map/MapTools";
import { WaterTypesLegend } from "@/components/map/WaterTypesLegend";
import { BasinSwitcher } from "@/components/map/BasinSwitcher";
import { BasinLegend } from "@/components/map/BasinLegend";
import { BasinPanel } from "@/components/map/BasinPanel";
import { RestoreLegendButton } from "@/components/map/RestoreLegendButton";
import { useLayers } from "@/components/layout/LayerContext";
import { StatsCards } from "@/components/stats/StatsCards";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AquaMap TJ — Water Intelligence · Tajikistan" },
      { name: "description", content: "Interactive environmental intelligence platform for water resources, glaciers, hydropower and climate risks in Tajikistan." },
      { property: "og:title", content: "AquaMap TJ — Water Intelligence · Tajikistan" },
      { property: "og:description", content: "Interactive environmental intelligence platform for Tajikistan." },
    ],
  }),
  component: Index,
});

// Reads viewMode from context. Must be rendered INSIDE <AppShell>, since
// LayerProvider lives inside AppShell — calling useLayers() any higher up
// the tree (e.g. directly in Index(), above <AppShell>) throws
// "useLayers must be used within LayerProvider" during SSR and crashes the page.
function ActiveLegend() {
  const { viewMode } = useLayers();
  return viewMode === "basins" ? <BasinLegend /> : <MapLegend />;
}

function Index() {
  return (
    <AppShell>
      <div className="flex-1 flex flex-col gap-3 min-h-0">
        <div className="relative flex-1 min-h-[420px] rounded-2xl overflow-hidden panel">
          <MapClient />
          <div className="absolute top-3 left-3 z-[400] flex flex-col gap-2">
            <BasemapSwitcher />
            <BasinSwitcher />
            <div className="relative"><MapTools /></div>
            <WaterTypesLegend />
            <RestoreLegendButton />
          </div>
          <BasinPanel />
          <div className="absolute bottom-3 left-3 z-[400]">
            <ActiveLegend />
          </div>
        </div>
        <StatsCards />
      </div>
    </AppShell>
  );
}
