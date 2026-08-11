// src/app/components/dashboard/spend-budget/SpendBudgetDashboard.tsx
import React from "react";
import { FilterState } from "../dashboardData";
import { SpendBudgetFilters } from "./SpendBudgetFilters";
import { SpendKPICards } from "./SpendKPICards";
import { BudgetBurnTrajectory } from "./BudgetBurnTrajectory";
import { TeamBudgetUtilization } from "./TeamBudgetUtilization";
import { VirtualKeyBudgetUtilization } from "./VirtualKeyBudgetUtilization";
import { SpendDistributionCard } from "./SpendDistributionCard";
import { TopConsumersCard } from "./TopConsumersCard";
import { BudgetAlertsCard } from "./BudgetAlertsCard";
import { CostOptimizationCard } from "./CostOptimizationCard";

interface SpendBudgetDashboardProps {
  filters: FilterState;
  onChangeFilter: (key: keyof FilterState, value: string) => void;
  onResetFilters: () => void;
}

export function SpendBudgetDashboard({ filters, onChangeFilter, onResetFilters }: SpendBudgetDashboardProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Filter Bar */}
      <SpendBudgetFilters filters={filters} onChangeFilter={onChangeFilter} onResetFilters={onResetFilters} />

      {/* 4 Strategic KPI Cards */}
      <SpendKPICards />

      {/* Hero Analytics Chart: Budget Burn Trajectory */}
      <BudgetBurnTrajectory />

      {/* 50% Row: Team Budget Utilization & Virtual Key Budget Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamBudgetUtilization />
        <VirtualKeyBudgetUtilization />
      </div>

      {/* 2x2 Spend Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendDistributionCard />
        <TopConsumersCard />
        <BudgetAlertsCard />
        <CostOptimizationCard />
      </div>
    </div>
  );
}
