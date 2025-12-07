import { Link } from "wouter";
import { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

import sitesProfissionaisImg from "@assets/generated_images/professional_website_design_concept.png";
import ecommerceImg from "@assets/generated_images/e-commerce_online_store_concept.png";
import landingPagesImg from "@assets/generated_images/landing_page_conversion_concept.png";
import identidadeVisualImg from "@assets/generated_images/brand_identity_design_concept.png";
import criativosIaImg from "@assets/generated_images/ai_creative_content_concept.png";
import trafegoPagoImg from "@assets/generated_images/paid_traffic_advertising_concept.png";
import automacaoImg from "@assets/generated_images/business_automation_chatbot_concept.png";
import paginasVendasImg from "@assets/generated_images/sales_page_conversion_concept.png";
import sistemasPersonalizadosImg from "@assets/generated_images/custom_software_systems_concept.png";
import consultoriaDigitalImg from "@assets/generated_images/digital_consulting_strategy_concept.png";
import presencaOnlineImg from "@assets/generated_images/online_presence_setup_concept.png";

const services = [
  {
    id: "sites-profissionais",
    icon: "fas fa-globe",
    title: "Sites Profissionais",
    description: "Desenvolvimento de sites modernos, responsivos e otimizados para converter visitantes em clientes.",
    features: ["Design Responsivo", "SEO Otimizado", "Alta Performance"],
    image: sitesProfissionaisImg
  },
  {
    id: "e-commerce",
    icon: "fas fa-shopping-cart",
    title: "E-commerce",
    description: "Lojas virtuais completas com sistemas de pagamento, gestão de estoque e experiência de compra fluida.",
    features: ["Múltiplos Pagamentos", "Gestão de Estoque", "Checkout Otimizado"],
    image: ecommerceImg
  },
  {
    id: "landing-pages",
    icon: "fas fa-rocket",
    title: "Landing Pages",
    description: "Páginas de alta conversão projetadas para campanhas de marketing e captação de leads.",
    features: ["Alta Conversão", "A/B Testing", "Carregamento Rápido"],
    image: landingPagesImg
  },
  {
    id: "identidade-visual",
    icon: "fas fa-paint-brush",
    title: "Identidade Visual",
    description: "Branding completo com logo, paleta de cores, tipografia e manual de marca profissional.",
    features: ["Logo Design", "Manual de Marca", "Papelaria Completa"],
    image: identidadeVisualImg
  },
  {
    id: "criativos-ia",
    icon: "fas fa-wand-magic-sparkles",
    title: "Criativos com IA",
    description: "Criação de artes, thumbnails, posts e materiais para redes sociais utilizando inteligência artificial.",
    features: ["Artes para Ads", "Thumbnails", "Posts Sociais"],
    image: criativosIaImg
  },
  {
    id: "trafego-pago",
    icon: "fas fa-chart-line",
    title: "Tráfego Pago",
    description: "Gestão profissional de campanhas no Google Ads, Facebook Ads, Instagram e outras plataformas.",
    features: ["Google Ads", "Meta Ads", "Relatórios Detalhados"],
    image: trafegoPagoImg
  },
  {
    id: "automacao",
    icon: "fas fa-robot",
    title: "Automação",
    description: "Chatbots inteligentes e automação de processos para escalar seu atendimento e operações.",
    features: ["Chatbots", "Fluxos Automáticos", "Integrações"],
    image: automacaoImg
  },
  {
    id: "paginas-vendas",
    icon: "fas fa-file-invoice-dollar",
    title: "Páginas de Vendas",
    description: "Páginas persuasivas focadas em vendas com copywriting estratégico e design que converte.",
    features: ["Copywriting", "Design Persuasivo", "Gatilhos Mentais"],
    image: paginasVendasImg
  },
  {
    id: "sistemas-personalizados",
    icon: "fas fa-cogs",
    title: "Sistemas Personalizados",
    description: "Desenvolvimento de sistemas sob medida para otimizar processos do seu negócio local.",
    features: ["Sob Medida", "Escalável", "Suporte Dedicado"],
    image: sistemasPersonalizadosImg
  },
  {
    id: "consultoria-digital",
    icon: "fas fa-lightbulb",
    title: "Consultoria Digital",
    description: "Análise estratégica e plano de ação personalizado para posicionar sua marca no digital.",
    features: ["Diagnóstico", "Plano de Ação", "Mentoria"],
    image: consultoriaDigitalImg
  },
  {
    id: "presenca-online",
    icon: "fas fa-share-nodes",
    title: "Presença Online",
    description: "Setup completo da sua presença digital: Google Meu Negócio, redes sociais e diretórios.",
    features: ["Google Meu Negócio", "Redes Sociais", "SEO Local"],
    image: presencaOnlineImg
  }
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isAnimating = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    if (!cardsRef.current || !headerRef.current) return;

    const header = headerRef.current;
    const cards = cardsRef.current.querySelectorAll('.service-card');
    
    gsap.set(header, { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 40 });

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(() => {
          if (entry.isIntersecting) {
            if (isAnimating.current) {
              gsap.killTweensOf(header);
              gsap.killTweensOf(cards);
            }
            
            isAnimating.current = true;
            
            gsap.to(header, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              force3D: true,
              overwrite: "auto"
            });

            gsap.to(cards, { 
              opacity: 1, 
              y: 0, 
              duration: 0.5, 
              stagger: {
                each: 0.04,
                from: "start"
              },
              ease: "power2.out",
              force3D: true,
              delay: 0.15,
              overwrite: "auto",
              onComplete: () => { isAnimating.current = false; }
            });
            
            setIsVisible(true);
          } else {
            if (isAnimating.current) {
              gsap.killTweensOf(header);
              gsap.killTweensOf(cards);
            }
            
            isAnimating.current = true;
            
            gsap.to(header, {
              opacity: 0,
              y: 20,
              duration: 0.3,
              ease: "power2.in",
              force3D: true,
              overwrite: "auto"
            });

            gsap.to(cards, { 
              opacity: 0, 
              y: 25, 
              duration: 0.25, 
              stagger: {
                each: 0.015,
                from: "end"
              },
              ease: "power2.in",
              force3D: true,
              overwrite: "auto",
              onComplete: () => { isAnimating.current = false; }
            });
            
            setIsVisible(false);
          }
        }, 60);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -100px 0px" });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      gsap.killTweensOf(header);
      gsap.killTweensOf(cards);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const baseOpacity = prefersReducedMotion ? 1 : undefined;

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="py-20 lg:py-28 relative bg-gradient-to-b from-transparent via-black/50 to-transparent"
      data-testid="section-services"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div ref={headerRef} className="text-center mb-16" style={{ opacity: baseOpacity }}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-ultra text-sm mb-6">
            <i className="fas fa-th-large gold-text-glow"></i>
            <span className="text-white/90">Nossos Serviços</span>
          </div>
          <h2 className="section-title text-white">
            Soluções Digitais <span className="gold-text-glow">Completas</span>
          </h2>
          <p className="section-subtitle">
            Oferecemos um portfólio completo de serviços para impulsionar sua presença digital 
            e transformar seu negócio em uma máquina de resultados.
          </p>
        </div>

        <div ref={cardsRef} className="spotlight-cards grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/servico/${service.id}`}
              className="group service-card spotlight-card"
              style={{ opacity: baseOpacity }}
              data-testid={`service-card-${service.id}`}
            >
              <div className="glass-card-enhanced shine-sweep h-full flex flex-col inner-light overflow-hidden">
                <div className="relative h-36 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 service-icon-small group-hover:scale-110 transition-transform duration-300">
                    <i className={`${service.icon} text-[#FFD700] text-lg`}></i>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed mb-4 flex-grow">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-full glass-ultra text-[#FFD700]/80 border border-[#FFD700]/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-[#FFD700] text-sm font-medium group-hover:gap-3 gap-2 transition-all">
                    <span>Saiba mais</span>
                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export const MemoizedServicesSection = memo(ServicesSection);
export { services };
