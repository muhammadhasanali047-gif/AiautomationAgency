'use client';

import React from 'react';
import {
  Bot,
  Workflow,
  Sparkles,
  MessageSquareCode,
  Database,
  Mail,
  Send,
  Users,
  ShieldCheck,
  BarChart3,
  Globe,
  Code2,
  Server,
  Cpu,
  Lock,
  Layers,
  Terminal,
  Zap,
} from 'lucide-react';

// Skills representing all 3 specialists and their technical toolsets
const trackOneSkills = [
  {
    name: 'Autonomous AI Agents',
    discipline: 'AI Automation',
    specialist: 'Muhammad Hassan',
    icon: Bot,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100/70 text-blue-700',
  },
  {
    name: 'WhatsApp Cloud API',
    discipline: 'AI Automation',
    specialist: 'Muhammad Hassan',
    icon: MessageSquareCode,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    badgeColor: 'bg-cyan-100/70 text-cyan-700',
  },
  {
    name: 'Email Marketing Sequences',
    discipline: 'Email Marketing',
    specialist: 'Muhammad Saqlain',
    icon: Mail,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100/70 text-purple-700',
  },
  {
    name: 'Next.js 14 App Router',
    discipline: 'Full-Stack Dev',
    specialist: 'Muhammad Hamdan',
    icon: Globe,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    badgeColor: 'bg-indigo-100/70 text-indigo-700',
  },
  {
    name: 'Google Gemini Pro 1.5',
    discipline: 'AI Automation',
    specialist: 'Muhammad Hassan',
    icon: Sparkles,
    color: 'text-blue-700 bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100/70 text-blue-700',
  },
  {
    name: 'B2B Cold Outreach Systems',
    discipline: 'Email Marketing',
    specialist: 'Muhammad Saqlain',
    icon: Send,
    color: 'text-purple-700 bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100/70 text-purple-700',
  },
  {
    name: 'React 18 & TypeScript',
    discipline: 'Full-Stack Dev',
    specialist: 'Muhammad Hamdan',
    icon: Code2,
    color: 'text-cyan-700 bg-cyan-50 border-cyan-200',
    badgeColor: 'bg-cyan-100/70 text-cyan-700',
  },
  {
    name: 'Business Workflow Automation',
    discipline: 'AI Automation',
    specialist: 'Muhammad Hassan',
    icon: Workflow,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100/70 text-blue-700',
  },
  {
    name: 'Lead Nurturing Campaigns',
    discipline: 'Email Marketing',
    specialist: 'Muhammad Saqlain',
    icon: Users,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100/70 text-purple-700',
  },
];

const trackTwoSkills = [
  {
    name: 'Supabase PostgreSQL',
    discipline: 'Full-Stack Dev',
    specialist: 'Muhammad Hamdan',
    icon: Server,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    badgeColor: 'bg-indigo-100/70 text-indigo-700',
  },
  {
    name: 'pgvector & RAG Search',
    discipline: 'AI Automation',
    specialist: 'Muhammad Hassan',
    icon: Database,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100/70 text-blue-700',
  },
  {
    name: 'Email Deliverability (SPF/DKIM)',
    discipline: 'Email Marketing',
    specialist: 'Muhammad Saqlain',
    icon: ShieldCheck,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100/70 text-purple-700',
  },
  {
    name: 'REST & Webhook Dispatchers',
    discipline: 'Full-Stack Dev',
    specialist: 'Muhammad Hamdan',
    icon: Cpu,
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    badgeColor: 'bg-orange-100/70 text-orange-700',
  },
  {
    name: '24/7 Intelligent Chatbots',
    discipline: 'AI Automation',
    specialist: 'Muhammad Hassan',
    icon: Bot,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    badgeColor: 'bg-cyan-100/70 text-cyan-700',
  },
  {
    name: 'Campaign Analytics & Tracking',
    discipline: 'Email Marketing',
    specialist: 'Muhammad Saqlain',
    icon: BarChart3,
    color: 'text-purple-700 bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100/70 text-purple-700',
  },
  {
    name: 'Row Level Security (RLS)',
    discipline: 'Full-Stack Dev',
    specialist: 'Muhammad Hamdan',
    icon: Lock,
    color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    badgeColor: 'bg-indigo-100/70 text-indigo-700',
  },
  {
    name: 'Conversational Sales Bots',
    discipline: 'AI Automation',
    specialist: 'Muhammad Hassan',
    icon: Zap,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100/70 text-blue-700',
  },
  {
    name: 'Tailwind CSS UI Systems',
    discipline: 'Full-Stack Dev',
    specialist: 'Muhammad Hamdan',
    icon: Layers,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    badgeColor: 'bg-cyan-100/70 text-cyan-700',
  },
];

export default function TechStrip() {
  return (
    <section className="relative py-10 sm:py-12 border-y border-slate-200/80 bg-transparent overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white border border-slate-200 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <span className="typography-label text-slate-700">
            THREE SPECIALISTS • INTEGRATED AGENCY CAPABILITIES
          </span>
        </div>
        <h3 className="typography-h4 text-sm sm:text-base text-[#0F172A]">
          AI Automation <span className="text-slate-300 font-normal">/</span> Email Marketing <span className="text-slate-300 font-normal">/</span> Full-Stack Engineering
        </h3>
      </div>

      {/* Slider Container with Left & Right Gradient Fade Masks */}
      <div className="relative w-full overflow-hidden space-y-4">
        {/* Left Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-20" />

        {/* Right Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-20" />

        {/* Slider Track 1 (Moving Left) */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee gap-4 pr-4">
            {[...trackOneSkills, ...trackOneSkills].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`track1-${idx}`}
                  className="group shrink-0 p-3 sm:p-3.5 px-4 sm:px-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex items-center gap-3.5"
                >
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform shrink-0 shadow-xs`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-[#0F172A] tracking-tight whitespace-nowrap">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${item.badgeColor}`}>
                        {item.discipline}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {item.specialist}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slider Track 2 (Moving Right in Reverse) */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-reverse gap-4 pr-4">
            {[...trackTwoSkills, ...trackTwoSkills].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`track2-${idx}`}
                  className="group shrink-0 p-3 sm:p-3.5 px-4 sm:px-5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all duration-300 flex items-center gap-3.5"
                >
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform shrink-0 shadow-xs`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-[#0F172A] tracking-tight whitespace-nowrap">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${item.badgeColor}`}>
                        {item.discipline}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {item.specialist}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

