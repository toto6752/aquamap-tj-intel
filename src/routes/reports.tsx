import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass, Clock, ArrowLeft, Drop, Snowflake, CloudRain,
  Lightning, Globe, Scales, BookOpen, Star,
} from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Research & Policy — AquaMap TJ" },
      { name: "description", content: "Briefs, assessments and policy analysis on Tajikistan's water security, glaciers, and hydropower." },
    ],
  }),
  component: ResearchPage,
});

type Cat = "security" | "glacier" | "climate" | "hydro" | "basin" | "policy";
interface Article {
  id: string; cat: Cat; titleEn: string; titleRu: string; titleTj: string;
  excerptEn: string; excerptRu: string; excerptTj: string;
  bodyEn: string[]; readTime: number; date: string;
  source: string; featured?: boolean;
}

const articles: Article[] = [
  {
    id: "national-water-security-2025", cat: "security", featured: true, readTime: 9, date: "Mar 2025",
    source: "World Bank · UN-Water",
    titleEn: "National Water Security Brief 2025",
    titleRu: "Обзор водной безопасности 2025",
    titleTj: "Шарҳи амнияти оби 2025",
    excerptEn: "Tajikistan holds Central Asia's largest renewable freshwater inventory but faces structural risks across infrastructure, climate, and transboundary governance.",
    excerptRu: "Таджикистан располагает крупнейшим в Центральной Азии запасом возобновляемой пресной воды, но сталкивается со структурными рисками.",
    excerptTj: "Тоҷикистон захираи бузургтарини оби тозаро дар Осиёи Марказӣ дорад, аммо хатарҳои сохторӣ мавҷуданд.",
    bodyEn: [
      "Tajikistan contributes ~55% of total Aral Sea basin runoff, making it the regional water tower for over 70 million people downstream. National renewable water resources are estimated at approximately 64 km³/year, the majority originating from snow- and glacier-fed catchments in the Pamir and Alay ranges.",
      "Despite this abundance, only 74% of the rural population had access to safely managed drinking water in 2024. Rehabilitation backlogs from Soviet-era infrastructure, fragmented utility governance, and underinvestment in metering remain the principal bottlenecks.",
      "Transboundary governance under the ICWC framework allocates Tajikistan a small share of basin flows relative to the runoff it generates. Strengthening Tajikistan's hydro-meteorological observation network — including telemetered river gauges — is a prerequisite for evidence-based negotiation.",
      "Recommended priorities: (1) accelerate Rural Water Supply Project II co-financed by the World Bank, (2) digitise river-gauge networks in the Vakhsh and Panj basins, (3) operationalise a national water information system aligned with the UNECE convention.",
    ],
  },
  {
    id: "glacier-retreat-atlas", cat: "glacier", featured: true, readTime: 11, date: "Feb 2025",
    source: "ScienceDirect 2026 · RGI 7.0",
    titleEn: "Glacier Retreat Atlas: Pamir & Alay 1990–2024",
    titleRu: "Атлас отступления ледников Памира и Алая",
    titleTj: "Атласи ақибнишинии пиряхҳои Помиру Олой",
    excerptEn: "Tajikistan's 14,000+ glaciers have lost an estimated 30% of area since 1990. Fedchenko retreat rates exceed 16 m/year.",
    excerptRu: "Более 14 000 ледников Таджикистана потеряли около 30% площади с 1990 года.",
    excerptTj: "Аз 14 000 пирях ва зиёда аз он, Тоҷикистон тақрибан 30% майдонашро аз соли 1990 гум кардааст.",
    bodyEn: [
      "The Randolph Glacier Inventory 7.0 documents 13,542 glaciers in Tajikistan. Total area estimates range 8,476–11,146 km² depending on the inventory year and methodology. Ice volume is approximately 845 km³ — about thirteen times the annual river runoff.",
      "Fedchenko Glacier — the world's tenth-largest — is retreating at up to 16 m per year. Smaller glaciers below 1 km² are most vulnerable: over 1,000 have disappeared since the 1930s.",
      "Modelling under SSP3-7.0 projects further losses of 30–75% of glacier volume across major Tajik basins by 2050, with the Pyanj basin facing the steepest decline.",
      "Peak-water dynamics suggest summer flows will continue to grow until ~2040, then decline. This temporary buffer hides the long-term threat to downstream irrigation and hydropower.",
    ],
  },
  {
    id: "rogun-hydropower-outlook", cat: "hydro", featured: false, readTime: 6, date: "Jan 2025",
    source: "MEWR · World Bank",
    titleEn: "Rogun Hydropower: 2025 Investment Outlook",
    titleRu: "Гидроэнергетика Рогуна: инвестиционный обзор 2025",
    titleTj: "Нерӯи барқобии Роғун: чашмандози сармоягузории 2025",
    excerptEn: "World Bank approved $350M in late 2024. Full commissioning is now targeted around 2033 with 3,780 MW of installed capacity.",
    excerptRu: "Всемирный банк одобрил $350 млн в конце 2024. Полный ввод запланирован к 2033 году.",
    excerptTj: "Бонки Ҷаҳонӣ дар охири 2024 350 млн доллар тасдиқ кард. Ифтитоҳи комил то 2033.",
    bodyEn: [
      "Rogun, on the Vakhsh upstream of Nurek, will be the world's tallest dam at 335 m. The first two units (~720 MW) are already generating; remaining units will be phased in through 2033.",
      "At full capacity, Rogun will roughly double Tajikistan's installed hydropower base and unlock substantial winter export capacity via CASA-1000.",
      "Concerns from downstream Uzbekistan focus on filling-period flow reductions. A coordinated reservoir-operation protocol with the Nurek cascade is the recommended mitigation.",
    ],
  },
  {
    id: "khatlon-flood-risk", cat: "climate", featured: false, readTime: 8, date: "Dec 2024",
    source: "CoES · UNDRR",
    titleEn: "Khatlon Flood Risk Assessment",
    titleRu: "Оценка риска наводнений в Хатлоне",
    titleTj: "Арзёбии хатари обхезӣ дар Хатлон",
    excerptEn: "Spring snowmelt combined with GLOF risk and convective storm mudflows make Khatlon Tajikistan's most flood-exposed lowland.",
    excerptRu: "Сочетание весеннего таяния, GLOF и ливневых селей делает Хатлон самой подверженной наводнениям равниной.",
    excerptTj: "Обшавии баҳорӣ ҳамроҳ бо хатари GLOF Хатлонро ба минтақаи хатарноки обхезӣ табдил медиҳад.",
    bodyEn: [
      "Khatlon faces three superimposed flood pathways: spring snowmelt surges on the Vakhsh and Panj, glacial lake outburst floods (GLOFs) originating in upstream GBAO, and summer convective storms driving mudflows on steep tributaries.",
      "The 2021 spring floods displaced approximately 4,200 people and damaged irrigation networks across the lower Vakhsh.",
      "Recommended actions: deploy an upstream telemetered early-warning network, reoperate Nurek to absorb spring peaks, and update flood hazard maps using post-2020 satellite imagery.",
    ],
  },
  {
    id: "gbao-spring-access", cat: "security", featured: false, readTime: 7, date: "Nov 2024",
    source: "Aga Khan Foundation · WHO/UNICEF JMP",
    titleEn: "GBAO Rural Spring Access Survey",
    titleRu: "Обследование доступа к родникам в ГБАО",
    titleTj: "Тадқиқоти дастрасӣ ба чашмаҳои ГБАО",
    excerptEn: "Only ~52% of GBAO residents have reliable clean water year-round. Micro-hydro and gravity spring systems are the primary intervention.",
    excerptRu: "Только ~52% жителей ГБАО имеют надёжный доступ к чистой воде круглый год.",
    excerptTj: "Танҳо тақрибан 52% сокинони ГБАО ба оби тоза дастрасии доимӣ доранд.",
    bodyEn: [
      "GBAO sits at an average elevation of 3,500 m. Precipitation outside glacier-fed valleys is extremely low and infrastructure density is sparse. Seasonal access volatility is severe.",
      "Spring-fed gravity systems, micro-hydro pump rehabilitation, and decentralised storage tanks deliver the highest cost-effectiveness in the region.",
      "Integration with the Aga Khan Foundation's mountain societies programme is recommended for scale.",
    ],
  },
  {
    id: "amu-darya-transboundary", cat: "basin", featured: false, readTime: 10, date: "Oct 2024",
    source: "ICWC · UNECE",
    titleEn: "Transboundary Flow Memo: Amu Darya Allocations",
    titleRu: "Меморандум о трансграничных потоках: Амударья",
    titleTj: "Меморандум дар бораи ҷараёнҳои фаромарзӣ: Амударё",
    excerptEn: "Tajikistan generates ~55% of Amu Darya basin runoff but allocations under the ICWC framework remain heavily skewed toward downstream irrigators.",
    excerptRu: "Таджикистан формирует ~55% стока Амударьи, но распределение МКВК остаётся смещённым в пользу стран ниже по течению.",
    excerptTj: "Тоҷикистон ~55% ҷараёни Амударёро ташкил медиҳад, аммо тақсимот аз тарафи ICWC ҷонибдори поёноб аст.",
    bodyEn: [
      "Tajik and Kyrgyz upstream states need winter releases for hydropower; downstream Uzbekistan and Turkmenistan need summer releases for cotton irrigation. These goals are seasonally opposite.",
      "Modernising allocation rules under the UNECE Water Convention — and creating shared real-time gauge data — is the most actionable path to reduce annual political friction.",
    ],
  },
  {
    id: "policy-pillars-2030", cat: "policy", featured: false, readTime: 9, date: "Sep 2024",
    source: "AquaMap TJ analysis",
    titleEn: "Five Policy Pillars for Water Security to 2030",
    titleRu: "Пять опор политики водной безопасности до 2030",
    titleTj: "Панҷ сутуни сиёсати амнияти об то 2030",
    excerptEn: "A consolidated recommendation framework spanning monitoring, governance, hydropower, climate adaptation, and regional diplomacy.",
    excerptRu: "Сводная программа рекомендаций по мониторингу, управлению, гидроэнергетике и климатической адаптации.",
    excerptTj: "Чаҳорчӯбаи тавсияҳо оид ба мониторинг, идоракунӣ, иқлим ва дипломатия.",
    bodyEn: [
      "1. Build a national water information system aligned with the UNECE convention and accessible to all line ministries.",
      "2. Operationalise telemetered river gauges across the Panj, Vakhsh, Kofarnihon, and Zarafshan basins.",
      "3. Anchor Rogun completion in a multi-stakeholder reservoir operation protocol with Nurek.",
      "4. Scale rural micro-hydro and gravity-spring programmes for GBAO and remote Sughd.",
      "5. Lead the Dushanbe Water Process to update transboundary allocation arrangements.",
    ],
  },
];

