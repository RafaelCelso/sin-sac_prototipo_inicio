"use client";

import { useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";
import { Search, Plus, Edit2, Trash2, Package } from "lucide-react";

interface Produto {
  id: number;
  nome: string;
  codigo: string;
  categoria: string;
  fabricante: string;
  status: "Ativo" | "Inativo";
}

const produtosMock: Produto[] = [
  { id: 1, nome: "Amoxicilina 500mg", codigo: "MED-001", categoria: "Antibiótico", fabricante: "Laboratório A", status: "Ativo" },
  { id: 2, nome: "Ibuprofeno 400mg", codigo: "MED-002", categoria: "Anti-inflamatório", fabricante: "Laboratório B", status: "Ativo" },
  { id: 3, nome: "Omeprazol 20mg", codigo: "MED-003", categoria: "Antiácido", fabricante: "Laboratório C", status: "Ativo" },
  { id: 4, nome: "Losartana 50mg", codigo: "MED-004", categoria: "Anti-hipertensivo", fabricante: "Laboratório A", status: "Inativo" },
  { id: 5, nome: "Metformina 850mg", codigo: "MED-005", categoria: "Antidiabético", fabricante: "Laboratório D", status: "Ativo" },
  { id: 6, nome: "Dipirona 1g", codigo: "MED-006", categoria: "Analgésico", fabricante: "Laboratório B", status: "Ativo" },
  { id: 7, nome: "Paracetamol 750mg", codigo: "MED-007", categoria: "Analgésico", fabricante: "Laboratório C", status: "Ativo" },
  { id: 8, nome: "Azitromicina 500mg", codigo: "MED-008", categoria: "Antibiótico", fabricante: "Laboratório A", status: "Inativo" },
  { id: 9, nome: "Sinvastatina 20mg", codigo: "MED-009", categoria: "Hipolipemiante", fabricante: "Laboratório D", status: "Ativo" },
  { id: 10, nome: "Captopril 25mg", codigo: "MED-010", categoria: "Anti-hipertensivo", fabricante: "Laboratório B", status: "Ativo" },
];

export function ProdutosPage() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");

  const filtered = produtosMock.filter(
    (p) =>
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.codigo.toLowerCase().includes(search.toLowerCase()) ||
      p.categoria.toLowerCase().includes(search.toLowerCase()) ||
      p.fabricante.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Breadcrumb */}
      <div className={cn("px-8 pt-6 pb-2 text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
        Início &gt; Preferências &gt; Produto
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-8 pb-4">
        <div>
          <h1 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-gray-800")}>Produtos</h1>
          <p className={cn("mt-1 text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
            Gerencie os produtos cadastrados no sistema.
          </p>
        </div>
        <button
          className="flex items-center gap-2 rounded-xl bg-[#26B99D] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#219b84]"
        >
          <Plus size={16} />
          Novo Produto
        </button>
      </div>

      {/* Search */}
      <div className="px-8 pb-4">
        <div className={cn("relative max-w-md")}>
          <Search size={18} className={cn("absolute left-3 top-1/2 -translate-y-1/2", isDark ? "text-gray-500" : "text-gray-400")} />
          <input
            type="text"
            placeholder="Buscar por nome, código, categoria..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={cn(
              "w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm outline-none transition-colors",
              isDark
                ? "border-white/10 bg-[rgba(18,30,50,0.6)] text-white placeholder:text-gray-500 focus:border-[#26B99D]"
                : "border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:border-[#26B99D]"
            )}
          />
        </div>
      </div>

      {/* Grid/Table */}
      <div className="flex-1 overflow-y-auto px-8 pb-6">
        <div className={cn("rounded-xl border overflow-hidden", isDark ? "border-white/10" : "border-gray-200")}>
          <table className="w-full text-sm">
            <thead>
              <tr className={cn("border-b", isDark ? "border-white/10 bg-[rgba(18,30,50,0.6)]" : "border-gray-200 bg-gray-50")}>
                <th className={cn("px-4 py-3 text-left font-medium", isDark ? "text-gray-400" : "text-gray-500")}>Código</th>
                <th className={cn("px-4 py-3 text-left font-medium", isDark ? "text-gray-400" : "text-gray-500")}>Nome</th>
                <th className={cn("px-4 py-3 text-left font-medium", isDark ? "text-gray-400" : "text-gray-500")}>Categoria</th>
                <th className={cn("px-4 py-3 text-left font-medium", isDark ? "text-gray-400" : "text-gray-500")}>Fabricante</th>
                <th className={cn("px-4 py-3 text-left font-medium", isDark ? "text-gray-400" : "text-gray-500")}>Status</th>
                <th className={cn("px-4 py-3 text-center font-medium", isDark ? "text-gray-400" : "text-gray-500")}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((produto) => (
                <tr
                  key={produto.id}
                  className={cn(
                    "border-b transition-colors",
                    isDark ? "border-white/5 hover:bg-white/5" : "border-gray-100 hover:bg-gray-50"
                  )}
                >
                  <td className={cn("px-4 py-3 font-mono text-xs", isDark ? "text-gray-300" : "text-gray-600")}>
                    {produto.codigo}
                  </td>
                  <td className={cn("px-4 py-3 font-medium", isDark ? "text-white" : "text-gray-800")}>
                    <div className="flex items-center gap-2">
                      <Package size={14} className="text-[#26B99D]" />
                      {produto.nome}
                    </div>
                  </td>
                  <td className={cn("px-4 py-3", isDark ? "text-gray-300" : "text-gray-600")}>{produto.categoria}</td>
                  <td className={cn("px-4 py-3", isDark ? "text-gray-300" : "text-gray-600")}>{produto.fabricante}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        produto.status === "Ativo"
                          ? "bg-[#26B99D]/10 text-[#26B99D]"
                          : isDark
                          ? "bg-white/10 text-gray-400"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {produto.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className={cn(
                          "rounded-lg p-1.5 transition-colors",
                          isDark ? "hover:bg-white/10 text-gray-400 hover:text-white" : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                        )}
                        title="Editar"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        className={cn(
                          "rounded-lg p-1.5 transition-colors",
                          isDark ? "hover:bg-red-500/10 text-gray-400 hover:text-red-400" : "hover:bg-red-50 text-gray-500 hover:text-red-500"
                        )}
                        title="Excluir"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className={cn("px-4 py-8 text-center", isDark ? "text-gray-500" : "text-gray-400")}>
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className={cn("mt-3 text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
          {filtered.length} produto(s) encontrado(s)
        </div>
      </div>
    </div>
  );
}
