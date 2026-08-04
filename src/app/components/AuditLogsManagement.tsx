import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  RefreshCw,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Copy,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  Building2,
  Key,
  Globe,
  RotateCcw,
  Check,
  Tag,
  ShieldAlert,
  FileJson,
  Code,
  FileText,
  Activity,
  Layers,
  Plus,
  Trash2,
  Edit3,
  Sliders,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  timestampISO: string;
  action: "Created" | "Updated" | "Deleted";
  table: "Users" | "UI Settings" | "Teams" | "Models" | "Keys" | "Organizations" | "Policies" | "Settings";
  objectId: string;
  changedBy: string;
  apiKeyHash: string;
  transactionId?: string;
  requestSource?: string;
  environment?: string;
  organization?: string;
  team?: string;
  beforeJson?: Record<string, any> | null;
  afterJson?: Record<string, any> | null;
}

export const mockAuditLogsData: AuditLogEntry[] = [
  {
    id: "aud-001",
    timestamp: "Aug 3, 19:29:52",
    timestampISO: "2026-08-03T19:29:52.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    transactionId: "tx-99012a883",
    requestSource: "Web Console",
    environment: "Production",
    organization: "Acme Enterprise",
    beforeJson: {
      updated_at: "2026-08-03T11:18:12.660002"
    },
    afterJson: {
      updated_at: "2026-08-03T13:59:51.993002"
    }
  },
  {
    id: "aud-002",
    timestamp: "Aug 3, 16:47:32",
    timestampISO: "2026-08-03T16:47:32.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { updated_at: "2026-08-03T10:12:00.000000" },
    afterJson: { updated_at: "2026-08-03T16:47:32.000000" }
  },
  {
    id: "aud-003",
    timestamp: "Aug 3, 16:12:57",
    timestampISO: "2026-08-03T16:12:57.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { user_role: "internal_user" },
    afterJson: { user_role: "admin_user" }
  },
  {
    id: "aud-004",
    timestamp: "Aug 3, 16:12:24",
    timestampISO: "2026-08-03T16:12:24.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { max_budget: 100 },
    afterJson: { max_budget: 500 }
  },
  {
    id: "aud-005",
    timestamp: "Aug 3, 12:22:42",
    timestampISO: "2026-08-03T12:22:42.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { updated_at: "2026-08-03T09:00:00.000000" },
    afterJson: { updated_at: "2026-08-03T12:22:42.000000" }
  },
  {
    id: "aud-006",
    timestamp: "Aug 1, 13:42:30",
    timestampISO: "2026-08-01T13:42:30.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { tpm_limit: 10000 },
    afterJson: { tpm_limit: 50000 }
  },
  {
    id: "aud-007",
    timestamp: "Jul 31, 14:20:51",
    timestampISO: "2026-07-31T14:20:51.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { rpm_limit: 100 },
    afterJson: { rpm_limit: 500 }
  },
  {
    id: "aud-008",
    timestamp: "Jul 31, 13:17:40",
    timestampISO: "2026-07-31T13:17:40.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { updated_at: "2026-07-30T10:00:00.000000" },
    afterJson: { updated_at: "2026-07-31T13:17:40.000000" }
  },
  {
    id: "aud-009",
    timestamp: "Jul 30, 13:12:58",
    timestampISO: "2026-07-30T13:12:58.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { team_id: "default_team" },
    afterJson: { team_id: "core_engineering" }
  },
  {
    id: "aud-010",
    timestamp: "Jul 30, 12:12:10",
    timestampISO: "2026-07-30T12:12:10.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { spend: 12.5 },
    afterJson: { spend: 18.4 }
  },
  {
    id: "aud-011",
    timestamp: "Jul 29, 20:37:12",
    timestampISO: "2026-07-29T20:37:12.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { allowed_models: ["gpt-4o"] },
    afterJson: { allowed_models: ["gpt-4o", "claude-3-5-sonnet"] }
  },
  {
    id: "aud-012",
    timestamp: "Jul 29, 18:54:46",
    timestampISO: "2026-07-29T18:54:46.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { updated_at: "2026-07-28T18:00:00.000000" },
    afterJson: { updated_at: "2026-07-29T18:54:46.000000" }
  },
  {
    id: "aud-013",
    timestamp: "Jul 29, 18:08:09",
    timestampISO: "2026-07-29T18:08:09.000Z",
    action: "Updated",
    table: "UI Settings",
    objectId: "ui_settings",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "b9042ff8a38e763825e4da36b5c826b17c78d0b75c88853fbcddb9caa5d0dz8f4",
    beforeJson: { theme: "light" },
    afterJson: { theme: "dark" }
  },
  {
    id: "aud-014",
    timestamp: "Jul 29, 18:07:41",
    timestampISO: "2026-07-29T18:07:41.000Z",
    action: "Updated",
    table: "UI Settings",
    objectId: "ui_settings",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "b9042ff8a38e763825e4da36b5c826b17c78d0b75c88853fbcddb9caa5d0dz8f4",
    beforeJson: { sidebar_collapsed: false },
    afterJson: { sidebar_collapsed: true }
  },
  {
    id: "aud-015",
    timestamp: "Jul 29, 18:02:15",
    timestampISO: "2026-07-29T18:02:15.000Z",
    action: "Updated",
    table: "UI Settings",
    objectId: "ui_settings",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "b9042ff8a38e763825e4da36b5c826b17c78d0b75c88853fbcddb9caa5d0dz8f4",
    beforeJson: { default_page_size: 25 },
    afterJson: { default_page_size: 50 }
  },
  {
    id: "aud-016",
    timestamp: "Jul 29, 18:02:08",
    timestampISO: "2026-07-29T18:02:08.000Z",
    action: "Updated",
    table: "UI Settings",
    objectId: "ui_settings",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "b9042ff8a38e763825e4da36b5c826b17c78d0b75c88853fbcddb9caa5d0dz8f4",
    beforeJson: { language: "en" },
    afterJson: { language: "en-US" }
  },
  {
    id: "aud-017",
    timestamp: "Jul 28, 18:01:40",
    timestampISO: "2026-07-28T18:01:40.000Z",
    action: "Updated",
    table: "UI Settings",
    objectId: "ui_settings",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "b9042ff8a38e763825e4da36b5c826b17c78d0b75c88853fbcddb9caa5d0dz8f4",
    beforeJson: { analytics_period: "7d" },
    afterJson: { analytics_period: "30d" }
  },
  {
    id: "aud-018",
    timestamp: "Jul 29, 17:40:54",
    timestampISO: "2026-07-29T17:40:54.000Z",
    action: "Deleted",
    table: "Users",
    objectId: "your-user-id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "b9042ff8a38e763825e4da36b5c826b17c78d0b75c88853fbcddb9caa5d0dz8f4",
    beforeJson: {
      spend: 0,
      teams: [],
      models: [],
      user_id: "your-user-id",
      metadata: {},
      policies: [],
      created_at: "2026-07-28T15:07:14.163002",
      updated_at: "2026-07-28T15:08:01.910002",
      model_spend: {},
      model_max_budget: {},
      allowed_cache_controls: []
    },
    afterJson: null
  },
  {
    id: "aud-019",
    timestamp: "Jul 29, 17:40:50",
    timestampISO: "2026-07-29T17:40:50.000Z",
    action: "Deleted",
    table: "Users",
    objectId: "test-user",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "b9042ff8a38e763825e4da36b5c826b17c78d0b75c88853fbcddb9caa5d0dz8f4",
    beforeJson: {
      spend: 0,
      user_id: "test-user",
      created_at: "2026-07-28T12:00:00.000000"
    },
    afterJson: null
  },
  {
    id: "aud-020",
    timestamp: "Jul 29, 16:07:56",
    timestampISO: "2026-07-29T16:07:56.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { status: "pending" },
    afterJson: { status: "active" }
  },
  {
    id: "aud-021",
    timestamp: "Jul 29, 14:37:35",
    timestampISO: "2026-07-29T14:37:35.000Z",
    action: "Deleted",
    table: "Teams",
    objectId: "84eaeb50-fec4-4629-8c03-323e44753ae9",
    changedBy: "b90438fc-1e68-40aa-a553-d7e90e3ff804",
    apiKeyHash: "09819ac14c52a807846a35533383f982a1d4798b057b68ba1c76db4258d2c1708",
    beforeJson: {
      team_id: "84eaeb50-fec4-4629-8c03-323e44753ae9",
      team_alias: "temp-dev-team",
      organization_id: "8ec41e08-0174-4a5a-9886-145671ba9ff1"
    },
    afterJson: null
  },
  {
    id: "aud-022",
    timestamp: "Jul 29, 14:37:05",
    timestampISO: "2026-07-29T14:37:05.000Z",
    action: "Created",
    table: "Teams",
    objectId: "04eaeb50-fec4-4629-8c03-323e44753ae9",
    changedBy: "b90438fc-1e68-40aa-a553-d7e90e3ff804",
    apiKeyHash: "09819ac14c52a807846a35533383f982a1d4798b057b68ba1c76db4258d2c1708",
    beforeJson: null,
    afterJson: {
      admins: [],
      models: ["all-proxy-models"],
      blocked: false,
      members: [],
      team_id: "04eaeb50-fec4-4629-8c03-323e44753ae9",
      team_alias: "adfdsefewdf",
      model_spend: {},
      organization_id: "8ec41e08-0174-4a5a-9886-145671ba9ff1",
      model_max_budget: {},
      members_with_roles: [],
      allow_team_guardrail_config: false
    }
  },
  {
    id: "aud-023",
    timestamp: "Jul 29, 12:41:51",
    timestampISO: "2026-07-29T12:41:51.000Z",
    action: "Updated",
    table: "Users",
    objectId: "b90438fc-1e68-40aa-a553-d7e90e3ff804",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "41d5d8be4a82e88310c813",
    beforeJson: { user_email: "b90438fc@litellm.ai" },
    afterJson: { user_email: "admin@litellm.ai" }
  },
  {
    id: "aud-024",
    timestamp: "Jul 29, 12:41:01",
    timestampISO: "2026-07-29T12:41:01.000Z",
    action: "Created",
    table: "Models",
    objectId: "73162c3a-0804-434d-8b59-e27a0ded4ac4",
    changedBy: "b90438fc-1e68-40aa-a553-d7e90e3ff804",
    apiKeyHash: "5c18affd8fb96001a288",
    beforeJson: null,
    afterJson: {
      model_name: "gpt-4o-mini-2026-07-18",
      litellm_params: { model: "gpt-4o-mini", api_key: "sk-proj-..." },
      model_info: { id: "73162c3a-0804-434d-8b59-e27a0ded4ac4", mode: "completion" }
    }
  },
  {
    id: "aud-025",
    timestamp: "Jul 29, 12:38:26",
    timestampISO: "2026-07-29T12:38:26.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { last_login: "2026-07-28T10:00:00.000Z" },
    afterJson: { last_login: "2026-07-29T12:38:26.000Z" }
  },
  {
    id: "aud-026",
    timestamp: "Jul 28, 20:48:23",
    timestampISO: "2026-07-28T20:48:23.000Z",
    action: "Created",
    table: "Teams",
    objectId: "160e0ca2-c7a6-400f-a0fa-7158222c8bc9",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "c991a7f484429901a",
    beforeJson: null,
    afterJson: {
      team_id: "160e0ca2-c7a6-400f-a0fa-7158222c8bc9",
      team_alias: "Core Engineering",
      members: ["user-101", "user-102"]
    }
  },
  {
    id: "aud-027",
    timestamp: "Jul 20, 20:23:29",
    timestampISO: "2026-07-20T20:23:29.000Z",
    action: "Updated",
    table: "Users",
    objectId: "default_user_id",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "-",
    beforeJson: { password_reset: true },
    afterJson: { password_reset: false }
  },
  {
    id: "aud-028",
    timestamp: "Jul 28, 19:56:48",
    timestampISO: "2026-07-28T19:56:48.000Z",
    action: "Updated",
    table: "UI Settings",
    objectId: "ui_settings",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "7fed94bbfb8e9301a",
    beforeJson: { custom_domain: null },
    afterJson: { custom_domain: "ai-gateway.company.com" }
  },
  {
    id: "aud-029",
    timestamp: "Jul 28, 17:06:02",
    timestampISO: "2026-07-28T17:06:02.000Z",
    action: "Deleted",
    table: "Keys",
    objectId: "dd0dc03f5c9b9fa858c49f93839bd686391a9901a",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "7fed94bbfb8e9301a",
    beforeJson: {
      key_name: "Temporary Test Key",
      key_hash: "dd0dc03f5c9b9fa858c49f93839bd686391a9901a",
      max_budget: 10
    },
    afterJson: null
  },
  {
    id: "aud-030",
    timestamp: "Jul 28, 17:04:14",
    timestampISO: "2026-07-28T17:04:14.000Z",
    action: "Created",
    table: "Keys",
    objectId: "dd0dc03f5c9b9fa858c49f93839bd686391a9901a",
    changedBy: "Default Proxy Admin",
    apiKeyHash: "7fed94bbfb8e9301a",
    beforeJson: null,
    afterJson: {
      key_name: "Temporary Test Key",
      key_hash: "dd0dc03f5c9b9fa858c49f93839bd686391a9901a",
      max_budget: 10,
      created_by: "Default Proxy Admin"
    }
  }
];

