'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Workflow,
  Bot,
  Mail,
  Code2,
  ArrowUpRight,
} from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'AI Automation & Agents',
    icon: Workflow,
    color: 'from-blue-500 to-cyan-500 text-blue-600 bg-blue-50 border-blue-200',
    description:
      'Intelligent workflows, autonomous AI agents, and event-driven automation systems that eliminate repetitive manual tasks and sync data pipelines seamlessly.',
    highlights: [
      'Multi-step autonomous agent loops',
      'Business process automation',
      'API & webhook data integrations',
    ],
  },
  {
    number: '02',
    title: 'AI Chatbots & WhatsApp Automation',
    icon: Bot,
    color: 'from-cyan-500 to-blue-600 text-cyan-600 bg-cyan-50 border-cyan-200',
    description:
      'Official WhatsApp Cloud API bots, 24/7 customer support agents, and AI sales bots engineered to engage visitors, answer domain questions, and capture leads.',
    highlights: [
      'Official WhatsApp Cloud API integration',
      '24/7 automated sales & support qualification',
      'Zero-hallucination guardrails & human handoff',
    ],
  },
  {
    number: '03',
    title: 'Email Marketing & Outreach',
    icon: Mail,
    color: 'from-purple-500 to-indigo-600 text-purple-600 bg-purple-50 border-purple-200',
    description:
      'High-converting email campaign strategy, automated lead nurturing sequences, and B2B cold outreach systems designed to turn prospects into loyal clients.',
    highlights: [
      'Automated multi-stage drip sequences',
      'Audience segmentation & behavioral triggers',
      'High-deliverability inbox infrastructure (DKIM/SPF)',
    ],
  },
  {
    number: '04',
    title: 'Full-Stack Web & SaaS Development',
    icon: Code2,
    color: 'from-indigo-500 to-cyan-500 text-indigo-600 bg-indigo-50 border-indigo-200',
    description:
      'Modern, scalable web applications, admin control panels, and custom SaaS platforms built with Next.js App Router, TypeScript, and high-performance cloud databases.',
    highlights: [
      'Next.js 14 Server Actions & SSR',
      'Strict TypeScript & modular architecture',
      'Supabase PostgreSQL with Row Level Security (RLS)',
    ],
  },
];

export default function Capabilities() {
  return (
    <section className="relative py-16 sm:py-20 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-5">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200">
              <span className="typography-label text-blue-700">Core Capabilities</span>
            </div>
            <h2 className="typography-h2">
              SERVICES & SOLUTIONS
            </h2>
          </div>
        </div>

        {/* 4 Focused Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((svc, index) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative rounded-3xl p-6 bg-white border border-slate-200/90 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Top Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-slate-300 group-hover:text-blue-600 transition-colors">
                      {svc.number}
                    </span>
                    <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${svc.color} group-hover:scale-110 transition-transform shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="typography-h3 text-lg sm:text-xl mb-2 group-hover:text-blue-600 transition-colors">
                    {svc.title}
                  </h3>

                  <p className="typography-body-sm text-slate-600 mb-4">
                    {svc.description}
                  </p>
                </div>

                {/* Bullet highlights */}
                <div className="pt-3.5 border-t border-slate-100 space-y-2">
                  {svc.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 typography-badge text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-blue-50/60 via-purple-50/40 to-orange-50/50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-semibold text-base text-[#0F172A]">Need technical specifications or tailored pricing?</h4>
            <p className="font-normal text-xs text-slate-600">Explore comprehensive breakdown of deliverables, architecture, and frameworks.</p>
          </div>
          <Link
            href="/services"
            className="typography-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white bg-[#0F172A] hover:bg-blue-600 transition-all shadow-md shrink-0"
          >
            <span>Explore All Services</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
