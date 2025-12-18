import { memo, useState } from "react";
import { MessageCircle, X } from "lucide-react";

interface WhatsAppContact {
  name: string;
  phone: string;
  message: string;
}

const contacts: WhatsAppContact[] = [
  {
    name: "Davi",
    phone: "5531999364057",
    message: "Olá Davi, quero impulsionar meu negócio... 🚀"
  },
  {
    name: "João Layon",
    phone: "5531995281707",
    message: "Olá João, quero impulsionar meu negócio... 🚀"
  }
];

export const WhatsAppWidget = memo(function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = (phone: string, message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Items */}
      <div
        className={`flex flex-col gap-3 mb-4 transition-all duration-300 overflow-hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {contacts.map((contact, index) => (
          <button
            key={index}
            onClick={() => handleWhatsAppClick(contact.phone, contact.message)}
            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
            data-testid={`whatsapp-contact-${index}`}
            style={{
              animation: isOpen ? `slideIn 0.3s ease-out ${index * 0.1}s both` : "none"
            }}
          >
            <MessageCircle size={18} />
            <span className="font-medium">{contact.name}</span>
          </button>
        ))}
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 ${
          isOpen ? "scale-110" : "scale-100"
        }`}
        data-testid="whatsapp-button"
        aria-label="Abrir WhatsApp"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
});
