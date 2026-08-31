'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import Logo from '@/components/brand/Logo';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-3'
          : 'bg-white/80 backdrop-blur-md py-3.5 sm:py-4 border-b border-slate-100/60'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* NexaCore Logo (Strict h-8/h-9 horizontal lockup) */}
          <Link href="/" className="group flex items-center h-8 sm:h-9 focus:outline-none">
            <Logo variant="horizontal" size="sm" className="h-full" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-0.5 bg-slate-50/80 border border-slate-200/80 rounded-full px-2.5 py-1 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-1.5 text-xs lg:text-sm transition-colors duration-200 rounded-full ${
                    isActive
                      ? 'text-[#0F172A] font-semibold'
                      : 'text-slate-600 hover:text-blue-600 font-medium'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white border border-slate-200/80 rounded-full shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="typography-btn group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Let&apos;s Build Together</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-b border-slate-200/80 shadow-xl overflow-hidden"
          >
            <div className="px-5 pt-3 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-2.5 rounded-xl text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/80'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="typography-btn flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 shadow-md shadow-blue-600/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Let&apos;s Build Together</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
