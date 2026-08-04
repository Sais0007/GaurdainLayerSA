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
  Pause, 
  Play, 
  Trash2, 
  Copy, 
  Check, 
  ArrowLeft, 
  Cpu, 
  X, 
  Activity, 
  Sliders, 
  Columns3, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  Server, 
  Layers,
  AlertTriangle,
  Building2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  CopyCheck,
  Zap,
  Globe,
  Database,
  KeyRound,
  FileSpreadsheet,
  EyeOff,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";
import { 
  PageHeader, 
  PrimaryButton, 
  SecondaryButton, 
  IconButton, 
  ColumnVisibilityPanel 
} from "./hb/listing";

// --- Model Interface ---
export interface ModelItem {
  id: string;
  modelId: string;
  provider: "OpenAI" | "Anthropic" | "Azure AI" | "Google Gemini" | "DeepSeek" | "Ollama" | "Custom";
  name: string;
  alias: string;
  description?: string;
  createdBy: string;
  createdOn: string;
  inputCost: number;
  outputCost: number;
  status: "Active" | "Paused" | "Disabled";
  healthStatus: "Healthy" | "Unhealthy" | "None";
  errorDetails?: string;
  lastCheck: string;
  lastSuccess: string;
  // Provider Config
  apiEndpoint?: string;
  resourceEndpoint?: string;
  deploymentId?: string;
  apiVersion?: string;
  apiKeySecret?: string;
  orgId?: string;
  // Budget & Limits
  maxBudget: number;
  softBudget: number;
  currentSpend: number;
  resetCycle: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Yearly" | "Never";
  notificationEmails?: string;
  tpmLimit: number;
  rpmLimit: number;
  rpdLimit: number;
  concurrentRequests: number;
  // Advanced Config
  temperature: number;
  timeout: number;
  maxRetries: number;
  maxTokens: number;
  streaming: boolean;
  promptCaching: boolean;
  providerMetadata?: string;
}

// Mock Initial Models Data
const mockModelsData: ModelItem[] = [
  {
    id: "mod-101",
    modelId: "azure-gpt-4o",
    provider: "Azure AI",
    name: "Azure OpenAI GPT-4o",
    alias: "azure-gpt4o-eastus",
    description: "Enterprise Azure OpenAI GPT-4o instance hosted in East US region",
    createdBy: "hbadmin@yopmail.com",
    createdOn: "Jul 18, 2026",
    inputCost: 2.50,
    outputCost: 10.00,
    status: "Active",
    healthStatus: "Healthy",
    errorDetails: "--",
    lastCheck: "Jul 29, 2026 16:40",
    lastSuccess: "Jul 29, 2026 16:40",
    resourceEndpoint: "https://hb-gateway-eastus.openai.azure.com",
    deploymentId: "gpt-4o-prod-01",
    apiVersion: "2024-02-15-preview",
    apiKeySecret: "kv-azure-secret-ref-882",
    maxBudget: 15000,
    softBudget: 12000,
    currentSpend: 4850.25,
    resetCycle: "Monthly",
    notificationEmails: "ops@company.com",
    tpmLimit: 1000000,
    rpmLimit: 10000,
    rpdLimit: 500000,
    concurrentRequests: 100,
    temperature: 0.7,
    timeout: 30,
    maxRetries: 3,
    maxTokens: 4096,
    streaming: true,
    promptCaching: true,
    providerMetadata: '{\n  "region": "eastus",\n  "sku": "Standard"\n}'
  },
  {
    id: "mod-102",
    modelId: "claude-3-5-sonnet",
    provider: "Anthropic",
    name: "Claude 3.5 Sonnet",
    alias: "claude-sonnet-v2",
    description: "Anthropic flagship model for reasoning, coding, and context comprehension",
    createdBy: "sarah.connor@hb.com",
    createdOn: "Jul 16, 2026",
    inputCost: 3.00,
    outputCost: 15.00,
    status: "Active",
    healthStatus: "Healthy",
    errorDetails: "--",
    lastCheck: "Jul 29, 2026 16:38",
    lastSuccess: "Jul 29, 2026 16:38",
    apiEndpoint: "https://api.anthropic.com/v1",
    apiKeySecret: "kv-anthropic-prod-key",
    maxBudget: 10000,
    softBudget: 8000,
    currentSpend: 2310.50,
    resetCycle: "Monthly",
    tpmLimit: 800000,
    rpmLimit: 8000,
    rpdLimit: 400000,
    concurrentRequests: 80,
    temperature: 0.5,
    timeout: 45,
    maxRetries: 2,
    maxTokens: 8192,
    streaming: true,
    promptCaching: true
  },
  {
    id: "mod-103",
    modelId: "deepseek-r1",
    provider: "DeepSeek",
    name: "DeepSeek R1 Reasoning",
    alias: "deepseek-reasoner",
    description: "Open reasoning model optimized for mathematical logic and complex step analysis",
    createdBy: "alex.dev@hb.com",
    createdOn: "Jul 20, 2026",
    inputCost: 0.55,
    outputCost: 2.19,
    status: "Active",
    healthStatus: "Unhealthy",
    errorDetails: "Authentication Error: 401",
    lastCheck: "Jul 29, 2026 16:45",
    lastSuccess: "Jul 28, 2026 18:30",
    apiEndpoint: "https://api.deepseek.com/v1",
    apiKeySecret: "kv-deepseek-expired-token",
    maxBudget: 3000,
    softBudget: 2400,
    currentSpend: 420.00,
    resetCycle: "Monthly",
    tpmLimit: 400000,
    rpmLimit: 4000,
    rpdLimit: 200000,
    concurrentRequests: 40,
    temperature: 0.2,
    timeout: 60,
    maxRetries: 3,
    maxTokens: 4096,
    streaming: true,
    promptCaching: false
  },
  {
    id: "mod-104",
    modelId: "gpt-4o",
    provider: "OpenAI",
    name: "GPT-4o Omnimodel",
    alias: "primary-gpt4o",
    description: "Multimodal standard model for core organization workflows and chat tools",
    createdBy: "superadmin@spinecloudiq.com",
    createdOn: "Jul 15, 2026",
    inputCost: 2.50,
    outputCost: 10.00,
    status: "Active",
    healthStatus: "Healthy",
    errorDetails: "--",
    lastCheck: "Jul 29, 2026 16:40",
    lastSuccess: "Jul 29, 2026 16:40",
    apiEndpoint: "https://api.openai.com/v1",
    orgId: "org-spinecloudiq-prod",
    apiKeySecret: "kv-openai-primary-key",
    maxBudget: 25000,
    softBudget: 20000,
    currentSpend: 11450.80,
    resetCycle: "Monthly",
    tpmLimit: 1500000,
    rpmLimit: 15000,
    rpdLimit: 1000000,
    concurrentRequests: 150,
    temperature: 0.7,
    timeout: 30,
    maxRetries: 3,
    maxTokens: 4096,
    streaming: true,
    promptCaching: true
  },
  {
    id: "mod-105",
    modelId: "llama-3-3-70b",
    provider: "Ollama",
    name: "Llama 3.3 70B Local",
    alias: "llama3-local-gpu",
    description: "Self-hosted Ollama server running Llama 3.3 70B on internal GPU cluster",
    createdBy: "michael.scott@hb.com",
    createdOn: "Jul 22, 2026",
    inputCost: 0.00,
    outputCost: 0.00,
    status: "Paused",
    healthStatus: "None",
    errorDetails: "Connection Timeout",
    lastCheck: "Jul 29, 2026 15:10",
    lastSuccess: "Jul 27, 2026 12:00",
    apiEndpoint: "http://ollama-gpu-cluster.internal:11434",
    maxBudget: 0,
    softBudget: 0,
    currentSpend: 0.00,
    resetCycle: "Never",
    tpmLimit: 500000,
    rpmLimit: 5000,
    rpdLimit: 250000,
    concurrentRequests: 20,
    temperature: 0.7,
    timeout: 90,
    maxRetries: 1,
    maxTokens: 4096,
    streaming: true,
    promptCaching: false
  }
];

