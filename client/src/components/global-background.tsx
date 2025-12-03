import { useEffect, useRef, useMemo, memo, useState, useCallback, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { useReducedMotion, useIsMobile } from "@/hooks/use-reduced-motion";

const BOKEH_COUNT_DESKTOP = 10;
const BOKEH_COUNT_MOBILE = 3;
const PARTICLE_COUNT_DESKTOP = 15;
const PARTICLE_COUNT_MOBILE = 4;
const LENS_FLARE_COUNT_DESKTOP = 4;
const LENS_FLARE_COUNT_MOBILE = 2;

const throttle = <T extends (...args: unknown[]) => void>(fn: T, delay: number): T => {
  let lastCall = 0;
  return ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
};

const BokehParticles = memo(function BokehParticles() {
  const bokehRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const count = isMobile ? BOKEH_COUNT_MOBILE : BOKEH_COUNT_DESKTOP;

  const bokehStyles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      size: isMobile ? 60 + Math.random() * 100 : 80 + Math.random() * 200,
      opacity: isMobile ? 0.05 + Math.random() * 0.08 : 0.08 + Math.random() * 0.12,
      hue: 35 + Math.random() * 15,
      delay: i * 0.5
    })), [count, isMobile]
  );

  useEffect(() => {
    if (!bokehRef.current || prefersReducedMotion) return;

    const bokehElements = bokehRef.current.querySelectorAll('.bokeh-sphere');
    const tweens: gsap.core.Tween[] = [];
    
    bokehElements.forEach((bokeh, index) => {
      const duration = isMobile ? 25 + index * 4 : 15 + index * 3;
      const tween = gsap.to(bokeh, {
        x: `${-25 + Math.random() * 50}px`,
        y: `${-25 + Math.random() * 50}px`,
        scale: 0.9 + Math.random() * 0.2,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.4,
        force3D: true
      });
      tweens.push(tween);
    });

    return () => tweens.forEach(t => t.kill());
  }, [isMobile, prefersReducedMotion]);

  return (
    <div ref={bokehRef} className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {bokehStyles.map((style, i) => (
        <div
          key={i}
          className="bokeh-sphere absolute rounded-full will-change-transform"
          style={{
            left: style.left,
            top: style.top,
            width: `${style.size}px`,
            height: `${style.size}px`,
            background: `radial-gradient(circle at 30% 30%, 
              rgba(255, ${180 + style.hue}, 50, ${style.opacity + 0.1}) 0%,
              rgba(255, ${160 + style.hue}, 0, ${style.opacity}) 30%,
              rgba(255, ${140 + style.hue}, 0, ${style.opacity * 0.5}) 60%,
              transparent 100%
            )`,
            filter: isMobile ? 'blur(30px)' : 'blur(40px)',
            mixBlendMode: 'screen'
          }}
        />
      ))}
    </div>
  );
});

const FloatingParticles = memo(function FloatingParticles() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

  const particleStyles = useMemo(() => 
    Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      hue: 180 + Math.random() * 40,
      opacity: 0.5 + Math.random() * 0.4,
      blur: Math.random() * 0.5,
      glowSize: 8 + Math.random() * 12
    })), [count]
  );

  useEffect(() => {
    if (!particlesRef.current || prefersReducedMotion) return;

    const particles = particlesRef.current.querySelectorAll('.particle');
    const tweens: gsap.core.Tween[] = [];
    
    particles.forEach((particle, index) => {
      const duration = isMobile ? 30 + Math.random() * 15 : 20 + Math.random() * 10;
      const tween = gsap.fromTo(particle, 
        { y: '110vh', x: 0, opacity: 0, scale: 0.5 },
        {
          y: '-110vh',
          x: -30 + Math.random() * 60,
          opacity: 0.7,
          scale: 1,
          duration,
          delay: index * 0.8,
          repeat: -1,
          ease: 'none',
          force3D: true
        }
      );
      tweens.push(tween);
    });

    return () => tweens.forEach(t => t.kill());
  }, [isMobile, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
      {particleStyles.map((style, i) => (
        <div
          key={i}
          className="particle absolute rounded-full pointer-events-none will-change-transform"
          style={{
            left: style.left,
            width: `${style.size}px`,
            height: `${style.size}px`,
            background: `radial-gradient(circle, 
              rgba(255, 220, 100, ${style.opacity}) 0%, 
              rgba(255, 200, 50, ${style.opacity * 0.6}) 40%, 
              transparent 70%
            )`,
            boxShadow: `0 0 ${style.glowSize}px rgba(255, 200, 0, 0.5)`,
            filter: `blur(${style.blur}px)`
          }}
        />
      ))}
    </div>
  );
});

