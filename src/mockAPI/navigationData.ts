import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Clock,
  Plane,
  Palette,
  Layers,
  Calendar,
  Map,
  LogIn,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export interface SubMenuItem {
  id: string;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  onClick?: () => void;
  active?: boolean;
  subItems?: SubMenuItem[];
}

export const getNavigationData = (
  currentPage: string = "directory",
  onNavigate: (pageId: string) => void = () => {},
): MenuItem[] => {
  return [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      onClick: () => onNavigate("dashboard"),
      active: currentPage === "dashboard",
    },
    {
      id: "access-control",
      label: "Access Control",
      icon: ShieldCheck,
      subItems: [
        {
          id: "organizations",
          label: "Organizations",
          onClick: () => onNavigate("organizations"),
          active: currentPage === "organizations",
        },
      ],
    },
    {
      id: "ai-gateway",
      label: "AI Gateway",
      icon: Cpu,
      subItems: [
        {
          id: "security-monitoring",
          label: "Security Monitoring",
          onClick: () => onNavigate("security-monitoring"),
          active: currentPage === "security-monitoring",
        },
        {
          id: "policies",
          label: "Policies",
          onClick: () => onNavigate("policies"),
          active: currentPage === "policies",
        },
        {
          id: "guardrails",
          label: "Guardrails",
          onClick: () => onNavigate("guardrails"),
          active: currentPage === "guardrails" || currentPage === "guardrails-management",
        },
        {
          id: "virtual-keys",
          label: "Virtual Keys",
          onClick: () => onNavigate("virtual-keys"),
          active: currentPage === "virtual-keys" || currentPage === "virtual-key" || currentPage === "ai-gateway",
        },
        {
          id: "credentials-management",
          label: "Credentials Management",
          onClick: () => onNavigate("credentials-management"),
          active: currentPage === "credentials-management" || currentPage === "credentials",
        },
        {
          id: "ai-gateway-model-management",
          label: "Model Management",
          onClick: () => onNavigate("ai-gateway-model-management"),
          active: currentPage === "ai-gateway-model-management" || currentPage === "gateway-models" || currentPage === "ai-model-management",
        },
        {
          id: "playground",
          label: "Playground",
          onClick: () => onNavigate("playground"),
          active: currentPage === "playground",
        },
      ],
    },
    {
      id: "master-management",
      label: "Master Management",
      icon: Layers,
      subItems: [
        {
          id: "master-model-management",
          label: "Master Model Management",
          onClick: () => onNavigate("master-model-management"),
          active: currentPage === "master-model-management" || currentPage === "master-models" || currentPage === "model-management" || currentPage === "models",
        },
        {
          id: "guardrails",
          label: "Guardrails",
          onClick: () => onNavigate("guardrails"),
          active: currentPage === "guardrails" || currentPage === "guardrails-management",
        },
      ],
    },
    {
      id: "logs-menu",
      label: "Logs",
      icon: Clock,
      subItems: [
        {
          id: "request-log",
          label: "Request Log",
          onClick: () => onNavigate("request-log"),
          active: currentPage === "request-log" || currentPage === "request-logs" || currentPage === "logs",
        },
        {
          id: "audit-log",
          label: "Audit Log",
          onClick: () => onNavigate("audit-log"),
          active: currentPage === "audit-log" || currentPage === "audit-logs",
        },
      ],
    },
  ];
};