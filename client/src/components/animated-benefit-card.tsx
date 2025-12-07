import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const iconCategoryMap: Record<string, string> = {
  "fas fa-truck": "shipping",
  "fas fa-credit-card": "payments",
  "fas fa-boxes": "inventory",
  "fas fa-shopping-cart": "checkout",
  "fas fa-chart-bar": "analytics",
  "fas fa-chart-line": "analytics",
  "fas fa-chart-pie": "analytics",
  "fas fa-headset": "support",
  "fas fa-comments": "support",
  "fas fa-mobile-alt": "device",
  "fas fa-mobile": "device",
  "fas fa-laptop": "device",
  "fas fa-search": "analytics",
  "fas fa-search-plus": "analytics",
  "fas fa-bolt": "speed",
  "fas fa-tachometer-alt": "speed",
  "fas fa-shield-alt": "security",
  "fas fa-lock": "security",
  "fas fa-edit": "creation",
  "fas fa-pen": "creation",
  "fas fa-pen-fancy": "creation",
  "fas fa-palette": "creation",
  "fas fa-bullseye": "target",
  "fas fa-vial": "process",
  "fas fa-plug": "integration",
  "fas fa-sync": "integration",
  "fas fa-share-alt": "integration",
  "fas fa-share-nodes": "integration",
  "fas fa-link": "integration",
  "fas fa-copyright": "creation",
  "fas fa-font": "creation",
  "fas fa-book": "document",
  "fas fa-file-alt": "document",
  "fas fa-file-contract": "document",
  "fas fa-id-card": "document",
  "fas fa-ad": "media",
  "fas fa-play": "media",
  "fas fa-images": "media",
  "fas fa-film": "media",
  "fas fa-video": "media",
  "fas fa-clock": "time",
  "fas fa-infinity": "process",
  "fab fa-google": "brand",
  "fab fa-facebook": "brand",
  "fas fa-robot": "automation",
  "fas fa-diagram-project": "automation",
  "fas fa-filter": "process",
  "fas fa-calendar-check": "calendar",
  "fas fa-calendar-alt": "calendar",
  "fas fa-cogs": "settings",
  "fas fa-cloud": "cloud",
  "fas fa-users-cog": "users",
  "fas fa-users": "users",
  "fas fa-layer-group": "layers",
  "fas fa-brain": "brain",
  "fas fa-stopwatch": "time",
  "fas fa-check-circle": "success",
  "fas fa-map": "navigation",
  "fas fa-map-marker-alt": "navigation",
  "fas fa-graduation-cap": "education",
  "fas fa-list": "list",
  "fas fa-star": "rating",
  "fas fa-hashtag": "social",
};

interface Step {
  icon: string;
  label?: string;
}

interface StepSequence {
  steps: Step[];
}

