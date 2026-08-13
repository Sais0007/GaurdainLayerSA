// src/app/components/Dashboard.tsx
import React, { useState } from "react";
import {
  LayoutDashboard,
  DollarSign,
  Zap,
  Cpu,
  ShieldCheck,
  Activity,
  RefreshCw,
  Download,
  Building2,
  Calendar,
  GitCompare,
  BarChart2,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "./hb/listing/PageHeader";

// Internal Subcomponents & Modals
import { FilterState, MOCK_ORGANIZATIONS } from "./dashboard/dashboardData";
import { FinancialHealthOverview } from "./dashboard/FinancialHealthOverview";
import { OperationalHealthOverview } from "./dashboard/OperationalHealthOverview";
import { BudgetBurnForecastChart } from "./dashboard/BudgetBurnForecastChart";
import { SpendBreakdownTable } from "./dashboard/SpendBreakdownTable";
import { HourlySpendGridHeatmap } from "./dashboard/HourlySpendGridHeatmap";

import { SpendBudgetDashboard } from "./dashboard/spend-budget/SpendBudgetDashboard";
import { RequestsDashboard } from "./dashboard/requests/RequestsDashboard";
import { TokensDashboard } from "./dashboard/tokens/TokensDashboard";
import { ReliabilityDashboard } from "./dashboard/reliability/ReliabilityDashboard";
import { CapacityDashboard } from "./dashboard/capacity/CapacityDashboard";

import { AuditTraceInspectorModal } from "./AuditTraceInspectorModal";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { DashboardEmptyState } from "./DashboardEmptyState";
import { DashboardErrorState } from "./DashboardErrorState";

export type DashboardTab = "overview" | "spend" | "requests" | "tokens" | "reliability" | "capacity";

const INITIAL_FILTERS: FilterState = {
  selectedOrg: "all",
  timeRange: "30d",
  comparison: "previous_period",
  granularity: "daily",
  selectedTeam: "all",
  selectedUser: "all",
  selectedKey: "all",
  selectedProvider: "all",
  selectedModel: "all",
  selectedOutcome: "all",
  selectedTokenType: "all",
  selectedErrorCategory: "all",
  selectedLimitType: "all",
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [pageState, setPageState] = useState<"normal" | "loading" | "empty" | "error">("normal");
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [activeTraceId, setActiveTraceId] = useState<string | undefined>(undefined);

  // Filter Handler (Updates telemetry context seamlessly without page reload)
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === "selectedOrg") {
      const selectedOrgName = MOCK_ORGANIZATIONS.find((o) => o.id === value)?.name || value;
      toast.info(`Switched active organization scope to ${selectedOrgName}`);
    }
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setPageState("normal");
    toast.success("Diagnostic filters reset to platform defaults.");
  };

  // Action Handlers
  const handleRefresh = () => {
    setPageState("loading");
    setTimeout(() => {
      setPageState("normal");
      toast.success("Telemetry stream re-synchronized successfully.");
    }, 600);
  };

  const handleExportCSV = () => {
    const selectedOrgName = MOCK_ORGANIZATIONS.find((o) => o.id === filters.selectedOrg)?.name || "All Organizations";
    const csvHeader = "Timestamp,Organization,VirtualKey,Team,Provider,Model,StatusCode,LatencyMs,PromptTokens,CompletionTokens,CostUSD\n";
    const sampleRow = `2026-08-11 14:42:19,${selectedOrgName},marketing-prod-key,Marketing Content Gen,Anthropic,Claude 3.5 Sonnet,503,12450,4280,0,0.0128\n`;
    const blob = new Blob([csvHeader + sampleRow], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `superadmin_telemetry_${filters.selectedOrg}_${activeTab}_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${selectedOrgName} telemetry report to CSV.`);
  };

  const handleOpenInspector = (traceId?: string) => {
    setActiveTraceId(traceId);
    setIsInspectorOpen(true);
  };

  // Render Skeleton when Loading
  if (pageState === "loading") {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto space-y-6 animate-fadeIn">
      
      {/* HB Listing Page Header */}
      <PageHeader pageId="dashboard" action="list" />

      {/* Global Filter Toolbar: Organization -> Time Period -> Comparison -> Granularity + Actions */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Filters Left Section */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* 1. Global Organization Selector */}
          <div className="flex items-center gap-2 min-w-[220px]">
            <Building2 className="w-4 h-4 text-primary-600 shrink-0" />
            <div className="flex-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                Organization Scope
              </label>
              <select
                value={filters.selectedOrg}
                onChange={(e) => handleFilterChange("selectedOrg", e.target.value)}
                className="w-full h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-bold text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-hidden transition-all"
              >
                {MOCK_ORGANIZATIONS.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />

          {/* 2. Time Period Selector */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                Time Period
              </label>
              <div className="flex items-center gap-1 p-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-xs">
                {(
                  [
                    { id: "7d", label: "7 Days" },
                    { id: "30d", label: "30 Days" },
                    { id: "90d", label: "90 Days" },
                    { id: "ytd", label: "YTD" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleFilterChange("timeRange", t.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-all ${
                      filters.timeRange === t.id
                        ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-bold"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />

          {/* 3. Comparison Selector */}
          <div className="flex items-center gap-2">
            <GitCompare className="w-4 h-4 text-neutral-400 shrink-0" />
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                Comparison
              </label>
              <select
                value={filters.comparison}
                onChange={(e) => handleFilterChange("comparison", e.target.value as FilterState["comparison"])}
                className="h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-semibold text-neutral-800 dark:text-neutral-200"
              >
                <option value="previous_period">Previous Period</option>
                <option value="same_period_last_year">Same Period Last Year</option>
                <option value="none">No Comparison</option>
              </select>
            </div>
          </div>

          <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />

          {/* 4. Granularity Selector */}
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-neutral-400 shrink-0" />
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                Granularity
              </label>
              <select
                value={filters.granularity}
                onChange={(e) => handleFilterChange("granularity", e.target.value as FilterState["granularity"])}
                className="h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-semibold text-neutral-800 dark:text-neutral-200"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

        </div>

        {/* Action Buttons (Right Aligned) */}
        <div className="flex items-center gap-2.5 shrink-0 ml-auto">
          <button
            type="button"
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 transition-colors shadow-2xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500"
            title="Refresh Telemetry Stream"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-bold transition-colors shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <Download className="w-4 h-4" />
            Export Telemetry
          </button>
        </div>

      </div>

      {/* 6 Main Dashboard Tab Navigation Router (Clean HB Tab Strip) */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-6 pt-3 shadow-xs">
        <div className="flex items-center gap-6 overflow-x-auto border-b border-neutral-200 dark:border-neutral-800">
          {(
            [
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "spend", label: "Spend & Budget", icon: DollarSign },
              { id: "requests", label: "Requests", icon: Zap },
              { id: "tokens", label: "Tokens", icon: Cpu },
              { id: "reliability", label: "Reliability", icon: ShieldCheck },
              { id: "capacity", label: "Capacity", icon: Activity },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  isActive
                    ? "border-primary-600 text-primary-600 dark:text-primary-400 font-bold"
                    : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content Router */}
      {pageState === "error" ? (
        <DashboardErrorState onRetry={() => setPageState("normal")} />
      ) : pageState === "empty" ? (
        <DashboardEmptyState onResetFilters={handleResetFilters} />
      ) : (
        <div className="space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fadeIn">
              <FinancialHealthOverview />
              <OperationalHealthOverview />
              <BudgetBurnForecastChart />
              <SpendBreakdownTable onInspectTrace={handleOpenInspector} />
              <HourlySpendGridHeatmap />
            </div>
          )}

          {/* TAB 2: SPEND & BUDGET */}
          {activeTab === "spend" && (
            <SpendBudgetDashboard
              filters={filters}
              onChangeFilter={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          )}

          {/* TAB 3: REQUESTS */}
          {activeTab === "requests" && (
            <RequestsDashboard
              filters={filters}
              onChangeFilter={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          )}

          {/* TAB 4: TOKENS */}
          {activeTab === "tokens" && (
            <TokensDashboard
              filters={filters}
              onChangeFilter={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          )}

          {/* TAB 5: RELIABILITY & SLA */}
          {activeTab === "reliability" && (
            <ReliabilityDashboard
              filters={filters}
              onChangeFilter={handleFilterChange}
              onResetFilters={handleResetFilters}
              onInspectTrace={handleOpenInspector}
            />
          )}

          {/* TAB 6: CAPACITY & THROUGHPUT */}
          {activeTab === "capacity" && (
            <CapacityDashboard
              filters={filters}
              onChangeFilter={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
          )}
        </div>
      )}

      {/* Global Audit & Incident Trace Inspector Modal */}
      <AuditTraceInspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        initialTraceId={activeTraceId}
      />
    </div>
  );
}
