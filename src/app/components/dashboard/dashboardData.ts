// src/app/components/dashboard/dashboardData.ts
// Enterprise AI Gateway Analytics Dashboard - Data Models & Mock Generators

export interface FilterState {
  timeRange: "7d" | "30d" | "90d" | "ytd";
  selectedOrg: string;
  comparison: "previous_period" | "same_period_last_year" | "none";
  granularity: "hourly" | "daily" | "weekly" | "monthly";
  selectedTeam: string;
  selectedUser: string;
  selectedKey: string;
  selectedProvider: string;
  selectedModel: string;
  selectedOutcome: "all" | "success" | "client_error" | "server_error";
  selectedTokenType: "all" | "input" | "output" | "cached";
  selectedErrorCategory: "all" | "503" | "504" | "429_rpm" | "429_tpm" | "402" | "401";
  selectedLimitType: "all" | "rpm" | "tpm";
}

export interface IncidentTraceLog {
  id: string;
  timestamp: string;
  virtualKey: string;
  team: string;
  user: string;
  provider: string;
  model: string;
  statusCode: number;
  errorCategory: string;
  latencyMs: number;
  promptTokens: number;
  completionTokens: number;
  cost: number;
  promptSnippet: string;
  errorPayload: string;
}

// ----------------------------------------------------------------------
// Mock Data Collections
// ----------------------------------------------------------------------

export const MOCK_ORGANIZATIONS = [
  { id: "all", name: "All Organizations" },
  { id: "abc-healthcare", name: "ABC Healthcare" },
  { id: "xyz-hospital", name: "XYZ Hospital" },
  { id: "guardian-labs", name: "Guardian Labs" },
  { id: "hiddenbrains-demo", name: "HiddenBrains Demo" },
  { id: "spinecloud", name: "SpineCloud Enterprise" },
  { id: "apex-fintech", name: "Apex Global FinTech" },
  { id: "biohealth", name: "BioHealth IQ" },
];

export const MOCK_TEAMS = [
  { id: "all", name: "All Teams" },
  { id: "team-1", name: "Research & AI Development" },
  { id: "team-2", name: "Customer Support Engineering" },
  { id: "team-3", name: "Marketing Content Gen" },
  { id: "team-4", name: "Financial Risk Modeling" },
  { id: "team-5", name: "Legal Document Processing" },
];

export const MOCK_USERS = [
  { id: "all", name: "All Users" },
  { id: "user-1", name: "Dr. Sarah Chen (Lead AI Scientist)" },
  { id: "user-2", name: "Alex Rivera (Senior DevOps)" },
  { id: "user-3", name: "Elena Rostova (Lead Data Analyst)" },
  { id: "user-4", name: "Marcus Vance (FullStack Engineer)" },
  { id: "user-5", name: "David Kim (ML Engineer)" },
];

export const MOCK_KEYS = [
  { id: "all", name: "All Virtual Keys" },
  { id: "key-1", name: "research-analysis-key (sk-grd-8492)" },
  { id: "key-2", name: "support-prod-key (sk-grd-1039)" },
  { id: "key-3", name: "marketing-prod-key (sk-grd-5510)" },
  { id: "key-4", name: "fintech-risk-key (sk-grd-9921)" },
  { id: "key-5", name: "legal-doc-key (sk-grd-3381)" },
];

export const MOCK_PROVIDERS = [
  { id: "all", name: "All Providers" },
  { id: "Anthropic", name: "Anthropic" },
  { id: "OpenAI", name: "OpenAI" },
  { id: "Google Gemini", name: "Google Gemini" },
  { id: "Meta", name: "Meta (Llama)" },
  { id: "DeepSeek", name: "DeepSeek" },
];

export const MOCK_MODELS = [
  { id: "all", name: "All Models" },
  { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet" },
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro" },
  { id: "deepseek-r1", name: "DeepSeek R1" },
  { id: "llama-3-3-70b", name: "Llama 3.3 70B" },
];

// Helper to scale data based on selected Organization
export function getOrgMultiplier(orgId: string): number {
  switch (orgId) {
    case "abc-healthcare": return 1.15;
    case "xyz-hospital": return 0.85;
    case "guardian-labs": return 1.35;
    case "hiddenbrains-demo": return 0.65;
    case "spinecloud": return 1.25;
    case "apex-fintech": return 0.95;
    case "biohealth": return 0.75;
    default: return 1.0;
  }
}

// Budget Burn Trajectory Data (30 Days)
export const getBudgetBurnData = (orgId: string = "all") => {
  const mult = getOrgMultiplier(orgId);
  return Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const ceiling = Math.round(10000 * mult);
    const expectedSpend = Math.round(((ceiling) / 30) * day * 100) / 100;
    let actualSpend: number | null = null;
    if (day <= 24) {
      actualSpend = Math.round((expectedSpend * (0.9 + (i % 5) * 0.03)) * 100) / 100;
    }
    const forecastSpend = Math.round((expectedSpend * 0.94) * 100) / 100;

    return {
      day: `Day ${day}`,
      date: `Aug ${day}`,
      actualSpend,
      expectedSpend,
      forecastSpend,
      budgetCeiling: ceiling,
    };
  });
};

