'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] lg:min-h-[80vh] flex items-center justify-center pt-24 pb-12 sm:pt-24 sm:pb-16 overflow-hidden nexa-mesh-bg">
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 nexa-grid-pattern pointer-events-none" />

      {/* Decorative Brand Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-start">
        
        {/* TEXT COLUMN: Left Aligned */}
        <div className="space-y-6 text-left flex flex-col items-start max-w-4xl">
          {/* Tagline Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/90 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="typography-label text-[#0F172A]">
              AUTOMATE <span className="text-slate-300 font-normal">/</span> INNOVATE <span className="text-slate-300 font-normal">/</span> ELEVATE
            </span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-5"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] text-[#0F172A]">
              Automate Smarter <br />
              Build Better <br />
              <span className="nexa-gradient-text">
                Scale Faster
              </span>
            </h1>

            {/* 3 Specialist Skill Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
                AI Automation & Chatbots
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 shadow-xs">
                Email Marketing
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-xs">
                Full-Stack Development
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-lg xl:text-xl text-slate-600 leading-relaxed max-w-2xl"
          >
            <span className="text-[#0F172A] font-semibold">NexaCore Automations</span> delivers three specialized capabilities in one unified team: <span className="text-[#0F172A] font-medium">AI Automation & Chatbots</span> to streamline business workflows, <span className="text-[#0F172A] font-medium">Email Marketing</span> to drive client outreach, and <span className="text-[#0F172A] font-medium">Full-Stack Development</span> to engineer scalable web platforms.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-600/25 transition-all duration-200 hover:shadow-blue-600/40 hover:-translate-y-0.5 font-bold tracking-wide"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[#0F172A] bg-white hover:bg-slate-50 border-2 border-[#0F172A] shadow-sm transition-all duration-200 hover:-translate-y-0.5 font-bold tracking-wide"
            >
              <span>View Our Work</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
