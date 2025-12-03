import { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const solutions = [
  {
    icon: "fas fa-chess",
    title: "Estratégia",
    description: "Planejamento completo alinhado aos seus objetivos de negócio"
  },
  {
    icon: "fas fa-pencil-ruler",
    title: "Design",
    description: "Interfaces modernas e experiências que encantam usuários"
  },
  {
    icon: "fas fa-microchip",
    title: "Tecnologia",
    description: "Desenvolvimento com as melhores ferramentas do mercado"
  },
  {
    icon: "fas fa-sliders",
    title: "Setup",
    description: "Configuração completa e integração de todas as plataformas"
  },
  {
    icon: "fas fa-life-ring",
    title: "Suporte",
    description: "Atendimento dedicado para resolver qualquer questão"
  },
  {
    icon: "fas fa-eye",
    title: "Acompanhamento",
    description: "Monitoramento contínuo de métricas e performance"
  },
  {
    icon: "fas fa-chart-pie",
    title: "Otimização",
    description: "Melhorias constantes baseadas em dados e resultados"
  }
];

export function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const solutionItemsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isAnimating = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    gsap.set(leftRef.current, { opacity: 0, x: -50 });
    gsap.set(rightRef.current, { opacity: 0, x: 50 });

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(() => {
          if (entry.isIntersecting) {
            if (isAnimating.current) {
              gsap.killTweensOf([leftRef.current, rightRef.current]);
              if (solutionItemsRef.current) {
                gsap.killTweensOf(solutionItemsRef.current.querySelectorAll('.solution-item'));
              }
            }
            
            isAnimating.current = true;
            const tl = gsap.timeline({ 
              defaults: { ease: "power2.out", force3D: true },
              onComplete: () => { isAnimating.current = false; }
            });

            tl.to(leftRef.current, { 
              opacity: 1, 
              x: 0, 
              duration: 0.7,
              overwrite: "auto"
            });

            tl.to(rightRef.current, { 
              opacity: 1, 
              x: 0, 
              duration: 0.7,
              overwrite: "auto"
            }, "-=0.5");

            if (solutionItemsRef.current) {
              const items = solutionItemsRef.current.querySelectorAll('.solution-item');
              tl.fromTo(items,
                { opacity: 0, x: -20 },
                { 
                  opacity: 1, 
                  x: 0, 
                  duration: 0.4,
                  stagger: { each: 0.06 },
                  overwrite: "auto"
                },
                "-=0.4"
              );
            }

            setIsVisible(true);
          } else {
            if (isAnimating.current) {
              gsap.killTweensOf([leftRef.current, rightRef.current]);
              if (solutionItemsRef.current) {
                gsap.killTweensOf(solutionItemsRef.current.querySelectorAll('.solution-item'));
              }
            }
            
            isAnimating.current = true;
            
            gsap.to(leftRef.current, { 
              opacity: 0, 
              x: -30, 
              duration: 0.3, 
              ease: "power2.in", 
              force3D: true,
              overwrite: "auto",
              onComplete: () => { isAnimating.current = false; }
            });
            
            gsap.to(rightRef.current, { 
              opacity: 0, 
              x: 30, 
              duration: 0.3, 
              ease: "power2.in", 
              force3D: true,
              overwrite: "auto"
            });

            if (solutionItemsRef.current) {
              const items = solutionItemsRef.current.querySelectorAll('.solution-item');
              gsap.to(items, {
                opacity: 0,
                x: -15,
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
      gsap.killTweensOf([leftRef.current, rightRef.current]);
      if (solutionItemsRef.current) {
        gsap.killTweensOf(solutionItemsRef.current.querySelectorAll('.solution-item'));
      }
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const baseOpacity = prefersReducedMotion ? 1 : undefined;

  return (
    <section
      ref={sectionRef}
      id="solucoes"
      className="py-20 lg:py-28 relative"
      data-testid="section-solutions"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div ref={leftRef} style={{ opacity: baseOpacity }}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-ultra shine-sweep text-sm mb-6">
              <i className="fas fa-layer-group gold-text-glow"></i>
              <span className="text-white/90">Soluções Completas</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Tudo que você precisa em{" "}
              <span className="gold-text-glow">um só lugar</span>
            </h2>
            
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Entregamos projetos completos do início ao fim. Não apenas criamos, 
              mas acompanhamos, otimizamos e garantimos que sua solução digital 
              continue gerando resultados a longo prazo.
            </p>

            <div ref={solutionItemsRef} className="glass-card-enhanced shine-sweep p-6 specular-highlight">
              <div className="grid grid-cols-1 gap-4">
                {solutions.slice(0, 4).map((solution, index) => (
                  <div
                    key={index}
                    className="solution-item flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-[#FFD700]/10 transition-all group gold-shimmer"
                    data-testid={`solution-item-${index}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-colors gold-glow">
                      <i className={`${solution.icon} gold-text-glow text-lg`}></i>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold group-hover:text-[#FFD700] transition-colors">{solution.title}</h4>
                      <p className="text-white/60 text-sm">{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div ref={rightRef} className="relative" style={{ opacity: baseOpacity }}>
            <div className="glass-card-enhanced shine-sweep p-8 relative overflow-visible aurora-glow">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#FFD700]/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#FFD700]/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center mb-4 gold-glow ${prefersReducedMotion ? '' : 'floating-motion'}`}>
                    <i className="fas fa-gem text-black text-3xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Entrega Premium</h3>
                  <p className="text-white/60">Do conceito ao resultado</p>
                </div>

                <div className="space-y-4">
                  {solutions.slice(4).map((solution, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl glass-ultra inner-light hover:border-[#FFD700]/30 transition-all group"
                      data-testid={`solution-feature-${index}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0 gold-glow">
                        <i className={`${solution.icon} gold-text-glow`}></i>
                      </div>
                      <div>
                        <h4 className="text-white font-medium group-hover:text-[#FFD700] transition-colors">{solution.title}</h4>
                        <p className="text-white/50 text-sm">{solution.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Garantia de satisfação</span>
                    <span className="gold-text-glow font-semibold">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const MemoizedSolutionsSection = memo(SolutionsSection);
