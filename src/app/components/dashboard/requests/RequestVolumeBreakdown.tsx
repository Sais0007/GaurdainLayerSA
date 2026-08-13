// src/app/components/dashboard/requests/RequestVolumeBreakdown.tsx
import React from "react";
import { MOCK_SPEND_BREAKDOWN, SpendBreakdownRow } from "../dashboardData";
import { Cpu, Users, Building2 } from "lucide-react";

export function RequestVolumeBreakdown() {
  const modelsRows: SpendBreakdownRow[] = MOCK_SPEND_BREAKDOWN.models || [];
  const teamsRows: SpendBreakdownRow[] = MOCK_SPEND_BREAKDOWN.teams || [];
  const providersRows: SpendBreakdownRow[] = MOCK_SPEND_BREAKDOWN.providers || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 1. Models Breakdown */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            Models Breakdown
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Request volume distribution by AI Model.</p>
        </div>

        <div className="space-y-3 pt-1">
          {modelsRows.map((row) => (
            <div key={row.id} className="space-y-1.5 p-3 rounded-xl bg-neutral-50/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-white truncate max-w-[130px] sm:max-w-[160px]" title={row.name}>
                  {row.name}
                </span>
                <div className="font-mono text-neutral-600 dark:text-neutral-400 text-[11px] shrink-0">
                  <span className="font-bold text-neutral-900 dark:text-white">{row.requests.toLocaleString()}</span> reqs ({row.percentage}%)
                </div>
              </div>

              <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${row.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Teams Breakdown */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Teams Breakdown
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Request volume distribution by Team.</p>
        </div>

        <div className="space-y-3 pt-1">
          {teamsRows.map((row) => (
            <div key={row.id} className="space-y-1.5 p-3 rounded-xl bg-neutral-50/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-white truncate max-w-[130px] sm:max-w-[160px]" title={row.name}>
                  {row.name}
                </span>
                <div className="font-mono text-neutral-600 dark:text-neutral-400 text-[11px] shrink-0">
                  <span className="font-bold text-neutral-900 dark:text-white">{row.requests.toLocaleString()}</span> reqs ({row.percentage}%)
                </div>
              </div>

              <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full transition-all" style={{ width: `${row.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Providers Breakdown */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            Providers Breakdown
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">Request volume distribution by Provider.</p>
        </div>

        <div className="space-y-3 pt-1">
          {providersRows.map((row) => (
            <div key={row.id} className="space-y-1.5 p-3 rounded-xl bg-neutral-50/60 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 dark:text-white truncate max-w-[130px] sm:max-w-[160px]" title={row.name}>
                  {row.name}
                </span>
                <div className="font-mono text-neutral-600 dark:text-neutral-400 text-[11px] shrink-0">
                  <span className="font-bold text-neutral-900 dark:text-white">{row.requests.toLocaleString()}</span> reqs ({row.percentage}%)
                </div>
              </div>

              <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: `${row.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