interface AuditLogsManagementProps {
  onTabChange?: (tab: "request" | "audit" | "deleted_keys" | "deleted_teams") => void;
}

export function AuditLogsManagement({ onTabChange }: AuditLogsManagementProps) {
  const [headerTab, setHeaderTab] = useState<"request" | "audit" | "deleted_keys" | "deleted_teams">("audit");

  useEffect(() => {
    document.title = "Audit Logs | SA - Guardian Layer";
  }, []);

  // Search & Filter Toolbar States
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("Last 7 Days");

  // Pagination & Sorting State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [sortField, setSortField] = useState<keyof AuditLogEntry>("timestampISO");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Advanced Filter Drawer State
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [filterActions, setFilterActions] = useState<string[]>([]);
  const [filterTables, setFilterTables] = useState<string[]>([]);
  const [filterChangedBy, setFilterChangedBy] = useState("");
  const [filterApiKeyHash, setFilterApiKeyHash] = useState("");
  const [filterObjectId, setFilterObjectId] = useState("");

  // Audit Details Drawer State
  const [selectedAudit, setSelectedAudit] = useState<AuditLogEntry | null>(null);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);

  const handleCopyText = (text: string, label: string = "Value") => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setDateRange("Last 7 Days");
    setFilterActions([]);
    setFilterTables([]);
    setFilterChangedBy("");
    setFilterApiKeyHash("");
    setFilterObjectId("");
    toast.success("Reset all audit log filters");
  };

  const handleRowClick = (entry: AuditLogEntry) => {
    setSelectedAudit(entry);
    setShowDetailDrawer(true);
  };

  // Filtered & Sorted Audit Logs
  const filteredAuditLogs = useMemo(() => {
    return mockAuditLogsData.filter((log) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        log.objectId.toLowerCase().includes(q) ||
        log.changedBy.toLowerCase().includes(q) ||
        log.table.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.apiKeyHash.toLowerCase().includes(q);

      const matchesAction = filterActions.length === 0 || filterActions.includes(log.action);
      const matchesTable = filterTables.length === 0 || filterTables.includes(log.table);
      const matchesChangedBy = !filterChangedBy || log.changedBy.toLowerCase().includes(filterChangedBy.toLowerCase());
      const matchesKeyHash = !filterApiKeyHash || log.apiKeyHash.toLowerCase().includes(filterApiKeyHash.toLowerCase());
      const matchesObjectId = !filterObjectId || log.objectId.toLowerCase().includes(filterObjectId.toLowerCase());

      return matchesSearch && matchesAction && matchesTable && matchesChangedBy && matchesKeyHash && matchesObjectId;
    }).sort((a, b) => {
      let valA = a[sortField] || "";
      let valB = b[sortField] || "";
      if (sortDirection === "asc") return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });
  }, [searchQuery, filterActions, filterTables, filterChangedBy, filterApiKeyHash, filterObjectId, sortField, sortDirection]);

  // Paginated Data
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAuditLogs.slice(start, start + pageSize);
  }, [filteredAuditLogs, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredAuditLogs.length / pageSize) || 1;

  const renderActionBadge = (action: AuditLogEntry["action"]) => {
    switch (action) {
      case "Created":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50">
            Created
          </span>
        );
      case "Updated":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/50">
            Updated
          </span>
        );
      case "Deleted":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/50">
            Deleted
          </span>
        );
      default:
        return null;
    }
  };

  const toggleActionFilter = (act: string) => {
    setFilterActions(prev => prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]);
  };

  const toggleTableFilter = (tbl: string) => {
    setFilterTables(prev => prev.includes(tbl) ? prev.filter(t => t !== tbl) : [...prev, tbl]);
  };

  return (
    <div className="space-y-4 p-4 sm:p-6 max-w-[1700px] mx-auto text-xs animate-fadeIn">
      {/* SECTION 1: HEADER & NAVIGATION TABS */}
      <div className="space-y-3 bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">Audit Logs</h1>
          <p className="text-xs text-neutral-500 mt-1 font-medium">
            Track every Create, Update and Delete action performed across Organizations, Teams, Users, Models, Keys and Platform configuration.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-2 font-medium">
            <span>AI Gateway</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 font-semibold">Logs</span>
          </div>
        </div>

        {/* Navigation Tabs (Request Logs & Audit Logs Only) */}
        <div className="pt-2 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-6 text-xs font-semibold overflow-x-auto">
            <button
              type="button"
              onClick={() => {
                setHeaderTab("request");
                if (onTabChange) onTabChange("request");
              }}
              className={`pb-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                headerTab === "request"
                  ? "border-primary-600 text-primary-600 dark:text-primary-400 font-bold"
                  : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <span>Request Logs</span>
            </button>

            <button
              type="button"
              onClick={() => setHeaderTab("audit")}
              className={`pb-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                headerTab === "audit"
                  ? "border-primary-600 text-primary-600 dark:text-primary-400 font-bold"
                  : "border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <span>Audit Logs</span>
            </button>
          </div>

          {/* Action buttons on Header */}
          <div className="flex items-center gap-2 pb-2">
            <button
              type="button"
              onClick={() => setShowFilterDrawer(true)}
              className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-primary-600" />
              <span>Filters</span>
            </button>

            <button
              type="button"
              onClick={handleResetFilters}
              className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 font-semibold text-neutral-600 dark:text-neutral-400 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* TOOLBAR ROW: SEARCH & EXPORT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Object ID, User, Action, or API Key Hash..."
            className="w-full h-9 pl-9 pr-8 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <button
            type="button"
            onClick={() => toast.success("Refreshed audit logs")}
            className="h-9 px-3.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
            <span>Refresh</span>
          </button>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={() => toast.success("Exported audit logs report to CSV")}
            className="h-9 px-3.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold flex items-center gap-1.5 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* AUDIT LOGS TABLE */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/50 text-neutral-500 font-bold select-none">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Table</th>
                <th className="py-3 px-4">Object ID</th>
                <th className="py-3 px-4">Changed By</th>
                <th className="py-3 px-4">API Key (Hash)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-medium">
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center space-y-3">
                    <FileText className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-600" />
                    <div className="text-sm font-bold text-neutral-800 dark:text-neutral-200">No Audit Logs Found</div>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto">No audit activities match the selected filters.</p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => handleRowClick(log)}
                    className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer group"
                  >
                    {/* Timestamp */}
                    <td className="py-3 px-4 font-mono text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    {/* Action Badge */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {renderActionBadge(log.action)}
                    </td>

                    {/* Table */}
                    <td className="py-3 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                      {log.table}
                    </td>

                    {/* Object ID */}
                    <td className="py-3 px-4 font-mono text-neutral-800 dark:text-neutral-200">
                      <div className="flex items-center gap-1.5 max-w-[240px] truncate" title={log.objectId}>
                        <span className="truncate">{log.objectId}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyText(log.objectId, "Object ID");
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-opacity"
                        >
                          <Copy className="w-3 h-3 text-neutral-400" />
                        </button>
                      </div>
                    </td>

                    {/* Changed By User Chip */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-medium text-[11px] border border-blue-200/50">
                        <User className="w-3 h-3" />
                        <span>{log.changedBy}</span>
                      </span>
                    </td>

                    {/* API Key (Hash) */}
                    <td className="py-3 px-4 font-mono text-neutral-500">
                      {log.apiKeyHash === "-" ? (
                        <span>-</span>
                      ) : (
                        <div className="flex items-center gap-1.5 max-w-[160px] truncate" title={log.apiKeyHash}>
                          <span className="truncate">{log.apiKeyHash.length > 15 ? `${log.apiKeyHash.slice(0, 12)}...` : log.apiKeyHash}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyText(log.apiKeyHash, "API Key Hash");
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-opacity"
                          >
                            <Copy className="w-3 h-3 text-neutral-400" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION ROW */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-neutral-500">
          <div className="flex items-center gap-2">
            <span>Rows per page</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="h-8 px-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded text-xs font-medium"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center gap-6">
            <span>
              Showing {filteredAuditLogs.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredAuditLogs.length)} of {filteredAuditLogs.length}
            </span>

            <span>Page {currentPage} of {totalPages}</span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="p-1.5 rounded border border-neutral-300 dark:border-neutral-700 disabled:opacity-40 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ChevronLeft className="w-3.5 h-3.5 stroke-[3]" />
                <ChevronLeft className="w-3.5 h-3.5 -ml-2 stroke-[3]" />
              </button>
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded border border-neutral-300 dark:border-neutral-700 disabled:opacity-40 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded border border-neutral-300 dark:border-neutral-700 disabled:opacity-40 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(totalPages)}
                className="p-1.5 rounded border border-neutral-300 dark:border-neutral-700 disabled:opacity-40 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                <ChevronRight className="w-3.5 h-3.5 -ml-2 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER DRAWER (SLIDE OVER FROM RIGHT) */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
          <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-xs" onClick={() => setShowFilterDrawer(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary-600" />
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Filter Audit Logs</h3>
                </div>
                <button type="button" onClick={() => setShowFilterDrawer(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Form Body */}
              <div className="p-5 flex-1 overflow-y-auto space-y-6 text-xs font-medium">
                {/* Date Range */}
                <div className="space-y-2">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "Custom"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDateRange(d)}
                        className={`p-2 rounded-lg border text-center font-semibold transition-colors ${
                          dateRange === d ? "bg-primary-50 text-primary-700 border-primary-300 dark:bg-primary-950/60 dark:text-primary-300" : "border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions (Multi-select) */}
                <div className="space-y-2">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block">Action</label>
                  <div className="flex flex-wrap gap-2">
                    {["Created", "Updated", "Deleted"].map((act) => {
                      const isSelected = filterActions.includes(act);
                      return (
                        <button
                          key={act}
                          type="button"
                          onClick={() => toggleActionFilter(act)}
                          className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                            isSelected ? "bg-primary-600 text-white border-primary-600" : "bg-neutral-50 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          {act}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tables (Multi-select) */}
                <div className="space-y-2">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block">Table</label>
                  <div className="flex flex-wrap gap-2">
                    {["Users", "Teams", "Organizations", "Models", "Keys", "Policies", "Settings"].map((tbl) => {
                      const isSelected = filterTables.includes(tbl);
                      return (
                        <button
                          key={tbl}
                          type="button"
                          onClick={() => toggleTableFilter(tbl)}
                          className={`px-2.5 py-1 rounded-md border text-xs font-medium flex items-center gap-1 transition-colors ${
                            isSelected ? "bg-primary-100 text-primary-800 border-primary-300 dark:bg-primary-950 dark:text-primary-200" : "bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-primary-600" />}
                          {tbl}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Changed By */}
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block">Changed By</label>
                  <input
                    type="text"
                    value={filterChangedBy}
                    onChange={(e) => setFilterChangedBy(e.target.value)}
                    placeholder="Search by user or admin name..."
                    className="w-full h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                  />
                </div>

                {/* Object ID */}
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block">Object ID</label>
                  <input
                    type="text"
                    value={filterObjectId}
                    onChange={(e) => setFilterObjectId(e.target.value)}
                    placeholder="Search by exact or partial object ID..."
                    className="w-full h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-mono"
                  />
                </div>

                {/* API Key Hash */}
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-700 dark:text-neutral-300 block">API Key Hash</label>
                  <input
                    type="text"
                    value={filterApiKeyHash}
                    onChange={(e) => setFilterApiKeyHash(e.target.value)}
                    placeholder="Search by API Key Hash..."
                    className="w-full h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 bg-neutral-50 dark:bg-neutral-900">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 font-bold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowFilterDrawer(false);
                    toast.success("Applied audit log filters");
                  }}
                  className="px-5 py-2 rounded-lg bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AUDIT DETAILS DRAWER (45% WIDTH SLIDE-OVER MATCHING REFERENCE SCREENSHOTS) */}
      {showDetailDrawer && selectedAudit && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs" onClick={() => setShowDetailDrawer(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-[45vw] min-w-[500px] bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col">
              {/* Drawer Header Top Bar (Matching Screenshots media_1785772554737.png, media_1785772586957.png) */}
              <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-850">
                <div className="flex items-center gap-3">
                  {renderActionBadge(selectedAudit.action)}
                  <span className="font-mono text-xs text-neutral-500 font-medium">{selectedAudit.timestamp}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDetailDrawer(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-white rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Scroll Area */}
              <div className="p-6 flex-1 overflow-y-auto space-y-6 text-xs">
                {/* SECTION 1: DETAILS CARD (Matching Reference Screenshots) */}
                <div className="bg-neutral-50/60 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-[11px] font-bold text-neutral-400 tracking-wider uppercase">DETAILS</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                    <div>
                      <span className="text-neutral-400 block font-medium">Table</span>
                      <span className="font-bold text-neutral-900 dark:text-white">{selectedAudit.table}</span>
                    </div>

                    <div>
                      <span className="text-neutral-400 block font-medium">Object ID</span>
                      <div className="flex items-center gap-1.5 font-mono font-bold text-neutral-800 dark:text-neutral-200">
                        <span className="truncate max-w-[200px]" title={selectedAudit.objectId}>{selectedAudit.objectId}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(selectedAudit.objectId, "Object ID")}
                          className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
                        >
                          <Copy className="w-3 h-3 text-neutral-400" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <span className="text-neutral-400 block font-medium">Changed By</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold text-[11px] border border-blue-200/60 mt-0.5">
                        {selectedAudit.changedBy}
                      </span>
                    </div>

                    <div>
                      <span className="text-neutral-400 block font-medium">API Key (Hash)</span>
                      {selectedAudit.apiKeyHash === "-" ? (
                        <span className="font-mono text-neutral-500">-</span>
                      ) : (
                        <div className="flex items-center gap-1.5 font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                          <span className="truncate max-w-[180px]" title={selectedAudit.apiKeyHash}>
                            {selectedAudit.apiKeyHash.length > 20 ? `${selectedAudit.apiKeyHash.slice(0, 15)}...` : selectedAudit.apiKeyHash}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(selectedAudit.apiKeyHash, "API Key Hash")}
                            className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded"
                          >
                            <Copy className="w-3 h-3 text-neutral-400" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECTION 2: CHANGE COMPARISON (BEFORE vs AFTER PANELS) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* LEFT PANEL: BEFORE */}
                  <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 flex flex-col">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                      <span className="font-bold text-neutral-800 dark:text-neutral-200">Before</span>
                      {selectedAudit.beforeJson && (
                        <button
                          type="button"
                          onClick={() => handleCopyText(JSON.stringify(selectedAudit.beforeJson, null, 2), "Before JSON")}
                          className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                          title="Copy Before JSON"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="p-4 flex-1 font-mono text-[11px] overflow-x-auto min-h-[140px] bg-neutral-50/30 dark:bg-neutral-950/40">
                      {selectedAudit.action === "Created" || !selectedAudit.beforeJson ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                          <span className="text-neutral-400 font-sans font-medium text-xs">N/A</span>
                          <p className="text-[10px] text-neutral-400 font-sans">This record was newly created.</p>
                        </div>
                      ) : (
                        <pre className="text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap">
                          {JSON.stringify(selectedAudit.beforeJson, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>

                  {/* RIGHT PANEL: AFTER */}
                  <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 flex flex-col">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                      <span className="font-bold text-neutral-800 dark:text-neutral-200">After</span>
                      {selectedAudit.afterJson && (
                        <button
                          type="button"
                          onClick={() => handleCopyText(JSON.stringify(selectedAudit.afterJson, null, 2), "After JSON")}
                          className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                          title="Copy After JSON"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="p-4 flex-1 font-mono text-[11px] overflow-x-auto min-h-[140px] bg-neutral-50/30 dark:bg-neutral-950/40">
                      {selectedAudit.action === "Deleted" || !selectedAudit.afterJson ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                          <span className="text-neutral-400 font-sans font-medium text-xs">N/A</span>
                          <p className="text-[10px] text-rose-500 font-sans font-medium">Record no longer exists.</p>
                        </div>
                      ) : (
                        <pre className="text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap">
                          {JSON.stringify(selectedAudit.afterJson, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
