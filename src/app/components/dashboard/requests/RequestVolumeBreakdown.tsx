// src/app/components/dashboard/requests/RequestVolumeBreakdown.tsx
import React, { useState } from "react";
import { MOCK_SPEND_BREAKDOWN, SpendBreakdownRow } from "../dashboardData";
import { Layers } from "lucide-react";

export function RequestVolumeBreakdown() {
  const [dimension, setDimension] = useState<"teams" | "models" | "providers">("models");
  const rows: SpendBreakdownRow[] = MOCK_SPEND_BREAKDOWN[dimension] || [];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary-600" />
            Request Volume Progress Breakdown
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Request volume distribution across top dimensions.</p>
        </div>

        <div className="flex gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => setDimension("models")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${dimension === "models" ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold shadow-2xs" : "text-neutral-500"}`}
          >
            Models
          </button>
          <button
            type="button"
            onClick={() => setDimension("teams")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${dimension === "teams" ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold shadow-2xs" : "text-neutral-500"}`}
          >
            Teams
          </button>
          <button
            type="button"
            onClick={() => setDimension("providers")}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${dimension === "providers" ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold shadow-2xs" : "text-neutral-500"}`}
          >
            Providers
          </button>
        </div>
      </div>

      <div className="space-y-4 pt-1">
        {rows.map((row) => (
          <div key={row.id} className="space-y-1.5 p-3 rounded-xl bg-neutral-50/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900 dark:text-white">{row.name}</span>
              <div className="font-mono text-neutral-600 dark:text-neutral-400">
                <span className="font-bold text-neutral-900 dark:text-white">{row.requests.toLocaleString()}</span> reqs ({row.percentage}%)
              </div>
            </div>

            <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${row.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
