import { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const features = [
  {
    icon: "fas fa-bullseye",
    title: "Foco em Resultados",
    description: "Cada projeto é desenvolvido com métricas claras de sucesso"
  },
  {
    icon: "fas fa-palette",
    title: "Design Premium",
    description: "Interfaces modernas que encantam e convertem visitantes"
  },
  {
    icon: "fas fa-code",
    title: "Tecnologia de Ponta",
    description: "Stack moderna garantindo performance e escalabilidade"
  },
  {
    icon: "fas fa-headset",
    title: "Suporte Contínuo",
    description: "Acompanhamento dedicado após a entrega do projeto"
  }
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isAnimating = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    gsap.set(contentRef.current, { opacity: 0, x: -50 });
    gsap.set(statsRef.current, { opacity: 0, x: 50 });

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(() => {
          if (entry.isIntersecting) {
            if (isAnimating.current) {
              gsap.killTweensOf([contentRef.current, statsRef.current]);
              if (featuresRef.current) {
                gsap.killTweensOf(featuresRef.current.querySelectorAll('.feature-card'));
              }
            }
            
            isAnimating.current = true;
            const tl = gsap.timeline({ 
              defaults: { ease: "power2.out", force3D: true },
              onComplete: () => { isAnimating.current = false; }
            });

            tl.to(contentRef.current, { 
              opacity: 1, 
              x: 0, 
              duration: 0.7,
              overwrite: "auto"
            });

            tl.to(statsRef.current, { 
              opacity: 1, 
              x: 0, 
              duration: 0.7,
              overwrite: "auto"
            }, "-=0.5");

            if (featuresRef.current) {
              const featureCards = featuresRef.current.querySelectorAll('.feature-card');
              tl.fromTo(featureCards,
                { opacity: 0, y: 25 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.5,
                  stagger: { each: 0.06 },
                  overwrite: "auto"
                },
                "-=0.4"
              );
            }

            setIsVisible(true);
          } else {
            if (isAnimating.current) {
              gsap.killTweensOf([contentRef.current, statsRef.current]);
              if (featuresRef.current) {
                gsap.killTweensOf(featuresRef.current.querySelectorAll('.feature-card'));
              }
            }
            
            isAnimating.current = true;
            
            gsap.to(contentRef.current, { 
              opacity: 0, 
              x: -30, 
              duration: 0.35, 
              ease: "power2.in", 
              force3D: true,
              overwrite: "auto",
              onComplete: () => { isAnimating.current = false; }
            });
            
            gsap.to(statsRef.current, { 
              opacity: 0, 
              x: 30, 
              duration: 0.35, 
              ease: "power2.in", 
              force3D: true,
              overwrite: "auto"
            });

            if (featuresRef.current) {
              const featureCards = featuresRef.current.querySelectorAll('.feature-card');
              gsap.to(featureCards, {
                opacity: 0,
                y: 15,
                duration: 0.25,
                stagger: { each: 0.02, from: "end" },
                ease: "power2.in",
                overwrite: "auto"
              });
            }
            
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
      gsap.killTweensOf([contentRef.current, statsRef.current]);
      if (featuresRef.current) {
        gsap.killTweensOf(featuresRef.current.querySelectorAll('.feature-card'));
      }
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const baseOpacity = prefersReducedMotion || isVisible ? 1 : 0;

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="py-20 lg:py-28 relative"
      data-testid="section-about"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div 
            ref={contentRef} 
            className="order-2 lg:order-1"
            style={{ opacity: prefersReducedMotion ? 1 : undefined }}
          >
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-ultra shine-sweep text-sm mb-6 ${prefersReducedMotion ? '' : 'floating-motion-slow'}`}>
              <i className="fas fa-info-circle gold-text-glow"></i>
              <span className="text-white/90">Sobre Nós</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Sua parceira em{" "}
              <span className="text-gradient-glow">transformação digital</span>
            </h2>
            
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              A Digital Soluctions é uma agência digital completa, especializada em 
              criar soluções que conectam marcas ao sucesso online. Com mais de 15 anos 
              de experiência, entregamos projetos que combinam design impactante, 
              tecnologia robusta e estratégia inteligente.
            </p>
            
            <p className="text-white/60 leading-relaxed mb-8">
              Nossa equipe multidisciplinar trabalha lado a lado com cada cliente, 
              entendendo suas necessidades específicas e desenvolvendo soluções 
              personalizadas que geram resultados mensuráveis. Do conceito à execução, 
              cuidamos de cada detalhe.
            </p>

            <div ref={featuresRef} className="spotlight-cards grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card spotlight-card flex items-start gap-4 p-4 rounded-xl glass-ultra shine-sweep inner-light specular-highlight"
                  data-testid={`about-feature-${index}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0 gold-glow">
                    <i className={`${feature.icon} gold-text-glow text-sm`}></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            ref={statsRef} 
            className="order-1 lg:order-2 relative"
            style={{ opacity: prefersReducedMotion ? 1 : undefined }}
          >
            <div className="relative">
              <div className="glass-card-enhanced stat-card-graph shine-sweep p-8 md:p-12 aurora-glow specular-highlight">
                <div className="graph-line">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path className="graph-glow" d="M0,85 L8,82 L15,78 L22,80 L28,72 L35,68 L42,70 L48,58 L55,52 L62,55 L68,42 L75,35 L82,38 L88,25 L95,18 L100,12" />
                    <path d="M0,85 L8,82 L15,78 L22,80 L28,72 L35,68 L42,70 L48,58 L55,52 L62,55 L68,42 L75,35 L82,38 L88,25 L95,18 L100,12" />
                  </svg>
                </div>
                <div className="spotlight-cards grid-cols-2 gap-6 relative z-10">
                  <div className={`spotlight-card text-center p-6 rounded-xl glass-ultra inner-light ${prefersReducedMotion ? '' : 'floating-motion'}`} style={{ animationDelay: '0s' }} data-testid="stat-card-projetos">
                    <div className="text-4xl md:text-5xl font-bold text-gradient-glow mb-2">500+</div>
                    <div className="text-white/60 text-sm">Projetos Concluídos</div>
                  </div>
                  <div className={`spotlight-card text-center p-6 rounded-xl glass-ultra inner-light ${prefersReducedMotion ? '' : 'floating-motion'}`} style={{ animationDelay: '0.3s' }} data-testid="stat-card-anos">
                    <div className="text-4xl md:text-5xl font-bold text-gradient-glow mb-2">15+</div>
                    <div className="text-white/60 text-sm">Anos no Mercado</div>
                  </div>
                  <div className={`spotlight-card text-center p-6 rounded-xl glass-ultra inner-light ${prefersReducedMotion ? '' : 'floating-motion'}`} style={{ animationDelay: '0.6s' }} data-testid="stat-card-especialistas">
                    <div className="text-4xl md:text-5xl font-bold text-gradient-glow mb-2">50+</div>
                    <div className="text-white/60 text-sm">Especialistas</div>
                  </div>
                  <div className={`spotlight-card text-center p-6 rounded-xl glass-ultra inner-light ${prefersReducedMotion ? '' : 'floating-motion'}`} style={{ animationDelay: '0.9s' }} data-testid="stat-card-satisfacao">
                    <div className="text-4xl md:text-5xl font-bold text-gradient-glow mb-2">98%</div>
                    <div className="text-white/60 text-sm">Satisfação</div>
                  </div>
                </div>
              </div>
              
              <div 
                className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 rounded-tr-3xl hidden md:block"
                style={{ borderColor: 'rgba(255, 200, 0, 0.4)' }}
              />
              <div 
                className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 rounded-bl-3xl hidden md:block"
                style={{ borderColor: 'rgba(255, 200, 0, 0.4)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const MemoizedAboutSection = memo(AboutSection);
