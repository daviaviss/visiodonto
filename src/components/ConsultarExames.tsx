"use client";

import { UserRound, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

const ToothIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 3C7.5 3 5 4 5 7C5 9 5.5 10.5 6 12C6.5 13.5 6.5 15 6 18C5.8 19.2 6.5 21 8 21C9 21 9.5 20 10 18.5C10.5 17 11 16 12 16C13 16 13.5 17 14 18.5C14.5 20 15 21 16 21C17.5 21 18.2 19.2 18 18C17.5 15 17.5 13.5 18 12C18.5 10.5 19 9 19 7C19 4 16.5 3 15 3C13.5 3 13 4 12 4C11 4 10.5 3 9 3Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
      fill="none"
    />
  </svg>
);

export const ConsultarExames = () => {
  return (
    <section id="consultar" className="py-24 bg-[#f4fafb] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {/* Ícone de radiação — superior direito */}
        <svg viewBox="0 0 200 200" className="absolute -top-24 -right-24 w-[500px] h-[500px] text-[#00798a] opacity-[0.07]" fill="currentColor">
          <circle cx="100" cy="100" r="14" />
          <path d="M 79 63.6 A 42 42 0 0 1 121 63.6 L 145 22.1 A 90 90 0 0 0 55 22.1 Z" />
          <path d="M 79 63.6 A 42 42 0 0 1 121 63.6 L 145 22.1 A 90 90 0 0 0 55 22.1 Z" transform="rotate(120 100 100)" />
          <path d="M 79 63.6 A 42 42 0 0 1 121 63.6 L 145 22.1 A 90 90 0 0 0 55 22.1 Z" transform="rotate(240 100 100)" />
        </svg>
        {/* Ícone de radiação — inferior esquerdo */}
        <svg viewBox="0 0 200 200" className="absolute -bottom-24 -left-24 w-[420px] h-[420px] text-[#00798a] opacity-[0.07]" fill="currentColor">
          <circle cx="100" cy="100" r="14" />
          <path d="M 79 63.6 A 42 42 0 0 1 121 63.6 L 145 22.1 A 90 90 0 0 0 55 22.1 Z" />
          <path d="M 79 63.6 A 42 42 0 0 1 121 63.6 L 145 22.1 A 90 90 0 0 0 55 22.1 Z" transform="rotate(120 100 100)" />
          <path d="M 79 63.6 A 42 42 0 0 1 121 63.6 L 145 22.1 A 90 90 0 0 0 55 22.1 Z" transform="rotate(240 100 100)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-[#00798a] text-sm font-semibold uppercase tracking-widest">
            Consultar exames
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#333333]">
            Acesso rápido aos seus exames
          </h2>
          <p className="mt-4 text-[#757575] max-w-md mx-auto">
            Imagens e laudos a qualquer hora, de qualquer lugar.
            Sem precisar ligar ou ir até a clínica.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch">
          {/* Paciente */}
          <FadeIn delay={0} className="h-full">
            <a
              href="https://exames.image2doc.com.br/#/login/protocolo"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-6 p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full bg-white border border-[#00798a]/20"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#00798a]/10">
                <UserRound size={28} className="text-[#00798a]" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-xl font-bold text-[#333333]">Área do Paciente</h3>
                <p className="text-sm leading-relaxed text-[#757575]">Visualize seus exames e laudos com segurança, de qualquer dispositivo.</p>
              </div>
              <div className="flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3 rounded-xl bg-[#00798a] hover:bg-[#005f6e] text-white transition-colors">
                Acessar como paciente
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </FadeIn>

          {/* Dentista */}
          <FadeIn delay={150} className="h-full">
            <a
              href="https://central.image2doc.com.br/login"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-6 p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full bg-white border border-[#00798a]/20"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#00798a]/10">
                <ToothIcon className="w-7 h-7 text-[#00798a]" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="text-xl font-bold text-[#333333]">Área do Dentista</h3>
                <p className="text-sm leading-relaxed text-[#757575]">Acesse os exames dos seus pacientes com agilidade e praticidade.</p>
              </div>
              <div className="flex items-center justify-center gap-2 font-semibold text-sm px-5 py-3 rounded-xl bg-[#00798a] hover:bg-[#005f6e] text-white transition-colors">
                Acessar como dentista
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
