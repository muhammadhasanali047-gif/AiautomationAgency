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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/50 shadow-[0_0_15px_-3px_rgba(37,99,235,0.2)] backdrop-blur-xl"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="typography-label text-slate-100">
              AUTOMATE <span className="text-slate-600 font-normal">/</span> INNOVATE <span className="text-slate-600 font-normal">/</span> ELEVATE
            </span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-5"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] text-slate-50">
              Automate Smarter <br />
              Build Better <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
                Scale Faster
              </span>
            </h1>

            {/* 3 Specialist Skill Badges */}
            <div className="flex flex-wrap items-center justify-start gap-2 pt-1">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-md">
                AI Automation & Chatbots
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 backdrop-blur-md">
                Email Marketing
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 backdrop-blur-md">
                Full-Stack Development
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl"
          >
            <span className="text-slate-200 font-semibold">NexaCore Automations</span> delivers three specialized capabilities in one unified team: <span className="text-slate-200 font-medium">AI Automation & Chatbots</span> to streamline business workflows, <span className="text-slate-200 font-medium">Email Marketing</span> to drive client outreach, and <span className="text-slate-200 font-medium">Full-Stack Development</span> to engineer scalable web platforms.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-wrap items-center justify-start gap-4 -mt-1"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)] transition-all duration-200 hover:shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 font-bold tracking-wide active:scale-[0.98]"
            >
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-slate-200 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 shadow-sm transition-all duration-200 hover:-translate-y-0.5 font-bold tracking-wide active:scale-[0.98]"
            >
              <span>View Case Studies</span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: AI Workflow Mockup */}
        <div className="relative hidden lg:block w-full max-w-lg mx-auto lg:-mt-12 xl:-mt-16">


          {/* Main Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="backdrop-blur-md bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 shadow-2xl shadow-blue-900/20 relative overflow-hidden"
          >
            {/* Glow behind the nodes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />

            <div className="relative space-y-3">
              
              {/* Node 1: Trigger */}
              <div className="bg-slate-800 rounded-2xl p-3.5 border border-slate-700 shadow-sm flex items-center gap-4 relative z-10 transition-transform hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0 border border-orange-500/20">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">Lead Received</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Webhook Trigger • form_submission</p>
                </div>
              </div>

              {/* Animated Connector */}
              <div className="w-1 h-5 bg-gradient-to-b from-orange-500/20 to-blue-500/20 mx-auto rounded-full overflow-hidden relative">
                <motion.div
                  animate={{ y: [ -20, 20 ] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="w-full h-1/2 bg-blue-500 rounded-full"
                />
              </div>

              {/* Node 2: AI Processing */}
              <div className="bg-slate-800 rounded-2xl p-3.5 border border-blue-500/30 shadow-[0_0_15px_-3px_rgba(37,99,235,0.2)] flex items-center gap-4 relative z-10 transition-transform hover:scale-[1.02]">
                <div className="relative">
                   <div className="absolute inset-0 bg-blue-500 rounded-xl animate-ping opacity-25"></div>
                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0 relative z-10 shadow-sm">
                     <Bot className="w-5 h-5" />
                   </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                    NexaCore AI Agent
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-blue-400 tracking-wide uppercase">Thinking / Processing...</span>
                  </div>
                </div>
              </div>

              {/* Animated Connector */}
              <div className="w-1 h-5 bg-gradient-to-b from-blue-500/20 to-emerald-500/20 mx-auto rounded-full overflow-hidden relative">
                <motion.div
                  animate={{ y: [ -20, 20 ] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.5 }}
                  className="w-full h-1/2 bg-emerald-500 rounded-full"
                />
              </div>

              {/* Node 3: Output */}
              <div className="bg-slate-800 rounded-2xl p-3.5 border border-slate-700 shadow-sm flex items-center gap-4 relative z-10 transition-transform hover:scale-[1.02]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/20">
                  <Database className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-100 text-sm">Synced to CRM</h3>
                  <p className="text-xs text-slate-400 mb-1">Automated Reply Sent</p>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-bold text-emerald-400 tracking-wide uppercase">Completed (0.4s)</span>
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
