"use client";

import { Users, Monitor, MapPin, Send, Calendar, ChevronRight, Package, Tag, Barcode, Hash, FlaskConical, AlertTriangle } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

interface TimelineEvent { text: string; time: string; active?: boolean; }
interface Comentario { autor: string; texto: string; data: string; }

interface ProtocoloDetailNSProps {
  id: string; cliente: string; criadoPor: string; status: string; territorio: string; dataCriacao: string;
  justificativa?: { categoria: string; detalhe: string };
}

export function ProtocoloDetailNS({ id, cliente, criadoPor, status, territorio, dataCriacao, justificativa }: ProtocoloDetailNSProps) {
  const { isDark } = useTheme();

  const timeline: TimelineEvent[] = [
    { text: `Notificação de Seguimento ${id} registrada por ${criadoPor}`, time: "08:15", active: true },
    { text: `Seguimento enviado à Farmacovigilância`, time: "09:00" },
    { text: `Acompanhamento atualizado`, time: "11:30" },
  ];

  const comentarios: Comentario[] = [
    { autor: "Taiany", texto: "Paciente apresentou melhora após suspensão do medicamento. Sem novos sintomas.", data: "29/04/2026 - 08:15" },
    { autor: "Farmacovigilância", texto: "Seguimento registrado. Caso permanece em acompanhamento.", data: "29/04/2026 - 10:00" },
  ];

  const statusColor = isDark
    ? (status === "Revisão" ? "bg-[#FAF5FF]/10 border border-[#C185FC]/50 text-[#C185FC]" : "bg-[#FEFCE8]/10 border border-[#FACC2C]/50 text-[#FACC2C]")
    : (status === "Revisão" ? "bg-[#FAF5FF] border border-[#C185FC] text-[#6B21A8]" : "bg-[#FEFCE8] border border-[#FACC2C] text-[#854D0E]");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className={`text-lg font-bold cursor-pointer hover:underline transition-all ${isDark ? "text-white" : "text-gray-800"}`}>{id}</h3>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium whitespace-nowrap ${statusColor}`}>{status}</span>
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium whitespace-nowrap ${isDark ? "bg-white/5 border border-white/10 text-gray-300" : "bg-[#F1F5F9] border border-[#91A2BA] text-gray-700"}`}><MapPin size={12} />{territorio}</span>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-4">
          <div><p className="text-xs text-gray-500">Criado por</p><div className={`mt-0.5 flex items-center gap-1.5 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}><Monitor size={14} className="text-gray-500" />{criadoPor}</div></div>
          <div><p className="text-xs text-gray-500">Criado em</p><div className={`mt-0.5 flex items-center gap-1.5 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}><Calendar size={14} className="text-gray-500" />{dataCriacao}</div></div>
        </div>

        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1.5">Motivo</p>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${isDark ? "bg-white/10 text-gray-200" : "bg-[#EBEBEB] text-gray-800"}`}><AlertTriangle size={10} />Evento Adverso</span>
            <ChevronRight size={14} className="text-gray-500" />
            <span className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${isDark ? "bg-white/10 text-gray-300" : "bg-[#EBEBEB] text-gray-700"}`}>Reação alérgica</span>
            <ChevronRight size={14} className="text-gray-500" />
            <span className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${isDark ? "bg-white/10 text-gray-300" : "bg-[#EBEBEB] text-gray-700"}`}>Urticária</span>
          </div>
        </div>

        <div className={`mt-4 rounded-lg border p-3 ${isDark ? "border-white/10 bg-[rgba(18,30,50,0.6)]" : "border-gray-200"}`}>
          <div className="flex items-center gap-1.5 mb-2"><AlertTriangle size={14} className={isDark ? "text-gray-400" : "text-gray-500"} /><p className={`text-xs font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>Evento Adverso Relatado</p></div>
          <div className="flex flex-wrap gap-2"><span className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${isDark ? "bg-white/10 text-gray-300" : "bg-[#EBEBEB] text-gray-700"}`}>Náusea</span></div>
        </div>

        <div className={`mt-4 rounded-lg border p-3 ${isDark ? "border-white/10 bg-[rgba(18,30,50,0.6)]" : "border-gray-200"}`}>
          <div className="flex items-center gap-1.5 mb-2"><Package size={14} className={isDark ? "text-gray-400" : "text-gray-500"} /><p className={`text-xs font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>Produto</p></div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-1.5"><Tag size={12} className="text-gray-500 mt-0.5 shrink-0" /><div><p className="text-gray-500">Marca</p><p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>PharmaCorp</p></div></div>
            <div className="flex items-start gap-1.5"><Package size={12} className="text-gray-500 mt-0.5 shrink-0" /><div><p className="text-gray-500">Apresentação</p><p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>Comprimido 500mg cx 30</p></div></div>
            <div className="flex items-start gap-1.5"><Barcode size={12} className="text-gray-500 mt-0.5 shrink-0" /><div><p className="text-gray-500">EAN</p><p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>7891234567890</p></div></div>
            <div className="flex items-start gap-1.5"><Hash size={12} className="text-gray-500 mt-0.5 shrink-0" /><div><p className="text-gray-500">SKU</p><p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>SKU-00451</p></div></div>
            <div className="flex items-start gap-1.5"><FlaskConical size={12} className="text-gray-500 mt-0.5 shrink-0" /><div><p className="text-gray-500">Lote</p><p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>LT2026-0412</p></div></div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <div className={`rounded-lg border p-3 cursor-pointer hover:border-[#26B99D] hover:shadow-sm transition-all ${isDark ? "border-white/10" : "border-gray-200"}`}>
            <p className="text-xs text-gray-500">Cliente / Paciente</p>
            <div className={`mt-1 flex items-center gap-1.5 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}><Users size={14} className="text-gray-500" />{cliente}</div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-500">
              <div><p className="text-gray-500">CPF</p><p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>123.456.789-00</p></div>
              <div><p className="text-gray-500">Telefone</p><p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>(11) 99999-0000</p></div>
              <div><p className="text-gray-500">E-mail</p><p className={`font-medium truncate ${isDark ? "text-gray-300" : "text-gray-600"}`}>taiany@email.com</p></div>
            </div>
          </div>
        </div>
      </div>

      <hr className={isDark ? "border-white/10" : "border-gray-200"} />

      <div>
        <h4 className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>Comentários</h4>
        <div className="mt-3 flex flex-col gap-3">
          {comentarios.map((c, i) => (
            <div key={i} className={`rounded-lg border p-3 ${isDark ? "border-white/10 bg-[rgba(18,30,50,0.6)]" : "border-gray-100 bg-gray-50"}`}>
              <div className="flex items-center justify-between"><span className={`text-xs font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{c.autor}</span><span className="text-xs text-gray-500">{c.data}</span></div>
              <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{c.texto}</p>
            </div>
          ))}
        </div>
        <textarea placeholder="Adicionar um comentário..." className={`mt-3 w-full resize-y rounded-lg border px-3 py-2 text-sm focus:border-[#26B99D] focus:outline-none focus:ring-1 focus:ring-[#26B99D] ${isDark ? "border-white/10 bg-[#0b1120] text-gray-200 placeholder:text-gray-500" : "border-gray-200 text-gray-600 placeholder:text-gray-400"}`} rows={3} />
        <button className="mt-2 ml-auto flex items-center gap-2 rounded-lg bg-[#26B99D] px-4 py-2 text-sm font-medium text-white hover:bg-[#219b84] transition-colors"><Send size={14} />Salvar</button>
      </div>

      <hr className={isDark ? "border-white/10" : "border-gray-200"} />

      <div>
        <h4 className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>Linha do Tempo</h4>
        <div className="mt-3 flex flex-col">
          {timeline.map((event, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`mt-1 h-3 w-3 rounded-full ${event.active ? (isDark ? "bg-[#26B99D]" : "bg-gray-800") : (isDark ? "bg-gray-600" : "bg-gray-300")}`} />
                {i < timeline.length - 1 && <div className={`w-0.5 flex-1 my-1 ${isDark ? "bg-white/10" : "bg-gray-200"}`} />}
              </div>
              <div className="pb-4"><p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{event.text} - <span className="text-gray-500">{event.time}</span></p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
