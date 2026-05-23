import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { FileText, DownloadSimple, MapPin, ChartLineUp, Drop, Snowflake, Lightning } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — AquaMap TJ" },
      { name: "description", content: "Downloadable environmental and water-security reports for Tajikistan." },
    ],
  }),
  component: ReportsPage,
});

const reports = [
  { title: "National Water Security Brief 2024", desc: "Country-wide access, infrastructure, and risk indicators.", icon: Drop, color: "text-info", bg: "bg-info/10", pages: 42, date: "Mar 2024" },
  { title: "Glacier Retreat Atlas", desc: "Pamir & Alay glacier change between 1990–2024.", icon: Snowflake, color: "text-glacier", bg: "bg-glacier/15", pages: 88, date: "Feb 2024" },
  { title: "Hydropower Outlook", desc: "Rogun commissioning timeline & regional capacity plan.", icon: Lightning, color: "text-hydro", bg: "bg-hydro/10", pages: 34, date: "Jan 2024" },
  { title: "Khatlon Flood Risk Assessment", desc: "Spring melt + GLOF modeling for Vakhsh basin.", icon: MapPin, color: "text-destructive", bg: "bg-destructive/10", pages: 56, date: "Dec 2023" },
  { title: "GBAO Rural Access Survey", desc: "Spring infrastructure and seasonal availability.", icon: ChartLineUp, color: "text-warning", bg: "bg-warning/10", pages: 28, date: "Nov 2023" },
  { title: "Transboundary Flow Memo", desc: "Amu Darya allocations & downstream impact.", icon: FileText, color: "text-primary", bg: "bg-primary-soft", pages: 19, date: "Oct 2023" },
];

function ReportsPage() {
  return (
    <AppShell showSidebars={false}>
      <div className="flex-1 overflow-y-auto scrollbar-thin pr-1">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground">Environmental summaries, regional insights, and water-security briefs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {reports.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className="panel p-4 flex flex-col"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${r.bg} ${r.color} mb-3`}>
                <r.icon size={20} weight="duotone" />
              </div>
              <div className="font-semibold text-[14px] text-foreground">{r.title}</div>
              <div className="text-[12px] text-muted-foreground mt-1 flex-1">{r.desc}</div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="text-[11px] text-muted-foreground">{r.pages} pages · {r.date}</div>
                <button
                  onClick={() => alert(`Downloading: ${r.title}`)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary-soft text-primary text-[11px] font-semibold hover:bg-primary hover:text-primary-foreground transition"
                >
                  <DownloadSimple size={12} weight="bold" /> PDF
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}