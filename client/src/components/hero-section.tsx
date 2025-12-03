import { useEffect, useRef, useState, useCallback, memo, useMemo } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const stats = [
  { number: 500, suffix: "+", label: "Projetos Entregues" },
  { number: 98, suffix: "%", label: "Clientes Satisfeitos" },
  { number: 15, suffix: "+", label: "Anos de Experiência" },
  { number: 24, suffix: "/7", label: "Suporte Dedicado" },
] as const;

const AnimatedCounter = memo(function AnimatedCounter({ 
  target, 
  suffix, 
  shouldAnimate,
  delay = 0 
}: { 
  target: number; 
  suffix: string; 
  shouldAnimate: boolean;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2;
    const startTime = performance.now() + delay * 1000;
    
    const animate = (currentTime: number) => {
      const elapsed = Math.max(0, currentTime - startTime);
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.floor(easeOutExpo * target);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, shouldAnimate, delay]);

  return (
    <span ref={countRef} className="tabular-nums">
      {shouldAnimate ? count : target}{suffix}
    </span>
  );
});

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsAnimated(true);
      return;
    }
    
    let rafId: number | null = null;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY) > 2) {
          lastScrollY = currentScrollY;
          setScrollY(currentScrollY);
        }
        rafId = null;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsAnimated(true);
      return;
    }

    const tl = gsap.timeline({ 
      defaults: { ease: "power2.out", force3D: true },
      onComplete: () => setIsAnimated(true)
    });

    if (badgeRef.current) {
      tl.fromTo(badgeRef.current, 
        { opacity: 0, y: -25 },
        { opacity: 1, y: 0, duration: 0.6 }
      );
    }

    if (titleRef.current) {
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 45 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.5"
      );
    }

    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll('button');
      tl.fromTo(buttons,
        { opacity: 0, y: 25 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: { each: 0.1 }
        },
        "-=0.4"
      );
    }

    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll('.stat-card-enhanced');
      tl.fromTo(cards,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: { each: 0.08, from: "center" }
        },
        "-=0.3"
      );
    }
  }, [prefersReducedMotion]);

  const scrollToContact = useCallback(() => {
    const element = document.querySelector("#contato");
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }
  }, [prefersReducedMotion]);

  const scrollToServices = useCallback(() => {
    const element = document.querySelector("#servicos");
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }
  }, [prefersReducedMotion]);

  const parallaxOffset = prefersReducedMotion ? 0 : scrollY * 0.25;
  const baseOpacity = prefersReducedMotion || isAnimated ? 1 : 0;

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
      data-testid="section-hero"
    >
      <div 
        className="container mx-auto px-4 lg:px-8 relative z-10 text-[52px]"
        style={{ transform: prefersReducedMotion ? undefined : `translate3d(0, ${parallaxOffset * 0.15}px, 0)` }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div 
            ref={badgeRef}
            className={`inline-flex items-center gap-2 glass-ultra shine-sweep specular-highlight px-5 py-2.5 mb-8 ${prefersReducedMotion ? '' : 'floating-motion-slow'}`}
            style={{ opacity: baseOpacity }}
          >
            <span 
              className={`w-2.5 h-2.5 rounded-full ${prefersReducedMotion ? '' : 'animate-pulse'}`}
              style={{ 
                background: 'linear-gradient(135deg, #FFD700, #FFA500)', 
                boxShadow: '0 0 15px rgba(255, 200, 0, 0.8), 0 0 30px rgba(255, 200, 0, 0.5), 0 0 45px rgba(255, 180, 0, 0.3)' 
              }}
            />
            <span className="text-sm text-white/90 font-medium tracking-wide">Agencia Digital Premium</span>
          </div>

          <h1 
            ref={titleRef}
            className="font-bold text-white mb-6"
            style={{ opacity: baseOpacity, fontSize: '55px', lineHeight: '1.1' }}
          >
            Transforme sua{" "}
            <span className="text-gradient-glow">Presença Digital</span>
            <br />
            em Resultados Reais
          </h1>

          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed"
            style={{ opacity: baseOpacity }}
          >
            Desenvolvemos soluções digitais sob medida que impulsionam seu negócio. 
            Sites profissionais, e-commerce, landing pages, branding e muito mais. 
            Entrega rápida, resultados comprovados.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={scrollToContact}
              className="btn-primary btn-glow ripple-effect text-base md:text-lg w-full sm:w-auto gold-glow"
              style={{ opacity: baseOpacity }}
              data-testid="button-hero-cta"
            >
              <i className="fas fa-rocket mr-2"></i>
              Começar Projeto
            </button>
            <button
              onClick={scrollToServices}
              className="btn-secondary glow-border rotating-glow text-base md:text-lg w-full sm:w-auto"
              style={{ opacity: baseOpacity }}
              data-testid="button-hero-services"
            >
              <i className="fas fa-th-large mr-2"></i>
              Ver Serviços
            </button>
          </div>

          <div ref={statsRef} className="spotlight-cards grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`spotlight-card stat-card-enhanced glass-card-enhanced shine-sweep specular-highlight p-6 text-center aurora-glow will-change-transform ${prefersReducedMotion ? '' : `floating-motion stagger-${index + 1}`}`}
                style={{ 
                  animationDelay: prefersReducedMotion ? undefined : `${index * 0.4}s`,
                  opacity: baseOpacity,
                  contain: 'layout style paint'
                }}
                data-testid={`stat-card-${index}`}
              >
                <div className="stat-number text-gradient-glow">
                  <AnimatedCounter 
                    target={stat.number} 
                    suffix={stat.suffix} 
                    shouldAnimate={isAnimated}
                    delay={index * 0.15}
                  />
                </div>
                <div className="text-white/60 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
      {!prefersReducedMotion && (
        <div 
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(255, 200, 0, 0.03) 0%, transparent 30%),
              radial-gradient(circle at 80% 70%, rgba(255, 180, 0, 0.025) 0%, transparent 25%)
            `,
            transform: `translate3d(0, ${-parallaxOffset * 0.1}px, 0)`
          }}
        />
      )}
    </section>
  );
}

export const MemoizedHeroSection = memo(HeroSection);
