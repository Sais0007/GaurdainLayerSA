import React, { useState, useMemo, useRef, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  MoreVertical, 
  Eye, 
  Edit3, 
  Trash2, 
  Copy, 
  Check, 
  ArrowLeft, 
  ShieldCheck, 
  Building2, 
  Users, 
  AlertTriangle, 
  X, 
  Columns3, 
  BarChart3, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  EyeOff, 
  ChevronDown, 
  Lock, 
  FileText, 
  Database,
  Server,
  LogIn,
  Upload,
  FileSpreadsheet,
  Globe,
  UserPlus,
  Save,
  Cpu,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { 
  PageHeader, 
  SearchBar, 
  IconButton, 
  Pagination, 
  PrimaryButton, 
  ColumnVisibilityPanel, 
  AssignedModelsDrawer,
  MultiSelectSearchableDropdown,
  type ColumnConfig
} from "./hb/listing";

// --- Dependent Country & State Master Data ---
export const COUNTRIES_AND_STATES: Record<string, string[]> = {
  "United States": ["California", "New York", "Texas", "Florida", "Illinois", "Washington", "Massachusetts"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  "Germany": ["Bavaria", "Berlin", "Baden-Württemberg", "North Rhine-Westphalia", "Hesse"],
  "Canada": ["Ontario", "Quebec", "British Columbia", "Alberta"],
  "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia"],
  "India": ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Telangana"],
  "Japan": ["Tokyo", "Osaka", "Kanagawa", "Aichi"],
  "Singapore": ["Central Region", "North-East Region", "East Region", "West Region"]
};

// --- Organization Data Interface ---
export interface OrganizationItem {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  createdDate: string;
  currentSpend: number;
  maxBudget: number; // 0 for unlimited
  resetCycle: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Yearly" | "Never";
  modelSelectionType?: "all" | "selected";
  assignedModels: string[];
  tpmLimit: number;
  rpmLimit: number;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
  primaryAdminName?: string;
  primaryAdminEmail?: string;
  primaryAdminPhone?: string;
  membersCount: number;
  status: "Active" | "Inactive" | "Suspended";
  vectorStores?: string[];
  mcpServers?: string[];
  metadata?: string;
  createdBy: string;
}

// Initial Mock Organizations
const mockOrganizations: OrganizationItem[] = [
  {
    id: "org-101",
    orgId: "org-57c860ac",
    name: "HB Enterprise",
    description: "Primary enterprise organization for core platform services and internal AI apps",
    createdDate: "Jul 15, 2026",
    currentSpend: 18452.90,
    maxBudget: 25000,
    resetCycle: "Monthly",
    modelSelectionType: "selected",
    assignedModels: ["GPT-4.1", "Claude 3.5 Sonnet", "Gemini 1.5 Pro", "Llama 3 70B"],
    tpmLimit: 1000000,
    rpmLimit: 10000,
    country: "United States",
    state: "California",
    city: "San Francisco",
    zipCode: "94105",
    phone: "+1 (415) 555-0192",
    primaryAdminName: "John Doe",
    primaryAdminEmail: "superadmin@spinecloudiq.com",
    primaryAdminPhone: "+1 (415) 555-0199",
    membersCount: 42,
    status: "Active",
    vectorStores: ["vector-store-prod-01", "knowledge-base-hb"],
    mcpServers: ["mcp-auth-gateway", "mcp-db-connector"],
    metadata: '{\n  "environment": "production",\n  "tier": "enterprise"\n}',
    createdBy: "superadmin@spinecloudiq.com",
    lastUpdatedOn: "Jul 28, 2026",
    updatedBy: "superadmin@spinecloudiq.com",
  },
  {
    id: "org-102",
    orgId: "org-89b12d4f",
    name: "Spine CloudIQ",
    description: "Cloud infrastructure and automated DevOps AI research workspace",
    createdDate: "Jul 18, 2026",
    currentSpend: 1850.00,
    maxBudget: 5000,
    resetCycle: "Monthly",
    modelSelectionType: "selected",
    assignedModels: ["GPT-4o", "Claude 3.5 Sonnet", "Codex Mini"],
    tpmLimit: 500000,
    rpmLimit: 5000,
    country: "United States",
    state: "Washington",
    city: "Seattle",
    zipCode: "98101",
    phone: "+1 (206) 555-0143",
    primaryAdminName: "HB Admin",
    primaryAdminEmail: "hbadmin@yopmail.com",
    membersCount: 18,
    status: "Active",
    vectorStores: ["vector-store-devops"],
    mcpServers: ["mcp-k8s-agent"],
    metadata: '{\n  "dept": "devops"\n}',
    createdBy: "hbadmin@yopmail.com",
    lastUpdatedOn: "Jul 29, 2026",
    updatedBy: "hbadmin@yopmail.com",
  },
  {
    id: "org-103",
    orgId: "org-34a981bc",
    name: "CyberShield Ltd",
    description: "Security operations and automated vulnerability analysis unit",
    createdDate: "Jul 20, 2026",
    currentSpend: 890.25,
    maxBudget: 2500,
    resetCycle: "Monthly",
    modelSelectionType: "selected",
    assignedModels: ["Claude 3.5 Sonnet", "Mistral Large"],
    tpmLimit: 250000,
    rpmLimit: 2500,
    country: "United Kingdom",
    state: "England",
    city: "London",
    zipCode: "EC2N 2DB",
    phone: "+44 20 7946 0912",
    primaryAdminName: "Sarah Connor",
    primaryAdminEmail: "sarah.connor@hb.com",
    membersCount: 12,
    status: "Active",
    vectorStores: ["sec-threat-vault"],
    mcpServers: ["mcp-siem-bridge"],
    metadata: '{\n  "compliance": "hipaa-soc2"\n}',
    createdBy: "sarah.connor@hb.com",
    lastUpdatedOn: "Jul 30, 2026",
    updatedBy: "sarah.connor@hb.com",
  },
  {
    id: "org-104",
    orgId: "org-12d773ee",
    name: "FinTech Solutions",
    description: "Quantitative analytics and financial modeling sandbox",
    createdDate: "Jul 22, 2026",
    currentSpend: 0.00,
    maxBudget: 0, // Unlimited
    resetCycle: "Never",
    modelSelectionType: "all",
    assignedModels: ["All Models"],
    tpmLimit: 2000000,
    rpmLimit: 20000,
    country: "Germany",
    state: "Bavaria",
    city: "Munich",
    zipCode: "80331",
    phone: "+49 89 2018 4400",
    primaryAdminName: "Alex Dev",
    primaryAdminEmail: "alex.dev@hb.com",
    membersCount: 8,
    status: "Inactive",
    vectorStores: [],
    mcpServers: [],
    metadata: "",
    createdBy: "alex.dev@hb.com",
    lastUpdatedOn: "Jul 26, 2026",
    updatedBy: "alex.dev@hb.com",
  },
  {
    id: "org-105",
    orgId: "org-99c642aa",
    name: "HealthCare AI",
    description: "Medical research and clinical diagnostics experimentation lab",
    createdDate: "Jul 24, 2026",
    currentSpend: 4200.00,
    maxBudget: 4000,
    resetCycle: "Monthly",
    modelSelectionType: "selected",
    assignedModels: ["GPT-4o", "Gemini 1.5 Pro"],
    tpmLimit: 300000,
    rpmLimit: 3000,
    country: "Canada",
    state: "Ontario",
    city: "Toronto",
    zipCode: "M5V 2T6",
    phone: "+1 (416) 555-0177",
    primaryAdminName: "Michael Scott",
    primaryAdminEmail: "michael.scott@hb.com",
    membersCount: 15,
    status: "Suspended",
    vectorStores: ["clinical-trials-v1"],
    mcpServers: [],
    metadata: '{\n  "audit": "active"\n}',
    createdBy: "michael.scott@hb.com",
    lastUpdatedOn: "Jul 27, 2026",
    updatedBy: "michael.scott@hb.com",
  },
];

export interface AIModelItem {
  id: string;
  name: string;
  badge?: string;
}

export interface ActiveProviderCard {
  providerId: string;
  providerName: string;
  selectedModels: string[];
}

export interface AIProviderItem {
  id: string;
  name: string;
  badge: string;
  description: string;
  models: AIModelItem[];
}

export const AI_PROVIDERS: AIProviderItem[] = [
  {
    id: "openai",
    name: "OpenAI",
    badge: "OpenAI",
    description: "GPT-4o, GPT-4.1, o3, o4-mini, and Codex models",
    models: [
      { id: "gpt-4o", name: "GPT-4o", badge: "Multimodal" },
      { id: "gpt-4.1", name: "GPT-4.1", badge: "Flagship" },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", badge: "Fast" },
      { id: "o3", name: "o3", badge: "Reasoning" },
      { id: "o4-mini", name: "o4-mini" },
      { id: "codex-mini-latest", name: "Codex", badge: "Code" },
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    badge: "Anthropic",
    description: "Claude 3.5 Sonnet, Claude Opus, and Haiku models",
    models: [
      { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", badge: "Reasoning" },
      { id: "claude-3-5-haiku", name: "Claude 3.5 Haiku", badge: "Fast" },
      { id: "claude-3-opus", name: "Claude 3 Opus" },
      { id: "claude-3-sonnet", name: "Claude 3 Sonnet" },
    ],
  },
  {
    id: "google",
    name: "Google",
    badge: "Google",
    description: "Gemini 2.5 Pro, Gemini 1.5 Pro, and Flash",
    models: [
      { id: "gemini-2-5-pro", name: "Gemini 2.5 Pro", badge: "Recommended" },
      { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro", badge: "1M Context" },
      { id: "gemini-1-5-flash", name: "Gemini 1.5 Flash", badge: "Fast" },
      { id: "gemini-ultra", name: "Gemini Ultra" },
    ],
  },
  {
    id: "azure-openai",
    name: "Azure OpenAI",
    badge: "Azure OpenAI",
    description: "Enterprise deployed OpenAI instances on Azure",
    models: [
      { id: "azure-gpt-4o", name: "Azure GPT-4o" },
      { id: "azure-gpt-4-32k", name: "Azure GPT-4 32k" },
      { id: "azure-embeddings", name: "Azure Embeddings" },
    ],
  },
  {
    id: "meta",
    name: "Meta",
    badge: "Meta",
    description: "Llama 3 70B, Llama 3 8B, and Llama 3.1 405B",
    models: [
      { id: "llama-3-70b", name: "Llama 3 70B", badge: "Open Source" },
      { id: "llama-3-8b", name: "Llama 3 8B" },
      { id: "llama-3-1-405b", name: "Llama 3.1 405B" },
    ],
  },
  {
    id: "mistral",
    name: "Mistral",
    badge: "Mistral",
    description: "Mistral Large, Mistral Medium, and Mixtral 8x7B",
    models: [
      { id: "mistral-large", name: "Mistral Large", badge: "Fast" },
      { id: "mistral-medium", name: "Mistral Medium" },
      { id: "mixtral-8x7b", name: "Mixtral 8x7B" },
    ],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    badge: "DeepSeek",
    description: "DeepSeek-V3, DeepSeek-R1, and Coder models",
    models: [
      { id: "deepseek-v3", name: "DeepSeek-V3" },
      { id: "deepseek-r1", name: "DeepSeek-R1", badge: "Reasoning" },
      { id: "deepseek-coder", name: "DeepSeek Coder" },
    ],
  },
  {
    id: "ollama",
    name: "Ollama",
    badge: "Ollama",
    description: "Self-hosted local model runner instances",
    models: [
      { id: "ollama-qwen-25", name: "Ollama Qwen 2.5" },
      { id: "ollama-phi-3", name: "Ollama Phi-3" },
      { id: "ollama-deepseek-r1", name: "Ollama DeepSeek-R1" },
    ],
  },
  {
    id: "custom",
    name: "Custom Provider",
    badge: "Custom Provider",
    description: "Private internal LLM gateway deployments",
    models: [
      { id: "custom-gateway-v1", name: "Custom Enterprise Gateway LLM" },
      { id: "private-finetune-v1", name: "Private Fine-Tuned v1" },
    ],
  },
];

const AVAILABLE_MODELS = AI_PROVIDERS.flatMap((p) =>
  p.models.map((m) => ({ id: m.id, name: m.name, provider: p.name, badge: m.badge || p.badge }))
);

export interface OrgMemberItem {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: "Organization Admin" | "Internal User" | "Internal User Viewer";
  currentSpend: number;
  createdDate: string;
  joinedDate: string;
  status: "Active" | "Inactive" | "Pending Invitation";
}

export interface OrgModelItem {
  id: string;
  provider: string;
  modelName: string;
  modelAlias: string;
  status: "Active" | "Inactive";
  addedOn: string;
}

export interface OrgTeamItem {
  id: string;
  name: string;
  membersCount: number;
  spend: number;
  createdOn: string;
  status: "Active" | "Inactive";
}

const mockSystemUsers = [
  { id: "usr-9901a", name: "John Doe", email: "superadmin@spinecloudiq.com" },
  { id: "usr-4412b", name: "Sarah Connor", email: "sarah.connor@hb.com" },
  { id: "usr-8823c", name: "Alex Dev", email: "alex.dev@hb.com" },
  { id: "usr-1104d", name: "Michael Scott", email: "michael.scott@hb.com" },
  { id: "usr-5590e", name: "Emily Watson", email: "emily.watson@yopmail.com" },
  { id: "usr-7731f", name: "HB Admin", email: "hbadmin@yopmail.com" },
  { id: "usr-3091g", name: "David Miller", email: "david.miller@hb.com" },
  { id: "usr-6124h", name: "Jessica Taylor", email: "jessica.taylor@hb.com" },
];

const mockOrgMembers: Record<string, OrgMemberItem[]> = {
  "org-101": [
    {
      id: "mem-1",
      userId: "usr-9901a",
      name: "John Doe (Super Admin)",
      email: "superadmin@spinecloudiq.com",
      role: "Organization Admin",
      currentSpend: 1450.00,
      createdDate: "May 10, 2026",
      joinedDate: "Jul 15, 2026",
      status: "Active",
    },
    {
      id: "mem-2",
      userId: "usr-4412b",
      name: "Sarah Connor",
      email: "sarah.connor@hb.com",
      role: "Organization Admin",
      currentSpend: 890.50,
      createdDate: "May 14, 2026",
      joinedDate: "Jul 16, 2026",
      status: "Active",
    },
    {
      id: "mem-3",
      userId: "usr-8823c",
      name: "Alex Dev",
      email: "alex.dev@hb.com",
      role: "Internal User",
      currentSpend: 620.00,
      createdDate: "Jun 01, 2026",
      joinedDate: "Jul 18, 2026",
      status: "Active",
    },
    {
      id: "mem-4",
      userId: "usr-1104d",
      name: "Michael Scott",
      email: "michael.scott@hb.com",
      role: "Internal User Viewer",
      currentSpend: 0,
      createdDate: "Jun 12, 2026",
      joinedDate: "Jul 20, 2026",
      status: "Inactive",
    },
    {
      id: "mem-5",
      userId: "usr-5590e",
      name: "Emily Watson",
      email: "emily.watson@yopmail.com",
      role: "Internal User",
      currentSpend: 0,
      createdDate: "Jul 05, 2026",
      joinedDate: "Jul 25, 2026",
      status: "Pending Invitation",
    },
  ],
  "org-102": [
    {
      id: "mem-6",
      userId: "usr-7731f",
      name: "HB Admin",
      email: "hbadmin@yopmail.com",
      role: "Organization Admin",
      currentSpend: 1850.00,
      createdDate: "Jun 10, 2026",
      joinedDate: "Jul 18, 2026",
      status: "Active",
    },
  ],
};

export const mockOrgModels: Record<string, OrgModelItem[]> = {
  "org-101": [
    { id: "mod-101", provider: "OpenAI", modelName: "GPT-4.1", modelAlias: "gpt-4.1-enterprise", status: "Active", addedOn: "Jul 15, 2026" },
    { id: "mod-102", provider: "Anthropic", modelName: "Claude 3.5 Sonnet", modelAlias: "claude-3.5-sonnet-main", status: "Active", addedOn: "Jul 15, 2026" },
    { id: "mod-103", provider: "Google", modelName: "Gemini 1.5 Pro", modelAlias: "gemini-1.5-pro-prod", status: "Active", addedOn: "Jul 16, 2026" },
    { id: "mod-104", provider: "Meta", modelName: "Llama 3 70B", modelAlias: "llama-3-70b-local", status: "Active", addedOn: "Jul 18, 2026" },
  ],
  "org-102": [
    { id: "mod-105", provider: "OpenAI", modelName: "GPT-4o", modelAlias: "gpt-4o-default", status: "Active", addedOn: "Jul 18, 2026" },
    { id: "mod-106", provider: "Anthropic", modelName: "Claude 3.5 Sonnet", modelAlias: "claude-3.5-sonnet-dev", status: "Active", addedOn: "Jul 18, 2026" },
    { id: "mod-107", provider: "OpenAI", modelName: "Codex Mini", modelAlias: "codex-mini-code", status: "Active", addedOn: "Jul 19, 2026" },
  ],
  "org-103": [
    { id: "mod-108", provider: "Anthropic", modelName: "Claude 3.5 Sonnet", modelAlias: "claude-3.5-sec", status: "Active", addedOn: "Jul 20, 2026" },
    { id: "mod-109", provider: "Mistral", modelName: "Mistral Large", modelAlias: "mistral-large-sec", status: "Active", addedOn: "Jul 20, 2026" },
  ],
  "org-104": [
    { id: "mod-110", provider: "OpenAI", modelName: "GPT-4.1", modelAlias: "gpt-4.1-fin", status: "Active", addedOn: "Jul 22, 2026" },
    { id: "mod-111", provider: "Google", modelName: "Gemini 2.5 Pro", modelAlias: "gemini-2.5-fin", status: "Active", addedOn: "Jul 22, 2026" },
    { id: "mod-112", provider: "DeepSeek", modelName: "DeepSeek-R1", modelAlias: "deepseek-r1-math", status: "Active", addedOn: "Jul 23, 2026" },
  ],
  "org-105": [
    { id: "mod-113", provider: "OpenAI", modelName: "GPT-4o", modelAlias: "gpt-4o-health", status: "Active", addedOn: "Jul 24, 2026" },
    { id: "mod-114", provider: "Google", modelName: "Gemini 1.5 Pro", modelAlias: "gemini-1.5-health", status: "Active", addedOn: "Jul 24, 2026" },
  ],
};

export const mockOrgTeams: Record<string, OrgTeamItem[]> = {
  "org-101": [
    { id: "tm-101", name: "Security Operations", membersCount: 12, spend: 1245.50, createdOn: "Jul 16, 2026", status: "Active" },
    { id: "tm-102", name: "AI Research Lab", membersCount: 18, spend: 985.20, createdOn: "Jul 17, 2026", status: "Active" },
    { id: "tm-103", name: "DevOps Core", membersCount: 8, spend: 450.00, createdOn: "Jul 18, 2026", status: "Active" },
  ],
  "org-102": [
    { id: "tm-104", name: "DevOps Automated Lab", membersCount: 10, spend: 1100.00, createdOn: "Jul 18, 2026", status: "Active" },
    { id: "tm-105", name: "CloudIQ Infrastructure", membersCount: 8, spend: 750.00, createdOn: "Jul 19, 2026", status: "Active" },
  ],
  "org-103": [
    { id: "tm-106", name: "SecOps Vulnerability Unit", membersCount: 7, spend: 890.25, createdOn: "Jul 20, 2026", status: "Active" },
  ],
  "org-104": [
    { id: "tm-107", name: "Quant Modeling Sandbox", membersCount: 8, spend: 0.00, createdOn: "Jul 22, 2026", status: "Inactive" },
  ],
  "org-105": [
    { id: "tm-108", name: "Clinical Diagnostics Lab", membersCount: 15, spend: 4200.00, createdOn: "Jul 24, 2026", status: "Active" },
  ],
};

export default function OrganizationManagement() {
  const [organizations, setOrganizations] = useState<OrganizationItem[]>(mockOrganizations);
  const [viewState, setViewState] = useState<"list" | "detail" | "form">("list");
  const [selectedOrg, setSelectedOrg] = useState<OrganizationItem | null>(null);

  // Members Tab Data & State
  const [membersMap, setMembersMap] = useState<Record<string, OrgMemberItem[]>>(mockOrgMembers);
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [memberFilterRole, setMemberFilterRole] = useState("All");
  const [memberFilterStatus, setMemberFilterStatus] = useState("All");
  const [showMemberSummary, setShowMemberSummary] = useState(true);
  const [selectedMemberIds, setSelectedMemberIds] = useState<Set<string>>(new Set());
  const [activeMemberMenuId, setActiveMemberMenuId] = useState<string | null>(null);

  // Member Modals State
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<OrgMemberItem | null>(null);

  // Add/Edit Member Form State
  const [userLookupMethod, setUserLookupMethod] = useState<"email" | "userId">("email");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedMemberRole, setSelectedMemberRole] = useState<OrgMemberItem["role"]>("Internal User");
  const [memberFormTouched, setMemberFormTouched] = useState(false);

  // Settings Tab Inline Edit State
  const [isSettingsEditMode, setIsSettingsEditMode] = useState(false);
  const [settingsFormName, setSettingsFormName] = useState("");
  const [settingsFormDescription, setSettingsFormDescription] = useState("");
  const [settingsMaxBudget, setSettingsMaxBudget] = useState("5000");
  const [settingsSoftBudget, setSettingsSoftBudget] = useState("4000");
  const [settingsResetCycle, setSettingsResetCycle] = useState<OrganizationItem["resetCycle"]>("Monthly");
  const [settingsTpmLimit, setSettingsTpmLimit] = useState("500000");
  const [settingsRpmLimit, setSettingsRpmLimit] = useState("5000");

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterModels, setFilterModels] = useState<string[]>([]);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  // Summary KPI Visibility State
  const [showSummary, setShowSummary] = useState(true);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Sorting state
  const [sortField, setSortField] = useState<keyof OrganizationItem>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Action Dropdown & Column visibility
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [showHeaderActionsMenu, setShowHeaderActionsMenu] = useState(false);
  const [showColumnPanel, setShowColumnPanel] = useState(false);
  const columnAnchorRef = useRef<HTMLDivElement>(null);

  const allColumns: ColumnConfig[] = [
    { key: "orgId", label: "Organization ID" },
    { key: "name", label: "Organization Name" },
    { key: "createdDate", label: "Created Date" },
    { key: "currentSpend", label: "Lifetime Spend (USD)" },
    { key: "assignedModels", label: "Models" },
    { key: "tpmLimit", label: "TPM Limit" },
    { key: "rpmLimit", label: "RPM Limit" },
    { key: "country", label: "Country" },
    { key: "status", label: "Status" },
    { key: "membersCount", label: "Members" },
  ];

  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    orgId: true,
    name: true,
    createdDate: true,
    currentSpend: true,
    assignedModels: true,
    tpmLimit: true,
    rpmLimit: true,
    country: true,
    status: true,
    membersCount: true,
  });

  const toggleColumn = (key: string) => {
    if (key === "name" || key === "status") return;
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showBulkImportModal, setShowBulkImportModal] = useState(false);
  const [showLoginAsModal, setShowLoginAsModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [highlightedOrgId, setHighlightedOrgId] = useState<string | null>(null);

  // Assigned Models Right Drawer State
  const [modelsDrawerOrg, setModelsDrawerOrg] = useState<OrganizationItem | null>(null);
  const [showModelsDrawer, setShowModelsDrawer] = useState(false);

  const getModelCount = (item: OrganizationItem): number => {
    if (item.modelSelectionType === "all" || item.assignedModels.includes("All Models")) {
      return AVAILABLE_MODELS.length;
    }
    return item.assignedModels.length;
  };

  const getModelCountLabel = (item: OrganizationItem): string => {
    const count = getModelCount(item);
    return `${count} ${count === 1 ? "Model" : "Models"}`;
  };

  // Extended Form State for Create / Edit Organization Modal
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formModelSelectionType, setFormModelSelectionType] = useState<"all" | "selected">("all");
  const [formSelectedModels, setFormSelectedModels] = useState<string[]>([]);
  const [selectedProviderIds, setSelectedProviderIds] = useState<string[]>(["openai", "anthropic"]);
  const [collapsedProviderIds, setCollapsedProviderIds] = useState<string[]>([]);
  const [modelSearchQuery, setModelSearchQuery] = useState("");

  const getProviderIdsForModels = (modelNames: string[]): string[] => {
    const providerIds = new Set<string>();
    modelNames.forEach((modelName) => {
      AI_PROVIDERS.forEach((provider) => {
        if (provider.models.some((m) => m.name.toLowerCase() === modelName.toLowerCase())) {
          providerIds.add(provider.id);
        }
      });
    });
    if (providerIds.size === 0) {
      return ["openai", "anthropic"];
    }
    return Array.from(providerIds);
  };

  const filteredProviders = useMemo(() => {
    if (!modelSearchQuery.trim()) return AI_PROVIDERS;
    const q = modelSearchQuery.toLowerCase();
    return AI_PROVIDERS.filter((p) => {
      const providerMatches = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const modelMatches = p.models.some((m) => m.name.toLowerCase().includes(q));
      return providerMatches || modelMatches;
    });
  }, [modelSearchQuery]);

  const [activeProviderCards, setActiveProviderCards] = useState<ActiveProviderCard[]>([
    { providerId: "openai", providerName: "OpenAI", selectedModels: ["GPT-4o", "GPT-4 Mini"] },
    { providerId: "anthropic", providerName: "Anthropic", selectedModels: ["Claude 3.5 Sonnet"] },
  ]);
  const [showAddProviderDropdown, setShowAddProviderDropdown] = useState(false);

  const availableProvidersToAdd = useMemo(() => {
    return AI_PROVIDERS.filter((p) => !activeProviderCards.some((card) => card.providerId === p.id));
  }, [activeProviderCards]);

  const handleAddProviderCard = (p: typeof AI_PROVIDERS[0]) => {
    if (activeProviderCards.some((card) => card.providerId === p.id)) return;
    setActiveProviderCards((prev) => [
      ...prev,
      {
        providerId: p.id,
        providerName: p.name,
        selectedModels: p.models.slice(0, 2).map((m) => m.name),
      },
    ]);
    setShowAddProviderDropdown(false);
  };

  const handleRemoveProviderCard = (providerId: string) => {
    setActiveProviderCards((prev) => prev.filter((card) => card.providerId !== providerId));
  };

  const handleUpdateCardModels = (providerId: string, newModels: string[]) => {
    setActiveProviderCards((prev) =>
      prev.map((card) => (card.providerId === providerId ? { ...card, selectedModels: newModels } : card))
    );
  };

  const isProviderCardsValid = useMemo(() => {
    if (formModelSelectionType === "all") return true;
    if (activeProviderCards.length === 0) return false;
    return activeProviderCards.every((card) => card.selectedModels.length > 0);
  }, [formModelSelectionType, activeProviderCards]);

  const [formCountry, setFormCountry] = useState("United States");
  const [formState, setFormState] = useState("California");
  const [formCity, setFormCity] = useState("");
  const [formZipCode, setFormZipCode] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAdminName, setFormAdminName] = useState("");
  const [formAdminEmail, setFormAdminEmail] = useState("");
  const [formAdminPhone, setFormAdminPhone] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formTouched, setFormTouched] = useState(false);

  // Bulk Import Wizard State
  const [importStep, setImportStep] = useState<1 | 2 | 3 | 4>(1);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importResults, setImportResults] = useState<{ success: number; failed: number; skipped: number } | null>(null);

  // Detail View Tab
  const [detailTab, setDetailTab] = useState<"overview" | "members" | "models" | "teams">("overview");

  // Detail View — Models Tab State
  const [modelsTabSearchQuery, setModelsTabSearchQuery] = useState("");
  const [modelsTabFilterProvider, setModelsTabFilterProvider] = useState("All");
  const [modelsTabFilterStatus, setModelsTabFilterStatus] = useState("All");

  // Detail View — Teams Tab State
  const [teamsTabSearchQuery, setTeamsTabSearchQuery] = useState("");
  const [teamsTabFilterStatus, setTeamsTabFilterStatus] = useState("All");

  // Username resolver helper for Created By / Updated By
  const getUserDisplayName = (val?: string): { name: string; email: string; fullText: string } => {
    if (!val) return { name: "—", email: "", fullText: "—" };
    const matched = mockSystemUsers.find(
      (u) => u.email.toLowerCase() === val.toLowerCase() || u.name.toLowerCase() === val.toLowerCase()
    );
    if (matched) {
      return { name: matched.name, email: matched.email, fullText: `${matched.name} (${matched.email})` };
    }
    if (val.includes("@")) {
      const prefix = val.split("@")[0].replace(/[._]/g, " ");
      const formatted = prefix.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      return { name: formatted, email: val, fullText: `${formatted} (${val})` };
    }
    return { name: val, email: "", fullText: val };
  };

  // Copy helper
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopyText = (text: string, label: string = "Copied successfully!") => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    toast.success(label);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reset view state on global navigation
  useEffect(() => {
    const handleReset = () => {
      setViewState("list");
      setSelectedOrg(null);
    };
    window.addEventListener("reset-view-state", handleReset);
    return () => window.removeEventListener("reset-view-state", handleReset);
  }, []);

  // Update dependent state when country changes in form
  useEffect(() => {
    const availableStates = COUNTRIES_AND_STATES[formCountry] || [];
    if (availableStates.length > 0 && !availableStates.includes(formState)) {
      setFormState(availableStates[0]);
    }
  }, [formCountry]);

  // Validation calculations
  const isDuplicateName = useMemo(() => {
    if (!formName.trim()) return false;
    return organizations.some(
      (o) =>
        o.name.toLowerCase().trim() === formName.toLowerCase().trim() &&
        (!isEditMode || o.id !== selectedOrg?.id)
    );
  }, [formName, organizations, isEditMode, selectedOrg]);

  const isFormValid = useMemo(() => {
    return (
      formName.trim().length > 0 &&
      formName.length <= 100 &&
      !isDuplicateName &&
      formAdminName.trim().length > 0 &&
      formAdminEmail.trim().length > 0
    );
  }, [formName, isDuplicateName, formAdminName, formAdminEmail]);

  // Derived Members for Selected Organization
  const currentOrgMembers = useMemo(() => {
    if (!selectedOrg) return [];
    return membersMap[selectedOrg.id] || [];
  }, [membersMap, selectedOrg]);

  const filteredMembers = useMemo(() => {
    return currentOrgMembers.filter((m) => {
      const q = memberSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.userId.toLowerCase().includes(q);

      const matchesRole = memberFilterRole === "All" || m.role === memberFilterRole;
      const matchesStatus = memberFilterStatus === "All" || m.status === memberFilterStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [currentOrgMembers, memberSearchQuery, memberFilterRole, memberFilterStatus]);

  // Members Compact KPI Stats
  const memberKpiStats = useMemo(() => {
    const total = currentOrgMembers.length;
    const admins = currentOrgMembers.filter((m) => m.role === "Organization Admin").length;
    const users = currentOrgMembers.filter((m) => m.role === "Internal User").length;
    const viewers = currentOrgMembers.filter((m) => m.role === "Internal User Viewer").length;

    return [
      { id: "tot-mem", label: "Total Members", value: total.toString() },
      { id: "adm-mem", label: "Organization Admins", value: admins.toString() },
      { id: "usr-mem", label: "Internal Users", value: users.toString() },
      { id: "view-mem", label: "View Only Users", value: viewers.toString() },
    ];
  }, [currentOrgMembers]);

  // Member Handlers
  const isDuplicateMember = useMemo(() => {
    if (!selectedOrg) return false;
    const targetEmail = selectedUserEmail.toLowerCase().trim();
    const targetUserId = selectedUserId.toLowerCase().trim();
    return currentOrgMembers.some(
      (m) =>
        (userLookupMethod === "email" && m.email.toLowerCase() === targetEmail) ||
        (userLookupMethod === "userId" && m.userId.toLowerCase() === targetUserId)
    );
  }, [currentOrgMembers, selectedUserEmail, selectedUserId, userLookupMethod, selectedOrg]);

  const isAddMemberFormValid = useMemo(() => {
    if (userLookupMethod === "email") {
      return selectedUserEmail.trim().length > 0 && !isDuplicateMember;
    } else {
      return selectedUserId.trim().length > 0 && !isDuplicateMember;
    }
  }, [userLookupMethod, selectedUserEmail, selectedUserId, isDuplicateMember]);

  const handleOpenAddMemberModal = () => {
    setSelectedUserEmail(mockSystemUsers[0]?.email || "");
    setSelectedUserId(mockSystemUsers[0]?.id || "");
    setSelectedMemberRole("Internal User");
    setUserLookupMethod("email");
    setMemberFormTouched(false);
    setShowAddMemberModal(true);
  };

  const handleOpenEditMemberModal = (member: OrgMemberItem) => {
    setSelectedMember(member);
    setSelectedMemberRole(member.role);
    setShowEditMemberModal(true);
  };

  const handleSaveAddMember = () => {
    setMemberFormTouched(true);
    if (!selectedOrg || !isAddMemberFormValid) {
      if (isDuplicateMember) {
        toast.error("This user is already a member of this Organization.");
      } else {
        toast.error("Please select a valid user.");
      }
      return;
    }

    const matchedUser = mockSystemUsers.find((u) =>
      userLookupMethod === "email"
        ? u.email.toLowerCase() === selectedUserEmail.toLowerCase()
        : u.id.toLowerCase() === selectedUserId.toLowerCase()
    ) || {
      id: selectedUserId || `usr-${Date.now()}`,
      name: selectedUserEmail.split("@")[0] || "New User",
      email: selectedUserEmail || "user@hb.com",
    };

    const newMember: OrgMemberItem = {
      id: `mem-${Date.now()}`,
      userId: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: selectedMemberRole,
      currentSpend: 0,
      joinedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      status: "Active",
    };

    setMembersMap((prev) => ({
      ...prev,
      [selectedOrg.id]: [newMember, ...(prev[selectedOrg.id] || [])],
    }));

    setOrganizations((prev) =>
      prev.map((o) =>
        o.id === selectedOrg.id ? { ...o, membersCount: o.membersCount + 1 } : o
      )
    );

    toast.success(`Member "${matchedUser.name}" added to ${selectedOrg.name}!`);
    setShowAddMemberModal(false);
  };

  const handleSaveEditMember = () => {
    if (!selectedOrg || !selectedMember) return;

    setMembersMap((prev) => ({
      ...prev,
      [selectedOrg.id]: (prev[selectedOrg.id] || []).map((m) =>
        m.id === selectedMember.id ? { ...m, role: selectedMemberRole } : m
      ),
    }));

    toast.success(`Role for "${selectedMember.name}" updated to ${selectedMemberRole}.`);
    setShowEditMemberModal(false);
  };

  const handleRemoveMemberSubmit = () => {
    if (!selectedOrg || !selectedMember) return;

    setMembersMap((prev) => ({
      ...prev,
      [selectedOrg.id]: (prev[selectedOrg.id] || []).filter((m) => m.id !== selectedMember.id),
    }));

    setOrganizations((prev) =>
      prev.map((o) =>
        o.id === selectedOrg.id ? { ...o, membersCount: Math.max(0, o.membersCount - 1) } : o
      )
    );

    toast.success(`Member "${selectedMember.name}" removed from ${selectedOrg.name}.`);
    setShowRemoveMemberModal(false);
  };

  // Settings Tab Handlers
  const handleStartInlineSettingsEdit = () => {
    if (!selectedOrg) return;
    setSettingsFormName(selectedOrg.name);
    setSettingsFormDescription(selectedOrg.description || "");
    setSettingsMaxBudget(selectedOrg.maxBudget.toString());
    setSettingsSoftBudget((selectedOrg.maxBudget * 0.8).toString());
    setSettingsResetCycle(selectedOrg.resetCycle);
    setSettingsTpmLimit(selectedOrg.tpmLimit.toString());
    setSettingsRpmLimit(selectedOrg.rpmLimit.toString());
    setIsSettingsEditMode(true);
  };

  const handleSaveInlineSettings = () => {
    if (!selectedOrg || !settingsFormName.trim()) {
      toast.error("Organization Name is required.");
      return;
    }

    const updatedOrg: OrganizationItem = {
      ...selectedOrg,
      name: settingsFormName.trim(),
      description: settingsFormDescription.trim(),
      maxBudget: parseFloat(settingsMaxBudget) || 0,
      resetCycle: settingsResetCycle,
      tpmLimit: parseInt(settingsTpmLimit) || 500000,
      rpmLimit: parseInt(settingsRpmLimit) || 5000,
    };

    setSelectedOrg(updatedOrg);
    setOrganizations((prev) => prev.map((o) => (o.id === selectedOrg.id ? updatedOrg : o)));
    toast.success(`Settings for "${updatedOrg.name}" updated successfully!`);
    setIsSettingsEditMode(false);
  };

  // Dynamic KPI Summary Stats
  const kpiStats = useMemo(() => {
    const totalOrgs = organizations.length;
    const activeOrgs = organizations.filter((o) => o.status === "Active").length;
    const totalMembers = organizations.reduce((sum, o) => sum + o.membersCount, 0);
    const totalBudget = organizations.reduce((sum, o) => sum + o.maxBudget, 0);
    const configuredModelsCount = AVAILABLE_MODELS.length;

    return [
      {
        id: "total-orgs",
        label: "Total Organizations",
        value: totalOrgs.toString(),
        subValue: `${activeOrgs} Active in Gateway`,
      },
      {
        id: "active-orgs",
        label: "Active Organizations",
        value: activeOrgs.toString(),
        subValue: `${((activeOrgs / (totalOrgs || 1)) * 100).toFixed(0)}% Operational`,
      },
      {
        id: "total-members",
        label: "Total Members",
        value: totalMembers.toString(),
        subValue: "Assigned Across Orgs",
      },
      {
        id: "configured-models",
        label: "Configured Models",
        value: configuredModelsCount.toString(),
        subValue: "Available in Catalog",
      },
      {
        id: "total-budget",
        label: "Total Budget Allocated",
        value: `$${totalBudget.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
        subValue: "Current Monthly Cap",
      },
    ];
  }, [organizations]);

  // Filtered Organizations
  const filteredOrgs = useMemo(() => {
    return organizations.filter((org) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        org.name.toLowerCase().includes(query) ||
        org.orgId.toLowerCase().includes(query) ||
        (org.description && org.description.toLowerCase().includes(query));

      const matchesStatus = filterStatus === "All" || org.status === filterStatus;

      const matchesModels =
        filterModels.length === 0 ||
        org.assignedModels.includes("All Models") ||
        org.modelSelectionType === "all" ||
        filterModels.some((selectedModel) =>
          org.assignedModels.some((assigned) => assigned.toLowerCase() === selectedModel.toLowerCase())
        );

      let matchesDate = true;
      if (filterStartDate || filterEndDate) {
        const orgDate = new Date(org.createdDate).getTime();
        if (filterStartDate) {
          const startMs = new Date(filterStartDate + "T00:00:00").getTime();
          if (!isNaN(orgDate) && !isNaN(startMs) && orgDate < startMs) {
            matchesDate = false;
          }
        }
        if (filterEndDate) {
          const endMs = new Date(filterEndDate + "T23:59:59").getTime();
          if (!isNaN(orgDate) && !isNaN(endMs) && orgDate > endMs) {
            matchesDate = false;
          }
        }
      }

      return matchesSearch && matchesStatus && matchesModels && matchesDate;
    });
  }, [organizations, searchQuery, filterStatus, filterModels, filterStartDate, filterEndDate]);

  // Sorted Organizations
  const sortedOrgs = useMemo(() => {
    return [...filteredOrgs].sort((a, b) => {
      let aVal: any = a[sortField];
      let bVal: any = b[sortField];

      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal || "").toLowerCase();
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredOrgs, sortField, sortDirection]);

  // Paginated Organizations
  const paginatedOrgs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedOrgs.slice(start, start + pageSize);
  }, [sortedOrgs, currentPage, pageSize]);

  // Handlers
  const handleSort = (field: keyof OrganizationItem) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortIndicator = (field: keyof OrganizationItem) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 font-bold" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 font-bold" />
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(paginatedOrgs.map((o) => o.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) {
      next.add(id);
    } else {
      next.delete(id);
    }
    setSelectedIds(next);
  };

  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setSelectedOrg(null);
    setFormName("");
    setFormDescription("");
    setFormModelSelectionType("selected");
    setActiveProviderCards([
      { providerId: "openai", providerName: "OpenAI", selectedModels: ["GPT-4o", "GPT-4 Mini"] },
      { providerId: "anthropic", providerName: "Anthropic", selectedModels: ["Claude 3.5 Sonnet"] },
    ]);
    setShowAddProviderDropdown(false);
    setFormCountry("United States");
    setFormState("California");
    setFormCity("");
    setFormZipCode("");
    setFormPhone("");
    setFormAdminName("");
    setFormAdminEmail("");
    setFormAdminPhone("");
    setFormTouched(false);
    setIsSubmitting(false);
    setViewState("form");
  };

  const handleOpenEditModal = (org: OrganizationItem) => {
    setSelectedOrg(org);
    setIsEditMode(true);
    setFormName(org.name);
    setFormDescription(org.description || "");
    setFormModelSelectionType(org.modelSelectionType || "selected");
    
    const initialCards: ActiveProviderCard[] = [];
    AI_PROVIDERS.forEach((p) => {
      const pModelNames = p.models.map((m) => m.name);
      const matched = org.assignedModels.filter((m) => pModelNames.includes(m));
      if (matched.length > 0) {
        initialCards.push({
          providerId: p.id,
          providerName: p.name,
          selectedModels: matched,
        });
      }
    });
    if (initialCards.length === 0) {
      initialCards.push({
        providerId: "openai",
        providerName: "OpenAI",
        selectedModels: ["GPT-4o"],
      });
    }
    setActiveProviderCards(initialCards);
    setShowAddProviderDropdown(false);

    setFormCountry(org.country || "United States");
    setFormState(org.state || "California");
    setFormCity(org.city || "");
    setFormZipCode(org.zipCode || "");
    setFormPhone(org.phone || "");
    setFormAdminName(org.primaryAdminName || "John Doe");
    setFormAdminEmail(org.primaryAdminEmail || "admin@company.com");
    setFormAdminPhone(org.primaryAdminPhone || "");
    setFormTouched(false);
    setIsSubmitting(false);
    setViewState("form");
  };

  const handleSaveOrganization = () => {
    setFormTouched(true);
    if (!isFormValid) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const computedModels = activeProviderCards.flatMap((c) => c.selectedModels);
      const finalModels =
        formModelSelectionType === "all"
          ? ["All Models"]
          : computedModels.length > 0
          ? computedModels
          : ["GPT-4o"];

      if (isEditMode && selectedOrg) {
        const updatedOrg: OrganizationItem = {
          ...selectedOrg,
          name: formName.trim(),
          description: formDescription.trim(),
          modelSelectionType: formModelSelectionType,
          assignedModels: finalModels,
          country: formCountry,
          state: formState,
          city: formCity,
          zipCode: formZipCode,
          phone: formPhone,
          primaryAdminName: formAdminName,
          primaryAdminEmail: formAdminEmail,
          primaryAdminPhone: formAdminPhone,
        };

        setOrganizations((prev) =>
          prev.map((o) => (o.id === selectedOrg.id ? updatedOrg : o))
        );
        setSelectedOrg(updatedOrg);
        toast.success(`Organization "${formName.trim()}" updated successfully!`);
        setIsSubmitting(false);
        setViewState("detail");
      } else {
        const newOrgId = `org-${Math.random().toString(36).substring(2, 10)}`;
        const newOrg: OrganizationItem = {
          id: `org-${Date.now()}`,
          orgId: newOrgId,
          name: formName.trim(),
          description: formDescription.trim(),
          createdDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          currentSpend: 0.0,
          maxBudget: 5000,
          resetCycle: "Monthly",
          modelSelectionType: formModelSelectionType,
          assignedModels: finalModels,
          tpmLimit: 500000,
          rpmLimit: 5000,
          country: formCountry,
          state: formState,
          city: formCity,
          zipCode: formZipCode,
          phone: formPhone,
          primaryAdminName: formAdminName,
          primaryAdminEmail: formAdminEmail,
          primaryAdminPhone: formAdminPhone,
          membersCount: 1,
          status: "Active",
          createdBy: "superadmin@spinecloudiq.com",
        };

        setOrganizations((prev) => [newOrg, ...prev]);

        // Add initial primary admin member
        const newMember: OrgMemberItem = {
          id: `mem-${Date.now()}`,
          userId: `usr-${Math.random().toString(36).substring(2, 7)}`,
          name: formAdminName.trim(),
          email: formAdminEmail.trim(),
          role: "Organization Admin",
          currentSpend: 0,
          joinedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          status: "Active",
        };
        setMembersMap((prev) => ({ ...prev, [newOrg.id]: [newMember] }));

        setHighlightedOrgId(newOrg.id);
        toast.success(`Organization "${newOrg.name}" created successfully! Verification email sent to ${formAdminEmail}.`);
        setTimeout(() => setHighlightedOrgId(null), 3000);
        setIsSubmitting(false);
        setViewState("list");
      }
    }, 400);
  };

  const handleToggleStatusConfirm = () => {
    if (!selectedOrg) return;
    const nextStatus = selectedOrg.status === "Active" ? "Inactive" : "Active";
    const updated = { ...selectedOrg, status: nextStatus as OrganizationItem["status"] };
    setSelectedOrg(updated);
    setOrganizations(prev => prev.map(o => o.id === selectedOrg.id ? updated : o));
    toast.success(`Organization status changed to ${nextStatus}.`);
    setShowStatusModal(false);
  };

  const handleDeleteOrganization = () => {
    if (!selectedOrg) return;

    setOrganizations((prev) => prev.filter((o) => o.id !== selectedOrg.id));
    toast.success(`Organization "${selectedOrg.name}" has been soft deleted.`);
    setShowDeleteModal(false);
    setSelectedOrg(null);
    setViewState("list");
  };

  const getBadgeStyle = (status: OrganizationItem["status"]) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "Inactive":
        return "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700";
      case "Suspended":
        return "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800";
    }
  };

  const renderStatusBadge = (status: OrganizationItem["status"]) => (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getBadgeStyle(status)}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );

  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto space-y-6">

      {/* ========================================================================= */}
      {/* SCREEN 1: ORGANIZATIONS LISTING TABLE                                     */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* SCREEN 3: DEDICATED CREATE / EDIT ORGANIZATION PAGE                       */}
      {/* ========================================================================= */}
      {viewState === "form" ? (
        <div className="space-y-6 animate-fadeIn pb-12">
          {/* Back Navigation Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                if (isEditMode && selectedOrg) {
                  setViewState("detail");
                } else {
                  setViewState("list");
                }
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isEditMode ? "Back to Organization Detail" : "Back to Organizations"}</span>
            </button>
          </div>

          <PageHeader
            pageId="organizations"
            action={isEditMode ? "edit" : "create"}
          />

          {/* Form Container */}
          <form onSubmit={(e) => { e.preventDefault(); handleSaveOrganization(); }} className="space-y-6 w-full max-w-7xl mx-auto">
            {/* CARD 1: Organization Information */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  Organization Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Organization Name */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Organization Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Enter Organization Name (e.g. CyberShield Ltd, Acme Corp)"
                    maxLength={100}
                    className={`w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                      formTouched && (!formName.trim() || isDuplicateName)
                        ? "border-rose-500 bg-rose-50/20"
                        : "border-neutral-300 dark:border-neutral-700"
                    }`}
                  />
                  <div className="flex items-center justify-between mt-1 text-[11px]">
                    {formName.trim() === "" && formTouched ? (
                      <span className="text-rose-500 font-medium">Organization Name is required.</span>
                    ) : isDuplicateName ? (
                      <span className="text-rose-500 font-medium">An Organization with this name already exists.</span>
                    ) : (
                      <span className="text-neutral-400">Must be unique across your Gateway instance.</span>
                    )}
                    <span className="text-neutral-400 font-mono">{formName.length}/100</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Description <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Describe the department, unit, or team scope of this organization..."
                    maxLength={300}
                    rows={3}
                    className="w-full p-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* CARD 2: Models Access Assignment (Scalable Provider Cards Pattern) */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  Models Access Assignment
                </h3>
                {formModelSelectionType === "selected" && (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowAddProviderDropdown(!showAddProviderDropdown)}
                      className="px-3.5 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-950/80 text-primary-700 dark:text-primary-300 border border-primary-200/80 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Provider</span>
                    </button>

                    {/* Add Provider Dropdown Menu */}
                    {showAddProviderDropdown && (
                      <div className="absolute right-0 top-full mt-1.5 z-40 w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-1.5 text-xs animate-fadeIn">
                        <div className="px-2.5 py-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100 dark:border-neutral-800 mb-1">
                          Select AI Provider
                        </div>
                        {availableProvidersToAdd.length === 0 ? (
                          <div className="px-2 py-3 text-neutral-400 text-center text-[11px]">
                            All available providers have been added.
                          </div>
                        ) : (
                          availableProvidersToAdd.map((p) => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => handleAddProviderCard(p)}
                              className="w-full text-left px-2.5 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg flex items-center justify-between font-semibold text-neutral-800 dark:text-neutral-200 transition-colors"
                            >
                              <span>{p.name}</span>
                              <span className="text-[10px] text-neutral-400 font-normal">({p.models.length} models)</span>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Selection Mode Radios */}
              <div className="space-y-4 pt-1">
                <div className="flex items-center gap-6 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-neutral-800 dark:text-neutral-200">
                    <input
                      type="radio"
                      name="modelSelectionType"
                      checked={formModelSelectionType === "all"}
                      onChange={() => setFormModelSelectionType("all")}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span>All Available Models</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-neutral-800 dark:text-neutral-200">
                    <input
                      type="radio"
                      name="modelSelectionType"
                      checked={formModelSelectionType === "selected"}
                      onChange={() => {
                        setFormModelSelectionType("selected");
                        if (activeProviderCards.length === 0) {
                          setActiveProviderCards([
                            { providerId: "openai", providerName: "OpenAI", selectedModels: ["GPT-4o", "GPT-4 Mini"] },
                            { providerId: "anthropic", providerName: "Anthropic", selectedModels: ["Claude 3.5 Sonnet"] }
                          ]);
                        }
                      }}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span>Selected Models</span>
                  </label>
                </div>

                {formModelSelectionType === "selected" && (
                  <div className="space-y-4 pt-2">
                    {activeProviderCards.length === 0 ? (
                      <div className="p-8 text-center bg-neutral-50/60 dark:bg-neutral-900/40 border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl space-y-2">
                        <Cpu className="w-8 h-8 text-neutral-400 mx-auto stroke-1" />
                        <div className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                          No Providers Added
                        </div>
                        <p className="text-[11px] text-neutral-500 max-w-sm mx-auto">
                          Click <strong>"+ Add Provider"</strong> above to assign AI model providers to this organization.
                        </p>
                      </div>
                    ) : (
                      activeProviderCards.map((card) => {
                        const providerObj = AI_PROVIDERS.find((p) => p.id === card.providerId);
                        if (!providerObj) return null;

                        return (
                          <div
                            key={card.providerId}
                            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs space-y-4 transition-all"
                          >
                            {/* Provider Card Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                              <div className="flex items-center gap-2.5">
                                <span className="font-bold text-sm text-neutral-900 dark:text-white">
                                  {card.providerName}
                                </span>
                                <span className="text-[11px] font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 px-2.5 py-0.5 rounded-full border border-primary-200/50">
                                  {card.selectedModels.length} {card.selectedModels.length === 1 ? "Model" : "Models"} Selected
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveProviderCard(card.providerId)}
                                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove Provider</span>
                              </button>
                            </div>

                            {/* Multi-Select Searchable Dropdown Component for this Provider */}
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block">
                                Choose Models
                              </label>
                              <MultiSelectSearchableDropdown
                                options={providerObj.models.map((m) => ({
                                  id: m.id,
                                  name: m.name,
                                  badge: m.badge,
                                }))}
                                selectedValues={card.selectedModels}
                                onChange={(selected) => handleUpdateCardModels(card.providerId, selected)}
                                placeholder={`Select ${card.providerName} models...`}
                              />
                              {card.selectedModels.length === 0 && (
                                <p className="text-[11px] font-semibold text-rose-500 pt-1">
                                  At least one model must be selected for {card.providerName}.
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* CARD 3: Address & Regional Settings */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  Address & Regional Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Country */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Country <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                    className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500"
                  >
                    {Object.keys(COUNTRIES_AND_STATES).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* State */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    State / Province <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formState}
                    onChange={(e) => setFormState(e.target.value)}
                    className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500"
                  >
                    {(COUNTRIES_AND_STATES[formCountry] || []).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">City</label>
                  <input
                    type="text"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    placeholder="e.g. San Francisco, London"
                    className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* ZIP Code */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">ZIP / Postal Code</label>
                  <input
                    type="text"
                    value={formZipCode}
                    onChange={(e) => setFormZipCode(e.target.value)}
                    placeholder="e.g. 94105, EC1A 1BB"
                    className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">Organization Phone</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 234-5678"
                    className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* CARD 4: Primary Administrator */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  Primary Administrator Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Admin Name */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formAdminName}
                    onChange={(e) => setFormAdminName(e.target.value)}
                    placeholder="e.g. John Doe, Sarah Connor"
                    className={`w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 transition-all ${
                      formTouched && !formAdminName.trim() ? "border-rose-500 bg-rose-50/20" : "border-neutral-300 dark:border-neutral-700"
                    }`}
                  />
                  {formTouched && !formAdminName.trim() && (
                    <p className="text-[11px] font-semibold text-rose-500">Primary Admin Name is required.</p>
                  )}
                </div>

                {/* Admin Email */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formAdminEmail}
                    onChange={(e) => setFormAdminEmail(e.target.value)}
                    placeholder="e.g. admin@company.com"
                    className={`w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 transition-all ${
                      formTouched && !formAdminEmail.trim() ? "border-rose-500 bg-rose-50/20" : "border-neutral-300 dark:border-neutral-700"
                    }`}
                  />
                  {formTouched && !formAdminEmail.trim() && (
                    <p className="text-[11px] font-semibold text-rose-500">Primary Admin Email is required.</p>
                  )}
                </div>

                {/* Admin Phone */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Direct Phone Number
                  </label>
                  <input
                    type="text"
                    value={formAdminPhone}
                    onChange={(e) => setFormAdminPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 019-2831"
                    className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-neutral-50 dark:bg-neutral-850/60 rounded-lg flex items-start gap-2.5 border border-neutral-200/60 dark:border-neutral-800">
                <ShieldCheck className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                  An automated onboarding email will be sent to the primary administrator with instructions to set their password and log in to the Organization Portal.
                </p>
              </div>
            </div>

            {/* Form Actions Bar */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (isEditMode && selectedOrg) {
                    setViewState("detail");
                  } else {
                    setViewState("list");
                  }
                }}
                className="px-5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Cancel
              </button>

              <PrimaryButton
                icon={Save}
                type="submit"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting
                  ? "Saving Organization..."
                  : isEditMode
                    ? "Save Changes"
                    : "Create Organization"}
              </PrimaryButton>
            </div>
          </form>
        </div>
      ) : viewState === "list" || !selectedOrg ? (
        <>
          <PageHeader
            pageId="organizations"
            action="list"
          >
            {/* 1. Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              placeholder="Search Organizations..."
            />

            {/* 2. Filter Button */}
            <IconButton
              icon={Filter}
              label="Filter"
              active={filterStatus !== "All" || filterModels.length > 0 || Boolean(filterStartDate) || Boolean(filterEndDate)}
              onClick={() => setShowFilterModal(true)}
              title="Filter Organizations"
            />

            {/* 3. Column Selector */}
            <div className="relative" ref={columnAnchorRef}>
              <IconButton
                icon={Columns3}
                label="Columns"
                onClick={() => setShowColumnPanel(!showColumnPanel)}
                title="Customize Table Columns"
              />
              {showColumnPanel && (
                <ColumnVisibilityPanel
                  isOpen={showColumnPanel}
                  onClose={() => setShowColumnPanel(false)}
                  anchorRef={columnAnchorRef}
                  columns={allColumns}
                  visibleColumns={visibleColumns}
                  onToggleColumn={toggleColumn}
                />
              )}
            </div>

            {/* 4. Export */}
            <IconButton
              icon={Download}
              label="Export"
              onClick={() => setShowExportModal(true)}
            />

            {/* 5. Refresh */}
            <IconButton
              icon={RefreshCw}
              label="Refresh"
              onClick={() => toast.success("Refreshed Organizations list")}
            />

            {/* 6. Show/Hide Summary Toggle */}
            <IconButton
              icon={showSummary ? EyeOff : BarChart3}
              label={showSummary ? "Hide Summary" : "Show Summary"}
              onClick={() => setShowSummary(!showSummary)}
              title={showSummary ? "Hide Summary Cards" : "Show Summary Cards"}
            />

            {/* 7. Bulk Import Icon Button */}
            <IconButton
              icon={Upload}
              label="Bulk Import"
              onClick={() => {
                setImportStep(1);
                setImportFile(null);
                setImportResults(null);
                setShowBulkImportModal(true);
              }}
              title="Bulk Import Organizations"
            />

            {/* 8. Create Organization Primary Button (Last Position) */}
            <PrimaryButton icon={Plus} onClick={handleOpenCreateModal}>
              Create Organization
            </PrimaryButton>
          </PageHeader>

          {/* Collapsible Summary Cards */}
          {showSummary && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 transition-all duration-300 animate-fadeIn">
              {kpiStats.map((stat) => (
                <div 
                  key={stat.id} 
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 dark:text-white mb-0.5">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-neutral-400 dark:text-neutral-500">
                    {stat.subValue}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Listing Table Container */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-neutral-50/80 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-semibold text-xs">
                    <th className="py-3 px-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === paginatedOrgs.length && paginatedOrgs.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                    </th>

                    {visibleColumns.orgId && <th className="py-3 px-4">Organization ID</th>}

                    {visibleColumns.name && (
                      <th 
                        onClick={() => handleSort("name")} 
                        className="py-3 px-4 cursor-pointer select-none group hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <span>Organization Name</span>
                          {renderSortIndicator("name")}
                        </div>
                      </th>
                    )}

                    {visibleColumns.createdDate && <th className="py-3 px-4">Created Date</th>}
                    {visibleColumns.currentSpend && <th className="py-3 px-4 text-right">Lifetime Spend (USD)</th>}
                    {visibleColumns.assignedModels && <th className="py-3 px-4">Models</th>}
                    {visibleColumns.tpmLimit && <th className="py-3 px-4">TPM Limit</th>}
                    {visibleColumns.rpmLimit && <th className="py-3 px-4">RPM Limit</th>}
                    {visibleColumns.country && <th className="py-3 px-4">Country</th>}
                    {visibleColumns.status && <th className="py-3 px-4">Status</th>}
                    {visibleColumns.membersCount && <th className="py-3 px-4 text-center">Members</th>}

                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
                  {paginatedOrgs.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="py-12 text-center text-neutral-400 dark:text-neutral-500 space-y-3">
                        <Building2 className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-700 stroke-1" />
                        <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">No Organizations Found</div>
                        <p className="text-xs max-w-sm mx-auto">No organizations match your search query or filter selection.</p>
                        <PrimaryButton icon={Plus} onClick={handleOpenCreateModal}>
                          Create Organization
                        </PrimaryButton>
                      </td>
                    </tr>
                  ) : (
                    paginatedOrgs.map((item) => {
                      const isSelected = selectedIds.has(item.id);
                      const isMenuOpen = activeMenuId === item.id;
                      const isHighlighted = item.id === highlightedOrgId;

                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-all duration-500 ${
                            isHighlighted
                              ? "bg-primary-50/80 dark:bg-primary-950/60 ring-2 ring-primary-500/60 shadow-xs"
                              : isSelected
                              ? "bg-primary-50/40 dark:bg-primary-950/20"
                              : ""
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => handleSelectOne(item.id, e.target.checked)}
                              className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                            />
                          </td>

                          {/* Organization ID Column */}
                          {visibleColumns.orgId && (
                            <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                <span>{item.orgId}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyText(item.orgId, "Copied Organization ID!")}
                                  className="hover:text-primary-600 transition-colors p-0.5"
                                  title="Copy Org ID"
                                >
                                  {copiedId === item.orgId ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            </td>
                          )}

                          {/* Organization Name Column */}
                          {visibleColumns.name && (
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => {
                                  setSelectedOrg(item);
                                  setViewState("detail");
                                }}
                                className="font-bold text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 hover:underline transition-colors text-left block"
                              >
                                {item.name}
                              </button>
                            </td>
                          )}

                          {visibleColumns.createdDate && <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">{item.createdDate}</td>}

                          {/* Lifetime Spend (USD) Column (Right Aligned) */}
                          {visibleColumns.currentSpend && (
                            <td className="py-3.5 px-4 text-right font-mono font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                              ${item.currentSpend.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                          )}

                          {/* Models Column */}
                          {visibleColumns.assignedModels && (
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setModelsDrawerOrg(item);
                                  setShowModelsDrawer(true);
                                }}
                                className="inline-flex items-center gap-1.5 font-semibold text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline cursor-pointer group focus:outline-hidden"
                                title="Click to view assigned models"
                              >
                                <span>{getModelCountLabel(item)}</span>
                              </button>
                            </td>
                          )}

                          {/* TPM Limit */}
                          {visibleColumns.tpmLimit && (
                            <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                              {item.tpmLimit.toLocaleString()}
                            </td>
                          )}

                          {/* RPM Limit */}
                          {visibleColumns.rpmLimit && (
                            <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                              {item.rpmLimit.toLocaleString()}
                            </td>
                          )}

                          {/* Country */}
                          {visibleColumns.country && (
                            <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                              {item.country || "United States"}
                            </td>
                          )}

                          {/* Status Badge */}
                          {visibleColumns.status && (
                            <td className="py-3.5 px-4">{renderStatusBadge(item.status)}</td>
                          )}

                          {/* Members Column (Centered) */}
                          {visibleColumns.membersCount && (
                            <td className="py-3.5 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedOrg(item);
                                  setDetailTab("members");
                                  setViewState("detail");
                                }}
                                className="font-semibold text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-1"
                              >
                                <Users className="w-3.5 h-3.5" />
                                <span>{item.membersCount}</span>
                              </button>
                            </td>
                          )}

                          {/* Actions Three-Dot Menu */}
                          <td className="py-3.5 px-4 text-right relative action-menu-container">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(isMenuOpen ? null : item.id);
                              }}
                              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                              title="Actions Menu"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {isMenuOpen && (
                              <div className="absolute right-4 top-10 z-30 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg py-1.5 text-left text-xs animate-fadeIn">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    setSelectedOrg(item);
                                    setViewState("detail");
                                  }}
                                  className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2"
                                >
                                  <Eye className="w-3.5 h-3.5 text-neutral-500" />
                                  <span>View Details</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    handleOpenEditModal(item);
                                  }}
                                  className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-neutral-500" />
                                  <span>Edit Organization</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    setSelectedOrg(item);
                                    setShowStatusModal(true);
                                  }}
                                  className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2"
                                >
                                  <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
                                  <span>{item.status === "Active" ? "Deactivate" : "Activate"}</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    setSelectedOrg(item);
                                    setShowLoginAsModal(true);
                                  }}
                                  className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2"
                                >
                                  <LogIn className="w-3.5 h-3.5 text-neutral-500" />
                                  <span>Login as Organization</span>
                                </button>

                                <hr className="my-1 border-neutral-100 dark:border-neutral-800" />

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    setSelectedOrg(item);
                                    setShowDeleteModal(true);
                                  }}
                                  className="w-full px-3 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 font-medium"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Soft Delete</span>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredOrgs.length / pageSize) || 1}
                totalItems={filteredOrgs.length}
                itemsPerPage={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
                onItemsPerPageChange={(size) => {
                  setPageSize(size);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </>
      ) : (
        /* ========================================================================= */
        /* SCREEN 2: ORGANIZATION DETAIL VIEW PAGE                                   */
        /* ========================================================================= */
        selectedOrg && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Navigation & Single HB Actions Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setViewState("list")}
                className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Organizations
              </button>

              {/* Restore Single HB Actions Dropdown */}
              <div className="flex items-center gap-2 relative">
                <button
                  type="button"
                  onClick={() => setShowHeaderActionsMenu(!showHeaderActionsMenu)}
                  className="px-3.5 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  title="Organization Actions"
                >
                  <MoreVertical className="w-4 h-4 text-neutral-500" />
                  <span>Actions</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {showHeaderActionsMenu && (
                  <div className="absolute right-0 top-11 z-30 w-48 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg py-1.5 text-left text-xs animate-fadeIn">
                    <button
                      type="button"
                      onClick={() => {
                        setShowHeaderActionsMenu(false);
                        handleOpenEditModal(selectedOrg);
                      }}
                      className="w-full px-3.5 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Edit Organization</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowHeaderActionsMenu(false);
                        setShowStatusModal(true);
                      }}
                      className="w-full px-3.5 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{selectedOrg.status === "Active" ? "Deactivate" : "Activate"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowHeaderActionsMenu(false);
                        setShowLoginAsModal(true);
                      }}
                      className="w-full px-3.5 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2"
                    >
                      <LogIn className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Login as Organization</span>
                    </button>

                    <hr className="my-1 border-neutral-100 dark:border-neutral-800" />

                    <button
                      type="button"
                      onClick={() => {
                        setShowHeaderActionsMenu(false);
                        setShowDeleteModal(true);
                      }}
                      className="w-full px-3.5 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Soft Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Original HB Header Summary Card */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                      {selectedOrg.name}
                    </h2>
                    {renderStatusBadge(selectedOrg.status)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono min-w-0">
                    <span className="truncate max-w-[320px]" title={selectedOrg.orgId}>
                      Org ID: {selectedOrg.orgId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyText(selectedOrg.orgId, "Copied Organization ID!")}
                      className="text-neutral-400 hover:text-primary-600 transition-colors p-1 shrink-0"
                      title="Copy Org ID"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <div className="text-neutral-400 font-medium">Lifetime Spend</div>
                    <div className="text-xl font-bold text-neutral-900 dark:text-white font-mono">${selectedOrg.currentSpend.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
                  </div>
                </div>
              </div>

              {/* Metadata Header Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-xs">
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">Created By</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200 truncate" title={getUserDisplayName(selectedOrg.createdBy).fullText}>
                    {getUserDisplayName(selectedOrg.createdBy).name}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">Created Date</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedOrg.createdDate}</div>
                </div>
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">Last Updated On</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedOrg.lastUpdatedOn || "Jul 28, 2026"}</div>
                </div>
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">Updated By</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200 truncate" title={getUserDisplayName(selectedOrg.updatedBy || selectedOrg.createdBy).fullText}>
                    {getUserDisplayName(selectedOrg.updatedBy || selectedOrg.createdBy).name}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">TPM Limit</div>
                  <div className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{selectedOrg.tpmLimit.toLocaleString()}</div>
                </div>
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">RPM Limit</div>
                  <div className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{selectedOrg.rpmLimit.toLocaleString()}</div>
                </div>
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">Members</div>
                  <div className="font-semibold text-primary-600">{selectedOrg.membersCount} Active Members</div>
                </div>
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">Lifetime Spend</div>
                  <div className="font-mono font-semibold text-neutral-900 dark:text-white">${selectedOrg.currentSpend.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
                </div>
              </div>
            </div>

            {/* Standard HB Horizontal Tabs */}
            <div className="border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto">
              <div className="flex gap-6 text-xs font-semibold min-w-max">
                {(["overview", "members", "models", "teams"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDetailTab(tab)}
                    className={`py-2.5 border-b-2 capitalize transition-colors ${
                      detailTab === tab
                        ? "border-primary-600 text-primary-600 dark:text-primary-400"
                        : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* OVERVIEW TAB */}
            {detailTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
                {/* CARD 1 — ORGANIZATION INFORMATION */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs hover:shadow-md transition-shadow space-y-3.5">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-neutral-100 dark:border-neutral-800">
                    <Building2 className="w-4 h-4 text-primary-600" />
                    <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                      Organization Information
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 font-medium">Organization Name:</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">{selectedOrg.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 font-medium">Organization ID:</span>
                      <div className="flex items-center gap-1 font-mono text-[11px]">
                        <span className="truncate max-w-[120px]">{selectedOrg.orgId}</span>
                        <button type="button" onClick={() => handleCopyText(selectedOrg.orgId, "Copied Organization ID!")} title="Copy Org ID">
                          <Copy className="w-3 h-3 text-neutral-400 hover:text-primary-600" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 font-medium">Created Date:</span>
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">{selectedOrg.createdDate}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-neutral-400 font-medium mt-0.5">Created By:</span>
                      <div className="text-right">
                        <div className="font-semibold text-neutral-900 dark:text-white" title={getUserDisplayName(selectedOrg.createdBy).fullText}>
                          {getUserDisplayName(selectedOrg.createdBy).name}
                        </div>
                        {getUserDisplayName(selectedOrg.createdBy).email && (
                          <div className="text-[10px] text-neutral-400 font-mono">{getUserDisplayName(selectedOrg.createdBy).email}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 font-medium">Last Updated On:</span>
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">{selectedOrg.lastUpdatedOn || "Jul 28, 2026"}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-neutral-400 font-medium mt-0.5">Updated By:</span>
                      <div className="text-right">
                        <div className="font-semibold text-neutral-900 dark:text-white" title={getUserDisplayName(selectedOrg.updatedBy || selectedOrg.createdBy).fullText}>
                          {getUserDisplayName(selectedOrg.updatedBy || selectedOrg.createdBy).name}
                        </div>
                        {getUserDisplayName(selectedOrg.updatedBy || selectedOrg.createdBy).email && (
                          <div className="text-[10px] text-neutral-400 font-mono">{getUserDisplayName(selectedOrg.updatedBy || selectedOrg.createdBy).email}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400 font-medium">Status:</span>
                      {renderStatusBadge(selectedOrg.status)}
                    </div>
                  </div>
                </div>

                {/* CARD 2 — ASSIGNED MODELS (REPLACES BUDGET SUMMARY) */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs hover:shadow-md transition-shadow space-y-3.5">
                  <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-emerald-600" />
                      <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                        Assigned Models
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/50">
                      {getModelCount(selectedOrg)} Models
                    </span>
                  </div>
                  
                  {/* Grouped Models Content */}
                  <div className="max-h-52 overflow-y-auto space-y-3 pr-1">
                    {(() => {
                      const modelsList = mockOrgModels[selectedOrg.id] || [];
                      const grouped = new Map<string, string[]>();

                      if (selectedOrg.modelSelectionType === "all" || selectedOrg.assignedModels.includes("All Models")) {
                        AI_PROVIDERS.forEach((p) => {
                          grouped.set(p.name, p.models.map((m) => m.name));
                        });
                      } else if (modelsList.length > 0) {
                        modelsList.forEach((m) => {
                          if (!grouped.has(m.provider)) grouped.set(m.provider, []);
                          grouped.get(m.provider)!.push(m.modelName);
                        });
                      } else {
                        selectedOrg.assignedModels.forEach((mName) => {
                          const pObj = AI_PROVIDERS.find((p) => p.models.some((mod) => mod.name.toLowerCase() === mName.toLowerCase()));
                          const pName = pObj ? pObj.name : "Other Providers";
                          if (!grouped.has(pName)) grouped.set(pName, []);
                          grouped.get(pName)!.push(mName);
                        });
                      }

                      if (grouped.size === 0) {
                        return <div className="text-neutral-400 text-xs py-4 text-center">No models assigned to this organization.</div>;
                      }

                      return Array.from(grouped.entries()).map(([provider, models]) => (
                        <div key={provider} className="space-y-1.5">
                          <div className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center justify-between">
                            <span>{provider}</span>
                            <span className="text-neutral-400 text-[10px] font-normal">({models.length})</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {models.map((mName) => (
                              <span
                                key={mName}
                                className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[11px] font-medium text-neutral-800 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-750"
                              >
                                {mName}
                              </span>
                            ))}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* CARD 3 — RATE LIMITS */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs hover:shadow-md transition-shadow space-y-3.5">
                  <div className="flex items-center gap-2 pb-2.5 border-b border-neutral-100 dark:border-neutral-800">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                      Rate Limits
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg text-center">
                      <div className="text-neutral-400 text-[10px] font-semibold uppercase">TPM Limit</div>
                      <div className="text-lg font-bold text-neutral-900 dark:text-white font-mono mt-0.5">
                        {selectedOrg.tpmLimit ? selectedOrg.tpmLimit.toLocaleString() : "Unlimited"}
                      </div>
                    </div>
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg text-center">
                      <div className="text-neutral-400 text-[10px] font-semibold uppercase">RPM Limit</div>
                      <div className="text-lg font-bold text-neutral-900 dark:text-white font-mono mt-0.5">
                        {selectedOrg.rpmLimit ? selectedOrg.rpmLimit.toLocaleString() : "Unlimited"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CARD 4 — ASSIGNED TEAMS */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs hover:shadow-md transition-shadow space-y-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100 dark:border-neutral-800">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                          Assigned Teams
                        </h3>
                      </div>
                      <span className="font-bold text-xs text-primary-600">
                        {(mockOrgTeams[selectedOrg.id] || []).length} Teams
                      </span>
                    </div>
                    <div className="space-y-2 mt-3">
                      {(mockOrgTeams[selectedOrg.id] || []).map((t) => (
                        <div
                          key={t.id}
                          className="p-2 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg flex items-center justify-between text-neutral-800 dark:text-neutral-200 text-xs font-medium"
                        >
                          <span>{t.name}</span>
                          <span className="font-mono font-bold text-neutral-900 dark:text-white">
                            ${t.spend.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 text-right">
                    <button 
                      type="button" 
                      onClick={() => setDetailTab("teams")}
                      className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline cursor-pointer"
                    >
                      View All Teams →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MEMBERS TAB */}
            {detailTab === "members" && (
              <div className="space-y-4 text-xs animate-fadeIn">
                {/* Members Action Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 shadow-2xs">
                  <div className="flex items-center gap-2 flex-1">
                    <SearchBar
                      value={memberSearchQuery}
                      onChange={(val) => setMemberSearchQuery(val)}
                      placeholder="Search Members by Full Name or Email Address..."
                    />
                    <select
                      value={memberFilterRole}
                      onChange={(e) => setMemberFilterRole(e.target.value)}
                      className="h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium"
                    >
                      <option value="All">All Roles</option>
                      <option value="Organization Admin">Organization Admin</option>
                      <option value="Internal User">Internal User</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <IconButton
                      icon={showMemberSummary ? EyeOff : BarChart3}
                      label={showMemberSummary ? "Hide Summary" : "Show Summary"}
                      onClick={() => setShowMemberSummary(!showMemberSummary)}
                      title="Toggle Member Summary Cards"
                    />
                    <IconButton
                      icon={Download}
                      label="Export"
                      onClick={() => toast.success("Exported Members list to CSV")}
                    />
                    <IconButton
                      icon={RefreshCw}
                      label="Refresh"
                      onClick={() => toast.success("Refreshed Organization Members")}
                    />
                    <PrimaryButton icon={Plus} onClick={handleOpenAddMemberModal}>
                      Add Member
                    </PrimaryButton>
                  </div>
                </div>

                {/* Compact Members KPI Summary Cards */}
                {showMemberSummary && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fadeIn">
                    {memberKpiStats.map((stat) => (
                      <div key={stat.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-2xs">
                        <div className="text-neutral-400 text-[11px] font-medium">{stat.label}</div>
                        <div className="text-xl font-bold text-neutral-900 dark:text-white mt-0.5">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Members Table */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-neutral-50/80 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-semibold">
                          <th className="py-3 px-4 w-10">
                            <input
                              type="checkbox"
                              checked={selectedMemberIds.size === filteredMembers.length && filteredMembers.length > 0}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedMemberIds(new Set(filteredMembers.map((m) => m.id)));
                                } else {
                                  setSelectedMemberIds(new Set());
                                }
                              }}
                              className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                            />
                          </th>
                          <th className="py-3 px-4">User ID</th>
                          <th className="py-3 px-4">Full Name</th>
                          <th className="py-3 px-4">Email Address</th>
                          <th className="py-3 px-4">Organization Role</th>
                          <th className="py-3 px-4">Spend (USD)</th>
                          <th className="py-3 px-4">Created Date</th>
                          <th className="py-3 px-4">Joined Date</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
                        {filteredMembers.length === 0 ? (
                          <tr>
                            <td colSpan={10} className="py-12 text-center text-neutral-400 space-y-3">
                              <Users className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-700 stroke-1" />
                              <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">No Members Added</div>
                              <p className="text-xs max-w-sm mx-auto">No members match your search or filter selection in this organization.</p>
                            </td>
                          </tr>
                        ) : (
                          filteredMembers.map((mem) => {
                            const isMenuOpen = activeMemberMenuId === mem.id;
                            const isSelected = selectedMemberIds.has(mem.id);

                            return (
                              <tr key={mem.id} className={`hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors ${isSelected ? "bg-primary-50/30" : ""}`}>
                                <td className="py-3.5 px-4">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={(e) => {
                                      const next = new Set(selectedMemberIds);
                                      if (e.target.checked) next.add(mem.id);
                                      else next.delete(mem.id);
                                      setSelectedMemberIds(next);
                                    }}
                                    className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                  />
                                </td>

                                <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                                  <div className="flex items-center gap-1">
                                    <span>{mem.userId}</span>
                                    <button type="button" onClick={() => handleCopyText(mem.userId, "Copied User ID!")} title="Copy User ID">
                                      <Copy className="w-3 h-3 text-neutral-400 hover:text-primary-600" />
                                    </button>
                                  </div>
                                </td>

                                <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                                  {mem.name}
                                </td>

                                <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                                  {mem.email}
                                </td>

                                <td className="py-3.5 px-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                                    mem.role === "Organization Admin"
                                      ? "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200"
                                      : "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200"
                                  }`}>
                                    {mem.role}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4 font-mono font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                                  ${mem.currentSpend.toFixed(2)}
                                </td>

                                <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                                  {mem.createdDate || "May 10, 2026"}
                                </td>

                                <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                                  {mem.joinedDate}
                                </td>

                                <td className="py-3.5 px-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                    mem.status === "Active"
                                      ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200"
                                      : mem.status === "Pending Invitation"
                                      ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200"
                                      : "bg-neutral-100 text-neutral-600 border-neutral-200"
                                  }`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                    {mem.status}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4 text-right relative">
                                  <button
                                    type="button"
                                    onClick={() => setActiveMemberMenuId(isMenuOpen ? null : mem.id)}
                                    className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </button>

                                  {isMenuOpen && (
                                    <div className="absolute right-4 top-10 z-30 w-40 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg py-1.5 text-left text-xs animate-fadeIn">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveMemberMenuId(null);
                                          handleOpenEditMemberModal(mem);
                                        }}
                                        className="w-full px-3 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 font-medium"
                                      >
                                        <Edit3 className="w-3.5 h-3.5 text-neutral-500" />
                                        <span>Edit Member</span>
                                      </button>

                                      <hr className="my-1 border-neutral-100 dark:border-neutral-800" />

                                      <button
                                        type="button"
                                        onClick={() => {
                                          setActiveMemberMenuId(null);
                                          setSelectedMember(mem);
                                          setShowRemoveMemberModal(true);
                                        }}
                                        className="w-full px-3 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 font-medium"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Remove Member</span>
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* MODELS TAB */}
            {detailTab === "models" && (
              <div className="space-y-4 text-xs animate-fadeIn">
                {/* Models Action Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 shadow-2xs">
                  <div className="flex items-center gap-2 flex-1">
                    <SearchBar
                      value={modelsTabSearchQuery}
                      onChange={(val) => setModelsTabSearchQuery(val)}
                      placeholder="Search Models by Model Name or Model Alias..."
                    />
                    <select
                      value={modelsTabFilterProvider}
                      onChange={(e) => setModelsTabFilterProvider(e.target.value)}
                      className="h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium"
                    >
                      <option value="All">All Providers</option>
                      {AI_PROVIDERS.map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                    <select
                      value={modelsTabFilterStatus}
                      onChange={(e) => setModelsTabFilterStatus(e.target.value)}
                      className="h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <IconButton
                      icon={Download}
                      label="Export"
                      onClick={() => toast.success("Exported assigned models list")}
                    />
                    <IconButton
                      icon={RefreshCw}
                      label="Refresh"
                      onClick={() => toast.success("Refreshed assigned models")}
                    />
                  </div>
                </div>

                {/* Models Table */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-neutral-50/80 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-semibold">
                          <th className="py-3 px-4">Provider</th>
                          <th className="py-3 px-4">Model Name</th>
                          <th className="py-3 px-4">Model Alias</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Added On</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
                        {(() => {
                          const modelsList = mockOrgModels[selectedOrg.id] || [];
                          const filtered = modelsList.filter((m) => {
                            const q = modelsTabSearchQuery.toLowerCase().trim();
                            const matchesSearch =
                              !q ||
                              m.modelName.toLowerCase().includes(q) ||
                              m.modelAlias.toLowerCase().includes(q);
                            const matchesProvider =
                              modelsTabFilterProvider === "All" || m.provider === modelsTabFilterProvider;
                            const matchesStatus =
                              modelsTabFilterStatus === "All" || m.status === modelsTabFilterStatus;
                            return matchesSearch && matchesProvider && matchesStatus;
                          });

                          if (filtered.length === 0) {
                            return (
                              <tr>
                                <td colSpan={5} className="py-12 text-center text-neutral-400 space-y-3">
                                  <Cpu className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-700 stroke-1" />
                                  <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">No Models Found</div>
                                  <p className="text-xs max-w-sm mx-auto">No assigned models match your search or filter selection.</p>
                                </td>
                              </tr>
                            );
                          }

                          return filtered.map((mod) => (
                            <tr key={mod.id} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors">
                              <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                                {mod.provider}
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-primary-600 dark:text-primary-400 whitespace-nowrap">
                                {mod.modelName}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                                {mod.modelAlias}
                              </td>
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50">
                                  ● {mod.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                                {mod.addedOn}
                              </td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TEAMS TAB */}
            {detailTab === "teams" && (
              <div className="space-y-4 text-xs animate-fadeIn">
                {/* Teams Action Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 shadow-2xs">
                  <div className="flex items-center gap-2 flex-1">
                    <SearchBar
                      value={teamsTabSearchQuery}
                      onChange={(val) => setTeamsTabSearchQuery(val)}
                      placeholder="Search Teams by Team Name..."
                    />
                    <select
                      value={teamsTabFilterStatus}
                      onChange={(e) => setTeamsTabFilterStatus(e.target.value)}
                      className="h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <IconButton
                      icon={Download}
                      label="Export"
                      onClick={() => toast.success("Exported Teams list")}
                    />
                    <IconButton
                      icon={RefreshCw}
                      label="Refresh"
                      onClick={() => toast.success("Refreshed assigned teams")}
                    />
                  </div>
                </div>

                {/* Teams Table */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-neutral-50/80 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-semibold">
                          <th className="py-3 px-4">Team Name</th>
                          <th className="py-3 px-4">Members</th>
                          <th className="py-3 px-4">Spend (USD)</th>
                          <th className="py-3 px-4">Created On</th>
                          <th className="py-3 px-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
                        {(() => {
                          const teamsList = mockOrgTeams[selectedOrg.id] || [];
                          const filtered = teamsList.filter((t) => {
                            const q = teamsTabSearchQuery.toLowerCase().trim();
                            const matchesSearch = !q || t.name.toLowerCase().includes(q);
                            const matchesStatus = teamsTabFilterStatus === "All" || t.status === teamsTabFilterStatus;
                            return matchesSearch && matchesStatus;
                          });

                          if (filtered.length === 0) {
                            return (
                              <tr>
                                <td colSpan={5} className="py-12 text-center text-neutral-400 space-y-3">
                                  <Users className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-700 stroke-1" />
                                  <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">No Teams Found</div>
                                  <p className="text-xs max-w-sm mx-auto">No assigned teams match your search or filter selection.</p>
                                </td>
                              </tr>
                            );
                          }

                          return filtered.map((team) => (
                            <tr key={team.id} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors">
                              <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                                {team.name}
                              </td>
                              <td className="py-3.5 px-4 font-medium text-neutral-700 dark:text-neutral-300 whitespace-nowrap">
                                {team.membersCount} Members
                              </td>
                              <td className="py-3.5 px-4 font-mono font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                                ${team.spend.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                              <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                                {team.createdOn}
                              </td>
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                                  team.status === "Active"
                                    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200/50"
                                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200/50"
                                }`}>
                                  ● {team.status}
                                </span>
                              </td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      )}

      {/* FILTER DRAWER MODAL */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-6 relative overflow-visible">
            <div className="space-y-5 flex-1 overflow-y-auto pr-1 sm:overflow-visible">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary-600" />
                  Filter Organizations
                </h3>
                <button type="button" onClick={() => setShowFilterModal(false)}>
                  <X className="w-5 h-5 text-neutral-400 hover:text-neutral-700" />
                </button>
              </div>

              <div className="space-y-6 text-xs">
                {/* 1. Created Date Range */}
                <div className="space-y-2">
                  <label className="font-bold text-xs block text-neutral-800 dark:text-neutral-200">
                    Created Date
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-neutral-500 font-medium block mb-1">Start Date</span>
                      <input
                        type="date"
                        value={filterStartDate}
                        onChange={(e) => setFilterStartDate(e.target.value)}
                        className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-500 font-medium block mb-1">End Date</span>
                      <input
                        type="date"
                        value={filterEndDate}
                        onChange={(e) => setFilterEndDate(e.target.value)}
                        className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  {(filterStartDate || filterEndDate) && (
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setFilterStartDate("");
                          setFilterEndDate("");
                        }}
                        className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                      >
                        Clear Date Range
                      </button>
                    </div>
                  )}
                </div>

                <hr className="border-neutral-100 dark:border-neutral-800" />

                {/* 2. Status Dropdown */}
                <div className="space-y-2">
                  <label className="font-bold text-xs block text-neutral-800 dark:text-neutral-200">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-primary-500 transition-all cursor-pointer"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>

                <hr className="border-neutral-100 dark:border-neutral-800" />

                {/* 3. Models Multi-Select Searchable Dropdown */}
                <div className="space-y-2 pb-4">
                  <label className="font-bold text-xs block text-neutral-800 dark:text-neutral-200">
                    Models
                  </label>
                  <MultiSelectSearchableDropdown
                    options={AVAILABLE_MODELS}
                    selectedValues={filterModels}
                    onChange={(selected) => setFilterModels(selected)}
                    placeholder="Select models..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setFilterStatus("All");
                  setFilterModels([]);
                  setFilterStartDate("");
                  setFilterEndDate("");
                  setSearchQuery("");
                }}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-lg"
              >
                Reset
              </button>
              <PrimaryButton onClick={() => setShowFilterModal(false)}>
                Apply Filters
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-primary-600" />
                Export Organizations
              </h3>
              <button type="button" onClick={() => setShowExportModal(false)}>
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            <p className="text-xs text-neutral-500">
              Export active dataset ({filteredOrgs.length} records) to your preferred file format:
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  toast.success("Exported Organizations list to CSV");
                  setShowExportModal(false);
                }}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary-500 flex flex-col items-center gap-2"
              >
                <FileText className="w-8 h-8 text-blue-600" />
                <span className="font-bold">CSV Format</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toast.success("Exported Organizations list to Excel");
                  setShowExportModal(false);
                }}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary-500 flex flex-col items-center gap-2"
              >
                <FileSpreadsheet className="w-8 h-8 text-emerald-600" />
                <span className="font-bold">Excel (.xlsx)</span>
              </button>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BULK IMPORT MODAL */}
      {showBulkImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-primary-600" />
                  Bulk Import Organizations
                </h3>
                <p className="text-xs text-neutral-400">Step {importStep} of 4</p>
              </div>
              <button type="button" onClick={() => setShowBulkImportModal(false)}>
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-semibold text-neutral-500">
              <div className={`py-1 rounded ${importStep >= 1 ? "bg-primary-600 text-white" : "bg-neutral-100"}`}>1. Template</div>
              <div className={`py-1 rounded ${importStep >= 2 ? "bg-primary-600 text-white" : "bg-neutral-100"}`}>2. Upload</div>
              <div className={`py-1 rounded ${importStep >= 3 ? "bg-primary-600 text-white" : "bg-neutral-100"}`}>3. Validation</div>
              <div className={`py-1 rounded ${importStep >= 4 ? "bg-primary-600 text-white" : "bg-neutral-100"}`}>4. Results</div>
            </div>

            {importStep === 1 && (
              <div className="space-y-4 text-xs">
                <p className="text-neutral-500">
                  Download the sample CSV template to ensure your data columns match Guardian Layer requirements.
                </p>
                <div className="p-4 rounded-xl border border-dashed text-center space-y-2">
                  <FileSpreadsheet className="w-8 h-8 mx-auto text-emerald-600" />
                  <p className="font-bold">guardian_layer_org_import_template.csv</p>
                  <button 
                    type="button"
                    onClick={() => toast.success("Downloaded sample CSV template")}
                    className="text-primary-600 hover:underline font-semibold"
                  >
                    Download Template
                  </button>
                </div>
                <div className="flex justify-end pt-2">
                  <PrimaryButton onClick={() => setImportStep(2)}>Next: Upload CSV</PrimaryButton>
                </div>
              </div>
            )}

            {importStep === 2 && (
              <div className="space-y-4 text-xs">
                <div 
                  onClick={() => setImportFile(new File(["sample"], "organizations.csv", { type: "text/csv" }))}
                  className="p-8 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 text-center cursor-pointer hover:border-primary-500 space-y-2"
                >
                  <Upload className="w-8 h-8 mx-auto text-neutral-400" />
                  <p className="font-bold text-neutral-800 dark:text-neutral-200">
                    {importFile ? importFile.name : "Click to select CSV file"}
                  </p>
                  <p className="text-[11px] text-neutral-400">Max size 10MB (.csv or .xlsx)</p>
                </div>
                <div className="flex justify-between pt-2">
                  <button type="button" onClick={() => setImportStep(1)} className="px-4 py-2 border rounded-lg">Back</button>
                  <PrimaryButton disabled={!importFile} onClick={() => setImportStep(3)}>Next: Validate</PrimaryButton>
                </div>
              </div>
            )}

            {importStep === 3 && (
              <div className="space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg flex justify-between font-semibold">
                    <span>Valid Records Ready:</span>
                    <span>14 Records</span>
                  </div>
                  <div className="p-3 bg-amber-50 text-amber-800 rounded-lg flex justify-between font-semibold">
                    <span>Skipped / Duplicate Admin:</span>
                    <span>1 Record</span>
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <button type="button" onClick={() => setImportStep(2)} className="px-4 py-2 border rounded-lg">Back</button>
                  <PrimaryButton onClick={() => {
                    setImportResults({ success: 14, failed: 0, skipped: 1 });
                    setImportStep(4);
                  }}>
                    Execute Import
                  </PrimaryButton>
                </div>
              </div>
            )}

            {importStep === 4 && importResults && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl text-center space-y-2">
                  <Check className="w-8 h-8 mx-auto text-emerald-500" />
                  <h4 className="font-bold text-sm">Import Completed Successfully</h4>
                  <div className="grid grid-cols-3 gap-2 text-center pt-2">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 rounded">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 block">{importResults.success}</span>
                      <span className="text-[10px]">Imported</span>
                    </div>
                    <div className="p-2 bg-rose-100 dark:bg-rose-950/60 rounded">
                      <span className="font-bold text-rose-800 dark:text-rose-300 block">{importResults.failed}</span>
                      <span className="text-[10px]">Failed</span>
                    </div>
                    <div className="p-2 bg-amber-100 dark:bg-amber-950/60 rounded">
                      <span className="font-bold text-amber-800 dark:text-amber-300 block">{importResults.skipped}</span>
                      <span className="text-[10px]">Skipped</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <PrimaryButton onClick={() => setShowBulkImportModal(false)}>Close Wizard</PrimaryButton>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LOGIN AS ORGANIZATION CONFIRMATION MODAL */}
      {showLoginAsModal && selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center gap-3 text-blue-600">
              <LogIn className="w-6 h-6" />
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Login as Organization?
              </h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              You are about to temporarily access <strong>"{selectedOrg.name}"</strong>&apos;s workspace using Super Admin privileges. This action is intended for troubleshooting and support purposes.
            </p>
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLoginAsModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <PrimaryButton onClick={() => {
                toast.success(`Access granted! Temporary session started for '${selectedOrg.name}'.`);
                setShowLoginAsModal(false);
              }}>
                Continue
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* STATUS TOGGLE CONFIRMATION MODAL */}
      {showStatusModal && selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center gap-3 text-amber-600">
              <RefreshCw className="w-6 h-6" />
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                Confirm Status Change
              </h3>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Are you sure you want to change status of <strong>"{selectedOrg.name}"</strong> from <strong>{selectedOrg.status}</strong> to <strong>{selectedOrg.status === "Active" ? "Inactive" : "Active"}</strong>?
            </p>
            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <PrimaryButton onClick={handleToggleStatusConfirm}>
                Confirm Change
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-rose-200 dark:border-rose-900 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Soft Delete Organization?
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Are you sure you want to soft delete <strong>"{selectedOrg.name}"</strong> ({selectedOrg.orgId})? All member access will be suspended while preserving audit records.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteOrganization}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg"
              >
                Soft Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MEMBER MODAL */}
      {showAddMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-primary-600" />
                Add Member to Organization
              </h3>
              <button type="button" onClick={() => setShowAddMemberModal(false)}>
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                  Select System User <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedUserEmail}
                  onChange={(e) => setSelectedUserEmail(e.target.value)}
                  className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg font-medium text-xs"
                >
                  {mockSystemUsers.map((u) => (
                    <option key={u.id} value={u.email}>{u.name} ({u.email})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                  Organization Role <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedMemberRole}
                  onChange={(e) => setSelectedMemberRole(e.target.value as any)}
                  className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg font-semibold text-xs"
                >
                  <option value="Organization Admin">Organization Admin</option>
                  <option value="Internal User">Internal User</option>
                  <option value="Internal User Viewer">Internal User Viewer</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end gap-3 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setShowAddMemberModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-lg"
              >
                Cancel
              </button>
              <PrimaryButton onClick={handleSaveAddMember} disabled={!isAddMemberFormValid}>
                Add Member
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MEMBER MODAL */}
      {showEditMemberModal && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-primary-600" />
                Edit Member Role
              </h3>
              <button type="button" onClick={() => setShowEditMemberModal(false)}>
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg space-y-1 font-mono">
                <div className="font-bold text-neutral-900 dark:text-white">{selectedMember.name}</div>
                <div className="text-neutral-500 text-[11px]">{selectedMember.email}</div>
                <div className="text-neutral-400 text-[10px]">User ID: {selectedMember.userId}</div>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                  Organization Role
                </label>
                <select
                  value={selectedMemberRole}
                  onChange={(e) => setSelectedMemberRole(e.target.value as any)}
                  className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg font-semibold text-xs"
                >
                  <option value="Organization Admin">Organization Admin</option>
                  <option value="Internal User">Internal User</option>
                  <option value="Internal User Viewer">Internal User Viewer</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end gap-3 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setShowEditMemberModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-lg"
              >
                Cancel
              </button>
              <PrimaryButton onClick={handleSaveEditMember}>
                Save Changes
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* REMOVE MEMBER CONFIRMATION MODAL */}
      {showRemoveMemberModal && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-rose-200 dark:border-rose-900 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 text-center text-xs font-semibold">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                Remove Organization Member?
              </h3>
              <p className="text-xs text-neutral-500 font-normal mt-1">
                Are you sure you want to remove <strong>"{selectedMember.name}"</strong>? This member will lose access to this organization.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowRemoveMemberModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRemoveMemberSubmit}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg"
              >
                Remove Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ASSIGNED MODELS RIGHT SIDE DRAWER */}
      <AssignedModelsDrawer
        isOpen={showModelsDrawer}
        onClose={() => setShowModelsDrawer(false)}
        orgName={modelsDrawerOrg?.name || ""}
        assignedModels={modelsDrawerOrg?.assignedModels || []}
        modelSelectionType={modelsDrawerOrg?.modelSelectionType}
        providerCatalog={AI_PROVIDERS}
      />
    </div>
  );
}
