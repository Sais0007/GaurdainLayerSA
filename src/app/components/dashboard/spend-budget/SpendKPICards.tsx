// src/app/components/dashboard/spend-budget/SpendKPICards.tsx
import React from "react";
import { TrendingUp, TrendingDown, Wallet, PieChart, DollarSign } from "lucide-react";

export function SpendKPICards() {
  const row1 = [
    {
      title: "Current Spend",
      subtitle: "Current billing cycle",
      pill: "↑ 11.4%",
      pillStyle: "bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/60 dark:border-rose-800",
      value: "$7,800.00",
      type: "red-sparkline",
      footer: "Compared with previous period",
    },
    {
      title: "Monthly Budget",
      subtitle: "Configured ceiling cap",
      pill: "Cap",
      pillStyle: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/60 dark:border-blue-800",
      value: "$10,000",
      type: "blue-bar-sparkline",
      footer: "Configured ceiling cap",
    },
    {
      title: "Remaining Budget",
      subtitle: "Available buffer",
      pill: "↓ 22% Buffer",
      pillStyle: "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-800",
      value: "$2,200",
      valueColor: "text-emerald-600 dark:text-emerald-400",
      type: "green-segmented",
      footer: "22% Available Buffer",
    },
    {
      title: "Budget Utilization",
      subtitle: "Pace rate",
      pill: "On Track",
      pillStyle: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/60 dark:border-amber-800",
      value: "78%",
      type: "amber-progress",
      footer: "Expected Pace Rate: 75%",
    },
    {
      title: "Pace Forecast",
      subtitle: "End-of-Month",
      pill: "↑ 2.4%",
      pillStyle: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/60 dark:border-amber-800",
      value: "$10,240",
      type: "orange-sparkline",
      footer: "Projected month-end spend",
    },
  ];

  const row2 = [
    {
      title: "Cost Per Request",
      subtitle: "Unit economic",
      pill: "Avg Unit",
      pillStyle: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/60 dark:border-blue-800",
      value: "$0.042",
      type: "blue-vertical-bars",
      footer: "Average gateway call cost",
    },
    {
      title: "Cost Per 1K Tokens",
      subtitle: "Token rate",
      pill: "Weighted",
      pillStyle: "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/60 dark:border-purple-800",
      value: "$0.000475",
      type: "purple-progress",
      footer: "Weighted model token rate",
    },
    {
      title: "Top Spend Team",
      subtitle: "Top Driver",
      pill: "↑ 31.4% Share",
      pillStyle: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/60 dark:border-blue-800",
      value: "Support",
      subText: "Support Team · $2,450.00",
      footer: "$2,450.00 accessed this cycle",
    },
    {
      title: "Top Spend Key",
      subtitle: "Highest key",
      pill: "All Keys",
      pillStyle: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/60 dark:border-amber-800",
      value: "support-prod-key",
      valFont: "font-mono text-sm font-bold",
      subText: "Support Team · Key",
      footer: "$2,150.00 accessed this cycle",
    },
    {
      title: "Top Spend Model",
      subtitle: "Highest model",
      pill: "↑ 40.7% Share",
      pillStyle: "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950/60 dark:border-purple-800",
      value: "Claude Sonnet",
      type: "purple-sparkline",
      footer: "$3,180.00 accessed this cycle",
    },
  ];

  return (
    <div className="space-y-3 animate-fadeIn">
      {/* Row 1: 5 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {row1.map((c, i) => (
          <div
            key={i}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block">
                    {c.title}
                  </span>
                  <span className="text-[10px] text-neutral-400 block">{c.subtitle}</span>
                </div>
                {c.pill && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${c.pillStyle}`}>
                    {c.pill}
                  </span>
                )}
              </div>

              <div className={`text-2xl font-extrabold mt-2 font-mono ${c.valueColor || "text-neutral-900 dark:text-white"}`}>
                {c.value}
              </div>

              {/* Sparklines & Mini Visualizations */}
              {c.type === "red-sparkline" && (
                <div className="flex items-end gap-1 h-3 mt-3">
                  {[30, 40, 35, 50, 65, 55, 70, 80, 75, 90].map((h, idx) => (
                    <div key={idx} className="flex-1 bg-rose-500 rounded-xs" style={{ height: `${h}%` }} />
                  ))}
                </div>
              )}

              {c.type === "blue-bar-sparkline" && (
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full w-full" />
                </div>
              )}

              {c.type === "green-segmented" && (
                <div className="flex items-center gap-1 h-2 mt-3">
                  {[100, 100, 100, 100, 20, 20, 20, 20, 20, 20].map((h, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 h-full rounded-xs ${idx < 4 ? "bg-emerald-500" : "bg-neutral-200 dark:bg-neutral-800"}`}
                    />
                  ))}
                </div>
              )}

              {c.type === "amber-progress" && (
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: "78%" }} />
                </div>
              )}

              {c.type === "orange-sparkline" && (
                <div className="flex items-end gap-1 h-3 mt-3">
                  {[40, 45, 50, 55, 60, 65, 70, 80, 85, 95].map((h, idx) => (
                    <div key={idx} className="flex-1 bg-amber-500 rounded-xs" style={{ height: `${h}%` }} />
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-800 text-[10px] text-neutral-400 font-medium truncate">
              {c.footer}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: 5 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {row2.map((c, i) => (
          <div
            key={i}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block">
                    {c.title}
                  </span>
                  <span className="text-[10px] text-neutral-400 block">{c.subtitle}</span>
                </div>
                {c.pill && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${c.pillStyle}`}>
                    {c.pill}
                  </span>
                )}
              </div>

              <div className={`text-2xl font-extrabold mt-2 font-mono text-neutral-900 dark:text-white ${c.valFont || ""}`}>
                {c.value}
              </div>

              {c.subText && (
                <div className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 mt-1 truncate">
                  {c.subText}
                </div>
              )}

              {c.type === "blue-vertical-bars" && (
                <div className="flex items-end gap-1 h-3 mt-3">
                  {[60, 70, 65, 80, 75, 90, 85, 100].map((h, idx) => (
                    <div key={idx} className="flex-1 bg-blue-600 rounded-xs" style={{ height: `${h}%` }} />
                  ))}
                </div>
              )}

              {c.type === "purple-progress" && (
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-purple-600 h-full rounded-full w-[70%]" />
                </div>
              )}

              {c.type === "purple-sparkline" && (
                <div className="flex items-end gap-1 h-3 mt-3">
                  {[30, 45, 60, 55, 75, 70, 85, 90, 95, 100].map((h, idx) => (
                    <div key={idx} className="flex-1 bg-purple-600 rounded-xs" style={{ height: `${h}%` }} />
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 mt-2 border-t border-neutral-100 dark:border-neutral-800 text-[10px] text-neutral-400 font-medium truncate">
              {c.footer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
