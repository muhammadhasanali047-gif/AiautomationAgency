'use client';

import React from 'react';
import { Target, Cpu, Sparkles, ShieldCheck } from 'lucide-react';

const pillars = [
  {
    icon: Target,
    title: 'Business-Focused Development',
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    description:
      'We build solutions around actual operational bottlenecks and high-impact revenue goals—not vanity tech experiments.',
  },
  {
    icon: Cpu,
    title: 'Modern Scalable Technology',
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    description:
      'Leveraging Next.js App Router, TypeScript, Supabase, and edge runtimes for lightning speed, resilience, and clean maintenance.',
  },
  {
    icon: Sparkles,
    title: 'AI-First Thinking',
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    description:
      'Deploying LLMs and autonomous agents specifically where they eliminate friction, automate workflows, and deliver measurable ROI.',
  },
  {
    icon: ShieldCheck,
    title: 'Clean Engineering & Security',
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    description:
      'Maintainable architecture, server-only secret handling, strict database Row Level Security, and zero client credential leaks.',
  },
];

export default function WhyWorkSection() {
  return (
    <section className="relative py-16 sm:py-20 bg-[#F8FAFC] border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200">
            <span className="typography-label text-blue-700">Why NexaCore</span>
          </div>
          <h2 className="typography-h2">
            WHY WORK WITH US
          </h2>
          <p className="typography-body text-slate-600">
            Straightforward engineering principles that prioritize business outcomes, speed, and technical longevity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-3xl p-6 bg-white border border-slate-200/90 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${pillar.color} mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="typography-h4 text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="typography-body-sm text-slate-600">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
