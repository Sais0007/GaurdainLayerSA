// src/app/components/dashboard/requests/RequestsDashboard.tsx
import React from "react";
import { FilterState } from "../dashboardData";
import { RequestsFilters } from "./RequestsFilters";
import { RequestsKPICards } from "./RequestsKPICards";
import { RequestVolumeTrend } from "./RequestVolumeTrend";
import { RequestVolumeBreakdown } from "./RequestVolumeBreakdown";
import { LoadDistributionHeatmap } from "./LoadDistributionHeatmap";

interface RequestsDashboardProps {
  filters: FilterState;
  onChangeFilter: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
}

export function RequestsDashboard({ filters, onChangeFilter, onResetFilters }: RequestsDashboardProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Diagnostic Filter Bar */}
      <RequestsFilters filters={filters} onChangeFilter={onChangeFilter} onResetFilters={onResetFilters} />

      {/* 2. 10 KPI Cards (5x2 Grid) */}
      <RequestsKPICards />

      {/* 3. Hero Trajectory Chart */}
      <RequestVolumeTrend />

      {/* 4. Request Volume Progress Breakdown (3 Sections: Models, Teams, Providers) */}
      <RequestVolumeBreakdown />

      {/* 5. Full Width Bottom Section: Peak Failure & Load Distribution Grid */}
      <LoadDistributionHeatmap />
    </div>
  );
}
