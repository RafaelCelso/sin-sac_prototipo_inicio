"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { ProtocolosPage } from "@/components/protocolos-page";

export default function Home() {
  const [activePage, setActivePage] = useState("Início");

  return (
    <div className="flex h-screen">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-hidden bg-[#0b1120]">
        {activePage === "Início" ? (
          <ProtocolosPage />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-gray-400">{activePage}</p>
          </div>
        )}
      </main>
    </div>
  );
}
