import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Brain,
  Cpu,
  Workflow,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import TeamSection from '@/components/team/TeamSection';

export const metadata: Metadata = {
  title: 'About NexaCore Automations',
  description:
    'NexaCore Automations is a premium AI Automation & Full-Stack Development Agency bridging generative AI, autonomous agent workflows, and scalable digital products.',
};

export default function AboutPage() {
  return (
    <div className="relative pt-24 pb-16 overflow-hidden bg-white nexa-mesh-bg">
      {/* Subtle Background Grid & Glows */}
      <div className="absolute inset-0 nexa-grid-pattern pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">About NexaCore Automations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            AI Automation, Email Marketing & <br className="hidden sm:block" />
            <span className="nexa-gradient-text">
              Full-Stack Software Agency
            </span>
          </h1>

          {/* 3 Discipline Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              AI Automation & Chatbots
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              Email Marketing
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200">
              Full-Stack Development
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            At NexaCore, we unite three core capabilities in one specialized agency: <span className="text-[#0F172A] font-semibold">AI Automation & Chatbots</span> to streamline business workflows, <span className="text-[#0F172A] font-semibold">Email Marketing</span> to scale customer outreach, and <span className="text-[#0F172A] font-semibold">Full-Stack Development</span> to engineer scalable web platforms.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 sm:mb-14">
          {/* Card 1 */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-3.5">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
              <Brain className="w-5 h-5" />
            </div>
            <h2 className="typography-h3 text-xl sm:text-2xl text-[#0F172A]">
              Our Engineering Philosophy
            </h2>
            <p className="typography-body text-slate-600">
              We reject brittle no-code workarounds for mission-critical operations. Instead, we engineer resilient software architectures using Next.js App Router, secure server-side execution, and robust relational schemas.
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Deterministic APIs with strict schema validation</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Zero client-side secrets or exposed credentials</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Database-level Row Level Security (RLS) enforcement</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-3.5">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="typography-h3 text-xl sm:text-2xl text-[#0F172A]">
              Mission & Deliverables
            </h2>
            <p className="typography-body text-slate-600">
              Our mission is to empower growing businesses by delivering production-grade systems across all three of our core engineering disciplines:
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>AI Automation & 24/7 WhatsApp Conversational Chatbots</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>High-Converting Email Marketing & Lead Nurturing Campaigns</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0" />
                <span>Modern Full-Stack Web Applications & Custom SaaS Platforms</span>
              </div>
            </div>
          </div>
        </div>


        {/* Team Section */}
        <div className="mb-12 sm:mb-14">
          <TeamSection />
        </div>

        {/* CTA */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h3 className="typography-h3 text-xl sm:text-2xl text-[#0F172A]">
            Ready to engineer your systems?
          </h3>
          <p className="typography-body text-slate-600">
            Tell us about your processes, bottlenecks, and specifications. We will design a production-ready solution tailored for your team.
          </p>
          <div className="pt-1">
            <Link
              href="/contact"
              className="typography-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-600/25 transition-all"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
