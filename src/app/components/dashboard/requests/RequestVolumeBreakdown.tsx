// src/app/components/dashboard/requests/RequestVolumeBreakdown.tsx
import React, { useState } from "react";
import { MOCK_SPEND_BREAKDOWN, SpendBreakdownRow } from "../dashboardData";

type Dimension = "teams" | "users" | "keys" | "models" | "providers";

export function RequestVolumeBreakdown() {
  const [activeDimension, setActiveDimension] = useState<Dimension>("teams");

  const rows: SpendBreakdownRow[] = MOCK_SPEND_BREAKDOWN[activeDimension] || MOCK_SPEND_BREAKDOWN.teams;

  const getDimensionLabel = (dim: Dimension) => {
    switch (dim) {
      case "teams":
        return "Team";
      case "users":
        return "User";
      case "keys":
        return "Virtual Key";
      case "models":
        return "Model";
      case "providers":
        return "Provider";
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-5 animate-fadeIn">
      {/* Header with Title, Subtitle, and Dimension Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white">
            Request Volume Breakdown
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Ranked contribution by selected entity dimension
          </p>
        </div>

        {/* Dimension Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-850 rounded-xl text-xs shrink-0 self-start sm:self-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 hidden md:inline">
            VIEW BY:
          </span>
          {(
            [
              { id: "teams", label: "Team" },
              { id: "users", label: "User" },
              { id: "keys", label: "Virtual Key" },
              { id: "models", label: "Model" },
              { id: "providers", label: "Provider" },
            ] as const
          ).map((dim) => (
            <button
              key={dim.id}
              type="button"
              onClick={() => setActiveDimension(dim.id)}
              className={`px-3 py-1 rounded-lg font-semibold text-xs transition-all ${
                activeDimension === dim.id
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-bold"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {dim.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rows List */}
      <div className="space-y-4 pt-1">
        {rows.map((row) => (
          <div key={row.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                {row.name}
              </span>
              <div className="font-mono text-xs">
                <span className="font-bold text-neutral-900 dark:text-white">
                  {row.requests.toLocaleString()}
                </span>{" "}
                <span className="text-neutral-400">reqs ({row.percentage}%)</span>
              </div>
            </div>

            <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{ width: `${row.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
