import { Link, useRouterState } from "@tanstack/react-router";
import { Drop, ShareNetwork, Lightning, UploadSimple, Globe, CaretDown, Check, DotsThreeVertical } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n, LANGS, Lang } from "@/lib/i18n";

export function TopNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { t, lang, setLang } = useI18n();
  const [langOpen, setLangOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const langBtnRef = useRef<HTMLButtonElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);
  const [langPos, setLangPos] = useState({ top: 0, right: 0 });
  const [morePos, setMorePos] = useState({ top: 0, right: 0 });

  const primaryTabs = [
    { to: "/", label: t("nav.map") },
    { to: "/analytics", label: t("nav.analytics") },
    { to: "/reports", label: t("nav.reports") },
    { to: "/learn", label: t("nav.learn") },
  ] as const;

  const moreTabs = [
    { to: "/sources", label: t("nav.sources") },
    { to: "/roadmap", label: t("nav.roadmap") },
  ] as const;

  useLayoutEffect(() => {
    if (langOpen && langBtnRef.current) {
      const r = langBtnRef.current.getBoundingClientRect();
      setLangPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
    if (moreOpen && moreBtnRef.current) {
      const r = moreBtnRef.current.getBoundingClientRect();
      setMorePos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
  }, [langOpen, moreOpen]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const target = e.target as Node;
      if (langBtnRef.current && !langBtnRef.current.contains(target) && !(target as HTMLElement).closest?.("[data-portal=langmenu]")) {
        setLangOpen(false);
      }
      if (moreBtnRef.current && !moreBtnRef.current.contains(target) && !(target as HTMLElement).closest?.("[data-portal=moremenu]")) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const currentLang = LANGS.find((l) => l.code === lang) ?? LANGS[0];
  const moreActive = moreTabs.some((m) => m.to === path);

  return (
    <header className="flex items-center justify-between gap-4 px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border z-30">
      <Link to="/" className="flex items-center gap-2.5 shrink-0">
        <div className="w-9 h-9 rounded-xl grad-blue flex items-center justify-center shadow-md">
          <Drop weight="fill" className="text-white" size={20} />
        </div>
        <div className="leading-tight">
          <div className="font-semibold text-foreground text-[15px]">AquaMap TJ</div>
          <div className="text-[11px] text-muted-foreground -mt-0.5">{t("brand.tagline")}</div>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-1 panel px-1.5 py-1.5">
        {primaryTabs.map((tb) => {
          const active = path === tb.to;
          return (
            <Link key={tb.to} to={tb.to} className="relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors">
              {active && (
                <motion.div layoutId="navpill" className="absolute inset-0 grad-blue rounded-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }} />
              )}
              <span className={`relative ${active ? "text-white" : "text-muted-foreground hover:text-foreground"}`}>
                {tb.label}
              </span>
            </Link>
          );
        })}
        <button
          ref={moreBtnRef}
          onClick={() => { setMoreOpen((o) => !o); setLangOpen(false); }}
          className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-1 ${
            moreActive ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("nav.more")} <CaretDown size={11} weight="bold" className={moreOpen ? "rotate-180 transition-transform" : "transition-transform"} />
        </button>
      </nav>

      <div className="flex items-center gap-2">
        <button
          ref={langBtnRef}
          onClick={() => { setLangOpen((o) => !o); setMoreOpen(false); }}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-card text-sm font-medium hover:bg-secondary transition"
          aria-label="Change language"
        >
          <Globe size={15} />
          <span className="font-semibold text-[12px]">{currentLang.abbr}</span>
          <CaretDown size={11} weight="bold" className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
        </button>

        <button className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-card text-foreground hover:bg-secondary transition"
          onClick={() => { setMoreOpen((o) => !o); setLangOpen(false); }} ref={!moreBtnRef.current ? moreBtnRef : undefined}>
          <DotsThreeVertical size={16} weight="bold" />
        </button>

        <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-medium hover:bg-secondary transition">
          <ShareNetwork size={15} /> {t("nav.share")}
        </button>
        <button className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-medium hover:bg-secondary transition">
          <Lightning size={15} weight="fill" className="text-warning" /> {t("nav.upgrade")}
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg grad-blue text-white text-sm font-medium shadow-sm hover:opacity-95 transition">
          <UploadSimple size={15} weight="bold" /> {t("nav.publish")}
        </button>
      </div>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {langOpen && (
            <motion.div
              data-portal="langmenu"
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.12 }}
              style={{ position: "fixed", top: langPos.top, right: langPos.right, zIndex: 9999 }}
              className="w-48 rounded-xl border border-border bg-card shadow-xl overflow-hidden"
            >
              {LANGS.map((l) => {
                const sel = l.code === lang;
                return (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code as Lang); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm hover:bg-secondary transition ${sel ? "bg-primary-soft/40" : ""}`}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span className="flex-1 text-left text-foreground">{l.label}</span>
                    {sel && <Check size={14} weight="bold" className="text-primary" />}
                  </button>
                );
              })}
            </motion.div>
          )}
          {moreOpen && (
            <motion.div
              data-portal="moremenu"
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.12 }}
              style={{ position: "fixed", top: morePos.top, right: morePos.right, zIndex: 9999 }}
              className="w-56 rounded-xl border border-border bg-card shadow-xl overflow-hidden p-1"
            >
              {[...primaryTabs, ...moreTabs].map((tb) => {
                const active = path === tb.to;
                return (
                  <Link
                    key={tb.to}
                    to={tb.to}
                    onClick={() => setMoreOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm transition ${
                      active ? "bg-primary-soft text-primary font-semibold" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {tb.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}
