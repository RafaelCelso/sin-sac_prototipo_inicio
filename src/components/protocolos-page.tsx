"use client";

import { useState } from "react";
import { Search, Eye, MapPin, AlertCircle, ClipboardList, ClipboardPlus, Clipboard, Sun, Moon } from "lucide-react";
import { SlidePanel } from "@/components/slide-panel";
import { ProtocoloDetail } from "@/components/protocolo-detail";
import { ProtocoloDetailQT } from "@/components/protocolo-detail-qt";
import { ProtocoloDetailEA } from "@/components/protocolo-detail-ea";
import { ProtocoloDetailNS } from "@/components/protocolo-detail-ns";
import { useTheme } from "@/lib/theme-context";

interface Protocolo {
  id: string;
  cliente: string;
  data: string;
  status: string;
  territorio: string;
  criadoPor: string;
  justificativa?: { categoria: string; detalhe: string };
}

const protocolos: Protocolo[] = [
  { id: "260429048", cliente: "Taiany", data: "29/04/2026", status: "Aberto", territorio: "São Paulo", criadoPor: "Taiany" },
  { id: "260429049", cliente: "Taiany", data: "29/04/2026", status: "Em andamento", territorio: "São Paulo", criadoPor: "Taiany", justificativa: { categoria: "Cliente", detalhe: "Informações incompletas" } },
  { id: "260428048", cliente: "Taiany", data: "29/04/2026", status: "Aberto", territorio: "São Paulo", criadoPor: "Taiany" },
  { id: "260428048", cliente: "Taiany", data: "29/04/2026", status: "Em andamento", territorio: "São Paulo", criadoPor: "Taiany", justificativa: { categoria: "Cliente", detalhe: "Informações incompletas" } },
  { id: "260428047", cliente: "Taiany", data: "29/04/2026", status: "Aberto", territorio: "São Paulo", criadoPor: "Taiany" },
  { id: "260428077", cliente: "Taiany", data: "29/04/2026", status: "Aberto", territorio: "São Paulo", criadoPor: "Taiany" },
  { id: "260424045", cliente: "Taiany", data: "29/04/2026", status: "Em andamento", territorio: "São Paulo", criadoPor: "Taiany" },
  { id: "260429010", cliente: "Taiany", data: "29/04/2026", status: "Aberto", territorio: "São Paulo", criadoPor: "Taiany" },
];

const tabs = ["Protocolos", "Queixa Técnica", "Evento Adverso", "Notificação de Seguimento"];

const tabIcons: Record<string, React.ReactNode> = {
  "Protocolos": <Clipboard size={14} />,
  "Queixa Técnica": <ClipboardList size={14} />,
  "Evento Adverso": <ClipboardPlus size={14} />,
  "Notificação de Seguimento": <ClipboardPlus size={14} />,
};

const tabCounts: Record<string, number> = {
  "Protocolos": protocolos.length,
  "Queixa Técnica": protocolos.length,
  "Evento Adverso": protocolos.length,
  "Notificação de Seguimento": protocolos.length,
};

