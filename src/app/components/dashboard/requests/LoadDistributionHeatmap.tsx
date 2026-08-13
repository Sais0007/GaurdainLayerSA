// src/app/components/dashboard/requests/LoadDistributionHeatmap.tsx
import React, { useState } from "react";
import { MOCK_HOURLY_HEATMAP_DATA } from "../dashboardData";
import { Activity, Clock, Sparkles } from "lucide-react";

interface HoveredCellInfo {
  day: string;
  hour: string;
  spend: number;
  requests: number;
  tokens: string;
}

export function LoadDistributionHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<HoveredCellInfo>({
    day: "Wed",
    hour: "12:00",
    spend: 73.87,
    requests: 1810,
    tokens: "155.13M",
  });

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Header & Spend Level Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            Hourly Spend Grid & Contribution Graph
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            24-hour breakdown by date showing spend intensity and peak activity windows.
          </p>
        </div>

        {/* Spend Level Legend */}
        <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-500">
          <span>Spend Level:</span>
          <div className="flex items-center gap-1">
            <span className="w-3.5 h-3.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700" title="Low Spend" />
            <span className="w-3.5 h-3.5 rounded bg-indigo-100 dark:bg-indigo-950 border border-indigo-200" title="Light Load" />
            <span className="w-3.5 h-3.5 rounded bg-indigo-300 dark:bg-indigo-800" title="Moderate Load" />
            <span className="w-3.5 h-3.5 rounded bg-indigo-500 text-white" title="High Traffic" />
            <span className="w-3.5 h-3.5 rounded bg-indigo-700 text-white font-bold" title="Peak Hour Spikes" />
          </div>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">+High</span>
        </div>
      </div>

      {/* Grid Heatmap Container */}
      <div className="overflow-x-auto pt-1">
        <div className="min-w-[750px] space-y-2">
          
          {/* Hour Labels Header (0h 1h 2h ... 23h) */}
          <div className="grid grid-cols-[60px_repeat(24,minmax(0,1fr))] gap-1.5 text-[10px] font-mono text-neutral-400 text-center select-none">
            <div className="text-left font-bold text-neutral-500 font-sans">Date</div>
            {Array.from({ length: 24 }).map((_, h) => (
              <div key={h}>{h}h</div>
            ))}
          </div>

          {/* Grid Rows (Mon, Tue, Wed...) */}
          {MOCK_HOURLY_HEATMAP_DATA.map((row) => (
            <div key={row.day} className="grid grid-cols-[60px_repeat(24,minmax(0,1fr))] gap-1.5 items-center">
              <div className="text-xs font-bold text-neutral-700 dark:text-neutral-300 select-none">
                {row.day}
              </div>

              {row.hours.map((hItem) => {
                const isHovered = hoveredCell.day === row.day && hoveredCell.hour === hItem.hour;
                const isPeakText = hItem.intensity >= 4;

                const getCellColor = (intensity: number) => {
                  switch (intensity) {
                    case 4:
                      return "bg-indigo-600 text-white border-indigo-700 font-bold shadow-xs";
                    case 3:
                      return "bg-indigo-500 text-white border-indigo-600";
                    case 2:
                      return "bg-indigo-300 dark:bg-indigo-800 text-neutral-900 dark:text-white border-indigo-400";
                    case 1:
                      return "bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-200 border-indigo-200/50";
                    default:
                      return "bg-neutral-50 dark:bg-neutral-850 text-neutral-400 border-neutral-200/40 dark:border-neutral-800";
                  }
                };

                return (
                  <div
                    key={hItem.hour}
                    onMouseEnter={() =>
                      setHoveredCell({
                        day: row.day,
                        hour: hItem.hour,
                        spend: Math.round((hItem.spend > 100 ? hItem.spend : 143.00) * 100) / 100,
                        requests: hItem.requests * 10,
                        tokens: `${(hItem.requests * 0.085).toFixed(2)}M`,
                      })
                    }
                    className={`h-7 rounded-lg border text-[10px] font-mono flex items-center justify-center transition-all cursor-pointer select-none ${getCellColor(
                      hItem.intensity
                    )} ${isHovered ? "ring-2 ring-indigo-500 scale-110 z-10 shadow-lg" : "hover:scale-105"}`}
                  >
                    {isPeakText ? `$${Math.round(hItem.spend)}` : ""}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Hover Card & 3 Summary Cards Container (Red Box Section) */}
      <div className="pt-5 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
        
        {/* Dark Floating Detail Card */}
        <div className="w-60 p-4 bg-neutral-900 dark:bg-neutral-950 text-white rounded-2xl shadow-xl border border-neutral-800 space-y-2 animate-fadeIn">
          <div className="text-xs font-mono font-bold text-indigo-400">
            {hoveredCell.day} at {hoveredCell.hour}
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 font-medium">Spend:</span>
              <span className="font-mono font-bold text-emerald-400">${hoveredCell.spend.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 font-medium">Requests:</span>
              <span className="font-mono font-bold text-white">{hoveredCell.requests.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 font-medium">Tokens:</span>
              <span className="font-mono font-bold text-purple-300">{hoveredCell.tokens}</span>
            </div>
          </div>
        </div>

        {/* 3 Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          {/* Card 1: Peak Hour Window */}
          <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/50 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase block">Peak Hour Window</span>
              <span className="font-bold text-neutral-900 dark:text-white font-mono">14:00 - 15:00</span>
              <span className="text-neutral-500 text-[11px] ml-1">($142.50 avg spend)</span>
            </div>
          </div>

          {/* Card 2: Business Hours Average */}
          <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/50 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase block">Business Hours Average</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">$46.40 / hour</span>
              <span className="text-neutral-500 text-[11px] ml-1">(09:00 - 17:00)</span>
            </div>
          </div>

          {/* Card 3: Quiet Window Spend */}
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-600 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase block">Quiet Window Spend</span>
              <span className="font-bold text-neutral-900 dark:text-white font-mono">$3.20 / hour</span>
              <span className="text-neutral-500 text-[11px] ml-1">(01:00 - 06:00)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
