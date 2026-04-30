"use client";

import { Users, Monitor, MapPin, CheckCircle, FileText, Send, Calendar, ChevronRight, Clock, PhoneForwarded, Phone, Mail, MessageCircle, Plus, Package, Tag, Barcode, Hash, FlaskConical } from "lucide-react";

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
  const contatos = [
    { autor: "Taiany", texto: "Cliente ligou solicitando informações sobre prazo de entrega do pedido.", data: "29/04/2026", hora: "11:55", active: true, tipo: "telefone", criadoPor: "Taiany" },
    { autor: "Administrador", texto: "Retorno ao cliente informando que o pedido está em separação.", data: "29/04/2026", hora: "14:15", active: false, tipo: "email", criadoPor: "Administrador" },
    { autor: "Taiany", texto: "Cliente confirmou recebimento e encerrou a solicitação.", data: "30/04/2026", hora: "09:30", active: false, tipo: "rede social", criadoPor: "Taiany" },
  ];

  const comentarios: Comentario[] = [
    { autor: "Taiany", texto: "Cliente entrou em contato solicitando informações sobre o prazo de entrega.", data: "29/04/2026 - 11:55" },
    { autor: "Administrador", texto: "Encaminhado para o setor responsável.", data: "29/04/2026 - 14:20" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Info header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white cursor-pointer hover:underline transition-all">
            {id}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${
              status === "Aberto" ? "bg-[#F0FDF4]/10 border border-[#4CDE81]/50 text-[#4CDE81]" : "bg-[#FFFBEB]/10 border border-[#F59E0B]/50 text-[#F59E0B]"
            }`}>
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
          <span className="inline-flex rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-gray-200">
            Reclamação
          </span>
          <ChevronRight size={14} className="text-gray-500" />
          <span className="inline-flex rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-gray-300">
            Produto
          </span>
          <ChevronRight size={14} className="text-gray-500" />
          <span className="inline-flex rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-gray-300">
            Defeito de fabricação
          </span>
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
          {/* Retorno de contato */}
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[rgba(18,30,50,0.6)] p-3">
            <PhoneForwarded size={16} className="text-[#26B99D] shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Retorno de contato</p>
              <div className="mt-0.5 flex items-center gap-2 text-sm font-medium text-gray-300">
                <Calendar size={13} className="text-gray-500" />
                <span>30/04/2026</span>
                <Clock size={13} className="text-gray-500 ml-1" />
                <span>14:00</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 p-3 cursor-pointer hover:border-[#26B99D] hover:shadow-sm transition-all">
            <p className="text-xs text-gray-500">Cliente</p>
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

      {/* Action buttons */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-[#26B99D] px-4 py-2 text-sm font-medium text-white hover:bg-[#219b84] transition-colors">
          <CheckCircle size={16} />
          Concluir
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors">
          <FileText size={16} />
          {justificativa ? "Alterar Justificativa" : "Adicionar Justificativa"}
        </button>
      </div>

      {/* Justificativa tag */}
      {justificativa && (
        <div>
          <h4 className="text-sm font-semibold text-white mb-2">Justificativa</h4>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-400">
              {justificativa.categoria}
            </span>
            <ChevronRight size={14} className="text-gray-500" />
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-medium text-amber-400">
              {justificativa.detalhe}
            </span>
          </div>
        </div>
      )}

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

      {/* Contatos */}
      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">Linha do Tempo - Contatos</h4>
          <button className="flex items-center gap-1 rounded-lg bg-[#26B99D] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#219b84] transition-colors">
            <Plus size={14} />
            Novo Contato
          </button>
        </div>
        <div className="mt-3 flex flex-col">
          {contatos.map((contato, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`mt-1 h-3 w-3 rounded-full ${
                    contato.active ? "bg-[#26B99D]" : "bg-gray-600"
                  }`}
                />
                {i < contatos.length - 1 && (
                  <div className="w-0.5 flex-1 bg-white/10 my-1" />
                )}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2">
                  <span className="relative group text-xs font-semibold text-gray-300 cursor-default">
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
                <p className="mt-0.5 text-sm text-gray-400">{contato.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
