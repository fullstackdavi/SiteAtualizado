import { useEffect, useRef, useState, useCallback, memo } from "react";
import { gsap } from "gsap";
import { useReducedMotion, useIsMobile } from "@/hooks/use-reduced-motion";

const VideoBackground = memo(function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      video.play().catch(() => {});
    };

    video.addEventListener('loadeddata', handleLoadedData);
    
    if (video.readyState >= 2) {
      setIsLoaded(true);
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      >
        <source 
          src="https://cdn.pixabay.com/video/2016/01/29/1992-153555258_large.mp4" 
          type="video/mp4" 
        />
      </video>
      {/* Dark overlay for text readability */}
      <div 
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: `linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.4) 0%,
            rgba(0, 0, 0, 0.2) 40%,
            rgba(0, 0, 0, 0.3) 70%,
            rgba(0, 0, 0, 0.5) 100%
          )`
        }}
      />
      {/* Smooth fade to background - extended height for seamless transition */}
      <div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          zIndex: 2,
          height: '280px',
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            rgba(10, 10, 10, 0.05) 15%,
            rgba(10, 10, 10, 0.15) 30%,
            rgba(10, 10, 10, 0.35) 45%,
            rgba(10, 10, 10, 0.55) 60%,
            rgba(10, 10, 10, 0.75) 75%,
            rgba(10, 10, 10, 0.9) 88%,
            rgb(10, 10, 10) 100%
          )`
        }}
      />
    </div>
  );
});

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
  const isMobile = useIsMobile();

  useEffect(() => {
    if (prefersReducedMotion || isMobile) {
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
  }, [prefersReducedMotion, isMobile]);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) {
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
  }, [prefersReducedMotion, isMobile]);

  const scrollToContact = useCallback(() => {
    const element = document.querySelector("#contato");
    if (element) {
      const navHeight = 70;
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
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }
  }, [prefersReducedMotion]);

  const parallaxOffset = (prefersReducedMotion || isMobile) ? 0 : scrollY * 0.25;
  const baseOpacity = prefersReducedMotion || isMobile || isAnimated ? 1 : 0;

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24 pb-8 md:pb-16 overflow-hidden px-4"
      data-testid="section-hero"
      style={{ zIndex: 1, position: 'relative' }}
    >
      <VideoBackground />
      <div 
        className="container mx-auto relative z-10"
        style={{ transform: (prefersReducedMotion || isMobile) ? undefined : `translate3d(0, ${parallaxOffset * 0.15}px, 0)` }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div 
            ref={badgeRef}
            className="inline-flex items-center gap-2 glass-ultra shine-sweep specular-highlight px-4 md:px-5 py-2 md:py-2.5 mb-6 md:mb-8 rounded-full"
            style={{ opacity: baseOpacity }}
          >
            <span 
              className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
              style={{ 
                background: 'linear-gradient(135deg, #FFD700, #FFA500)', 
                boxShadow: '0 0 10px rgba(255, 200, 0, 0.8), 0 0 20px rgba(255, 200, 0, 0.5)' 
              }}
            />
            <span className="text-xs md:text-sm text-white/90 font-medium tracking-wide">Agência Digital Premium</span>
          </div>

          <h1 
            ref={titleRef}
            className="font-bold text-white mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
            style={{ opacity: baseOpacity }}
          >
            Transforme sua{" "}
            <span className="text-gradient-glow">Presença Digital</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            em Resultados Reais
          </h1>

          <p 
            ref={subtitleRef}
            className="text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-2"
            style={{ opacity: baseOpacity }}
          >
            Desenvolvemos soluções digitais sob medida que impulsionam seu negócio. 
            Sites profissionais, e-commerce, landing pages, branding e muito mais.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-10 md:mb-16 px-4">
            <button
              onClick={scrollToContact}
              className="btn-primary btn-glow ripple-effect text-sm md:text-base lg:text-lg w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 gold-glow rounded-xl"
              style={{ opacity: baseOpacity }}
              data-testid="button-hero-cta"
            >
              <i className="fas fa-rocket mr-2"></i>
              Começar Projeto
            </button>
            <button
              onClick={scrollToServices}
              className="btn-secondary glow-border text-sm md:text-base lg:text-lg w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 rounded-xl"
              style={{ opacity: baseOpacity }}
              data-testid="button-hero-services"
            >
              <i className="fas fa-th-large mr-2"></i>
              Ver Serviços
            </button>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 px-2">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card-enhanced glass-card-enhanced shine-sweep specular-highlight p-4 md:p-6 text-center aurora-glow will-change-transform rounded-2xl"
                style={{ 
                  opacity: baseOpacity,
                  contain: 'layout style paint'
                }}
                data-testid={`stat-card-${index}`}
              >
                <div className="stat-number text-gradient-glow text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">
                  <AnimatedCounter 
                    target={stat.number} 
                    suffix={stat.suffix} 
                    shouldAnimate={isAnimated}
                    delay={index * 0.15}
                  />
                </div>
                <div className="text-white/60 text-xs sm:text-sm md:text-base leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
      {!prefersReducedMotion && !isMobile && (
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
