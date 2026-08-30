'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Code, ShieldCheck, Rocket } from 'lucide-react';

const stages = [
  {
    step: '01',
    title: 'DISCOVERY',
    subtitle: 'Understand the business, problem and goals.',
    icon: Search,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    description:
      'We analyze your operational workflows, operational bottlenecks, manual friction points, and strategic goals to establish a clear implementation scope.',
  },
  {
    step: '02',
    title: 'STRATEGY',
    subtitle: 'Design the technical solution and user experience.',
    icon: Compass,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    description:
      'Architecting data schemas, selecting optimal LLM models, planning vector retrieval pipelines, and blueprinting intuitive, responsive interfaces.',
  },
  {
    step: '03',
    title: 'DEVELOPMENT',
    subtitle: 'Build the product using modern technologies.',
    icon: Code,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    description:
      'Full-cycle engineering using Next.js App Router, TypeScript, Supabase, pgvector, and Gemini APIs with clean, maintainable, production-ready code.',
  },
  {
    step: '04',
    title: 'TESTING',
    subtitle: 'Test functionality, security, performance and responsiveness.',
    icon: ShieldCheck,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    description:
      'End-to-end evaluation, zero-leak credential testing, RLS rule audits, prompt precision checks, edge latency benchmarks, and mobile QA.',
  },
  {
    step: '05',
    title: 'DEPLOYMENT',
    subtitle: 'Deploy, optimize and prepare the product for real users.',
    icon: Rocket,
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    description:
      'Seamless production launch on Vercel Edge infrastructure with automated CI/CD pipelines, analytics monitoring, and post-launch optimization.',
  },
];

export default function ProcessSection() {
  return (
    <section className="relative py-16 sm:py-20 bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200">
            <span className="typography-label text-blue-700">Proven Methodology</span>
          </div>
          <h2 className="typography-h2">
            HOW WE BUILD
          </h2>
          <p className="typography-body text-slate-600">
            A disciplined five-stage development engineering process engineered for reliability, speed, and tangible business impact.
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 relative">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-3xl p-5 bg-[#F8FAFC] border border-slate-200/90 hover:border-blue-300 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  {/* Step number badge & icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-bold text-blue-600">
                      {stage.step}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${stage.color} group-hover:scale-110 transition-transform shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="typography-h4 text-base sm:text-lg mb-1 group-hover:text-blue-600 transition-colors">
                    {stage.title}
                  </h3>

                  <p className="font-medium text-xs text-blue-600 mb-2">
                    {stage.subtitle}
                  </p>

                  <p className="typography-body-sm text-slate-600">
                    {stage.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
