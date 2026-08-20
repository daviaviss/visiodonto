import {
  CLINICA,
  INFORMACOES_PACIENTE,
  SECOES,
  type Bloco,
  type DadosRequisicao,
  type Secao,
} from "./requisicao";

const TEAL: [number, number, number] = [0, 121, 138];
const CINZA: [number, number, number] = [117, 117, 117];
const ESCURO: [number, number, number] = [51, 51, 51];

const LARGURA_PAGINA = 210;
const MARGEM = 14;
const UTIL = LARGURA_PAGINA - MARGEM * 2;
const LIMITE_Y = 272;

/** Linhas intermediárias: montamos antes de desenhar para poder pular seções vazias. */
type Linha =
  | { t: "sub"; texto: string }
  | { t: "check"; texto: string }
  | { t: "campo"; label: string; valor: string }
  | { t: "paragrafo"; texto: string };

const formatarData = (iso: string) => {
  const [ano, mes, dia] = iso.split("-");
  return ano && mes && dia ? `${dia}/${mes}/${ano}` : iso;
};

const slug = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const linhasDoBloco = (bloco: Bloco, dados: DadosRequisicao): Linha[] => {
  switch (bloco.k) {
    case "texto": {
      const valor = dados.textos[bloco.id]?.trim();
      return valor ? [{ t: "campo", label: bloco.label, valor }] : [];
    }
    case "data": {
      const valor = dados.textos[bloco.id]?.trim();
      return valor ? [{ t: "campo", label: bloco.label, valor: formatarData(valor) }] : [];
    }
    case "radio": {
      const valor = dados.textos[bloco.id]?.trim();
      return valor ? [{ t: "check", texto: valor }] : [];
    }
    case "checks": {
      const marcadas = bloco.opcoes.filter((o) => dados.marcados[o.id]);
      if (marcadas.length === 0) return [];
      const linhas: Linha[] = marcadas.map((o) => ({ t: "check", texto: o.label }));
      return bloco.titulo ? [{ t: "sub", texto: bloco.titulo }, ...linhas] : linhas;
    }
    case "dentes": {
      const lista = dados.dentes[bloco.id] ?? [];
      return lista.length > 0
        ? [{ t: "campo", label: bloco.titulo, valor: lista.join(", ") }]
        : [];
    }
    case "textarea": {
      const valor = dados.textos[bloco.id]?.trim();
      return valor ? [{ t: "paragrafo", texto: valor }] : [];
    }
  }
};

const linhasDaSecao = (secao: Secao, dados: DadosRequisicao): Linha[] =>
  secao.blocos.flatMap((bloco) => linhasDoBloco(bloco, dados));

const nomeArquivo = (dados: DadosRequisicao) => {
  const nome = dados.textos.nome?.trim();
  return nome ? `requisicao-${slug(nome)}.pdf` : "requisicao-visiodonto.pdf";
};

/** Proporção da logo em public/visiodonto-logo.png (700 × 169), gerada por scripts/gerar-assets-pdf.mjs. */
const LOGO_LARGURA = 54;
const LOGO_ALTURA = LOGO_LARGURA * (169 / 700);

/**
 * Lê a logo como data URI para embutir no PDF. Devolve null se algo falhar —
 * nesse caso o cabeçalho cai no fallback em texto.
 */
const carregarLogo = async (): Promise<string | null> => {
  try {
    const resposta = await fetch("/visiodonto-logo.png");
    if (!resposta.ok) return null;
    const bytes = new Uint8Array(await resposta.arrayBuffer());
    let binario = "";
    for (const byte of bytes) binario += String.fromCharCode(byte);
    return `data:image/png;base64,${btoa(binario)}`;
  } catch {
    return null;
  }
};

