// src/app/components/dashboard/spend-budget/SpendBudgetFilters.tsx
import React from "react";
import { FilterState, MOCK_ORGANIZATIONS, MOCK_TEAMS, MOCK_KEYS, MOCK_PROVIDERS } from "../dashboardData";
import { Filter, RotateCcw } from "lucide-react";

interface SpendBudgetFiltersProps {
  filters: FilterState;
  onChangeFilter: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
}

export function SpendBudgetFilters({ filters, onChangeFilter, onResetFilters }: SpendBudgetFiltersProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white">
          <Filter className="w-4 h-4 text-primary-600" />
          <span>SPEND &amp; BUDGET ANALYTICS FILTERS</span>
        </div>

        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        {/* Org Selector */}
        <div>
          <label className="text-[11px] font-semibold text-neutral-500 block mb-1">Organization</label>
          <select
            value={filters.selectedOrg}
            onChange={(e) => onChangeFilter("selectedOrg", e.target.value)}
            className="w-full h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium"
          >
            {MOCK_ORGANIZATIONS.map((o) => (
              <option key={o.id} value={o.id}>{o.name}</option>
            ))}
          </select>
        </div>

        {/* Team Selector */}
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

        {/* Virtual Key Selector */}
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

        {/* Provider Selector */}
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
      </div>
    </div>
  );
}
