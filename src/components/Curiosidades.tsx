import { FadeIn } from "@/components/FadeIn";

const curiosidades = [
  {
    numero: "01",
    titulo: "Radiação mínima",
    texto:
      "A radiografia digital reduz a exposição do paciente à radiação em até 70% em relação aos filmes convencionais, tornando os exames muito mais seguros.",
  },
  {
    numero: "02",
    titulo: "Sem químicos tóxicos",
    texto:
      "O processo digital elimina completamente o uso de reveladores e fixadores químicos, que são prejudiciais ao meio ambiente e exigem descarte especial.",
  },
  {
    numero: "03",
    titulo: "Imagem instantânea",
    texto:
      "Com a radiografia digital, a imagem fica disponível em segundos, agilizando o diagnóstico e eliminando o tempo de espera para revelação.",
  },
  {
    numero: "04",
    titulo: "Acesso online",
    texto:
      "Dentistas e pacientes acessam as imagens de qualquer lugar, de forma segura e imediata, sem precisar ir à clínica buscar filmes físicos.",
  },
  {
    numero: "05",
    titulo: "Tomografia Cone Beam",
    texto:
      "A tomografia 3D (CBCT) gera imagens volumétricas com alta resolução e dosagem de radiação muito inferior à de tomógrafos médicos convencionais.",
  },
  {
    numero: "06",
    titulo: "Planejamento cirúrgico",
    texto:
      "Com o escaneamento 3D e a impressão de modelos, é possível planejar implantes, cirurgias e ortodontia com precisão milimétrica antes do procedimento.",
  },
];

export const Curiosidades = () => {
  return (
    <section id="curiosidades" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-[#00798a] text-sm font-semibold uppercase tracking-widest">
            Curiosidades
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#333333]">
            Você sabia?
          </h2>
          <p className="mt-4 text-[#757575] max-w-lg mx-auto">
            A radiologia odontológica vai muito além de tirar fotos dos dentes.
            Saiba mais sobre essa tecnologia.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {curiosidades.map((c, i) => (
            <FadeIn key={c.numero} delay={i * 80} className="h-full">
            <div
              className="group p-6 rounded-2xl border border-slate-100 hover:border-[#00798a]/30 hover:shadow-md transition-all h-full"
            >
              <span className="text-4xl font-black text-[#00798a]/15 group-hover:text-[#00798a]/30 transition-colors leading-none">
                {c.numero}
              </span>
              <h3 className="mt-3 font-bold text-[#333333]">{c.titulo}</h3>
              <p className="mt-2 text-sm text-[#757575] leading-relaxed">{c.texto}</p>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
