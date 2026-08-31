import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  // A professional navbar logo MUST be horizontal to maximize readability.
  // We extract the 'N' mark from the uploaded image and pair it with crisp CSS typography.
  
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      
      {/* 1. Cropped N Mark from Image */}
      <div className="relative overflow-hidden w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center mix-blend-multiply">
        <img 
          src="/logo-new.jpg" 
          alt="NexaCore Symbol"
          className="absolute max-w-none w-[200%] h-[200%] object-cover object-[50%_33%]"
        />
      </div>

      {/* 2. Professional Typography (Horizontal) */}
      <div className="flex flex-col justify-center pt-0.5">
        <div className="flex items-baseline">
          <span className="font-black tracking-tighter text-xl sm:text-2xl text-[#0F172A] leading-none">NEXA</span>
          <span className="font-black tracking-tighter text-xl sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 leading-none">
            CORE
          </span>
        </div>
        <div className="flex items-center justify-between w-full mt-[2px] px-[2px]">
          <div className="h-[2px] w-2 bg-blue-500 rounded-full opacity-80"></div>
          <span className="font-bold text-[7px] sm:text-[8px] tracking-[0.27em] text-slate-500 uppercase ml-1 leading-none">
            AUTOMATIONS
          </span>
          <div className="h-[2px] w-2 bg-orange-500 rounded-full opacity-80"></div>
        </div>
      </div>
      
    </div>
  );
}
