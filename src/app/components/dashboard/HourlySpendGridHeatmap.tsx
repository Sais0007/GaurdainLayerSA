// src/app/components/dashboard/HourlySpendGridHeatmap.tsx
import React from "react";
import { MOCK_HOURLY_HEATMAP_DATA } from "./dashboardData";
import { Clock } from "lucide-react";

export function HourlySpendGridHeatmap() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-600" />
            24-Hour Traffic Contribution Matrix (Hourly Spend Grid)
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Hourly load density across 7 days. Highlights peak business traffic windows (09:00 - 17:00).
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-500">
          <span>Low</span>
          <div className="flex gap-1">
            <span className="w-4 h-4 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700" title="Low Traffic" />
            <span className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-950/60 border border-blue-200" title="Light Load" />
            <span className="w-4 h-4 rounded bg-blue-300 dark:bg-blue-800" title="Moderate Load" />
            <span className="w-4 h-4 rounded bg-primary-500 text-white" title="High Traffic" />
            <span className="w-4 h-4 rounded bg-primary-700 text-white font-bold" title="Peak Hour Spikes" />
          </div>
          <span>Peak</span>
        </div>
      </div>

      {/* Grid Heatmap Container */}
      <div className="overflow-x-auto pt-2">
        <div className="min-w-[750px] space-y-2">
          
          {/* Hour Labels Header */}
          <div className="grid grid-cols-[60px_repeat(24,minmax(0,1fr))] gap-1.5 text-[10px] font-mono text-neutral-400 text-center select-none">
            <div className="text-left font-bold text-neutral-500 font-sans">Day</div>
            {Array.from({ length: 24 }).map((_, h) => (
              <div key={h}>{h.toString().padStart(2, "0")}</div>
            ))}
          </div>

          {/* Grid Rows */}
          {MOCK_HOURLY_HEATMAP_DATA.map((row) => (
            <div key={row.day} className="grid grid-cols-[60px_repeat(24,minmax(0,1fr))] gap-1.5 items-center">
              <div className="text-xs font-bold text-neutral-700 dark:text-neutral-300 select-none">
                {row.day}
              </div>

              {row.hours.map((hItem) => {
                const getIntensityClass = (intensity: number) => {
                  switch (intensity) {
                    case 4:
                      return "bg-primary-700 text-white border-primary-800 shadow-2xs font-bold";
                    case 3:
                      return "bg-primary-500 text-white border-primary-600";
                    case 2:
                      return "bg-blue-300 dark:bg-blue-800 text-neutral-900 dark:text-white border-blue-400";
                    case 1:
                      return "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200 border-blue-200/50";
                    default:
                      return "bg-neutral-50 dark:bg-neutral-850 text-neutral-400 border-neutral-200/40 dark:border-neutral-800";
                  }
                };

                return (
                  <div
                    key={hItem.hour}
                    className={`h-7 rounded-lg border text-[10px] font-mono flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${getIntensityClass(
                      hItem.intensity
                    )}`}
                    title={`${row.day} ${hItem.hour}: $${hItem.spend} spend (${hItem.requests} reqs)`}
                  >
                    ${Math.round(hItem.spend)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
