import { useEffect, useRef, useState, memo } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const benefits = [
  {
    icon: "fas fa-bolt",
    title: "Entrega Rápida",
    description: "Prazos cumpridos rigorosamente. Seu projeto online no menor tempo possível.",
    steps: [
      { icon: "fas fa-clock" },
      { icon: "fas fa-bolt" },
      { icon: "fas fa-rocket" }
    ]
  },
  {
    icon: "fas fa-comments",
    title: "Atendimento Direto",
    description: "Comunicação clara e direta. Sem intermediários, fale direto com quem faz.",
    steps: [
      { icon: "fas fa-headset" },
      { icon: "fas fa-comments" },
      { icon: "fas fa-thumbs-up" }
    ]
  },
  {
    icon: "fas fa-gauge-high",
    title: "Alta Performance",
    description: "Sites e sistemas otimizados para velocidade máxima e melhor experiência.",
    steps: [
      { icon: "fas fa-tachometer-alt" },
      { icon: "fas fa-gauge-high" },
      { icon: "fas fa-chart-line" }
    ]
  },
  {
    icon: "fas fa-fingerprint",
    title: "Personalização Total",
    description: "Cada projeto é único. Desenvolvemos exatamente o que seu negócio precisa.",
    steps: [
      { icon: "fas fa-palette" },
      { icon: "fas fa-fingerprint" },
      { icon: "fas fa-gem" }
    ]
  },
  {
    icon: "fas fa-ruler-combined",
    title: "Projetos Sob Medida",
    description: "Soluções customizadas que se adaptam perfeitamente às suas necessidades.",
    steps: [
      { icon: "fas fa-pencil-ruler" },
      { icon: "fas fa-ruler-combined" },
      { icon: "fas fa-check-circle" }
    ]
  },
  {
    icon: "fas fa-crown",
    title: "Padrão Premium",
    description: "Qualidade excepcional em cada detalhe. Nada menos que o melhor.",
    steps: [
      { icon: "fas fa-star" },
      { icon: "fas fa-crown" },
      { icon: "fas fa-trophy" }
    ]
  },
  {
    icon: "fas fa-bullseye-arrow",
    title: "Foco em Resultado",
    description: "Métricas claras e KPIs definidos. Trabalhamos para gerar retorno real.",
    steps: [
      { icon: "fas fa-crosshairs" },
      { icon: "fas fa-bullseye" },
      { icon: "fas fa-award" }
    ]
  }
];

interface Step {
  icon: string;
}