export const MOCK_BUDGET_BURN_DATA = getBudgetBurnData("all");

// Hourly Spend Grid Heatmap Data (24 Hours x 7 Days)
export const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const getHourlyHeatmapData = (orgId: string = "all") => {
  const mult = getOrgMultiplier(orgId);
  return DAYS_OF_WEEK.map((day) => {
    const hours = Array.from({ length: 24 }, (_, h) => {
      const isPeak = h >= 9 && h <= 17;
      const baseValue = (isPeak ? 180 + Math.sin(h) * 120 : 25 + Math.random() * 40) * mult;
      const intensity = isPeak ? (baseValue > 250 ? 4 : baseValue > 180 ? 3 : 2) : baseValue > 40 ? 1 : 0;
      return {
        hour: `${h.toString().padStart(2, "0")}:00`,
        spend: Math.round(baseValue * 10) / 10,
        requests: Math.round(baseValue * 12),
        intensity,
      };
    });
    return { day, hours };
  });
};

export const MOCK_HOURLY_HEATMAP_DATA = getHourlyHeatmapData("all");

// Spend Breakdown Dimension Data
export interface SpendBreakdownRow {
  id: string;
  name: string;
  category: string;
  spend: number;
  requests: number;
  tokens: string;
  percentage: number;
  status: "Healthy" | "Near Limit" | "Warning" | "Exceeded";
}

