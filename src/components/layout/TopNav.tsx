import { Link, useRouterState } from "@tanstack/react-router";
import { Drop, ShareNetwork, Lightning, UploadSimple } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const tabs = [
  { to: "/", label: "Map" },
  { to: "/analytics", label: "Analytics" },
  { to: "/reports", label: "Reports" },
  { to: "/learn", label: "Learn" },
] as const;

export function TopNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="flex items-center justify-between gap-4 px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border z-30">
      <Link to="/" className="flex items-center gap-2.5 shrink-0">
        <div className="w-9 h-9 rounded-xl grad-blue flex items-center justify-center shadow-md">
          <Drop weight="fill" className="text-white" size={20} />
        </div>
        <div className="leading-tight">
          <div className="font-semibold text-foreground text-[15px]">AquaMap TJ</div>
          <div className="text-[11px] text-muted-foreground -mt-0.5">Water Intelligence · Tajikistan</div>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-1 panel px-1.5 py-1.5">
        {tabs.map((t) => {
          const active = path === t.to;
          return (
            <Link
              key={t.to}
              to={t.to}
              className="relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors"
            >
              {active && (
                <motion.div
                  layoutId="navpill"
                  className="absolute inset-0 grad-blue rounded-lg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative ${active ? "text-white" : "text-muted-foreground hover:text-foreground"}`}>
                {t.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-medium hover:bg-secondary transition">
          <ShareNetwork size={15} /> Share
        </button>
        <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-medium hover:bg-secondary transition">
          <Lightning size={15} weight="fill" className="text-warning" /> Upgrade
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg grad-blue text-white text-sm font-medium shadow-sm hover:opacity-95 transition">
          <UploadSimple size={15} weight="bold" /> Publish
        </button>
      </div>
    </header>
  );
}