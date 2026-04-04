import { ScanLine, Box, FileText, Scan } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

const categorias = [
  {
    icon: ScanLine,
    title: "Radiografias 2D",
    description: "Alta definição, baixa dose de radiação.",
    itens: [
      "Panorâmica",
      "Periapical",
      "Interproximal (bite-wing)",
      "Telerradiografia",
      "Oclusal",
      "Mão e punho",
    ],
  },
  {
    icon: Box,
    title: "Tomografia 3D",
    description: "Cone Beam de alta resolução para diagnósticos complexos.",
    itens: [
      "Tomografia de arco completo",
      "Tomografia segmentar",
      "Reconstrução 3D interativa",
      "Planejamento de implantes",
    ],
  },
  {
    icon: FileText,
    title: "Documentação Ortodôntica",
    description: "Pacotes personalizados conforme necessidade do profissional.",
    itens: [
      "Pacote ortod. completo",
      "Pacote ortod. reduzido",
      "Análise cefalométrica",
      "Montagem em articulador",
    ],
  },
  {
    icon: Scan,
    title: "Escaneamento 3D e Impressão",
    description: "Do digital ao físico com precisão.",
    itens: [
      "Escaneamento de arco dental",
      "Impressão em resina",
      "Impressão em filamento",
      "Modelos de estudo digitais",
    ],
  },
];

export const Exames = () => {
  return (
    <section id="exames" className="py-24 bg-[#f4fafb]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-[#00798a] text-sm font-semibold uppercase tracking-widest">
            Exames
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#333333]">
            Exames e procedimentos
          </h2>
          <p className="mt-4 text-[#757575] max-w-xl mx-auto">
            Tecnologia completa para atender dentistas e pacientes com agilidade,
            precisão e acesso digital imediato.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {categorias.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <FadeIn key={cat.title} delay={i * 100} className="h-full">
              <div
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4 h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00798a] flex items-center justify-center">
                  <Icon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#333333]">{cat.title}</h3>
                  <p className="text-xs text-[#757575] mt-1">{cat.description}</p>
                </div>
                <ul className="flex flex-col gap-1.5 mt-auto">
                  {cat.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[#757575]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00798a] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
