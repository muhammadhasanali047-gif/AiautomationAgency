import React from 'react';

interface BrandMarkProps {
  className?: string;
  size?: number;
  monochrome?: boolean;
}

export default function BrandMark({
  className = '',
  size = 40,
  monochrome = false,
}: BrandMarkProps) {
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${className}`}
      aria-label="NexaCore Automations Symbol"
    >
      <defs>
        {/* Blue to Cyan to Purple Gradient (Main Stem) */}
        <linearGradient
          id={`nexa-blue-purple-${uniqueId}`}
          x1="20"
          y1="25"
          x2="55"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={monochrome ? 'currentColor' : '#00A3FF'} />
          <stop offset="45%" stopColor={monochrome ? 'currentColor' : '#2563EB'} />
          <stop offset="100%" stopColor={monochrome ? 'currentColor' : '#7C3AED'} />
        </linearGradient>

        {/* Diagonal Ribbon Fold Gradient */}
        <linearGradient
          id={`nexa-diagonal-${uniqueId}`}
          x1="35"
          y1="30"
          x2="85"
          y2="75"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={monochrome ? 'currentColor' : '#38BDF8'} />
          <stop offset="60%" stopColor={monochrome ? 'currentColor' : '#60A5FA'} />
          <stop offset="100%" stopColor={monochrome ? 'currentColor' : '#C7D2FE'} />
        </linearGradient>

        {/* Orange to Gold Gradient (Right Stem & Gear) */}
        <linearGradient
          id={`nexa-orange-gold-${uniqueId}`}
          x1="70"
          y1="25"
          x2="95"
          y2="95"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={monochrome ? 'currentColor' : '#FBBF24'} />
          <stop offset="50%" stopColor={monochrome ? 'currentColor' : '#F59E0B'} />
          <stop offset="100%" stopColor={monochrome ? 'currentColor' : '#EA580C'} />
        </linearGradient>

        {/* Diagonal Return Fold (Orange) */}
        <linearGradient
          id={`nexa-fold-orange-${uniqueId}`}
          x1="55"
          y1="60"
          x2="80"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={monochrome ? 'currentColor' : '#F97316'} />
          <stop offset="100%" stopColor={monochrome ? 'currentColor' : '#EA580C'} />
        </linearGradient>

        {/* Circuit Cyan */}
        <linearGradient
          id={`nexa-cyan-${uniqueId}`}
          x1="10"
          y1="40"
          x2="35"
          y2="70"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={monochrome ? 'currentColor' : '#06B6D4'} />
          <stop offset="100%" stopColor={monochrome ? 'currentColor' : '#2563EB'} />
        </linearGradient>

        {/* Subtle drop shadow */}
        <filter id={`nexa-shadow-${uniqueId}`} x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
      </defs>

      <g filter={monochrome ? undefined : `url(#nexa-shadow-${uniqueId})`}>
        {/* Orbital Gold Arc with Node at Top */}
        <path
          d="M 58 18 C 75 16 90 24 96 35"
          stroke={monochrome ? 'currentColor' : '#F59E0B'}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle
          cx="96.5"
          cy="35"
          r="3"
          fill={monochrome ? 'currentColor' : '#F59E0B'}
        />

        {/* Left Circuit Tracks & Nodes */}
        <path
          d="M 37 46 C 25 46 22 52 18 52"
          stroke={monochrome ? 'currentColor' : '#0284C7'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="17.5" cy="52" r="3.2" fill={monochrome ? 'currentColor' : '#0284C7'} />

        <path
          d="M 39 70 C 23 70 20 63 15 63"
          stroke={monochrome ? 'currentColor' : '#0284C7'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="14.5" cy="63" r="3.2" fill={monochrome ? 'currentColor' : '#0284C7'} />

        <path
          d="M 44 86 C 30 86 26 73 20 73"
          stroke={monochrome ? 'currentColor' : '#0369A1'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Gear Accent on Right of Stem */}
        <path
          d="M 85 42 L 89 44 L 92 42 L 95 44 L 94 48 L 98 52 L 102 52 L 102 56 L 98 58 L 98 64 L 102 66 L 101 70 L 97 71 L 95 76 L 98 80 L 95 83 L 90 82 L 87 86 L 82 85"
          stroke={monochrome ? 'currentColor' : `url(#nexa-orange-gold-${uniqueId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={monochrome ? '0.7' : '0.85'}
        />

        {/* Right Vertical Stem (Orange/Gold) */}
        <rect
          x="73"
          y="28"
          width="13"
          height="52"
          rx="6.5"
          fill={`url(#nexa-orange-gold-${uniqueId})`}
        />

        {/* Lower Orange Fold */}
        <path
          d="M 52 56 L 85 79 C 89 82 89 88 84 92 C 79 96 73 95 68 90 L 51 68 Z"
          fill={`url(#nexa-fold-orange-${uniqueId})`}
        />

        {/* Diagonal Folding Ribbon (Blue / Cyan) */}
        <path
          d="M 37 28 L 81 68 L 74 76 L 37 36 Z"
          fill={`url(#nexa-diagonal-${uniqueId})`}
          opacity="0.95"
        />

        {/* Left Vertical Stem (Electric Blue to Purple) */}
        <path
          d="M 37 28 C 43 28 47 32 47 38 L 47 79 C 47 88 41 93 35 93 C 29 93 25 87 25 79 L 25 38 C 25 32 30 28 37 28 Z"
          fill={`url(#nexa-blue-purple-${uniqueId})`}
        />
      </g>
    </svg>
  );
}