// Provider Catalog for Access Assignment Section
const ALL_PROVIDER_CATALOG = [
  {
    id: "openai",
    name: "OpenAI",
    models: [
      { id: "gpt-4o", name: "GPT-4o", desc: "Flagship multimodal intelligence" },
      { id: "gpt-4-mini", name: "GPT-4o Mini", desc: "Lightweight, fast inference" },
      { id: "o1-preview", name: "o1 Preview", desc: "Advanced reasoning model" },
      { id: "text-embedding-3", name: "Text Embedding 3", desc: "High-density vector embeddings" }
    ]
  },
  {
    id: "anthropic",
    name: "Anthropic",
    models: [
      { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", desc: "Best-in-class coding & analysis" },
      { id: "claude-3-haiku", name: "Claude 3 Haiku", desc: "Ultra-fast response model" },
      { id: "claude-3-opus", name: "Claude 3 Opus", desc: "Deep complex reasoning" }
    ]
  },
  {
    id: "azure",
    name: "Azure OpenAI",
    models: [
      { id: "azure-gpt-4o", name: "Azure GPT-4o", desc: "Enterprise isolated endpoint" },
      { id: "azure-gpt-35-turbo", name: "Azure GPT-3.5 Turbo", desc: "Cost efficient deployment" }
    ]
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    models: [
      { id: "deepseek-r1", name: "DeepSeek R1", desc: "Open-weights reasoning" },
      { id: "deepseek-v3", name: "DeepSeek V3", desc: "General language understanding" }
    ]
  },
  {
    id: "google",
    name: "Google Gemini",
    models: [
      { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro", desc: "1M token context window" },
      { id: "gemini-1-5-flash", name: "Gemini 1.5 Flash", desc: "High speed multimodal" }
    ]
  },
  {
    id: "ollama",
    name: "Ollama (Self-Hosted)",
    models: [
      { id: "llama-3-3-70b", name: "Llama 3.3 70B", desc: "Private local GPU cluster" },
      { id: "mistral-large", name: "Mistral Large", desc: "On-premise European model" }
    ]
  }
];

// Audit Log Interface for Logs Tab
interface AuditLogEntry {
  id: string;
  date: string;
  user: string;
  action: string;
  ip: string;
  status: "Success" | "Failed" | "Blocked";
  description: string;
}

const mockAuditLogs: AuditLogEntry[] = [
  { id: "log-1", date: "Jul 29, 2026 16:40:12", user: "hbadmin@yopmail.com", action: "Model Test Call", ip: "192.168.1.104", status: "Success", description: "Executed health check verification probe (120ms latency)" },
  { id: "log-2", date: "Jul 29, 2026 16:38:05", user: "sarah.connor@hb.com", action: "Config Update", ip: "10.0.4.18", status: "Success", description: "Updated rate limits (TPM: 800,000, RPM: 8,000)" },
  { id: "log-3", date: "Jul 28, 2026 18:30:00", user: "alex.dev@hb.com", action: "Auth Failure", ip: "172.16.0.42", status: "Failed", description: "API Key rejected by upstream DeepSeek gateway (401 Unauthorized)" },
  { id: "log-4", date: "Jul 27, 2026 14:15:22", user: "system-auto", action: "Budget Sync", ip: "Internal Gateway", status: "Success", description: "Evaluated budget threshold (32.3% of $15,000.00 cap)" },
  { id: "log-5", date: "Jul 25, 2026 10:00:00", user: "superadmin@spinecloudiq.com", action: "Model Mapped", ip: "10.0.2.1", status: "Success", description: "Initial model endpoint provisioned and assigned to HB Enterprise" }
];

export interface ModelManagementProps {
  hideHeader?: boolean;
  orgName?: string;
  orgId?: string;
}

export function ModelManagement({ hideHeader = false, orgName, orgId }: ModelManagementProps) {
  const [models, setModels] = useState<ModelItem[]>(mockModelsData);
  const [viewState, setViewState] = useState<"list" | "detail" | "form">("list");
  const [activeTab, setActiveTab] = useState<"models" | "health">("models");
  const [selectedModel, setSelectedModel] = useState<ModelItem | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showSummary, setShowSummary] = useState(true);

  // Filter Fields State
  const [filterProvider, setFilterProvider] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterCreatedBy, setFilterCreatedBy] = useState("All");

  // Selection & Action Menu state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Sorting state
  const [sortField, setSortField] = useState<keyof ModelItem>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Column Visibility Panel State
  const [showColumnPanel, setShowColumnPanel] = useState(false);
  const columnAnchorRef = useRef<HTMLDivElement>(null);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({
    modelId: true,
    provider: true,
    name: true,
    alias: true,
    createdBy: true,
    createdOn: true,
    cost: true,
    status: true,
  });

  // Modal Dialog States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [targetModel, setTargetModel] = useState<ModelItem | null>(null);

  // View Model Tab State
  const [detailTab, setDetailTab] = useState<"overview" | "configuration" | "usage" | "logs">("overview");
  const [logsSearchQuery, setLogsSearchQuery] = useState("");
  const [logsActionFilter, setLogsActionFilter] = useState("All");

  // --- Form State (Add / Edit Page) ---
  const [formProvider, setFormProvider] = useState<ModelItem["provider"]>("OpenAI");
  const [formName, setFormName] = useState("");
  const [formAlias, setFormAlias] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formStatus, setFormStatus] = useState<ModelItem["status"]>("Active");

  // Dynamic Provider Config Fields
  const [formApiEndpoint, setFormApiEndpoint] = useState("");
  const [formResourceEndpoint, setFormResourceEndpoint] = useState("");
  const [formDeploymentId, setFormDeploymentId] = useState("");
  const [formApiVersion, setFormApiVersion] = useState("");
  const [formApiKeySecret, setFormApiKeySecret] = useState("");
  const [formOrgId, setFormOrgId] = useState("");

  // Provider-First Access Assignment State
  const [selectedProviderModels, setSelectedProviderModels] = useState<Record<string, string[]>>({
    openai: ["gpt-4o", "gpt-4-mini"],
    anthropic: ["claude-3-5-sonnet"]
  });
  const [assignmentSearch, setAssignmentSearch] = useState("");
  const [expandedProviders, setExpandedProviders] = useState<Record<string, boolean>>({
    openai: true,
    anthropic: true,
    azure: false
  });

  // Budget Config
  const [formMaxBudget, setFormMaxBudget] = useState("10000");
  const [formSoftBudget, setFormSoftBudget] = useState("8000");
  const [formNotificationEmails, setFormNotificationEmails] = useState("admin@company.com");
  const [formResetCycle, setFormResetCycle] = useState<ModelItem["resetCycle"]>("Monthly");

  // Rate Limits
  const [formTpm, setFormTpm] = useState("500000");
  const [formRpm, setFormRpm] = useState("5000");
  const [formRpd, setFormRpd] = useState("250000");
  const [formConcurrentRequests, setFormConcurrentRequests] = useState("50");

  // Advanced Config
  const [formTemperature, setFormTemperature] = useState(0.7);
  const [formTimeout, setFormTimeout] = useState(30);
  const [formMaxRetries, setFormMaxRetries] = useState(3);
  const [formMaxTokens, setFormMaxTokens] = useState(4096);
  const [formStreaming, setFormStreaming] = useState(true);
  const [formPromptCaching, setFormPromptCaching] = useState(true);
  const [formProviderMetadata, setFormProviderMetadata] = useState("");

  const [formTouched, setFormTouched] = useState(false);

  // Copy Helper
  const handleCopyText = (text: string, label: string = "Copied to clipboard!") => {
    navigator.clipboard.writeText(text);
    toast.success(label);
  };

  // KPI Calculations
  const kpiStats = useMemo(() => {
    const total = models.length;
    const active = models.filter((m) => m.status === "Active").length;
    const healthy = models.filter((m) => m.healthStatus === "Healthy").length;
    const paused = models.filter((m) => m.status === "Paused" || m.status === "Disabled").length;

    return [
      { id: "tot", label: "Total Models", value: total.toString(), subValue: `${active} Active in Gateway` },
      { id: "act", label: "Active Models", value: active.toString(), subValue: "80% Routing Traffic" },
      { id: "hea", label: "Healthy Models", value: healthy.toString(), subValue: `${models.filter(m => m.healthStatus === "Unhealthy").length} Unhealthy Alerts` },
      { id: "pau", label: "Paused Models", value: paused.toString(), subValue: "Serving Suspended" },
    ];
  }, [models]);

  // Filtered Models
  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.alias.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.modelId.toLowerCase().includes(q);

      const matchesProvider = filterProvider === "All" || m.provider === filterProvider;
      const matchesStatus = filterStatus === "All" || m.status === filterStatus;
      const matchesCreatedBy = filterCreatedBy === "All" || m.createdBy === filterCreatedBy;

      return matchesSearch && matchesProvider && matchesStatus && matchesCreatedBy;
    });
  }, [models, searchQuery, filterProvider, filterStatus, filterCreatedBy]);

  // Sorted Models
  const sortedModels = useMemo(() => {
    return [...filteredModels].sort((a, b) => {
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
  }, [filteredModels, sortField, sortDirection]);

  // Paginated Models
  const paginatedModels = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedModels.slice(start, start + pageSize);
  }, [sortedModels, currentPage, pageSize]);

  // Table Sort Handler
  const handleSort = (field: keyof ModelItem) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortIndicator = (field: keyof ModelItem) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 font-bold" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 font-bold" />
    );
  };

  // Open Add Page
  const handleOpenCreatePage = () => {
    setIsEditMode(false);
    setSelectedModel(null);
    setFormProvider("OpenAI");
    setFormName("");
    setFormAlias("");
    setFormDescription("");
    setFormStatus("Active");
    setFormApiEndpoint("https://api.openai.com/v1");
    setFormResourceEndpoint("");
    setFormDeploymentId("");
    setFormApiVersion("");
    setFormApiKeySecret("kv-openai-secret");
    setFormOrgId("");
    setFormMaxBudget("10000");
    setFormSoftBudget("8000");
    setFormNotificationEmails("admin@company.com");
    setFormResetCycle("Monthly");
    setFormTpm("500000");
    setFormRpm("5000");
    setFormRpd("250000");
    setFormConcurrentRequests("50");
    setFormTemperature(0.7);
    setFormTimeout(30);
    setFormMaxRetries(3);
    setFormMaxTokens(4096);
    setFormStreaming(true);
    setFormPromptCaching(true);
    setFormProviderMetadata("");
    setFormTouched(false);
    setViewState("form");
  };

  // Open Edit Page
  const handleOpenEditPage = (model: ModelItem) => {
    setSelectedModel(model);
    setIsEditMode(true);
    setFormProvider(model.provider);
    setFormName(model.name);
    setFormAlias(model.alias);
    setFormDescription(model.description || "");
    setFormStatus(model.status);
    setFormApiEndpoint(model.apiEndpoint || "");
    setFormResourceEndpoint(model.resourceEndpoint || "");
    setFormDeploymentId(model.deploymentId || "");
    setFormApiVersion(model.apiVersion || "");
    setFormApiKeySecret(model.apiKeySecret || "");
    setFormOrgId(model.orgId || "");
    setFormMaxBudget(model.maxBudget.toString());
    setFormSoftBudget(model.softBudget.toString());
    setFormNotificationEmails(model.notificationEmails || "");
    setFormResetCycle(model.resetCycle);
    setFormTpm(model.tpmLimit.toString());
    setFormRpm(model.rpmLimit.toString());
    setFormRpd(model.rpdLimit.toString());
    setFormConcurrentRequests(model.concurrentRequests.toString());
    setFormTemperature(model.temperature);
    setFormTimeout(model.timeout);
    setFormMaxRetries(model.maxRetries);
    setFormMaxTokens(model.maxTokens);
    setFormStreaming(model.streaming);
    setFormPromptCaching(model.promptCaching);
    setFormProviderMetadata(model.providerMetadata || "");
    setFormTouched(false);
    setViewState("form");
  };

  // Save Model Submission Handler
  const handleSaveModelSubmit = () => {
    setFormTouched(true);
    if (!formName.trim() || !formAlias.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (isEditMode && selectedModel) {
      const updatedModel: ModelItem = {
        ...selectedModel,
        provider: formProvider,
        name: formName.trim(),
        alias: formAlias.trim(),
        description: formDescription.trim(),
        status: formStatus,
        apiEndpoint: formApiEndpoint,
        resourceEndpoint: formResourceEndpoint,
        deploymentId: formDeploymentId,
        apiVersion: formApiVersion,
        apiKeySecret: formApiKeySecret,
        orgId: formOrgId,
        maxBudget: parseFloat(formMaxBudget) || 0,
        softBudget: parseFloat(formSoftBudget) || 0,
        notificationEmails: formNotificationEmails,
        resetCycle: formResetCycle,
        tpmLimit: parseInt(formTpm) || 500000,
        rpmLimit: parseInt(formRpm) || 5000,
        rpdLimit: parseInt(formRpd) || 250000,
        concurrentRequests: parseInt(formConcurrentRequests) || 50,
        temperature: formTemperature,
        timeout: formTimeout,
        maxRetries: formMaxRetries,
        maxTokens: formMaxTokens,
        streaming: formStreaming,
        promptCaching: formPromptCaching,
        providerMetadata: formProviderMetadata
      };

      setModels((prev) => prev.map((m) => (m.id === selectedModel.id ? updatedModel : m)));
      setSelectedModel(updatedModel);
      toast.success(`Model "${updatedModel.name}" updated successfully!`);
      setViewState("detail");
    } else {
      const newModelId = formAlias.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
      const newModel: ModelItem = {
        id: `mod-${Date.now()}`,
        modelId: newModelId,
        provider: formProvider,
        name: formName.trim(),
        alias: formAlias.trim(),
        description: formDescription.trim(),
        createdBy: "hbadmin@yopmail.com",
        createdOn: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        inputCost: 2.00,
        outputCost: 8.00,
        status: formStatus,
        healthStatus: "Healthy",
        errorDetails: "--",
        lastCheck: "Just now",
        lastSuccess: "Just now",
        apiEndpoint: formApiEndpoint,
        resourceEndpoint: formResourceEndpoint,
        deploymentId: formDeploymentId,
        apiVersion: formApiVersion,
        apiKeySecret: formApiKeySecret,
        orgId: formOrgId,
        maxBudget: parseFloat(formMaxBudget) || 0,
        softBudget: parseFloat(formSoftBudget) || 0,
        currentSpend: 0.00,
        resetCycle: formResetCycle,
        notificationEmails: formNotificationEmails,
        tpmLimit: parseInt(formTpm) || 500000,
        rpmLimit: parseInt(formRpm) || 5000,
        rpdLimit: parseInt(formRpd) || 250000,
        concurrentRequests: parseInt(formConcurrentRequests) || 50,
        temperature: formTemperature,
        timeout: formTimeout,
        maxRetries: formMaxRetries,
        maxTokens: formMaxTokens,
        streaming: formStreaming,
        promptCaching: formPromptCaching,
        providerMetadata: formProviderMetadata
      };

      setModels((prev) => [newModel, ...prev]);
      setSelectedModel(newModel);
      toast.success(`Model "${newModel.name}" created successfully!`);
      setViewState("detail");
    }
  };

  // Toggle Status Handler
  const handleConfirmToggleStatus = () => {
    if (!targetModel) return;
    const newStatus = targetModel.status === "Active" ? "Paused" : "Active";
    setModels((prev) =>
      prev.map((m) => (m.id === targetModel.id ? { ...m, status: newStatus } : m))
    );
    if (selectedModel?.id === targetModel.id) {
      setSelectedModel((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    toast.success(`Model "${targetModel.name}" is now ${newStatus}.`);
    setShowStatusModal(false);
    setTargetModel(null);
  };

  // Delete Model Handler
  const handleConfirmDelete = () => {
    if (!targetModel) return;
    setModels((prev) => prev.filter((m) => m.id !== targetModel.id));
    toast.success(`Model "${targetModel.name}" deleted.`);
    setShowDeleteModal(false);
    setTargetModel(null);
    if (viewState === "detail") {
      setViewState("list");
      setSelectedModel(null);
    }
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = ["Model ID", "Provider", "Model Name", "Model Alias", "Created By", "Created On", "Input Cost", "Output Cost", "Status", "Health Status"];
    const rows = filteredModels.map((m) => [
      `"${m.modelId}"`,
      `"${m.provider}"`,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.alias}"`,
      `"${m.createdBy}"`,
      `"${m.createdOn}"`,
      `"${m.inputCost}"`,
      `"${m.outputCost}"`,
      `"${m.status}"`,
      `"${m.healthStatus}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `models_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Exported Models dataset to CSV");
    setShowExportModal(false);
  };

  // Render Provider Badge Pill
  const renderProviderBadge = (provider: ModelItem["provider"]) => {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
        <Cpu className="w-3 h-3 text-primary-600" />
        {provider}
      </span>
    );
  };

  // Render Health Status Badge
  const renderHealthBadge = (health: ModelItem["healthStatus"]) => {
    if (health === "Healthy") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Healthy
        </span>
      );
    }
    if (health === "Unhealthy") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <XCircle className="w-3 h-3 text-rose-600" />
          Unhealthy
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border border-neutral-200 dark:border-neutral-700">
        ● None
      </span>
    );
  };

  // Render Status Badge
  const renderStatusBadge = (status: ModelItem["status"]) => {
    if (status === "Active") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/50">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        {status}
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto space-y-6">
      
      {/* ========================================================================= */}
      {/* VIEW 1: MODELS LISTING TABLE & HEALTH TAB                                */}
      {/* ========================================================================= */}
      {viewState === "list" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Action Toolbar (Matching Reference Card Container) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3 shadow-2xs">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <input
                  type="text"
                  placeholder="Search models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-8 text-xs bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary-500"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Filter Button */}
              <div className="relative">
                <IconButton
                  icon={Filter}
                  label="Filter"
                  onClick={() => setShowFilterDrawer(true)}
                  title="Filter Models"
                />
                {(filterProvider !== "All" || filterStatus !== "All" || filterCreatedBy !== "All") && (
                  <span className="w-2 h-2 rounded-full bg-primary-600 absolute top-1 right-1" />
                )}
              </div>

              {/* Customize Columns Button */}
              <div className="relative" ref={columnAnchorRef}>
                <IconButton
                  icon={Columns3}
                  label="Customize Columns"
                  onClick={() => setShowColumnPanel(!showColumnPanel)}
                  title="Customize Table Columns"
                />
                {showColumnPanel && (
                  <ColumnVisibilityPanel
                    columns={[
                      { key: "modelId", label: "Model ID" },
                      { key: "provider", label: "Provider" },
                      { key: "name", label: "Model Name" },
                      { key: "alias", label: "Model Alias" },
                      { key: "createdBy", label: "Created By" },
                      { key: "createdOn", label: "Created On" },
                      { key: "cost", label: "Cost (USD)" },
                      { key: "status", label: "Status" },
                    ]}
                    visibleColumns={visibleColumns}
                    onChangeColumnVisibility={(key, isVisible) =>
                      setVisibleColumns((prev) => ({ ...prev, [key]: isVisible }))
                    }
                    onResetToDefault={() =>
                      setVisibleColumns({
                        modelId: true,
                        provider: true,
                        name: true,
                        alias: true,
                        createdBy: true,
                        createdOn: true,
                        cost: true,
                        status: true,
                      })
                    }
                    onClose={() => setShowColumnPanel(false)}
                  />
                )}
              </div>

              {/* Export Button */}
              <IconButton icon={Download} label="Export" onClick={() => setShowExportModal(true)} title="Export Models" />

              {/* Refresh Button */}
              <IconButton icon={RefreshCw} label="Refresh" onClick={() => toast.success("Refreshed models list")} title="Refresh Models Data" />

              {/* Hide / Show Summary Cards Toggle Button */}
              <IconButton
                icon={showSummary ? EyeOff : BarChart3}
                label={showSummary ? "Hide Summary" : "Show Summary"}
                onClick={() => setShowSummary(!showSummary)}
                title={showSummary ? "Collapse KPI Summary Cards" : "Expand KPI Summary Cards"}
              />

              {/* Action Button: Add Model or Run Checks */}
              {activeTab === "models" ? (
                <PrimaryButton icon={Plus} onClick={handleOpenCreatePage}>
                  Add Model
                </PrimaryButton>
              ) : (
                <PrimaryButton icon={Zap} onClick={() => toast.success("Executed health check across all provider gateways!")}>
                  Run All Checks
                </PrimaryButton>
              )}
            </div>
          </div>

          {/* KPI Cards Grid (Toggleable via Hide Summary Icon Button) */}
          {showSummary && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300 animate-fadeIn">
              {kpiStats.map((kpi) => (
                <div
                  key={kpi.id}
                  className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-2xs hover:shadow-md transition-all"
                >
                  <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {kpi.label}
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                    {kpi.value}
                  </div>
                  <div className="text-[11px] font-medium text-neutral-400 mt-1">
                    {kpi.subValue}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Horizontal Tabs: Models vs Health Status */}
          <div className="border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex gap-6 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("models")}
                className={`py-3 border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === "models"
                    ? "border-primary-600 text-primary-600 dark:text-primary-400 font-bold"
                    : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Models</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  {models.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("health")}
                className={`py-3 border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === "health"
                    ? "border-primary-600 text-primary-600 dark:text-primary-400 font-bold"
                    : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Health Status</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </button>
            </div>
          </div>

          {/* TAB 1: MODELS LISTING TABLE */}
          {activeTab === "models" && (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-neutral-50/80 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 font-semibold text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                      <th className="py-3 px-4 w-10">
                        <input
                          type="checkbox"
                          checked={selectedIds.size > 0 && selectedIds.size === paginatedModels.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedIds(new Set(paginatedModels.map((m) => m.id)));
                            } else {
                              setSelectedIds(new Set());
                            }
                          }}
                          className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                        />
                      </th>
                      {visibleColumns.modelId && (
                        <th onClick={() => handleSort("modelId")} className="py-3 px-4 cursor-pointer select-none group">
                          <div className="flex items-center gap-1.5">
                            <span>Model ID</span>
                            {renderSortIndicator("modelId")}
                          </div>
                        </th>
                      )}
                      {visibleColumns.provider && <th className="py-3 px-4">Provider</th>}
                      {visibleColumns.name && (
                        <th onClick={() => handleSort("name")} className="py-3 px-4 cursor-pointer select-none group">
                          <div className="flex items-center gap-1.5">
                            <span>Model Name</span>
                            {renderSortIndicator("name")}
                          </div>
                        </th>
                      )}
                      {visibleColumns.alias && <th className="py-3 px-4">Model Alias</th>}
                      {visibleColumns.createdBy && <th className="py-3 px-4">Created By</th>}
                      {visibleColumns.createdOn && <th className="py-3 px-4">Created On</th>}
                      {visibleColumns.cost && <th className="py-3 px-4">Cost (USD)</th>}
                      {visibleColumns.status && <th className="py-3 px-4">Status</th>}
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200">
                    {paginatedModels.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-12 text-center text-neutral-400 space-y-3">
                          <Cpu className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-700 stroke-1" />
                          <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">No Models Found</div>
                          <p className="text-xs max-w-sm mx-auto">No model configurations match your search or filter selection.</p>
                          <PrimaryButton icon={Plus} onClick={handleOpenCreatePage}>
                            Add Model
                          </PrimaryButton>
                        </td>
                      </tr>
                    ) : (
                      paginatedModels.map((item) => {
                        const isSelected = selectedIds.has(item.id);
                        const isMenuOpen = activeMenuId === item.id;
                        return (
                          <tr
                            key={item.id}
                            className={`hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors ${
                              isSelected ? "bg-primary-50/30 dark:bg-primary-950/20" : ""
                            }`}
                          >
                            <td className="py-3 px-4">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  const next = new Set(selectedIds);
                                  if (e.target.checked) next.add(item.id);
                                  else next.delete(item.id);
                                  setSelectedIds(next);
                                }}
                                className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                              />
                            </td>

                            {/* Model ID */}
                            {visibleColumns.modelId && (
                              <td className="py-3.5 px-4 font-mono text-xs font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                  <span>{item.modelId}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleCopyText(item.modelId, "Copied Model ID!")}
                                    className="text-neutral-400 hover:text-primary-600"
                                    title="Copy Model ID"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              </td>
                            )}

                            {/* Provider */}
                            {visibleColumns.provider && (
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                {renderProviderBadge(item.provider)}
                              </td>
                            )}

                            {/* Model Name */}
                            {visibleColumns.name && (
                              <td className="py-3.5 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedModel(item);
                                    setViewState("detail");
                                  }}
                                  className="hover:text-primary-600 hover:underline cursor-pointer text-left"
                                >
                                  {item.name}
                                </button>
                              </td>
                            )}

                            {/* Model Alias */}
                            {visibleColumns.alias && (
                              <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                                &lt;{item.alias}&gt;
                              </td>
                            )}

                            {/* Created By */}
                            {visibleColumns.createdBy && (
                              <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                                {item.createdBy}
                              </td>
                            )}

                            {/* Created On */}
                            {visibleColumns.createdOn && (
                              <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                                {item.createdOn}
                              </td>
                            )}

                            {/* Cost */}
                            {visibleColumns.cost && (
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                <div className="text-[11px]">
                                  <div>Input: <span className="font-semibold font-mono">${item.inputCost.toFixed(2)}</span></div>
                                  <div className="text-neutral-400">Output: <span className="font-semibold font-mono">${item.outputCost.toFixed(2)}</span></div>
                                </div>
                              </td>
                            )}

                            {/* Status */}
                            {visibleColumns.status && (
                              <td className="py-3.5 px-4 whitespace-nowrap">
                                {renderStatusBadge(item.status)}
                              </td>
                            )}

                            {/* Actions Dropdown Menu */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap relative">
                              <button
                                type="button"
                                onClick={() => setActiveMenuId(isMenuOpen ? null : item.id)}
                                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {isMenuOpen && (
                                <div className="absolute right-4 top-10 w-44 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl z-30 text-xs py-1 animate-fadeIn">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      setSelectedModel(item);
                                      setViewState("detail");
                                    }}
                                    className="w-full px-3.5 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-neutral-700 dark:text-neutral-300"
                                  >
                                    <Eye className="w-3.5 h-3.5 text-neutral-500" />
                                    <span>View Model</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      handleOpenEditPage(item);
                                    }}
                                    className="w-full px-3.5 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-neutral-700 dark:text-neutral-300"
                                  >
                                    <Edit3 className="w-3.5 h-3.5 text-neutral-500" />
                                    <span>Edit Model</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      setTargetModel(item);
                                      setShowStatusModal(true);
                                    }}
                                    className="w-full px-3.5 py-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-2 text-neutral-700 dark:text-neutral-300"
                                  >
                                    {item.status === "Active" ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
                                    <span>{item.status === "Active" ? "Pause Model" : "Enable Model"}</span>
                                  </button>

                                  <hr className="my-1 border-neutral-100 dark:border-neutral-800" />

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveMenuId(null);
                                      setTargetModel(item);
                                      setShowDeleteModal(true);
                                    }}
                                    className="w-full px-3.5 py-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 text-rose-600 font-medium"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    <span>Delete</span>
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

              {/* Table Footer Pagination */}
              <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="text-neutral-500 font-medium">
                  Showing <span className="font-semibold text-neutral-900 dark:text-white">{sortedModels.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{" "}
                  <span className="font-semibold text-neutral-900 dark:text-white">{Math.min(currentPage * pageSize, sortedModels.length)}</span> of{" "}
                  <span className="font-semibold text-neutral-900 dark:text-white">{sortedModels.length}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-neutral-500">
                    <span>Rows per page:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="h-8 px-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 disabled:opacity-40 hover:bg-neutral-50"
                    >
                      Previous
                    </button>
                    <span className="px-3 py-1 font-semibold text-primary-600 bg-primary-50 rounded-lg dark:bg-primary-950/50">
                      {currentPage}
                    </span>
                    <button
                      type="button"
                      disabled={currentPage * pageSize >= sortedModels.length}
                      onClick={() => setCurrentPage((p) => p + 1)}
                      className="px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 disabled:opacity-40 hover:bg-neutral-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HEALTH STATUS TABLE */}
          {activeTab === "health" && (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-neutral-50/80 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 font-semibold text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                      <th className="py-3 px-4">Model Name</th>
                      <th className="py-3 px-4">Model ID</th>
                      <th className="py-3 px-4">Health Status</th>
                      <th className="py-3 px-4">Error Details</th>
                      <th className="py-3 px-4">Last Check</th>
                      <th className="py-3 px-4">Last Success</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-800 dark:text-neutral-200">
                    {models.map((m) => (
                      <tr key={m.id} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40">
                        <td className="py-3.5 px-4 font-semibold flex items-center gap-2 whitespace-nowrap">
                          <Cpu className="w-4 h-4 text-primary-600" />
                          <span>{m.name}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                          {m.modelId}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {renderHealthBadge(m.healthStatus)}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {m.healthStatus === "Unhealthy" ? (
                            <span className="font-mono text-rose-600 font-medium">{m.errorDetails}</span>
                          ) : (
                            <span className="text-neutral-400">--</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">{m.lastCheck}</td>
                        <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">{m.lastSuccess}</td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => toast.success(`Executed Health Check probe for ${m.name}`)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 dark:bg-primary-950/50"
                            >
                              Run Check
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: DEDICATED ADD / EDIT MODEL PAGE (NOT A MODAL)                      */}
      {/* ========================================================================= */}
      {viewState === "form" && (
        <div className="space-y-6 animate-fadeIn pb-12">
          {/* Back Navigation Header */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (isEditMode && selectedModel) {
                  setViewState("detail");
                } else {
                  setViewState("list");
                }
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Model Management</span>
            </button>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
              {isEditMode ? "Edit Model" : "Add Model"}
            </h1>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveModelSubmit(); }} className="space-y-6 w-full max-w-7xl mx-auto">
            
            {/* 1. Basic Information (Plain label title without 'Section 1') */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Provider Selection */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Provider <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formProvider}
                    onChange={(e) => setFormProvider(e.target.value as ModelItem["provider"])}
                    className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="OpenAI">OpenAI</option>
                    <option value="Anthropic">Anthropic</option>
                    <option value="Azure AI">Azure OpenAI</option>
                    <option value="Google Gemini">Google Gemini</option>
                    <option value="DeepSeek">DeepSeek</option>
                    <option value="Ollama">Ollama (Self-Hosted)</option>
                    <option value="Custom">Custom Provider</option>
                  </select>
                </div>

                {/* Model Name */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Model Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Azure OpenAI GPT-4o"
                    className={`w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 ${
                      formTouched && !formName.trim() ? "border-rose-500 bg-rose-50/20" : "border-neutral-300 dark:border-neutral-700"
                    }`}
                  />
                </div>

                {/* Model Alias */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Model Alias <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formAlias}
                    onChange={(e) => setFormAlias(e.target.value)}
                    placeholder="e.g. azure-gpt4o-eastus"
                    className="w-full h-10 px-3.5 font-mono bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as ModelItem["status"])}
                    className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Description <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    rows={2}
                    placeholder="Describe the scope or intended workload for this model..."
                    className="w-full p-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Provider Configuration (Dynamic based on selected Provider) */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  Provider Configuration ({formProvider})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {formProvider === "Azure AI" ? (
                  <>
                    <div className="space-y-1.5">
                      <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                        Resource Endpoint <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formResourceEndpoint}
                        onChange={(e) => setFormResourceEndpoint(e.target.value)}
                        placeholder="https://your-resource.openai.azure.com"
                        className="w-full h-10 px-3.5 font-mono bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                        Deployment ID <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formDeploymentId}
                        onChange={(e) => setFormDeploymentId(e.target.value)}
                        placeholder="gpt-4o-prod-01"
                        className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                        API Version
                      </label>
                      <input
                        type="text"
                        value={formApiVersion}
                        onChange={(e) => setFormApiVersion(e.target.value)}
                        placeholder="2024-02-15-preview"
                        className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                      />
                    </div>
                  </>
                ) : formProvider === "Ollama" ? (
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                      Ollama Host Endpoint <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formApiEndpoint}
                      onChange={(e) => setFormApiEndpoint(e.target.value)}
                      placeholder="http://localhost:11434"
                      className="w-full h-10 px-3.5 font-mono bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                      Base Endpoint URL
                    </label>
                    <input
                      type="text"
                      value={formApiEndpoint}
                      onChange={(e) => setFormApiEndpoint(e.target.value)}
                      placeholder="https://api.openai.com/v1"
                      className="w-full h-10 px-3.5 font-mono bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    API Key Secret Reference
                  </label>
                  <input
                    type="password"
                    value={formApiKeySecret}
                    onChange={(e) => setFormApiKeySecret(e.target.value)}
                    placeholder="kv-secret-reference"
                    className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 3. Models Access Assignment (Provider-First Selection Pattern) */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                    Models Access Assignment
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Select AI providers and toggle specific models enabled for your organization.
                  </p>
                </div>
                <div className="w-64">
                  <input
                    type="text"
                    placeholder="Search provider models..."
                    value={assignmentSearch}
                    onChange={(e) => setAssignmentSearch(e.target.value)}
                    className="w-full h-8 px-3 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                  />
                </div>
              </div>

              {/* Provider Accordion Cards */}
              <div className="space-y-3">
                {ALL_PROVIDER_CATALOG.map((providerGroup) => {
                  const isExpanded = expandedProviders[providerGroup.id] ?? false;
                  const selectedInGroup = selectedProviderModels[providerGroup.id] || [];
                  const allSelectedInGroup = providerGroup.models.every((m) => selectedInGroup.includes(m.id));

                  const filteredGroupModels = providerGroup.models.filter(
                    (m) => !assignmentSearch || m.name.toLowerCase().includes(assignmentSearch.toLowerCase())
                  );

                  if (assignmentSearch && filteredGroupModels.length === 0) return null;

                  return (
                    <div
                      key={providerGroup.id}
                      className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-neutral-50/40 dark:bg-neutral-900/40"
                    >
                      <div
                        onClick={() => setExpandedProviders((prev) => ({ ...prev, [providerGroup.id]: !isExpanded }))}
                        className="p-4 flex items-center justify-between cursor-pointer select-none bg-white dark:bg-neutral-900"
                      >
                        <div className="flex items-center gap-3">
                          <Cpu className="w-4 h-4 text-primary-600" />
                          <span className="font-bold text-sm text-neutral-900 dark:text-white">
                            {providerGroup.name}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-neutral-100 dark:bg-neutral-800 font-semibold text-neutral-600 dark:text-neutral-400">
                            {selectedInGroup.length} / {providerGroup.models.length} Selected
                          </span>
                        </div>

                        <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
                          <label className="flex items-center gap-2 text-xs font-semibold text-primary-600 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={allSelectedInGroup}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setSelectedProviderModels((prev) => ({
                                  ...prev,
                                  [providerGroup.id]: checked ? providerGroup.models.map((m) => m.id) : []
                                }));
                              }}
                              className="w-4 h-4 rounded border-neutral-300 text-primary-600"
                            />
                            Select All
                          </label>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 border-t border-neutral-100 dark:border-neutral-800">
                          {filteredGroupModels.map((m) => {
                            const isChecked = selectedInGroup.includes(m.id);
                            return (
                              <label
                                key={m.id}
                                className={`p-3 rounded-lg border flex items-start gap-3 cursor-pointer transition-all ${
                                  isChecked
                                    ? "bg-primary-50/60 dark:bg-primary-950/30 border-primary-500/50"
                                    : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    setSelectedProviderModels((prev) => {
                                      const current = prev[providerGroup.id] || [];
                                      return {
                                        ...prev,
                                        [providerGroup.id]: checked
                                          ? [...current, m.id]
                                          : current.filter((id) => id !== m.id)
                                      };
                                    });
                                  }}
                                  className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-primary-600"
                                />
                                <div>
                                  <div className="font-bold text-xs text-neutral-900 dark:text-white">{m.name}</div>
                                  <div className="text-[11px] text-neutral-500">{m.desc}</div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Budget Configuration */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  Budget Configuration
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Maximum Budget (USD)
                  </label>
                  <input
                    type="number"
                    value={formMaxBudget}
                    onChange={(e) => setFormMaxBudget(e.target.value)}
                    placeholder="10000"
                    className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Soft Budget Threshold (USD)
                  </label>
                  <input
                    type="number"
                    value={formSoftBudget}
                    onChange={(e) => setFormSoftBudget(e.target.value)}
                    placeholder="8000"
                    className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Notification Emails
                  </label>
                  <input
                    type="email"
                    value={formNotificationEmails}
                    onChange={(e) => setFormNotificationEmails(e.target.value)}
                    placeholder="alerts@company.com"
                    className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Budget Reset Cycle
                  </label>
                  <select
                    value={formResetCycle}
                    onChange={(e) => setFormResetCycle(e.target.value as ModelItem["resetCycle"])}
                    className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Never">Never</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 5. Rate Limits */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  Rate Limits
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    TPM (Tokens/Min)
                  </label>
                  <input
                    type="number"
                    value={formTpm}
                    onChange={(e) => setFormTpm(e.target.value)}
                    className="w-full h-10 px-3.5 font-mono bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    RPM (Requests/Min)
                  </label>
                  <input
                    type="number"
                    value={formRpm}
                    onChange={(e) => setFormRpm(e.target.value)}
                    className="w-full h-10 px-3.5 font-mono bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    RPD (Requests/Day)
                  </label>
                  <input
                    type="number"
                    value={formRpd}
                    onChange={(e) => setFormRpd(e.target.value)}
                    className="w-full h-10 px-3.5 font-mono bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Concurrent Requests
                  </label>
                  <input
                    type="number"
                    value={formConcurrentRequests}
                    onChange={(e) => setFormConcurrentRequests(e.target.value)}
                    className="w-full h-10 px-3.5 font-mono bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 6. Advanced Configuration */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  Advanced Configuration
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Temperature ({formTemperature})
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={2}
                    step={0.1}
                    value={formTemperature}
                    onChange={(e) => setFormTemperature(parseFloat(e.target.value))}
                    className="w-full cursor-pointer accent-primary-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Timeout (Seconds)
                  </label>
                  <input
                    type="number"
                    value={formTimeout}
                    onChange={(e) => setFormTimeout(parseInt(e.target.value) || 30)}
                    className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Max Retries
                  </label>
                  <input
                    type="number"
                    value={formMaxRetries}
                    onChange={(e) => setFormMaxRetries(parseInt(e.target.value) || 0)}
                    className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Max Tokens
                  </label>
                  <input
                    type="number"
                    value={formMaxTokens}
                    onChange={(e) => setFormMaxTokens(parseInt(e.target.value) || 4096)}
                    className="w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-6 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formStreaming}
                    onChange={(e) => setFormStreaming(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-primary-600"
                  />
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">Enable Streaming</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formPromptCaching}
                    onChange={(e) => setFormPromptCaching(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-primary-600"
                  />
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">Enable Prompt Caching</span>
                </label>
              </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <SecondaryButton
                onClick={() => {
                  if (isEditMode && selectedModel) setViewState("detail");
                  else setViewState("list");
                }}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                {isEditMode ? "Save Model Configuration" : "Create Model Configuration"}
              </PrimaryButton>
            </div>

          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: DEDICATED VIEW MODEL DETAIL PAGE                                  */}
      {/* ========================================================================= */}
      {viewState === "detail" && selectedModel && (
        <div className="space-y-6 animate-fadeIn pb-12">
          {/* Back Navigation Button */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewState("list")}
              className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Model Management</span>
            </button>

            <div className="flex items-center gap-2">
              <SecondaryButton icon={Edit3} onClick={() => handleOpenEditPage(selectedModel)}>
                Edit Model
              </SecondaryButton>
              <SecondaryButton
                icon={selectedModel.status === "Active" ? Pause : Play}
                onClick={() => {
                  setTargetModel(selectedModel);
                  setShowStatusModal(true);
                }}
              >
                {selectedModel.status === "Active" ? "Pause" : "Enable"}
              </SecondaryButton>
              <button
                type="button"
                onClick={() => {
                  setTargetModel(selectedModel);
                  setShowDeleteModal(true);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Model Header Details Card */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {selectedModel.name}
                  </h2>
                  {renderStatusBadge(selectedModel.status)}
                  {renderProviderBadge(selectedModel.provider)}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span>Model ID:</span>
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedModel.modelId}</span>
                    <button type="button" onClick={() => handleCopyText(selectedModel.modelId, "Copied Model ID!")}>
                      <Copy className="w-3.5 h-3.5 text-neutral-400 hover:text-primary-600" />
                    </button>
                  </div>
                  <div>Created By: <span className="text-neutral-700 dark:text-neutral-300 font-sans font-semibold">{selectedModel.createdBy}</span></div>
                  <div>Created On: <span className="text-neutral-700 dark:text-neutral-300 font-sans font-semibold">{selectedModel.createdOn}</span></div>
                </div>
              </div>
            </div>

            {/* Detail Tabs Header */}
            <div className="border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex gap-6 text-xs font-semibold">
                {(["overview", "configuration", "usage", "logs"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setDetailTab(t)}
                    className={`py-2.5 border-b-2 capitalize transition-colors ${
                      detailTab === t
                        ? "border-primary-600 text-primary-600 dark:text-primary-400 font-bold"
                        : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENT: OVERVIEW */}
            {detailTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs pt-2">
                {/* Card 1: Model Information */}
                <div className="bg-neutral-50/50 dark:bg-neutral-800/30 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 space-y-3">
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary-600" />
                    Model Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-neutral-400">Model Name:</span><span className="font-semibold text-neutral-900 dark:text-white">{selectedModel.name}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Model Alias:</span><span className="font-mono text-neutral-800 dark:text-neutral-200">&lt;{selectedModel.alias}&gt;</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Provider:</span><span className="font-semibold">{selectedModel.provider}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Health Status:</span>{renderHealthBadge(selectedModel.healthStatus)}</div>
                    <div className="flex justify-between"><span className="text-neutral-400">Input Cost:</span><span className="font-mono font-semibold">${selectedModel.inputCost.toFixed(2)} / 1M</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Output Cost:</span><span className="font-mono font-semibold">${selectedModel.outputCost.toFixed(2)} / 1M</span></div>
                  </div>
                </div>

                {/* Card 2: Budget Summary */}
                <div className="bg-neutral-50/50 dark:bg-neutral-800/30 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 space-y-3">
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    Budget Summary
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-neutral-400">Max Budget:</span><span className="font-mono font-semibold">${selectedModel.maxBudget.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Soft Budget:</span><span className="font-mono font-semibold">${selectedModel.softBudget.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Current Spend:</span><span className="font-mono font-bold text-emerald-600">${selectedModel.currentSpend.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Reset Cycle:</span><span className="font-semibold">{selectedModel.resetCycle}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Alert Email:</span><span className="font-mono text-[11px]">{selectedModel.notificationEmails || "N/A"}</span></div>
                  </div>
                </div>

                {/* Card 3: Rate Limits */}
                <div className="bg-neutral-50/50 dark:bg-neutral-800/30 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 space-y-3">
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white pb-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    Rate Limits & Slashing
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className="text-neutral-400">Tokens/Min (TPM):</span><span className="font-mono font-semibold">{selectedModel.tpmLimit.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Requests/Min (RPM):</span><span className="font-mono font-semibold">{selectedModel.rpmLimit.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Requests/Day (RPD):</span><span className="font-mono font-semibold">{selectedModel.rpdLimit.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Concurrent Requests:</span><span className="font-mono font-semibold">{selectedModel.concurrentRequests}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-400">Temperature:</span><span className="font-mono font-semibold">{selectedModel.temperature}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CONFIGURATION */}
            {detailTab === "configuration" && (
              <div className="p-5 bg-neutral-50/50 dark:bg-neutral-800/30 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs space-y-4">
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white border-b pb-2">Read-Only Provider Settings</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
                  <div><span className="text-neutral-400 block text-[10px]">API ENDPOINT</span>{selectedModel.apiEndpoint || selectedModel.resourceEndpoint || "Default"}</div>
                  <div><span className="text-neutral-400 block text-[10px]">DEPLOYMENT ID</span>{selectedModel.deploymentId || "Standard"}</div>
                  <div><span className="text-neutral-400 block text-[10px]">STREAMING</span>{selectedModel.streaming ? "Enabled" : "Disabled"}</div>
                  <div><span className="text-neutral-400 block text-[10px]">PROMPT CACHING</span>{selectedModel.promptCaching ? "Enabled" : "Disabled"}</div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: USAGE */}
            {detailTab === "usage" && (
              <div className="p-8 text-center border border-dashed rounded-xl space-y-3">
                <TrendingUp className="w-8 h-8 mx-auto text-primary-600" />
                <div className="font-bold text-sm">Model Metrics Analytics</div>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Historical telemetry and live request rate tracking for {selectedModel.name}.
                </p>
              </div>
            )}

            {/* TAB CONTENT: LOGS (Reusing HB Audit Log Table) */}
            {detailTab === "logs" && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                      <input
                        type="text"
                        placeholder="Search model logs..."
                        value={logsSearchQuery}
                        onChange={(e) => setLogsSearchQuery(e.target.value)}
                        className="w-full h-9 pl-9 pr-3 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                      />
                      <Search className="w-4 h-4 text-neutral-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <IconButton icon={Download} label="Export" onClick={() => toast.success("Exported audit logs to CSV")} />
                    <IconButton icon={RefreshCw} label="Refresh" onClick={() => toast.success("Refreshed logs")} />
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-50/80 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 font-semibold text-neutral-600 dark:text-neutral-400">
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">User</th>
                        <th className="py-3 px-4">Action</th>
                        <th className="py-3 px-4">IP Address</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                      {mockAuditLogs.map((l) => (
                        <tr key={l.id} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/30">
                          <td className="py-3 px-4 font-mono text-[11px] text-neutral-500">{l.date}</td>
                          <td className="py-3 px-4 font-medium text-neutral-900 dark:text-white">{l.user}</td>
                          <td className="py-3 px-4 font-semibold text-primary-600">{l.action}</td>
                          <td className="py-3 px-4 font-mono text-[11px] text-neutral-500">{l.ip}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              l.status === "Success" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}>
                              {l.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400">{l.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FILTER DRAWER                                                             */}
      {/* ========================================================================= */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setShowFilterDrawer(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-2xl">
              <div className="space-y-6 overflow-y-auto">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-bold text-base text-neutral-900 dark:text-white">Filter Models</h3>
                    <p className="text-xs text-neutral-500">Filter models by provider and gateway status.</p>
                  </div>
                  <button type="button" onClick={() => setShowFilterDrawer(false)}>
                    <X className="w-5 h-5 text-neutral-400 hover:text-neutral-700" />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Provider */}
                  <div className="space-y-1.5">
                    <label className="font-semibold text-neutral-800 dark:text-neutral-200 block">Provider</label>
                    <select
                      value={filterProvider}
                      onChange={(e) => setFilterProvider(e.target.value)}
                      className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg"
                    >
                      <option value="All">All Providers</option>
                      <option value="OpenAI">OpenAI</option>
                      <option value="Anthropic">Anthropic</option>
                      <option value="Azure AI">Azure AI</option>
                      <option value="Google Gemini">Google Gemini</option>
                      <option value="DeepSeek">DeepSeek</option>
                      <option value="Ollama">Ollama</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div className="space-y-1.5">
                    <label className="font-semibold text-neutral-800 dark:text-neutral-200 block">Status</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg"
                    >
                      <option value="All">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Paused">Paused</option>
                      <option value="Disabled">Disabled</option>
                    </select>
                  </div>

                  {/* Created By */}
                  <div className="space-y-1.5">
                    <label className="font-semibold text-neutral-800 dark:text-neutral-200 block">Created By</label>
                    <select
                      value={filterCreatedBy}
                      onChange={(e) => setFilterCreatedBy(e.target.value)}
                      className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg"
                    >
                      <option value="All">All Users</option>
                      <option value="hbadmin@yopmail.com">hbadmin@yopmail.com</option>
                      <option value="sarah.connor@hb.com">sarah.connor@hb.com</option>
                      <option value="alex.dev@hb.com">alex.dev@hb.com</option>
                      <option value="superadmin@spinecloudiq.com">superadmin@spinecloudiq.com</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-4 border-t flex justify-end gap-3">
                <SecondaryButton
                  onClick={() => {
                    setFilterProvider("All");
                    setFilterStatus("All");
                    setFilterCreatedBy("All");
                  }}
                >
                  Reset Filters
                </SecondaryButton>
                <PrimaryButton onClick={() => setShowFilterDrawer(false)}>
                  Apply Filters
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EXPORT MODAL                                                              */}
      {/* ========================================================================= */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <Download className="w-4 h-4 text-primary-600" />
                Export Models Dataset
              </h3>
              <button type="button" onClick={() => setShowExportModal(false)}>
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            <p className="text-xs text-neutral-500">
              Export active dataset ({filteredModels.length} records) to your preferred file format:
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={handleExportCSV}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary-500 flex flex-col items-center gap-2 cursor-pointer"
              >
                <FileText className="w-8 h-8 text-blue-600" />
                <span className="font-bold">CSV Format</span>
              </button>

              <button
                type="button"
                onClick={handleExportCSV}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary-500 flex flex-col items-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-8 h-8 text-emerald-600" />
                <span className="font-bold">Excel (.xlsx)</span>
              </button>
            </div>

            <div className="pt-3 border-t flex justify-end">
              <SecondaryButton onClick={() => setShowExportModal(false)}>Cancel</SecondaryButton>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATUS TOGGLE MODAL                                                       */}
      {/* ========================================================================= */}
      {showStatusModal && targetModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-4">
            <h3 className="font-bold text-base text-neutral-900 dark:text-white">
              {targetModel.status === "Active" ? "Pause Model" : "Enable Model"}
            </h3>
            <p className="text-xs text-neutral-500">
              Are you sure you want to {targetModel.status === "Active" ? "pause routing traffic for" : "enable routing for"} model <span className="font-semibold text-neutral-900 dark:text-white">{targetModel.name}</span>?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <SecondaryButton onClick={() => setShowStatusModal(false)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={handleConfirmToggleStatus}>
                Confirm {targetModel.status === "Active" ? "Pause" : "Enable"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DELETE CONFIRMATION MODAL                                                 */}
      {/* ========================================================================= */}
      {showDeleteModal && targetModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl max-w-sm w-full p-6 space-y-4">
            <h3 className="font-bold text-base text-rose-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Delete Model Mapping
            </h3>
            <p className="text-xs text-neutral-500">
              This action will permanently delete <span className="font-semibold text-neutral-900 dark:text-white">{targetModel.name}</span> ({targetModel.modelId}) from your Organization Gateway. This cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <SecondaryButton onClick={() => setShowDeleteModal(false)}>Cancel</SecondaryButton>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                Delete Model
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ModelManagement;