/** Monta o documento. Separado do download para poder ser gerado fora do navegador. */
const montarRequisicaoPdf = async (dados: DadosRequisicao, logo: string | null = null) => {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });

  let y = 0;

  const novaPagina = () => {
    doc.addPage();
    y = MARGEM + 6;
  };

  const garantirEspaco = (altura: number) => {
    if (y + altura > LIMITE_Y) novaPagina();
  };

  const cabecalho = () => {
    doc.setFillColor(...TEAL);
    doc.rect(0, 0, LARGURA_PAGINA, 30, "F");

    doc.setTextColor(255, 255, 255);
    if (logo) {
      doc.addImage(logo, "PNG", MARGEM, 7.5, LOGO_LARGURA, LOGO_ALTURA, "logo", "SLOW");
    } else {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(21);
      doc.text(CLINICA.nome, MARGEM, 15);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(6);
      doc.text(CLINICA.subtitulo.split("").join(" "), MARGEM, 19.5);
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text(`${CLINICA.email}   ${CLINICA.instagram}`, MARGEM, 25.5);

    const dir = LARGURA_PAGINA - MARGEM;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(CLINICA.telefone, dir, 12, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(CLINICA.endereco, dir, 17.5, { align: "right" });
    doc.text(CLINICA.complemento, dir, 21.5, { align: "right" });
    doc.text(CLINICA.cep, dir, 25.5, { align: "right" });
  };

  const barraSecao = (titulo: string) => {
    garantirEspaco(16);
    doc.setFillColor(...TEAL);
    doc.rect(MARGEM, y, UTIL, 6, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text(titulo.toUpperCase(), MARGEM + 3, y + 4.2);
    y += 10;
  };

  const campo = (label: string, valor: string, x: number, largura: number) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(...CINZA);
    doc.text(label.toUpperCase(), x, y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(...ESCURO);
    const linhas = doc.splitTextToSize(valor, largura) as string[];
    doc.text(linhas, x, y + 4.5);

    const altura = 4.5 + linhas.length * 4.2;
    doc.setDrawColor(225, 225, 225);
    doc.setLineWidth(0.2);
    doc.line(x, y + altura - 1, x + largura, y + altura - 1);
    return altura + 3;
  };

  const itemMarcado = (texto: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const linhas = doc.splitTextToSize(texto, UTIL - 6) as string[];
    garantirEspaco(linhas.length * 4.3 + 2);

    doc.setFillColor(...TEAL);
    doc.roundedRect(MARGEM, y - 2.7, 3.3, 3.3, 0.6, 0.6, "F");
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.4);
    doc.line(MARGEM + 0.9, y - 1.2, MARGEM + 1.5, y - 0.5);
    doc.line(MARGEM + 1.5, y - 0.5, MARGEM + 2.5, y - 2.1);

    doc.setTextColor(...ESCURO);
    doc.text(linhas, MARGEM + 5.5, y);
    y += linhas.length * 4.3 + 0.8;
  };

  const subtitulo = (texto: string) => {
    garantirEspaco(10);
    y += 1.5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...TEAL);
    doc.text(texto.toUpperCase(), MARGEM, y);
    y += 4.5;
  };

  const paragrafo = (texto: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...ESCURO);
    const linhas = doc.splitTextToSize(texto, UTIL) as string[];
    garantirEspaco(linhas.length * 4.3);
    doc.text(linhas, MARGEM, y);
    y += linhas.length * 4.3 + 1;
  };

  // ---------- Página 1: cabeçalho e identificação ----------
  cabecalho();
  y = 40;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...ESCURO);
  doc.text("Requisição de exames", MARGEM, y);
  y += 9;

  const larguraDados = UTIL - 62;
  const topoIdentificacao = y;

  y += campo("Nome do paciente", dados.textos.nome?.trim() || "—", MARGEM, larguraDados);
  const yDrData = y;
  const alturaDr = campo("Dr(a)", dados.textos.dr?.trim() || "—", MARGEM, larguraDados / 2 - 4);
  y = yDrData;
  const alturaData = campo(
    "Data",
    dados.textos.data ? formatarData(dados.textos.data) : "—",
    MARGEM + larguraDados / 2 + 4,
    larguraDados / 2 - 4
  );
  y = yDrData + Math.max(alturaDr, alturaData);
  y += campo("Finalidade do exame", dados.textos.finalidade?.trim() || "—", MARGEM, larguraDados);

  // Caixa de carimbo/assinatura, à direita do bloco de identificação
  doc.setDrawColor(...CINZA);
  doc.setLineWidth(0.3);
  doc.roundedRect(LARGURA_PAGINA - MARGEM - 56, topoIdentificacao - 4, 56, 34, 2, 2, "S");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...CINZA);
  doc.text("Carimbo | Assinatura", LARGURA_PAGINA - MARGEM - 28, topoIdentificacao + 2, {
    align: "center",
  });
  doc.setDrawColor(200, 200, 200);
  doc.line(LARGURA_PAGINA - MARGEM - 50, topoIdentificacao + 24, LARGURA_PAGINA - MARGEM - 6, topoIdentificacao + 24);

  y = Math.max(y, topoIdentificacao + 34) + 4;

  if (dados.marcados.enviarRequisicao) itemMarcado("Enviar requisição");

  y += 2;

  // ---------- Demais seções ----------
  for (const secao of SECOES) {
    if (secao.id === "identificacao") continue;

    const linhas = linhasDaSecao(secao, dados);
    if (linhas.length === 0) continue;

    barraSecao(secao.titulo);

    if (secao.nota) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7.5);
      doc.setTextColor(...CINZA);
      const notaLinhas = doc.splitTextToSize(secao.nota, UTIL) as string[];
      doc.text(notaLinhas, MARGEM, y);
      y += notaLinhas.length * 3.6 + 3;
    }

    for (const linha of linhas) {
      if (linha.t === "sub") subtitulo(linha.texto);
      else if (linha.t === "check") itemMarcado(linha.texto);
      else if (linha.t === "paragrafo") paragrafo(linha.texto);
      else y += campo(linha.label, linha.valor, MARGEM, UTIL);
    }

    y += 4;
  }

  // ---------- Informações ao paciente ----------
  barraSecao("Informações ao paciente");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...ESCURO);
  for (const info of INFORMACOES_PACIENTE) {
    const linhas = doc.splitTextToSize(`–  ${info}`, UTIL) as string[];
    garantirEspaco(linhas.length * 4);
    doc.text(linhas, MARGEM, y);
    y += linhas.length * 4;
  }

  // ---------- Rodapé em todas as páginas ----------
  const totalPaginas = doc.getNumberOfPages();
  const geradoEm = new Date().toLocaleDateString("pt-BR");
  for (let p = 1; p <= totalPaginas; p++) {
    doc.setPage(p);
    doc.setDrawColor(...TEAL);
    doc.setLineWidth(0.4);
    doc.line(MARGEM, 283, LARGURA_PAGINA - MARGEM, 283);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...CINZA);
    doc.text(`${CLINICA.site}  ·  ${CLINICA.telefone}  ·  gerada em ${geradoEm}`, MARGEM, 288);
    doc.text(`Página ${p} de ${totalPaginas}`, LARGURA_PAGINA - MARGEM, 288, { align: "right" });
  }

  return doc;
};

export const gerarRequisicaoPdf = async (dados: DadosRequisicao) => {
  const doc = await montarRequisicaoPdf(dados, await carregarLogo());
  doc.save(nomeArquivo(dados));
};
