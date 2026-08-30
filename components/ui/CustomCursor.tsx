'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Position trackers
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer trailing follower
  const springX = useSpring(mouseX, { damping: 28, stiffness: 320, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 320, mass: 0.5 });

  useEffect(() => {
    // Only enable on non-touch devices with fine mouse pointers
    const checkFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsFinePointer(checkFinePointer);

    if (!checkFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('a, button, input, textarea, select, [role="button"], label, .cursor-pointer');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isFinePointer) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Fluid Trailing Ring */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: !isVisible ? 0 : isClicked ? 0.75 : isHovered ? 1.7 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className={`absolute top-0 left-0 w-9 h-9 rounded-full border transition-colors duration-200 ${
          isHovered
            ? 'border-blue-500/80 bg-blue-500/15 shadow-[0_0_20px_rgba(59,130,246,0.35)] backdrop-blur-[0.5px]'
            : 'border-blue-500/40 bg-blue-500/5 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
        }`}
      />

      {/* Inner Precision Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: !isVisible ? 0 : isClicked ? 1.3 : isHovered ? 0.6 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-sm"
      />
    </div>
  );
}
