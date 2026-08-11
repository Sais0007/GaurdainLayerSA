// src/app/components/dashboard/tokens/TokensDashboard.tsx
import React from "react";
import { FilterState } from "../dashboardData";
import { TokensFilters } from "./TokensFilters";
import { TokensKPICards } from "./TokensKPICards";
import { TokensTrendChart } from "./TokensTrendChart";
import { TokensBreakdownTable } from "./TokensBreakdownTable";

interface TokensDashboardProps {
  filters: FilterState;
  onChangeFilter: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
}

export function TokensDashboard({ filters, onChangeFilter, onResetFilters }: TokensDashboardProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Filter Bar with Token Type Selector */}
      <TokensFilters filters={filters} onChangeFilter={onChangeFilter} onResetFilters={onResetFilters} />

      {/* 10 KPI Cards (5x2 Grid) */}
      <TokensKPICards />

      {/* Hero Stacked Bar Chart */}
      <TokensTrendChart />

      {/* Token Consumption Breakdown Table */}
      <TokensBreakdownTable />
    </div>
  );
}
