// src/app/components/dashboard/requests/LoadDistributionHeatmap.tsx
import React from "react";
import { MOCK_HOURLY_HEATMAP_DATA } from "../dashboardData";
import { Activity } from "lucide-react";

export function LoadDistributionHeatmap() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-500" />
            Peak Failure & Load Distribution Grid (24h x 7-Day)
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Identify recurring request traffic clusters and peak hour concurrency loads.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto pt-2">
        <div className="min-w-[750px] space-y-2">
          <div className="grid grid-cols-[60px_repeat(24,minmax(0,1fr))] gap-1.5 text-[10px] font-mono text-neutral-400 text-center select-none">
            <div className="text-left font-bold text-neutral-500 font-sans">Day</div>
            {Array.from({ length: 24 }).map((_, h) => (
              <div key={h}>{h.toString().padStart(2, "0")}</div>
            ))}
          </div>

          {MOCK_HOURLY_HEATMAP_DATA.map((row) => (
            <div key={row.day} className="grid grid-cols-[60px_repeat(24,minmax(0,1fr))] gap-1.5 items-center">
              <div className="text-xs font-bold text-neutral-700 dark:text-neutral-300 select-none">
                {row.day}
              </div>

              {row.hours.map((hItem) => {
                const getBg = (intensity: number) => {
                  switch (intensity) {
                    case 4: return "bg-rose-600 text-white font-bold";
                    case 3: return "bg-amber-500 text-white";
                    case 2: return "bg-blue-400 text-neutral-900";
                    case 1: return "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200";
                    default: return "bg-neutral-50 dark:bg-neutral-850 text-neutral-400";
                  }
                };

                return (
                  <div
                    key={hItem.hour}
                    className={`h-7 rounded-lg border border-neutral-200/40 dark:border-neutral-800 text-[10px] font-mono flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${getBg(
                      hItem.intensity
                    )}`}
                    title={`${row.day} ${hItem.hour}: ${hItem.requests} requests`}
                  >
                    {hItem.requests > 1000 ? `${(hItem.requests / 1000).toFixed(1)}k` : hItem.requests}
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
