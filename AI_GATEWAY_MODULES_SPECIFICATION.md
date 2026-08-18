# AI Gateway Modules Technical Specification & Architecture Blueprint

This document provides a comprehensive, production-ready specification for the four core **AI Gateway** modules:
1. [**Virtual Key**](#1-virtual-key-module)
2. [**Credentials Management**](#2-credentials-management-module)
3. [**Model Management**](#3-model-management-module)
4. [**Playground**](#4-ai-gateway-playground-module)

It includes exact UI layouts, data models, state management, form fields, validation logic, API integration flows, and interaction rules required to implement these modules in a new project.

---

## Architecture Overview

```
+-----------------------------------------------------------------------------------+
|                                  AI GATEWAY                                       |
+---------------------+-----------------------+------------------+------------------+
| 1. Virtual Key      | 2. Credentials Mgmt   | 3. Model Mgmt    | 4. Playground    |
| - 2-Step Form Page  | - Provider API Keys   | - Catalog & Caps | - Live Model Testing|
| - Multi-Cloud Catalog| - Encrypted Storage   | - Rate Pricing   | - Code Exporter  |
| - Budget & Limits   | - Connection Validation| - Global Enable  | - Real-time Stats|
+---------------------+-----------------------+------------------+------------------+
```

---

## 1. Virtual Key Module

### 1.1 Overview
The **Virtual Key** module generates scoped, proxy API routing keys (`sk-vk-...`) that decouple client applications and teams from direct provider master API keys. It enforces budget caps, rate limits (TPM/RPM), and model-level access rules.

### 1.2 Screen Architecture & Views

The Virtual Key module consists of three distinct view states:
1. **Virtual Key Listing (`'list'`)**: Table view with summary KPIs, search bar, column filters, and row action menus.
2. **Dedicated Add/Edit Page (`'create'` / `'edit'`)**: A 2-step dedicated page experience (`VirtualKeyForm`).
3. **Key Details Drawer (`'detail'`)**: Slide-over drawer displaying configuration metadata, cost burn rate, and usage metrics.

---

### 1.3 Key Data Model (TypeScript Interface)

```typescript
export interface VirtualKeyItem {
  id: string;
  alias: string; // e.g., "support-prod-key"
  keyId: string; // Internal identifier e.g., "vk-892341"
  maskedKey: string; // e.g., "sk-vk-892...341"
  team: string; // Assigned Team or "Unassigned"
  user: string; // Assigned User or "Unassigned"
  ownershipType: "User" | "Team";
  modelsAccessMode: "All Available Models" | "Selected Models";
  models: string[]; // List of enabled model IDs
  budget: {
    unlimited: boolean;
    maxBudget: number; // USD
    softBudget: number; // USD
    resetDuration: "Monthly" | "Weekly" | "Quarterly" | "Never";
    notificationEmails: string[];
  };
  rateLimits: {
    unlimited: boolean;
    tpm: number; // Tokens Per Minute
    rpm: number; // Requests Per Minute
  };
  currentSpend: number; // Accrued spend USD
  expiration: string; // ISO Date string or "Never"
  createdOn: string;
  status: "Active" | "Near Limit" | "Blocked" | "Expired";
}
```

---

### 1.4 Detailed 2-Step Add/Edit Form (`VirtualKeyForm`)

The Add/Edit Virtual Key workflow uses a dedicated 2-step stepper layout:

#### Step 1: Basic Information
- **Virtual Key Name \*** (Text Input): Required, 100 character max, with char counter.
- **Description (Optional)** (Textarea): 300 character max, with char counter.
- **Key Ownership \*** (Selectable Cards):
  - Card 1: `User` (Radio dot indicator + User icon)
  - Card 2: `Team` (Radio dot indicator + Building/Team icon)
- **Assigned Target Dropdown**:
  - If `User`: Select dropdown of Organization Users.
  - If `Team`: Select dropdown of Organization Teams.
- **Expiration Duration**: Select dropdown (`Never (No expiration)`, `30 Days`, `90 Days`, `1 Year`).

#### Step 2: Model Access, Budget & Limits
- **Model Access Selection**:
  - `All Available Models`: Automatically routes to all provider models enabled for the assigned User/Team.
  - `Selected Models`: Interactive provider/model browser:
    - **Provider Sidebar**: 20 Multi-Cloud Providers (OpenAI, Anthropic, Gemini, Azure, Bedrock, Mistral, Cohere, Groq, Perplexity, DeepSeek, xAI, Meta Llama, IBM watsonx, AI21, Voyage, HuggingFace, OpenRouter, Together, Fireworks, Replicate).
    - **Model Catalog Grid**: 2-column model card list per provider with context window and input/output token pricing tooltips (`i`).
    - **Selected Models Summary Chips**: Chip list showing provider counts, expandable badges, and clear (`×`) buttons.
- **Budget Configuration Card**:
  - `Unlimited Budget` checkbox toggle (disables budget inputs when checked).
  - `Max Budget ($ USD)` (Number input).
  - `Soft Budget ($ USD)` (Number input - triggers alert notification).
  - `Budget Reset Duration` (Dropdown: `Monthly`, `Weekly`, `Quarterly`, `Never`).
  - `Budget Notification Email` (Multi-email chip input).
- **Rate Limits Card**:
  - `Unlimited Rate Limits` checkbox toggle (disables TPM/RPM inputs when checked).
  - `TPM Limit` (Tokens Per Minute).
  - `RPM Limit` (Requests Per Minute).

#### Secret Key Creation Modal
Upon clicking **Save Virtual Key**, a modal displays the generated secret key (`sk-vk-...`) **once** with a 1-click **Copy Secret Key** button and security warning notice (`This key will never be shown again`).

---

## 2. Credentials Management Module

### 2.1 Overview
The **Credentials Management** module securely stores master API keys, organization IDs, and connection credentials for downstream AI providers (OpenAI, Anthropic, Azure OpenAI, DeepSeek, Ollama).

---

### 2.2 Credential Data Model

```typescript
export interface CredentialItem {
  id: string;
  name: string; // e.g., "Production OpenAI Master Key"
  provider: "OpenAI" | "Anthropic" | "Azure AI" | "DeepSeek" | "Ollama";
  createdOn: string;
  createdBy: string;
  updatedOn: string;
  status: "Active" | "Inactive" | "Error";
  maskedKey: string; // e.g., "sk-proj-...8a91"
  rawKey?: string; // Encrypted / protected raw key value
  associatedModelsCount: number;
  environment: "Production" | "Staging" | "Development";
}
```

---

### 2.3 Key Features & UI Workflows

1. **Provider Key Table**:
   - Displays Credential Name, Provider Badge with brand colors, Environment, Masked Key (`••••••••8a91`), Associated Models count, Created Date, Status, and Action Menu.
   - **Show/Hide Key Toggle**: Allows unmasking the key value with visual security prompt.

2. **Add / Edit Credential Form Modal**:
   - **Credential Name \*** (Text input).
   - **Provider Selection \*** (Dropdown / Cards: OpenAI, Anthropic, Azure AI, DeepSeek, Ollama).
   - **Environment** (Dropdown: `Production`, `Staging`, `Development`).
   - **API Key / Secret \*** (Password Input with show/hide toggle).
   - **Azure / Custom Endpoint URL** (Required for Azure AI & Ollama).
   - **Organization ID / Project ID** (Optional).
   - **Test Connection Action**: Executes a mock API handshake (`PING`) to verify key validity before saving.

3. **Credential Test Connection Flow**:
   - Triggers an active validation spinner.
   - On success: Displays green `✓ Connection Successful (Latency: 142ms)`.
   - On error: Displays red `✕ Invalid API Key or Unauthorized`.

---

## 3. Model Management Module

### 3.1 Overview
The **Model Management** module maintains the master catalog of LLM and multimodal models enabled across the organization. It controls global model activation, context window limits, and token pricing rates.

---

### 3.2 Model Data Model

```typescript
export interface OrgModelItem {
  id: string;
  name: string; // e.g., "gpt-4o"
  providerId: string; // e.g., "openai"
  providerName: string; // e.g., "OpenAI"
  color: string; // Brand HEX color
  contextWindow: number; // e.g., 128000 tokens
  inputPrice: number; // USD per 1M input tokens
  outputPrice: number; // USD per 1M output tokens
  status: "Active" | "Inactive";
  maxOutput: number; // e.g., 4096 tokens
  credentialId?: string; // Linked provider credential
}
```

---

### 3.3 Key Features & UI Workflows

1. **Model Catalog Grid & Table**:
   - Displays all registered models grouped or filtered by Provider.
   - Quick **Active / Inactive Status Switch**: Enables or disables model routing across all Virtual Keys instantly.
   - Metadata Badges: Context Window (`128K`), Input Rate (`$2.50/1M`), Output Rate (`$10.00/1M`).

2. **Add Custom / Private Model Modal**:
   - **Model Identifier \*** (e.g., `llama-3-70b-instruct`).
   - **Display Name \*** (e.g., `Llama 3 70B Instruct`).
   - **Provider \*** (Dropdown).
   - **Context Window (Tokens)** (Number input).
   - **Max Output Tokens** (Number input).
   - **Input Token Price ($ / 1M tokens)** (Number input).
   - **Output Token Price ($ / 1M tokens)** (Number input).
   - **Linked Credential** (Select dropdown from Credentials Management).

3. **Model Detail Drawer**:
   - Shows detailed latency metrics, token cost structure, usage history, and linked virtual keys.

---

## 4. AI Gateway Playground Module

### 4.1 Overview
The **Playground** provides an interactive testing workspace for organization admins and developers to send prompt completions through Virtual Keys, experiment with model hyperparameters, inspect token counts, and generate SDK code snippets.

---

### 4.2 Playground State & Hyperparameters

```typescript
export interface PlaygroundSettings {
  virtualKeyId: string;
  modelId: string;
  systemPrompt: string;
  temperature: number; // 0.0 to 2.0 (Default: 0.7)
  topP: number; // 0.0 to 1.0 (Default: 1.0)
  maxTokens: number; // 1 to 8192 (Default: 2048)
  frequencyPenalty: number; // -2.0 to 2.0 (Default: 0.0)
  presencePenalty: number; // -2.0 to 2.0 (Default: 0.0)
}
```

---

### 4.3 Workspace Layout & Panels

```
+------------------------------------------------------------------------------------+
| TOP TOOLBAR: [Select Virtual Key ▾] [Select Model ▾]  [Clear Chat] [Export Code]   |
+------------------------------------+-----------------------------------------------+
| LEFT PANEL: PARAMETERS & PROMPT    | RIGHT PANEL: CHAT & COMPLETION                |
| - System Prompt Textarea           | - Interactive Message Feed (User & Assistant)  |
| - Temperature Slider (0.7)        | - Chat Input Box + Send Action                |
| - Top-P Slider (1.0)               | - Token Usage Footer:                         |
| - Max Tokens Slider (2048)         |   Prompt: 142 | Completion: 388 | Total: 530 |
| - Frequency Penalty Slider (0.0)   |   Latency: 480ms | Cost: $0.0024               |
+------------------------------------+-----------------------------------------------+
```

---

### 4.4 Code Snippet Exporter Panel

Generates ready-to-run code for the current session state across multiple languages:

#### cURL Example
```bash
curl https://gateway.yourdomain.com/v1/chat/completions \
  -H "Authorization: Bearer sk-vk-892341..." \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o",
    "messages": [
      {"role": "system", "content": "You are a helpful AI assistant."},
      {"role": "user", "content": "Hello!"}
    ],
    "temperature": 0.7,
    "max_tokens": 2048
  }'
```

#### Python Example (OpenAI SDK)
```python
from openai import OpenAI

client = OpenAI(
    base_url="https://gateway.yourdomain.com/v1",
    api_key="sk-vk-892341..."
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "You are a helpful AI assistant."},
        {"role": "user", "content": "Hello!"}
    ],
    temperature=0.7,
    max_tokens=2048
)
print(response.choices[0].message.content)
```

---

## 5. Summary Matrix & Integration Points

| Module | Primary Function | Linked Dependencies | Key Output |
| :--- | :--- | :--- | :--- |
| **Virtual Key** | Route-level key management & budget enforcement | Teams, Users, Model Catalog | Proxy API Key (`sk-vk-...`) |
| **Credentials Mgmt** | Master provider API key storage & validation | External Provider APIs (OpenAI, Anthropic, etc.) | Validated Provider Credentials |
| **Model Mgmt** | Global catalog enablement & pricing config | Credentials Management | Active Model Registry |
| **Playground** | Live prompt sandbox & SDK exporter | Virtual Keys, Active Models | Verification & Code Export |

---

> **Note**: This file can be downloaded or exported directly as a standalone markdown specification for implementation in any target stack (React, Next.js, Angular, Vue, Node.js, Python, Go).
