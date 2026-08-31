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
    sm: { N: 'text-2xl', rest: 'text-sm', auto: 'text-[7px] tracking-[0.1em]', tag: 'text-[7px] tracking-[0.3em]' },
    md: { N: 'text-3xl sm:text-4xl', rest: 'text-lg sm:text-xl', auto: 'text-[8px] sm:text-[9px] tracking-[0.15em]', tag: 'text-[8px] tracking-[0.3em]' },
    lg: { N: 'text-5xl', rest: 'text-3xl', auto: 'text-[11px] tracking-[0.2em]', tag: 'text-[9px] tracking-[0.35em]' },
    xl: { N: 'text-6xl sm:text-7xl', rest: 'text-4xl sm:text-5xl', auto: 'text-xs tracking-[0.25em]', tag: 'text-xs tracking-[0.4em]' },
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
        <div className="flex flex-col items-end">
          <div className="flex items-baseline">
            <span className={`font-black tracking-tight leading-none ${monochrome ? 'text-current' : 'text-white'} ${currentTextSize.N}`}>N</span>
            <span className={`font-black tracking-tight leading-none ${monochrome ? 'text-current' : 'text-white'} ${currentTextSize.rest}`}>exa</span>
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
            <span className={`uppercase font-bold ${monochrome ? 'text-current opacity-70' : 'text-slate-400'} ${currentTextSize.auto}`}>
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
    <div className={`flex items-center gap-3 ${className}`}>
      <BrandMark size={currentMarkSize} monochrome={monochrome} />

      <div className="flex flex-col pt-1">
        {/* Main Wordmark: N (Large) + exa (Navy) + core (Tech Gradient) */}
        <div className="flex items-baseline">
          <span className={`font-black tracking-tighter leading-none ${monochrome ? 'text-current' : 'text-white'} ${currentTextSize.N}`}>N</span>
          <span className={`font-black tracking-tight leading-none ml-[1px] ${monochrome ? 'text-current' : 'text-white'} ${currentTextSize.rest}`}>exa</span>
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

        {/* Subtitle: AUTOMATION aligned to the right (under core) */}
        <div className="flex justify-end mt-[1px]">
          <span className={`font-bold uppercase ${monochrome ? 'text-current opacity-70' : 'text-slate-400'} ${currentTextSize.auto}`}>
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
