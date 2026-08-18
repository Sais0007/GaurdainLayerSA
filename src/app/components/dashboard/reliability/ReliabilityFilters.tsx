// src/app/components/dashboard/reliability/ReliabilityFilters.tsx
import React from "react";
import { FilterState, MOCK_TEAMS, MOCK_KEYS, MOCK_PROVIDERS, MOCK_MODELS } from "../dashboardData";
import { Filter, RotateCcw, ShieldAlert } from "lucide-react";

interface ReliabilityFiltersProps {
  filters: FilterState;
  onChangeFilter: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  onInspectTrace: () => void;
}

export function ReliabilityFilters({ filters, onChangeFilter, onResetFilters, onInspectTrace }: ReliabilityFiltersProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white">
          <Filter className="w-4 h-4 text-rose-600" />
          <span>RELIABILITY &amp; SLA DIAGNOSTICS FILTERS</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onInspectTrace}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors"
          >
            <ShieldAlert className="w-4 h-4" />
            Inspect Incident Trace Logs
          </button>

          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
        <div>
          <label className="text-[11px] font-semibold text-neutral-500 block mb-1">Error Category</label>
          <select
            value={filters.selectedErrorCategory}
            onChange={(e) => onChangeFilter("selectedErrorCategory", e.target.value as FilterState["selectedErrorCategory"])}
            className="w-full h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium"
          >
            <option value="all">All Error Categories</option>
            <option value="503">503 Service Unavailable</option>
            <option value="504">504 Gateway Timeout</option>
            <option value="429_rpm">429 RPM Limit Exceeded</option>
            <option value="429_tpm">429 TPM Limit Exceeded</option>
            <option value="402">402 Budget Exceeded</option>
            <option value="401">401 Auth Failure</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-neutral-500 block mb-1">Team</label>
          <select
            value={filters.selectedTeam}
            onChange={(e) => onChangeFilter("selectedTeam", e.target.value)}
            className="w-full h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium"
          >
            {MOCK_TEAMS.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-neutral-500 block mb-1">Virtual Key</label>
          <select
            value={filters.selectedKey}
            onChange={(e) => onChangeFilter("selectedKey", e.target.value)}
            className="w-full h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium"
          >
            {MOCK_KEYS.map((k) => (
              <option key={k.id} value={k.id}>{k.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-neutral-500 block mb-1">Provider</label>
          <select
            value={filters.selectedProvider}
            onChange={(e) => onChangeFilter("selectedProvider", e.target.value)}
            className="w-full h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium"
          >
            {MOCK_PROVIDERS.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-semibold text-neutral-500 block mb-1">Model</label>
          <select
            value={filters.selectedModel}
            onChange={(e) => onChangeFilter("selectedModel", e.target.value)}
            className="w-full h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium"
          >
            {MOCK_MODELS.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
