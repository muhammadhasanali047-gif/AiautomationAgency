import React from 'react';
import Image from 'next/image';

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
  // We use the uploaded full logo image.
  // Because the image is square and contains the mark + text + tagline,
  // we adjust its size dynamically so the text remains readable in the navbar.
  
  const sizeClasses = {
    sm: 'w-24', // e.g. mobile
    md: 'w-32 sm:w-40', // navbar
    lg: 'w-64', // footer
    xl: 'w-80', // hero/large displays
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  // We use mix-blend-multiply to remove the white background of the JPEG automatically on light backgrounds
  return (
    <div className={lex items-center justify-center  }>
      <img
        src="/logo-new.jpg"
        alt="NexaCore Automations Logo"
        className={w-full h-auto object-contain mix-blend-multiply }
      />
    </div>
  );
}
