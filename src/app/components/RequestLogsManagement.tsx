import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  RefreshCw,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Copy,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
  Cpu,
  Layers,
  FileJson,
  Code,
  FileText,
  Activity,
  User,
  Building2,
  Key,
  Globe,
  RotateCcw,
  Check,
  Tag,
  ShieldAlert,
  Server,
  DollarSign,
  Maximize2,
  Minimize2,
  Trash2,
  ShieldCheck,
  Plus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Wrench,
  Image as ImageIcon,
  Mic
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader, SearchBar, IconButton, Pagination, PrimaryButton } from "./hb/listing";
import { AuditLogsManagement } from "./AuditLogsManagement";

export interface RequestLogEntry {
  id: string;
  requestId: string;
  sessionId: string;
  time: string;
  timestampISO: string;
  type: "LLM" | "Embedding" | "Image" | "Audio" | "Tool";
  status: "Success" | "Failure" | "Warning" | "Pending";
  cost: number | null;
  duration: number; // in seconds
  ttft: number | null; // in seconds
  teamName: string;
  keyHash: string;
  keyAlias: string;
  model: string;
  provider: string;
  organization: string;
  requestType: string;
  environment: string;

  // Detail fields
  callType?: string;
  modelId?: string;
  apiBase?: string;
  ipAddress?: string;
  userEmail?: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  cacheStatus?: "Hit" | "Miss";
  retries?: number;
  inputCost?: number;
  outputCost?: number;
  originalLlmCost?: number;
  markup?: number;
  discount?: number;
  userAgent?: string;
  requestPayload?: string;
  responsePayload?: string;
  errorCode?: string;
  errorMessage?: string;
  failureReason?: string;
  errorType?: string;
  traceback?: string;
  metadataJson?: Record<string, any>;
  timeline?: { event: string; timeOffset: string; status: "success" | "error" | "info" }[];
}

