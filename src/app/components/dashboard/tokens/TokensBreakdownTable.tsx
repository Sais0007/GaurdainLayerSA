// src/app/components/dashboard/tokens/TokensBreakdownTable.tsx
import React, { useState } from "react";
import { MOCK_SPEND_BREAKDOWN, SpendBreakdownRow } from "../dashboardData";
import { Layers } from "lucide-react";

export function TokensBreakdownTable() {
  const [dimension, setDimension] = useState<"teams" | "models" | "providers">("models");
  const rows: SpendBreakdownRow[] = MOCK_SPEND_BREAKDOWN[dimension] || [];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            Token Payload Progress Breakdown (Input vs Output)
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Dual-color prompt (Blue) and completion (Green) payload track distribution.</p>
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
        {rows.map((row) => {
          const inputPct = Math.round(row.percentage * 0.65);
          const outputPct = Math.round(row.percentage * 0.35);

          return (
            <div key={row.id} className="space-y-1.5 p-3.5 rounded-xl bg-neutral-50/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-white">{row.name}</span>
                <div className="font-mono text-neutral-600 dark:text-neutral-400">
                  <span className="font-bold text-neutral-900 dark:text-white">{row.tokens}</span> Tokens ({row.percentage}%)
                </div>
              </div>

              {/* Dual Stacked Progress Track */}
              <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-3 rounded-full overflow-hidden flex">
                <div className="bg-blue-500 h-full transition-all" style={{ width: `${inputPct}%` }} title={`Input Tokens: ${inputPct}%`} />
                <div className="bg-emerald-500 h-full transition-all" style={{ width: `${outputPct}%` }} title={`Output Tokens: ${outputPct}%`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
