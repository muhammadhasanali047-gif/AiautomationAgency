import React from 'react';

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
  const sizeClasses = {
    sm: 'w-24',
    md: 'w-48 sm:w-56', // Increased size so it's readable in Navbar
    lg: 'w-64',
    xl: 'w-80',
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`flex items-center justify-center ${currentSize} ${className}`}>
      <img
        src="/logo-new.jpg"
        alt="NexaCore Automations Logo"
        className={`w-full h-auto object-contain mix-blend-multiply ${monochrome ? 'grayscale opacity-70' : ''}`}
      />
    </div>
  );
}
