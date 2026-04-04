import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export const Contato = () => {
  return (
    <section id="contato" className="pt-24 pb-0 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-[#00798a] text-sm font-semibold uppercase tracking-widest">
            Contato
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-[#333333]">
            Fale conosco
          </h2>
          <p className="mt-4 text-[#757575]">
            Estamos prontos para atender você e responder suas dúvidas.
          </p>
        </div>

        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
          {[
            { icon: Phone, label: "Telefone", value: "(48) 99133-0992", href: "tel:+5548991330992" },
            { icon: MessageCircle, label: "WhatsApp", value: "(48) 99133-0992", href: "https://wa.me/5548991330992" },
            { icon: Mail, label: "E-mail", value: "atendimento@visiodonto.com", href: "mailto:atendimento@visiodonto.com" },
            { icon: Clock, label: "Horário", value: "Segunda a sexta, 8h30 – 18h30", href: null },
            { icon: MapPin, label: "Endereço", value: "Rod. Armando Calil Bulos, 5405 — Edf JC, Sala 201, Ingleses", href: "https://maps.google.com/?q=Rod.+Armando+Calil+Bulos,+5405,+Ingleses,+Florianópolis" },
          ].map((item, i) => {
            const Icon = item.icon;
            const inner = (
              <div className="group flex items-center gap-4 bg-white border border-slate-100 hover:border-[#00798a]/30 hover:shadow-md rounded-2xl px-6 py-4 transition-all duration-200 w-full">
                <div className="w-10 h-10 rounded-xl bg-[#00798a]/10 group-hover:bg-[#00798a]/20 flex items-center justify-center shrink-0 transition-colors">
                  <Icon size={18} className="text-[#00798a]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs text-[#757575]">{item.label}</p>
                  <p className="text-sm font-semibold text-[#333333]">{item.value}</p>
                </div>
              </div>
            );

            return (
              <FadeIn key={item.label} delay={i * 70}>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div>{inner}</div>
                )}
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Mapa full width */}
      <div className="mt-24 w-full h-[380px]">
        <iframe
          title="Localização Visiodonto"
          src="https://maps.google.com/maps?q=Visiodonto+Radiologia+Odontologica+Ingleses+Florianopolis&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
