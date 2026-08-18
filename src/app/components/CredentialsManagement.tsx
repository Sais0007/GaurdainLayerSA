// src/app/components/CredentialsManagement.tsx
import React, { useState, useMemo } from "react";
import {
  Key,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Edit3,
  Trash2,
  ShieldCheck,
  Building2,
  Server,
  Zap,
  Globe,
  Lock,
  Copy,
  Check,
  AlertTriangle,
  RotateCw,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader, SearchBar, PrimaryButton } from "./hb/listing";

export interface CredentialItem {
  id: string;
  name: string;
  provider: "OpenAI" | "Anthropic" | "Azure AI" | "DeepSeek" | "Ollama";
  createdOn: string;
  createdBy: string;
  updatedOn: string;
  status: "Active" | "Inactive" | "Error";
  maskedKey: string;
  rawKey: string;
  associatedModelsCount: number;
  environment: "Production" | "Staging" | "Development";
  endpointUrl?: string;
  orgId?: string;
}

const INITIAL_CREDENTIALS: CredentialItem[] = [
  {
    id: "cred-1",
    name: "Production OpenAI Master Key",
    provider: "OpenAI",
    createdOn: "2026-01-15",
    createdBy: "Super Admin",
    updatedOn: "2026-02-01",
    status: "Active",
    maskedKey: "sk-proj-••••••••••••8a91",
    rawKey: "sk-proj-918237192837198273918273918273918a91",
    associatedModelsCount: 8,
    environment: "Production",
    orgId: "org-acme-prod",
  },
  {
    id: "cred-2",
    name: "Anthropic Enterprise API Key",
    provider: "Anthropic",
    createdOn: "2026-01-18",
    createdBy: "Super Admin",
    updatedOn: "2026-02-10",
    status: "Active",
    maskedKey: "sk-ant-••••••••••••3f88",
    rawKey: "sk-ant-api03-918273918273918273918273f88",
    associatedModelsCount: 5,
    environment: "Production",
  },
  {
    id: "cred-3",
    name: "Azure OpenAI East US Endpoint",
    provider: "Azure AI",
    createdOn: "2026-01-20",
    createdBy: "DevOps Lead",
    updatedOn: "2026-02-05",
    status: "Active",
    maskedKey: "az-key-••••••••••••1092",
    rawKey: "az-key-0981230981230981230981231092",
    associatedModelsCount: 4,
    environment: "Production",
    endpointUrl: "https://acme-eastus.openai.azure.com/",
  },
  {
    id: "cred-4",
    name: "DeepSeek Staging Key",
    provider: "DeepSeek",
    createdOn: "2026-02-01",
    createdBy: "AI Team Lead",
    updatedOn: "2026-02-12",
    status: "Active",
    maskedKey: "sk-ds-••••••••••••9941",
    rawKey: "sk-ds-0981239812398123981239941",
    associatedModelsCount: 3,
    environment: "Staging",
  },
  {
    id: "cred-5",
    name: "Local Ollama Gateway Host",
    provider: "Ollama",
    createdOn: "2026-02-05",
    createdBy: "Infra Engineer",
    updatedOn: "2026-02-14",
    status: "Inactive",
    maskedKey: "local-ollama-••••••••7721",
    rawKey: "local-ollama-host-token-secret-7721",
    associatedModelsCount: 2,
    environment: "Development",
    endpointUrl: "http://localhost:11434",
  },
];

