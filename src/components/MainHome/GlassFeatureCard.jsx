import React from "react";

const GlassFeatureCard = ({ icon, title, subtitle, className = "" }) => {
  return (
    <div
      className={`
        absolute
        rounded-2xl
        bg-white/15
        backdrop-blur-2xl
        border border-dark/30
        shadow-[0_8px_30px_rgba(255,255,255,0.15)]
        p-4
        transition-all duration-300
        hover:bg-white/20
        hover:scale-[1.03]
        z-50
        ${className}
      `}
    >
      <div className="flex items-center gap-3">
        {/* ICON */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white">
          {icon}
        </div>

        {/* TEXT */}
        <div>
          <p className="text-sm font-semibold text-dark">{title}</p>
          <p className="text-xs text-dark/70">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default GlassFeatureCard;