const LensFlares = memo(function LensFlares() {
  const flaresRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(false);
  const count = isMobile ? LENS_FLARE_COUNT_MOBILE : LENS_FLARE_COUNT_DESKTOP;

  const flareStyles = useMemo(() => 
    Array.from({ length: count }, () => ({
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 70}%`,
      size: 8 + Math.random() * 16,
      intensity: 0.4 + Math.random() * 0.4,
      rays: 4 + Math.floor(Math.random() * 4)
    })), [count]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (flaresRef.current) {
      observer.observe(flaresRef.current);
    }

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!flaresRef.current || !isInView || prefersReducedMotion) return;

    const handleScroll = throttle(() => {
      if (!flaresRef.current) return;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      const flares = flaresRef.current.querySelectorAll('.lens-flare');
      flares.forEach((flare, index) => {
        const el = flare as HTMLElement;
        const scrollProgress = Math.min(1, scrollY / (viewportHeight * 2));
        const opacity = Math.max(0.2, 1 - scrollProgress * 0.5);
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${scrollY * (0.05 + index * 0.02)}px)`;
      });
    }, 32);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div ref={flaresRef} className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
      {flareStyles.map((style, i) => (
        <div
          key={i}
          className="lens-flare absolute will-change-transform"
          style={{
            left: style.left,
            top: style.top,
            width: `${style.size}px`,
            height: `${style.size}px`,
            opacity: isInView ? 1 : 0,
            transition: 'opacity 0.5s ease-out'
          }}
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, 
                rgba(255, 255, 255, ${style.intensity}) 0%,
                rgba(255, 230, 150, ${style.intensity * 0.7}) 20%,
                rgba(255, 200, 0, ${style.intensity * 0.4}) 40%,
                transparent 70%
              )`,
              boxShadow: `0 0 ${style.size * 4}px rgba(255, 200, 0, 0.6), 0 0 ${style.size * 8}px rgba(255, 180, 0, 0.3)`
            }}
          />
          {Array.from({ length: style.rays }).map((_, rayIndex) => (
            <div
              key={rayIndex}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                width: `${style.size * 6}px`,
                height: '1px',
                background: `linear-gradient(90deg, transparent 0%, rgba(255, 220, 100, ${style.intensity * 0.4}) 30%, rgba(255, 255, 255, ${style.intensity * 0.8}) 50%, rgba(255, 220, 100, ${style.intensity * 0.4}) 70%, transparent 100%)`,
                transform: `translate(-50%, -50%) rotate(${(360 / style.rays) * rayIndex}deg)`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

const GlowOrbs = memo(function GlowOrbs() {
  const orbsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!orbsRef.current || prefersReducedMotion) return;

    const orbs = orbsRef.current.querySelectorAll('.glow-orb');
    const tweens: gsap.core.Tween[] = [];
    
    orbs.forEach((orb, index) => {
      const duration = isMobile ? 18 + index * 5 : 12 + index * 4;
      const tween = gsap.to(orb, {
        x: `${-20 + Math.random() * 40}px`,
        y: `${-20 + Math.random() * 40}px`,
        scale: 0.95 + Math.random() * 0.1,
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        force3D: true
      });
      tweens.push(tween);
    });

    return () => tweens.forEach(t => t.kill());
  }, [isMobile, prefersReducedMotion]);

  const orbSize = isMobile ? 0.6 : 1;

  return (
    <div ref={orbsRef} className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      <div 
        className="glow-orb absolute rounded-full will-change-transform"
        style={{ 
          top: '5%', left: '15%', 
          width: `${500 * orbSize}px`, height: `${500 * orbSize}px`,
          background: 'radial-gradient(circle, rgba(255, 200, 0, 0.15) 0%, rgba(255, 150, 0, 0.08) 40%, transparent 70%)',
          filter: `blur(${60 * orbSize}px)`,
          mixBlendMode: 'screen'
        }}
      />
      <div 
        className="glow-orb absolute rounded-full will-change-transform"
        style={{ 
          top: '35%', right: '10%', 
          width: `${450 * orbSize}px`, height: `${450 * orbSize}px`,
          background: 'radial-gradient(circle, rgba(255, 180, 0, 0.12) 0%, rgba(255, 140, 0, 0.06) 40%, transparent 70%)',
          filter: `blur(${50 * orbSize}px)`,
          mixBlendMode: 'screen'
        }}
      />
      <div 
        className="glow-orb absolute rounded-full will-change-transform"
        style={{ 
          bottom: '20%', left: '30%', 
          width: `${400 * orbSize}px`, height: `${400 * orbSize}px`,
          background: 'radial-gradient(circle, rgba(255, 220, 50, 0.1) 0%, rgba(255, 180, 0, 0.05) 40%, transparent 70%)',
          filter: `blur(${55 * orbSize}px)`,
          mixBlendMode: 'screen'
        }}
      />
      {!isMobile && (
        <div 
          className="glow-orb absolute rounded-full will-change-transform"
          style={{ 
            top: '60%', left: '5%', width: '350px', height: '350px',
            background: 'radial-gradient(circle, rgba(255, 200, 100, 0.08) 0%, transparent 60%)',
            filter: 'blur(45px)',
            mixBlendMode: 'screen'
          }}
        />
      )}
    </div>
  );
});

const StarsParallax = memo(function StarsParallax() {
  const starsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!starsRef.current || prefersReducedMotion) return;

    const handleScroll = throttle(() => {
      if (!starsRef.current) return;
      const scrollY = window.scrollY;
      
      const layer1 = starsRef.current.querySelector('.stars-layer-1') as HTMLElement;
      const layer2 = starsRef.current.querySelector('.stars-layer-2') as HTMLElement;
      const layer3 = starsRef.current.querySelector('.stars-layer-3') as HTMLElement;
      
      if (layer1) layer1.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
      if (layer2) layer2.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`;
      if (layer3) layer3.style.transform = `translate3d(0, ${scrollY * 0.7}px, 0)`;
    }, 16);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  return (
    <div ref={starsRef} className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <div 
        className="stars-layer-1 absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 30% 20%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1.5px 1.5px at 50% 15%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 70% 25%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 15% 40%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 45% 45%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1.5px 1.5px at 75% 50%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 25% 60%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 85% 65%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 5% 80%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 55% 85%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 95% 90%, rgba(255,255,255,0.4), transparent)
          `,
          backgroundSize: '100% 100%',
          opacity: 0.4
        }}
      />
      
      <div 
        className="stars-layer-2 absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 20% 15%, rgba(255,255,255,0.9), transparent),
            radial-gradient(2px 2px at 60% 30%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1.5px 1.5px at 40% 55%, rgba(255,255,255,0.7), transparent),
            radial-gradient(2px 2px at 80% 40%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1.5px 1.5px at 10% 70%, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 35% 80%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.5px 1.5px at 65% 75%, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 90% 85%, rgba(255,255,255,0.6), transparent)
          `,
          backgroundSize: '100% 100%',
          opacity: 0.5
        }}
      />
      
      <div 
        className="stars-layer-3 absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `
            radial-gradient(2.5px 2.5px at 25% 20%, rgba(255,230,180,1), transparent),
            radial-gradient(3px 3px at 75% 35%, rgba(255,240,200,0.9), transparent),
            radial-gradient(2.5px 2.5px at 15% 60%, rgba(255,220,150,0.8), transparent),
            radial-gradient(3px 3px at 85% 70%, rgba(255,235,180,0.9), transparent),
            radial-gradient(2.5px 2.5px at 50% 90%, rgba(255,245,200,0.8), transparent)
          `,
          backgroundSize: '100% 100%',
          opacity: 0.6
        }}
      />
    </div>
  );
});

const BloomLayer = memo(function BloomLayer() {
  const bloomRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (bloomRef.current) {
      observer.observe(bloomRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    if (!bloomRef.current || !isInView || isMobile || prefersReducedMotion) return;

    const handleScroll = throttle(() => {
      if (!bloomRef.current) return;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      const blooms = bloomRef.current.querySelectorAll('.bloom-element');
      blooms.forEach((bloom, index) => {
        const el = bloom as HTMLElement;
        const sectionOffset = index * viewportHeight * 0.8;
        const distanceFromSection = Math.abs(scrollY - sectionOffset);
        const maxDistance = viewportHeight;
        const intensity = Math.max(0, 1 - distanceFromSection / maxDistance);
        
        el.style.opacity = String(0.3 + intensity * 0.7);
        el.style.transform = `scale3d(${0.8 + intensity * 0.4}, ${0.8 + intensity * 0.4}, 1)`;
      });
    }, 32);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInView, isMobile, prefersReducedMotion]);

  if (isMobile || prefersReducedMotion) return null;

  return (
    <div ref={bloomRef} className="absolute inset-0 pointer-events-none z-[5]">
      <div 
        className="bloom-element absolute transition-all duration-500"
        style={{
          top: '10%',
          left: '20%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 200, 0, 0.15) 0%, transparent 60%)',
          filter: 'blur(80px)',
          opacity: isInView ? 1 : 0
        }}
      />
      <div 
        className="bloom-element absolute transition-all duration-500"
        style={{
          top: '50%',
          right: '15%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(255, 180, 50, 0.12) 0%, transparent 60%)',
          filter: 'blur(70px)',
          opacity: isInView ? 1 : 0
        }}
      />
      <div 
        className="bloom-element absolute transition-all duration-500"
        style={{
          bottom: '20%',
          left: '40%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255, 220, 100, 0.1) 0%, transparent 60%)',
          filter: 'blur(60px)',
          opacity: isInView ? 1 : 0
        }}
      />
    </div>
  );
});

export function GlobalBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
      
      const handleCanPlay = () => setVideoLoaded(true);
      videoRef.current.addEventListener('canplay', handleCanPlay);
      
      if (videoRef.current.readyState >= 3) {
        setVideoLoaded(true);
      }
      
      return () => {
        videoRef.current?.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateScrollVariable = throttle(() => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    }, 16);

    window.addEventListener('scroll', updateScrollVariable, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollVariable);
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden z-0">
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0d1117 50%, #151922 100%)',
          opacity: videoLoaded ? 0 : 1
        }}
      />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute w-full h-full object-cover transition-opacity duration-1000"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          opacity: videoLoaded ? 1 : 0
        }}
      >
        <source 
          src="https://cdn.pixabay.com/video/2021/08/06/84086-584871133_large.mp4" 
          type="video/mp4" 
        />
      </video>
      
      {!prefersReducedMotion && (
        <div 
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: `radial-gradient(ellipse 120% 80% at center 10%, 
              rgba(255, 200, 0, 0.2) 0%,
              rgba(255, 180, 0, 0.1) 25%,
              rgba(255, 150, 0, 0.05) 45%,
              transparent 70%
            )`,
            mixBlendMode: 'screen'
          }}
        />
      )}
      
      <GlowOrbs />
      <BokehParticles />
      <BloomLayer />
      
      {!isMobile && !prefersReducedMotion && <div className="hero-data-particles opacity-10 z-[3]" />}
      
      <div 
        className="absolute inset-0 pointer-events-none z-[6]"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(0, 3, 15, 0.5) 0%,
            rgba(0, 8, 30, 0.35) 15%,
            rgba(0, 5, 20, 0.2) 30%,
            rgba(0, 0, 0, 0.15) 45%,
            rgba(0, 5, 20, 0.25) 60%,
            rgba(0, 10, 35, 0.6) 80%,
            rgba(0, 5, 20, 0.9) 100%
          )`
        }}
      />
      
      {!isMobile && !prefersReducedMotion && (
        <div 
          className="absolute inset-0 pointer-events-none z-[7]"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 25% 15%, rgba(255, 200, 0, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 50% 35% at 75% 45%, rgba(255, 180, 0, 0.05) 0%, transparent 45%),
              radial-gradient(ellipse 40% 30% at 50% 80%, rgba(255, 220, 50, 0.04) 0%, transparent 40%)
            `
          }}
        />
      )}
    </div>
  );
}
