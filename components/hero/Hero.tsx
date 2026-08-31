'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Sparkles, Zap, Database, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center pt-24 pb-12 sm:pt-24 sm:pb-16 overflow-hidden nexa-mesh-bg">
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 nexa-grid-pattern pointer-events-none" />

      {/* Decorative Brand Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Text & CTAs */}
        <div className="space-y-6 text-left flex flex-col items-start max-w-2xl lg:max-w-none">
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
            <h1 className="text-5xl sm:text-6xl lg:text-5xl xl:text-7xl font-black tracking-tight leading-[1.05] text-[#0F172A]">
              Automate Smarter <br />
              Build Better <br />
              <span className="nexa-gradient-text">
                Scale Faster
              </span>
            </h1>

            {/* 3 Specialist Skill Badges */}
            <div className="flex flex-wrap items-center justify-start gap-2 pt-1">
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
            className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
          >
            <span className="text-[#0F172A] font-semibold">NexaCore Automations</span> delivers three specialized capabilities in one unified team: <span className="text-[#0F172A] font-medium">AI Automation & Chatbots</span> to streamline business workflows, <span className="text-[#0F172A] font-medium">Email Marketing</span> to drive client outreach, and <span className="text-[#0F172A] font-medium">Full-Stack Development</span> to engineer scalable web platforms.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-wrap items-center justify-start gap-4 pt-2"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-600/25 transition-all duration-200 hover:shadow-blue-600/40 hover:-translate-y-0.5 font-bold tracking-wide"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[#0F172A] bg-transparent hover:bg-slate-50 border border-slate-300 hover:border-slate-400 shadow-sm transition-all duration-200 hover:-translate-y-0.5 font-bold tracking-wide"
            >
              <span>View Case Studies</span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: AI Workflow Mockup */}
        <div className="relative hidden lg:block w-full max-w-lg mx-auto lg:-mt-12 xl:-mt-16">
          {/* Floating Badges */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -top-6 -right-6 z-20 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-lg shadow-slate-200/50 flex items-center gap-2"
          >
            <span className="text-xl">⚡</span>
            <span className="text-sm font-bold text-slate-800">99.9% Uptime</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-6 -left-6 z-20 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-lg shadow-slate-200/50 flex items-center gap-2"
          >
            <span className="text-xl">🚀</span>
            <span className="text-sm font-bold text-slate-800">5x Lead Conversion</span>
          </motion.div>

          {/* Main Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="backdrop-blur-md bg-white/70 border border-slate-200/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Glow behind the nodes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />

            <div className="relative space-y-3">
              
              {/* Node 1: Trigger */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex items-center gap-4 relative z-10 transition-transform hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 border border-orange-100">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Lead Received</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Webhook Trigger • form_submission</p>
                </div>
              </div>

              {/* Animated Connector */}
              <div className="w-1 h-5 bg-gradient-to-b from-orange-100 to-blue-100 mx-auto rounded-full overflow-hidden relative">
                <motion.div
                  animate={{ y: [ -20, 20 ] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="w-full h-1/2 bg-blue-400 rounded-full"
                />
              </div>

              {/* Node 2: AI Processing */}
              <div className="bg-white rounded-2xl p-3.5 border border-blue-200 shadow-md shadow-blue-500/5 flex items-center gap-4 relative z-10 transition-transform hover:scale-[1.02]">
                <div className="relative">
                   <div className="absolute inset-0 bg-blue-400 rounded-xl animate-ping opacity-25"></div>
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0 relative z-10 shadow-sm">
                     <Bot className="w-5 h-5" />
                   </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    NexaCore AI Agent
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-blue-600 tracking-wide uppercase">Thinking / Processing...</span>
                  </div>
                </div>
              </div>

              {/* Animated Connector */}
              <div className="w-1 h-5 bg-gradient-to-b from-blue-100 to-emerald-100 mx-auto rounded-full overflow-hidden relative">
                <motion.div
                  animate={{ y: [ -20, 20 ] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.5 }}
                  className="w-full h-1/2 bg-emerald-400 rounded-full"
                />
              </div>

              {/* Node 3: Output */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex items-center gap-4 relative z-10 transition-transform hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-100">
                  <Database className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-sm">Synced to CRM</h3>
                  <p className="text-xs text-slate-500 mb-1">Automated Reply Sent</p>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-600 tracking-wide uppercase">Completed (0.4s)</span>
                  </div>
                </div>
              </div>
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
