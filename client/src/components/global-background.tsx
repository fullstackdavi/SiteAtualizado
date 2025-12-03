import { useEffect, useRef, useMemo, memo, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useReducedMotion, useIsMobile } from "@/hooks/use-reduced-motion";

const BOKEH_COUNT_DESKTOP = 6;
const BOKEH_COUNT_MOBILE = 2;

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

const BokehParticles = memo(function BokehParticles({ videoPlaying }: { videoPlaying?: boolean }) {
  const bokehRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const count = isMobile ? BOKEH_COUNT_MOBILE : BOKEH_COUNT_DESKTOP;

  const bokehStyles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      size: isMobile ? 50 + Math.random() * 60 : 80 + Math.random() * 200,
      opacity: isMobile ? 0.03 + Math.random() * 0.04 : 0.08 + Math.random() * 0.12,
      hue: 35 + Math.random() * 15,
      delay: i * 0.5
    })), [count, isMobile]
  );

  useEffect(() => {
    if (!bokehRef.current || prefersReducedMotion || isMobile) return;

    const bokehElements = bokehRef.current.querySelectorAll('.bokeh-sphere');
    const tweens: gsap.core.Tween[] = [];
    
    bokehElements.forEach((bokeh, index) => {
      const duration = 20 + index * 4;
      const tween = gsap.to(bokeh, {
        x: `${-20 + Math.random() * 40}px`,
        y: `${-20 + Math.random() * 40}px`,
        scale: 0.95 + Math.random() * 0.1,
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

  if (isMobile && videoPlaying) return null;

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
            filter: isMobile ? 'blur(20px)' : 'blur(40px)',
            mixBlendMode: 'screen'
          }}
        />
      ))}
    </div>
  );
});

