import React from 'react';

interface StatKarmayogiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'dark' | 'light' | 'colored';
  className?: string;
}

export const StatKarmayogiLogo: React.FC<StatKarmayogiLogoProps> = ({
  size = 'md',
  showText = true,
  variant = 'dark',
  className = '',
}) => {
  const dimensions = {
    sm: { icon: 30, text: 'text-sm', badge: 'text-[9px] px-1 py-0.5' },
    md: { icon: 38, text: 'text-base', badge: 'text-[10px] px-1.5 py-0.5' },
    lg: { icon: 48, text: 'text-xl', badge: 'text-[11px] px-2 py-1' },
    xl: { icon: 64, text: 'text-2xl', badge: 'text-xs px-2.5 py-1' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Emblem SVG: Karmayogi 24-Spoke Wheel + Statistical Data Bars */}
      <div className="relative group shrink-0">
        <svg
          width={dimensions.icon}
          height={dimensions.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Emerald Gradient */}
            <linearGradient id="skEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Amber Gold Gradient */}
            <linearGradient id="skGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Deep Slate Shield Background */}
            <linearGradient id="skShieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="skGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Shield Container */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="24"
            fill="url(#skShieldGrad)"
            stroke="url(#skEmeraldGrad)"
            strokeWidth="3"
          />

          {/* Karmayogi 24 Spoke Outer Ring Motif */}
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="url(#skGoldGrad)"
            strokeWidth="2.5"
            strokeDasharray="3 3.5"
            opacity="0.9"
          />

          {/* Inner Statistical Growth Bar Graph */}
          <rect x="32" y="52" width="9" height="20" rx="3" fill="url(#skGoldGrad)" />
          <rect x="45" y="42" width="9" height="30" rx="3" fill="url(#skEmeraldGrad)" />
          <rect x="58" y="32" width="9" height="40" rx="3" fill="url(#skEmeraldGrad)" />

          {/* Ascending Telemetry Line */}
          <path
            d="M 30 56 L 46 44 L 62 34 L 74 24"
            stroke="#F59E0B"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* AI Telemetry Pulse Star */}
          <circle cx="74" cy="24" r="5" fill="#FBBF24" filter="url(#skGlow)" />
          <polygon
            points="74,17 76,22 81,24 76,26 74,31 72,26 67,24 72,22"
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* Brand Title Text */}
      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-black tracking-tight ${dimensions.text} ${
                variant === 'dark'
                  ? 'text-white'
                  : variant === 'light'
                  ? 'text-slate-900'
                  : 'text-slate-900'
              }`}
            >
              StatKarmayogi
            </span>
            <span className={`font-black bg-emerald-500 text-slate-950 rounded uppercase tracking-wider ${dimensions.badge}`}>
              AI
            </span>
          </div>
          <span className={`text-[10px] font-extrabold tracking-wider uppercase mt-1 ${variant === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>
            MoSPI Enterprise Portal
          </span>
        </div>
      )}
    </div>
  );
};
