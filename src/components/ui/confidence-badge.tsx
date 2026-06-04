import { CheckCircle, Info, Flask } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

export type Confidence = "verified" | "estimated" | "demo";

export function ConfidenceBadge({
  level, source, updated,
}: { level: Confidence; source: string; updated: string }) {
  const { t } = useI18n();
  const cfg = {
    verified: { Icon: CheckCircle, color: "text-success", bg: "bg-success/10", label: t("conf.verified") },
    estimated: { Icon: Info, color: "text-warning", bg: "bg-warning/10", label: t("conf.estimated") },
    demo: { Icon: Flask, color: "text-muted-foreground", bg: "bg-secondary", label: t("conf.demo") },
  }[level];
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-muted-foreground">
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md ${cfg.bg} ${cfg.color} font-semibold`}>
        <cfg.Icon size={10} weight="fill" /> {cfg.label}
      </span>
      <span><span className="font-semibold">{t("conf.source")}:</span> {source}</span>
      <span><span className="font-semibold">{t("conf.updated")}:</span> {updated}</span>
    </div>
  );
}

export function AIInsight({ text }: { text: string }) {
  const { t } = useI18n();
  return (
    <div className="mt-3 flex gap-2 p-2.5 rounded-lg bg-primary-soft/40 border border-primary/15">
      <div className="w-6 h-6 shrink-0 rounded-md grad-blue text-white flex items-center justify-center text-[10px] font-bold">AI</div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider font-bold text-primary">{t("ai.insight")}</div>
        <p className="text-[12px] text-foreground leading-relaxed mt-0.5">{text}</p>
      </div>
    </div>
  );
}
