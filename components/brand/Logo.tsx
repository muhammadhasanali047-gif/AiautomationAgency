import React from 'react';
import BrandMark from './BrandMark';

interface LogoProps {
  variant?: 'primary' | 'horizontal' | 'icon' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  monochrome?: boolean;
}

export default function Logo({
  variant = 'horizontal',
  size = 'md',
  showTagline = false,
  className = '',
  monochrome = false,
}: LogoProps) {
  // Dimensions based on size
  const markSizes = {
    sm: 32,
    md: 40,
    lg: 52,
    xl: 72,
  };

  const textSizes = {
    sm: { main: 'text-lg', sub: 'text-[9px]', tag: 'text-[7px]' },
    md: { main: 'text-xl sm:text-2xl', sub: 'text-[10px] tracking-[0.25em]', tag: 'text-[8px] tracking-[0.3em]' },
    lg: { main: 'text-3xl', sub: 'text-xs tracking-[0.3em]', tag: 'text-[9px] tracking-[0.35em]' },
    xl: { main: 'text-4xl sm:text-5xl', sub: 'text-sm tracking-[0.35em]', tag: 'text-xs tracking-[0.4em]' },
  };

  const currentMarkSize = markSizes[size];
  const currentTextSize = textSizes[size];

  if (variant === 'icon') {
    return <BrandMark size={currentMarkSize} monochrome={monochrome} className={className} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <BrandMark size={currentMarkSize * 1.4} monochrome={monochrome} className="mb-3" />
        <div className={`font-black tracking-tight leading-[0.85] ${currentTextSize.main}`}>
          <span className={monochrome ? 'text-current' : 'text-[#0F172A]'}>NEXA</span>
          <span
            className={
              monochrome
                ? 'text-current opacity-80'
                : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500'
            }
          >
            CORE
          </span>
        </div>
        <div className="flex items-center mt-2 justify-center">
          <span className={`uppercase font-bold ${monochrome ? 'text-current opacity-70' : 'text-slate-500'} ${currentTextSize.sub}`}>
            AUTOMATIONS
          </span>
        </div>
        {showTagline && (
          <p className={`text-slate-400 font-semibold uppercase mt-1.5 ${currentTextSize.tag}`}>
            AUTOMATE <span className="text-blue-500/50">•</span> INNOVATE{' '}
            <span className="text-cyan-500/50">•</span> ELEVATE
          </p>
        )}
      </div>
    );
  }

  // Horizontal Logo (Ideal for Navbar & Headers)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <BrandMark size={currentMarkSize} monochrome={monochrome} />

      <div className="flex flex-col justify-center">
        {/* Main Wordmark: NEXA (Navy) + CORE (Tech Gradient) */}
        <div className={`font-black tracking-tight leading-[0.85] ${currentTextSize.main}`}>
          <span className={monochrome ? 'text-current' : 'text-[#0F172A]'}>NEXA</span>
          <span
            className={
              monochrome
                ? 'text-current opacity-80'
                : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500'
            }
          >
            CORE
          </span>
        </div>

        {/* Subtitle: AUTOMATIONS (Clean, tracked out, professional slate) */}
        <div className="flex items-center mt-1.5 ml-0.5">
          <span className={`font-bold uppercase ${monochrome ? 'text-current opacity-70' : 'text-slate-500'} ${currentTextSize.sub}`}>
            AUTOMATIONS
          </span>
        </div>

        {/* Optional Tagline */}
        {showTagline && (
          <p className={`text-slate-400 font-semibold uppercase mt-0.5 ml-0.5 ${currentTextSize.tag}`}>
            AUTOMATE • INNOVATE • ELEVATE
          </p>
        )}
      </div>
    </div>
  );
}