const stepSequences: Record<string, StepSequence> = {
  shipping: {
    steps: [
      { icon: "fas fa-truck", label: "1" },
      { icon: "fas fa-barcode", label: "2" },
      { icon: "fas fa-home", label: "3" },
    ],
  },
  payments: {
    steps: [
      { icon: "fas fa-credit-card", label: "1" },
      { icon: "fas fa-spinner", label: "2" },
      { icon: "fas fa-check-circle", label: "3" },
    ],
  },
  inventory: {
    steps: [
      { icon: "fas fa-boxes", label: "1" },
      { icon: "fas fa-clipboard-list", label: "2" },
      { icon: "fas fa-sync", label: "3" },
    ],
  },
  checkout: {
    steps: [
      { icon: "fas fa-shopping-cart", label: "1" },
      { icon: "fas fa-file-invoice", label: "2" },
      { icon: "fas fa-check", label: "3" },
    ],
  },
  analytics: {
    steps: [
      { icon: "fas fa-chart-bar", label: "1" },
      { icon: "fas fa-database", label: "2" },
      { icon: "fas fa-lightbulb", label: "3" },
    ],
  },
  support: {
    steps: [
      { icon: "fas fa-headset", label: "1" },
      { icon: "fas fa-comment-dots", label: "2" },
      { icon: "fas fa-thumbs-up", label: "3" },
    ],
  },
  device: {
    steps: [
      { icon: "fas fa-mobile-alt", label: "1" },
      { icon: "fas fa-tablet-alt", label: "2" },
      { icon: "fas fa-laptop", label: "3" },
    ],
  },
  speed: {
    steps: [
      { icon: "fas fa-bolt", label: "1" },
      { icon: "fas fa-tachometer-alt", label: "2" },
      { icon: "fas fa-rocket", label: "3" },
    ],
  },
  security: {
    steps: [
      { icon: "fas fa-shield-alt", label: "1" },
      { icon: "fas fa-lock", label: "2" },
      { icon: "fas fa-check-double", label: "3" },
    ],
  },
  creation: {
    steps: [
      { icon: "fas fa-pen", label: "1" },
      { icon: "fas fa-palette", label: "2" },
      { icon: "fas fa-star", label: "3" },
    ],
  },
  target: {
    steps: [
      { icon: "fas fa-bullseye", label: "1" },
      { icon: "fas fa-crosshairs", label: "2" },
      { icon: "fas fa-trophy", label: "3" },
    ],
  },
  integration: {
    steps: [
      { icon: "fas fa-plug", label: "1" },
      { icon: "fas fa-cogs", label: "2" },
      { icon: "fas fa-link", label: "3" },
    ],
  },
  automation: {
    steps: [
      { icon: "fas fa-robot", label: "1" },
      { icon: "fas fa-cog", label: "2" },
      { icon: "fas fa-magic", label: "3" },
    ],
  },
  document: {
    steps: [
      { icon: "fas fa-file-alt", label: "1" },
      { icon: "fas fa-edit", label: "2" },
      { icon: "fas fa-save", label: "3" },
    ],
  },
  media: {
    steps: [
      { icon: "fas fa-images", label: "1" },
      { icon: "fas fa-video", label: "2" },
      { icon: "fas fa-broadcast-tower", label: "3" },
    ],
  },
  time: {
    steps: [
      { icon: "fas fa-clock", label: "1" },
      { icon: "fas fa-hourglass-half", label: "2" },
      { icon: "fas fa-calendar-check", label: "3" },
    ],
  },
  process: {
    steps: [
      { icon: "fas fa-vial", label: "1" },
      { icon: "fas fa-filter", label: "2" },
      { icon: "fas fa-flask", label: "3" },
    ],
  },
  calendar: {
    steps: [
      { icon: "fas fa-calendar-alt", label: "1" },
      { icon: "fas fa-bell", label: "2" },
      { icon: "fas fa-calendar-check", label: "3" },
    ],
  },
  cloud: {
    steps: [
      { icon: "fas fa-cloud", label: "1" },
      { icon: "fas fa-cloud-upload-alt", label: "2" },
      { icon: "fas fa-cloud-download-alt", label: "3" },
    ],
  },
  brand: {
    steps: [
      { icon: "fas fa-palette", label: "1" },
      { icon: "fas fa-brush", label: "2" },
      { icon: "fas fa-gem", label: "3" },
    ],
  },
  users: {
    steps: [
      { icon: "fas fa-users", label: "1" },
      { icon: "fas fa-user-plus", label: "2" },
      { icon: "fas fa-handshake", label: "3" },
    ],
  },
  layers: {
    steps: [
      { icon: "fas fa-layer-group", label: "1" },
      { icon: "fas fa-object-group", label: "2" },
      { icon: "fas fa-cubes", label: "3" },
    ],
  },
  brain: {
    steps: [
      { icon: "fas fa-brain", label: "1" },
      { icon: "fas fa-lightbulb", label: "2" },
      { icon: "fas fa-star", label: "3" },
    ],
  },
  success: {
    steps: [
      { icon: "fas fa-tasks", label: "1" },
      { icon: "fas fa-check", label: "2" },
      { icon: "fas fa-check-circle", label: "3" },
    ],
  },
  navigation: {
    steps: [
      { icon: "fas fa-map", label: "1" },
      { icon: "fas fa-route", label: "2" },
      { icon: "fas fa-flag-checkered", label: "3" },
    ],
  },
  education: {
    steps: [
      { icon: "fas fa-book-open", label: "1" },
      { icon: "fas fa-graduation-cap", label: "2" },
      { icon: "fas fa-award", label: "3" },
    ],
  },
  list: {
    steps: [
      { icon: "fas fa-list", label: "1" },
      { icon: "fas fa-tasks", label: "2" },
      { icon: "fas fa-clipboard-check", label: "3" },
    ],
  },
  rating: {
    steps: [
      { icon: "fas fa-star-half-alt", label: "1" },
      { icon: "fas fa-star", label: "2" },
      { icon: "fas fa-trophy", label: "3" },
    ],
  },
  social: {
    steps: [
      { icon: "fas fa-hashtag", label: "1" },
      { icon: "fas fa-share-alt", label: "2" },
      { icon: "fas fa-heart", label: "3" },
    ],
  },
  settings: {
    steps: [
      { icon: "fas fa-cog", label: "1" },
      { icon: "fas fa-sliders-h", label: "2" },
      { icon: "fas fa-check-circle", label: "3" },
    ],
  },
  default: {
    steps: [
      { icon: "fas fa-circle", label: "1" },
      { icon: "fas fa-arrow-right", label: "2" },
      { icon: "fas fa-check", label: "3" },
    ],
  },
};

