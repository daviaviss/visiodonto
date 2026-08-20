/**
 * Estrutura da requisição de exames da Visiodonto.
 *
 * A mesma especificação alimenta o formulário (RequisicaoForm) e o gerador de
 * PDF (requisicaoPdf), para que os dois nunca fiquem fora de sincronia.
 */

export type OpcaoCheck = { id: string; label: string };

export type Bloco =
  | { k: "texto"; id: string; label: string; largura?: "full" }
  | { k: "data"; id: string; label: string }
  | { k: "radio"; id: string; titulo?: string; opcoes: string[] }
  | { k: "checks"; titulo?: string; opcoes: OpcaoCheck[] }
  | { k: "dentes"; id: string; titulo: string; deciduos?: boolean }
  | { k: "textarea"; id: string; label: string };

export type Secao = {
  id: string;
  titulo: string;
  nota?: string;
  blocos: Bloco[];
};

export type DadosRequisicao = {
  textos: Record<string, string>;
  marcados: Record<string, boolean>;
  dentes: Record<string, string[]>;
};

export const DADOS_VAZIOS: DadosRequisicao = {
  textos: {},
  marcados: {},
  dentes: {},
};

/** Atalho para declarar opções cujo id é derivado do texto. */
const op = (prefixo: string, labels: string[]): OpcaoCheck[] =>
  labels.map((label, i) => ({ id: `${prefixo}-${i}`, label }));

export const ARCADAS = {
  permanentesSuperior: ["18", "17", "16", "15", "14", "13", "12", "11", "21", "22", "23", "24", "25", "26", "27", "28"],
  permanentesInferior: ["48", "47", "46", "45", "44", "43", "42", "41", "31", "32", "33", "34", "35", "36", "37", "38"],
  deciduosSuperior: ["55", "54", "53", "52", "51", "61", "62", "63", "64", "65"],
  deciduosInferior: ["85", "84", "83", "82", "81", "71", "72", "73", "74", "75"],
};

