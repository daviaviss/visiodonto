"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Exames", href: "#exames" },
  { label: "Curiosidades", href: "#curiosidades" },
  { label: "Contato", href: "#contato" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#00798a] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#inicio">
          <img src="/visiodonto.svg" alt="Visiodonto" className="h-11" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#consultar"
            className="flex items-center gap-2 bg-white text-[#00798a] hover:bg-white/90 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Search size={15} />
            Consultar Exames
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-[#00798a] border-t border-white/10 px-4 flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="text-white text-sm transition-all duration-300"
            style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#consultar"
          className="bg-white text-[#00798a] text-sm font-semibold px-4 py-2 rounded-lg text-center transition-colors"
          onClick={() => setOpen(false)}
        >
          Consultar Exames
        </a>
      </div>
    </header>
  );
}
