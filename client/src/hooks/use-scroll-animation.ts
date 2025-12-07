import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "./use-reduced-motion";

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

interface AnimationConfig {
  type: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'stagger';
  duration?: number;
  stagger?: number;
  distance?: number;
  scale?: number;
  ease?: string;
  childSelector?: string;
}

export function useScrollAnimation<T extends HTMLElement>(
  animationConfig: AnimationConfig,
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);
  const isAnimating = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  const {
    threshold = 0.2,
    rootMargin = "0px 0px -80px 0px",
    once = false,
    delay = 0
  } = options;

  const {
    type,
    duration = 0.7,
    stagger = 0.06,
    distance = 40,
    scale = 0.97,
    ease = "power2.out",
    childSelector
  } = animationConfig;

  const getInitialState = useCallback(() => {
    switch (type) {
      case 'fade-up':
        return { opacity: 0, y: distance };
      case 'fade-down':
        return { opacity: 0, y: -distance };
      case 'fade-left':
        return { opacity: 0, x: -distance };
      case 'fade-right':
        return { opacity: 0, x: distance };
      case 'scale':
        return { opacity: 0, scale: scale - 0.05 };
      case 'stagger':
        return { opacity: 0, y: distance * 0.5 };
      default:
        return { opacity: 0, y: distance };
    }
  }, [type, distance, scale]);

  const getAnimatedState = useCallback(() => {
    return { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      scale: 1,
      duration,
      ease,
      force3D: true,
      overwrite: "auto" as const,
      clearProps: "transform"
    };
  }, [duration, ease]);

  const getExitState = useCallback(() => {
    const exitDistance = distance * 0.3;
    
    switch (type) {
      case 'fade-up':
        return { opacity: 0, y: exitDistance, duration: duration * 0.4, ease: "power2.in" };
      case 'fade-down':
        return { opacity: 0, y: -exitDistance, duration: duration * 0.4, ease: "power2.in" };
      case 'fade-left':
        return { opacity: 0, x: -exitDistance, duration: duration * 0.4, ease: "power2.in" };
      case 'fade-right':
        return { opacity: 0, x: exitDistance, duration: duration * 0.4, ease: "power2.in" };
      case 'scale':
        return { opacity: 0, scale: scale, duration: duration * 0.4, ease: "power2.in" };
      case 'stagger':
        return { opacity: 0, y: exitDistance * 0.5, duration: duration * 0.35, ease: "power2.in" };
      default:
        return { opacity: 0, y: exitDistance, duration: duration * 0.4, ease: "power2.in" };
    }
  }, [type, distance, scale, duration]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const targets = type === 'stagger' && childSelector 
      ? element.querySelectorAll(childSelector)
      : element;

    gsap.set(targets, getInitialState());

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (debounceTimer) clearTimeout(debounceTimer);
          
          debounceTimer = setTimeout(() => {
            if (entry.isIntersecting) {
              if (once && hasAnimated.current) return;
              if (isAnimating.current) {
                gsap.killTweensOf(targets);
              }
              
              hasAnimated.current = true;
              isAnimating.current = true;

              const animState = getAnimatedState();
              
              if (type === 'stagger' && childSelector) {
                gsap.to(targets, {
                  ...animState,
                  stagger: {
                    each: stagger,
                    from: "start"
                  },
                  delay,
                  onComplete: () => { isAnimating.current = false; }
                });
              } else {
                gsap.to(targets, { 
                  ...animState, 
                  delay,
                  onComplete: () => { isAnimating.current = false; }
                });
              }
              
              setIsVisible(true);
            } else if (!once) {
              if (isAnimating.current) {
                gsap.killTweensOf(targets);
              }
              
              isAnimating.current = true;
              const exitState = getExitState();
              
              if (type === 'stagger' && childSelector) {
                gsap.to(targets, {
                  ...exitState,
                  stagger: {
                    each: stagger * 0.3,
                    from: "end"
                  },
                  force3D: true,
                  overwrite: "auto",
                  onComplete: () => { isAnimating.current = false; }
                });
              } else {
                gsap.to(targets, { 
                  ...exitState, 
                  force3D: true, 
                  overwrite: "auto",
                  onComplete: () => { isAnimating.current = false; }
                });
              }
              
              setIsVisible(false);
            }
          }, 50);
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      gsap.killTweensOf(targets);
      observer.disconnect();
    };
  }, [
    prefersReducedMotion, 
    type, 
    childSelector, 
    once, 
    delay, 
    threshold, 
    rootMargin,
    stagger,
    getInitialState,
    getAnimatedState,
    getExitState
  ]);

  return { ref, isVisible };
}

export function useParallaxScroll(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    let rafId: number | null = null;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        if (!ref.current) {
          rafId = null;
          return;
        }
        
        const scrollY = window.scrollY;
        if (Math.abs(scrollY - lastScrollY) < 1) {
          rafId = null;
          return;
        }
        
        lastScrollY = scrollY;
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const offset = (elementCenter - viewportCenter) * speed * 0.08;

        ref.current.style.transform = `translate3d(0, ${offset}px, 0)`;

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, prefersReducedMotion]);

  return ref;
}

export function useSmoothCounter(
  target: number,
  options: { duration?: number; delay?: number; shouldStart?: boolean } = {}
) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const { duration = 2, delay = 0, shouldStart = true } = options;

  useEffect(() => {
    if (!shouldStart || hasAnimated.current) return;
    hasAnimated.current = true;

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
  }, [target, duration, delay, shouldStart]);

  return count;
}
