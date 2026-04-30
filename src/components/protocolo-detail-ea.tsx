"use client";

import { Users, Monitor, MapPin, Send, Calendar, ChevronRight, Package, Tag, Barcode, Hash, FlaskConical, AlertTriangle } from "lucide-react";

interface TimelineEvent {
  text: string;
  time: string;
  active?: boolean;
}

interface Comentario {
  autor: string;
  texto: string;
  data: string;
}

interface ProtocoloDetailEAProps {
  id: string;
  cliente: string;
  criadoPor: string;
  status: string;
  territorio: string;
  dataCriacao: string;
  justificativa?: { categoria: string; detalhe: string };
}

export function ProtocoloDetailEA({ id, cliente, criadoPor, status, territorio, dataCriacao, justificativa }: ProtocoloDetailEAProps) {
  const timeline: TimelineEvent[] = [
    { text: `Evento Adverso ${id} registrado por ${criadoPor}`, time: "08:15", active: true },
    { text: `Notificação enviada à Farmacovigilância`, time: "09:00" },
    { text: `Investigação em andamento`, time: "11:30" },
  ];

  const comentarios: Comentario[] = [
    { autor: "Taiany", texto: "Paciente relatou reação alérgica após uso do medicamento. Sintomas: urticária e edema leve.", data: "29/04/2026 - 08:15" },
    { autor: "Farmacovigilância", texto: "Caso classificado como evento adverso não grave. Acompanhamento iniciado.", data: "29/04/2026 - 10:00" },
  ];

  const statusColor = status === "Revisão" ? "bg-[#FAF5FF]/10 border border-[#C185FC]/50 text-[#C185FC]" : "bg-[#FEFCE8]/10 border border-[#FACC2C]/50 text-[#FACC2C]";

  return (
    <div className="flex flex-col gap-6">
      {/* Info header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white cursor-pointer hover:underline transition-all">
            {id}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${statusColor}`}>
              {status}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-3 py-0.5 text-xs font-medium text-gray-300">
              <MapPin size={12} />
              {territorio}
            </span>
          </div>
        </div>

        {/* Criado por / Criado em */}
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Criado por</p>
            <div className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-300">
              <Monitor size={14} className="text-gray-500" />
              {criadoPor}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Criado em</p>
            <div className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-300">
              <Calendar size={14} className="text-gray-500" />
              {dataCriacao}
            </div>
          </div>
        </div>

        {/* Motivos */}
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1.5">Motivo</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-gray-200">
              <AlertTriangle size={10} />
              Evento Adverso
            </span>
            <ChevronRight size={14} className="text-gray-500" />
            <span className="inline-flex rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-gray-300">
              Reação alérgica
            </span>
            <ChevronRight size={14} className="text-gray-500" />
            <span className="inline-flex rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-gray-300">
              Urticária
            </span>
          </div>
        </div>

        {/* Evento Adverso Relatado */}
        <div className="mt-4 rounded-lg border border-white/10 bg-[rgba(18,30,50,0.6)] p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle size={14} className="text-gray-400" />
            <p className="text-xs font-semibold text-gray-300">Evento Adverso Relatado</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-gray-300">Náusea</span>
          </div>
        </div>

        {/* Produto */}
        <div className="mt-4 rounded-lg border border-white/10 bg-[rgba(18,30,50,0.6)] p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Package size={14} className="text-gray-400" />
            <p className="text-xs font-semibold text-gray-300">Produto</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-1.5">
              <Tag size={12} className="text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-500">Marca</p>
                <p className="font-medium text-gray-300">PharmaCorp</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <Package size={12} className="text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-500">Apresentação</p>
                <p className="font-medium text-gray-300">Comprimido 500mg cx 30</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <Barcode size={12} className="text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-500">EAN</p>
                <p className="font-medium text-gray-300">7891234567890</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <Hash size={12} className="text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-500">SKU</p>
                <p className="font-medium text-gray-300">SKU-00451</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <FlaskConical size={12} className="text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-500">Lote</p>
                <p className="font-medium text-gray-300">LT2026-0412</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <div className="rounded-lg border border-white/10 p-3 cursor-pointer hover:border-[#26B99D] hover:shadow-sm transition-all">
            <p className="text-xs text-gray-500">Cliente / Paciente</p>
            <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-gray-300">
              <Users size={14} className="text-gray-500" />
              {cliente}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-500">
              <div>
                <p className="text-gray-500">CPF</p>
                <p className="font-medium text-gray-300">123.456.789-00</p>
              </div>
              <div>
                <p className="text-gray-500">Telefone</p>
                <p className="font-medium text-gray-300">(11) 99999-0000</p>
              </div>
              <div>
                <p className="text-gray-500">E-mail</p>
                <p className="font-medium text-gray-300 truncate">taiany@email.com</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Divider */}
      <hr className="border-white/10" />

      {/* Comentários */}
      <div>
        <h4 className="text-sm font-semibold text-white">Comentários</h4>

        {/* Existing comments */}
        <div className="mt-3 flex flex-col gap-3">
          {comentarios.map((c, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-[rgba(18,30,50,0.6)] p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-300">{c.autor}</span>
                <span className="text-xs text-gray-500">{c.data}</span>
              </div>
              <p className="mt-1 text-sm text-gray-400">{c.texto}</p>
            </div>
          ))}
        </div>

        {/* New comment input */}
        <textarea
          placeholder="Adicionar um comentário..."
          className="mt-3 w-full resize-y rounded-lg border border-white/10 bg-[#0b1120] px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:border-[#26B99D] focus:outline-none focus:ring-1 focus:ring-[#26B99D]"
          rows={3}
        />
        <button className="mt-2 ml-auto flex items-center gap-2 rounded-lg bg-[#26B99D] px-4 py-2 text-sm font-medium text-white hover:bg-[#219b84] transition-colors">
          <Send size={14} />
          Salvar
        </button>
      </div>

      {/* Divider */}
      <hr className="border-white/10" />

      {/* Timeline */}
      <div>
        <h4 className="text-sm font-semibold text-white">Linha do Tempo</h4>
        <div className="mt-3 flex flex-col">
          {timeline.map((event, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`mt-1 h-3 w-3 rounded-full ${
                    event.active ? "bg-[#26B99D]" : "bg-gray-600"
                  }`}
                />
                {i < timeline.length - 1 && (
                  <div className="w-0.5 flex-1 bg-white/10 my-1" />
                )}
              </div>
              <div className="pb-4">
                <p className="text-sm text-gray-300">
                  {event.text} - <span className="text-gray-500">{event.time}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
