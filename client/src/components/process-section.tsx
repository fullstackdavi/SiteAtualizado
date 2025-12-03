import { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const processSteps = [
  {
    number: "01",
    title: "Análise",
    description: "Diagnóstico completo do seu negócio, mercado e objetivos",
    icon: "fas fa-magnifying-glass-chart"
  },
  {
    number: "02",
    title: "Estruturação",
    description: "Planejamento detalhado da solução ideal para você",
    icon: "fas fa-sitemap"
  },
  {
    number: "03",
    title: "Design",
    description: "Criação visual com foco em experiência e conversão",
    icon: "fas fa-palette"
  },
  {
    number: "04",
    title: "Desenvolvimento",
    description: "Codificação com as melhores práticas do mercado",
    icon: "fas fa-code"
  },
  {
    number: "05",
    title: "Testes",
    description: "Validação rigorosa de todas as funcionalidades",
    icon: "fas fa-flask-vial"
  },
  {
    number: "06",
    title: "Entrega",
    description: "Publicação e configuração completa do projeto",
    icon: "fas fa-rocket"
  },
  {
    number: "07",
    title: "Suporte",
    description: "Acompanhamento contínuo e otimizações",
    icon: "fas fa-headset"
  }
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const mobileStepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isAnimating = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    gsap.set(headerRef.current, { opacity: 0, y: 30 });
    gsap.set(ctaRef.current, { opacity: 0, y: 20 });

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(() => {
          if (entry.isIntersecting) {
            if (isAnimating.current) {
              gsap.killTweensOf([headerRef.current, ctaRef.current]);
              if (stepsRef.current) gsap.killTweensOf(stepsRef.current.querySelectorAll('.process-step'));
              if (mobileStepsRef.current) gsap.killTweensOf(mobileStepsRef.current.querySelectorAll('.process-step-mobile'));
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

            if (stepsRef.current) {
              const steps = stepsRef.current.querySelectorAll('.process-step');
              tl.fromTo(steps,
                { opacity: 0, y: 35 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.5, 
                  stagger: {
                    each: 0.05
                  },
                  overwrite: "auto"
                },
                "-=0.3"
              );
            }

            if (mobileStepsRef.current) {
              const steps = mobileStepsRef.current.querySelectorAll('.process-step-mobile');
              tl.fromTo(steps,
                { opacity: 0, x: -30 },
                { 
                  opacity: 1, 
                  x: 0,
                  duration: 0.4, 
                  stagger: {
                    each: 0.06
                  },
                  overwrite: "auto"
                },
                "-=0.3"
              );
            }

            tl.to(ctaRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              overwrite: "auto"
            }, "-=0.2");

            setIsVisible(true);
          } else {
            if (isAnimating.current) {
              gsap.killTweensOf([headerRef.current, ctaRef.current]);
              if (stepsRef.current) gsap.killTweensOf(stepsRef.current.querySelectorAll('.process-step'));
              if (mobileStepsRef.current) gsap.killTweensOf(mobileStepsRef.current.querySelectorAll('.process-step-mobile'));
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

            if (stepsRef.current) {
              const steps = stepsRef.current.querySelectorAll('.process-step');
              gsap.to(steps, { 
                opacity: 0, 
                y: 20, 
                duration: 0.25, 
                stagger: {
                  each: 0.015,
                  from: "end"
                },
                ease: "power2.in",
                force3D: true,
                overwrite: "auto"
              });
            }

            if (mobileStepsRef.current) {
              const steps = mobileStepsRef.current.querySelectorAll('.process-step-mobile');
              gsap.to(steps, { 
                opacity: 0, 
                x: -20,
                duration: 0.2, 
                stagger: { each: 0.015, from: "end" },
                ease: "power2.in",
                force3D: true,
                overwrite: "auto"
              });
            }

            gsap.to(ctaRef.current, {
              opacity: 0,
              y: 15,
              duration: 0.25,
              ease: "power2.in",
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
      gsap.killTweensOf([headerRef.current, ctaRef.current]);
      if (stepsRef.current) gsap.killTweensOf(stepsRef.current.querySelectorAll('.process-step'));
      if (mobileStepsRef.current) gsap.killTweensOf(mobileStepsRef.current.querySelectorAll('.process-step-mobile'));
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const baseOpacity = prefersReducedMotion ? 1 : undefined;

  return (
    <section
      ref={sectionRef}
      id="processo"
      className="py-20 lg:py-28 relative overflow-hidden"
      data-testid="section-process"
    >
      <div className="absolute inset-0 grid-background opacity-30"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div ref={headerRef} className="text-center mb-16" style={{ opacity: baseOpacity }}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-ultra shine-sweep text-sm mb-6">
            <i className="fas fa-diagram-project gold-text-glow"></i>
            <span className="text-white/90">Nosso Processo</span>
          </div>
          <h2 className="section-title text-white">
            Como <span className="gold-text-glow">trabalhamos</span>
          </h2>
          <p className="section-subtitle">
            Um processo estruturado e transparente que garante resultados 
            excepcionais em cada etapa do projeto.
          </p>
        </div>

        <div ref={stepsRef} className="hidden xl:block relative mb-12">
          <div className="spotlight-cards grid-cols-7 gap-4">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="process-step spotlight-card group"
                style={{ opacity: baseOpacity }}
                data-testid={`process-step-${index}`}
              >
                <div className="relative z-10">
                  <div className="process-number group-hover:scale-110 transition-transform gold-glow">
                    {step.number}
                  </div>
                </div>
                <div className="glass-card-enhanced shine-sweep specular-highlight p-4 text-center mt-4 inner-light">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-[#FFD700]/10 flex items-center justify-center mb-3 gold-glow">
                    <i className={`${step.icon} gold-text-glow`}></i>
                  </div>
                  <h4 className="text-white font-semibold mb-1 group-hover:text-[#FFD700] transition-colors">{step.title}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={mobileStepsRef} className="xl:hidden">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700]/50 via-[#FFD700]/30 to-[#FFD700]/10"></div>
            
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="process-step-mobile relative pl-16"
                  style={{ opacity: baseOpacity }}
                  data-testid={`process-step-mobile-${index}`}
                >
                  <div className="absolute left-0 top-0">
                    <div className="process-number text-sm w-12 h-12 gold-glow">
                      {step.number}
                    </div>
                  </div>
                  <div className="glass-card-enhanced shine-sweep specular-highlight p-5 inner-light">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 flex items-center justify-center flex-shrink-0 gold-glow">
                        <i className={`${step.icon} gold-text-glow text-lg`}></i>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg mb-1">{step.title}</h4>
                        <p className="text-white/60 text-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={ctaRef} className="mt-16 text-center" style={{ opacity: baseOpacity }}>
          <p className="text-white/60 mb-6">
            Pronto para transformar sua presença digital?
          </p>
          <a
            href="#contato"
            className="btn-primary btn-glow ripple-effect inline-flex items-center gap-2"
            data-testid="button-process-cta"
          >
            <i className="fas fa-paper-plane"></i>
            Iniciar Meu Projeto
          </a>
        </div>
      </div>
    </section>
  );
}

export const MemoizedProcessSection = memo(ProcessSection);