const catMeta: Record<Cat, { tKey: string; Icon: typeof Drop; color: string; bg: string }> = {
  security: { tKey: "rp.cat.security", Icon: Drop, color: "text-info", bg: "bg-info/10" },
  glacier: { tKey: "rp.cat.glacier", Icon: Snowflake, color: "text-glacier", bg: "bg-glacier/15" },
  climate: { tKey: "rp.cat.climate", Icon: CloudRain, color: "text-destructive", bg: "bg-destructive/10" },
  hydro: { tKey: "rp.cat.hydro", Icon: Lightning, color: "text-hydro", bg: "bg-hydro/10" },
  basin: { tKey: "rp.cat.basin", Icon: Globe, color: "text-success", bg: "bg-success/10" },
  policy: { tKey: "rp.cat.policy", Icon: Scales, color: "text-primary", bg: "bg-primary-soft" },
};

function ResearchPage() {
  const { t, lang } = useI18n();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const pickTitle = (a: Article) => lang === "ru" ? a.titleRu : lang === "tj" ? a.titleTj : a.titleEn;
  const pickExcerpt = (a: Article) => lang === "ru" ? a.excerptRu : lang === "tj" ? a.excerptTj : a.excerptEn;

  const filtered = useMemo(() => articles.filter((a) => {
    if (cat !== "all" && a.cat !== cat) return false;
    if (q) {
      const hay = (pickTitle(a) + " " + pickExcerpt(a)).toLowerCase();
      if (!hay.includes(q.toLowerCase())) return false;
    }
    return true;
  }), [q, cat, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const featured = articles.filter((a) => a.featured);
  const open = openId ? articles.find((a) => a.id === openId) : null;
  const related = open ? articles.filter((a) => a.cat === open.cat && a.id !== open.id).slice(0, 3) : [];

  if (open) {
    return (
      <AppShell showSidebars={false}>
        <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
          <button onClick={() => setOpenId(null)} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-primary hover:underline mb-3">
            <ArrowLeft size={13} weight="bold" /> {t("rp.back")}
          </button>
          <article className="panel p-6 md:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${catMeta[open.cat].bg} ${catMeta[open.cat].color} text-[11px] font-semibold`}>
                {(() => { const I = catMeta[open.cat].Icon; return <I size={11} weight="fill" />; })()}
                {t(catMeta[open.cat].tKey)}
              </span>
              <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                <Clock size={11} /> {open.readTime} {t("rp.readtime")}
              </span>
              <span className="text-[11px] text-muted-foreground">· {open.date}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">{pickTitle(open)}</h1>
            <p className="text-[14px] text-muted-foreground mt-2 leading-relaxed">{pickExcerpt(open)}</p>
            <div className="mt-5 space-y-3.5 text-[13.5px] text-foreground leading-relaxed">
              {open.bodyEn.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <ConfidenceBadge level="verified" source={open.source} updated={open.date} />
          </article>

          {related.length > 0 && (
            <div className="mt-4">
              <h3 className="text-[13px] font-semibold text-foreground mb-2 px-1">{t("rp.related")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {related.map((r) => (
                  <button key={r.id} onClick={() => setOpenId(r.id)} className="text-left panel p-4 hover:border-primary/40 transition">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${catMeta[r.cat].bg} ${catMeta[r.cat].color} mb-2`}>
                      {(() => { const I = catMeta[r.cat].Icon; return <I size={18} weight="duotone" />; })()}
                    </div>
                    <div className="font-semibold text-[13.5px] text-foreground">{pickTitle(r)}</div>
                    <div className="text-[11.5px] text-muted-foreground mt-1 line-clamp-2">{pickExcerpt(r)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell showSidebars={false}>
      <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">{t("rp.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("rp.subtitle")}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <div className="relative flex-1">
            <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("rp.search")}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-card text-[13px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition" />
          </div>
          <div className="flex flex-wrap gap-1.5 panel p-1.5">
            {(["all", "security", "glacier", "climate", "hydro", "basin", "policy"] as const).map((c) => {
              const on = c === cat;
              return (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11.5px] font-semibold transition whitespace-nowrap ${
                    on ? "grad-blue text-white shadow-sm" : "text-muted-foreground hover:bg-secondary"
                  }`}>
                  {c === "all" ? t("rp.all") : t(catMeta[c].tKey)}
                </button>
              );
            })}
          </div>
        </div>

        {featured.length > 0 && cat === "all" && q === "" && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold text-muted-foreground mb-2 px-1">
              <Star size={11} weight="fill" className="text-warning" /> {t("rp.featured")}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {featured.map((a) => (
                <motion.button key={a.id} whileHover={{ y: -3 }} onClick={() => setOpenId(a.id)}
                  className="text-left panel p-5 relative overflow-hidden">
                  <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full ${catMeta[a.cat].bg} blur-2xl opacity-60`} />
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${catMeta[a.cat].bg} ${catMeta[a.cat].color} mb-3`}>
                      {(() => { const I = catMeta[a.cat].Icon; return <I size={20} weight="duotone" />; })()}
                    </div>
                    <h3 className="font-bold text-[15px] text-foreground leading-snug">{pickTitle(a)}</h3>
                    <p className="text-[12.5px] text-muted-foreground mt-1.5 line-clamp-2">{pickExcerpt(a)}</p>
                    <div className="flex items-center gap-3 mt-3 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Clock size={11} /> {a.readTime} {t("rp.readtime")}</span>
                      <span>· {a.date}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {filtered.length === 0 ? (
            <div className="panel p-8 text-center text-[13px] text-muted-foreground">
              <BookOpen size={28} className="mx-auto mb-2 opacity-60" />
              {t("rp.empty")}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {filtered.map((a, i) => (
                <motion.button key={a.id}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -3 }} onClick={() => setOpenId(a.id)}
                  className="text-left panel p-4 flex flex-col">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${catMeta[a.cat].bg} ${catMeta[a.cat].color} mb-3`}>
                    {(() => { const I = catMeta[a.cat].Icon; return <I size={20} weight="duotone" />; })()}
                  </div>
                  <div className="font-semibold text-[14px] text-foreground leading-snug">{pickTitle(a)}</div>
                  <div className="text-[12px] text-muted-foreground mt-1.5 line-clamp-3 flex-1">{pickExcerpt(a)}</div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                      <Clock size={11} /> {a.readTime} {t("rp.readtime")} · {a.date}
                    </span>
                    <span className="text-[11px] font-semibold text-primary">{t("rp.read")} →</span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
