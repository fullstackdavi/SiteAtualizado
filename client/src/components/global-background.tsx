import { memo } from "react";

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
    </div>
  );
});

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0d1117 50%, #151922 100%)',
        }}
      />
      
      <MobileGradientFallback />
      
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
      
      <div 
        className="absolute inset-0 pointer-events-none z-[7]"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 25% 15%, rgba(255, 200, 0, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 35% at 75% 45%, rgba(255, 180, 0, 0.04) 0%, transparent 45%)
          `
        }}
      />
    </div>
  );
}
