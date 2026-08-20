import { ShieldCheck, Leaf, Zap, HeartHandshake } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { Carrossel } from "@/components/Carrossel";

const fotos = Array.from({ length: 14 }, (_, i) => `/photo${i + 1}.jpeg`);

const valores = [
  {
    icon: Zap,
    title: "Tecnologia de ponta",
    description: "Equipamentos de última geração para imagens de alta resolução e diagnósticos precisos.",
  },
  {
    icon: Leaf,
    title: "Processo ecológico",
    description: "100% digital — sem reveladores químicos tóxicos, sem resíduos, sem impacto ambiental.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança do paciente",
    description: "Radiografia digital reduz a exposição à radiação em até 70% em comparação ao método analógico.",
  },
  {
    icon: HeartHandshake,
    title: "Atendimento humanizado",
    description: "Equipe atenciosa e comprometida com o conforto e a experiência de cada paciente.",
  },
];

export const Sobre = () => {
  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Carrossel de fotos */}
          <Carrossel fotos={fotos} className="lg:order-first order-last" />

          {/* Text + cards */}
          <div className="lg:order-last order-first">
            <span className="text-[#00798a] text-sm font-semibold uppercase tracking-widest">
              Sobre nós
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#333333] leading-tight">
              Um pouco da nossa história
            </h2>
            <p className="mt-5 text-[#757575] leading-relaxed">
              A Visiodonto nasceu em junho de 2021 com a missão de oferecer imagens
              odontológicas de alta qualidade para profissionais e pacientes do norte de
              Florianópolis.
            </p>
            <p className="mt-4 text-[#757575] leading-relaxed">
              Trabalhamos com tecnologia digital de ponta, garantindo laudos precisos,
              entrega rápida e acesso online aos exames — tanto para dentistas quanto para
              pacientes.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {valores.map((v, i) => {
                const Icon = v.icon;
                return (
                  <FadeIn key={v.title} delay={i * 100}>
                  <div
                    className="group p-4 rounded-2xl bg-[#f4fafb] hover:bg-[#00798a]/10 border border-transparent hover:border-[#00798a]/20 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#757575]/10 group-hover:bg-[#00798a]/15 flex items-center justify-center mb-2 transition-colors duration-300">
                      <Icon size={18} className="text-[#757575] group-hover:text-[#00798a] transition-colors duration-300" />
                    </div>
                    <h3 className="font-semibold text-sm text-[#333333] leading-relaxed transition-colors duration-300">{v.title}</h3>
                    <p className="mt-1 text-xs text-[#757575] leading-relaxed transition-colors duration-300">
                      {v.description}
                    </p>
                  </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
