"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-context";

interface SlidePanelProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

export function SlidePanel({
  open,
  onClose,
  title,
  children,
  width = "w-[480px]",
}: SlidePanelProps) {
  const { isDark } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300",
          isDark ? "bg-black/50" : "bg-black/20",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full shadow-2xl border-l transition-transform duration-300 ease-in-out",
          isDark ? "bg-[#0b1120] border-white/10" : "bg-white border-gray-200",
          width,
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className={cn("flex items-center justify-between border-b px-6 py-4", isDark ? "border-white/10" : "border-gray-200")}>
          {title && (
            <h2 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-gray-800")}>{title}</h2>
          )}
          <button
            onClick={onClose}
            className={cn("ml-auto rounded-lg p-1.5 transition-colors", isDark ? "text-gray-400 hover:bg-white/10 hover:text-gray-200" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600")}
            aria-label="Fechar painel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-65px)] overflow-y-auto px-6 py-4">
          {children}
        </div>
      </div>
    </>
  );
}