export const mockRequestLogsData: RequestLogEntry[] = [
  {
    id: "log-101",
    requestId: "chatcmpl-R8Ht9901a",
    sessionId: "f109a06c-9182-4412-8823-3091g",
    time: "Jul 31, 21:08:19",
    timestampISO: "2026-07-31T21:08:19.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000007,
    duration: 1.72,
    ttft: 1.72,
    teamName: "litellm-internal-dev",
    keyHash: "lite11m-inter-8823c",
    keyAlias: "litellm-internal-key",
    model: "gpt-4o-mini",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Default",
    callType: "acompletion",
    modelId: "gpt-4o-mini-2026-07-18",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "127.0.0.1",
    userEmail: "superadmin@spinecloudiq.com",
    promptTokens: 14,
    completionTokens: 28,
    totalTokens: 42,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000002,
    outputCost: 0.000005,
    originalLlmCost: 0.000007,
    markup: 0.0,
    discount: 0.0,
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
    requestPayload: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: "Summarize project status for Guardian Layer SA." }] }, null, 2),
    responsePayload: JSON.stringify({ id: "chatcmpl-R8Ht9901a", choices: [{ message: { role: "assistant", content: "Guardian Layer SA is fully operational with active telemetry monitoring." } }] }, null, 2),
    metadataJson: {
      status: "success",
      max_retries: 3,
      batch_models: null,
      usage_object: { prompt_tokens: 14, completion_tokens: 28, total_tokens: 42 },
      user_api_key: "lite11m-inter-8823c-hash-7712",
      litellm_call_id: "chatcmpl-R8Ht9901a",
      eval_information: null
    },
    timeline: [
      { event: "Request Started", timeOffset: "+0.000s", status: "info" },
      { event: "Gateway Validation & Rate Limit Check", timeOffset: "+0.012s", status: "info" },
      { event: "Forwarded to Provider (OpenAI)", timeOffset: "+0.024s", status: "info" },
      { event: "First Token Received (TTFT)", timeOffset: "+1.720s", status: "success" },
      { event: "Response Stream Completed", timeOffset: "+1.720s", status: "success" }
    ]
  },
  {
    id: "log-102",
    requestId: "chatcmpl-R8Ht4412b",
    sessionId: "441b4cfb-9a12-8823-1104-5590e",
    time: "Jul 31, 21:09:06",
    timestampISO: "2026-07-31T21:09:06.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000012,
    duration: 17.64,
    ttft: null,
    teamName: "litellm-internal-dev",
    keyHash: "lite11m-inter-4412b",
    keyAlias: "litellm-internal-key",
    model: "gpt-4o-mini",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Default",
    callType: "acompletion",
    modelId: "gpt-4o-mini-2026-07-18",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "192.168.1.45",
    userEmail: "sarah.connor@hb.com",
    promptTokens: 45,
    completionTokens: 310,
    totalTokens: 355,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0.000003,
    outputCost: 0.000009,
    originalLlmCost: 0.000012,
    markup: 0.0,
    discount: 0.0,
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
    requestPayload: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: "Generate a detailed security audit report for API Gateway." }] }, null, 2),
    responsePayload: JSON.stringify({ id: "chatcmpl-R8Ht4412b", choices: [{ message: { role: "assistant", content: "Security Audit Overview: 100% of endpoints verified with active rate limiting." } }] }, null, 2),
    metadataJson: {
      status: "success",
      max_retries: 3,
      user_api_key: "lite11m-inter-4412b-hash-9012",
      litellm_call_id: "chatcmpl-R8Ht4412b"
    },
    timeline: [
      { event: "Request Started", timeOffset: "+0.000s", status: "info" },
      { event: "Gateway Validation", timeOffset: "+0.015s", status: "info" },
      { event: "Forwarded to Provider (OpenAI)", timeOffset: "+0.030s", status: "info" },
      { event: "Response Stream Completed", timeOffset: "+17.640s", status: "success" }
    ]
  },
  {
    id: "log-103",
    requestId: "chatcmpl-D5Us8823c",
    sessionId: "b4466791-c601-5590-7731-3091g",
    time: "Jul 31, 21:19:51",
    timestampISO: "2026-07-31T21:19:51.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000046,
    duration: 1.71,
    ttft: 1.70,
    teamName: "Sales Team",
    keyHash: "de32895d2793c",
    keyAlias: "CRM KEY",
    model: "gpt-4o-mini",
    provider: "OpenAI",
    organization: "Global Tech Solutions",
    requestType: "LLM",
    environment: "Production",
    callType: "acompletion",
    modelId: "gpt-4o-mini-2026-07-18",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "10.0.4.12",
    userEmail: "alex.dev@hb.com",
    promptTokens: 120,
    completionTokens: 240,
    totalTokens: 360,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0.000016,
    outputCost: 0.000030,
    originalLlmCost: 0.000046,
    markup: 0.0,
    discount: 0.0,
    userAgent: "Python/3.11 requests/2.31.0",
    requestPayload: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: "Extract leads from CRM incoming webhooks." }] }, null, 2),
    responsePayload: JSON.stringify({ id: "chatcmpl-D5Us8823c", choices: [{ message: { role: "assistant", content: "Extracted 3 enterprise leads." } }] }, null, 2),
    metadataJson: {
      status: "success",
      max_retries: 3,
      user_api_key: "de32895d2793c-crm-key",
      litellm_call_id: "chatcmpl-D5Us8823c"
    },
    timeline: [
      { event: "Request Started", timeOffset: "+0.000s", status: "info" },
      { event: "Gateway Auth Verified", timeOffset: "+0.008s", status: "info" },
      { event: "TTFT Received", timeOffset: "+1.700s", status: "success" },
      { event: "Completed", timeOffset: "+1.710s", status: "success" }
    ]
  },
  {
    id: "log-104",
    requestId: "cff2c48f-2599-4412-8823-1104d",
    sessionId: "b2b00a69-f104-5590-7731-6124h",
    time: "Jul 31, 21:22:23",
    timestampISO: "2026-07-31T21:22:23.000Z",
    type: "LLM",
    status: "Failure",
    cost: null,
    duration: 0.00,
    ttft: null,
    teamName: "Engineering",
    keyHash: "0e1b1c4b335b",
    keyAlias: "Ravi key",
    model: "gpt-4o-mini",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Default",
    errorCode: "401",
    errorMessage: "Authentication Error - Expired Key. Key Expiry time 2026-07-31 06:42:10.104000+00:00 and current time 2026-07-31 08:50:48.350647+00:00",
    failureReason: "Virtual Key expired on 2026-07-31 06:42:10 UTC.",
    errorType: "ProxyException",
    traceback: `File "/var/www/html/1itellm_git/guardian layer/litellm/proxy/auth/user_api_key_auth.py", line 1025, in _user_api_key_auth_builder\n    raise ProxyException(\n      message="Authentication Error - Expired Key",\n      code=401\n    )`,
    callType: "-",
    modelId: "-",
    apiBase: "-",
    ipAddress: "127.0.0.1",
    userEmail: "michael.scott@hb.com",
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0,
    outputCost: 0,
    originalLlmCost: 0,
    markup: 0,
    discount: 0,
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    requestPayload: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: "Test gateway auth check." }] }, null, 2),
    responsePayload: "",
    metadataJson: {
      status: "failure",
      max_retries: null,
      batch_models: null,
      usage_object: null,
      user_api_key: "0e1b1c4b335b-hash-expired",
      litellm_call_id: "cff2c48f-2599-4412-8823-1104d",
      eval_information: null,
      error_information: {
        traceback: "File \"/var/www/html/1itellm_git/guardian layer/litellm/proxy/auth/user_api_key_auth.py\", line 1025, in _user_api_key_auth_builder\n    raise ProxyException(\n",
        error_code: "401",
        error_class: "ProxyException",
        llm_provider: ""
      }
    },
    timeline: [
      { event: "Request Started", timeOffset: "+0.000s", status: "info" },
      { event: "Gateway Authentication Check Failed", timeOffset: "+0.002s", status: "error" },
      { event: "Request Terminated (401 Unauthorized)", timeOffset: "+0.003s", status: "error" }
    ]
  },
  {
    id: "log-105",
    requestId: "3qdpatv1H-aCg8UPx8HfVQM",
    sessionId: "ed5bce4a-e099-4412-8823-5590e",
    time: "Jul 29, 12:42:30",
    timestampISO: "2026-07-29T12:42:30.154Z",
    type: "LLM",
    status: "Success",
    cost: 0.000091,
    duration: 1.46,
    ttft: 1.44,
    teamName: "AI Research",
    keyHash: "0989ac14c54a",
    keyAlias: "Gemini Pro Key",
    model: "gemini-2.5-flash",
    provider: "Gemini",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Default",
    callType: "acompletion",
    modelId: "7310c23a-8804-434d-8b44-9901a",
    apiBase: "https://generativelanguage.googleapis.com",
    ipAddress: "127.0.0.1",
    userEmail: "alex.dev@hb.com",
    promptTokens: 3,
    completionTokens: 36,
    totalTokens: 39,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0.0000009,
    outputCost: 0.0000900,
    originalLlmCost: 0.0000909,
    markup: 0.0,
    discount: 0.0,
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36",
    requestPayload: JSON.stringify({ model: "gemini/gemini-2.5-flash", messages: [{ role: "user", content: "Hello Gemini, summarize the model latency." }] }, null, 2),
    responsePayload: JSON.stringify({ id: "3qdpatv1H-aCg8UPx8HfVQM", choices: [{ message: { role: "assistant", content: "Model latency for Gemini 2.5 Flash is 142ms on average across all gateway regions." } }] }, null, 2),
    metadataJson: {
      status: "success",
      max_retries: 3,
      user_api_key: "0989ac14c54a-gemini-key",
      litellm_call_id: "3qdpatv1H-aCg8UPx8HfVQM"
    },
    timeline: [
      { event: "Request Started", timeOffset: "+0.000s", status: "info" },
      { event: "Gateway Auth Verified", timeOffset: "+0.010s", status: "info" },
      { event: "TTFT Received from Google AI Studio", timeOffset: "+1.439s", status: "success" },
      { event: "Response Stream Completed", timeOffset: "+1.462s", status: "success" }
    ]
  },
  {
    id: "log-106",
    requestId: "msg-992384a112",
    sessionId: "sec-7721a-4902-8812-9901e",
    time: "Aug 3, 19:15:02",
    timestampISO: "2026-08-03T19:15:02.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000315,
    duration: 2.85,
    ttft: 0.82,
    teamName: "Product Security",
    keyHash: "7fed94bbfb8e",
    keyAlias: "Production-Service-Key",
    model: "claude-3-5-sonnet",
    provider: "Anthropic",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Production",
    callType: "acompletion",
    modelId: "claude-3-5-sonnet-20241022",
    apiBase: "https://api.anthropic.com/v1",
    ipAddress: "10.128.0.44",
    userEmail: "sec-admin@hb.com",
    promptTokens: 520,
    completionTokens: 180,
    totalTokens: 700,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000150,
    outputCost: 0.000165,
    originalLlmCost: 0.000315,
    markup: 0.0,
    discount: 0.0,
    userAgent: "Anthropic-Python/0.25.0",
    requestPayload: JSON.stringify({ model: "claude-3-5-sonnet", messages: [{ role: "user", content: "Analyze cloud security policy JSON for compliance violations." }] }, null, 2),
    responsePayload: JSON.stringify({ id: "msg-992384a112", content: [{ type: "text", text: "Policy Compliance Report: 0 critical vulnerabilities found." }] }, null, 2),
    metadataJson: {
      status: "success",
      user_api_key: "7fed94bbfb8e-prod-key",
      litellm_call_id: "msg-992384a112"
    },
    timeline: [
      { event: "Request Started", timeOffset: "+0.000s", status: "info" },
      { event: "Forwarded to Anthropic Claude Engine", timeOffset: "+0.018s", status: "info" },
      { event: "First Token (TTFT)", timeOffset: "+0.820s", status: "success" },
      { event: "Response Completed", timeOffset: "+2.850s", status: "success" }
    ]
  },
  {
    id: "log-107",
    requestId: "emb-88192a014",
    sessionId: "vec-10294-8823-10492a",
    time: "Aug 3, 18:40:11",
    timestampISO: "2026-08-03T18:40:11.000Z",
    type: "Embedding",
    status: "Success",
    cost: 0.000002,
    duration: 0.42,
    ttft: null,
    teamName: "Data Platform",
    keyHash: "09819ac14c52",
    keyAlias: "Analytics-Pipeline-Key",
    model: "text-embedding-3-small",
    provider: "OpenAI",
    organization: "Global Tech Solutions",
    requestType: "Embedding",
    environment: "Production",
    callType: "aembedding",
    modelId: "text-embedding-3-small",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "172.16.4.100",
    userEmail: "data-worker@globaltech.io",
    promptTokens: 850,
    completionTokens: 0,
    totalTokens: 850,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0.000002,
    outputCost: 0.0,
    originalLlmCost: 0.000002,
    markup: 0.0,
    discount: 0.0,
    userAgent: "Python/3.10 langchain-openai/0.1.2",
    requestPayload: JSON.stringify({ model: "text-embedding-3-small", input: "Generate high dimensional vector embeddings for user activity logs." }, null, 2),
    responsePayload: JSON.stringify({ object: "list", data: [{ embedding: [0.0023, -0.0124, 0.0891, "... 1536 dims"] }], usage: { prompt_tokens: 850, total_tokens: 850 } }, null, 2),
    metadataJson: {
      status: "success",
      user_api_key: "09819ac14c52-data-hash",
      litellm_call_id: "emb-88192a014"
    },
    timeline: [
      { event: "Embedding Request Received", timeOffset: "+0.000s", status: "info" },
      { event: "Vector Processed", timeOffset: "+0.420s", status: "success" }
    ]
  },
  {
    id: "log-108",
    requestId: "chatcmpl-ERR429-01",
    sessionId: "mkt-55102-1102-33901b",
    time: "Aug 3, 17:22:45",
    timestampISO: "2026-08-03T17:22:45.000Z",
    type: "LLM",
    status: "Failure",
    cost: null,
    duration: 0.05,
    ttft: null,
    teamName: "Marketing",
    keyHash: "41d5d8be4a82",
    keyAlias: "Mobile-App-Prod",
    model: "gpt-4o",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Production",
    errorCode: "429",
    errorMessage: "Rate Limit Exceeded - Request TPM limit of 50,000 Tokens Per Minute breached for key Mobile-App-Prod.",
    failureReason: "Gateway Enforced TPM Limit (50,000 TPM exceeded).",
    errorType: "RateLimitException",
    traceback: `File "/var/www/html/guardian_layer/litellm/proxy/hooks/rate_limiter.py", line 142, in check_rate_limit\n    raise RateLimitException("TPM limit exceeded", code=429)`,
    callType: "acompletion",
    modelId: "gpt-4o-2024-08-06",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "192.168.1.109",
    userEmail: "campaign@acme.com",
    promptTokens: 4200,
    completionTokens: 0,
    totalTokens: 4200,
    cacheStatus: "Miss",
    retries: 2,
    inputCost: 0,
    outputCost: 0,
    originalLlmCost: 0,
    userAgent: "Mobile-iOS/18.2 GatewaySDK/2.1",
    requestPayload: JSON.stringify({ model: "gpt-4o", messages: [{ role: "user", content: "Generate 50 ad copies for social media campaign." }] }, null, 2),
    responsePayload: "",
    metadataJson: {
      status: "failure",
      error_code: "429",
      tpm_limit: 50000,
      current_tpm_usage: 54200
    },
    timeline: [
      { event: "Request Started", timeOffset: "+0.000s", status: "info" },
      { event: "Token Bucket Check Failed (Rate Limit 429)", timeOffset: "+0.045s", status: "error" },
      { event: "HTTP 429 Returned to Client", timeOffset: "+0.050s", status: "error" }
    ]
  },
  {
    id: "log-109",
    requestId: "dp-deep-901248a",
    sessionId: "res-90124-4412-88231a",
    time: "Aug 3, 16:05:30",
    timestampISO: "2026-08-03T16:05:30.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000180,
    duration: 8.45,
    ttft: 0.45,
    teamName: "AI Research",
    keyHash: "0989ac14c54a",
    keyAlias: "Gemini Pro Key",
    model: "deepseek-r1",
    provider: "DeepSeek",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Development",
    callType: "acompletion",
    modelId: "deepseek-reasoner",
    apiBase: "https://api.deepseek.com/v1",
    ipAddress: "127.0.0.1",
    userEmail: "alex.dev@hb.com",
    promptTokens: 210,
    completionTokens: 940,
    totalTokens: 1150,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000030,
    outputCost: 0.000150,
    originalLlmCost: 0.000180,
    userAgent: "OpenAI-Python/1.40.0",
    requestPayload: JSON.stringify({ model: "deepseek-r1", messages: [{ role: "user", content: "Solve the traveling salesperson problem with 10 nodes." }] }, null, 2),
    responsePayload: JSON.stringify({ id: "dp-deep-901248a", choices: [{ message: { role: "assistant", reasoning_content: "Step 1: Compute distance matrix...", content: "Optimal tour distance: 42.8 km." } }] }, null, 2),
    metadataJson: {
      status: "success",
      reasoning_tokens: 480,
      litellm_call_id: "dp-deep-901248a"
    },
    timeline: [
      { event: "Reasoning Task Initiated", timeOffset: "+0.000s", status: "info" },
      { event: "TTFT Received", timeOffset: "+0.450s", status: "success" },
      { event: "Chain-of-Thought Completed", timeOffset: "+8.450s", status: "success" }
    ]
  },
  {
    id: "log-110",
    requestId: "img-dalle-991204",
    sessionId: "img-sess-8812-49102",
    time: "Aug 3, 15:10:00",
    timestampISO: "2026-08-03T15:10:00.000Z",
    type: "Image",
    status: "Success",
    cost: 0.040000,
    duration: 6.20,
    ttft: null,
    teamName: "Marketing",
    keyHash: "41d5d8be4a82",
    keyAlias: "Mobile-App-Prod",
    model: "dall-e-3",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "Image",
    environment: "Production",
    callType: "image_generation",
    modelId: "dall-e-3",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "192.168.1.109",
    userEmail: "designer@acme.com",
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0.040000,
    outputCost: 0,
    originalLlmCost: 0.040000,
    userAgent: "NodeJS/20.11 axios/1.6.0",
    requestPayload: JSON.stringify({ prompt: "Futuristic AI security shield glowing in gold and cyan dark mode background, 1024x1024", size: "1024x1024" }, null, 2),
    responsePayload: JSON.stringify({ created: 1785777000, data: [{ url: "https://oaidalleapiprodscus.blob.core.windows.net/private/image_dalle3_generated.png" }] }, null, 2),
    metadataJson: {
      status: "success",
      resolution: "1024x1024",
      quality: "standard"
    },
    timeline: [
      { event: "Image Generation Requested", timeOffset: "+0.000s", status: "info" },
      { event: "Image Rendered & Saved", timeOffset: "+6.200s", status: "success" }
    ]
  },
  {
    id: "log-111",
    requestId: "audio-whisp-7721",
    sessionId: "aud-sess-10294-8812",
    time: "Aug 3, 14:30:15",
    timestampISO: "2026-08-03T14:30:15.000Z",
    type: "Audio",
    status: "Success",
    cost: 0.006000,
    duration: 3.10,
    ttft: null,
    teamName: "Sales Team",
    keyHash: "de32895d2793c",
    keyAlias: "CRM KEY",
    model: "whisper-1",
    provider: "OpenAI",
    organization: "Global Tech Solutions",
    requestType: "Audio",
    environment: "Production",
    callType: "audio_transcription",
    modelId: "whisper-1",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "10.0.4.12",
    userEmail: "sales-rep@globaltech.io",
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0.006000,
    outputCost: 0,
    originalLlmCost: 0.006000,
    userAgent: "Python/3.11 openai-audio/1.0",
    requestPayload: JSON.stringify({ model: "whisper-1", language: "en", file: "client_call_recording_segment.mp3" }, null, 2),
    responsePayload: JSON.stringify({ text: "Hello, we are looking forward to upgrading our Guardian Layer SA package." }, null, 2),
    metadataJson: {
      status: "success",
      audio_duration_seconds: 60.0
    },
    timeline: [
      { event: "Audio Upload Received", timeOffset: "+0.000s", status: "info" },
      { event: "Transcription Completed", timeOffset: "+3.100s", status: "success" }
    ]
  },
  {
    id: "log-112",
    requestId: "chatcmpl-WARN-8812",
    sessionId: "eng-warn-1029-4412",
    time: "Aug 3, 12:00:00",
    timestampISO: "2026-08-03T12:00:00.000Z",
    type: "LLM",
    status: "Warning",
    cost: 0.000210,
    duration: 12.80,
    ttft: 4.20,
    teamName: "Engineering",
    keyHash: "0e1b1c4b335b",
    keyAlias: "Ravi key",
    model: "gemini-1.5-pro",
    provider: "Gemini",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Development",
    callType: "acompletion",
    modelId: "gemini-1.5-pro-latest",
    apiBase: "https://generativelanguage.googleapis.com",
    ipAddress: "127.0.0.1",
    userEmail: "michael.scott@hb.com",
    promptTokens: 4100,
    completionTokens: 820,
    totalTokens: 4920,
    cacheStatus: "Miss",
    retries: 1,
    inputCost: 0.000050,
    outputCost: 0.000160,
    originalLlmCost: 0.000210,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    requestPayload: JSON.stringify({ model: "gemini-1.5-pro", messages: [{ role: "user", content: "Analyze large codebase refactoring options." }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { role: "assistant", content: "Refactoring recommendation: Modularize helper components." } }] }, null, 2),
    metadataJson: {
      status: "warning",
      warning_message: "High Latency Warning: TTFT (4.2s) exceeded threshold (3.0s)",
      retries_count: 1
    },
    timeline: [
      { event: "Request Started", timeOffset: "+0.000s", status: "info" },
      { event: "Provider Delay (Retry Attempt 1)", timeOffset: "+2.100s", status: "info" },
      { event: "TTFT (4.2s - High Latency)", timeOffset: "+4.200s", status: "error" },
      { event: "Stream Completed", timeOffset: "+12.800s", status: "success" }
    ]
  },
  {
    id: "log-113",
    requestId: "tool-call-881294",
    sessionId: "tool-sess-1029-3312",
    time: "Aug 2, 23:45:10",
    timestampISO: "2026-08-02T23:45:10.000Z",
    type: "Tool",
    status: "Success",
    cost: 0.000085,
    duration: 1.25,
    ttft: 0.95,
    teamName: "Product Security",
    keyHash: "7fed94bbfb8e",
    keyAlias: "Production-Service-Key",
    model: "gpt-4o",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "Tool",
    environment: "Production",
    callType: "function_call",
    modelId: "gpt-4o-2024-08-06",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "10.128.0.44",
    userEmail: "sec-bot@hb.com",
    promptTokens: 340,
    completionTokens: 90,
    totalTokens: 430,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000025,
    outputCost: 0.000060,
    originalLlmCost: 0.000085,
    userAgent: "SecurityAgent/1.0",
    requestPayload: JSON.stringify({ model: "gpt-4o", tools: [{ type: "function", function: { name: "revoke_api_key", parameters: { key_id: "string" } } }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { tool_calls: [{ function: { name: "revoke_api_key", arguments: "{\"key_id\":\"key-88192\"}" } }] } }] }, null, 2),
    metadataJson: {
      status: "success",
      function_executed: "revoke_api_key"
    },
    timeline: [
      { event: "Tool Function Dispatched", timeOffset: "+0.000s", status: "info" },
      { event: "Function Executed via Agent", timeOffset: "+1.250s", status: "success" }
    ]
  },
  {
    id: "log-114",
    requestId: "msg-haiku-449102",
    sessionId: "dev-sess-9912-44102",
    time: "Aug 2, 21:18:04",
    timestampISO: "2026-08-02T21:18:04.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000015,
    duration: 0.88,
    ttft: 0.40,
    teamName: "litellm-internal-dev",
    keyHash: "lite11m-inter-8823c",
    keyAlias: "litellm-internal-key",
    model: "claude-3-haiku",
    provider: "Anthropic",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Testing",
    callType: "acompletion",
    modelId: "claude-3-haiku-20240307",
    apiBase: "https://api.anthropic.com/v1",
    ipAddress: "127.0.0.1",
    userEmail: "tester@litellm.ai",
    promptTokens: 110,
    completionTokens: 45,
    totalTokens: 155,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000003,
    outputCost: 0.000012,
    originalLlmCost: 0.000015,
    userAgent: "pytest/8.2.0",
    requestPayload: JSON.stringify({ model: "claude-3-haiku", messages: [{ role: "user", content: "Ping check." }] }, null, 2),
    responsePayload: JSON.stringify({ content: [{ type: "text", text: "Pong! Claude 3 Haiku online." }] }, null, 2),
    metadataJson: {
      status: "success"
    },
    timeline: [
      { event: "Test Request Dispatched", timeOffset: "+0.000s", status: "info" },
      { event: "Response Streamed", timeOffset: "+0.880s", status: "success" }
    ]
  },
  {
    id: "log-115",
    requestId: "llama-504-timeout",
    sessionId: "data-sess-8812-3391",
    time: "Aug 2, 20:02:55",
    timestampISO: "2026-08-02T20:02:55.000Z",
    type: "LLM",
    status: "Failure",
    cost: null,
    duration: 30.00,
    ttft: null,
    teamName: "Data Platform",
    keyHash: "09819ac14c52",
    keyAlias: "Analytics-Pipeline-Key",
    model: "llama-3.3-70b",
    provider: "Meta-Llama",
    organization: "Global Tech Solutions",
    requestType: "LLM",
    environment: "Production",
    errorCode: "504",
    errorMessage: "Gateway Timeout - Upstream model server endpoint failed to respond within 30.0s deadline.",
    failureReason: "Upstream Provider Timeout (30s max timeout reached).",
    errorType: "TimeoutException",
    traceback: `File "/var/www/html/guardian_layer/litellm/proxy/router.py", line 890, in forward_request\n    raise TimeoutException("Upstream 504 Timeout", code=504)`,
    callType: "acompletion",
    modelId: "meta-llama/llama-3.3-70b-instruct",
    apiBase: "https://api.together.xyz/v1",
    ipAddress: "172.16.4.100",
    userEmail: "pipeline-worker@globaltech.io",
    promptTokens: 12000,
    completionTokens: 0,
    totalTokens: 12000,
    cacheStatus: "Miss",
    retries: 3,
    inputCost: 0,
    outputCost: 0,
    originalLlmCost: 0,
    userAgent: "vLLM-Client/0.4.0",
    requestPayload: JSON.stringify({ model: "llama-3.3-70b", messages: [{ role: "user", content: "Run heavy batch data analysis." }] }, null, 2),
    responsePayload: "",
    metadataJson: {
      status: "failure",
      error_code: "504",
      max_timeout_sec: 30.0
    },
    timeline: [
      { event: "Request Started", timeOffset: "+0.000s", status: "info" },
      { event: "Forwarded to Upstream vLLM Cluster", timeOffset: "+0.020s", status: "info" },
      { event: "Gateway Timeout Exceeded (30s)", timeOffset: "+30.000s", status: "error" }
    ]
  },
  {
    id: "log-116",
    requestId: "chatcmpl-991204812",
    sessionId: "sales-sess-7712-4401",
    time: "Aug 2, 18:14:20",
    timestampISO: "2026-08-02T18:14:20.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000018,
    duration: 1.15,
    ttft: 1.10,
    teamName: "Sales Team",
    keyHash: "de32895d2793c",
    keyAlias: "CRM KEY",
    model: "gpt-4o-mini",
    provider: "OpenAI",
    organization: "Global Tech Solutions",
    requestType: "LLM",
    environment: "Production",
    callType: "acompletion",
    modelId: "gpt-4o-mini",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "10.0.4.12",
    userEmail: "alex.dev@hb.com",
    promptTokens: 85,
    completionTokens: 110,
    totalTokens: 195,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000005,
    outputCost: 0.000013,
    originalLlmCost: 0.000018,
    userAgent: "Salesforce-Integration/4.0",
    requestPayload: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: "Draft follow up email for enterprise prospect." }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { role: "assistant", content: "Dear John, Thank you for attending our Guardian Layer demo..." } }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Request Started", timeOffset: "+0.000s", status: "info" },
      { event: "Completed", timeOffset: "+1.150s", status: "success" }
    ]
  },
  {
    id: "log-117",
    requestId: "emb-33910248a",
    sessionId: "res-vec-8812-4410",
    time: "Aug 2, 16:50:33",
    timestampISO: "2026-08-02T16:50:33.000Z",
    type: "Embedding",
    status: "Success",
    cost: 0.000001,
    duration: 0.28,
    ttft: null,
    teamName: "AI Research",
    keyHash: "0989ac14c54a",
    keyAlias: "Gemini Pro Key",
    model: "text-embedding-3-small",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "Embedding",
    environment: "Development",
    callType: "aembedding",
    modelId: "text-embedding-3-small",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "127.0.0.1",
    userEmail: "alex.dev@hb.com",
    promptTokens: 420,
    completionTokens: 0,
    totalTokens: 420,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000001,
    outputCost: 0,
    originalLlmCost: 0.000001,
    userAgent: "LlamaIndex/0.10.0",
    requestPayload: JSON.stringify({ model: "text-embedding-3-small", input: "Embed search index query." }, null, 2),
    responsePayload: JSON.stringify({ object: "list", data: [{ embedding: [0.011, -0.042, 0.009] }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Embedding Completed", timeOffset: "+0.280s", status: "success" }
    ]
  },
  {
    id: "log-118",
    requestId: "3qd-gemini-991204",
    sessionId: "dev-sess-7712-4491",
    time: "Aug 2, 14:12:08",
    timestampISO: "2026-08-02T14:12:08.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000045,
    duration: 0.95,
    ttft: 0.92,
    teamName: "litellm-internal-dev",
    keyHash: "lite11m-inter-8823c",
    keyAlias: "litellm-internal-key",
    model: "gemini-2.5-flash",
    provider: "Gemini",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Default",
    callType: "acompletion",
    modelId: "gemini-2.5-flash",
    apiBase: "https://generativelanguage.googleapis.com",
    ipAddress: "127.0.0.1",
    userEmail: "superadmin@spinecloudiq.com",
    promptTokens: 180,
    completionTokens: 290,
    totalTokens: 470,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000005,
    outputCost: 0.000040,
    originalLlmCost: 0.000045,
    userAgent: "Google-AI-Studio/1.2",
    requestPayload: JSON.stringify({ model: "gemini-2.5-flash", messages: [{ role: "user", content: "Format telemetry graph JSON." }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { role: "assistant", content: "{\"nodes\": 12, \"edges\": 24}" } }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Request Completed", timeOffset: "+0.950s", status: "success" }
    ]
  },
  {
    id: "log-119",
    requestId: "chatcmpl-CTX-400-01",
    sessionId: "eng-sess-9912-3301",
    time: "Aug 2, 11:05:44",
    timestampISO: "2026-08-02T11:05:44.000Z",
    type: "LLM",
    status: "Failure",
    cost: null,
    duration: 0.12,
    ttft: null,
    teamName: "Engineering",
    keyHash: "0e1b1c4b335b",
    keyAlias: "Ravi key",
    model: "gpt-4o",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Default",
    errorCode: "400",
    errorMessage: "Invalid Request Error - Context length exceeded maximum threshold of 128,000 tokens (Request contained 142,500 tokens).",
    failureReason: "Context Length Limit Exceeded (142,500 > 128,000 max).",
    errorType: "InvalidRequestException",
    traceback: `File "/var/www/html/guardian_layer/litellm/proxy/utils.py", line 512, in validate_token_count\n    raise InvalidRequestException("Context window exceeded", code=400)`,
    callType: "acompletion",
    modelId: "gpt-4o-2024-08-06",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "127.0.0.1",
    userEmail: "michael.scott@hb.com",
    promptTokens: 142500,
    completionTokens: 0,
    totalTokens: 142500,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0,
    outputCost: 0,
    originalLlmCost: 0,
    userAgent: "Python/3.11 langchain/0.2.0",
    requestPayload: JSON.stringify({ model: "gpt-4o", messages: [{ role: "user", content: "[Huge 50MB log file dump content...]" }] }, null, 2),
    responsePayload: "",
    metadataJson: {
      status: "failure",
      error_code: "400",
      max_context_window: 128000
    },
    timeline: [
      { event: "Token Calculation Check Failed", timeOffset: "+0.110s", status: "error" },
      { event: "HTTP 400 Returned", timeOffset: "+0.120s", status: "error" }
    ]
  },
  {
    id: "log-120",
    requestId: "msg-sonnet-10294",
    sessionId: "sec-sess-8812-44102",
    time: "Aug 1, 22:30:12",
    timestampISO: "2026-08-01T22:30:12.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000410,
    duration: 3.40,
    ttft: 0.75,
    teamName: "Product Security",
    keyHash: "7fed94bbfb8e",
    keyAlias: "Production-Service-Key",
    model: "claude-3-5-sonnet",
    provider: "Anthropic",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Production",
    callType: "acompletion",
    modelId: "claude-3-5-sonnet-20241022",
    apiBase: "https://api.anthropic.com/v1",
    ipAddress: "10.128.0.44",
    userEmail: "sec-admin@hb.com",
    promptTokens: 750,
    completionTokens: 230,
    totalTokens: 980,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000210,
    outputCost: 0.000200,
    originalLlmCost: 0.000410,
    userAgent: "Anthropic-Python/0.25.0",
    requestPayload: JSON.stringify({ model: "claude-3-5-sonnet", messages: [{ role: "user", content: "Perform automated secret scanning on code commit." }] }, null, 2),
    responsePayload: JSON.stringify({ content: [{ type: "text", text: "No API keys or secrets detected in commit diff." }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Request Started", timeOffset: "+0.000s", status: "info" },
      { event: "Completed", timeOffset: "+3.400s", status: "success" }
    ]
  },
  {
    id: "log-121",
    requestId: "tool-mkt-991204",
    sessionId: "mkt-sess-7712-1029",
    time: "Aug 1, 19:40:00",
    timestampISO: "2026-08-01T19:40:00.000Z",
    type: "Tool",
    status: "Success",
    cost: 0.000014,
    duration: 0.72,
    ttft: 0.65,
    teamName: "Marketing",
    keyHash: "41d5d8be4a82",
    keyAlias: "Mobile-App-Prod",
    model: "gpt-4o-mini",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "Tool",
    environment: "Production",
    callType: "function_call",
    modelId: "gpt-4o-mini",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "192.168.1.109",
    userEmail: "campaign@acme.com",
    promptTokens: 140,
    completionTokens: 35,
    totalTokens: 175,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000004,
    outputCost: 0.000010,
    originalLlmCost: 0.000014,
    userAgent: "HubSpot-Agent/2.1",
    requestPayload: JSON.stringify({ model: "gpt-4o-mini", tools: [{ type: "function", function: { name: "send_newsletter" } }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { tool_calls: [{ function: { name: "send_newsletter", arguments: "{}" } }] } }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Completed", timeOffset: "+0.720s", status: "success" }
    ]
  },
  {
    id: "log-122",
    requestId: "dp-deep-771920",
    sessionId: "res-sess-1029-4401",
    time: "Aug 1, 17:15:22",
    timestampISO: "2026-08-01T17:15:22.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000140,
    duration: 6.10,
    ttft: 0.50,
    teamName: "AI Research",
    keyHash: "0989ac14c54a",
    keyAlias: "Gemini Pro Key",
    model: "deepseek-r1",
    provider: "DeepSeek",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Development",
    callType: "acompletion",
    modelId: "deepseek-reasoner",
    apiBase: "https://api.deepseek.com/v1",
    ipAddress: "127.0.0.1",
    userEmail: "alex.dev@hb.com",
    promptTokens: 190,
    completionTokens: 710,
    totalTokens: 900,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0.000020,
    outputCost: 0.000120,
    originalLlmCost: 0.000140,
    userAgent: "DeepSeek-Client/1.0",
    requestPayload: JSON.stringify({ model: "deepseek-r1", messages: [{ role: "user", content: "Optimize SQL query execution plan." }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { role: "assistant", content: "Recommended Index: CREATE INDEX idx_user_timestamp ON logs(user_id, timestamp);" } }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Reasoning Completed", timeOffset: "+6.100s", status: "success" }
    ]
  },
  {
    id: "log-123",
    requestId: "chatcmpl-WARN-CACHE",
    sessionId: "sales-sess-8812-3391",
    time: "Aug 1, 15:00:10",
    timestampISO: "2026-08-01T15:00:10.000Z",
    type: "LLM",
    status: "Warning",
    cost: 0.000030,
    duration: 1.60,
    ttft: 1.55,
    teamName: "Sales Team",
    keyHash: "de32895d2793c",
    keyAlias: "CRM KEY",
    model: "gemini-2.5-flash",
    provider: "Gemini",
    organization: "Global Tech Solutions",
    requestType: "LLM",
    environment: "Production",
    callType: "acompletion",
    modelId: "gemini-2.5-flash",
    apiBase: "https://generativelanguage.googleapis.com",
    ipAddress: "10.0.4.12",
    userEmail: "alex.dev@hb.com",
    promptTokens: 250,
    completionTokens: 180,
    totalTokens: 430,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0.000008,
    outputCost: 0.000022,
    originalLlmCost: 0.000030,
    userAgent: "Salesforce-Integration/4.0",
    requestPayload: JSON.stringify({ model: "gemini-2.5-flash", messages: [{ role: "user", content: "Fetch lead summary." }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { role: "assistant", content: "Lead summary generated." } }] }, null, 2),
    metadataJson: { status: "warning", cache_bypass_reason: "Cache key TTL expired" },
    timeline: [
      { event: "Cache Miss Warning", timeOffset: "+0.010s", status: "error" },
      { event: "Request Completed", timeOffset: "+1.600s", status: "success" }
    ]
  },
  {
    id: "log-124",
    requestId: "chatcmpl-991028412",
    sessionId: "data-sess-7712-1029",
    time: "Aug 1, 13:22:45",
    timestampISO: "2026-08-01T13:22:45.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000250,
    duration: 2.10,
    ttft: 1.20,
    teamName: "Data Platform",
    keyHash: "09819ac14c52",
    keyAlias: "Analytics-Pipeline-Key",
    model: "gpt-4o",
    provider: "OpenAI",
    organization: "Global Tech Solutions",
    requestType: "LLM",
    environment: "Production",
    callType: "acompletion",
    modelId: "gpt-4o-2024-08-06",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "172.16.4.100",
    userEmail: "data-worker@globaltech.io",
    promptTokens: 620,
    completionTokens: 180,
    totalTokens: 800,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000100,
    outputCost: 0.000150,
    originalLlmCost: 0.000250,
    userAgent: "Airflow-Worker/2.8",
    requestPayload: JSON.stringify({ model: "gpt-4o", messages: [{ role: "user", content: "Clean up raw user feedback dataset." }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { role: "assistant", content: "Dataset sanitized and categorized." } }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Completed", timeOffset: "+2.100s", status: "success" }
    ]
  },
  {
    id: "log-125",
    requestId: "msg-ERR-502-01",
    sessionId: "eng-sess-1029-8812",
    time: "Aug 1, 10:11:30",
    timestampISO: "2026-08-01T10:11:30.000Z",
    type: "LLM",
    status: "Failure",
    cost: null,
    duration: 1.85,
    ttft: null,
    teamName: "Engineering",
    keyHash: "0e1b1c4b335b",
    keyAlias: "Ravi key",
    model: "claude-3-haiku",
    provider: "Anthropic",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Default",
    errorCode: "502",
    errorMessage: "Bad Gateway - Anthropic provider API returned HTTP 502 Bad Gateway (Internal Server Error at upstream provider).",
    failureReason: "Upstream Provider Outage (Anthropic 502).",
    errorType: "BadGatewayException",
    traceback: `File "/var/www/html/guardian_layer/litellm/proxy/handlers.py", line 310, in handle_provider_response\n    raise BadGatewayException("Anthropic API 502 Error", code=502)`,
    callType: "acompletion",
    modelId: "claude-3-haiku-20240307",
    apiBase: "https://api.anthropic.com/v1",
    ipAddress: "127.0.0.1",
    userEmail: "michael.scott@hb.com",
    promptTokens: 210,
    completionTokens: 0,
    totalTokens: 210,
    cacheStatus: "Miss",
    retries: 2,
    inputCost: 0,
    outputCost: 0,
    originalLlmCost: 0,
    userAgent: "NodeJS/18.0",
    requestPayload: JSON.stringify({ model: "claude-3-haiku", messages: [{ role: "user", content: "Test ping upstream." }] }, null, 2),
    responsePayload: "",
    metadataJson: {
      status: "failure",
      error_code: "502"
    },
    timeline: [
      { event: "Request Started", timeOffset: "+0.000s", status: "info" },
      { event: "Upstream Returned 502", timeOffset: "+1.850s", status: "error" }
    ]
  },
  {
    id: "log-126",
    requestId: "audio-whisp-9910",
    sessionId: "mkt-aud-8812-4401",
    time: "Jul 30, 22:15:00",
    timestampISO: "2026-07-30T22:15:00.000Z",
    type: "Audio",
    status: "Success",
    cost: 0.003000,
    duration: 1.90,
    ttft: null,
    teamName: "Marketing",
    keyHash: "41d5d8be4a82",
    keyAlias: "Mobile-App-Prod",
    model: "whisper-1",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "Audio",
    environment: "Production",
    callType: "audio_transcription",
    modelId: "whisper-1",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "192.168.1.109",
    userEmail: "campaign@acme.com",
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.003000,
    outputCost: 0,
    originalLlmCost: 0.003000,
    userAgent: "Mobile-iOS/18.2",
    requestPayload: JSON.stringify({ model: "whisper-1", file: "voice_note.m4a" }, null, 2),
    responsePayload: JSON.stringify({ text: "Schedule social media release for tomorrow at 9 AM." }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Completed", timeOffset: "+1.900s", status: "success" }
    ]
  },
  {
    id: "log-127",
    requestId: "chatcmpl-771029412",
    sessionId: "dev-sess-1029-8812",
    time: "Jul 30, 19:45:12",
    timestampISO: "2026-07-30T19:45:12.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000008,
    duration: 0.65,
    ttft: 0.62,
    teamName: "litellm-internal-dev",
    keyHash: "lite11m-inter-8823c",
    keyAlias: "litellm-internal-key",
    model: "gpt-4o-mini",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Default",
    callType: "acompletion",
    modelId: "gpt-4o-mini",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "127.0.0.1",
    userEmail: "superadmin@spinecloudiq.com",
    promptTokens: 40,
    completionTokens: 55,
    totalTokens: 95,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000002,
    outputCost: 0.000006,
    originalLlmCost: 0.000008,
    userAgent: "Mozilla/5.0",
    requestPayload: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: "Validate health check." }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { role: "assistant", content: "OK" } }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Completed", timeOffset: "+0.650s", status: "success" }
    ]
  },
  {
    id: "log-128",
    requestId: "emb-771920412",
    sessionId: "data-vec-1029-4412",
    time: "Jul 30, 17:30:00",
    timestampISO: "2026-07-30T17:30:00.000Z",
    type: "Embedding",
    status: "Success",
    cost: 0.000004,
    duration: 0.35,
    ttft: null,
    teamName: "Data Platform",
    keyHash: "09819ac14c52",
    keyAlias: "Analytics-Pipeline-Key",
    model: "text-embedding-3-small",
    provider: "OpenAI",
    organization: "Global Tech Solutions",
    requestType: "Embedding",
    environment: "Production",
    callType: "aembedding",
    modelId: "text-embedding-3-small",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "172.16.4.100",
    userEmail: "data-worker@globaltech.io",
    promptTokens: 1900,
    completionTokens: 0,
    totalTokens: 1900,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000004,
    outputCost: 0,
    originalLlmCost: 0.000004,
    userAgent: "Python/3.10",
    requestPayload: JSON.stringify({ model: "text-embedding-3-small", input: "Generate embeddings for batch documentation." }, null, 2),
    responsePayload: JSON.stringify({ object: "list", data: [{ embedding: [0.004, -0.012] }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Completed", timeOffset: "+0.350s", status: "success" }
    ]
  },
  {
    id: "log-129",
    requestId: "gem-pro-881920",
    sessionId: "res-sess-7712-3391",
    time: "Jul 30, 14:10:55",
    timestampISO: "2026-07-30T14:10:55.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000120,
    duration: 2.40,
    ttft: 0.90,
    teamName: "AI Research",
    keyHash: "0989ac14c54a",
    keyAlias: "Gemini Pro Key",
    model: "gemini-1.5-pro",
    provider: "Gemini",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Development",
    callType: "acompletion",
    modelId: "gemini-1.5-pro",
    apiBase: "https://generativelanguage.googleapis.com",
    ipAddress: "127.0.0.1",
    userEmail: "alex.dev@hb.com",
    promptTokens: 1200,
    completionTokens: 410,
    totalTokens: 1610,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000030,
    outputCost: 0.000090,
    originalLlmCost: 0.000120,
    userAgent: "Google-AI-Studio/1.2",
    requestPayload: JSON.stringify({ model: "gemini-1.5-pro", messages: [{ role: "user", content: "Compare multimodal reasoning capabilities." }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { role: "assistant", content: "Multimodal comparison summary completed." } }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Completed", timeOffset: "+2.400s", status: "success" }
    ]
  },
  {
    id: "log-130",
    requestId: "chatcmpl-PEND-0012",
    sessionId: "sec-sess-1029-4401",
    time: "Jul 30, 11:00:00",
    timestampISO: "2026-07-30T11:00:00.000Z",
    type: "LLM",
    status: "Pending",
    cost: null,
    duration: 0.00,
    ttft: null,
    teamName: "Product Security",
    keyHash: "7fed94bbfb8e",
    keyAlias: "Production-Service-Key",
    model: "gpt-4o",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Production",
    callType: "acompletion",
    modelId: "gpt-4o-2024-08-06",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "10.128.0.44",
    userEmail: "sec-admin@hb.com",
    promptTokens: 890,
    completionTokens: 0,
    totalTokens: 890,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0,
    outputCost: 0,
    originalLlmCost: 0,
    userAgent: "SecurityAgent/1.0",
    requestPayload: JSON.stringify({ model: "gpt-4o", messages: [{ role: "user", content: "Streaming real-time security log analysis..." }] }, null, 2),
    responsePayload: "",
    metadataJson: { status: "pending" },
    timeline: [
      { event: "Request Queued in Gateway", timeOffset: "+0.000s", status: "info" }
    ]
  },
  {
    id: "log-131",
    requestId: "msg-sonnet-881920",
    sessionId: "sales-sess-9910-3301",
    time: "Jul 29, 21:50:30",
    timestampISO: "2026-07-29T21:50:30.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000280,
    duration: 2.15,
    ttft: 0.70,
    teamName: "Sales Team",
    keyHash: "de32895d2793c",
    keyAlias: "CRM KEY",
    model: "claude-3-5-sonnet",
    provider: "Anthropic",
    organization: "Global Tech Solutions",
    requestType: "LLM",
    environment: "Production",
    callType: "acompletion",
    modelId: "claude-3-5-sonnet-20241022",
    apiBase: "https://api.anthropic.com/v1",
    ipAddress: "10.0.4.12",
    userEmail: "alex.dev@hb.com",
    promptTokens: 410,
    completionTokens: 160,
    totalTokens: 570,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000120,
    outputCost: 0.000160,
    originalLlmCost: 0.000280,
    userAgent: "Salesforce-Integration/4.0",
    requestPayload: JSON.stringify({ model: "claude-3-5-sonnet", messages: [{ role: "user", content: "Generate pitch deck outline for AI Gateway enterprise upgrade." }] }, null, 2),
    responsePayload: JSON.stringify({ content: [{ type: "text", text: "Pitch Deck Outline: 1. Overview 2. Security 3. Cost Optimization..." }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Completed", timeOffset: "+2.150s", status: "success" }
    ]
  },
  {
    id: "log-132",
    requestId: "tool-eng-771029",
    sessionId: "eng-sess-8812-1029",
    time: "Jul 29, 18:25:14",
    timestampISO: "2026-07-29T18:25:14.000Z",
    type: "Tool",
    status: "Success",
    cost: 0.000011,
    duration: 0.58,
    ttft: 0.52,
    teamName: "Engineering",
    keyHash: "0e1b1c4b335b",
    keyAlias: "Ravi key",
    model: "gpt-4o-mini",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "Tool",
    environment: "Default",
    callType: "function_call",
    modelId: "gpt-4o-mini",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "127.0.0.1",
    userEmail: "michael.scott@hb.com",
    promptTokens: 95,
    completionTokens: 28,
    totalTokens: 123,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000003,
    outputCost: 0.000008,
    originalLlmCost: 0.000011,
    userAgent: "pytest/8.2.0",
    requestPayload: JSON.stringify({ model: "gpt-4o-mini", tools: [{ type: "function", function: { name: "get_cluster_status" } }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { tool_calls: [{ function: { name: "get_cluster_status", arguments: "{}" } }] } }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Completed", timeOffset: "+0.580s", status: "success" }
    ]
  },
  {
    id: "log-133",
    requestId: "chatcmpl-403-FORBIDDEN",
    sessionId: "mkt-sess-1029-4412",
    time: "Jul 29, 15:40:22",
    timestampISO: "2026-07-29T15:40:22.000Z",
    type: "LLM",
    status: "Failure",
    cost: null,
    duration: 0.04,
    ttft: null,
    teamName: "Marketing",
    keyHash: "41d5d8be4a82",
    keyAlias: "Mobile-App-Prod",
    model: "gpt-4o",
    provider: "OpenAI",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Production",
    errorCode: "403",
    errorMessage: "Forbidden - Virtual Key Mobile-App-Prod is not authorized to access model gpt-4o under Team policy.",
    failureReason: "Model Access Restricted by Team Policy.",
    errorType: "PermissionDeniedException",
    traceback: `File "/var/www/html/guardian_layer/litellm/proxy/auth/policy_evaluator.py", line 88, in evaluate_policy\n    raise PermissionDeniedException("Model access denied", code=403)`,
    callType: "acompletion",
    modelId: "gpt-4o",
    apiBase: "https://api.openai.com/v1",
    ipAddress: "192.168.1.109",
    userEmail: "campaign@acme.com",
    promptTokens: 50,
    completionTokens: 0,
    totalTokens: 50,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0,
    outputCost: 0,
    originalLlmCost: 0,
    userAgent: "Mobile-iOS/18.2",
    requestPayload: JSON.stringify({ model: "gpt-4o", messages: [{ role: "user", content: "Test model restriction." }] }, null, 2),
    responsePayload: "",
    metadataJson: {
      status: "failure",
      error_code: "403",
      allowed_models: ["gpt-4o-mini", "dall-e-3"]
    },
    timeline: [
      { event: "Policy Evaluator Checked", timeOffset: "+0.035s", status: "error" },
      { event: "HTTP 403 Forbidden Returned", timeOffset: "+0.040s", status: "error" }
    ]
  },
  {
    id: "log-134",
    requestId: "gem-flash-102948a",
    sessionId: "dev-sess-8812-7710",
    time: "Jul 29, 10:15:00",
    timestampISO: "2026-07-29T10:15:00.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000010,
    duration: 0.82,
    ttft: 0.80,
    teamName: "litellm-internal-dev",
    keyHash: "lite11m-inter-8823c",
    keyAlias: "litellm-internal-key",
    model: "gemini-2.5-flash",
    provider: "Gemini",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Default",
    callType: "acompletion",
    modelId: "gemini-2.5-flash",
    apiBase: "https://generativelanguage.googleapis.com",
    ipAddress: "127.0.0.1",
    userEmail: "superadmin@spinecloudiq.com",
    promptTokens: 60,
    completionTokens: 85,
    totalTokens: 145,
    cacheStatus: "Hit",
    retries: 0,
    inputCost: 0.000002,
    outputCost: 0.000008,
    originalLlmCost: 0.000010,
    userAgent: "Mozilla/5.0",
    requestPayload: JSON.stringify({ model: "gemini-2.5-flash", messages: [{ role: "user", content: "Ping test." }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { role: "assistant", content: "Pong from Gemini 2.5 Flash." } }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Completed", timeOffset: "+0.820s", status: "success" }
    ]
  },
  {
    id: "log-135",
    requestId: "dp-deep-991024",
    sessionId: "res-sess-8812-1029",
    time: "Jul 28, 22:00:00",
    timestampISO: "2026-07-28T22:00:00.000Z",
    type: "LLM",
    status: "Success",
    cost: 0.000160,
    duration: 7.20,
    ttft: 0.48,
    teamName: "AI Research",
    keyHash: "0989ac14c54a",
    keyAlias: "Gemini Pro Key",
    model: "deepseek-r1",
    provider: "DeepSeek",
    organization: "Acme Enterprise",
    requestType: "LLM",
    environment: "Development",
    callType: "acompletion",
    modelId: "deepseek-reasoner",
    apiBase: "https://api.deepseek.com/v1",
    ipAddress: "127.0.0.1",
    userEmail: "alex.dev@hb.com",
    promptTokens: 240,
    completionTokens: 810,
    totalTokens: 1050,
    cacheStatus: "Miss",
    retries: 0,
    inputCost: 0.000025,
    outputCost: 0.000135,
    originalLlmCost: 0.000160,
    userAgent: "DeepSeek-Client/1.0",
    requestPayload: JSON.stringify({ model: "deepseek-r1", messages: [{ role: "user", content: "Write quicksort algorithm in C++ with memory safety checks." }] }, null, 2),
    responsePayload: JSON.stringify({ choices: [{ message: { role: "assistant", content: "```cpp\n#include <vector>\n..." } }] }, null, 2),
    metadataJson: { status: "success" },
    timeline: [
      { event: "Completed", timeOffset: "+7.200s", status: "success" }
    ]
  }
];

export function RequestLogsManagement() {
  // Navigation tab state inside Header (Request Logs, Audit Logs)
  const [headerTab, setHeaderTab] = useState<"request" | "audit" | "deleted_keys" | "deleted_teams">("request");

  useEffect(() => {
    document.title = "Logs | SA - Guardian Layer";
  }, []);

  // Search & Filter Toolbar States
  const [searchRequestId, setSearchRequestId] = useState("");
  const [timeRange, setTimeRange] = useState("Last 7 Days");
  const [isLiveTail, setIsLiveTail] = useState(false);
  const [liveTailTimer, setLiveTailTimer] = useState<number>(15);

  // Pagination & Sorting State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [sortField, setSortField] = useState<keyof RequestLogEntry>("timestampISO");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Advanced Filter Drawer State
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [filterTeam, setFilterTeam] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterKeyAlias, setFilterKeyAlias] = useState("All");
  const [filterModel, setFilterModel] = useState("All");
  const [filterProvider, setFilterProvider] = useState("All");
  const [filterOrganization, setFilterOrganization] = useState("All");
  const [filterRequestType, setFilterRequestType] = useState("All");
  const [filterEnvironment, setFilterEnvironment] = useState("All");

  // Request Details Drawer State
  const [selectedLog, setSelectedLog] = useState<RequestLogEntry | null>(null);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [detailTab, setDetailTab] = useState<"pretty" | "json">("pretty");

  // Detail Drawer Accordion Expanded States
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(
    new Set(["tags", "details", "metrics", "cost", "payload", "metadata", "error", "timeline"])
  );

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Live Tail Auto Refresh Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isLiveTail) {
      interval = setInterval(() => {
        setLiveTailTimer((prev) => {
          if (prev <= 1) {
            toast.success("Live Tail: Fetched latest request logs");
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setLiveTailTimer(15);
    }
    return () => clearInterval(interval);
  }, [isLiveTail]);

  // Handle Sort Column Toggle
  const handleSort = (field: keyof RequestLogEntry) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Filtered & Sorted Request Logs
  const sortedAndFilteredLogs = useMemo(() => {
    return mockRequestLogsData
      .filter((log) => {
        const q = searchRequestId.toLowerCase().trim();
        const matchesSearch =
          !q ||
          log.requestId.toLowerCase().includes(q) ||
          log.sessionId.toLowerCase().includes(q) ||
          log.keyAlias.toLowerCase().includes(q) ||
          log.model.toLowerCase().includes(q) ||
          log.teamName.toLowerCase().includes(q) ||
          log.provider.toLowerCase().includes(q) ||
          (log.userEmail && log.userEmail.toLowerCase().includes(q));

        const matchesTeam = filterTeam === "All" || log.teamName === filterTeam;
        const matchesStatus = filterStatus === "All" || log.status === filterStatus;
        const matchesKeyAlias = filterKeyAlias === "All" || log.keyAlias === filterKeyAlias;
        const matchesModel = filterModel === "All" || log.model === filterModel;
        const matchesProvider = filterProvider === "All" || log.provider === filterProvider;
        const matchesOrganization = filterOrganization === "All" || log.organization === filterOrganization;
        const matchesRequestType = filterRequestType === "All" || log.type === filterRequestType;
        const matchesEnvironment = filterEnvironment === "All" || log.environment === filterEnvironment;

        return (
          matchesSearch &&
          matchesTeam &&
          matchesStatus &&
          matchesKeyAlias &&
          matchesModel &&
          matchesProvider &&
          matchesOrganization &&
          matchesRequestType &&
          matchesEnvironment
        );
      })
      .sort((a, b) => {
        let valA: any = a[sortField];
        let valB: any = b[sortField];

        if (valA === null || valA === undefined) valA = "";
        if (valB === null || valB === undefined) valB = "";

        if (typeof valA === "number" && typeof valB === "number") {
          return sortDirection === "asc" ? valA - valB : valB - valA;
        }

        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        if (sortDirection === "asc") return strA > strB ? 1 : -1;
        return strA < strB ? 1 : -1;
      });
  }, [
    searchRequestId,
    filterTeam,
    filterStatus,
    filterKeyAlias,
    filterModel,
    filterProvider,
    filterOrganization,
    filterRequestType,
    filterEnvironment,
    sortField,
    sortDirection
  ]);

  // Dynamic Pagination calculations
  const totalPages = Math.ceil(sortedAndFilteredLogs.length / pageSize) || 1;

  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedAndFilteredLogs.slice(start, start + pageSize);
  }, [sortedAndFilteredLogs, currentPage, pageSize]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchRequestId,
    filterTeam,
    filterStatus,
    filterKeyAlias,
    filterModel,
    filterProvider,
    filterOrganization,
    filterRequestType,
    filterEnvironment
  ]);

  const startItem = sortedAndFilteredLogs.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, sortedAndFilteredLogs.length);

  const handleResetFilters = () => {
    setSearchRequestId("");
    setFilterTeam("All");
    setFilterStatus("All");
    setFilterKeyAlias("All");
    setFilterModel("All");
    setFilterProvider("All");
    setFilterOrganization("All");
    setFilterRequestType("All");
    setFilterEnvironment("All");
    toast.success("Reset all request log filters");
  };

  const handleRowClick = (log: RequestLogEntry) => {
    setSelectedLog(log);
    setShowDetailDrawer(true);
  };

  // Next / Previous Navigation inside Detail Drawer
  const handleNavigateNext = () => {
    if (!selectedLog) return;
    const currentIndex = sortedAndFilteredLogs.findIndex((l) => l.id === selectedLog.id);
    if (currentIndex < sortedAndFilteredLogs.length - 1) {
      setSelectedLog(sortedAndFilteredLogs[currentIndex + 1]);
    }
  };

  const handleNavigatePrev = () => {
    if (!selectedLog) return;
    const currentIndex = sortedAndFilteredLogs.findIndex((l) => l.id === selectedLog.id);
    if (currentIndex > 0) {
      setSelectedLog(sortedAndFilteredLogs[currentIndex - 1]);
    }
  };

  const currentLogIndex = useMemo(() => {
    if (!selectedLog) return -1;
    return sortedAndFilteredLogs.findIndex((l) => l.id === selectedLog.id);
  }, [selectedLog, sortedAndFilteredLogs]);

  const renderStatusBadge = (status: RequestLogEntry["status"]) => {
    switch (status) {
      case "Success":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50">
            Success
          </span>
        );
      case "Failure":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/50">
            Failure
          </span>
        );
      case "Warning":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/50">
            Warning
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50">
            Pending
          </span>
        );
    }
  };

  const renderTypePill = (type: RequestLogEntry["type"]) => {
    let icon = <Zap className="w-3 h-3" />;
    let style = "bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200/50";

    if (type === "Embedding") {
      icon = <Layers className="w-3 h-3 text-purple-600" />;
      style = "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200/50";
    } else if (type === "Image") {
      icon = <ImageIcon className="w-3 h-3 text-pink-600" />;
      style = "bg-pink-50 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 border-pink-200/50";
    } else if (type === "Audio") {
      icon = <Mic className="w-3 h-3 text-amber-600" />;
      style = "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200/50";
    } else if (type === "Tool") {
      icon = <Wrench className="w-3 h-3 text-teal-600" />;
      style = "bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border-teal-200/50";
    }

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${style}`}>
        {icon}
        {type}
      </span>
    );
  };

  if (headerTab === "audit") {
    return <AuditLogsManagement onTabChange={(tab) => setHeaderTab(tab)} />;
  }

  return (
    <div className="space-y-4 p-4 sm:p-6 max-w-[1700px] mx-auto text-xs animate-fadeIn">
      {/* SECTION 1: HEADER & NAVIGATION TABS */}
      <div className="space-y-3 bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">Request Logs</h1>
          <p className="text-xs text-neutral-500 mt-1 font-medium">
            Real-time observability, gateway tracing, cost analytics, and failure diagnostics across AI models.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-2 font-medium">
            <span>AI Gateway</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 font-semibold">Logs</span>
          </div>
        </div>

        {/* Navigation Tabs (Request Logs & Audit Logs) */}
        <div className="pt-2 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-6 text-xs font-semibold overflow-x-auto">
            <button
              type="button"
              onClick={() => setHeaderTab("request")}
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

          {/* Quick Filters buttons on Header */}
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

      {/* RENDER ACTIVE TAB CONTENT */}
      {headerTab === "request" && (
        <div className="space-y-4">
          {/* SECTION 2: FILTER TOOLBAR */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-2xs">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="relative flex-1 min-w-[240px] max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchRequestId}
                  onChange={(e) => setSearchRequestId(e.target.value)}
                  placeholder="Search by Request ID, Session ID, Key Alias, Model or User..."
                  className="w-full h-9 pl-9 pr-8 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-medium"
                />
                {searchRequestId && (
                  <button
                    type="button"
                    onClick={() => setSearchRequestId("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Time Range Dropdown */}
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="h-9 px-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-semibold"
                >
                  <option value="Last Minute">Last Minute</option>
                  <option value="Last 15 Minutes">Last 15 Minutes</option>
                  <option value="Last Hour">Last Hour</option>
                  <option value="Last 4 Hours">Last 4 Hours</option>
                  <option value="Last 24 Hours">Last 24 Hours</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Custom Date Range">Custom Date Range</option>
                </select>
              </div>

              {/* Live Tail Toggle */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300 text-xs">Live Tail</span>
                <button
                  type="button"
                  onClick={() => setIsLiveTail(!isLiveTail)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${isLiveTail ? "bg-primary-600" : "bg-neutral-300 dark:bg-neutral-700"}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isLiveTail ? "translate-x-4" : "translate-x-0"}`} />
                </button>
              </div>

              {/* Fetch Button */}
              <button
                type="button"
                onClick={() => toast.success("Fetched latest request logs")}
                className="h-9 px-3.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
                <span>Fetch</span>
              </button>

              {/* Export CSV Button */}
              <button
                type="button"
                onClick={() => toast.success("Exported request logs to CSV")}
                className="h-9 px-3.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold flex items-center gap-1.5 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Pagination & Count summary */}
            <div className="flex items-center gap-3 text-neutral-500 text-xs font-mono">
              <span>Showing {startItem} - {endItem} of {sortedAndFilteredLogs.length} results</span>
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">Page {currentPage} of {totalPages}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-2 py-1 border border-neutral-300 dark:border-neutral-700 rounded font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  Prev
                </button>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-2 py-1 border border-neutral-300 dark:border-neutral-700 rounded font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 4: LIVE TAIL STATUS BANNER */}
          {isLiveTail && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 rounded-xl flex items-center justify-between text-emerald-800 dark:text-emerald-300 animate-fadeIn">
              <div className="flex items-center gap-2 font-medium text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Auto-refreshing every 15 seconds (Next update in {liveTailTimer}s)</span>
              </div>
              <button
                type="button"
                onClick={() => setIsLiveTail(false)}
                className="px-3 py-1 bg-white dark:bg-neutral-900 border border-emerald-300 dark:border-emerald-700 rounded-lg font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
              >
                Stop
              </button>
            </div>
          )}

          {/* SECTION 5: REQUEST LOG TABLE */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto max-h-[650px] relative">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="sticky top-0 z-10 bg-neutral-50 dark:bg-neutral-800/90 backdrop-blur-xs border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 font-semibold select-none">
                  <tr>
                    <th
                      onClick={() => handleSort("timestampISO")}
                      className="py-3 px-4 sticky left-0 z-20 bg-neutral-50 dark:bg-neutral-800 cursor-pointer hover:text-neutral-900 dark:hover:text-white"
                    >
                      <div className="flex items-center gap-1">
                        <span>Time</span>
                        {sortField === "timestampISO" ? (
                          sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-primary-600" /> : <ArrowDown className="w-3.5 h-3.5 text-primary-600" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                        )}
                      </div>
                    </th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Session ID</th>
                    <th className="py-3 px-4">Request ID</th>
                    <th
                      onClick={() => handleSort("cost")}
                      className="py-3 px-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white"
                    >
                      <div className="flex items-center gap-1">
                        <span>Cost ($)</span>
                        {sortField === "cost" ? (
                          sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-primary-600" /> : <ArrowDown className="w-3.5 h-3.5 text-primary-600" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("duration")}
                      className="py-3 px-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white"
                    >
                      <div className="flex items-center gap-1">
                        <span>Duration (s)</span>
                        {sortField === "duration" ? (
                          sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-primary-600" /> : <ArrowDown className="w-3.5 h-3.5 text-primary-600" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                        )}
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("ttft")}
                      className="py-3 px-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white"
                    >
                      <div className="flex items-center gap-1">
                        <span>TTFT (s)</span>
                        {sortField === "ttft" ? (
                          sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-primary-600" /> : <ArrowDown className="w-3.5 h-3.5 text-primary-600" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                        )}
                      </div>
                    </th>
                    <th className="py-3 px-4">Team Name</th>
                    <th className="py-3 px-4">Key Hash</th>
                    <th className="py-3 px-4">Key Alias</th>
                    <th
                      onClick={() => handleSort("model")}
                      className="py-3 px-4 cursor-pointer hover:text-neutral-900 dark:hover:text-white"
                    >
                      <div className="flex items-center gap-1">
                        <span>Model</span>
                        {sortField === "model" ? (
                          sortDirection === "asc" ? <ArrowUp className="w-3.5 h-3.5 text-primary-600" /> : <ArrowDown className="w-3.5 h-3.5 text-primary-600" />
                        ) : (
                          <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                        )}
                      </div>
                    </th>
                    <th className="py-3 px-4">Provider</th>
                    <th className="py-3 px-4">Organization</th>
                    <th className="py-3 px-4">Environment</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80 text-neutral-800 dark:text-neutral-200 font-medium">
                  {paginatedLogs.length === 0 ? (
                    <tr>
                      <td colSpan={16} className="py-16 text-center text-neutral-400 space-y-3">
                        <Activity className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-700 stroke-1" />
                        <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">No Request Logs Found</div>
                        <p className="text-xs max-w-sm mx-auto">No request logs match your current search query or filter parameters.</p>
                        <button
                          type="button"
                          onClick={handleResetFilters}
                          className="px-3.5 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
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
                        className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer group"
                      >
                        <td className="py-3 px-4 font-semibold text-neutral-900 dark:text-white whitespace-nowrap sticky left-0 bg-white dark:bg-neutral-900 group-hover:bg-neutral-50 dark:group-hover:bg-neutral-800">
                          {log.time}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">{renderTypePill(log.type)}</td>
                        <td className="py-3 px-4 whitespace-nowrap">{renderStatusBadge(log.status)}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-blue-600 dark:text-blue-400 whitespace-nowrap truncate max-w-[120px]" title={log.sessionId}>
                          {log.sessionId}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-neutral-700 dark:text-neutral-300 whitespace-nowrap truncate max-w-[140px]" title={log.requestId}>
                          {log.requestId}
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                          {log.cost !== null ? `$${log.cost.toFixed(6)}` : "-"}
                        </td>
                        <td className="py-3 px-4 font-mono text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                          {log.duration.toFixed(2)}s
                        </td>
                        <td className="py-3 px-4 font-mono text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                          {log.ttft !== null ? `${log.ttft.toFixed(2)}s` : "-"}
                        </td>
                        <td className="py-3 px-4 font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
                          {log.teamName || "-"}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-neutral-500 whitespace-nowrap truncate max-w-[110px]" title={log.keyHash}>
                          {log.keyHash || "-"}
                        </td>
                        <td className="py-3 px-4 font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
                          {log.keyAlias || "-"}
                        </td>
                        <td className="py-3 px-4 font-semibold text-primary-600 dark:text-primary-400 whitespace-nowrap flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-amber-500" />
                          <span>{log.model}</span>
                        </td>
                        <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                          {log.provider}
                        </td>
                        <td className="py-3 px-4 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                          {log.organization}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                            {log.environment}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRowClick(log);
                            }}
                            className="text-primary-600 font-semibold hover:underline"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Dynamic Pagination Bar */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={sortedAndFilteredLogs.length}
                itemsPerPage={pageSize}
                onPageChange={(p) => setCurrentPage(p)}
                onItemsPerPageChange={(s) => {
                  setPageSize(s);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ADVANCED FILTER DRAWER (RIGHT DRAWER) */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 max-w-md w-full h-full flex flex-col shadow-2xl animate-slideLeft">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary-600" />
                <span>Filter Request Logs</span>
              </h3>
              <button type="button" onClick={() => setShowFilterDrawer(false)}>
                <X className="w-4 h-4 text-neutral-400 hover:text-neutral-600" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              <div>
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Team</label>
                <select value={filterTeam} onChange={(e) => setFilterTeam(e.target.value)} className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg">
                  <option value="All">All Teams</option>
                  <option value="litellm-internal-dev">litellm-internal-dev</option>
                  <option value="Sales Team">Sales Team</option>
                  <option value="Engineering">Engineering</option>
                  <option value="AI Research">AI Research</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Product Security">Product Security</option>
                  <option value="Data Platform">Data Platform</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Status</label>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg">
                  <option value="All">All Statuses</option>
                  <option value="Success">Success</option>
                  <option value="Failure">Failure</option>
                  <option value="Warning">Warning</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Key Alias</label>
                <select value={filterKeyAlias} onChange={(e) => setFilterKeyAlias(e.target.value)} className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg">
                  <option value="All">All Key Aliases</option>
                  <option value="litellm-internal-key">litellm-internal-key</option>
                  <option value="CRM KEY">CRM KEY</option>
                  <option value="Ravi key">Ravi key</option>
                  <option value="Production-Service-Key">Production-Service-Key</option>
                  <option value="Mobile-App-Prod">Mobile-App-Prod</option>
                  <option value="Analytics-Pipeline-Key">Analytics-Pipeline-Key</option>
                  <option value="Gemini Pro Key">Gemini Pro Key</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Model</label>
                <select value={filterModel} onChange={(e) => setFilterModel(e.target.value)} className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg">
                  <option value="All">All Models</option>
                  <optgroup label="OpenAI">
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="text-embedding-3-small">text-embedding-3-small</option>
                    <option value="dall-e-3">DALL-E 3</option>
                    <option value="whisper-1">Whisper-1</option>
                  </optgroup>
                  <optgroup label="Anthropic">
                    <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                    <option value="claude-3-haiku">Claude 3 Haiku</option>
                  </optgroup>
                  <optgroup label="Gemini">
                    <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                  </optgroup>
                  <optgroup label="DeepSeek">
                    <option value="deepseek-r1">DeepSeek R1</option>
                  </optgroup>
                  <optgroup label="Meta Llama">
                    <option value="llama-3.3-70b">Llama 3.3 70B</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Provider</label>
                <select value={filterProvider} onChange={(e) => setFilterProvider(e.target.value)} className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg">
                  <option value="All">All Providers</option>
                  <option value="OpenAI">OpenAI</option>
                  <option value="Anthropic">Anthropic</option>
                  <option value="Gemini">Gemini</option>
                  <option value="DeepSeek">DeepSeek</option>
                  <option value="Meta-Llama">Meta-Llama</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Organization</label>
                <select value={filterOrganization} onChange={(e) => setFilterOrganization(e.target.value)} className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg">
                  <option value="All">All Organizations</option>
                  <option value="Acme Enterprise">Acme Enterprise</option>
                  <option value="Global Tech Solutions">Global Tech Solutions</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-neutral-800 dark:text-neutral-200 mb-1">Environment</label>
                <select value={filterEnvironment} onChange={(e) => setFilterEnvironment(e.target.value)} className="w-full h-9 px-3 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg">
                  <option value="All">All Environments</option>
                  <option value="Default">Default</option>
                  <option value="Production">Production</option>
                  <option value="Development">Development</option>
                  <option value="Testing">Testing</option>
                </select>
              </div>
            </div>

            {/* Sticky Drawer Footer */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-between gap-3 bg-neutral-50 dark:bg-neutral-900">
              <button type="button" onClick={handleResetFilters} className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                Reset Filters
              </button>
              <PrimaryButton onClick={() => setShowFilterDrawer(false)}>
                Apply Filters
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: REQUEST DETAILS RIGHT DRAWER */}
      {showDetailDrawer && selectedLog && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 max-w-4xl w-full h-full flex flex-col shadow-2xl animate-slideLeft">
            {/* Drawer Header */}
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/80 dark:bg-neutral-900">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-mono font-bold text-sm text-neutral-900 dark:text-white truncate max-w-md" title={selectedLog.requestId}>
                    {selectedLog.requestId}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(selectedLog.requestId);
                      toast.success("Copied Request ID!");
                    }}
                    title="Copy Request ID"
                    className="p-1 text-neutral-400 hover:text-primary-600"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {renderStatusBadge(selectedLog.status)}
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border">
                    Env: {selectedLog.environment}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 font-mono">Timestamp: {selectedLog.timestampISO}</p>
              </div>

              {/* Prev / Next & Close */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-400">
                  {currentLogIndex + 1} of {sortedAndFilteredLogs.length}
                </span>
                <button
                  type="button"
                  disabled={currentLogIndex <= 0}
                  onClick={handleNavigatePrev}
                  className="p-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg disabled:opacity-30 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  title="Previous Request"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={currentLogIndex >= sortedAndFilteredLogs.length - 1}
                  onClick={handleNavigateNext}
                  className="p-1.5 border border-neutral-300 dark:border-neutral-700 rounded-lg disabled:opacity-30 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  title="Next Request"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button type="button" onClick={() => setShowDetailDrawer(false)} className="p-1.5 text-neutral-400 hover:text-neutral-700 dark:hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Accordion Body */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* 1. Request Failed Banner (If Status === Failure) */}
              {selectedLog.status === "Failure" && (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 rounded-xl space-y-2 text-rose-900 dark:text-rose-200 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300 text-sm">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>Request Failed</span>
                  </div>
                  <div className="text-xs font-semibold">Error Code: {selectedLog.errorCode || "401"}</div>
                  <p className="text-xs leading-relaxed font-mono bg-white/60 dark:bg-black/30 p-2.5 rounded-lg border border-rose-200/50">
                    {selectedLog.errorMessage || "Authentication Error - Expired Key or missing authorization token."}
                  </p>
                </div>
              )}

              {/* 2. Tags */}
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("tags")}
                  className="w-full p-3 bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-between font-bold text-neutral-900 dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary-600" />
                    <span>Tags</span>
                  </span>
                  {openAccordions.has("tags") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.has("tags") && (
                  <div className="p-3 bg-white dark:bg-neutral-900 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md font-mono text-[11px] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                        0: User Agent: {selectedLog.userAgent ? selectedLog.userAgent.slice(0, 30) : "Mozilla/5.0"}
                      </span>
                      <span className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md font-mono text-[11px] text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 truncate max-w-md">
                        1: {selectedLog.userAgent || "Mozilla/5.0 (X11; Linux x86_64)"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Request Details */}
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("details")}
                  className="w-full p-3 bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-between font-bold text-neutral-900 dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-600" />
                    <span>Request Details</span>
                  </span>
                  {openAccordions.has("details") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.has("details") && (
                  <div className="p-4 bg-white dark:bg-neutral-900 grid grid-cols-2 gap-4 text-xs">
                    <div><span className="text-neutral-400 block">Model:</span> <span className="font-semibold text-neutral-900 dark:text-white">{selectedLog.model}</span></div>
                    <div><span className="text-neutral-400 block">Provider:</span> <span className="font-semibold text-neutral-900 dark:text-white">{selectedLog.provider}</span></div>
                    <div><span className="text-neutral-400 block">Call Type:</span> <span className="font-mono text-neutral-800 dark:text-neutral-200">{selectedLog.callType || "acompletion"}</span></div>
                    <div><span className="text-neutral-400 block">Model ID:</span> <span className="font-mono text-neutral-800 dark:text-neutral-200 truncate block">{selectedLog.modelId || "-"}</span></div>
                    <div><span className="text-neutral-400 block">API Base URL:</span> <span className="font-mono text-neutral-800 dark:text-neutral-200 truncate block">{selectedLog.apiBase || "-"}</span></div>
                    <div><span className="text-neutral-400 block">IP Address:</span> <span className="font-mono text-neutral-800 dark:text-neutral-200">{selectedLog.ipAddress || "127.0.0.1"}</span></div>
                    <div><span className="text-neutral-400 block">Organization:</span> <span className="font-semibold text-neutral-900 dark:text-white">{selectedLog.organization}</span></div>
                    <div><span className="text-neutral-400 block">Team:</span> <span className="font-semibold text-neutral-900 dark:text-white">{selectedLog.teamName || "-"}</span></div>
                    <div><span className="text-neutral-400 block">Virtual Key:</span> <span className="font-semibold text-neutral-900 dark:text-white">{selectedLog.keyAlias || "-"}</span></div>
                    <div><span className="text-neutral-400 block">User:</span> <span className="font-semibold text-neutral-900 dark:text-white">{selectedLog.userEmail || "-"}</span></div>
                  </div>
                )}
              </div>

              {/* 4. Metrics */}
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("metrics")}
                  className="w-full p-3 bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-between font-bold text-neutral-900 dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>Metrics</span>
                  </span>
                  {openAccordions.has("metrics") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.has("metrics") && (
                  <div className="p-4 bg-white dark:bg-neutral-900 grid grid-cols-2 gap-4 text-xs">
                    <div><span className="text-neutral-400 block">Tokens:</span> <span className="font-bold text-neutral-900 dark:text-white font-mono">{selectedLog.totalTokens || 0} ({selectedLog.promptTokens || 0} prompt + {selectedLog.completionTokens || 0} completion)</span></div>
                    <div><span className="text-neutral-400 block">Cost:</span> <span className="font-bold text-emerald-600 font-mono">${selectedLog.cost !== null ? selectedLog.cost.toFixed(6) : "0.000000"}</span></div>
                    <div><span className="text-neutral-400 block">Duration:</span> <span className="font-mono text-neutral-800 dark:text-neutral-200">{selectedLog.duration.toFixed(3)} s</span></div>
                    <div><span className="text-neutral-400 block">Time to First Token:</span> <span className="font-mono text-neutral-800 dark:text-neutral-200">{selectedLog.ttft !== null ? `${selectedLog.ttft.toFixed(3)} s` : "-"}</span></div>
                    <div><span className="text-neutral-400 block">Response Cache:</span> <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">{selectedLog.cacheStatus || "Miss"}</span></div>
                    <div><span className="text-neutral-400 block">Retries:</span> <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">{selectedLog.retries || 0}</span></div>
                  </div>
                )}
              </div>

              {/* 5. Cost Breakdown */}
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("cost")}
                  className="w-full p-3 bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-between font-bold text-neutral-900 dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Cost Breakdown</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-600 text-xs">Total: ${selectedLog.cost !== null ? selectedLog.cost.toFixed(8) : "0.00000000"}</span>
                    {openAccordions.has("cost") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {openAccordions.has("cost") && (
                  <div className="p-4 bg-white dark:bg-neutral-900 space-y-2 text-xs">
                    <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-1.5"><span className="text-neutral-400">Input Cost:</span> <span className="font-mono font-semibold">${(selectedLog.inputCost || 0).toFixed(8)} ({selectedLog.promptTokens || 0} prompt tokens)</span></div>
                    <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-1.5"><span className="text-neutral-400">Output Cost:</span> <span className="font-mono font-semibold">${(selectedLog.outputCost || 0).toFixed(8)} ({selectedLog.completionTokens || 0} completion tokens)</span></div>
                    <div className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-1.5"><span className="text-neutral-400">Original LLM Cost:</span> <span className="font-mono font-semibold">${(selectedLog.originalLlmCost || 0).toFixed(8)}</span></div>
                    <div className="flex justify-between font-bold text-sm pt-1"><span className="text-neutral-900 dark:text-white">Final Calculated Cost:</span> <span className="font-mono text-emerald-600">${selectedLog.cost !== null ? selectedLog.cost.toFixed(8) : "0.00000000"}</span></div>
                  </div>
                )}
              </div>

              {/* 6. Request & Response Payload */}
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <div className="p-3 bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-between font-bold text-neutral-900 dark:text-white">
                  <span className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-blue-600" />
                    <span>Request & Response</span>
                  </span>
                  <div className="flex items-center gap-1 bg-neutral-200 dark:bg-neutral-700 p-0.5 rounded-lg">
                    <button type="button" onClick={() => setDetailTab("pretty")} className={`px-2.5 py-1 rounded text-[10px] font-bold ${detailTab === "pretty" ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white" : "text-neutral-500"}`}>Pretty</button>
                    <button type="button" onClick={() => setDetailTab("json")} className={`px-2.5 py-1 rounded text-[10px] font-bold ${detailTab === "json" ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white" : "text-neutral-500"}`}>JSON</button>
                  </div>
                </div>
                <div className="p-4 bg-neutral-950 text-neutral-100 font-mono text-xs overflow-x-auto max-h-72">
                  <pre>{detailTab === "pretty" ? selectedLog.responsePayload || "// No response payload recorded" : JSON.stringify(selectedLog.metadataJson || {}, null, 2)}</pre>
                </div>
              </div>

              {/* 7. Metadata JSON */}
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("metadata")}
                  className="w-full p-3 bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-between font-bold text-neutral-900 dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <FileJson className="w-4 h-4 text-amber-500" />
                    <span>Metadata</span>
                  </span>
                  {openAccordions.has("metadata") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.has("metadata") && (
                  <div className="p-4 bg-neutral-950 text-emerald-400 font-mono text-xs overflow-x-auto max-h-60 rounded-b-xl">
                    <pre>{JSON.stringify(selectedLog.metadataJson || {}, null, 2)}</pre>
                  </div>
                )}
              </div>

              {/* 8. Error Information (Failure Only) */}
              {selectedLog.status === "Failure" && (
                <div className="border border-rose-200 dark:border-rose-900 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleAccordion("error")}
                    className="w-full p-3 bg-rose-50 dark:bg-rose-950/50 flex items-center justify-between font-bold text-rose-800 dark:text-rose-300"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600" />
                      <span>Error Information & Traceback</span>
                    </span>
                    {openAccordions.has("error") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordions.has("error") && (
                    <div className="p-4 bg-neutral-950 text-rose-300 font-mono text-[11px] overflow-x-auto">
                      <pre>{selectedLog.traceback || "ProxyException: Error Code 401 - Authentication Key Expired."}</pre>
                    </div>
                  )}
                </div>
              )}

              {/* 9. Timeline */}
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("timeline")}
                  className="w-full p-3 bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-between font-bold text-neutral-900 dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Request Timeline</span>
                  </span>
                  {openAccordions.has("timeline") ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.has("timeline") && (
                  <div className="p-4 bg-white dark:bg-neutral-900 space-y-3">
                    {(selectedLog.timeline || []).map((t, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full ${t.status === "error" ? "bg-rose-500" : t.status === "success" ? "bg-emerald-500" : "bg-blue-500"}`} />
                        <span className="font-semibold text-neutral-900 dark:text-white flex-1">{t.event}</span>
                        <span className="font-mono text-neutral-400 text-[11px]">{t.timeOffset}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
