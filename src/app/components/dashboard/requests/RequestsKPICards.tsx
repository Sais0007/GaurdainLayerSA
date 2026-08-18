// src/app/components/dashboard/requests/RequestsKPICards.tsx
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export function RequestsKPICards() {
  const topRow = [
    {
      title: "TOTAL REQUESTS",
      val: "182,640",
      pill: "↑ 18.3% vs prev period",
      pillColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800",
      sub: "Period Total",
    },
    {
      title: "SUCCESSFUL",
      val: "175,699",
      sub: "96.2% success rate",
      valColor: "text-neutral-900 dark:text-white",
    },
    {
      title: "FAILED",
      val: "6,941",
      sub: "3.8% error rate",
      valColor: "text-rose-600 dark:text-rose-400",
      subColor: "text-rose-500 font-semibold",
    },
    {
      title: "AVG REQUESTS / DAY",
      val: "6,088",
      sub: "Over 30 day window",
    },
    {
      title: "PEAK REQUEST HOUR",
      val: "8,420 reqs",
      sub: "Aug 4 at 2:00 PM",
    },
  ];

  const bottomRow = [
    {
      title: "MOST ACTIVE TEAM",
      val: "Support",
      sub: "54,200 reqs (29.7%)",
    },
    {
      title: "MOST ACTIVE USER",
      val: "Dr. Sarah Chen",
      sub: "24,800 reqs (13.6%)",
    },
    {
      title: "TOP VIRTUAL KEY",
      val: "support-prod-key",
      sub: "38,200 reqs (20.9%)",
      valFont: "font-mono text-sm font-bold",
    },
    {
      title: "MOST USED MODEL",
      val: "Claude Sonnet",
      sub: "68,400 reqs (37.4%)",
    },
    {
      title: "TOP PROVIDER",
      val: "OpenAI",
      sub: "83,300 reqs (45.6%)",
    },
  ];

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Row 1 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {topRow.map((c, i) => (
          <div
            key={i}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {c.title}
              </span>
              {c.pill && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${c.pillColor}`}>
                  {c.pill}
                </span>
              )}
            </div>
            <div className={`text-2xl font-extrabold mt-2 font-mono ${c.valColor || "text-neutral-900 dark:text-white"}`}>
              {c.val}
            </div>
            <div className={`text-[11px] mt-1.5 truncate ${c.subColor || "text-neutral-400"}`}>
              {c.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {bottomRow.map((c, i) => (
          <div
            key={i}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              {c.title}
            </span>
            <div className={`text-base font-bold text-neutral-900 dark:text-white mt-2 truncate ${c.valFont || ""}`}>
              {c.val}
            </div>
            <div className="text-[11px] text-neutral-400 mt-1 truncate">
              {c.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
