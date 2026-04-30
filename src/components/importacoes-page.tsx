"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Download, FileText, AlertCircle, CheckCircle2, X, Sun, Moon, GripVertical, ArrowRight } from "lucide-react";
import * as XLSX from "xlsx";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

const tiposArquivo = [
  "Cliente",
  "Produto",
  "Protocolo",
  "Evento Adverso",
  "Queixa Técnica",
  "Notificação de Seguimento",
] as const;

type TipoArquivo = (typeof tiposArquivo)[number];

const templateHeaders: Record<TipoArquivo, string[]> = {
  Cliente: [
    "bairro", "cidade", "complemento", "created_at", "created_by", "deleted_at",
    "deleted_by", "deleted_reason", "documento", "email", "id", "id_cliente_tipo",
    "logradouro", "nome", "numero", "observacoes", "telefone", "tipo_documento",
    "uf", "updated_at", "updated_by"
  ],
  Produto: ["Código", "Nome", "Descrição", "Categoria", "Fabricante", "Lote", "Validade"],
  Protocolo: ["ID Protocolo", "Cliente", "Data Abertura", "Status", "Território", "Descrição"],
  "Evento Adverso": ["ID Protocolo", "Produto", "Data Evento", "Descrição", "Gravidade", "Desfecho"],
  "Queixa Técnica": ["ID Protocolo", "Produto", "Lote", "Data Queixa", "Descrição", "Categoria"],
  "Notificação de Seguimento": ["ID Protocolo", "Data Seguimento", "Tipo", "Descrição", "Status"],
};

type MapeamentoColunas = Record<string, string | null>;

