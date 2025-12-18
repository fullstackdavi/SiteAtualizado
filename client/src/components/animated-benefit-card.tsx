import { memo } from "react";

interface AnimatedBenefitCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export const AnimatedBenefitCard = memo(function AnimatedBenefitCard({ 
  icon, 
  title, 
  description, 
  index 
}: AnimatedBenefitCardProps) {
  return (
    <div
      className="glass-card p-6 group hover:border-neon/60 transition-all cursor-pointer relative overflow-hidden"
      data-testid={`benefit-${index}`}
    >
      <div className="min-h-[72px] mb-4 flex items-center relative z-10">
        <div className="w-16 h-16 rounded-xl bg-neon/10 flex items-center justify-center border border-neon/20 relative group-hover:bg-neon/15">
          <i className={`${icon} text-neon text-2xl relative z-10`} />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2 relative z-10 group-hover:text-neon transition-colors">
        {title}
      </h3>
      
      <p className="text-white/60 text-sm relative z-10 group-hover:text-white/80 transition-colors">
        {description}
      </p>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon/50 via-neon to-neon/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
});