export function ProtocolosPage() {
  const [activeTab, setActiveTab] = useState("Protocolos");
  const [selectedProtocolo, setSelectedProtocolo] = useState<Protocolo | null>(null);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👋</span>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
                Bem-vindo(a), Administrador!
              </h1>
              <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-1.5 text-sm font-medium text-white hover:from-indigo-600 hover:to-purple-700 transition-colors">
                <span className="text-xs">✦</span> Perguntar à IA
              </button>
            </div>
            <p className={`mt-0.5 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Acompanhe os casos que possuem pendência e precisam de atenção
            </p>
          </div>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`rounded-lg p-2 transition-colors ${isDark ? "text-gray-400 hover:bg-white/10 hover:text-gray-200" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
            aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Tabs */}
        <nav className={`mt-4 flex gap-6 border-b ${isDark ? "border-white/10" : "border-gray-200"}`}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 pb-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-[#26B99D] text-[#26B99D]"
                  : isDark ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tabIcons[tab]}
              {tab}
              <span className={`ml-1 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-medium min-w-[20px] ${isDark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-600"}`}>
                {tabCounts[tab]}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className={`rounded-xl border ${isDark ? "border-white/10 bg-transparent" : "border-gray-200 bg-white"}`}>
          {/* Toolbar */}
          <div className={`flex items-center justify-between gap-4 border-b px-4 py-3 ${isDark ? "border-white/10" : "border-gray-100"}`}>
            <h2 className={`text-base font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>{activeTab}</h2>
          </div>
          <div className={`flex items-center gap-3 border-b px-4 py-3 ${isDark ? "border-white/10" : "border-gray-100"}`}>
            <div className="relative flex-1">
              <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? "text-gray-500" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Buscar por ID, cliente..."
                className={`w-full rounded-lg border py-2 pl-9 pr-4 text-sm focus:border-[#26B99D] focus:outline-none focus:ring-1 focus:ring-[#26B99D] ${isDark ? "border-white/10 bg-[#0b1120] text-gray-200 placeholder:text-gray-500" : "border-gray-200 bg-white text-gray-600 placeholder:text-gray-400"}`}
              />
            </div>
            <FilterButton label="Data" options={["Hoje", "Últimos 7 dias", "Últimos 30 dias", "Este mês", "Mês passado", "Personalizado"]} />
            {activeTab === "Protocolos" && (
              <FilterButton label="Status" options={["Aberto", "Em andamento"]} />
            )}
            {activeTab === "Queixa Técnica" && (
              <FilterButton label="Status" options={["Revisão", "Retornado"]} />
            )}
            {activeTab === "Evento Adverso" && (
              <FilterButton label="Status" options={["Revisão", "Retornado"]} />
            )}
            {activeTab === "Notificação de Seguimento" && (
              <FilterButton label="Status" options={["Aguardando Aprovação"]} />
            )}
            <FilterButton label="Território" options={["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná"]} multiSelect />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b text-left ${isDark ? "border-white/10 text-gray-400" : "border-gray-100 text-gray-500"}`}>
                  <th className="px-4 py-3 font-medium">Protocolo ↓</th>
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Território</th>
                  <th className="px-4 py-3 font-medium">Criado em ↕</th>
                  <th className="px-4 py-3 font-medium">Criado por</th>
                  <th className="px-4 py-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {protocolos.map((p, i) => {
                  return (
                    <tr
                      key={`${p.id}-${i}`}
                      onClick={() => setSelectedProtocolo(p)}
                      className={`border-b transition-colors cursor-pointer ${isDark ? "border-white/5 hover:bg-white/5" : "border-gray-50 hover:bg-gray-100"}`}
                    >
                      <td className={`px-4 py-3 font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>
                        {activeTab === "Queixa Técnica"
                          ? `${p.id}-QT${String(i + 1).padStart(3, "0")}`
                          : activeTab === "Evento Adverso"
                          ? `${p.id}-EA${String(i + 1).padStart(3, "0")}`
                          : activeTab === "Notificação de Seguimento"
                          ? `${p.id}-NS${String(i + 1).padStart(4, "0")}`
                          : p.id}
                      </td>
                      <td className={`px-4 py-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{p.cliente}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {(() => {
                            const displayStatus = activeTab === "Queixa Técnica"
                              ? (i % 2 === 0 ? "Revisão" : "Retornado")
                              : activeTab === "Evento Adverso"
                              ? (i % 2 === 0 ? "Revisão" : "Retornado")
                              : activeTab === "Notificação de Seguimento"
                              ? "Aguardando Aprovação"
                              : p.status;
                            const statusColor = isDark
                              ? (displayStatus === "Aberto"
                                ? "bg-[#F0FDF4]/10 border border-[#4CDE81]/50 text-[#4CDE81]"
                                : displayStatus === "Em andamento"
                                ? "bg-[#FFFBEB]/10 border border-[#F59E0B]/50 text-[#F59E0B]"
                                : displayStatus === "Revisão"
                                ? "bg-[#FAF5FF]/10 border border-[#C185FC]/50 text-[#C185FC]"
                                : displayStatus === "Retornado"
                                ? "bg-[#FEFCE8]/10 border border-[#FACC2C]/50 text-[#FACC2C]"
                                : displayStatus === "Aguardando Aprovação"
                                ? "bg-[#FEFCE8]/10 border border-[#FACC2C]/50 text-[#FACC2C]"
                                : "bg-white/5 border border-gray-500 text-gray-400")
                              : (displayStatus === "Aberto"
                                ? "bg-[#F0FDF4] border border-[#4CDE81] text-[#166534]"
                                : displayStatus === "Em andamento"
                                ? "bg-[#FFFBEB] border border-[#F59E0B] text-[#92400E]"
                                : displayStatus === "Revisão"
                                ? "bg-[#FAF5FF] border border-[#C185FC] text-[#6B21A8]"
                                : displayStatus === "Retornado"
                                ? "bg-[#FEFCE8] border border-[#FACC2C] text-[#854D0E]"
                                : displayStatus === "Aguardando Aprovação"
                                ? "bg-[#FEFCE8] border border-[#FACC2C] text-[#854D0E]"
                                : "bg-gray-100 border border-gray-400 text-gray-700");
                            return (
                              <span className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${statusColor}`}>
                                {displayStatus}
                              </span>
                            );
                          })()}
                          {p.justificativa && activeTab === "Protocolos" && (
                            <span title="Justificativa aplicada">
                              <AlertCircle size={14} className="text-amber-500" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${isDark ? "bg-white/5 border border-white/10 text-gray-300" : "bg-[#F1F5F9] border border-[#91A2BA] text-gray-700"}`}>
                          <MapPin size={12} />
                          {p.territorio}
                        </span>
                      </td>
                      <td className={`px-4 py-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{p.data}</td>
                      <td className={`px-4 py-3 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{p.criadoPor}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end">
                          <button className={`rounded-md p-1.5 transition-colors ${isDark ? "text-gray-500 hover:bg-white/10 hover:text-gray-300" : "text-gray-400 hover:bg-gray-200 hover:text-gray-600"}`}>
                            <Eye size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <SlidePanel
        open={!!selectedProtocolo}
        onClose={() => setSelectedProtocolo(null)}
        title={activeTab === "Queixa Técnica" ? "Detalhes da Queixa Técnica" : activeTab === "Evento Adverso" ? "Detalhes do Evento Adverso" : activeTab === "Notificação de Seguimento" ? "Detalhes da Notificação de Seguimento" : "Detalhes do Protocolo"}
      >
        {selectedProtocolo && activeTab === "Queixa Técnica" ? (
          <ProtocoloDetailQT
            id={`${selectedProtocolo.id}-QT${String(protocolos.indexOf(selectedProtocolo) + 1).padStart(3, "0")}`}
            cliente={selectedProtocolo.cliente}
            criadoPor={selectedProtocolo.criadoPor}
            status={protocolos.indexOf(selectedProtocolo) % 2 === 0 ? "Revisão" : "Retornado"}
            territorio={selectedProtocolo.territorio}
            dataCriacao={selectedProtocolo.data}
            justificativa={selectedProtocolo.justificativa}
          />
        ) : selectedProtocolo && activeTab === "Evento Adverso" ? (
          <ProtocoloDetailEA
            id={`${selectedProtocolo.id}-EA${String(protocolos.indexOf(selectedProtocolo) + 1).padStart(3, "0")}`}
            cliente={selectedProtocolo.cliente}
            criadoPor={selectedProtocolo.criadoPor}
            status={protocolos.indexOf(selectedProtocolo) % 2 === 0 ? "Revisão" : "Retornado"}
            territorio={selectedProtocolo.territorio}
            dataCriacao={selectedProtocolo.data}
            justificativa={selectedProtocolo.justificativa}
          />
        ) : selectedProtocolo && activeTab === "Notificação de Seguimento" ? (
          <ProtocoloDetailNS
            id={`${selectedProtocolo.id}-NS${String(protocolos.indexOf(selectedProtocolo) + 1).padStart(4, "0")}`}
            cliente={selectedProtocolo.cliente}
            criadoPor={selectedProtocolo.criadoPor}
            status="Aguardando Aprovação"
            territorio={selectedProtocolo.territorio}
            dataCriacao={selectedProtocolo.data}
            justificativa={selectedProtocolo.justificativa}
          />
        ) : selectedProtocolo ? (
          <ProtocoloDetail
            id={selectedProtocolo.id}
            cliente={selectedProtocolo.cliente}
            criadoPor={selectedProtocolo.criadoPor}
            status={selectedProtocolo.status}
            territorio={selectedProtocolo.territorio}
            dataCriacao={selectedProtocolo.data}
            justificativa={selectedProtocolo.justificativa}
          />
        ) : null}
      </SlidePanel>
    </div>
  );
}

function FilterButton({ label, options, multiSelect }: { label: string; options?: string[]; multiSelect?: boolean }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { isDark } = useTheme();

  const handleSelect = (opt: string) => {
    if (multiSelect) {
      setSelected((prev) =>
        prev.includes(opt) ? prev.filter((s) => s !== opt) : [...prev, opt]
      );
    } else {
      setOpen(false);
    }
  };

  const displayLabel = multiSelect && selected.length > 0
    ? `${label} (${selected.length})`
    : label;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-sm transition-colors ${isDark ? "border-white/10 text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
      >
        <span>{displayLabel}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={isDark ? "text-gray-500" : "text-gray-400"}>
          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && options && (
        <div className={`absolute right-0 top-full z-20 mt-1 min-w-[160px] rounded-lg border py-1 shadow-lg ${isDark ? "border-white/10 bg-[#0b1120]" : "border-gray-200 bg-white"}`}>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm ${isDark ? "text-gray-300 hover:bg-white/5" : "text-gray-600 hover:bg-gray-50"}`}
            >
              {multiSelect && (
                <span className={`flex h-4 w-4 items-center justify-center rounded border ${
                  selected.includes(opt) ? "border-[#26B99D] bg-[#26B99D] text-white" : isDark ? "border-gray-600" : "border-gray-300"
                }`}>
                  {selected.includes(opt) && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              )}
              {opt}
            </button>
          ))}
          {multiSelect && (
            <div className={`border-t mt-1 pt-1 px-4 py-2 ${isDark ? "border-white/10" : "border-gray-100"}`}>
              <button
                onClick={() => setOpen(false)}
                className="w-full rounded-md bg-[#26B99D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#219b84] transition-colors"
              >
                Aplicar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