export function ImportacoesPage() {
  const { isDark, toggleTheme } = useTheme();
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoArquivo>("Cliente");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Modal states
  const [showMismatchModal, setShowMismatchModal] = useState(false);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [colunasArquivo, setColunasArquivo] = useState<string[]>([]);
  const [mapeamento, setMapeamento] = useState<MapeamentoColunas>({});
  const [draggingColumn, setDraggingColumn] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [showIgnoredModal, setShowIgnoredModal] = useState(false);
  const [colunasIgnoradas, setColunasIgnoradas] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const parseCSVHeaders = (content: string): string[] => {
    const firstLine = content.split(/\r?\n/)[0] || "";
    return firstLine.split(";").map((col) => col.trim()).filter(Boolean);
  };

  const parseXLSXHeaders = (buffer: ArrayBuffer): string[] => {
    const workbook = XLSX.read(buffer, { type: "array" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<string[]>(firstSheet, { header: 1 });
    if (rows.length === 0) return [];
    return (rows[0] as string[]).map((col) => String(col).trim()).filter(Boolean);
  };

  const isXLSX = (file: File): boolean => {
    return file.name.toLowerCase().endsWith(".xlsx");
  };

  const arraysMatch = (a: string[], b: string[]): boolean => {
    if (a.length !== b.length) return false;
    const normalizedA = a.map((s) => s.toLowerCase().trim()).sort();
    const normalizedB = b.map((s) => s.toLowerCase().trim()).sort();
    return normalizedA.every((val, idx) => val === normalizedB[idx]);
  };

  const validarColunas = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      let headers: string[];

      if (isXLSX(file)) {
        headers = parseXLSXHeaders(e.target?.result as ArrayBuffer);
      } else {
        headers = parseCSVHeaders(e.target?.result as string);
      }

      const expected = templateHeaders[tipoSelecionado];

      if (!arraysMatch(headers, expected)) {
        setColunasArquivo(headers);
        setShowMismatchModal(true);
      }
    };

    if (isXLSX(file)) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file, "UTF-8");
    }
  }, [tipoSelecionado]);

  const handleAceitarMapeamento = () => {
    setShowMismatchModal(false);
    // Initialize mapping with empty values
    const initialMapping: MapeamentoColunas = {};
    templateHeaders[tipoSelecionado].forEach((col) => {
      initialMapping[col] = null;
    });
    setMapeamento(initialMapping);
    setShowMappingModal(true);
  };

  const processarArquivo = useCallback((file: File) => {
    setArquivo(file);
    validarColunas(file);
  }, [validarColunas]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processarArquivo(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processarArquivo(file);
  };

  const handleDownloadModelo = () => {
    const csv = templateHeaders[tipoSelecionado].join(";") + "\n";
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `modelo_${tipoSelecionado.toLowerCase().replace(/ /g, "_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Drag and drop for column mapping
  const handleColumnDragStart = (coluna: string) => {
    setDraggingColumn(coluna);
  };

  const handleColumnDragOver = (e: React.DragEvent, templateCol: string) => {
    e.preventDefault();
    setDropTarget(templateCol);
  };

  const handleColumnDragLeave = () => {
    setDropTarget(null);
  };

  const handleColumnDrop = (e: React.DragEvent, templateCol: string) => {
    e.preventDefault();
    setDropTarget(null);
    if (draggingColumn) {
      // Remove previous mapping of this dragged column
      const newMapping = { ...mapeamento };
      Object.keys(newMapping).forEach((key) => {
        if (newMapping[key] === draggingColumn) {
          newMapping[key] = null;
        }
      });
      newMapping[templateCol] = draggingColumn;
      setMapeamento(newMapping);
      setDraggingColumn(null);
    }
  };

  const handleRemoveMapping = (templateCol: string) => {
    setMapeamento((prev) => ({ ...prev, [templateCol]: null }));
  };

  const colunasNaoMapeadas = colunasArquivo.filter(
    (col) => !Object.values(mapeamento).includes(col)
  );

  const handleConfirmarMapeamento = () => {
    // Check for unmapped file columns
    const naoMapeadas = colunasArquivo.filter(
      (col) => !Object.values(mapeamento).includes(col)
    );

    if (naoMapeadas.length > 0) {
      setColunasIgnoradas(naoMapeadas);
      setShowIgnoredModal(true);
    } else {
      setShowMappingModal(false);
      setShowSuccessModal(true);
    }
  };

  const handleConfirmarImportacaoComIgnoradas = () => {
    setShowIgnoredModal(false);
    setShowMappingModal(false);
    setShowSuccessModal(true);
  };

  const handleFecharSucesso = () => {
    setShowSuccessModal(false);
    setArquivo(null);
    setColunasArquivo([]);
    setMapeamento({});
    setColunasIgnoradas([]);
  };


  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <Upload size={24} className="text-[#26B99D]" />
          <div className="flex-1">
            <h1 className={cn("text-xl font-bold", isDark ? "text-white" : "text-gray-800")}>
              Importações
            </h1>
            <p className={cn("mt-0.5 text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
              Importe dados em massa para o sistema através de arquivos CSV ou XLSX
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={cn(
              "rounded-lg p-2 transition-colors",
              isDark ? "text-gray-400 hover:bg-white/10 hover:text-gray-200" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            )}
            aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 pb-6">
        <div className={cn("rounded-xl border p-6", isDark ? "border-white/10 bg-[#0d1526]" : "border-gray-200 bg-white")}>
          {/* Orientações */}
          <div className={cn("mb-6 flex items-start gap-3 rounded-lg p-4")}>
            <AlertCircle size={18} className={cn("mt-0.5 shrink-0", isDark ? "text-[#99A1AB]" : "text-black")} />
            <div className={cn("text-sm", isDark ? "text-[#99A1AB]" : "text-black")}>
              <p className="font-medium mb-3">Orientações para importação</p>
              <ol className="list-decimal pl-4 space-y-2 text-xs opacity-90">
                <li>Selecione o tipo de arquivo correspondente aos dados que deseja importar.</li>
                <li>Faça o download do modelo para garantir que seu arquivo esteja no formato correto.</li>
                <li>O arquivo deve estar no formato CSV (separador ponto e vírgula) ou XLSX.</li>
                <li>A primeira linha do arquivo deve conter os cabeçalhos conforme o modelo.</li>
                <li>Tamanho máximo permitido: 10MB.</li>
              </ol>
            </div>
          </div>

          {/* Tipo de arquivo */}
          <div className="mb-6">
            <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
              Tipo de arquivo
            </label>
            <div className="flex items-center gap-3">
              <select
                value={tipoSelecionado}
                onChange={(e) => setTipoSelecionado(e.target.value as TipoArquivo)}
                className={cn(
                  "flex-1 max-w-sm rounded-lg border px-4 py-2.5 text-sm focus:border-[#26B99D] focus:outline-none focus:ring-1 focus:ring-[#26B99D]",
                  isDark ? "border-white/10 bg-[#0b1120] text-gray-200" : "border-gray-200 bg-white text-gray-700"
                )}
              >
                {tiposArquivo.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
              <button
                onClick={handleDownloadModelo}
                className="flex items-center gap-2 rounded-lg border border-[#26B99D] px-4 py-2.5 text-sm font-medium text-[#26B99D] transition-colors hover:bg-[#26B99D]/10"
              >
                <Download size={16} />
                Baixar modelo
              </button>
            </div>
          </div>

          {/* Upload area */}
          <div className="mb-4">
            <label className={cn("block text-sm font-medium mb-2", isDark ? "text-gray-300" : "text-gray-700")}>
              Upload do arquivo
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-colors",
                dragOver
                  ? "border-[#26B99D] bg-[#26B99D]/5"
                  : isDark
                  ? "border-white/10 hover:border-white/20 bg-transparent"
                  : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
              )}
            >
              <div className={cn("rounded-full p-3", isDark ? "bg-white/5" : "bg-gray-100")}>
                <Upload size={24} className={isDark ? "text-gray-400" : "text-gray-500"} />
              </div>
              <div className="text-center">
                <p className={cn("text-sm font-medium", isDark ? "text-gray-300" : "text-gray-700")}>
                  Arraste e solte seu arquivo aqui
                </p>
                <p className={cn("text-xs mt-1", isDark ? "text-gray-500" : "text-gray-400")}>
                  ou clique para selecionar • CSV ou XLSX até 10MB
                </p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Arquivo selecionado */}
          {arquivo && (
            <div className={cn("flex items-center gap-3 rounded-lg border p-3 mb-6", isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50")}>
              <FileText size={18} className="text-[#26B99D] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium truncate", isDark ? "text-gray-200" : "text-gray-700")}>{arquivo.name}</p>
                <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
                  {(arquivo.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                onClick={() => setArquivo(null)}
                className={cn("rounded-md p-1 transition-colors", isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-200 text-gray-500")}
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Botão importar */}
          <button
            disabled={!arquivo}
            className={cn(
              "flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors",
              arquivo
                ? "bg-[#26B99D] hover:bg-[#219b84] shadow-md"
                : isDark
                ? "bg-white/10 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            <CheckCircle2 size={16} />
            Importar arquivo
          </button>
        </div>
      </div>

      {/* Modal: Diferenças identificadas */}
      {showMismatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={cn("w-full max-w-md rounded-xl border p-6 shadow-2xl", isDark ? "border-white/10 bg-[#0d1526]" : "border-gray-200 bg-white")}>
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle size={22} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h2 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-gray-800")}>
                  Diferenças identificadas
                </h2>
                <p className={cn("text-sm mt-2", isDark ? "text-gray-400" : "text-gray-600")}>
                  Foram identificadas diferenças entre as colunas do arquivo de importação e o modelo esperado pelo sistema.
                </p>
                <p className={cn("text-sm mt-3", isDark ? "text-gray-300" : "text-gray-700")}>
                  Deseja fazer a relação das colunas manualmente?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowMismatchModal(false)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  isDark ? "text-gray-400 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
                )}
              >
                Cancelar
              </button>
              <button
                onClick={handleAceitarMapeamento}
                className="rounded-lg bg-[#26B99D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#219b84] transition-colors"
              >
                Sim, mapear colunas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Mapeamento de colunas */}
      {showMappingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={cn("w-full max-w-4xl max-h-[85vh] rounded-xl border shadow-2xl flex flex-col", isDark ? "border-white/10 bg-[#0d1526]" : "border-gray-200 bg-white")}>
            {/* Header */}
            <div className={cn("flex items-center justify-between px-6 py-4 border-b", isDark ? "border-white/10" : "border-gray-200")}>
              <div>
                <h2 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-gray-800")}>
                  Mapeamento de colunas
                </h2>
                <p className={cn("text-xs mt-1", isDark ? "text-gray-400" : "text-gray-500")}>
                  Arraste as colunas do arquivo para as colunas correspondentes do modelo
                </p>
              </div>
              <button
                onClick={() => setShowMappingModal(false)}
                className={cn("rounded-md p-1.5 transition-colors", isDark ? "hover:bg-white/10 text-gray-400" : "hover:bg-gray-100 text-gray-500")}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Colunas do arquivo (source) */}
                <div>
                  <h3 className={cn("text-sm font-semibold mb-3 flex items-center gap-2", isDark ? "text-gray-300" : "text-gray-700")}>
                    <FileText size={16} className="text-[#26B99D]" />
                    Colunas do arquivo
                  </h3>
                  <div className="space-y-2">
                    {colunasNaoMapeadas.map((col) => (
                      <div
                        key={col}
                        draggable
                        onDragStart={() => handleColumnDragStart(col)}
                        onDragEnd={() => setDraggingColumn(null)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm cursor-grab active:cursor-grabbing transition-all",
                          draggingColumn === col
                            ? "opacity-50 scale-95"
                            : "",
                          isDark
                            ? "border-white/10 bg-white/5 text-gray-200 hover:border-[#26B99D]/50 hover:bg-[#26B99D]/5"
                            : "border-gray-200 bg-gray-50 text-gray-700 hover:border-[#26B99D]/50 hover:bg-[#26B99D]/5"
                        )}
                      >
                        <GripVertical size={14} className={isDark ? "text-gray-500" : "text-gray-400"} />
                        <span className="truncate">{col}</span>
                      </div>
                    ))}
                    {colunasNaoMapeadas.length === 0 && (
                      <p className={cn("text-xs italic py-4 text-center", isDark ? "text-gray-500" : "text-gray-400")}>
                        Todas as colunas foram mapeadas
                      </p>
                    )}
                  </div>
                </div>

                {/* Colunas do template (target) */}
                <div>
                  <h3 className={cn("text-sm font-semibold mb-3 flex items-center gap-2", isDark ? "text-gray-300" : "text-gray-700")}>
                    <ArrowRight size={16} className="text-[#26B99D]" />
                    Colunas do modelo ({tipoSelecionado})
                  </h3>
                  <div className="space-y-2">
                    {templateHeaders[tipoSelecionado].map((templateCol) => (
                      <div
                        key={templateCol}
                        onDragOver={(e) => handleColumnDragOver(e, templateCol)}
                        onDragLeave={handleColumnDragLeave}
                        onDrop={(e) => handleColumnDrop(e, templateCol)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-all min-h-[42px]",
                          dropTarget === templateCol
                            ? "border-[#26B99D] bg-[#26B99D]/10 ring-1 ring-[#26B99D]"
                            : mapeamento[templateCol]
                            ? isDark
                              ? "border-[#26B99D]/40 bg-[#26B99D]/10"
                              : "border-[#26B99D]/40 bg-[#26B99D]/5"
                            : isDark
                            ? "border-white/10 bg-white/5"
                            : "border-gray-200 bg-white"
                        )}
                      >
                        <span className={cn("shrink-0 font-medium", isDark ? "text-gray-300" : "text-gray-700")}>
                          {templateCol}
                        </span>
                        {mapeamento[templateCol] && (
                          <>
                            <ArrowRight size={12} className="text-[#26B99D] shrink-0 mx-1" />
                            <span className="text-[#26B99D] font-medium truncate">
                              {mapeamento[templateCol]}
                            </span>
                            <button
                              onClick={() => handleRemoveMapping(templateCol)}
                              className={cn("ml-auto shrink-0 rounded p-0.5 transition-colors", isDark ? "hover:bg-white/10 text-gray-500" : "hover:bg-gray-200 text-gray-400")}
                            >
                              <X size={14} />
                            </button>
                          </>
                        )}
                        {!mapeamento[templateCol] && (
                          <span className={cn("text-xs italic ml-auto", isDark ? "text-gray-600" : "text-gray-400")}>
                            Solte aqui
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={cn("flex items-center justify-between px-6 py-4 border-t", isDark ? "border-white/10" : "border-gray-200")}>
              <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
                {Object.values(mapeamento).filter(Boolean).length} de {templateHeaders[tipoSelecionado].length} colunas mapeadas
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowMappingModal(false)}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    isDark ? "text-gray-400 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmarMapeamento}
                  className="rounded-lg bg-[#26B99D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#219b84] transition-colors"
                >
                  Confirmar mapeamento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal: Colunas ignoradas */}
      {showIgnoredModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={cn("w-full max-w-md rounded-xl border p-6 shadow-2xl", isDark ? "border-white/10 bg-[#0d1526]" : "border-gray-200 bg-white")}>
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle size={22} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h2 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-gray-800")}>
                  Atenção
                </h2>
                <p className={cn("text-sm mt-2", isDark ? "text-gray-400" : "text-gray-600")}>
                  As seguintes colunas do arquivo de importação não foram relacionadas com nenhuma coluna do modelo e serão <span className="font-semibold">ignoradas</span> durante a importação:
                </p>
                <div className="mt-3 max-h-40 overflow-y-auto space-y-1.5 pr-1">
                  {colunasIgnoradas.map((col) => (
                    <div
                      key={col}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm",
                        isDark ? "bg-white/5 text-gray-300" : "bg-gray-100 text-gray-700"
                      )}
                    >
                      <X size={14} className="text-amber-500 shrink-0" />
                      <span>{col}</span>
                    </div>
                  ))}
                </div>
                <p className={cn("text-sm mt-4", isDark ? "text-gray-300" : "text-gray-700")}>
                  Apenas as colunas relacionadas serão importadas. Deseja continuar?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowIgnoredModal(false)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  isDark ? "text-gray-400 hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
                )}
              >
                Voltar ao mapeamento
              </button>
              <button
                onClick={handleConfirmarImportacaoComIgnoradas}
                className="rounded-lg bg-[#26B99D] px-4 py-2 text-sm font-semibold text-white hover:bg-[#219b84] transition-colors"
              >
                Sim, continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Importação concluída */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={cn("w-full max-w-sm rounded-xl border p-6 shadow-2xl", isDark ? "border-white/10 bg-[#0d1526]" : "border-gray-200 bg-white")}>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-[#26B99D]/10 p-3 mb-4">
                <CheckCircle2 size={32} className="text-[#26B99D]" />
              </div>
              <h2 className={cn("text-lg font-semibold", isDark ? "text-white" : "text-gray-800")}>
                Importação concluída
              </h2>
              <p className={cn("text-sm mt-2", isDark ? "text-gray-400" : "text-gray-600")}>
                As informações foram importadas com sucesso para o sistema.
              </p>
              <button
                onClick={handleFecharSucesso}
                className="mt-6 w-full rounded-lg bg-[#26B99D] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#219b84] transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
