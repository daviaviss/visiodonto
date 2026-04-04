import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5548991330992"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 w-11 h-11 sm:w-14 sm:h-14 bg-[#00798a] hover:bg-[#005f6e] active:scale-95 rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={22} className="text-white sm:hidden" />
      <MessageCircle size={26} className="text-white hidden sm:block" />
    </a>
  );
};