export const getSpendBreakdown = (orgId: string = "all"): Record<string, SpendBreakdownRow[]> => {
  const mult = getOrgMultiplier(orgId);
  return {
    teams: [
      { id: "t1", name: "Research & AI Development", category: "Team", spend: Math.round(3240.50 * mult * 100) / 100, requests: Math.round(62400 * mult), tokens: `${(5.8 * mult).toFixed(1)}B`, percentage: 40.2, status: "Healthy" },
      { id: "t2", name: "Customer Support Engineering", category: "Team", spend: Math.round(2150.00 * mult * 100) / 100, requests: Math.round(58200 * mult), tokens: `${(4.2 * mult).toFixed(1)}B`, percentage: 26.7, status: "Near Limit" },
      { id: "t3", name: "Marketing Content Gen", category: "Team", spend: Math.round(1420.75 * mult * 100) / 100, requests: Math.round(31000 * mult), tokens: `${(3.1 * mult).toFixed(1)}B`, percentage: 17.6, status: "Warning" },
      { id: "t4", name: "Financial Risk Modeling", category: "Team", spend: Math.round(840.25 * mult * 100) / 100, requests: Math.round(18400 * mult), tokens: `${(2.1 * mult).toFixed(1)}B`, percentage: 10.4, status: "Healthy" },
      { id: "t5", name: "Legal Document Processing", category: "Team", spend: Math.round(398.50 * mult * 100) / 100, requests: Math.round(12640 * mult), tokens: `${(1.2 * mult).toFixed(1)}B`, percentage: 5.1, status: "Healthy" },
    ],
    users: [
      { id: "u1", name: "Dr. Sarah Chen", category: "User", spend: Math.round(1840.00 * mult * 100) / 100, requests: Math.round(34200 * mult), tokens: `${(3.2 * mult).toFixed(1)}B`, percentage: 22.8, status: "Healthy" },
      { id: "u2", name: "Alex Rivera", category: "User", spend: Math.round(1450.50 * mult * 100) / 100, requests: Math.round(28900 * mult), tokens: `${(2.8 * mult).toFixed(1)}B`, percentage: 18.0, status: "Near Limit" },
      { id: "u3", name: "Elena Rostova", category: "User", spend: Math.round(1210.00 * mult * 100) / 100, requests: Math.round(24100 * mult), tokens: `${(2.1 * mult).toFixed(1)}B`, percentage: 15.0, status: "Healthy" },
      { id: "u4", name: "Marcus Vance", category: "User", spend: Math.round(980.25 * mult * 100) / 100, requests: Math.round(19800 * mult), tokens: `${(1.9 * mult).toFixed(1)}B`, percentage: 12.2, status: "Warning" },
      { id: "u5", name: "David Kim", category: "User", spend: Math.round(640.00 * mult * 100) / 100, requests: Math.round(14200 * mult), tokens: `${(1.4 * mult).toFixed(1)}B`, percentage: 8.0, status: "Healthy" },
    ],
    virtual_keys: [
      { id: "vk1", name: "research-analysis-key", category: "Virtual Key", spend: Math.round(2890.00 * mult * 100) / 100, requests: Math.round(52100 * mult), tokens: `${(4.9 * mult).toFixed(1)}B`, percentage: 35.9, status: "Healthy" },
      { id: "vk2", name: "support-prod-key", category: "Virtual Key", spend: Math.round(2150.00 * mult * 100) / 100, requests: Math.round(58200 * mult), tokens: `${(4.2 * mult).toFixed(1)}B`, percentage: 26.7, status: "Near Limit" },
      { id: "vk3", name: "marketing-prod-key", category: "Virtual Key", spend: Math.round(1420.75 * mult * 100) / 100, requests: Math.round(31000 * mult), tokens: `${(3.1 * mult).toFixed(1)}B`, percentage: 17.6, status: "Exceeded" },
      { id: "vk4", name: "fintech-risk-key", category: "Virtual Key", spend: Math.round(840.25 * mult * 100) / 100, requests: Math.round(18400 * mult), tokens: `${(2.1 * mult).toFixed(1)}B`, percentage: 10.4, status: "Healthy" },
      { id: "vk5", name: "legal-doc-key", category: "Virtual Key", spend: Math.round(398.50 * mult * 100) / 100, requests: Math.round(12640 * mult), tokens: `${(1.2 * mult).toFixed(1)}B`, percentage: 5.1, status: "Healthy" },
    ],
    models: [
      { id: "m1", name: "Claude 3.5 Sonnet", category: "Model", spend: Math.round(3620.00 * mult * 100) / 100, requests: Math.round(74200 * mult), tokens: `${(6.8 * mult).toFixed(1)}B`, percentage: 45.0, status: "Healthy" },
      { id: "m2", name: "GPT-4o", category: "Model", spend: Math.round(2480.50 * mult * 100) / 100, requests: Math.round(51800 * mult), tokens: `${(4.9 * mult).toFixed(1)}B`, percentage: 30.8, status: "Healthy" },
      { id: "m3", name: "Gemini 1.5 Pro", category: "Model", spend: Math.round(1120.00 * mult * 100) / 100, requests: Math.round(28400 * mult), tokens: `${(2.8 * mult).toFixed(1)}B`, percentage: 13.9, status: "Healthy" },
      { id: "m4", name: "DeepSeek R1", category: "Model", spend: Math.round(540.25 * mult * 100) / 100, requests: Math.round(19100 * mult), tokens: `${(1.2 * mult).toFixed(1)}B`, percentage: 6.7, status: "Healthy" },
      { id: "m5", name: "Llama 3.3 70B", category: "Model", spend: Math.round(289.25 * mult * 100) / 100, requests: Math.round(9140 * mult), tokens: `${(0.7 * mult).toFixed(1)}B`, percentage: 3.6, status: "Healthy" },
    ],
    providers: [
      { id: "p1", name: "Anthropic", category: "Provider", spend: Math.round(3620.00 * mult * 100) / 100, requests: Math.round(74200 * mult), tokens: `${(6.8 * mult).toFixed(1)}B`, percentage: 45.0, status: "Healthy" },
      { id: "p2", name: "OpenAI", category: "Provider", spend: Math.round(2480.50 * mult * 100) / 100, requests: Math.round(51800 * mult), tokens: `${(4.9 * mult).toFixed(1)}B`, percentage: 30.8, status: "Healthy" },
      { id: "p3", name: "Google Gemini", category: "Provider", spend: Math.round(1120.00 * mult * 100) / 100, requests: Math.round(28400 * mult), tokens: `${(2.8 * mult).toFixed(1)}B`, percentage: 13.9, status: "Healthy" },
      { id: "p4", name: "DeepSeek", category: "Provider", spend: Math.round(540.25 * mult * 100) / 100, requests: Math.round(19100 * mult), tokens: `${(1.2 * mult).toFixed(1)}B`, percentage: 6.7, status: "Healthy" },
      { id: "p5", name: "Meta", category: "Provider", spend: Math.round(289.25 * mult * 100) / 100, requests: Math.round(9140 * mult), tokens: `${(0.7 * mult).toFixed(1)}B`, percentage: 3.6, status: "Healthy" },
    ],
  };
};

export const MOCK_SPEND_BREAKDOWN = getSpendBreakdown("all");

