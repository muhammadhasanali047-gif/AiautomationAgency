'use client';

import React from 'react';
import { Bot, Mail, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TeamSynergy() {
  return (
    <div className="mt-10 sm:mt-12 rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-50 border border-slate-200/90 p-6 sm:p-8 shadow-sm">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <span className="typography-label text-blue-600">
            The NexaCore Equation
          </span>
          <h3 className="typography-h3 text-xl sm:text-2xl text-[#0F172A]">
            <span className="text-blue-600">AI Automation</span> +{' '}
            <span className="text-purple-600">Email Marketing</span> +{' '}
            <span className="text-cyan-700">Full-Stack Development</span>
          </h3>
          <p className="typography-body-sm text-slate-600 max-w-2xl mx-auto">
            Three complementary disciplines uniting intelligent AI automation, high-converting email marketing, and production-grade full-stack web software to drive real business growth.
          </p>
        </div>

        {/* 3 Interlocking Pillars Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 items-center relative">
          {/* Pillar 1: AI Automation & Chatbots */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2.5 relative group hover:border-blue-300 transition-all">
            <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <span className="typography-label text-slate-400">
                01 • Muhammad Hassan
              </span>
              <h4 className="typography-h4 text-base text-[#0F172A]">AI Automation & Chatbots</h4>
            </div>
            <p className="typography-body-sm text-slate-600">
              Intelligent WhatsApp chatbots, autonomous AI agent pipelines, and document-grounded RAG systems that work around the clock.
            </p>
          </div>

          {/* Pillar 2: Email Marketing */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2.5 relative group hover:border-purple-300 transition-all">
            <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="typography-label text-slate-400">
                02 • Muhammad Saqlain
              </span>
              <h4 className="typography-h4 text-base text-[#0F172A]">Email Marketing</h4>
            </div>
            <p className="typography-body-sm text-slate-600">
              High-converting cold email outreach, bulletproof domain deliverability (SPF/DKIM/DMARC), and automated lead nurturing drip sequences.
            </p>
          </div>

          {/* Pillar 3: Full-Stack Development */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2.5 relative group hover:border-cyan-300 transition-all">
            <div className="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 shadow-sm group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="typography-label text-slate-400">
                03 • Muhammad Hamdan
              </span>
              <h4 className="typography-h4 text-base text-[#0F172A]">Full-Stack Development</h4>
            </div>
            <p className="typography-body-sm text-slate-600">
              Modern Next.js 14 web applications, scalable SaaS architectures, and secure Supabase PostgreSQL databases with strict Row Level Security.
            </p>
          </div>
        </div>

        {/* Synergy Summary Strip */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div>
            <h5 className="typography-h4 text-sm text-[#0F172A]">Looking to build a complete end-to-end system?</h5>
            <p className="typography-body-sm text-slate-500">Our three specialists coordinate directly on your architecture.</p>
          </div>
          <Link
            href="/contact"
            className="typography-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white bg-[#0F172A] hover:bg-blue-600 transition-colors shadow-sm shrink-0"
          >
            <span>Discuss With The Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
