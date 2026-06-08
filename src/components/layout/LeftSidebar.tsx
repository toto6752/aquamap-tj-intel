import {
  Drop, Snowflake, DropSimple, Warning, Lightning,
  Waves, UsersThree, Plant, Tree, ArrowsClockwise, StackSimple,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useLayers, LayerKey } from "./LayerContext";
import { Switch } from "@/components/ui/switch";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";

const items: { key: LayerKey; tKey: string; Icon: typeof Drop; color: string }[] = [
  { key: "rivers", tKey: "layers.rivers", Icon: Waves, color: "text-river" },
  { key: "glaciers", tKey: "layers.glaciers", Icon: Snowflake, color: "text-glacier" },
  { key: "water", tKey: "layers.water", Icon: DropSimple, color: "text-info" },
  { key: "risk", tKey: "layers.risk", Icon: Warning, color: "text-destructive" },
  { key: "hydro", tKey: "layers.hydro", Icon: Lightning, color: "text-hydro" },
  { key: "reservoirs", tKey: "layers.reservoirs", Icon: Drop, color: "text-primary" },
  { key: "population", tKey: "layers.population", Icon: UsersThree, color: "text-warning" },
  { key: "agriculture", tKey: "layers.agriculture", Icon: Plant, color: "text-success" },
  { key: "protected", tKey: "layers.protected", Icon: Tree, color: "text-success" },
];

export function LeftSidebar() {
  const { layers, toggle, opacity, setOpacity } = useLayers();
  const { t } = useI18n();
  const active = items.filter((i) => layers[i.key]).length;
  const [expanded, setExpanded] = useState<LayerKey | null>(null);

  return (
    <aside className="panel flex flex-col w-full h-full overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
        <div className="flex items-center gap-2">
          <StackSimple size={17} weight="duotone" className="text-primary" />
          <h2 className="font-semibold text-[14px] text-foreground">{t("layers.title")}</h2>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary-soft text-primary">
          {active}/{items.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-2 py-2">
        {items.map((it, i) => {
          const on = layers[it.key];
          const isOpen = expanded === it.key;
          return (
            <motion.div
              key={it.key}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`rounded-lg transition-colors ${
                on ? "bg-primary-soft/60" : "hover:bg-secondary"
              }`}
            >
              <div className="flex items-center gap-3 px-3 py-2.5">
                <button
                  onClick={() => setExpanded(isOpen ? null : it.key)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center bg-card border border-border ${it.color} hover:scale-105 transition`}
                  title="Adjust opacity"
                >
                  <it.Icon size={16} weight="duotone" />
                </button>
                <button
                  onClick={() => setExpanded(isOpen ? null : it.key)}
                  className="flex-1 text-left text-[13px] font-medium text-foreground"
                >
                  {t(it.tKey)}
                </button>
                <Switch checked={on} onCheckedChange={() => toggle(it.key)} />
              </div>
              {isOpen && (
                <div className="px-3 pb-2.5 -mt-1 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground w-12">Opacity</span>
                  <input
                    type="range" min={0} max={100} step={5}
                    value={opacity[it.key]}
                    onChange={(e) => setOpacity(it.key, Number(e.target.value))}
                    className="flex-1 accent-primary"
                    disabled={!on}
                  />
                  <span className="text-[11px] tabular-nums w-9 text-right font-semibold text-foreground">{opacity[it.key]}%</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="m-3 mt-2 p-3 rounded-xl border border-success/20 bg-success/5">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center shrink-0">
            <ArrowsClockwise size={15} weight="bold" className="text-success" />
          </div>
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-foreground">{t("layers.update")}</div>
            <div className="text-[11px] text-muted-foreground leading-snug">{t("layers.updateNote")}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}