function AnimatedIconTimeline({ steps, isAnimating }: { steps: Step[]; isAnimating: boolean }) {
  const [activeStep, setActiveStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isAnimating) {
      setActiveStep(-1);
      setCompletedSteps([]);
      return;
    }

    const stepDelay = 600;
    const timeouts: NodeJS.Timeout[] = [];

    steps.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setActiveStep(index);
        if (index > 0) {
          setCompletedSteps(prev => [...prev, index - 1]);
        }
      }, index * stepDelay);
      timeouts.push(timeout);
    });

    const finalTimeout = setTimeout(() => {
      setCompletedSteps(prev => [...prev, steps.length - 1]);
    }, steps.length * stepDelay);
    timeouts.push(finalTimeout);

    const loopTimeout = setTimeout(() => {
      setActiveStep(-1);
      setCompletedSteps([]);
    }, (steps.length + 1) * stepDelay + 500);
    timeouts.push(loopTimeout);

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [isAnimating, steps.length]);

  useEffect(() => {
    if (!isAnimating) return;
    
    if (activeStep === -1 && completedSteps.length === 0) {
      const restartTimeout = setTimeout(() => {
        setActiveStep(0);
      }, 300);
      return () => clearTimeout(restartTimeout);
    }
  }, [activeStep, completedSteps, isAnimating]);

  return (
    <div className="flex items-center justify-center gap-1.5">
      {steps.map((step, index) => {
        const isActive = activeStep === index;
        const isCompleted = completedSteps.includes(index);
        const isVisible = activeStep >= index;
        
        return (
          <div key={index} className="flex items-center">
            <motion.div
              className="flex flex-col items-center relative"
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0, y: 10, rotateY: -90 }}
              animate={isVisible ? { 
                opacity: 1, 
                scale: isActive ? 1.15 : 1, 
                y: 0,
                rotateY: 0 
              } : { 
                opacity: 0, 
                scale: 0, 
                y: 10,
                rotateY: -90 
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                ease: [0.34, 1.56, 0.64, 1],
                scale: {
                  duration: 0.25,
                  ease: "easeOut"
                }
              }}
            >
              {isActive && !isCompleted && (
                <motion.div
                  className="absolute inset-0 w-9 h-9 -top-0.5 -left-0.5 rounded-lg bg-white/10 blur-md"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              
              {isCompleted && (
                <motion.div
                  className="absolute inset-0 w-9 h-9 -top-0.5 -left-0.5 rounded-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.3, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: "radial-gradient(circle, #FFD700 0%, transparent 70%)",
                  }}
                />
              )}
              
              <motion.div 
                className={`w-9 h-9 rounded-lg flex items-center justify-center border-2 relative overflow-hidden ${
                  isCompleted 
                    ? 'bg-[#FFD700] border-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.5)]' 
                    : isActive 
                      ? 'bg-black/80 border-[#FFD700]/40 shadow-[0_0_10px_rgba(255,215,0,0.2)]' 
                      : 'bg-black/60 border-[#FFD700]/20'
                }`}
                animate={isActive && !isCompleted ? {
                  borderColor: ["rgba(255,215,0,0.4)", "rgba(255,215,0,0.7)", "rgba(255,215,0,0.4)"],
                } : {}}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {isActive && !isCompleted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
                
                <motion.i 
                  className={`${step.icon} text-sm relative z-10 ${
                    isCompleted ? 'text-black' : 'gold-text-glow'
                  }`}
                  animate={isActive && !isCompleted ? {
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0],
                  } : {}}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
            
            {index < steps.length - 1 && (
              <div className="flex items-center mx-1 relative">
                <motion.div
                  className="w-5 h-0.5 bg-[#FFD700]/20 rounded-full overflow-hidden relative"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
                  animate={isVisible ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.3,
                    delay: prefersReducedMotion ? 0 : 0.15,
                    ease: "easeOut",
                  }}
                  style={{ originX: 0 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FFD700] to-[#FFD700]/50 rounded-full"
                    initial={{ x: "-100%" }}
                    animate={completedSteps.includes(index) ? { x: "0%" } : { x: "-100%" }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>
                
                <motion.div
                  className="mx-0.5"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -3 }}
                  animate={completedSteps.includes(index) ? { opacity: 1, x: 0 } : { opacity: 0.4, x: -3 }}
                  transition={{
                    duration: 0.25,
                    delay: 0.15,
                  }}
                >
                  <motion.i 
                    className={`fas fa-chevron-right text-[8px] ${
                      completedSteps.includes(index) ? 'gold-text-glow' : 'text-[#FFD700]/40'
                    }`}
                    animate={activeStep === index + 1 ? {
                      x: [0, 2, 0],
                      opacity: [1, 0.7, 1],
                    } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AnimatedBenefitCard({ benefit, index, baseOpacity }: { benefit: typeof benefits[0]; index: number; baseOpacity: number | undefined }) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="benefit-card spotlight-card glass-card-enhanced shine-sweep specular-highlight p-6 group cursor-pointer"
      style={{ opacity: baseOpacity }}
      data-testid={`benefit-card-${index}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="min-h-[56px] mb-4 flex items-center">
        <AnimatePresence mode="wait">
          {isHovered && !prefersReducedMotion ? (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, scale: 0.8, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -5 }}
              transition={{ 
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="w-full"
            >
              <AnimatedIconTimeline steps={benefit.steps} isAnimating={isHovered} />
            </motion.div>
          ) : (
            <motion.div
              key="static"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 0.25,
                ease: "easeOut"
              }}
              className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/5 flex items-center justify-center gold-glow group-hover:scale-110 transition-transform"
            >
              <i className={`${benefit.icon} gold-text-glow text-xl`}></i>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
        {benefit.title}
      </h3>
      <p className="text-white/60 text-sm leading-relaxed">
        {benefit.description}
      </p>
    </div>
  );
}

export function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isAnimating = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    gsap.set(headerRef.current, { opacity: 0, y: 30 });
    gsap.set(statsRef.current, { opacity: 0, y: 35 });

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (debounceTimer) clearTimeout(debounceTimer);
        
        debounceTimer = setTimeout(() => {
          if (entry.isIntersecting) {
            if (isAnimating.current) {
              gsap.killTweensOf([headerRef.current, statsRef.current]);
              if (cardsRef.current) gsap.killTweensOf(cardsRef.current.querySelectorAll('.benefit-card'));
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

            if (cardsRef.current) {
              const cards = cardsRef.current.querySelectorAll('.benefit-card');
              tl.fromTo(cards,
                { opacity: 0, y: 35 },
                { 
                  opacity: 1, 
                  y: 0, 
                  duration: 0.5, 
                  stagger: {
                    each: 0.04
                  },
                  overwrite: "auto"
                },
                "-=0.3"
              );
            }

            tl.to(statsRef.current, { 
              opacity: 1, 
              y: 0, 
              duration: 0.6,
              overwrite: "auto"
            }, "-=0.2");

            setIsVisible(true);
          } else {
            if (isAnimating.current) {
              gsap.killTweensOf([headerRef.current, statsRef.current]);
              if (cardsRef.current) gsap.killTweensOf(cardsRef.current.querySelectorAll('.benefit-card'));
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

            if (cardsRef.current) {
              const cards = cardsRef.current.querySelectorAll('.benefit-card');
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
                overwrite: "auto"
              });
            }

            gsap.to(statsRef.current, { 
              opacity: 0, 
              y: 20, 
              duration: 0.25, 
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
      gsap.killTweensOf([headerRef.current, statsRef.current]);
      if (cardsRef.current) gsap.killTweensOf(cardsRef.current.querySelectorAll('.benefit-card'));
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const baseOpacity = prefersReducedMotion ? 1 : undefined;

  return (
    <section
      ref={sectionRef}
      id="porque-escolher"
      className="py-20 lg:py-28 relative bg-gradient-to-b from-transparent via-black/50 to-transparent"
      data-testid="section-why-choose"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div ref={headerRef} className="text-center mb-16" style={{ opacity: baseOpacity }}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-ultra shine-sweep text-sm mb-6">
            <i className="fas fa-star gold-text-glow"></i>
            <span className="text-white/90">Diferenciais</span>
          </div>
          <h2 className="section-title text-white">
            Por que escolher a{" "}
            <span className="gold-text-glow">Digital Soluctions?</span>
          </h2>
          <p className="section-subtitle">
            Mais do que uma agência, somos parceiros estratégicos comprometidos 
            com o sucesso do seu projeto digital.
          </p>
        </div>

        <div ref={cardsRef} className="spotlight-cards grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <AnimatedBenefitCard
              key={index}
              benefit={benefit}
              index={index}
              baseOpacity={baseOpacity}
            />
          ))}
        </div>

        <div 
          ref={statsRef} 
          className="mt-16 glass-card-enhanced shine-sweep p-8 md:p-12 aurora-glow specular-highlight"
          style={{ opacity: baseOpacity }}
        >
          <div className="spotlight-cards grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className={`spotlight-card p-6 rounded-xl glass-ultra ${prefersReducedMotion ? '' : 'floating-motion'}`} style={{ animationDelay: '0s' }}>
              <div className="text-5xl md:text-6xl font-bold text-gradient-glow mb-2">100%</div>
              <div className="text-white/70">Projetos Entregues no Prazo</div>
            </div>
            <div className={`spotlight-card p-6 rounded-xl glass-ultra ${prefersReducedMotion ? '' : 'floating-motion'}`} style={{ animationDelay: '0.5s' }}>
              <div className="text-5xl md:text-6xl font-bold text-gradient-glow mb-2">24h</div>
              <div className="text-white/70">Tempo Médio de Resposta</div>
            </div>
            <div className={`spotlight-card p-6 rounded-xl glass-ultra ${prefersReducedMotion ? '' : 'floating-motion'}`} style={{ animationDelay: '1s' }}>
              <div className="text-5xl md:text-6xl font-bold text-gradient-glow mb-2">5/5</div>
              <div className="text-white/70">Avaliação dos Clientes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const MemoizedWhyChooseSection = memo(WhyChooseSection);
