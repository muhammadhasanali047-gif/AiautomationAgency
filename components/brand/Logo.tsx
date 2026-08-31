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
    sm: 38,
    md: 48,
    lg: 64,
    xl: 84,
  };

  const textSizes = {
    sm: { rest: 'text-lg', auto: 'text-[7.5px] tracking-[0.15em]', tag: 'text-[7px] tracking-[0.3em]' },
    md: { rest: 'text-2xl', auto: 'text-[9.5px] tracking-[0.18em]', tag: 'text-[8px] tracking-[0.3em]' },
    lg: { rest: 'text-4xl', auto: 'text-[13px] tracking-[0.2em]', tag: 'text-[9px] tracking-[0.35em]' },
    xl: { rest: 'text-5xl sm:text-6xl', auto: 'text-[15px] tracking-[0.25em]', tag: 'text-xs tracking-[0.4em]' },
  };

  const currentMarkSize = markSizes[size];
  const currentTextSize = textSizes[size];

  if (variant === 'icon') {
    return <BrandMark size={currentMarkSize} monochrome={monochrome} className={className} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <BrandMark size={currentMarkSize * 1.3} monochrome={monochrome} className="mb-3" />
        <div className="flex flex-col items-end">
          <div className="flex items-baseline">
            <span className={`font-black tracking-tight leading-none ${monochrome ? 'text-current' : 'text-[#0F172A]'} ${currentTextSize.rest}`}>exa</span>
            <span
              className={`font-black tracking-tight leading-none ${currentTextSize.rest} ${
                monochrome
                  ? 'text-current opacity-80'
                  : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500'
              }`}
            >
              core
            </span>
          </div>
          <div className="flex justify-end mt-0.5">
            <span className={`uppercase font-extrabold ${monochrome ? 'text-current opacity-90' : 'text-slate-700'} ${currentTextSize.auto}`}>
              AUTOMATION
            </span>
          </div>
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
    <div className={`flex items-center gap-0.5 ${className}`}>
      <BrandMark size={currentMarkSize} monochrome={monochrome} />

      <div className="flex flex-col pt-1">
        {/* Main Wordmark: exa (Navy) + core (Tech Gradient) */}
        <div className="flex items-baseline">
          <span className={`font-black tracking-tight leading-none ${monochrome ? 'text-current' : 'text-[#0F172A]'} ${currentTextSize.rest}`}>exa</span>
          <span
            className={`font-black tracking-tight leading-none ${currentTextSize.rest} ${
              monochrome
                ? 'text-current opacity-80'
                : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500'
            }`}
          >
            core
          </span>
        </div>

        {/* Subtitle: AUTOMATION aligned strictly under core */}
        <div className="flex justify-end mt-[2px]">
          <span className={`font-extrabold uppercase ${monochrome ? 'text-current opacity-90' : 'text-slate-700'} ${currentTextSize.auto}`}>
            AUTOMATION
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
