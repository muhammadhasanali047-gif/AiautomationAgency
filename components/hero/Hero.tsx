'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Bot, Code2, Workflow, Mail } from 'lucide-react';

const FloatingBadge = ({ icon: Icon, label, delay, positionClass }: { icon: any, label: string, delay: number, positionClass: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1, y: [0, -20, 0] }}
    transition={{
      opacity: { duration: 1, delay },
      scale: { duration: 1, delay },
      y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 },
    }}
    className={`hidden lg:flex absolute items-center gap-3 px-4 py-2.5 bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] pointer-events-none z-0 ${positionClass}`}
  >
    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
      <Icon size={20} strokeWidth={2.5} />
    </div>
    <span className="text-sm font-black text-slate-800 tracking-wide">{label}</span>
  </motion.div>
);

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] lg:min-h-[80vh] flex items-center justify-center pt-24 pb-12 sm:pt-24 sm:pb-16 overflow-hidden nexa-mesh-bg">
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 nexa-grid-pattern pointer-events-none" />

      {/* Decorative Brand Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* LEFT COLUMN: Visuals / Animation */}
        <div className="relative hidden lg:flex h-[500px] w-full items-center justify-center">
          {/* A glowing central core to tie the badges together visually */}
          <div className="absolute w-32 h-32 bg-blue-600/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute w-16 h-16 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 z-10">
            <span className="text-white font-black text-xl tracking-tighter">Nexa</span>
          </div>

          {/* Floating Badges arranged in an orbit-like cluster */}
          <FloatingBadge icon={Workflow} label="Automated Workflows" delay={0.2} positionClass="top-[10%] left-[5%] -rotate-3" />
          <FloatingBadge icon={Bot} label="AI Agents" delay={0.4} positionClass="top-[15%] right-[0%] rotate-2" />
          <FloatingBadge icon={Code2} label="Custom SaaS" delay={0.6} positionClass="bottom-[15%] left-[2%] rotate-3" />
          <FloatingBadge icon={Mail} label="Email Infrastructure" delay={0.8} positionClass="bottom-[10%] right-[5%] -rotate-2" />
        </div>

        {/* RIGHT COLUMN: Text */}
        <div className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
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
