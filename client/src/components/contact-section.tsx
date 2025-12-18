import { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface WhatsAppContact {
  name: string;
  phone: string;
  message: string;
}

const whatsappContacts: WhatsAppContact[] = [
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

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contactButtonsRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const whatsappMenuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const isAnimating = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    gsap.set(headerRef.current, { opacity: 0, y: 30 });
    gsap.set(cardRef.current, { opacity: 0, y: 35 });
    gsap.set(footerRef.current, { opacity: 0, y: 15 });

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(() => {
          if (entry.isIntersecting) {
            if (isAnimating.current) {
              gsap.killTweensOf([headerRef.current, cardRef.current, footerRef.current]);
              if (contactButtonsRef.current) gsap.killTweensOf(contactButtonsRef.current.querySelectorAll('.contact-button'));
              if (infoCardsRef.current) gsap.killTweensOf(infoCardsRef.current.querySelectorAll('.info-card'));
            }
            
            isAnimating.current = true;
            const tl = gsap.timeline({ 
              defaults: { ease: "power2.out", force3D: true },
              onComplete: () => { isAnimating.current = false; }
            });

            tl.to(headerRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              overwrite: "auto"
            });

            tl.to(cardRef.current, { 
              opacity: 1, 
              y: 0, 
              duration: 0.6,
              overwrite: "auto"
            }, "-=0.4");

            if (contactButtonsRef.current) {
              const buttons = contactButtonsRef.current.querySelectorAll('.contact-button');
              tl.fromTo(buttons,
                { opacity: 0, y: 20 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.5,
                  stagger: { each: 0.08 },
                  overwrite: "auto"
                },
                "-=0.3"
              );
            }

            if (infoCardsRef.current) {
              const cards = infoCardsRef.current.querySelectorAll('.info-card');
              tl.fromTo(cards,
                { opacity: 0, y: 18 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.4,
                  stagger: { each: 0.06, from: "center" },
                  overwrite: "auto"
                },
                "-=0.2"
              );
            }

            tl.to(footerRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              overwrite: "auto"
            }, "-=0.15");

            setIsVisible(true);
          } else {
            if (isAnimating.current) {
              gsap.killTweensOf([headerRef.current, cardRef.current, footerRef.current]);
              if (contactButtonsRef.current) gsap.killTweensOf(contactButtonsRef.current.querySelectorAll('.contact-button'));
              if (infoCardsRef.current) gsap.killTweensOf(infoCardsRef.current.querySelectorAll('.info-card'));
            }
            
            isAnimating.current = true;
            
            gsap.to(headerRef.current, {
              opacity: 0,
              y: 20,
              duration: 0.3,
              ease: "power2.in",
              force3D: true,
              overwrite: "auto"
            });

            gsap.to(cardRef.current, { 
              opacity: 0, 
              y: 25, 
              duration: 0.3, 
              ease: "power2.in", 
              force3D: true,
              overwrite: "auto"
            });

            if (contactButtonsRef.current) {
              const buttons = contactButtonsRef.current.querySelectorAll('.contact-button');
              gsap.to(buttons, {
                opacity: 0,
                y: 15,
                duration: 0.2,
                stagger: { each: 0.02, from: "end" },
                ease: "power2.in",
                overwrite: "auto"
              });
            }

            if (infoCardsRef.current) {
              const cards = infoCardsRef.current.querySelectorAll('.info-card');
              gsap.to(cards, {
                opacity: 0,
                y: 12,
                duration: 0.2,
                stagger: { each: 0.015, from: "end" },
                ease: "power2.in",
                overwrite: "auto"
              });
            }

            gsap.to(footerRef.current, {
              opacity: 0,
              y: 10,
              duration: 0.2,
              ease: "power2.in",
              overwrite: "auto",
              onComplete: () => { isAnimating.current = false; }
            });

            setIsVisible(false);
          }
        }, 60);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -100px 0px" });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      gsap.killTweensOf([headerRef.current, cardRef.current, footerRef.current]);
      if (contactButtonsRef.current) gsap.killTweensOf(contactButtonsRef.current.querySelectorAll('.contact-button'));
      if (infoCardsRef.current) gsap.killTweensOf(infoCardsRef.current.querySelectorAll('.info-card'));
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const handleWhatsAppClick = () => {
    setWhatsappOpen(!whatsappOpen);
    
    if (!whatsappOpen && whatsappMenuRef.current && !prefersReducedMotion) {
      const items = whatsappMenuRef.current.querySelectorAll('.whatsapp-menu-item');
      gsap.killTweensOf(items);
      gsap.fromTo(items,
        { opacity: 0, y: 10, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.3,
          stagger: { each: 0.1 },
          ease: "back.out"
        }
      );
    }
  };

  const handleWhatsAppContact = (phone: string, message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setWhatsappOpen(false);
  };

  const baseOpacity = prefersReducedMotion ? 1 : undefined;

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="py-20 lg:py-28 relative"
      data-testid="section-contact"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div ref={headerRef} style={{ opacity: baseOpacity }}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-ultra text-sm mb-6 shine-sweep">
              <i className="fas fa-envelope gold-text-glow"></i>
              <span className="text-white/90">Entre em Contato</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Vamos transformar sua{" "}
              <span className="gold-text-glow">ideia em realidade</span>
            </h2>
            
            <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
              Entre em contato agora e receba uma consultoria gratuita. 
              Nossa equipe está pronta para entender suas necessidades e 
              apresentar a melhor solução para seu negócio.
            </p>
          </div>

          <div 
            ref={cardRef} 
            className="glass-card-enhanced shine-sweep p-8 md:p-12 aurora-glow"
            style={{ opacity: baseOpacity }}
          >
            <div ref={contactButtonsRef} className="spotlight-cards grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleWhatsAppClick}
                  className="contact-button spotlight-card group w-full flex items-center justify-center gap-4 p-6 rounded-xl glass-ultra border border-green-500/30 hover:border-green-500/50 transition-all inner-light"
                  data-testid="button-whatsapp-contact"
                >
                  <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <i className="fab fa-whatsapp text-green-500 text-2xl"></i>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold text-lg">WhatsApp</div>
                    <div className="text-white/60 text-sm">Resposta em minutos</div>
                  </div>
                  <i className="fas fa-arrow-right text-green-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"></i>
                </button>

                {/* Cascata Menu - Below Card */}
                {whatsappOpen && (
                  <div
                    ref={whatsappMenuRef}
                    className="flex flex-col gap-2"
                  >
                    {whatsappContacts.map((contact, index) => (
                      <button
                        key={index}
                        onClick={() => handleWhatsAppContact(contact.phone, contact.message)}
                        className="whatsapp-menu-item flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-all duration-200 shadow-lg w-full"
                        data-testid={`whatsapp-contact-${index}`}
                      >
                        <i className="fab fa-whatsapp text-lg"></i>
                        <span className="font-medium">{contact.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="mailto:contato@digitalsolutions.com.br"
                className="contact-button spotlight-card group flex items-center justify-center gap-4 p-6 rounded-xl glass-ultra border border-[#FFD700]/30 hover:border-[#FFD700]/50 transition-all inner-light"
                data-testid="button-email-contact"
              >
                <div className="w-14 h-14 rounded-full bg-[#FFD700]/20 flex items-center justify-center group-hover:scale-110 transition-transform gold-glow">
                  <i className="fas fa-envelope gold-text-glow text-2xl"></i>
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold text-lg">E-mail</div>
                  <div className="text-white/60 text-sm">contato@digitalsolutions.com.br</div>
                </div>
                <i className="fas fa-arrow-right text-[#FFD700] ml-auto opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </a>
            </div>

            <div className="border-t border-white/10 pt-8">
              <div ref={infoCardsRef} className="spotlight-cards grid-cols-3 gap-6 text-center">
                <div className="info-card spotlight-card glass-ultra p-4 rounded-xl">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[#FFD700]/10 flex items-center justify-center mb-3 gold-glow">
                    <i className="fas fa-clock gold-text-glow"></i>
                  </div>
                  <div className="text-white font-medium">Atendimento</div>
                  <div className="text-white/50 text-sm">Seg-Sex 9h-18h</div>
                </div>
                <div className="info-card spotlight-card glass-ultra p-4 rounded-xl">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[#FFD700]/10 flex items-center justify-center mb-3 gold-glow">
                    <i className="fas fa-headset gold-text-glow"></i>
                  </div>
                  <div className="text-white font-medium">Suporte</div>
                  <div className="text-white/50 text-sm">24/7 via WhatsApp</div>
                </div>
                <div className="info-card spotlight-card glass-ultra p-4 rounded-xl">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[#FFD700]/10 flex items-center justify-center mb-3 gold-glow">
                    <i className="fas fa-globe gold-text-glow"></i>
                  </div>
                  <div className="text-white font-medium">Atendemos</div>
                  <div className="text-white/50 text-sm">Todo o Brasil</div>
                </div>
              </div>
            </div>
          </div>

          <div ref={footerRef} className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/40 text-sm" style={{ opacity: baseOpacity }}>
            <div className="flex items-center gap-2">
              <i className="fas fa-dollar-sign gold-text-glow"></i>
              Orçamento sem compromisso
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-bolt gold-text-glow"></i>
              Resposta em até 2h
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-handshake gold-text-glow"></i>
              Consultoria gratuita
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const MemoizedContactSection = memo(ContactSection);
