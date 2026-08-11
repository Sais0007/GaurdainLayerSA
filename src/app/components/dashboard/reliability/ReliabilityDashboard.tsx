// src/app/components/dashboard/reliability/ReliabilityDashboard.tsx
import React from "react";
import { FilterState } from "../dashboardData";
import { ReliabilityFilters } from "./ReliabilityFilters";
import { ReliabilityKPICards } from "./ReliabilityKPICards";
import { SuccessFailureTimeline } from "./SuccessFailureTimeline";
import { OperationalMatrixTable } from "./OperationalMatrixTable";
import { FailureCauseDistribution } from "./FailureCauseDistribution";

interface ReliabilityDashboardProps {
  filters: FilterState;
  onChangeFilter: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
  onInspectTrace: (id?: string) => void;
}

export function ReliabilityDashboard({ filters, onChangeFilter, onResetFilters, onInspectTrace }: ReliabilityDashboardProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Filter Bar with Inspect Incident Trace Logs Button */}
      <ReliabilityFilters
        filters={filters}
        onChangeFilter={onChangeFilter}
        onResetFilters={onResetFilters}
        onInspectTrace={() => onInspectTrace()}
      />

      {/* 10 SLA KPI Cards (2 Rows) */}
      <ReliabilityKPICards />

      {/* Hero Stacked Bar Timeline Chart */}
      <SuccessFailureTimeline />

      {/* Model & Provider Operational Matrix Table */}
      <OperationalMatrixTable onInspectTrace={onInspectTrace} />

      {/* Root Cause Failure Cause Distribution (2-Column Grid) */}
      <FailureCauseDistribution />
    </div>
  );
}
