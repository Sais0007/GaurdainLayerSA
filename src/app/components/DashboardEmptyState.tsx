// src/app/components/DashboardEmptyState.tsx
import React from "react";
import { FilterX, RotateCcw } from "lucide-react";

interface DashboardEmptyStateProps {
  onResetFilters: () => void;
}

export function DashboardEmptyState({ onResetFilters }: DashboardEmptyStateProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center shadow-xs space-y-5 my-6 flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400 dark:text-neutral-500 shadow-inner">
        <FilterX className="w-8 h-8" />
      </div>

      <div className="space-y-1 max-w-md">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
          No Telemetry Data Matches Active Filters
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          No API telemetry records found for the selected team, user, virtual key, or timeframe combination. Try adjusting your diagnostic filter bar.
        </p>
      </div>

      <button
        type="button"
        onClick={onResetFilters}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
      >
        <RotateCcw className="w-4 h-4" />
        Reset All Diagnostic Filters
      </button>
    </div>
  );
}
