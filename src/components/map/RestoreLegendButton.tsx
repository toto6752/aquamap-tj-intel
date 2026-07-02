import { Eye } from "@phosphor-icons/react";
import { useLayers } from "../layout/LayerContext";
import { useI18n } from "@/lib/i18n";

export function RestoreLegendButton() {
  const { legendVisible, setLegendVisible } = useLayers();
  const { t } = useI18n();
  if (legendVisible) return null;
  return (
    <button
      onClick={() => setLegendVisible(true)}
      className="panel flex items-center gap-1.5 px-2.5 py-1.5 text-[12px] font-medium text-foreground bg-card/95 backdrop-blur-md hover:bg-secondary transition animate-in fade-in duration-200"
    >
      <Eye size={13} />
      {t("legend.show")}
    </button>
  );
}