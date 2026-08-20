"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const INTERVALO = 5000;

interface CarrosselProps {
  fotos: string[];
  className?: string;
}

export const Carrossel = ({ fotos, className = "" }: CarrosselProps) => {
  const [index, setIndex] = useState(0);
  const [pausado, setPausado] = useState(false);
  // Só monta as <Image> das fotos já alcançadas, para não baixar as 14 de uma vez
  const [maxCarregado, setMaxCarregado] = useState(1);
  const touchX = useRef<number | null>(null);

  const total = fotos.length;

  const irPara = useCallback(
    (i: number) => {
      const proximo = (i + total) % total;
      setIndex(proximo);
      setMaxCarregado((m) => Math.max(m, proximo + 1));
    },
    [total]
  );

  const anterior = useCallback(() => irPara(index - 1), [irPara, index]);
  const proximo = useCallback(() => irPara(index + 1), [irPara, index]);

  useEffect(() => {
    if (pausado) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setIndex((i) => {
        const n = (i + 1) % total;
        setMaxCarregado((m) => Math.max(m, n + 1));
        return n;
      });
    }, INTERVALO);

    return () => window.clearInterval(timer);
  }, [pausado, total]);

  return (
    <div
      className={`group/carrossel relative rounded-3xl overflow-hidden shadow-lg ${className}`}
      role="region"
      aria-roledescription="carrossel"
      aria-label="Fotos da Visiodonto"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          anterior();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          proximo();
        }
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 50) {
          if (delta < 0) proximo();
          else anterior();
        }
        touchX.current = null;
      }}
    >
      {/* Trilho */}
      <div className="aspect-[4/3] overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {fotos.map((foto, i) => (
            <div
              key={foto}
              className="relative w-full h-full shrink-0"
              aria-hidden={i !== index}
            >
              {i < maxCarregado && (
                <Image
                  src={foto}
                  alt={`Visiodonto — foto ${i + 1} de ${total}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Setas */}
      <button
        type="button"
        onClick={anterior}
        aria-label="Foto anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#333333] hover:text-[#00798a] flex items-center justify-center shadow-md backdrop-blur-sm transition-all duration-300 opacity-0 group-hover/carrossel:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00798a]"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={proximo}
        aria-label="Próxima foto"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#333333] hover:text-[#00798a] flex items-center justify-center shadow-md backdrop-blur-sm transition-all duration-300 opacity-0 group-hover/carrossel:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00798a]"
      >
        <ChevronRight size={20} />
      </button>

      {/* Degradê para dar contraste aos indicadores */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />

      {/* Indicadores */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 px-4">
        {fotos.map((foto, i) => (
          <button
            key={foto}
            type="button"
            onClick={() => irPara(i)}
            aria-label={`Ir para a foto ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              i === index
                ? "w-5 bg-white"
                : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
