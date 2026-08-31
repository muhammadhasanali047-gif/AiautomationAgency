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

      {/* Floating Side Animations */}
      <FloatingBadge icon={Workflow} label="Automated Workflows" delay={0.2} positionClass="left-[4%] xl:left-[10%] top-[25%] -rotate-2" />
      <FloatingBadge icon={Code2} label="Custom SaaS" delay={0.6} positionClass="left-[6%] xl:left-[12%] bottom-[30%] rotate-3" />
      
      <FloatingBadge icon={Bot} label="AI Agents" delay={0.4} positionClass="right-[4%] xl:right-[10%] top-[30%] rotate-2" />
      <FloatingBadge icon={Mail} label="Email Infrastructure" delay={0.8} positionClass="right-[6%] xl:right-[12%] bottom-[25%] -rotate-3" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-6">
        {/* Tagline Pill (Dots removed) */}
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

        {/* Main Hero Headline (Dots removed) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="typography-hero">
            Automate Smarter <br />
            Build Better <br />
            <span className="nexa-gradient-text">
              Scale Faster
            </span>
          </h1>

          {/* 3 Specialist Skill Badges (Dots removed) */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
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

        {/* Description (Explaining the 3 distinct specializations concisely where NexaCore is introduced) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="typography-body-lg max-w-2xl mx-auto text-slate-600"
        >
          <span className="text-[#0F172A] font-semibold">NexaCore Automations</span> delivers three specialized capabilities in one unified team: <span className="text-[#0F172A] font-medium">AI Automation & Chatbots</span> to streamline business workflows, <span className="text-[#0F172A] font-medium">Email Marketing</span> to drive client outreach, and <span className="text-[#0F172A] font-medium">Full-Stack Development</span> to engineer scalable web platforms.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-1"
        >
          <Link
            href="/contact"
            className="typography-btn group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-600/25 transition-all duration-200 hover:shadow-blue-600/40 hover:-translate-y-0.5"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/about"
            className="typography-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[#0F172A] bg-white hover:bg-slate-50 border-2 border-[#0F172A] shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <span>View Our Work</span>
          </Link>
        </motion.div>

        {/* Value Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-slate-200 max-w-lg mx-auto text-xs sm:text-sm text-slate-600 font-medium"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Production Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
            <span>Zero Hallucination</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
            <span>Secure Cloud RLS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
