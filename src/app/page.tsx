"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { ProtocolosPage } from "@/components/protocolos-page";
import { ImportacoesPage } from "@/components/importacoes-page";
import { ParametrizacaoPage } from "@/components/parametrizacao-page";
import { ProdutosPage } from "@/components/produtos-page";
import { ThemeProvider, useTheme } from "@/lib/theme-context";

function AppContent() {
  const [activePage, setActivePage] = useState("Início");
  const { isDark } = useTheme();

  return (
    <div className="flex h-screen">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className={`flex-1 overflow-hidden ${isDark ? "bg-[#0b1120]" : "bg-gray-50"}`}>
        {activePage === "Início" ? (
          <ProtocolosPage />
        ) : activePage === "Importações" ? (
          <ImportacoesPage />
        ) : activePage === "Parametrização" ? (
          <ParametrizacaoPage />
        ) : activePage === "Produto" ? (
          <ProdutosPage />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-500"}`}>{activePage}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
