"use client";

import { useState } from "react";
import { Search, Eye, MapPin, AlertCircle, ClipboardList, ClipboardPlus, Clipboard, Calendar, User, Hash } from "lucide-react";
import { SlidePanel } from "@/components/slide-panel";
import { ProtocoloDetail } from "@/components/protocolo-detail";
import { ProtocoloDetailQT } from "@/components/protocolo-detail-qt";
import { ProtocoloDetailEA } from "@/components/protocolo-detail-ea";
import { ProtocoloDetailNS } from "@/components/protocolo-detail-ns";

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

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👋</span>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white">
                Bem-vindo(a), Administrador!
              </h1>
              <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-1.5 text-sm font-medium text-white hover:from-indigo-600 hover:to-purple-700 transition-colors">
                <span className="text-xs">✦</span> Perguntar à IA
              </button>
            </div>
            <p className="mt-0.5 text-sm text-gray-400">
              Acompanhe os casos que possuem pendência e precisam de atenção
            </p>
          </div>
        </div>

        {/* Tabs */}
        <nav className="mt-4 flex gap-6 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 pb-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-[#26B99D] text-[#26B99D]"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tabIcons[tab]}
              {tab}
              <span className="ml-1 inline-flex items-center justify-center rounded-full bg-white/10 px-1.5 py-0.5 text-xs font-medium text-gray-300 min-w-[20px]">
                {tabCounts[tab]}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="rounded-xl border border-white/10 bg-transparent">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3">
            <h2 className="text-base font-semibold text-white">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por ID, cliente..."
                className="w-full rounded-lg border border-white/10 bg-[#0b1120] py-2 pl-9 pr-4 text-sm text-gray-200 placeholder:text-gray-500 focus:border-[#26B99D] focus:outline-none focus:ring-1 focus:ring-[#26B99D]"
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
            <table className="w-full text-sm border-separate border-spacing-0">
              <thead>
                <tr className="text-left">
                  <th className="sticky top-0 z-10 bg-[#0b1120]/95 backdrop-blur-sm px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <Hash size={12} />
                      Protocolo
                    </div>
                  </th>
                  <th className="sticky top-0 z-10 bg-[#0b1120]/95 backdrop-blur-sm px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <User size={12} />
                      Cliente
                    </div>
                  </th>
                  <th className="sticky top-0 z-10 bg-[#0b1120]/95 backdrop-blur-sm px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-white/10">Status</th>
                  <th className="sticky top-0 z-10 bg-[#0b1120]/95 backdrop-blur-sm px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} />
                      Território
                    </div>
                  </th>
                  <th className="sticky top-0 z-10 bg-[#0b1120]/95 backdrop-blur-sm px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      Criado em
                    </div>
                  </th>
                  <th className="sticky top-0 z-10 bg-[#0b1120]/95 backdrop-blur-sm px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-white/10">Criado por</th>
                  <th className="sticky top-0 z-10 bg-[#0b1120]/95 backdrop-blur-sm px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-white/10 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {protocolos.map((p, i) => {
                  const displayId = activeTab === "Queixa Técnica"
                    ? `${p.id}-QT${String(i + 1).padStart(3, "0")}`
                    : activeTab === "Evento Adverso"
                    ? `${p.id}-EA${String(i + 1).padStart(3, "0")}`
                    : activeTab === "Notificação de Seguimento"
                    ? `${p.id}-NS${String(i + 1).padStart(4, "0")}`
                    : p.id;

                  const displayStatus = activeTab === "Queixa Técnica"
                    ? (i % 2 === 0 ? "Revisão" : "Retornado")
                    : activeTab === "Evento Adverso"
                    ? (i % 2 === 0 ? "Revisão" : "Retornado")
                    : activeTab === "Notificação de Seguimento"
                    ? "Aguardando Aprovação"
                    : p.status;

                  const statusStyles: Record<string, { dot: string; badge: string }> = {
                    "Aberto": { dot: "bg-emerald-400", badge: "bg-emerald-400/10 text-emerald-400 ring-1 ring-inset ring-emerald-400/20" },
                    "Em andamento": { dot: "bg-amber-400", badge: "bg-amber-400/10 text-amber-400 ring-1 ring-inset ring-amber-400/20" },
                    "Revisão": { dot: "bg-purple-400", badge: "bg-purple-400/10 text-purple-400 ring-1 ring-inset ring-purple-400/20" },
                    "Retornado": { dot: "bg-yellow-400", badge: "bg-yellow-400/10 text-yellow-400 ring-1 ring-inset ring-yellow-400/20" },
                    "Aguardando Aprovação": { dot: "bg-orange-400", badge: "bg-orange-400/10 text-orange-400 ring-1 ring-inset ring-orange-400/20" },
                  };

                  const style = statusStyles[displayStatus] || { dot: "bg-gray-400", badge: "bg-white/5 text-gray-400 ring-1 ring-inset ring-gray-500/20" };

                  return (
                    <tr
                      key={`${p.id}-${i}`}
                      onClick={() => setSelectedProtocolo(p)}
                      className="group cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-white/[0.03] hover:to-transparent"
                    >
                      <td className="px-5 py-4">
                        <span className="font-mono text-sm font-semibold text-white group-hover:text-[#26B99D] transition-colors">
                          {displayId}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-300">{p.cliente}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${style.badge}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                            {displayStatus}
                          </span>
                          {p.justificativa && activeTab === "Protocolos" && (
                            <span title="Justificativa aplicada" className="flex items-center">
                              <AlertCircle size={14} className="text-amber-500 animate-pulse" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-white/10">
                          <MapPin size={11} className="text-gray-500" />
                          {p.territorio}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm tabular-nums text-gray-400">{p.data}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-400">{p.criadoPor}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end">
                          <button className="rounded-lg p-2 text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-[#26B99D]/10 hover:text-[#26B99D] transition-all duration-200">
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

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
            <span className="text-xs text-gray-500">
              Exibindo {protocolos.length} de {protocolos.length} registros
            </span>
            <div className="flex items-center gap-1">
              <button className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-colors">
                Anterior
              </button>
              <button className="rounded-md bg-[#26B99D]/10 px-3 py-1.5 text-xs font-medium text-[#26B99D] ring-1 ring-inset ring-[#26B99D]/20">
                1
              </button>
              <button className="rounded-md px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-white/5 hover:text-gray-300 transition-colors">
                Próximo
              </button>
            </div>
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
        className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 transition-colors"
      >
        <span>{displayLabel}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gray-500">
          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && options && (
        <div className="absolute right-0 top-full z-20 mt-1 min-w-[160px] rounded-lg border border-white/10 bg-[#0b1120] py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5"
            >
              {multiSelect && (
                <span className={`flex h-4 w-4 items-center justify-center rounded border ${
                  selected.includes(opt) ? "border-[#26B99D] bg-[#26B99D] text-white" : "border-gray-600"
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
            <div className="border-t border-white/10 mt-1 pt-1 px-4 py-2">
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
