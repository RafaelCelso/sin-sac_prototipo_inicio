"use client";

import { useState } from "react";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";
import {
  Mail,
  Clock,
  CheckSquare,
  TextCursorInput,
  ChevronDown,
  User,
  Package,
  AlertTriangle,
  FileText,
  Paperclip,
  ShieldCheck,
} from "lucide-react";

type Tab = "Dashboard" | "Buscar Clientes" | "Novo Cliente" | "Protocolos" | "Queixas Técnicas" | "Territórios" | "Evento Adverso" | "Ressarcimento";

interface CampoRow {
  nome: string;
  tipo: string;
  obrigatorio: boolean;
  visivel: boolean;
  parentId?: string;
  campoId?: string;
  condition?: string;
  level?: number;
}

interface Subsection {
  title: string;
  icon: React.ReactNode;
  campos: CampoRow[];
}

const tabs: Tab[] = ["Dashboard", "Buscar Clientes", "Novo Cliente", "Protocolos", "Queixas Técnicas", "Territórios", "Evento Adverso", "Ressarcimento"];

const subsections: Subsection[] = [
  {
    title: "Informações do Cliente",
    icon: <User size={18} />,
    campos: [
      { nome: "Nome do Paciente", tipo: "Texto", obrigatorio: true, visivel: true },
      { nome: "CPF", tipo: "Texto", obrigatorio: true, visivel: true },
      { nome: "Telefone", tipo: "Texto", obrigatorio: false, visivel: true },
      { nome: "E-mail", tipo: "Texto", obrigatorio: false, visivel: true },
      { nome: "Sexo", tipo: "Seleção", obrigatorio: false, visivel: true, campoId: "sexo" },
      { nome: "Gestante", tipo: "Seleção", obrigatorio: false, visivel: true, parentId: "sexo", campoId: "gestante", condition: "Se Sexo = Feminino", level: 1 },
      { nome: "DUM (Data Última Menstruação)", tipo: "Data", obrigatorio: false, visivel: true, parentId: "gestante", condition: "Se Gestante = Sim", level: 2 },
      { nome: "Endereço", tipo: "Texto", obrigatorio: false, visivel: true },
    ],
  },
  {
    title: "Informações do Produto",
    icon: <Package size={18} />,
    campos: [
      { nome: "Produto", tipo: "Seleção", obrigatorio: true, visivel: true },
      { nome: "Lote", tipo: "Texto", obrigatorio: true, visivel: true },
      { nome: "Data de Validade", tipo: "Data", obrigatorio: false, visivel: false },
      { nome: "Quantidade", tipo: "Número", obrigatorio: false, visivel: true },
    ],
  },
  {
    title: "Detalhes da Queixa",
    icon: <AlertTriangle size={18} />,
    campos: [
      { nome: "Tipo de Queixa", tipo: "Seleção", obrigatorio: true, visivel: true },
      { nome: "Descrição da Queixa", tipo: "Texto Longo", obrigatorio: true, visivel: true },
      { nome: "Data da Ocorrência", tipo: "Data", obrigatorio: false, visivel: true },
    ],
  },
  {
    title: "Narrativa",
    icon: <FileText size={18} />,
    campos: [
      { nome: "Narrativa do Caso", tipo: "Texto Longo", obrigatorio: true, visivel: true },
      { nome: "Observações Internas", tipo: "Texto Longo", obrigatorio: false, visivel: false },
    ],
  },
  {
    title: "Anexos",
    icon: <Paperclip size={18} />,
    campos: [
      { nome: "Anexos", tipo: "Arquivo", obrigatorio: false, visivel: true },
      { nome: "Fotos do Produto", tipo: "Imagem", obrigatorio: false, visivel: false },
    ],
  },
  {
    title: "Qualidade",
    icon: <ShieldCheck size={18} />,
    campos: [
      { nome: "Território", tipo: "Seleção", obrigatorio: false, visivel: true },
      { nome: "Classificação", tipo: "Seleção", obrigatorio: false, visivel: true },
      { nome: "Parecer Qualidade", tipo: "Texto Longo", obrigatorio: false, visivel: false },
    ],
  },
];

interface SectionConfig {
  title: string;
  description?: string;
  icon: React.ReactNode;
}