const GlowOrbs = memo(function GlowOrbs({ videoPlaying }: { videoPlaying?: boolean }) {
  const orbsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!orbsRef.current || prefersReducedMotion || isMobile) return;

    const orbs = orbsRef.current.querySelectorAll('.glow-orb');
    const tweens: gsap.core.Tween[] = [];
    
    orbs.forEach((orb, index) => {
      const duration = 15 + index * 5;
      const tween = gsap.to(orb, {
        x: `${-15 + Math.random() * 30}px`,
        y: `${-15 + Math.random() * 30}px`,
        scale: 0.97 + Math.random() * 0.06,
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

  if (isMobile && videoPlaying) return null;

  const orbSize = isMobile ? 0.4 : 1;

  return (
    <div ref={orbsRef} className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      <div 
        className="glow-orb absolute rounded-full will-change-transform"
        style={{ 
          top: '5%', left: '15%', 
          width: `${400 * orbSize}px`, height: `${400 * orbSize}px`,
          background: 'radial-gradient(circle, rgba(255, 200, 0, 0.12) 0%, rgba(255, 150, 0, 0.06) 40%, transparent 70%)',
          filter: `blur(${50 * orbSize}px)`,
          mixBlendMode: 'screen'
        }}
      />
      <div 
        className="glow-orb absolute rounded-full will-change-transform"
        style={{ 
          top: '40%', right: '10%', 
          width: `${350 * orbSize}px`, height: `${350 * orbSize}px`,
          background: 'radial-gradient(circle, rgba(255, 180, 0, 0.1) 0%, rgba(255, 140, 0, 0.05) 40%, transparent 70%)',
          filter: `blur(${45 * orbSize}px)`,
          mixBlendMode: 'screen'
        }}
      />
      {!isMobile && (
        <div 
          className="glow-orb absolute rounded-full will-change-transform"
          style={{ 
            bottom: '20%', left: '30%', 
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(255, 220, 50, 0.08) 0%, rgba(255, 180, 0, 0.04) 40%, transparent 70%)',
            filter: 'blur(40px)',
            mixBlendMode: 'screen'
          }}
        />
      )}
    </div>
  );
});

const MobileGradientFallback = memo(function MobileGradientFallback() {
  return (
    <div className="absolute inset-0">
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, #0a0a0a 0%, #0d1117 30%, #151922 60%, #0a0a0a 100%)
          `
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 200, 0, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(255, 180, 0, 0.05) 0%, transparent 40%),
            radial-gradient(ellipse 50% 30% at 80% 60%, rgba(255, 220, 50, 0.04) 0%, transparent 35%)
          `
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 15%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 70% 25%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 40% 45%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1px 1px at 85% 55%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 10% 75%, rgba(255,255,255,0.35), transparent),
            radial-gradient(1px 1px at 55% 85%, rgba(255,255,255,0.25), transparent),
            radial-gradient(1.5px 1.5px at 30% 30%, rgba(255,200,0,0.4), transparent),
            radial-gradient(1.5px 1.5px at 65% 70%, rgba(255,200,0,0.3), transparent)
          `,
          backgroundSize: '100% 100%',
          opacity: 0.6
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
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showFallback, setShowFallback] = useState(true);

  const attemptPlay = useCallback(() => {
    if (!videoRef.current) return;
    
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setVideoPlaying(true);
          setTimeout(() => setShowFallback(false), 500);
        })
        .catch(() => {
          setShowFallback(true);
          setVideoPlaying(false);
        });
    }
  }, []);

  useEffect(() => {
    if (!videoRef.current || prefersReducedMotion) return;

    const video = videoRef.current;
    video.playbackRate = isMobile ? 0.8 : 0.6;
    
    const handleCanPlay = () => {
      setVideoLoaded(true);
      requestAnimationFrame(() => {
        attemptPlay();
      });
    };
    
    const handlePlaying = () => {
      setVideoPlaying(true);
      setTimeout(() => setShowFallback(false), 300);
    };

    const handleError = () => {
      setShowFallback(true);
      setVideoPlaying(false);
    };

    const handleWaiting = () => {
      setShowFallback(true);
    };

    const handleCanPlayThrough = () => {
      if (!videoPlaying) {
        attemptPlay();
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('error', handleError);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    
    if (video.readyState >= 3) {
      setVideoLoaded(true);
      attemptPlay();
    }

    const timeout = setTimeout(() => {
      if (!videoPlaying) {
        attemptPlay();
      }
    }, isMobile ? 3000 : 5000);
    
    return () => {
      clearTimeout(timeout);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('error', handleError);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [isMobile, prefersReducedMotion, attemptPlay, videoPlaying]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateScrollVariable = throttle(() => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    }, 32);

    window.addEventListener('scroll', updateScrollVariable, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollVariable);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && videoRef.current) {
        attemptPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [attemptPlay]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden z-0">
      {showFallback && (
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 0%, #0d1117 50%, #151922 100%)',
            opacity: 1
          }}
        />
      )}
      
      {isMobile && showFallback && <MobileGradientFallback />}

      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%230a0a0a'/%3E%3C/svg%3E"
          className="absolute w-full h-full object-cover"
          style={{
            minWidth: '100%',
            minHeight: '100%',
            opacity: videoPlaying ? 1 : 0,
            transition: 'opacity 0.8s ease-out',
            willChange: 'opacity'
          }}
        >
          <source 
            src="https://cdn.pixabay.com/video/2021/08/06/84086-584871133_large.mp4" 
            type="video/mp4" 
          />
        </video>
      )}
      
      {!isMobile && !prefersReducedMotion && (
        <div 
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: `radial-gradient(ellipse 120% 80% at center 10%, 
              rgba(255, 200, 0, 0.15) 0%,
              rgba(255, 180, 0, 0.08) 25%,
              rgba(255, 150, 0, 0.04) 45%,
              transparent 70%
            )`,
            mixBlendMode: 'screen'
          }}
        />
      )}
      
      <GlowOrbs videoPlaying={videoPlaying && isMobile} />
      <BokehParticles videoPlaying={videoPlaying && isMobile} />
      
      <div 
        className="absolute inset-0 pointer-events-none z-[6]"
        style={{
          background: isMobile 
            ? `linear-gradient(
                180deg,
                rgba(0, 3, 15, 0.5) 0%,
                rgba(0, 5, 20, 0.25) 30%,
                rgba(0, 0, 0, 0.15) 50%,
                rgba(0, 5, 20, 0.35) 70%,
                rgba(0, 5, 20, 0.8) 100%
              )`
            : `linear-gradient(
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
              radial-gradient(ellipse 60% 40% at 25% 15%, rgba(255, 200, 0, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse 50% 35% at 75% 45%, rgba(255, 180, 0, 0.04) 0%, transparent 45%)
            `
          }}
        />
      )}
    </div>
  );
}
