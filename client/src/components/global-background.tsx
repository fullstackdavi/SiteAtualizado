import { useEffect, useRef, useMemo, memo, useState } from "react";
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

const BokehParticles = memo(function BokehParticles() {
  const bokehRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const count = isMobile ? BOKEH_COUNT_MOBILE : BOKEH_COUNT_DESKTOP;

  const bokehStyles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      size: isMobile ? 60 + Math.random() * 80 : 80 + Math.random() * 200,
      opacity: isMobile ? 0.04 + Math.random() * 0.06 : 0.08 + Math.random() * 0.12,
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
            filter: isMobile ? 'blur(25px)' : 'blur(40px)',
            mixBlendMode: 'screen'
          }}
        />
      ))}
    </div>
  );
});

const GlowOrbs = memo(function GlowOrbs() {
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

  const orbSize = isMobile ? 0.5 : 1;

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

const MobileBackground = memo(function MobileBackground() {
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
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setVideoFailed(true);
      return;
    }

    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
      
      const handleCanPlay = () => {
        setVideoLoaded(true);
        videoRef.current?.play().catch(() => {
          setVideoFailed(true);
        });
      };
      
      const handleError = () => {
        setVideoFailed(true);
      };

      const handleStalled = () => {
        setTimeout(() => {
          if (!videoLoaded) {
            setVideoFailed(true);
          }
        }, 3000);
      };

      videoRef.current.addEventListener('canplay', handleCanPlay);
      videoRef.current.addEventListener('error', handleError);
      videoRef.current.addEventListener('stalled', handleStalled);
      
      if (videoRef.current.readyState >= 3) {
        setVideoLoaded(true);
      }

      const timeout = setTimeout(() => {
        if (!videoLoaded) {
          setVideoFailed(true);
        }
      }, 5000);
      
      return () => {
        clearTimeout(timeout);
        videoRef.current?.removeEventListener('canplay', handleCanPlay);
        videoRef.current?.removeEventListener('error', handleError);
        videoRef.current?.removeEventListener('stalled', handleStalled);
      };
    }
  }, [isMobile, videoLoaded]);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const updateScrollVariable = throttle(() => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    }, 32);

    window.addEventListener('scroll', updateScrollVariable, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollVariable);
  }, [prefersReducedMotion, isMobile]);

  const showVideo = !isMobile && !videoFailed && videoLoaded;
  const showFallback = isMobile || videoFailed || !videoLoaded;

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
      
      {isMobile ? (
        <MobileBackground />
      ) : (
        <>
          {!videoFailed && (
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
                opacity: showVideo ? 1 : 0
              }}
            >
              <source 
                src="https://cdn.pixabay.com/video/2021/08/06/84086-584871133_large.mp4" 
                type="video/mp4" 
              />
            </video>
          )}
          
          {!prefersReducedMotion && (
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
        </>
      )}
      
      <GlowOrbs />
      <BokehParticles />
      
      <div 
        className="absolute inset-0 pointer-events-none z-[6]"
        style={{
          background: isMobile 
            ? `linear-gradient(
                180deg,
                rgba(0, 3, 15, 0.6) 0%,
                rgba(0, 5, 20, 0.3) 30%,
                rgba(0, 0, 0, 0.2) 50%,
                rgba(0, 5, 20, 0.4) 70%,
                rgba(0, 5, 20, 0.85) 100%
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