export const SECOES: Secao[] = [
  {
    id: "identificacao",
    titulo: "Identificação",
    blocos: [
      { k: "texto", id: "nome", label: "Nome do paciente", largura: "full" },
      { k: "texto", id: "dr", label: "Dr(a)" },
      { k: "data", id: "data", label: "Data" },
      { k: "texto", id: "finalidade", label: "Finalidade do exame", largura: "full" },
      { k: "checks", opcoes: [{ id: "enviarRequisicao", label: "Enviar requisição" }] },
    ],
  },
  {
    id: "resultado",
    titulo: "Resultado dos exames",
    nota: "Somos uma clínica de radiologia digital e sustentável. Todos os exames serão disponibilizados ao profissional cirurgião dentista e ao paciente em nosso site: www.visiodonto.com",
    blocos: [
      {
        k: "radio",
        id: "impressao",
        opcoes: ["Dispenso a impressão das imagens", "Prefiro versão impressa"],
      },
    ],
  },
  {
    id: "tomografia",
    titulo: "Tomografia computadorizada de alta resolução (Cone Beam)",
    blocos: [
      { k: "checks", opcoes: [{ id: "dicom", label: "Enviar DICOM" }] },
      {
        k: "checks",
        titulo: "Avaliação para implante",
        opcoes: [
          { id: "impMaxilaTotal", label: "Maxila — total" },
          { id: "impMandibulaTotal", label: "Mandíbula — total" },
        ],
      },
      { k: "texto", id: "impMaxilaArea", label: "Maxila — área específica" },
      { k: "texto", id: "impMandibulaArea", label: "Mandíbula — área específica" },
      {
        k: "checks",
        opcoes: op("tc", [
          "+ seios maxilares",
          "+ zigomático",
          "Fratura",
          "Lesão",
          "Reabsorção",
          "Canais",
          "Odontometria",
          "Exodontia",
          "Incluso",
          "Dento ósseo gengival",
          "Para remoção de enxerto",
          "Avaliação de patologia óssea",
        ]),
      },
      { k: "texto", id: "tcOutros", label: "Outros", largura: "full" },
      { k: "dentes", id: "dentesTc", titulo: "Dentes de interesse" },
      { k: "checks", titulo: "TC da guia/prótese", opcoes: op("tcGuia", ["Superior", "Inferior"]) },
      { k: "checks", titulo: "TC da ATM", opcoes: op("tcAtm", ["Máxima abertura", "Oclusão"]) },
      {
        k: "checks",
        titulo: "Documentação para cirurgia guiada",
        opcoes: op("cirurgiaGuiada", [
          "Superior",
          "Inferior",
          "Protocolo edêntulo: TC da arcada + TC da guia/prótese",
          "Protocolo com exodontia: TC da arcada + escaneamento (STL)",
          "Guiada parcial: TC da arcada + escaneamento (STL)",
        ]),
      },
      { k: "checks", titulo: "Recomendações", opcoes: op("recomendacao", ["Utilizar afastador labial"]) },
      { k: "checks", titulo: "Realizar a TC", opcoes: op("realizarTc", ["Oclusão", "Entreaberta"]) },
    ],
  },
  {
    id: "radiografias",
    titulo: "Radiografias",
    blocos: [
      {
        k: "checks",
        titulo: "Panorâmicas",
        opcoes: op("pan", ["Topo", "Oclusão", "Para implante", "Para seios maxilares"]),
      },
      { k: "checks", titulo: "Telerradiografia", opcoes: op("tele", ["Lateral", "Frontal"]) },
      {
        k: "checks",
        titulo: "ATM — imagem panorâmica",
        opcoes: op("atm", [
          "Projeção lateral em oclusão",
          "Projeção lat. em máxima abertura",
          "Projeção frontal",
        ]),
      },
      { k: "checks", titulo: "Oclusal", opcoes: op("oclusal", ["Superior", "Inferior"]) },
      { k: "checks", titulo: "Outros", opcoes: op("radOutros", ["Idade óssea"]) },
      {
        k: "checks",
        titulo: "Radiografias intraorais",
        opcoes: op("intra", ["Periapical", "Técnica de localização Clark", "Levantamento completo"]),
      },
      { k: "dentes", id: "dentesIntraorais", titulo: "Dentes das intraorais", deciduos: true },
      {
        k: "checks",
        titulo: "Interproximal",
        opcoes: op("interprox", ["Pré-molares D", "Pré-molares E", "Molares D", "Molares E"]),
      },
    ],
  },
  {
    id: "documentacao",
    titulo: "Personalize sua documentação",
    blocos: [
      { k: "texto", id: "docPersonalizada", label: "Doc. personalizada Dr(a)", largura: "full" },
      { k: "checks", opcoes: op("doc", ["Panorâmica", "Telerradiografia + traçado"]) },
      {
        k: "checks",
        titulo: "Análise cefalométrica",
        opcoes: op("cefalo", [
          "USP",
          "Ricketts",
          "MC Namara",
          "Ricketts frontal",
          "Jarabak",
          "Petrovic",
          "USP/UNICAMP",
        ]),
      },
      { k: "texto", id: "cefaloOutra", label: "Outra análise cefalométrica" },
      {
        k: "checks",
        titulo: "Fotos da face",
        opcoes: op("face", [
          "Frente",
          "Frente sorrindo",
          "Perfil D",
          "Perfil E",
          "Perfil inferior",
          "Perfil sorrindo",
          "Close sorrindo",
        ]),
      },
      {
        k: "checks",
        titulo: "Fotos intrabucais",
        opcoes: op("intrabucal", [
          "Frente",
          "Lateral D",
          "Lateral E",
          "Oclusais",
          "Overjet",
          "Over bite",
        ]),
      },
      { k: "checks", titulo: "Escaneamento iTero", opcoes: op("itero", ["Invisalign"]) },
      { k: "texto", id: "iteroOutros", label: "iTero — outros" },
      {
        k: "checks",
        titulo: "Impressão 3D",
        opcoes: op("impressao3d", ["Filamento (estudo)", "Resina (trabalho)"]),
      },
    ],
  },
  {
    id: "observacoes",
    titulo: "Observações",
    blocos: [{ k: "textarea", id: "observacoes", label: "Observações" }],
  },
];

export const CLINICA = {
  nome: "VISIODONTO",
  subtitulo: "RADIOLOGIA ODONTOLÓGICA",
  telefone: "48 9 9133.0992",
  endereco: "Rodovia Armando Calil Bulos, 5405 | Sala 201",
  complemento: "Ed. Empresarial JC | Ingleses | Florianópolis",
  cep: "SC | CEP: 88058-001",
  email: "atendimento@visiodonto.com",
  instagram: "@visiodontoradiologia",
  site: "www.visiodonto.com",
};

export const INFORMACOES_PACIENTE = [
  "Remover brincos, correntinhas e piercing;",
  "Para sua maior comodidade, favor marcar horário;",
  "Os orçamentos realizados através de telefone serão confirmados mediante apresentação da requisição.",
];