export default function CredentialsManagement() {
  const [credentials, setCredentials] = useState<CredentialItem[]>(INITIAL_CREDENTIALS);
  const [searchQuery, setSearchQuery] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [envFilter, setEnvFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Show raw key state mapping (by credential ID)
  const [unmaskedKeys, setUnmaskedKeys] = useState<Record<string, boolean>>({});
  
  // Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCred, setEditingCred] = useState<CredentialItem | null>(null);

  // Connection Testing State
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; success: boolean; latency?: number; msg: string } | null>(null);

  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    provider: "OpenAI" as CredentialItem["provider"],
    environment: "Production" as CredentialItem["environment"],
    apiKey: "",
    endpointUrl: "",
    orgId: "",
  });

  // Filtered List
  const filteredCredentials = useMemo(() => {
    return credentials.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.maskedKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.createdBy.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProvider = providerFilter === "all" || item.provider === providerFilter;
      const matchesEnv = envFilter === "all" || item.environment === envFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesProvider && matchesEnv && matchesStatus;
    });
  }, [credentials, searchQuery, providerFilter, envFilter, statusFilter]);

  // Key Unmask Handler
  const toggleKeyMask = (id: string) => {
    setUnmaskedKeys((prev) => {
      const nextState = !prev[id];
      if (nextState) {
        toast.info("Master Key unmasked for security inspection");
      }
      return { ...prev, [id]: nextState };
    });
  };

  // Test Connection Flow
  const handleTestConnection = (credId?: string, keyToTest?: string) => {
    const targetId = credId || "form";
    setTestingId(targetId);
    setTestResult(null);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.15; // 85% success mock
      const latency = Math.floor(Math.random() * 120) + 80;

      const res = isSuccess
        ? { id: targetId, success: true, latency, msg: `✓ Connection Successful (Latency: ${latency}ms)` }
        : { id: targetId, success: false, msg: "✕ Invalid API Key or Provider Unauthorized" };

      setTestingId(null);
      setTestResult(res);

      if (isSuccess) {
        toast.success(res.msg);
      } else {
        toast.error(res.msg);
      }
    }, 1200);
  };

  // Create / Edit Save Handler
  const handleSaveCredential = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter a Credential Name");
      return;
    }
    if (!formData.apiKey.trim()) {
      toast.error("Please enter the API Key / Secret");
      return;
    }

    const masked = `${formData.apiKey.slice(0, 7)}••••••••${formData.apiKey.slice(-4)}`;

    if (editingCred) {
      setCredentials((prev) =>
        prev.map((item) =>
          item.id === editingCred.id
            ? {
                ...item,
                name: formData.name,
                provider: formData.provider,
                environment: formData.environment,
                maskedKey: masked,
                rawKey: formData.apiKey,
                endpointUrl: formData.endpointUrl,
                orgId: formData.orgId,
                updatedOn: new Date().toISOString().split("T")[0],
              }
            : item
        )
      );
      toast.success("Credential updated successfully");
    } else {
      const newCred: CredentialItem = {
        id: `cred-${Date.now()}`,
        name: formData.name,
        provider: formData.provider,
        createdOn: new Date().toISOString().split("T")[0],
        createdBy: "Super Admin",
        updatedOn: new Date().toISOString().split("T")[0],
        status: "Active",
        maskedKey: masked,
        rawKey: formData.apiKey,
        associatedModelsCount: 3,
        environment: formData.environment,
        endpointUrl: formData.endpointUrl,
        orgId: formData.orgId,
      };

      setCredentials((prev) => [newCred, ...prev]);
      toast.success("New Master Provider Credential added successfully");
    }

    setIsFormModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingCred(null);
    setFormData({
      name: "",
      provider: "OpenAI",
      environment: "Production",
      apiKey: "",
      endpointUrl: "",
      orgId: "",
    });
    setTestResult(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsFormModalOpen(true);
  };

  const openEditModal = (cred: CredentialItem) => {
    setEditingCred(cred);
    setFormData({
      name: cred.name,
      provider: cred.provider,
      environment: cred.environment,
      apiKey: cred.rawKey || "",
      endpointUrl: cred.endpointUrl || "",
      orgId: cred.orgId || "",
    });
    setIsFormModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete credential "${name}"?`)) {
      setCredentials((prev) => prev.filter((item) => item.id !== id));
      toast.success("Credential deleted");
    }
  };

  // Helper for provider brand styling
  const getProviderBadge = (provider: CredentialItem["provider"]) => {
    switch (provider) {
      case "OpenAI":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
      case "Anthropic":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800";
      case "Azure AI":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800";
      case "DeepSeek":
        return "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800";
      case "Ollama":
        return "bg-neutral-100 text-neutral-800 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700";
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Page Header */}
      <PageHeader
        title="Credentials Management"
        subtitle="Secure master API key storage, provider organization credentials, and active connection handshakes"
        actions={
          <PrimaryButton onClick={openCreateModal} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Add Credentials</span>
          </PrimaryButton>
        }
      />

      {/* KPI Cards Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Total Credentials</span>
            <Key className="w-4 h-4 text-primary-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-neutral-900 dark:text-white mt-2">
            {credentials.length}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">Master LLM API Keys</div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Active Providers</span>
            <Server className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-neutral-900 dark:text-white mt-2">
            {new Set(credentials.map((c) => c.provider)).size} Providers
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">OpenAI, Anthropic, Azure, DeepSeek</div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Production Keys</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-2">
            {credentials.filter((c) => c.environment === "Production").length} Active
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">Production Environment Enforced</div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Associated Models</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-neutral-900 dark:text-white mt-2">
            {credentials.reduce((acc, c) => acc + c.associatedModelsCount, 0)} Models
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">Routed via Master Credentials</div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search credentials, keys, or creator..."
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs w-full md:w-auto">
          {/* Provider Filter */}
          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium"
          >
            <option value="all">All Providers</option>
            <option value="OpenAI">OpenAI</option>
            <option value="Anthropic">Anthropic</option>
            <option value="Azure AI">Azure AI</option>
            <option value="DeepSeek">DeepSeek</option>
            <option value="Ollama">Ollama</option>
          </select>

          {/* Environment Filter */}
          <select
            value={envFilter}
            onChange={(e) => setEnvFilter(e.target.value)}
            className="h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium"
          >
            <option value="all">All Environments</option>
            <option value="Production">Production</option>
            <option value="Staging">Staging</option>
            <option value="Development">Development</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Error">Error</option>
          </select>
        </div>
      </div>

      {/* Credentials Table */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-850 text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Credential Name</th>
                <th className="py-3.5 px-4">Provider</th>
                <th className="py-3.5 px-4">Environment</th>
                <th className="py-3.5 px-4">Masked Key / Secret</th>
                <th className="py-3.5 px-4">Models</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filteredCredentials.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400">
                    No provider credentials found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredCredentials.map((cred) => (
                  <tr key={cred.id} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-850/50 transition-colors">
                    {/* Name */}
                    <td className="py-3.5 px-4 font-bold text-neutral-900 dark:text-white">
                      <div>{cred.name}</div>
                      {cred.endpointUrl && (
                        <div className="text-[10px] text-neutral-400 font-mono flex items-center gap-1 mt-0.5">
                          <Globe className="w-3 h-3" />
                          {cred.endpointUrl}
                        </div>
                      )}
                    </td>

                    {/* Provider Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${getProviderBadge(cred.provider)}`}>
                        {cred.provider}
                      </span>
                    </td>

                    {/* Environment */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          cred.environment === "Production"
                            ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                            : cred.environment === "Staging"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                            : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                        }`}
                      >
                        {cred.environment}
                      </span>
                    </td>

                    {/* Masked Key with Toggle */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                          {unmaskedKeys[cred.id] ? cred.rawKey : cred.maskedKey}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleKeyMask(cred.id)}
                          className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                          title={unmaskedKeys[cred.id] ? "Hide Key" : "Unmask Key"}
                        >
                          {unmaskedKeys[cred.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>

                    {/* Models Count */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-neutral-700 dark:text-neutral-300">
                      {cred.associatedModelsCount} Models
                    </td>

                    {/* Created Date */}
                    <td className="py-3.5 px-4 text-neutral-500 font-mono text-[11px]">
                      {cred.createdOn}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          cred.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300"
                            : cred.status === "Inactive"
                            ? "bg-neutral-100 text-neutral-600 border border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
                            : "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            cred.status === "Active"
                              ? "bg-emerald-500"
                              : cred.status === "Inactive"
                              ? "bg-neutral-400"
                              : "bg-rose-500"
                          }`}
                        />
                        {cred.status}
                      </span>
                    </td>

                    {/* Action Menu */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Test Connection Button */}
                        <button
                          type="button"
                          onClick={() => handleTestConnection(cred.id, cred.rawKey)}
                          disabled={testingId === cred.id}
                          className="p-1.5 text-xs font-semibold text-primary-600 hover:bg-primary-50 dark:hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1"
                          title="Test Connection"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${testingId === cred.id ? "animate-spin" : ""}`} />
                          <span className="hidden sm:inline">Test</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openEditModal(cred)}
                          className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg transition-colors"
                          title="Edit Credential"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(cred.id, cred.name)}
                          className="p-1.5 text-neutral-400 hover:text-rose-600 rounded-lg transition-colors"
                          title="Delete Credential"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Credential Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-base text-neutral-900 dark:text-white">
                <Key className="w-5 h-5 text-primary-600" />
                <span>{editingCred ? "Edit Provider Credential" : "Add Provider Credential"}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveCredential} className="p-6 space-y-4 text-xs">
              {/* Credential Name */}
              <div>
                <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Credential Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Production OpenAI Master Key"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium text-neutral-900 dark:text-white focus:outline-none focus:border-primary-600"
                />
              </div>

              {/* Provider Selection & Environment */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Provider <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value as any })}
                    className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium text-neutral-900 dark:text-white"
                  >
                    <option value="OpenAI">OpenAI</option>
                    <option value="Anthropic">Anthropic</option>
                    <option value="Azure AI">Azure AI</option>
                    <option value="DeepSeek">DeepSeek</option>
                    <option value="Ollama">Ollama</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Environment <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.environment}
                    onChange={(e) => setFormData({ ...formData, environment: e.target.value as any })}
                    className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-medium text-neutral-900 dark:text-white"
                  >
                    <option value="Production">Production</option>
                    <option value="Staging">Staging</option>
                    <option value="Development">Development</option>
                  </select>
                </div>
              </div>

              {/* API Key / Secret */}
              <div>
                <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  API Key / Secret <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="sk-proj-..."
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-primary-600"
                />
              </div>

              {/* Endpoint URL (Conditional) */}
              {(formData.provider === "Azure AI" || formData.provider === "Ollama") && (
                <div>
                  <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Endpoint URL / Host
                  </label>
                  <input
                    type="url"
                    placeholder={formData.provider === "Azure AI" ? "https://my-azure.openai.azure.com/" : "http://localhost:11434"}
                    value={formData.endpointUrl}
                    onChange={(e) => setFormData({ ...formData, endpointUrl: e.target.value })}
                    className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-primary-600"
                  />
                </div>
              )}

              {/* Organization ID / Project ID */}
              <div>
                <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Organization ID / Project ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. org-acme-prod-99"
                  value={formData.orgId}
                  onChange={(e) => setFormData({ ...formData, orgId: e.target.value })}
                  className="w-full h-10 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl font-mono text-neutral-900 dark:text-white focus:outline-none focus:border-primary-600"
                />
              </div>

              {/* Test Result Display */}
              {testResult && testResult.id === "form" && (
                <div
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                    testResult.success
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800"
                      : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:border-rose-800"
                  }`}
                >
                  <span>{testResult.msg}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleTestConnection("form", formData.apiKey)}
                  disabled={testingId === "form" || !formData.apiKey}
                  className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 rounded-xl font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testingId === "form" ? "animate-spin" : ""}`} />
                  <span>Test Connection</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFormModalOpen(false)}
                    className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-xs transition-colors"
                  >
                    Save Credential
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
