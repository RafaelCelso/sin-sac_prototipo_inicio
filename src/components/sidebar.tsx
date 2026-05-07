"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";
import {
  Home,
  LayoutGrid,
  Users,
  Headset,
  CalendarDays,
  BookOpen,
  BarChart3,
  Settings,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Phone,
  Upload,
  SlidersHorizontal,
} from "lucide-react";

interface SubMenuItem {
  label: string;
  icon: React.ReactNode;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  hasSubmenu?: boolean;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  { label: "Início", icon: <Home size={20} /> },
  { label: "Dashboard", icon: <LayoutGrid size={20} /> },
  { label: "Clientes", icon: <Users size={20} />, hasSubmenu: true },
  { label: "Atendimentos", icon: <Headset size={20} />, hasSubmenu: true },
  { label: "Agenda", icon: <CalendarDays size={20} /> },
  { label: "FAQ", icon: <BookOpen size={20} /> },
  { label: "Relatórios", icon: <BarChart3 size={20} /> },
  {
    label: "Preferências",
    icon: <Settings size={20} />,
    hasSubmenu: true,
    subItems: [
      { label: "Importações", icon: <Upload size={16} /> },
      { label: "Parametrização", icon: <SlidersHorizontal size={16} /> },
    ],
  },
  { label: "Segurança", icon: <ShieldCheck size={20} />, hasSubmenu: true },
];

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const { isDark } = useTheme();

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col transition-all duration-300",
        isDark ? "bg-[#0b1120] border-r border-white/10" : "bg-white border-r border-gray-200",
        collapsed ? "w-[72px]" : "w-[280px]"
      )}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "absolute -right-3 top-8 z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-sm transition-colors",
          isDark ? "border border-white/10 bg-[#0b1120] hover:bg-[rgba(18,30,50,0.6)]" : "border border-gray-200 bg-white hover:bg-gray-50"
        )}
        aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
      >
        <ChevronLeft
          size={14}
          className={cn(
            "transition-transform duration-300",
            isDark ? "text-gray-400" : "text-gray-500",
            collapsed && "rotate-180"
          )}
        />
      </button>

      {/* Logo */}
      <div className="flex items-center justify-center py-6">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="SIN Logo" width={36} height={36} className="shrink-0" />
          {!collapsed && (
            <div className="flex flex-col leading-none">
              <span className={cn("text-lg font-bold tracking-wider", isDark ? "text-white" : "text-gray-800")}>
                SIN
              </span>
              <span className={cn("text-[10px] font-semibold tracking-[0.2em] uppercase", isDark ? "text-gray-400" : "text-gray-500")}>
                Solution
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = activePage === item.label;
            const isExpanded = expandedMenus.includes(item.label);
            const hasSubItems = item.subItems && item.subItems.length > 0;
            return (
              <li key={item.label}>
                <button
                  onClick={() => {
                    if (hasSubItems && !collapsed) {
                      toggleSubmenu(item.label);
                    } else {
                      onNavigate(item.label);
                    }
                  }}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "bg-[#26B99D] text-white shadow-md"
                      : isDark
                      ? "text-gray-400 hover:bg-[rgba(18,30,50,0.6)] hover:text-gray-200"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <span className={cn("shrink-0", isActive ? "text-white" : isDark ? "text-gray-500" : "text-gray-500")}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {hasSubItems ? (
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform duration-200",
                            isActive ? "text-white" : isDark ? "text-gray-500" : "text-gray-400",
                            isExpanded && "rotate-180"
                          )}
                        />
                      ) : item.hasSubmenu ? (
                        <ChevronRight
                          size={16}
                          className={isActive ? "text-white" : isDark ? "text-gray-500" : "text-gray-400"}
                        />
                      ) : null}
                    </>
                  )}
                </button>
                {/* Submenu */}
                {hasSubItems && isExpanded && !collapsed && (
                  <ul className="ml-6 mt-1 flex flex-col gap-1">
                    {item.subItems!.map((sub) => {
                      const isSubActive = activePage === sub.label;
                      return (
                        <li key={sub.label}>
                          <button
                            onClick={() => onNavigate(sub.label)}
                            className={cn(
                              "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                              isSubActive
                                ? "bg-[#26B99D]/10 text-[#26B99D]"
                                : isDark
                                ? "text-gray-400 hover:bg-[rgba(18,30,50,0.6)] hover:text-gray-200"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            )}
                          >
                            <span className={cn("shrink-0", isSubActive ? "text-[#26B99D]" : isDark ? "text-gray-500" : "text-gray-400")}>
                              {sub.icon}
                            </span>
                            <span>{sub.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Novo Contato */}
      <div className="p-3">
        <button
          title={collapsed ? "Novo Contato" : undefined}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl bg-[#26B99D] py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#219b84]",
            collapsed && "px-0"
          )}
        >
          <Phone size={18} className="shrink-0" />
          {!collapsed && <span>Novo Contato</span>}
        </button>
      </div>
    </aside>
  );
}
