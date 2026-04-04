export const Footer = () => {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-[#00798a] border-t border-white/10 py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:grid sm:grid-cols-3 items-center gap-3 sm:gap-0">
        <img src="/visiodonto.svg" alt="Visiodonto" className="h-8" />
        <p className="text-white text-xs text-center">
          © {ano} Visiodonto. Todos os direitos reservados.
        </p>
        <p className="text-white text-xs sm:text-right text-center">
          Desenvolvido por{" "}
          <a href="https://daviaviss.me" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80 transition-opacity">
            daviaviss.me
          </a>
        </p>
      </div>
    </footer>
  );
}