function StepTimeline({ steps, isAnimating }: { steps: Step[]; isAnimating: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

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

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [isAnimating, steps.length]);

  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, index) => {
        const isActive = activeStep === index;
        const isCompleted = completedSteps.includes(index);
        const isVisible = activeStep >= index;
        
        return (
          <div key={index} className="flex items-center">
            <motion.div
              className="flex flex-col items-center relative"
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0, y: 20, rotateY: -90 }}
              animate={isVisible ? { 
                opacity: 1, 
                scale: isActive ? 1.15 : 1, 
                y: 0,
                rotateY: 0 
              } : { 
                opacity: 0, 
                scale: 0, 
                y: 20,
                rotateY: -90 
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: [0.34, 1.56, 0.64, 1],
                scale: {
                  duration: 0.3,
                  ease: "easeOut"
                }
              }}
            >
              {isActive && !isCompleted && (
                <motion.div
                  className="absolute inset-0 w-10 h-10 -top-1 -left-1 rounded-xl bg-neon/30 blur-md"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              
              {isCompleted && (
                <motion.div
                  className="absolute inset-0 w-10 h-10 -top-1 -left-1 rounded-xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    background: "radial-gradient(circle, var(--neon) 0%, transparent 70%)",
                  }}
                />
              )}
              
              <motion.div 
                className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 relative overflow-hidden ${
                  isCompleted 
                    ? 'bg-neon/40 border-neon shadow-[0_0_15px_rgba(0,255,170,0.5)]' 
                    : isActive 
                      ? 'bg-neon/25 border-neon/60 shadow-[0_0_20px_rgba(0,255,170,0.4)]' 
                      : 'bg-neon/15 border-neon/30'
                }`}
                animate={isActive && !isCompleted ? {
                  borderColor: ["rgba(0,255,170,0.6)", "rgba(0,255,170,1)", "rgba(0,255,170,0.6)"],
                } : {}}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {isActive && !isCompleted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
                
                <motion.i 
                  className={`${step.icon} text-base relative z-10 ${
                    isCompleted ? 'text-white' : 'text-neon'
                  }`}
                  animate={isActive && !isCompleted ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  } : {}}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              
              {step.label && (
                <motion.span 
                  className={`text-[11px] mt-1.5 font-bold ${
                    isCompleted ? 'text-neon' : isActive ? 'text-neon/90' : 'text-neon/60'
                  }`}
                  animate={isActive ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                  }}
                >
                  {step.label}
                </motion.span>
              )}
            </motion.div>
            
            {index < steps.length - 1 && (
              <div className="flex items-center mx-2 relative">
                <motion.div
                  className="w-8 h-1 bg-neon/20 rounded-full overflow-hidden relative"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
                  animate={isVisible ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.4,
                    delay: prefersReducedMotion ? 0 : 0.2,
                    ease: "easeOut",
                  }}
                  style={{ originX: 0 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-neon via-neon to-neon/50 rounded-full"
                    initial={{ x: "-100%" }}
                    animate={completedSteps.includes(index) ? { x: "0%" } : { x: "-100%" }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>
                
                <motion.div
                  className="mx-1"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -5 }}
                  animate={completedSteps.includes(index) ? { opacity: 1, x: 0 } : { opacity: 0.4, x: -5 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2,
                  }}
                >
                  <motion.i 
                    className={`fas fa-chevron-right text-[10px] ${
                      completedSteps.includes(index) ? 'text-neon' : 'text-neon/40'
                    }`}
                    animate={activeStep === index + 1 ? {
                      x: [0, 3, 0],
                      opacity: [1, 0.7, 1],
                    } : {}}
                    transition={{
                      duration: 0.6,
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

interface AnimatedBenefitCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export function AnimatedBenefitCard({ icon, title, description, index }: AnimatedBenefitCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  const category = iconCategoryMap[icon] || "default";
  const sequence = stepSequences[category] || stepSequences.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="glass-card p-6 group hover:border-neon/60 transition-all cursor-pointer relative overflow-hidden"
      data-testid={`benefit-${index}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon/5 via-transparent to-neon/10 opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
      
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 bg-neon/10 rounded-full blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1 : 0, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="min-h-[72px] mb-4 flex items-center relative z-10">
        <AnimatePresence mode="wait">
          {isHovered ? (
            <motion.div
              key="timeline"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: -10 }}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 0.35,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="w-full"
            >
              <StepTimeline steps={sequence.steps} isAnimating={isHovered} />
            </motion.div>
          ) : (
            <motion.div
              key="static"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 0.3,
                ease: "easeOut"
              }}
              className="w-16 h-16 rounded-xl bg-neon/10 flex items-center justify-center border border-neon/20 relative group-hover:bg-neon/15"
            >
              <motion.div
                className="absolute inset-0 rounded-xl bg-neon/20 blur-md opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <motion.i 
                className={`${icon} text-neon text-2xl relative z-10`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.h3 
        className="text-lg font-semibold text-white mb-2 relative z-10"
        animate={{ 
          color: isHovered ? "rgb(0, 255, 170)" : "rgb(255, 255, 255)" 
        }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-white/60 text-sm relative z-10"
        animate={{ 
          color: isHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.6)" 
        }}
        transition={{ duration: 0.3 }}
      >
        {description}
      </motion.p>
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon/50 via-neon to-neon/50"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: isHovered ? 1 : 0, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
}
