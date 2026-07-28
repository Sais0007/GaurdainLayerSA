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
      id: "site-map",
      label: "Site Map",
      icon: Map,
      onClick: () => onNavigate("site-map"),
      active: currentPage === "site-map",
    },
    {
      id: "hb-templates",
      label: "HB Templates",
      icon: Building2,
      subItems: [
        {
          id: "ui-kit",
          label: "UI Kit",
          onClick: () => onNavigate("ui-kit"),
          active: currentPage === "ui-kit",
        },
        {
          id: "sample-design",
          label: "Sample Page",
          onClick: () => onNavigate("sample-design"),
          active: currentPage === "sample-design",
        },
      ],
    },
  ];
};