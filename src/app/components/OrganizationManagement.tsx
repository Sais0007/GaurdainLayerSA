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
  CheckCircle2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Zap,
  Activity,
  PieChart,
  Layers
} from "lucide-react";
import { toast } from "sonner";
import { OrgAnalyticsDashboard } from "./OrgAnalyticsDashboard";
import ModelManagement from "./ModelManagement";
import TeamsManagement from "./TeamsManagement";
import VirtualKeyManagement from "./VirtualKeyManagement";
import UserManagement from "./UserManagement";
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

// --- Catalog Provider & Full Model Catalog Definitions (Add/Edit Organization) ---
export interface OrgCatalogProvider {
  id: string;
  name: string;
  count: number;
  color: string;
}

export const ORG_CATALOG_PROVIDERS: OrgCatalogProvider[] = [
  { id: "openai", name: "OpenAI", count: 65, color: "#2563eb" },
  { id: "anthropic", name: "Anthropic", count: 35, color: "#7c3aed" },
  { id: "gemini", name: "Google Gemini", count: 55, color: "#db2777" },
  { id: "azure", name: "Azure OpenAI", count: 50, color: "#059669" },
  { id: "bedrock", name: "AWS Bedrock", count: 80, color: "#d97706" },
  { id: "mistral", name: "Mistral AI", count: 40, color: "#0891b2" },
  { id: "cohere", name: "Cohere", count: 25, color: "#dc2626" },
  { id: "groq", name: "Groq", count: 18, color: "#4f46e5" },
  { id: "perplexity", name: "Perplexity", count: 12, color: "#65a30d" },
  { id: "deepseek", name: "DeepSeek", count: 20, color: "#9333ea" },
  { id: "xai", name: "xAI", count: 10, color: "#2563eb" },
  { id: "metaLlama", name: "Meta Llama", count: 30, color: "#7c3aed" },
  { id: "watsonx", name: "IBM watsonx", count: 22, color: "#db2777" },
  { id: "ai21", name: "AI21 Labs", count: 15, color: "#059669" },
  { id: "voyage", name: "Voyage AI", count: 13, color: "#d97706" },
  { id: "huggingface", name: "HuggingFace", count: 380, color: "#0891b2" },
  { id: "openrouter", name: "OpenRouter", count: 220, color: "#dc2626" },
  { id: "together", name: "Together AI", count: 150, color: "#4f46e5" },
  { id: "fireworks", name: "Fireworks AI", count: 120, color: "#65a30d" },
  { id: "replicate", name: "Replicate", count: 90, color: "#9333ea" },
];

export const ORG_FULL_CATALOG: Record<string, string[]> = (() => {
  const curated: Record<string, string[]> = {
    openai: [
      "gpt-4o",
      "gpt-4o-mini",
      "gpt-4.1",
      "gpt-4.1-mini",
      "o3",
      "o3-mini",
      "o4-mini",
      "chatgpt-image-latest",
      "sora-2-pro",
      "tts-1",
      "whisper-1",
      "text-embedding-3-large",
    ],
    anthropic: [
      "claude-opus-4-5",
      "claude-sonnet-4-5",
      "claude-haiku-4-5",
      "claude-3-5-sonnet-20241022",
      "claude-3-opus-20240229",
    ],
    gemini: [
      "gemini/gemini-2.5-flash",
      "gemini/gemini-2.5-pro",
      "gemini-pro-latest",
      "gemini-flash-latest",
      "gemini-embedding-001",
    ],
    azure: [
      "azure/gpt-4o",
      "azure/gpt-4o-mini",
      "azure/gpt-4.1",
      "azure/o3-mini",
      "azure/text-embedding-3-large",
    ],
    bedrock: [
      "amazon.titan-text-express-v1",
      "anthropic.claude-3-sonnet-20240229-v1:0",
      "meta.llama3-70b-instruct-v1:0",
      "mistral.mixtral-8x7b-instruct-v0:1",
    ],
    mistral: ["mistral-large-latest", "mistral-small-latest", "codestral-latest", "mistral-embed"],
    cohere: ["command-r-plus", "command-r", "embed-english-v3.0"],
    groq: ["llama-3.3-70b-versatile", "mixtral-8x7b-32768"],
    perplexity: ["sonar-pro", "sonar", "sonar-reasoning"],
    deepseek: ["deepseek-chat", "deepseek-reasoner"],
    xai: ["grok-3", "grok-3-mini", "grok-2-vision"],
    metaLlama: ["llama-3.3-70b", "llama-3.1-405b"],
    watsonx: ["granite-13b-chat-v2", "llama-3-70b-instruct"],
    ai21: ["jamba-1.5-large", "jamba-1.5-mini"],
    voyage: ["voyage-3", "voyage-code-3"],
  };

  const ORGS = ["meta-llama", "mistralai", "Qwen", "google", "microsoft", "tiiuae", "deepseek-ai", "bigcode"];
  const FAMILIES = ["llama-3", "mistral-7b", "mixtral-8x7b", "qwen2.5-72b", "gemma-2-9b", "phi-3-medium"];
  const SIZES = ["1.3", "7", "13", "34", "70"];
  const VARIANTS = ["instruct", "chat", "it", "base"];

  const hub: Record<string, string[]> = {};
  ["huggingface", "openrouter", "together", "fireworks", "replicate"].forEach((id) => {
    const p = ORG_CATALOG_PROVIDERS.find((x) => x.id === id);
    if (p) {
      hub[id] = Array.from({ length: p.count }, (_, i) => {
        const org = ORGS[i % ORGS.length];
        const fam = FAMILIES[(i * 3) % FAMILIES.length].split("-")[0];
        const size = SIZES[(i * 7) % SIZES.length];
        const variant = VARIANTS[(i * 11) % VARIANTS.length];
        return `${org}/${fam}-${size}b-${variant}`;
      });
    }
  });

  return { ...curated, ...hub };
})();

