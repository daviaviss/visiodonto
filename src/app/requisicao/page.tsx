import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { RequisicaoForm } from "@/components/RequisicaoForm";

export const metadata: Metadata = {
  title: "Requisição de exames — Visiodonto",
  description:
    "Preencha a requisição de exames da Visiodonto online e baixe o PDF pronto para carimbar e assinar.",
};

export default function RequisicaoPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="bg-[#f4fafb] pb-16">
        <header className="bg-[#00798a] pb-20 pt-28 text-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <span className="text-sm font-semibold uppercase tracking-widest text-white/70">
              Para dentistas
            </span>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Requisição de exames</h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/85">
              Preencha os campos abaixo e baixe a requisição em PDF, pronta para carimbar e
              assinar. Nada é enviado pela internet — o arquivo é gerado no seu próprio
              navegador.
            </p>
            <p className="mt-4 text-sm text-white/70">
              Prefere preencher à mão?{" "}
              <a
                href="/requisicao-em-branco.pdf"
                download
                className="underline hover:text-white"
              >
                Baixe a requisição em branco (PDF)
              </a>
            </p>
          </div>
        </header>

        <div className="mx-auto -mt-12 max-w-5xl px-4 sm:px-6">
          <RequisicaoForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