// Request Volume Trend Data
export const getRequestVolumeTrend = (orgId: string = "all") => {
  const mult = getOrgMultiplier(orgId);
  return Array.from({ length: 24 }, (_, i) => {
    const hour = `${i.toString().padStart(2, "0")}:00`;
    const isPeak = i >= 9 && i <= 17;
    const baseReqs = Math.round((isPeak ? 6500 + (i % 4) * 800 : 1200 + (i % 3) * 300) * mult);
    const failedReqs = Math.round(baseReqs * (0.02 + (i === 14 ? 0.08 : 0.01)));
    const successfulReqs = baseReqs - failedReqs;

    return {
      hour,
      total: baseReqs,
      successful: successfulReqs,
      failed: failedReqs,
    };
  });
};

export const MOCK_REQUEST_VOLUME_TREND = getRequestVolumeTrend("all");

// Tokens Trend Data (Stacked Vertical Bar: Input vs Output Tokens)
export const getTokensTrend = (orgId: string = "all") => {
  const mult = getOrgMultiplier(orgId);
  return Array.from({ length: 14 }, (_, i) => {
    const day = `Day ${i + 1}`;
    const inputTokens = Math.round((600 + Math.sin(i) * 150 + i * 20) * mult * 10) / 10;
    const outputTokens = Math.round((300 + Math.cos(i) * 80 + i * 10) * mult * 10) / 10;

    return {
      day,
      date: `Aug ${i + 1}`,
      inputTokens,
      outputTokens,
      totalTokens: Math.round((inputTokens + outputTokens) * 10) / 10,
    };
  });
};

export const MOCK_TOKENS_TREND = getTokensTrend("all");

// Reliability Timeline Data (Success vs Failure Stacked)
export const getReliabilityTimeline = (orgId: string = "all") => {
  const mult = getOrgMultiplier(orgId);
  return Array.from({ length: 24 }, (_, i) => {
    const hour = `${i.toString().padStart(2, "0")}:00`;
    const isSpike = i === 14 || i === 15;
    const successCount = Math.round((isSpike ? 6200 : 7500 + (i % 3) * 200) * mult);
    const failureCount = Math.round((isSpike ? 680 : 120 + (i % 4) * 30) * mult);
    const total = successCount + failureCount;
    const slaPercentage = Math.round((successCount / total) * 1000) / 10;

    return {
      hour,
      success: successCount,
      failed: failureCount,
      slaPercentage,
      targetSla: 98.0,
    };
  });
};

export const MOCK_RELIABILITY_TIMELINE = getReliabilityTimeline("all");

// Model & Provider Operational Matrix Data
export const MOCK_OPERATIONAL_MATRIX = [
  { id: "op-1", model: "Claude 3.5 Sonnet", provider: "Anthropic", status: "DEGRADED", latencyMs: 340, errorRate: "7.3%", costPer1K: "$0.0030", successRate: "92.7%", health: "Degraded" },
  { id: "op-2", model: "GPT-4o", provider: "OpenAI", status: "HEALTHY", latencyMs: 180, errorRate: "1.2%", costPer1K: "$0.0025", successRate: "98.8%", health: "Healthy" },
  { id: "op-3", model: "Gemini 1.5 Pro", provider: "Google Gemini", status: "HEALTHY", latencyMs: 210, errorRate: "0.8%", costPer1K: "$0.00125", successRate: "99.2%", health: "Healthy" },
  { id: "op-4", model: "DeepSeek R1", provider: "DeepSeek", status: "HEALTHY", latencyMs: 290, errorRate: "2.1%", costPer1K: "$0.0005", successRate: "97.9%", health: "Healthy" },
  { id: "op-5", model: "Llama 3.3 70B", provider: "Meta", status: "HEALTHY", latencyMs: 160, errorRate: "0.4%", costPer1K: "$0.0007", successRate: "99.6%", health: "Healthy" },
];

// Capacity RPM & TPM Throughput Data
export const getCapacityRpmData = (orgId: string = "all") => {
  const mult = getOrgMultiplier(orgId);
  return Array.from({ length: 24 }, (_, i) => {
    const hour = `${i.toString().padStart(2, "0")}:00`;
    const isPeak = i >= 11 && i <= 15;
    const rpm = Math.round((isPeak ? 380 + (i % 3) * 35 : 180 + (i % 4) * 20) * mult);

    return {
      hour,
      actualRpm: rpm,
      thresholdRpm: 500,
    };
  });
};

export const MOCK_CAPACITY_RPM_DATA = getCapacityRpmData("all");

