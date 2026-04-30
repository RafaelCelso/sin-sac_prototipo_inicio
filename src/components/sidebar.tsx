"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
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
  Phone,
} from "lucide-react";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  hasSubmenu?: boolean;
}

const menuItems: MenuItem[] = [
  { label: "Início", icon: <Home size={20} /> },
  { label: "Dashboard", icon: <LayoutGrid size={20} /> },
  { label: "Clientes", icon: <Users size={20} />, hasSubmenu: true },
  { label: "Atendimentos", icon: <Headset size={20} />, hasSubmenu: true },
  { label: "Agenda", icon: <CalendarDays size={20} /> },
  { label: "FAQ", icon: <BookOpen size={20} /> },
  { label: "Relatórios", icon: <BarChart3 size={20} /> },
  { label: "Preferências", icon: <Settings size={20} />, hasSubmenu: true },
  { label: "Segurança", icon: <ShieldCheck size={20} />, hasSubmenu: true },
];

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col bg-[#0b1120] border-r border-white/10 transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[280px]"
      )}
    >
      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0b1120] shadow-sm hover:bg-[rgba(18,30,50,0.6)] transition-colors"
        aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
      >
        <ChevronLeft
          size={14}
          className={cn(
            "text-gray-400 transition-transform duration-300",
            collapsed && "rotate-180"
          )}
        />
      </button>

      {/* Logo */}
      <div className="flex items-center justify-center py-6">
        <div className="flex items-center gap-2">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="shrink-0">
            <circle cx="18" cy="18" r="16" fill="#26B99D" opacity="0.15" />
            <path
              d="M18 6C14.5 6 11.5 7.5 9.5 10C7.5 12.5 7 15.5 8 18.5C9 21.5 11.5 23.5 14.5 24.5C17.5 25.5 20.5 25 23 23C25.5 21 27 18 27 14.5C27 9.8 23 6 18 6Z"
              fill="#26B99D"
              opacity="0.6"
            />
            <path
              d="M18 10C15.8 10 14 11 12.8 12.8C11.6 14.6 11.3 16.6 12 18.5C12.7 20.4 14.2 21.7 16.2 22.2C18.2 22.7 20 22.2 21.5 21C23 19.8 24 17.8 24 15.5C24 12.5 21.3 10 18 10Z"
              fill="#26B99D"
            />
          </svg>
          {!collapsed && (
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-wider text-white">
                SIN
              </span>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase">
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
            return (
              <li key={item.label}>
                <button
                  onClick={() => onNavigate(item.label)}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                    collapsed && "justify-center px-0",
                    isActive
                      ? "bg-[#26B99D] text-white shadow-md"
                      : "text-gray-400 hover:bg-[rgba(18,30,50,0.6)] hover:text-gray-200"
                  )}
                >
                  <span className={cn("shrink-0", isActive ? "text-white" : "text-gray-500")}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.hasSubmenu && (
                        <ChevronRight
                          size={16}
                          className={isActive ? "text-white" : "text-gray-500"}
                        />
                      )}
                    </>
                  )}
                </button>
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
