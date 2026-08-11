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
      {/* Filter Bar */}
      <RequestsFilters filters={filters} onChangeFilter={onChangeFilter} onResetFilters={onResetFilters} />

      {/* 10 KPI Cards (5x2 Grid) */}
      <RequestsKPICards />

      {/* Hero Chart: Request Volume Trend */}
      <RequestVolumeTrend />

      {/* 50% Row: Volume Breakdown & Load Distribution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RequestVolumeBreakdown />
        <LoadDistributionHeatmap />
      </div>
    </div>
  );
}
