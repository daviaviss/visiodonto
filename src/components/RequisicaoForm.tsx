"use client";

import { useEffect, useState } from "react";
import { Check, Download, Loader2, RotateCcw } from "lucide-react";
import {
  ARCADAS,
  DADOS_VAZIOS,
  SECOES,
  type Bloco,
  type DadosRequisicao,
} from "@/lib/requisicao";
import { gerarRequisicaoPdf } from "@/lib/requisicaoPdf";

const CHAVE_RASCUNHO = "visiodonto:requisicao";

/** Ordem anatômica usada para manter a lista de dentes selecionados estável. */
const TODOS_OS_DENTES = [
  ...ARCADAS.permanentesSuperior,
  ...ARCADAS.deciduosSuperior,
  ...ARCADAS.deciduosInferior,
  ...ARCADAS.permanentesInferior,
];

const rotulo = "text-xs font-semibold uppercase tracking-wide text-[#757575]";
const entrada =
  "mt-1.5 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-[#333333] outline-none transition-colors focus:border-[#00798a] focus:ring-2 focus:ring-[#00798a]/20";

const Caixa = ({ marcado, redonda }: { marcado: boolean; redonda?: boolean }) => (
  <span
    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
      redonda ? "rounded-full" : "rounded-[5px]"
    } ${marcado ? "border-[#00798a] bg-[#00798a]" : "border-slate-300 bg-white"}`}
  >
    {marcado && <Check size={11} strokeWidth={3.5} className="text-white" />}
  </span>
);

export const RequisicaoForm = () => {
  const [dados, setDados] = useState<DadosRequisicao>(DADOS_VAZIOS);
  const [gerando, setGerando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [pronto, setPronto] = useState(false);

  // Rascunho local: o formulário é longo, recarregar a página não pode zerar tudo.
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_RASCUNHO);
      if (salvo) setDados({ ...DADOS_VAZIOS, ...JSON.parse(salvo) });
    } catch {
      // rascunho corrompido: segue com o formulário vazio
    }
    setPronto(true);
  }, []);

  useEffect(() => {
    if (!pronto) return;
    try {
      localStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(dados));
    } catch {
      // storage cheio ou indisponível: preenchimento continua funcionando
    }
  }, [dados, pronto]);

  const setTexto = (id: string, valor: string) =>
    setDados((d) => ({ ...d, textos: { ...d.textos, [id]: valor } }));

  const alternarMarcado = (id: string) =>
    setDados((d) => ({ ...d, marcados: { ...d.marcados, [id]: !d.marcados[id] } }));

  const alternarDente = (grupo: string, dente: string) =>
    setDados((d) => {
      const atuais = new Set(d.dentes[grupo] ?? []);
      if (atuais.has(dente)) atuais.delete(dente);
      else atuais.add(dente);
      return {
        ...d,
        dentes: { ...d.dentes, [grupo]: TODOS_OS_DENTES.filter((t) => atuais.has(t)) },
      };
    });

  const limpar = () => {
    if (!confirm("Limpar todos os campos preenchidos?")) return;
    setDados(DADOS_VAZIOS);
    setErro(null);
  };

  const baixar = async () => {
    if (!dados.textos.nome?.trim()) {
      setErro("Preencha o nome do paciente antes de baixar.");
      document.getElementById("campo-nome")?.scrollIntoView({ block: "center" });
      document.getElementById("campo-nome")?.focus();
      return;
    }
    setErro(null);
    setGerando(true);
    try {
      await gerarRequisicaoPdf(dados);
    } catch {
      setErro("Não foi possível gerar o PDF. Tente novamente.");
    } finally {
      setGerando(false);
    }
  };

  const fileiraDentes = (grupo: string, lista: string[]) => {
    const selecionados = dados.dentes[grupo] ?? [];
    return (
      <div className="flex gap-1">
        {lista.map((dente, i) => (
          <span key={dente} className="flex">
            {i === lista.length / 2 && <span className="mx-1 w-px bg-slate-200" />}
            <button
              type="button"
              onClick={() => alternarDente(grupo, dente)}
              aria-pressed={selecionados.includes(dente)}
              className={`h-8 w-8 shrink-0 rounded-lg border text-xs font-semibold transition-colors ${
                selecionados.includes(dente)
                  ? "border-[#00798a] bg-[#00798a] text-white"
                  : "border-slate-200 bg-white text-[#757575] hover:border-[#00798a]/40"
              }`}
            >
              {dente}
            </button>
          </span>
        ))}
      </div>
    );
  };

  const renderBloco = (bloco: Bloco, chave: string) => {
    switch (bloco.k) {
      case "texto":
      case "data":
        return (
          <label
            key={chave}
            className={`min-w-0 ${bloco.k === "texto" && bloco.largura === "full" ? "sm:col-span-2" : ""}`}
          >
            <span className={rotulo}>{bloco.label}</span>
            <input
              id={`campo-${bloco.id}`}
              type={bloco.k === "data" ? "date" : "text"}
              value={dados.textos[bloco.id] ?? ""}
              onChange={(e) => setTexto(bloco.id, e.target.value)}
              className={entrada}
            />
          </label>
        );

      case "radio":
        return (
          <fieldset key={chave} className="min-w-0 sm:col-span-2">
            {bloco.titulo && <legend className={rotulo}>{bloco.titulo}</legend>}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {bloco.opcoes.map((opcao) => {
                const marcado = dados.textos[bloco.id] === opcao;
                return (
                  <label
                    key={opcao}
                    className={`flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#00798a]/30 ${
                      marcado
                        ? "border-[#00798a] bg-[#00798a]/8 text-[#333333]"
                        : "border-slate-200 text-[#757575] hover:border-[#00798a]/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name={bloco.id}
                      className="sr-only"
                      checked={marcado}
                      onChange={() => setTexto(bloco.id, opcao)}
                    />
                    <Caixa marcado={marcado} redonda />
                    {opcao}
                  </label>
                );
              })}
            </div>
          </fieldset>
        );

      case "checks":
        return (
          <fieldset key={chave} className="min-w-0 sm:col-span-2">
            {bloco.titulo && (
              <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-[#00798a]">
                {bloco.titulo}
              </legend>
            )}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {bloco.opcoes.map((opcao) => {
                const marcado = !!dados.marcados[opcao.id];
                return (
                  <label
                    key={opcao.id}
                    className={`flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#00798a]/30 ${
                      marcado
                        ? "border-[#00798a] bg-[#00798a]/8 text-[#333333]"
                        : "border-slate-200 text-[#757575] hover:border-[#00798a]/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={marcado}
                      onChange={() => alternarMarcado(opcao.id)}
                    />
                    <Caixa marcado={marcado} />
                    {opcao.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        );

      case "dentes":
        return (
          <div key={chave} className="min-w-0 sm:col-span-2">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#00798a]">
              {bloco.titulo}
              <span className="ml-2 font-normal normal-case tracking-normal text-[#757575] sm:hidden">
                arraste para o lado
              </span>
            </p>
            <div className="-mx-1 min-w-0 overflow-x-auto px-1 pb-1">
              <div className="w-max space-y-1.5">
                {fileiraDentes(bloco.id, ARCADAS.permanentesSuperior)}
                {bloco.deciduos && (
                  <>
                    <div className="pl-[108px]">
                      {fileiraDentes(bloco.id, ARCADAS.deciduosSuperior)}
                    </div>
                    <div className="pl-[108px]">
                      {fileiraDentes(bloco.id, ARCADAS.deciduosInferior)}
                    </div>
                  </>
                )}
                {fileiraDentes(bloco.id, ARCADAS.permanentesInferior)}
              </div>
            </div>
          </div>
        );

      case "textarea":
        return (
          <label key={chave} className="min-w-0 sm:col-span-2">
            <span className={rotulo}>{bloco.label}</span>
            <textarea
              rows={4}
              value={dados.textos[bloco.id] ?? ""}
              onChange={(e) => setTexto(bloco.id, e.target.value)}
              className={`${entrada} resize-y`}
            />
          </label>
        );
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      {SECOES.map((secao) => (
        <section
          key={secao.id}
          className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-lg font-bold text-[#333333] sm:text-xl">{secao.titulo}</h2>
          {secao.nota && (
            <p className="mt-2 text-sm leading-relaxed text-[#757575]">{secao.nota}</p>
          )}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {secao.blocos.map((bloco, i) => renderBloco(bloco, `${secao.id}-${i}`))}
          </div>
        </section>
      ))}

      {/* Barra de ações */}
      <div className="sticky bottom-4 rounded-2xl border border-slate-100 bg-white/90 px-4 py-4 shadow-lg backdrop-blur-md sm:px-6">
        {erro && (
          <p role="alert" className="mb-3 text-sm font-medium text-red-600">
            {erro}
          </p>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#757575]">
            Os dados ficam apenas no seu navegador — o PDF é gerado no seu computador.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={limpar}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-[#757575] transition-colors hover:border-[#00798a]/40 hover:text-[#00798a]"
            >
              <RotateCcw size={15} />
              Limpar
            </button>
            <button
              type="button"
              onClick={baixar}
              disabled={gerando}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#00798a] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#005f6e] disabled:opacity-60 sm:flex-none"
            >
              {gerando ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              {gerando ? "Gerando…" : "Baixar requisição"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
