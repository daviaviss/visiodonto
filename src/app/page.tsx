import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Sobre } from "@/components/Sobre";
import { Exames } from "@/components/Exames";
import { Curiosidades } from "@/components/Curiosidades";
import { ConsultarExames } from "@/components/ConsultarExames";
import { Contato } from "@/components/Contato";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { CustomCursor } from "@/components/CustomCursor";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <FadeIn><Sobre /></FadeIn>
        <FadeIn delay={50}><Exames /></FadeIn>
        <FadeIn delay={50}><Curiosidades /></FadeIn>
        <FadeIn delay={50}><ConsultarExames /></FadeIn>
        <FadeIn delay={50}><Contato /></FadeIn>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
