import { Search } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#00798a]"
    >

      {/* Scanner line */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)",
          boxShadow: "0 0 12px 4px rgba(255,255,255,0.15), 0 0 40px 8px rgba(255,255,255,0.05)",
          animation: "scanner 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />
      {/* Glow trail */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: "80px",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.03), transparent)",
          animation: "scanner 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          marginTop: "-40px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="flex flex-col items-start gap-6 lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Imagens precisas para{" "}
              <span className="text-white">diagnósticos confiáveis</span>
            </h1>

            <p className="text-lg text-white max-w-xl">
              Laudos e imagens qualificadas com entrega digital e acesso online, para dentistas e pacientes.
              Agende sua consulta conosco através dos nossos canais de atendimento.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
              <a
                href="#consultar"
                className="flex items-center justify-center gap-2 bg-white text-[#00798a] hover:bg-white/90 active:scale-95 font-semibold px-6 py-3 rounded-xl transition-all duration-200 sm:flex-[2]"
              >
                <Search size={18} />
                Exames e Requisição
              </a>
              <a
                href="#contato"
                className="flex items-center justify-center gap-2 border border-white/40 hover:border-white hover:bg-white/10 active:scale-95 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 sm:flex-1"
              >
                Contato
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:flex items-center justify-center order-1 lg:order-2">
            {/* Sonar rings — sempre centrados no ícone */}
            <div className="absolute inset-0 flex items-center justify-center lg:scale-100">
              {[460, 600, 740, 880, 1020].map((size) => (
                <div
                  key={size}
                  className="absolute rounded-full border border-white/[0.07] pointer-events-none"
                  style={{ width: size, height: size }}
                />
              ))}
            </div>
            <img src="/dente.svg" alt="Ícone Visiodonto" className="relative w-full max-w-md" />
          </div>
        </div>
      </div>
    </section>
  );
};