const sections: SectionConfig[] = [
  { title: "Notificações de e-mail", description: "Configure as notificações de e-mail do módulo.", icon: <Mail size={20} /> },
  { title: "SLA — Queixas Técnicas", description: "Defina prazos para o fluxo de queixas técnicas.", icon: <Clock size={20} /> },
  { title: "Etapas (Status)", description: "Ative/inative as etapas exibidas no fluxo do módulo.", icon: <CheckSquare size={20} /> },
  { title: "Campos", description: "Gerencie a visibilidade dos campos do formulário para os usuários.", icon: <TextCursorInput size={20} /> },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  const { isDark } = useTheme();
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
        checked ? "bg-[#26B99D]" : isDark ? "bg-gray-600" : "bg-gray-300"
      )}
    >
      <span
        className={cn(
          "inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform",
          checked ? "translate-x-[18px]" : "translate-x-[3px]"
        )}
      />
    </button>
  );
}

function CamposTable({ campos }: { campos: CampoRow[] }) {
  const { isDark } = useTheme();
  const [fieldStates, setFieldStates] = useState(
    campos.map((c) => ({ obrigatorio: c.obrigatorio, visivel: c.visivel }))
  );

  // Helper to find all descendant indices of a given campo
  const getDescendantIndices = (parentIndex: number): number[] => {
    const parentCampo = campos[parentIndex];
    const parentCampoId = parentCampo.campoId;
    if (!parentCampoId) return [];

    const descendants: number[] = [];
    const queue = [parentCampoId];

    while (queue.length > 0) {
      const currentParentId = queue.shift()!;
      campos.forEach((c, idx) => {
        if (c.parentId === currentParentId && !descendants.includes(idx)) {
          descendants.push(idx);
          if (c.campoId) {
            queue.push(c.campoId);
          }
        }
      });
    }

    return descendants;
  };

  // Check if a campo's parent chain has any disabled (not visible) ancestor
  const isDisabledByParent = (index: number): boolean => {
    const campo = campos[index];
    if (!campo.parentId) return false;

    const parentIndex = campos.findIndex((c) => c.campoId === campo.parentId);
    if (parentIndex === -1) return false;

    if (!fieldStates[parentIndex].visivel) return true;
    return isDisabledByParent(parentIndex);
  };

  const updateField = (index: number, key: "obrigatorio" | "visivel", value: boolean) => {
    setFieldStates((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };

      // If disabling visibility, cascade to all descendants
      if (key === "visivel" && !value) {
        const descendants = getDescendantIndices(index);
        descendants.forEach((descIdx) => {
          next[descIdx] = { ...next[descIdx], visivel: false };
        });
      }

      return next;
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className={cn("border-b", isDark ? "border-white/10" : "border-gray-200")}>
            <th className={cn("py-2 px-3 text-left font-medium", isDark ? "text-gray-400" : "text-gray-500")}>Campo</th>
            <th className={cn("py-2 px-3 text-left font-medium", isDark ? "text-gray-400" : "text-gray-500")}>Tipo de Campo</th>
            <th className={cn("py-2 px-3 text-center font-medium", isDark ? "text-gray-400" : "text-gray-500")}>Obrigatório</th>
            <th className={cn("py-2 px-3 text-center font-medium", isDark ? "text-gray-400" : "text-gray-500")}>Visível</th>
          </tr>
        </thead>
        <tbody>
          {campos.map((campo, i) => {
            const disabledByParent = isDisabledByParent(i);
            return (
              <tr key={campo.nome} className={cn("border-b", isDark ? "border-white/5" : "border-gray-100", disabledByParent && "opacity-50")}>
                <td className={cn("py-2.5 px-3", isDark ? "text-gray-200" : "text-gray-700")}>
                  <div className="flex items-center gap-1">
                    {campo.level && campo.level > 0 && (
                      <span style={{ width: campo.level * 20 }} className="inline-block" />
                    )}
                    <span>{campo.nome}</span>
                    {campo.condition && (
                      <span className={cn("ml-2 text-xs px-1.5 py-0.5 rounded", isDark ? "bg-white/5 text-gray-400" : "bg-gray-100 text-gray-500")}>
                        {campo.condition}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", isDark ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-600")}>
                    {campo.tipo}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <div className="flex justify-center">
                    <Toggle checked={fieldStates[i].obrigatorio} onChange={(v) => updateField(i, "obrigatorio", v)} />
                  </div>
                </td>
                <td className="py-2.5 px-3 text-center">
                  <div className="flex justify-center">
                    <Toggle
                      checked={fieldStates[i].visivel}
                      onChange={(v) => updateField(i, "visivel", v)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SubsectionCard({ subsection }: { subsection: Subsection }) {
  const { isDark } = useTheme();
  const [open, setOpen] = useState(true);

  return (
    <div className={cn("rounded-lg border", isDark ? "border-white/10" : "border-gray-200")}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between px-4 py-3 text-sm font-medium",
          isDark ? "text-gray-200 hover:bg-white/5" : "text-gray-700 hover:bg-gray-50"
        )}
      >
        <div className="flex items-center gap-2">
          <span className={isDark ? "text-gray-400" : "text-gray-500"}>{subsection.icon}</span>
          <span>{subsection.title}</span>
        </div>
        <ChevronDown size={16} className={cn("transition-transform", open && "rotate-180", isDark ? "text-gray-400" : "text-gray-500")} />
      </button>
      {open && (
        <div className={cn("px-4 pb-4 border-t", isDark ? "border-white/5" : "border-gray-100")}>
          <CamposTable campos={subsection.campos} />
        </div>
      )}
    </div>
  );
}

export function ParametrizacaoPage() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<Tab>("Queixas Técnicas");
  const [expandedSections, setExpandedSections] = useState<string[]>(["Campos"]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Breadcrumb */}
      <div className={cn("px-8 pt-6 pb-2 text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
        Início &gt; Parametrização
      </div>

      {/* Header */}
      <div className="px-8 pb-4">
        <h1 className={cn("text-2xl font-bold", isDark ? "text-white" : "text-gray-800")}>Parametrização</h1>
        <p className={cn("mt-1 text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
          Configure e gerencie os parâmetros do sistema para personalizar o comportamento da aplicação.
        </p>
      </div>

      {/* Tabs */}
      <div className={cn("px-8 border-b", isDark ? "border-white/10" : "border-gray-200")}>
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors",
                activeTab === tab
                  ? isDark
                    ? "bg-[#26B99D]/10 text-[#26B99D] border-b-2 border-[#26B99D]"
                    : "bg-[#26B99D]/5 text-[#26B99D] border-b-2 border-[#26B99D]"
                  : isDark
                  ? "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex flex-col gap-3">
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.title);
            return (
              <div
                key={section.title}
                className={cn(
                  "rounded-xl border overflow-hidden",
                  isDark ? "border-white/10 bg-[rgba(18,30,50,0.4)]" : "border-gray-200 bg-white"
                )}
              >
                <button
                  onClick={() => toggleSection(section.title)}
                  className={cn(
                    "flex w-full items-center justify-between px-5 py-4 transition-colors",
                    isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn("text-[#26B99D]")}>{section.icon}</span>
                    <div className="text-left">
                      <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-800")}>
                        {section.title}
                      </span>
                      {section.description && (
                        <p className={cn("text-xs mt-0.5", isDark ? "text-gray-400" : "text-gray-500")}>
                          {section.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "transition-transform",
                      isExpanded && "rotate-180",
                      isDark ? "text-gray-400" : "text-gray-500"
                    )}
                  />
                </button>

                {isExpanded && (
                  <div className={cn("px-5 pb-5 border-t", isDark ? "border-white/5" : "border-gray-100")}>
                    {section.title === "Campos" ? (
                      <div className="mt-4 flex flex-col gap-3">
                        <p className={cn("text-sm mb-2", isDark ? "text-gray-400" : "text-gray-500")}>
                          Ative ou desative os campos que serão exibidos no formulário de Queixas Técnicas. Os campos estão organizados por seção.
                        </p>
                        {subsections.map((sub) => (
                          <SubsectionCard key={sub.title} subsection={sub} />
                        ))}
                      </div>
                    ) : (
                      <p className={cn("mt-4 text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
                        {section.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
