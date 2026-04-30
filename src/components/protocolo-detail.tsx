"use client";

import { Users, Monitor, MapPin, CheckCircle, FileText, Send, Calendar, ChevronRight, Clock, PhoneForwarded, Phone, Mail, MessageCircle, Plus, Package, Tag, Barcode, Hash, FlaskConical } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

interface Comentario {
  autor: string;
  texto: string;
  data: string;
}

interface ProtocoloDetailProps {
  id: string;
  cliente: string;
  criadoPor: string;
  status: string;
  territorio: string;
  dataCriacao: string;
  justificativa?: { categoria: string; detalhe: string };
}

export function ProtocoloDetail({ id, cliente, criadoPor, status, territorio, dataCriacao, justificativa }: ProtocoloDetailProps) {
  const { isDark } = useTheme();

  const contatos = [
    { autor: "Taiany", texto: "Cliente ligou solicitando informações sobre prazo de entrega do pedido.", data: "29/04/2026", hora: "11:55", active: true, tipo: "telefone", criadoPor: "Taiany" },
    { autor: "Administrador", texto: "Retorno ao cliente informando que o pedido está em separação.", data: "29/04/2026", hora: "14:15", active: false, tipo: "email", criadoPor: "Administrador" },
    { autor: "Taiany", texto: "Cliente confirmou recebimento e encerrou a solicitação.", data: "30/04/2026", hora: "09:30", active: false, tipo: "rede social", criadoPor: "Taiany" },
  ];

  const comentarios: Comentario[] = [
    { autor: "Taiany", texto: "Cliente entrou em contato solicitando informações sobre o prazo de entrega.", data: "29/04/2026 - 11:55" },
    { autor: "Administrador", texto: "Encaminhado para o setor responsável.", data: "29/04/2026 - 14:20" },
  ];

  const statusColor = isDark
    ? (status === "Aberto" ? "bg-[#F0FDF4]/10 border border-[#4CDE81]/50 text-[#4CDE81]" : "bg-[#FFFBEB]/10 border border-[#F59E0B]/50 text-[#F59E0B]")
    : (status === "Aberto" ? "bg-[#F0FDF4] border border-[#4CDE81] text-[#166534]" : "bg-[#FFFBEB] border border-[#F59E0B] text-[#92400E]");

  return (
    <div className="flex flex-col gap-6">
      {/* Info header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-bold cursor-pointer hover:underline transition-all ${isDark ? "text-white" : "text-gray-800"}`}>
            {id}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${statusColor}`}>
              {status}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-medium ${isDark ? "bg-white/5 border border-white/10 text-gray-300" : "bg-[#F1F5F9] border border-[#91A2BA] text-gray-700"}`}>
              <MapPin size={12} />
              {territorio}
            </span>
          </div>
        </div>

        {/* Criado por / Criado em */}
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Criado por</p>
            <div className={`mt-0.5 flex items-center gap-1.5 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              <Monitor size={14} className="text-gray-500" />
              {criadoPor}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500">Criado em</p>
            <div className={`mt-0.5 flex items-center gap-1.5 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              <Calendar size={14} className="text-gray-500" />
              {dataCriacao}
            </div>
          </div>
        </div>

        {/* Motivos */}
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1.5">Motivo</p>
          <div className="flex items-center gap-2">
            <span className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${isDark ? "bg-white/10 text-gray-200" : "bg-[#EBEBEB] text-gray-800"}`}>
              Reclamação
            </span>
            <ChevronRight size={14} className="text-gray-500" />
            <span className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${isDark ? "bg-white/10 text-gray-300" : "bg-[#EBEBEB] text-gray-700"}`}>
              Produto
            </span>
            <ChevronRight size={14} className="text-gray-500" />
            <span className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${isDark ? "bg-white/10 text-gray-300" : "bg-[#EBEBEB] text-gray-700"}`}>
              Defeito de fabricação
            </span>
          </div>
        </div>

        {/* Produto */}
        <div className={`mt-4 rounded-lg border p-3 ${isDark ? "border-white/10 bg-[rgba(18,30,50,0.6)]" : "border-gray-200"}`}>
          <div className="flex items-center gap-1.5 mb-2">
            <Package size={14} className={isDark ? "text-gray-400" : "text-gray-500"} />
            <p className={`text-xs font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>Produto</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-1.5">
              <Tag size={12} className="text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-500">Marca</p>
                <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>PharmaCorp</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <Package size={12} className="text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-500">Apresentação</p>
                <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>Comprimido 500mg cx 30</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <Barcode size={12} className="text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-500">EAN</p>
                <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>7891234567890</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <Hash size={12} className="text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-500">SKU</p>
                <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>SKU-00451</p>
              </div>
            </div>
            <div className="flex items-start gap-1.5">
              <FlaskConical size={12} className="text-gray-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-gray-500">Lote</p>
                <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>LT2026-0412</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <div className={`flex items-center gap-3 rounded-lg border p-3 ${isDark ? "border-white/10 bg-[rgba(18,30,50,0.6)]" : "border-gray-200 bg-gray-50"}`}>
            <PhoneForwarded size={16} className="text-[#26B99D] shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Retorno de contato</p>
              <div className={`mt-0.5 flex items-center gap-2 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                <Calendar size={13} className="text-gray-500" />
                <span>30/04/2026</span>
                <Clock size={13} className="text-gray-500 ml-1" />
                <span>14:00</span>
              </div>
            </div>
          </div>

          <div className={`rounded-lg border p-3 cursor-pointer hover:border-[#26B99D] hover:shadow-sm transition-all ${isDark ? "border-white/10" : "border-gray-200"}`}>
            <p className="text-xs text-gray-500">Cliente</p>
            <div className={`mt-1 flex items-center gap-1.5 text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              <Users size={14} className="text-gray-500" />
              {cliente}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-500">
              <div>
                <p className="text-gray-500">CPF</p>
                <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>123.456.789-00</p>
              </div>
              <div>
                <p className="text-gray-500">Telefone</p>
                <p className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>(11) 99999-0000</p>
              </div>
              <div>
                <p className="text-gray-500">E-mail</p>
                <p className={`font-medium truncate ${isDark ? "text-gray-300" : "text-gray-600"}`}>taiany@email.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className={isDark ? "border-white/10" : "border-gray-200"} />

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-[#26B99D] px-4 py-2 text-sm font-medium text-white hover:bg-[#219b84] transition-colors">
          <CheckCircle size={16} />
          Concluir
        </button>
        <button className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${isDark ? "border-white/10 text-gray-300 hover:bg-white/5" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
          <FileText size={16} />
          {justificativa ? "Alterar Justificativa" : "Adicionar Justificativa"}
        </button>
      </div>

      {justificativa && (
        <div>
          <h4 className={`text-sm font-semibold mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>Justificativa</h4>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${isDark ? "bg-amber-500/20 text-amber-400" : "bg-amber-100 text-amber-800"}`}>
              {justificativa.categoria}
            </span>
            <ChevronRight size={14} className="text-gray-500" />
            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${isDark ? "bg-amber-500/10 border border-amber-500/30 text-amber-400" : "bg-amber-50 border border-amber-200 text-amber-700"}`}>
              {justificativa.detalhe}
            </span>
          </div>
        </div>
      )}

      <hr className={isDark ? "border-white/10" : "border-gray-200"} />

      <div>
        <h4 className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>Comentários</h4>
        <div className="mt-3 flex flex-col gap-3">
          {comentarios.map((c, i) => (
            <div key={i} className={`rounded-lg border p-3 ${isDark ? "border-white/10 bg-[rgba(18,30,50,0.6)]" : "border-gray-100 bg-gray-50"}`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>{c.autor}</span>
                <span className="text-xs text-gray-500">{c.data}</span>
              </div>
              <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{c.texto}</p>
            </div>
          ))}
        </div>
        <textarea
          placeholder="Adicionar um comentário..."
          className={`mt-3 w-full resize-y rounded-lg border px-3 py-2 text-sm focus:border-[#26B99D] focus:outline-none focus:ring-1 focus:ring-[#26B99D] ${isDark ? "border-white/10 bg-[#0b1120] text-gray-200 placeholder:text-gray-500" : "border-gray-200 text-gray-600 placeholder:text-gray-400"}`}
          rows={3}
        />
        <button className="mt-2 ml-auto flex items-center gap-2 rounded-lg bg-[#26B99D] px-4 py-2 text-sm font-medium text-white hover:bg-[#219b84] transition-colors">
          <Send size={14} />
          Salvar
        </button>
      </div>

      <hr className={isDark ? "border-white/10" : "border-gray-200"} />

      <div>
        <div className="flex items-center justify-between">
          <h4 className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>Linha do Tempo - Contatos</h4>
          <button className="flex items-center gap-1 rounded-lg bg-[#26B99D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#219b84] transition-colors">
            <Plus size={14} />
            Novo Contato
          </button>
        </div>
        <div className="mt-3 flex flex-col">
          {contatos.map((contato, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`mt-1 h-3 w-3 rounded-full ${contato.active ? (isDark ? "bg-[#26B99D]" : "bg-gray-800") : (isDark ? "bg-gray-600" : "bg-gray-300")}`} />
                {i < contatos.length - 1 && (
                  <div className={`w-0.5 flex-1 my-1 ${isDark ? "bg-white/10" : "bg-gray-200"}`} />
                )}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2">
                  <span className={`relative group text-xs font-semibold cursor-default ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    {contato.autor}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex items-center gap-1 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white shadow-lg">
                      {contato.tipo === "telefone" && <Phone size={10} />}
                      {contato.tipo === "email" && <Mail size={10} />}
                      {contato.tipo === "rede social" && <MessageCircle size={10} />}
                      {contato.tipo}
                    </span>
                  </span>
                  <span className="text-xs text-gray-500">{contato.data} - {contato.hora}</span>
                  <span className="text-xs text-gray-500">• {contato.criadoPor}</span>
                </div>
                <p className={`mt-0.5 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{contato.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