export function getOrgModelInfoText(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (Math.imul(31, hash) + name.charCodeAt(i)) | 0;
  const h = Math.abs(hash);
  const CTX = [4096, 8192, 16384, 32768, 65536, 131072, 200000, 1000000];
  const contextWindow = CTX[h % CTX.length];
  const maxOutput = [1024, 2048, 4096, 8192, 16384][h % 5];
  const inputPrice = Math.round((((h * 17) % 300) / 100) * 100) / 100;
  const outputPrice = Math.round(inputPrice * (2 + (h % 3)) * 100) / 100;

  const fmt = (n: number) => (n >= 1000000 ? `${n / 1000000}M` : n >= 1000 ? `${Math.round(n / 1000)}K` : String(n));
  return `Context: ${fmt(contextWindow)} · Max Output: ${fmt(maxOutput)} · Input: $${inputPrice.toFixed(2)}/1M · Output: $${outputPrice.toFixed(2)}/1M`;
}

// --- Organization Data Interface ---
export interface OrganizationItem {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  createdDate: string;
  expirationType?: "lifetime" | "custom";
  expirationDate?: string | null;
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
  lastUpdatedOn?: string;
  updatedBy?: string;
}

// Expiration Formatter Helper
export function formatExpirationDisplay(
  type?: "lifetime" | "custom",
  dateStr?: string | null
): { text: string; isExpired: boolean; isLifetime: boolean } {
  if (!type || type === "lifetime") {
    return { text: "Lifetime", isExpired: false, isLifetime: true };
  }
  if (!dateStr) {
    return { text: "Lifetime", isExpired: false, isLifetime: true };
  }

  let expDate: Date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
    const [y, m, d] = dateStr.trim().split("-").map(Number);
    expDate = new Date(y, m - 1, d, 23, 59, 59);
  } else {
    expDate = new Date(dateStr.includes("T") ? dateStr : dateStr + "T23:59:59");
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  if (isNaN(expDate.getTime())) {
    return { text: dateStr, isExpired: false, isLifetime: false };
  }

  const isExpired = expDate < todayStart;

  const day = String(expDate.getDate()).padStart(2, "0");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[expDate.getMonth()];
  const year = expDate.getFullYear();
  const formatted = `${day} ${month} ${year}`;

  if (isExpired) {
    return { text: "Expired", isExpired: true, isLifetime: false };
  }

  return { text: formatted, isExpired: false, isLifetime: false };
}

