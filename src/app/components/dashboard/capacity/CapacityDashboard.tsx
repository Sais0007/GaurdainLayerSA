// src/app/components/dashboard/capacity/CapacityDashboard.tsx
import React from "react";
import { FilterState } from "../dashboardData";
import { CapacityFilters } from "./CapacityFilters";
import { CapacityKPICards } from "./CapacityKPICards";
import { RpmThroughputChart } from "./RpmThroughputChart";
import { TpmThroughputChart } from "./TpmThroughputChart";
import { VirtualKeysCapacityList } from "./VirtualKeysCapacityList";

interface CapacityDashboardProps {
  filters: FilterState;
  onChangeFilter: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
}

export function CapacityDashboard({ filters, onChangeFilter, onResetFilters }: CapacityDashboardProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Filter Bar */}
      <CapacityFilters filters={filters} onChangeFilter={onChangeFilter} onResetFilters={onResetFilters} />

      {/* 10 Throttle KPI Cards (2 Rows) */}
      <CapacityKPICards />

      {/* 50% Row: RPM Throughput Chart & TPM Throughput Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RpmThroughputChart />
        <TpmThroughputChart />
      </div>

      {/* Virtual Keys Capacity & Throttle Risk Analysis */}
      <VirtualKeysCapacityList />
    </div>
  );
}
