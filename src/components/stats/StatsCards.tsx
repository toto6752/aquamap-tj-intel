import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Drop, Snowflake, Warning, Lightning, UsersThree, ArrowUp, ArrowDown, Minus, Info, Clock } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import { stats } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";

const icons = {
  water: { Icon: Drop, color: "text-info", bg: "bg-info/10" },
  glacier: { Icon: Snowflake, color: "text-glacier", bg: "bg-glacier/15" },
  risk: { Icon: Warning, color: "text-destructive", bg: "bg-destructive/10" },
  hydro: { Icon: Lightning, color: "text-hydro", bg: "bg-hydro/10" },
  pop: { Icon: UsersThree, color: "text-warning", bg: "bg-warning/10" },
} as const;

function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const format = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
  const [display, setDisplay] = useState(format(value));
  const mv = useMotionValue(value);
  const rounded = useTransform(mv, (l) => format(l));
  useEffect(() => {
    mv.set(0);
    setDisplay(format(0));
    const unsub = rounded.on("change", (v) => setDisplay(v));
    const ctl = animate(mv, value, { duration: 1.4, ease: "easeOut" });
    return () => { ctl.stop(); unsub(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals]);
  return <span>{display}</span>;
}

export function StatsCards() {
  const { t } = useI18n();
  const navigate = useNavigate();
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {stats.map((s, i) => {
        const meta = icons[s.id as keyof typeof icons];
        const TrendIcon = s.trend === "up" ? ArrowUp : s.trend === "down" ? ArrowDown : Minus;
        const trendColor =
          s.trend === "up" ? "text-success" : s.trend === "down" ? "text-destructive" : "text-muted-foreground";
        const detail = (s as { detail?: string }).detail;
        const route = (s as { route?: string }).route;
        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            onClick={() => route && navigate({ to: route })}
            className="panel p-3.5 group cursor-pointer relative"
            title={detail ? `${detail} · ${s.source ?? ""}` : `${s.source ?? ""}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${meta.bg} ${meta.color}`}>
                <meta.Icon size={17} weight="duotone" />
              </div>
              <div className={`flex items-center gap-0.5 text-[11px] font-semibold ${trendColor}`}>
                <TrendIcon size={11} weight="bold" />
                {s.delta}
              </div>
            </div>
            <div className="text-[11px] font-medium text-muted-foreground">{t((s as { labelKey: string }).labelKey)}</div>
            <div className="text-[26px] font-bold text-foreground tracking-tight leading-tight mt-0.5">
              <Counter value={s.value} decimals={(s as { decimals?: number }).decimals ?? 0} />
              <span className="text-[15px] font-semibold text-muted-foreground">{s.suffix}</span>
            </div>
            {detail && (
              <div className="text-[10.5px] text-muted-foreground/90 mt-1 leading-snug line-clamp-2">{detail}</div>
            )}
            {s.source && (
              <div className="text-[10px] text-muted-foreground/70 mt-1 truncate">{s.source}</div>
            )}
          </motion.div>
        );
      })}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-foreground px-1">
        <div className="flex items-center gap-1.5">
          <Info size={11} weight="duotone" />
          <span className="font-semibold">{t("stats.sources")}:</span>
          <span>{t("stats.sourcesNote")}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground/80">
          <Clock size={11} weight="duotone" />
          <span>Last updated: June 5, 2025 · 14:32 UTC+5</span>
        </div>
      </div>
    </div>
  );
}