// Initial Mock Organizations
const mockOrganizations: OrganizationItem[] = [
  {
    id: "org-101",
    orgId: "org-57c860ac",
    name: "HB Enterprise",
    description: "Primary enterprise organization for core platform services and internal AI apps",
    createdDate: "Jul 15, 2026",
    expirationType: "lifetime",
    expirationDate: null,
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
    expirationType: "custom",
    expirationDate: "2027-12-31",
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
    expirationType: "custom",
    expirationDate: "2028-08-15",
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
    expirationType: "custom",
    expirationDate: "2025-05-10",
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
  role: "Organization Admin" | "User" | "Viewer";
  teams?: string[];
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
      teams: ["Engineering", "Security", "Research", "Operations"],
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
      teams: ["Security", "DevOps"],
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
      role: "User",
      teams: ["AI Lab", "Data Science", "Infrastructure"],
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
      role: "Viewer",
      teams: ["Core Platform"],
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
      role: "User",
      teams: ["Frontend", "UI/UX", "Product", "Quality Assurance"],
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
  const [selectedMemberRole, setSelectedMemberRole] = useState<OrgMemberItem["role"]>("User");
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

  // Overview Usage Dashboard Control State
  const [overviewDateRange, setOverviewDateRange] = useState<"7d" | "30d" | "90d" | "custom">("30d");
  const [topModelsView, setTopModelsView] = useState<"table" | "chart">("table");
  const [topTeamsView, setTopTeamsView] = useState<"table" | "chart">("table");

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
  const [openTeamsPopoverId, setOpenTeamsPopoverId] = useState<string | null>(null);
  const columnAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = () => setOpenTeamsPopoverId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const allColumns: ColumnConfig[] = [
    { key: "orgId", label: "Organization ID" },
    { key: "name", label: "Organization Name" },
    { key: "createdDate", label: "Created Date" },
    { key: "expiration", label: "Expiration" },
    { key: "currentSpend", label: "Total Spend (USD)" },
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
    expiration: true,
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
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [highlightedOrgId, setHighlightedOrgId] = useState<string | null>(null);

  // Add & Edit Model Modal State
  const [showModelModal, setShowModelModal] = useState(false);
  const [editingModel, setEditingModel] = useState<OrgModelItem | null>(null);
  const [modelFormProvider, setModelFormProvider] = useState("OpenAI");
  const [modelFormName, setModelFormName] = useState("");
  const [modelFormAlias, setModelFormAlias] = useState("");
  const [modelFormStatus, setModelFormStatus] = useState<"Active" | "Inactive">("Active");

  // Add Team Modal State
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

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
  const [formModelSelectionType, setFormModelSelectionType] = useState<"all" | "selected">("selected");

  // Models Access Assignment State (Reference: Add Organization.dc.html)
  const [selectedByProvider, setSelectedByProvider] = useState<Record<string, Record<string, boolean>>>({
    openai: { "chatgpt-image-latest": true, "sora-2-pro": true },
  });
  const [expandedSummaryProviderId, setExpandedSummaryProviderId] = useState<string | null>(null);
  const [globalModelSearch, setGlobalModelSearch] = useState("");
  const [providerListSearch, setProviderListSearch] = useState("");
  const [activeProviderId, setActiveProviderId] = useState("openai");
  const [providerModelSearch, setProviderModelSearch] = useState("");
  const [infoOpenKey, setInfoOpenKey] = useState<string | null>(null);

  const countOf = (providerId: string): number =>
    Object.values(selectedByProvider[providerId] || {}).filter(Boolean).length;

  const totalSelectedModels = useMemo(() => {
    return ORG_CATALOG_PROVIDERS.reduce((acc, p) => acc + countOf(p.id), 0);
  }, [selectedByProvider]);

  const providersWithSelection = useMemo(() => {
    return ORG_CATALOG_PROVIDERS.filter((p) => countOf(p.id) > 0);
  }, [selectedByProvider]);

  const getAllSelectedModelsList = (): string[] => {
    const list: string[] = [];
    Object.entries(selectedByProvider).forEach(([_, modelsMap]) => {
      Object.entries(modelsMap).forEach(([modelName, isSel]) => {
        if (isSel) list.push(modelName);
      });
    });
    return list;
  };

  // Organization Expiration Form State
  const [formExpirationType, setFormExpirationType] = useState<"lifetime" | "custom">("lifetime");
  const [formExpirationDate, setFormExpirationDate] = useState<string>("");
  const [formExpirationDateError, setFormExpirationDateError] = useState<string>("");

  const getTodayDateString = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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
  const [detailTab, setDetailTab] = useState<"overview" | "members" | "models" | "teams" | "virtual-keys">("overview");

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
    const basicValid =
      formName.trim().length > 0 &&
      formName.length <= 100 &&
      !isDuplicateName &&
      formAdminName.trim().length > 0 &&
      formAdminEmail.trim().length > 0;

    if (formExpirationType === "custom") {
      if (!formExpirationDate) return false;
      const [y, m, d] = formExpirationDate.split("-").map(Number);
      const selectedMs = new Date(y, m - 1, d, 23, 59, 59).getTime();
      const todayStart = new Date().setHours(0, 0, 0, 0);
      if (isNaN(selectedMs) || selectedMs < todayStart) return false;
    }

    return basicValid;
  }, [formName, isDuplicateName, formAdminName, formAdminEmail, formExpirationType, formExpirationDate]);

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
    const users = currentOrgMembers.filter((m) => m.role === "User").length;
    const viewers = currentOrgMembers.filter((m) => m.role === "Viewer").length;

    return [
      { id: "tot-mem", label: "Total Members", value: total.toString() },
      { id: "adm-mem", label: "Organization Admins", value: admins.toString() },
      { id: "usr-mem", label: "Users", value: users.toString() },
      { id: "view-mem", label: "Viewers", value: viewers.toString() },
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
    setSelectedMemberRole("User");
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

  // Model Tab Handlers (Popup / Modal Workflow)
  const handleOpenAddModelModal = () => {
    setEditingModel(null);
    setModelFormProvider("OpenAI");
    setModelFormName("");
    setModelFormAlias("");
    setModelFormStatus("Active");
    setShowModelModal(true);
  };

  const handleOpenEditModelModal = (mod: OrgModelItem) => {
    setEditingModel(mod);
    setModelFormProvider(mod.provider);
    setModelFormName(mod.modelName);
    setModelFormAlias(mod.modelAlias);
    setModelFormStatus(mod.status);
    setShowModelModal(true);
  };

  const handleSaveModel = () => {
    if (!selectedOrg || !modelFormName.trim()) return;
    const currentList = mockOrgModels[selectedOrg.id] || [];

    if (editingModel) {
      const updated = currentList.map((m) =>
        m.id === editingModel.id
          ? {
              ...m,
              provider: modelFormProvider,
              modelName: modelFormName.trim(),
              modelAlias: modelFormAlias.trim() || `<${modelFormName.toLowerCase().replace(/\s+/g, "-")}>`,
              status: modelFormStatus,
            }
          : m
      );
      mockOrgModels[selectedOrg.id] = updated;
      toast.success(`Updated model configuration for '${modelFormName.trim()}'`);
    } else {
      const newModel: OrgModelItem = {
        id: `mod-${Date.now()}`,
        provider: modelFormProvider,
        modelName: modelFormName.trim(),
        modelAlias: modelFormAlias.trim() || `<${modelFormName.toLowerCase().replace(/\s+/g, "-")}>`,
        status: modelFormStatus,
        addedOn: "Today",
      };
      mockOrgModels[selectedOrg.id] = [newModel, ...currentList];
      toast.success(`Added new model '${modelFormName.trim()}' to organization!`);
    }
    setShowModelModal(false);
  };

  const handleRemoveModel = (modId: string, modName: string) => {
    if (!selectedOrg) return;
    const currentList = mockOrgModels[selectedOrg.id] || [];
    mockOrgModels[selectedOrg.id] = currentList.filter((m) => m.id !== modId);
    toast.success(`Removed model '${modName}' from organization`);
  };

  // Team Tab Handlers (Popup / Modal Workflow)
  const handleSaveAddTeam = () => {
    if (!selectedOrg || !newTeamName.trim()) return;
    const currentTeams = mockOrgTeams[selectedOrg.id] || [];
    const newTeam: OrgTeamItem = {
      id: `team-${Date.now()}`,
      name: newTeamName.trim(),
      membersCount: 1,
      spend: 0.00,
      createdOn: "Today",
      status: "Active",
    };
    mockOrgTeams[selectedOrg.id] = [newTeam, ...currentTeams];
    toast.success(`Added team '${newTeamName.trim()}' to organization!`);
    setNewTeamName("");
    setShowAddTeamModal(false);
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
        label: "Total Spend",
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
    setFormExpirationType("lifetime");
    setFormExpirationDate("");
    setFormExpirationDateError("");
    setFormModelSelectionType("selected");
    setSelectedByProvider({
      openai: { "chatgpt-image-latest": true, "sora-2-pro": true },
    });
    setExpandedSummaryProviderId(null);
    setGlobalModelSearch("");
    setProviderListSearch("");
    setActiveProviderId("openai");
    setProviderModelSearch("");
    setInfoOpenKey(null);
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
    setFormExpirationType(org.expirationType || "lifetime");
    setFormExpirationDate(org.expirationDate || "");
    setFormExpirationDateError("");
    setFormModelSelectionType(
      org.modelSelectionType || (org.assignedModels.includes("All Models") ? "all" : "selected")
    );

    const initialSelectedByProv: Record<string, Record<string, boolean>> = {};
    if (org.assignedModels && org.assignedModels.length > 0 && !org.assignedModels.includes("All Models")) {
      org.assignedModels.forEach((assignedName) => {
        let foundProvId = "openai";
        Object.entries(ORG_FULL_CATALOG).forEach(([provId, models]) => {
          if (models.some((m) => m.toLowerCase() === assignedName.toLowerCase())) {
            foundProvId = provId;
          }
        });
        if (!initialSelectedByProv[foundProvId]) {
          initialSelectedByProv[foundProvId] = {};
        }
        initialSelectedByProv[foundProvId][assignedName] = true;
      });
    } else {
      initialSelectedByProv["openai"] = { "gpt-4o": true };
    }

    setSelectedByProvider(initialSelectedByProv);
    setExpandedSummaryProviderId(null);
    setGlobalModelSearch("");
    setProviderListSearch("");
    setActiveProviderId("openai");
    setProviderModelSearch("");
    setInfoOpenKey(null);

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

    if (!formName.trim()) {
      toast.error("Organization Name is required.");
      return;
    }

    if (formExpirationType === "custom") {
      if (!formExpirationDate) {
        setFormExpirationDateError("Expiration Date is required when Custom Expiration is selected.");
        toast.error("Please select a valid Expiration Date.");
        return;
      }
      const [y, m, d] = formExpirationDate.split("-").map(Number);
      const selectedMs = new Date(y, m - 1, d, 23, 59, 59).getTime();
      const todayStart = new Date().setHours(0, 0, 0, 0);
      if (isNaN(selectedMs) || selectedMs < todayStart) {
        setFormExpirationDateError("Expiration Date must be today or a future date.");
        toast.error("Expiration Date cannot be in the past.");
        return;
      }
    }

    if (!formAdminName.trim()) {
      toast.error("Primary Administrator Full Name is required.");
      return;
    }

    if (!formAdminEmail.trim()) {
      toast.error("Primary Administrator Email Address is required.");
      return;
    }

    const selectedModelsList = getAllSelectedModelsList();
    if (formModelSelectionType === "selected" && selectedModelsList.length === 0) {
      toast.error("Please select at least one model or switch to All Available Models.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const finalModels =
        formModelSelectionType === "all"
          ? ["All Models"]
          : selectedModelsList.length > 0
          ? selectedModelsList
          : ["gpt-4o"];

      if (isEditMode && selectedOrg) {
        const updatedOrg: OrganizationItem = {
          ...selectedOrg,
          name: formName.trim(),
          description: formDescription.trim(),
          expirationType: formExpirationType,
          expirationDate: formExpirationType === "custom" ? formExpirationDate : null,
          modelSelectionType: formModelSelectionType,
          assignedModels: finalModels,
          country: formCountry,
          state: formState,
          city: formCity,
          zipCode: formZipCode,
          phone: formPhone,
          primaryAdminName: formAdminName.trim(),
          primaryAdminEmail: formAdminEmail.trim(),
          primaryAdminPhone: formAdminPhone.trim(),
          lastUpdatedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          updatedBy: "superadmin@spinecloudiq.com",
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
          expirationType: formExpirationType,
          expirationDate: formExpirationType === "custom" ? formExpirationDate : null,
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
          primaryAdminName: formAdminName.trim(),
          primaryAdminEmail: formAdminEmail.trim(),
          primaryAdminPhone: formAdminPhone.trim(),
          membersCount: 1,
          status: "Active",
          createdBy: "superadmin@spinecloudiq.com",
          lastUpdatedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          updatedBy: "superadmin@spinecloudiq.com",
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

  // Derived Model Catalog Calculations for Form
  const globalQuery = globalModelSearch.trim().toLowerCase();
  const globalMatches = useMemo(() => {
    if (!globalQuery) return [];
    const list: Array<{ providerId: string; providerName: string; providerColor: string; name: string }> = [];
    ORG_CATALOG_PROVIDERS.forEach((p) => {
      (ORG_FULL_CATALOG[p.id] || []).forEach((name) => {
        if (name.toLowerCase().includes(globalQuery)) {
          list.push({ providerId: p.id, providerName: p.name, providerColor: p.color, name });
        }
      });
    });
    return list;
  }, [globalQuery]);

  const activeProviderObj = useMemo(
    () => ORG_CATALOG_PROVIDERS.find((p) => p.id === activeProviderId) || ORG_CATALOG_PROVIDERS[0],
    [activeProviderId]
  );

  const activeCatalogModels = useMemo(
    () => (activeProviderObj ? ORG_FULL_CATALOG[activeProviderObj.id] || [] : []),
    [activeProviderObj]
  );

  const filteredActiveModels = useMemo(() => {
    if (!providerModelSearch.trim()) return activeCatalogModels;
    const q = providerModelSearch.trim().toLowerCase();
    return activeCatalogModels.filter((m) => m.toLowerCase().includes(q));
  }, [activeCatalogModels, providerModelSearch]);

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

                {/* Organization Expiration */}
                <div className="space-y-3 md:col-span-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <label className="block font-semibold text-neutral-800 dark:text-neutral-200">
                    Organization Expiration <span className="text-rose-500">*</span>
                  </label>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="expirationType"
                        value="lifetime"
                        checked={formExpirationType === "lifetime"}
                        onChange={() => {
                          setFormExpirationType("lifetime");
                          setFormExpirationDate("");
                          setFormExpirationDateError("");
                        }}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-neutral-700"
                      />
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        Lifetime
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="expirationType"
                        value="custom"
                        checked={formExpirationType === "custom"}
                        onChange={() => {
                          setFormExpirationType("custom");
                          setFormExpirationDateError("");
                        }}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-neutral-700"
                      />
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                        Custom Expiration Date
                      </span>
                    </label>
                  </div>

                  {/* Custom Expiration Date Picker (Conditional) */}
                  {formExpirationType === "custom" && (
                    <div className="pt-2 max-w-xs space-y-1.5 animate-fadeIn">
                      <label htmlFor="expirationDateInput" className="block text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                        Expiration Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="expirationDateInput"
                        type="date"
                        min={getTodayDateString()}
                        value={formExpirationDate}
                        onChange={(e) => {
                          setFormExpirationDate(e.target.value);
                          if (formExpirationDateError) setFormExpirationDateError("");
                        }}
                        className={`w-full h-10 px-3.5 bg-white dark:bg-neutral-950 border rounded-lg text-xs font-medium focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all ${
                          formExpirationDateError
                            ? "border-rose-500 bg-rose-50/20"
                            : "border-neutral-300 dark:border-neutral-700"
                        }`}
                      />
                      {formExpirationDateError && (
                        <p className="text-[11px] text-rose-500 font-medium">{formExpirationDateError}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CARD 2: Models Access Assignment (Exact 1:1 match with Add Organization.dc.html) */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xs space-y-5">
              <div className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                  Models Access Assignment
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {formModelSelectionType === "all"
                    ? `Full catalog access across ${ORG_CATALOG_PROVIDERS.length} providers`
                    : `${totalSelectedModels} model(s) selected across ${providersWithSelection.length} of ${ORG_CATALOG_PROVIDERS.length} providers`}
                </p>
              </div>

              {/* Selection Mode Radios */}
              <div className="space-y-4 pt-1">
                <div className="flex items-center gap-6 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-neutral-800 dark:text-neutral-200 select-none">
                    <input
                      type="radio"
                      name="modelSelectionType"
                      checked={formModelSelectionType === "all"}
                      onChange={() => setFormModelSelectionType("all")}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-neutral-700"
                    />
                    <span>All Available Models</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-neutral-800 dark:text-neutral-200 select-none">
                    <input
                      type="radio"
                      name="modelSelectionType"
                      checked={formModelSelectionType === "selected"}
                      onChange={() => setFormModelSelectionType("selected")}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-neutral-300 dark:border-neutral-700"
                    />
                    <span>Selected Models</span>
                  </label>
                </div>

                {/* Info Box when All Available Models is active */}
                {formModelSelectionType === "all" && (
                  <div className="bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3.5 text-xs text-neutral-700 dark:text-neutral-300 flex items-start gap-2.5 animate-fadeIn">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      This organization gets access to every model across all {ORG_CATALOG_PROVIDERS.length} providers (1450 models today), including new models onboarded later. Browse the full catalog below — it's read-only in this mode.
                    </p>
                  </div>
                )}

                {/* Selected Models Summary Box (when Selected Models mode is active and totalSelectedModels > 0) */}
                {formModelSelectionType === "selected" && totalSelectedModels > 0 && (
                  <div className="bg-neutral-50 dark:bg-neutral-850 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 space-y-3 animate-fadeIn">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                        {totalSelectedModels} model(s) selected:
                      </span>
                      {providersWithSelection.map((p) => {
                        const count = countOf(p.id);
                        const isExpanded = expandedSummaryProviderId === p.id;
                        return (
                          <div
                            key={p.id}
                            className="bg-white dark:bg-neutral-900 border rounded-lg px-2.5 py-1 text-xs font-semibold flex items-center gap-2 shadow-2xs"
                            style={{ borderColor: isExpanded ? p.color : undefined }}
                          >
                            <button
                              type="button"
                              onClick={() => setExpandedSummaryProviderId(isExpanded ? null : p.id)}
                              className="flex items-center gap-1.5 hover:text-primary-600 cursor-pointer"
                            >
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                              <span>{p.name} ({count})</span>
                              <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedByProvider((prev) => ({ ...prev, [p.id]: {} }));
                                if (expandedSummaryProviderId === p.id) setExpandedSummaryProviderId(null);
                              }}
                              className="text-neutral-400 hover:text-rose-600 font-bold ml-1 cursor-pointer"
                              title={`Clear all ${p.name} selections`}
                            >
                              &times;
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Expanded Provider Models Chip List */}
                    {expandedSummaryProviderId && (
                      <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-700 flex flex-wrap gap-1.5 animate-fadeIn">
                        {Object.entries(selectedByProvider[expandedSummaryProviderId] || {})
                          .filter(([_, isSel]) => isSel)
                          .map(([modelName]) => (
                            <span
                              key={modelName}
                              className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono font-semibold flex items-center gap-1.5"
                            >
                              <span>{modelName}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedByProvider((prev) => ({
                                    ...prev,
                                    [expandedSummaryProviderId]: {
                                      ...(prev[expandedSummaryProviderId] || {}),
                                      [modelName]: false,
                                    },
                                  }))
                                }
                                className="hover:text-rose-600 font-bold text-xs cursor-pointer"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Global Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={globalModelSearch}
                    onChange={(e) => setGlobalModelSearch(e.target.value)}
                    placeholder="Not sure which provider? Search all 1450 models by name..."
                    className="w-full h-10 pl-10 pr-4 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-hidden transition-all text-neutral-900 dark:text-white"
                  />
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Mode A: Global Search Active Results */}
                {globalModelSearch.trim() !== "" ? (
                  <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl h-[420px] flex flex-col overflow-hidden bg-white dark:bg-neutral-900 animate-fadeIn">
                    <div className="px-4 py-2.5 border-b border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 flex items-center justify-between">
                      <span>
                        {globalMatches.length > 60
                          ? `Showing first 60 of ${globalMatches.length} matches — refine your search`
                          : `${globalMatches.length} match(es) across all providers`}
                      </span>
                    </div>

                    {globalMatches.length === 0 ? (
                      <div className="p-8 text-center text-neutral-400 text-xs flex-1 flex items-center justify-center">
                        No models match "{globalModelSearch}" across any provider.
                      </div>
                    ) : (
                      <div className="p-3 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 align-content-start">
                        {globalMatches.slice(0, 60).map((m) => {
                          const isChecked =
                            formModelSelectionType === "all" ||
                            Boolean(selectedByProvider[m.providerId]?.[m.name]);
                          const infoKey = `global-${m.providerId}-${m.name}`;
                          const isInfoOpen = infoOpenKey === infoKey;

                          return (
                            <div
                              key={infoKey}
                              onClick={() => {
                                if (formModelSelectionType === "selected") {
                                  setSelectedByProvider((prev) => ({
                                    ...prev,
                                    [m.providerId]: {
                                      ...(prev[m.providerId] || {}),
                                      [m.name]: !isChecked,
                                    },
                                  }));
                                }
                              }}
                              className={`p-2.5 rounded-lg border text-xs flex items-center gap-2.5 transition-all select-none ${
                                isChecked
                                  ? "bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 font-semibold"
                                  : "bg-white dark:bg-neutral-850 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300"
                              } ${formModelSelectionType === "selected" ? "cursor-pointer" : "cursor-default"}`}
                            >
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                  isChecked ? "bg-emerald-600 border-emerald-600 text-white" : "border-neutral-300"
                                }`}
                              >
                                {isChecked && <Check className="w-3 h-3" />}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="font-mono text-neutral-900 dark:text-white truncate">
                                  {m.name}
                                </div>
                                <div className="text-[10px] font-bold" style={{ color: m.providerColor }}>
                                  {m.providerName}
                                </div>
                              </div>

                              <div className="relative shrink-0">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setInfoOpenKey(isInfoOpen ? null : infoKey);
                                  }}
                                  className="w-4 h-4 rounded-full border border-neutral-300 text-neutral-400 text-[10px] font-bold flex items-center justify-center hover:text-neutral-700 cursor-pointer"
                                  title="Model info"
                                >
                                  i
                                </button>
                                {isInfoOpen && (
                                  <div className="absolute right-0 top-6 w-56 p-2.5 bg-neutral-900 text-white text-[11px] leading-relaxed rounded-xl shadow-xl z-30">
                                    {getOrgModelInfoText(m.name)}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Mode B: Provider Browser (Left Providers Panel + Right Models Grid) */
                  <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl h-[420px] flex flex-col md:flex-row overflow-hidden bg-white dark:bg-neutral-900 animate-fadeIn">
                    {/* Left Provider Selector Panel (Width 250px) */}
                    <div className="w-full md:w-60 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-850 flex flex-col">
                      <div className="p-2.5 border-b border-neutral-200 dark:border-neutral-800">
                        <input
                          type="text"
                          value={providerListSearch}
                          onChange={(e) => setProviderListSearch(e.target.value)}
                          placeholder="Search 20 providers..."
                          className="w-full h-8 px-2.5 text-xs bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                        />
                      </div>

                      <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800/60">
                        {ORG_CATALOG_PROVIDERS.filter((p) =>
                          p.name.toLowerCase().includes(providerListSearch.toLowerCase())
                        ).map((p) => {
                          const count = countOf(p.id);
                          const isActive = p.id === activeProviderId;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => {
                                setActiveProviderId(p.id);
                                setProviderModelSearch("");
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-left transition-colors cursor-pointer ${
                                isActive
                                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border-l-4 border-l-primary-600 shadow-2xs font-bold"
                                  : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div
                                  className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                                  style={{ backgroundColor: p.color }}
                                >
                                  {p.name[0]}
                                </div>
                                <span className="truncate">{p.name}</span>
                              </div>

                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                                  count > 0
                                    ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                                    : "text-neutral-400"
                                }`}
                              >
                                {count > 0 ? count : p.count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Active Provider Models Selector Panel */}
                    <div className="flex-1 flex flex-col min-w-0">
                      {activeProviderObj && (
                        <>
                          {/* Header bar */}
                          <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
                            <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                              <span>{activeProviderObj.name}</span>
                              <span className="text-[11px] font-normal text-neutral-400">
                                &middot; {activeCatalogModels.length} models in catalog
                              </span>
                            </div>

                            {formModelSelectionType === "selected" ? (
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const nextSel = { ...(selectedByProvider[activeProviderObj.id] || {}) };
                                    filteredActiveModels.forEach((m) => (nextSel[m] = true));
                                    setSelectedByProvider((prev) => ({
                                      ...prev,
                                      [activeProviderObj.id]: nextSel,
                                    }));
                                  }}
                                  className="px-2.5 py-1 text-[11px] font-bold border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
                                >
                                  Select all
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedByProvider((prev) => ({
                                      ...prev,
                                      [activeProviderObj.id]: {},
                                    }))
                                  }
                                  className="px-2.5 py-1 text-[11px] font-bold border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 text-rose-600 cursor-pointer"
                                >
                                  Clear
                                </button>
                              </div>
                            ) : (
                              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                                &bull; All included
                              </span>
                            )}
                          </div>

                          {/* Search input for provider models */}
                          <div className="p-3 border-b border-neutral-100 dark:border-neutral-800">
                            <input
                              type="text"
                              value={providerModelSearch}
                              onChange={(e) => setProviderModelSearch(e.target.value)}
                              placeholder={`Search ${activeProviderObj.name} models by name...`}
                              className="w-full h-8 px-3 text-xs bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                            />
                          </div>

                          {/* Models grid */}
                          <div className="p-3 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-2 flex-1 align-content-start">
                            {filteredActiveModels.map((modelName) => {
                              const isChecked =
                                formModelSelectionType === "all" ||
                                Boolean(selectedByProvider[activeProviderObj.id]?.[modelName]);
                              const infoKey = `active-${modelName}`;
                              const isInfoOpen = infoOpenKey === infoKey;

                              return (
                                <div
                                  key={modelName}
                                  onClick={() => {
                                    if (formModelSelectionType === "selected") {
                                      setSelectedByProvider((prev) => ({
                                        ...prev,
                                        [activeProviderObj.id]: {
                                          ...(prev[activeProviderObj.id] || {}),
                                          [modelName]: !isChecked,
                                        },
                                      }));
                                    }
                                  }}
                                  className={`p-2.5 rounded-lg border text-xs flex items-center gap-2.5 transition-all select-none ${
                                    isChecked
                                      ? "bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 font-semibold"
                                      : "bg-white dark:bg-neutral-850 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300"
                                  } ${formModelSelectionType === "selected" ? "cursor-pointer" : "cursor-default"}`}
                                >
                                  <div
                                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                      isChecked ? "bg-emerald-600 border-emerald-600 text-white" : "border-neutral-300"
                                    }`}
                                  >
                                    {isChecked && <Check className="w-3 h-3" />}
                                  </div>

                                  <span className="font-mono truncate flex-1 text-neutral-900 dark:text-white">
                                    {modelName}
                                  </span>

                                  <div className="relative shrink-0">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setInfoOpenKey(isInfoOpen ? null : infoKey);
                                      }}
                                      className="w-4 h-4 rounded-full border border-neutral-300 text-neutral-400 text-[10px] font-bold flex items-center justify-center hover:text-neutral-700 cursor-pointer"
                                      title="Model info"
                                    >
                                      i
                                    </button>
                                    {isInfoOpen && (
                                      <div className="absolute right-0 top-6 w-56 p-2.5 bg-neutral-900 text-white text-[11px] leading-relaxed rounded-xl shadow-xl z-30">
                                        {getOrgModelInfoText(modelName)}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}

                            {filteredActiveModels.length === 0 && (
                              <div className="col-span-2 p-8 text-center text-neutral-400 text-xs">
                                No matching models found.
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
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
                    {visibleColumns.expiration && <th className="py-3 px-4">Expiration</th>}
                    {visibleColumns.currentSpend && <th className="py-3 px-4 text-right">Total Spend (USD)</th>}
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

                          {/* Expiration Column */}
                          {visibleColumns.expiration && (
                            <td className="py-3.5 px-4 whitespace-nowrap text-xs">
                              {(() => {
                                const exp = formatExpirationDisplay(item.expirationType, item.expirationDate);
                                if (exp.isExpired) {
                                  return (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                                      Expired
                                    </span>
                                  );
                                }
                                if (exp.isLifetime) {
                                  return (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                                      Lifetime
                                    </span>
                                  );
                                }
                                return (
                                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                                    {exp.text}
                                  </span>
                                );
                              })()}
                            </td>
                          )}

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

            {/* Consolidated HB Header Summary Card */}
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
                    <div className="text-neutral-400 font-medium">Total Spend</div>
                    <div className="text-xl font-bold text-neutral-900 dark:text-white font-mono">
                      ${selectedOrg.currentSpend.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Consolidated Header Metadata Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">Created Date</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedOrg.createdDate}</div>
                </div>
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">Created By</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200 truncate" title={getUserDisplayName(selectedOrg.createdBy).fullText}>
                    {getUserDisplayName(selectedOrg.createdBy).name}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">Updated Date</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedOrg.lastUpdatedOn || "Jul 28, 2026"}</div>
                </div>
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">Updated By</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200 truncate" title={getUserDisplayName(selectedOrg.updatedBy || selectedOrg.createdBy).fullText}>
                    {getUserDisplayName(selectedOrg.updatedBy || selectedOrg.createdBy).name}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">Expiration</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {(() => {
                      const exp = formatExpirationDisplay(selectedOrg.expirationType, selectedOrg.expirationDate);
                      if (exp.isExpired) {
                        return (
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200">
                            Expired
                          </span>
                        );
                      }
                      if (exp.isLifetime) {
                        return (
                          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200">
                            Lifetime
                          </span>
                        );
                      }
                      return exp.text;
                    })()}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-neutral-400 font-medium mb-1">Status</div>
                  <div>{renderStatusBadge(selectedOrg.status)}</div>
                </div>
              </div>
            </div>

            {/* Standard HB Horizontal Tabs */}
            <div className="border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto">
              <div className="flex gap-6 text-xs font-semibold min-w-max">
                {(["overview", "models", "teams", "members", "virtual-keys"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDetailTab(tab)}
                    className={`py-2.5 border-b-2 transition-colors ${
                      detailTab === tab
                        ? "border-primary-600 text-primary-600 dark:text-primary-400 font-bold"
                        : "border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
                    }`}
                  >
                    {tab === "virtual-keys" ? "Virtual Key" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* 1. OVERVIEW TAB (Organization Analytics Dashboard) */}
            {detailTab === "overview" && (
              <OrgAnalyticsDashboard
                orgName={selectedOrg.name}
                orgId={selectedOrg.id}
                currentSpend={selectedOrg.currentSpend}
              />
            )}

            {/* 2. MODELS TAB */}
            {detailTab === "models" && (
              <div className="space-y-4 text-xs animate-fadeIn">
                <ModelManagement hideHeader={true} orgName={selectedOrg.name} orgId={selectedOrg.id} />
              </div>
            )}

            {/* 3. TEAMS TAB */}
            {detailTab === "teams" && (
              <div className="space-y-4 text-xs animate-fadeIn">
                <TeamsManagement hideHeader={true} orgName={selectedOrg.name} orgId={selectedOrg.id} />
              </div>
            )}

            {/* 4. MEMBERS TAB (Reusing Organization Admin Users Management module) */}
            {detailTab === "members" && (
              <div className="space-y-4 text-xs animate-fadeIn">
                <UserManagement hideHeader={true} orgName={selectedOrg.name} orgId={selectedOrg.id} />
              </div>
            )}

            {/* 5. VIRTUAL KEY TAB */}
            {detailTab === "virtual-keys" && (
              <div className="space-y-4 text-xs animate-fadeIn">
                <VirtualKeyManagement hideHeader={true} orgName={selectedOrg.name} orgId={selectedOrg.id} />
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
                  const headers = [
                    "Organization ID",
                    "Organization Name",
                    "Created Date",
                    "Expiration",
                    "Total Spend (USD)",
                    "Models",
                    "TPM Limit",
                    "RPM Limit",
                    "Country",
                    "Status",
                    "Members",
                  ];
                  const rows = filteredOrgs.map((org) => {
                    const exp = formatExpirationDisplay(org.expirationType, org.expirationDate);
                    return [
                      `"${org.orgId}"`,
                      `"${org.name.replace(/"/g, '""')}"`,
                      `"${org.createdDate}"`,
                      `"${exp.text}"`,
                      `"${org.currentSpend}"`,
                      `"${getModelCountLabel(org)}"`,
                      `"${org.tpmLimit}"`,
                      `"${org.rpmLimit}"`,
                      `"${org.country || ""}"`,
                      `"${org.status}"`,
                      `"${org.membersCount}"`,
                    ];
                  });

                  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", `organizations_export_${new Date().toISOString().slice(0, 10)}.csv`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);

                  toast.success("Exported Organizations list with Expiration column to CSV");
                  setShowExportModal(false);
                }}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary-500 flex flex-col items-center gap-2 cursor-pointer"
              >
                <FileText className="w-8 h-8 text-blue-600" />
                <span className="font-bold">CSV Format</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const headers = [
                    "Organization ID",
                    "Organization Name",
                    "Created Date",
                    "Expiration",
                    "Total Spend (USD)",
                    "Models",
                    "TPM Limit",
                    "RPM Limit",
                    "Country",
                    "Status",
                    "Members",
                  ];
                  const rows = filteredOrgs.map((org) => {
                    const exp = formatExpirationDisplay(org.expirationType, org.expirationDate);
                    return [
                      `"${org.orgId}"`,
                      `"${org.name.replace(/"/g, '""')}"`,
                      `"${org.createdDate}"`,
                      `"${exp.text}"`,
                      `"${org.currentSpend}"`,
                      `"${getModelCountLabel(org)}"`,
                      `"${org.tpmLimit}"`,
                      `"${org.rpmLimit}"`,
                      `"${org.country || ""}"`,
                      `"${org.status}"`,
                      `"${org.membersCount}"`,
                    ];
                  });

                  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", `organizations_export_${new Date().toISOString().slice(0, 10)}.csv`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);

                  toast.success("Exported Organizations list with Expiration column to Excel (.xlsx)");
                  setShowExportModal(false);
                }}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary-500 flex flex-col items-center gap-2 cursor-pointer"
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
                  <option value="User">User</option>
                  <option value="Viewer">Viewer</option>
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
                  <option value="User">User</option>
                  <option value="Viewer">Viewer</option>
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

      {/* ADD / EDIT MODEL MODAL POPUP */}
      {showModelModal && selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-primary-600" />
                <span>{editingModel ? "Configure Model Mapping" : "Add Model to Organization"}</span>
              </h3>
              <button type="button" onClick={() => setShowModelModal(false)}>
                <X className="w-4 h-4 text-neutral-400 hover:text-neutral-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                  AI Provider <span className="text-rose-500">*</span>
                </label>
                <select
                  value={modelFormProvider}
                  onChange={(e) => setModelFormProvider(e.target.value)}
                  className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg font-medium text-xs"
                >
                  {AI_PROVIDERS.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                  Model Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={modelFormName}
                  onChange={(e) => setModelFormName(e.target.value)}
                  placeholder="e.g. GPT-4o, Claude 3.5 Sonnet, Llama-3-70b"
                  className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg font-medium text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                  Model Alias
                </label>
                <input
                  type="text"
                  value={modelFormAlias}
                  onChange={(e) => setModelFormAlias(e.target.value)}
                  placeholder="e.g. <gpt-4o-prod>"
                  className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                  Status
                </label>
                <select
                  value={modelFormStatus}
                  onChange={(e) => setModelFormStatus(e.target.value as any)}
                  className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg font-semibold text-xs"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3 font-semibold">
              <button
                type="button"
                onClick={() => setShowModelModal(false)}
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <PrimaryButton onClick={handleSaveModel} disabled={!modelFormName.trim()}>
                {editingModel ? "Save Changes" : "Add Model"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* ADD TEAM MODAL POPUP */}
      {showAddTeamModal && selectedOrg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary-600" />
                <span>Add Team to Organization</span>
              </h3>
              <button type="button" onClick={() => setShowAddTeamModal(false)}>
                <X className="w-4 h-4 text-neutral-400 hover:text-neutral-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                  Team Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="e.g. Engineering, Security, AI Research"
                  className="w-full h-10 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg font-medium text-xs"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3 font-semibold">
              <button
                type="button"
                onClick={() => setShowAddTeamModal(false)}
                className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <PrimaryButton onClick={handleSaveAddTeam} disabled={!newTeamName.trim()}>
                Add Team
              </PrimaryButton>
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