export const getCapacityTpmData = (orgId: string = "all") => {
  const mult = getOrgMultiplier(orgId);
  return Array.from({ length: 24 }, (_, i) => {
    const hour = `${i.toString().padStart(2, "0")}:00`;
    const isPeak = i >= 11 && i <= 15;
    const tpm = (isPeak ? 1.65 + (i % 3) * 0.12 : 0.85 + (i % 4) * 0.08) * mult;

    return {
      hour,
      actualTpm: Math.round(tpm * 100) / 100,
      thresholdTpm: 2.0,
    };
  });
};

export const MOCK_CAPACITY_TPM_DATA = getCapacityTpmData("all");

// Capacity Virtual Keys Risk Data
export const MOCK_CAPACITY_KEYS_RISK = [
  { id: "cr-1", keyName: "marketing-prod-key", team: "Marketing Content Gen", rpmUtil: 92.5, tpmUtil: 88.0, riskBadge: "CRITICAL RISK", riskColor: "red" },
  { id: "cr-2", keyName: "research-analysis-key", team: "Research & AI Dev", rpmUtil: 89.6, tpmUtil: 94.2, riskBadge: "HIGH THROTTLE", riskColor: "orange" },
  { id: "cr-3", keyName: "support-prod-key", team: "Customer Support Eng", rpmUtil: 83.5, tpmUtil: 79.1, riskBadge: "WARNING", riskColor: "orange" },
  { id: "cr-4", keyName: "fintech-risk-key", team: "Financial Risk Modeling", rpmUtil: 75.0, tpmUtil: 68.4, riskBadge: "MODERATE", riskColor: "yellow" },
  { id: "cr-5", keyName: "legal-doc-key", team: "Legal Document Proc", rpmUtil: 36.3, tpmUtil: 41.2, riskBadge: "OPTIMAL", riskColor: "green" },
];

// Sample Incident Trace Logs for Inspector Modal
export const MOCK_INCIDENT_TRACES: IncidentTraceLog[] = [
  {
    id: "trace-984021-sonnet",
    timestamp: "2026-08-11 14:42:19.082 UTC",
    virtualKey: "marketing-prod-key (sk-grd-5510)",
    team: "Marketing Content Gen",
    user: "Marcus Vance",
    provider: "Anthropic",
    model: "Claude 3.5 Sonnet",
    statusCode: 503,
    errorCategory: "503 Provider Down",
    latencyMs: 12450,
    promptTokens: 4280,
    completionTokens: 0,
    cost: 0.0128,
    promptSnippet: "Generate 50 multi-channel marketing campaign variants for Q4 Enterprise AI Gateway launch targeting Fortune 500 CTOs...",
    errorPayload: `{\n  "error": {\n    "type": "api_error",\n    "message": "Overloaded: Anthropic API backend capacity currently exceeded. Please retry after 30 seconds.",\n    "code": "service_unavailable",\n    "status": 503\n  }\n}`,
  },
  {
    id: "trace-984022-tpm",
    timestamp: "2026-08-11 14:38:02.114 UTC",
    virtualKey: "research-analysis-key (sk-grd-8492)",
    team: "Research & AI Development",
    user: "Dr. Sarah Chen",
    provider: "OpenAI",
    model: "GPT-4o",
    statusCode: 429,
    errorCategory: "429 TPM Limit",
    latencyMs: 140,
    promptTokens: 128000,
    completionTokens: 0,
    cost: 0.0,
    promptSnippet: "Analyze financial corpus document attachment 8492-pdf-report.pdf across 500 pages...",
    errorPayload: `{\n  "error": {\n    "type": "rate_limit_error",\n    "message": "Rate limit exceeded for TPM (Tokens Per Minute). Limit: 2,000,000 TPM. Current rate: 2,140,000 TPM.",\n    "code": "tpm_limit_exceeded",\n    "status": 429\n  }\n}`,
  },
  {
    id: "trace-984023-timeout",
    timestamp: "2026-08-11 14:15:44.901 UTC",
    virtualKey: "support-prod-key (sk-grd-1039)",
    team: "Customer Support Engineering",
    user: "Alex Rivera",
    provider: "Anthropic",
    model: "Claude 3.5 Sonnet",
    statusCode: 504,
    errorCategory: "504 Gateway Timeout",
    latencyMs: 30000,
    promptTokens: 8400,
    completionTokens: 210,
    cost: 0.0252,
    promptSnippet: "Debug system logs for customer tenant ID #99104...",
    errorPayload: `{\n  "error": {\n    "type": "gateway_timeout",\n    "message": "Upstream provider connection timed out after 30000ms.",\n    "code": "gateway_timeout",\n    "status": 504\n  }\n}`,
  },
];
