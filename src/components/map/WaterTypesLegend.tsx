import { useState } from "react";
import { Drop, CaretDown } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";
import { getWaterTypes } from "@/lib/learn-extras";
import { motion, AnimatePresence } from "framer-motion";

export function WaterTypesLegend() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const items = getWaterTypes(lang);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="panel px-3 py-2 backdrop-blur-md bg-card/95 flex items-center gap-2 text-[12px] font-semibold text-foreground hover:bg-secondary/60 transition"
        aria-expanded={open}
      >
        <Drop size={14} weight="duotone" className="text-info" />
        {t("learn.waterTypes.title")}
        <CaretDown size={11} weight="bold" className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-[280px] panel p-3 backdrop-blur-md bg-card/95 z-[500]"
          >
            <div className="text-[10px] font-bold tracking-wider text-muted-foreground mb-2">
              {t("learn.waterTypes.sub")}
            </div>
            <ul className="space-y-1.5">
              {items.map((w) => (
                <li key={w.key} className={`rounded-lg p-2 ${w.bg} border border-border/30`}>
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{w.emoji}</span>
                    <span className={`text-[12.5px] font-semibold text-foreground`}>{w.name}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-1">{w.def}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
