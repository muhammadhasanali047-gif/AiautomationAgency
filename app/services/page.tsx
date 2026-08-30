import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Workflow,
  Bot,
  Mail,
  Code2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Service } from '@/types/database';

export const metadata: Metadata = {
  title: 'Services & Solutions | NexaCore Automations',
  description:
    'Explore NexaCore Automations core services: AI Automation, AI & WhatsApp Chatbots, Email Marketing & Outreach, and Full-Stack Web & SaaS Development.',
};

const agencyServices = [
  {
    id: 'ai-automation',
    category: 'AI Automation',
    title: 'AI Automation & Autonomous Agents',
    icon: Workflow,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    contactServiceParam: 'AI Automation',
    description:
      'Intelligent multi-step workflow automation, autonomous task loops, and event-driven data pipelines engineered to eliminate repetitive manual operations, sync CRM data, and streamline business processes.',
    deliverables: [
      'Autonomous AI Agent Reasoning & Execution Loops',
      'Business Process & Operations Automation',
      'AI-Powered Lead Processing & CRM Ingestion',
      'Custom API & Webhook Integration Pipelines',
      'Automated Document & Data Parsing Workflows',
    ],
    highlights: [
      'Multi-step conditional logic and self-correcting agent execution loops',
      'Secure server-side API connectors with zero client secret exposure',
      'Real-time webhook listeners with automated retry and logging mechanisms',
      'Automated error handling, alerts, and instant fallback notifications',
    ],
    technologies: ['Next.js Server Actions', 'Node.js', 'REST APIs', 'Supabase', 'Google Gemini API'],
  },
  {
    id: 'ai-chatbots',
    category: 'Conversational AI',
    title: 'AI Chatbots & WhatsApp Automation',
    icon: Bot,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    contactServiceParam: 'WhatsApp Chatbot',
    description:
      'Production-grade conversational AI systems for WhatsApp and web interfaces that engage visitors 24/7, qualify inbound leads, answer complex domain queries, and automate customer support.',
    deliverables: [
      'Official Meta WhatsApp Cloud API Chatbots',
      'Website 24/7 Customer Support AI Assistants',
      'High-Intent AI Sales & Lead Qualification Bots',
      'Knowledge Base & Company SOP Retrieval Systems',
      'Instant Human Escalation & Handover Triggers',
    ],
    highlights: [
      'WhatsApp Cloud API webhooks with HMAC signature verification',
      'Strict guardrailed system instructions preventing hallucinations',
      'Multi-turn conversation state and session memory persistence',
      'Hybrid handover to human team members when requested',
    ],
    technologies: ['WhatsApp Cloud API', 'Gemini Pro 1.5', 'TypeScript', 'Supabase pgvector', 'Next.js 14'],
  },
  {
    id: 'email-marketing',
    category: 'Growth & Marketing',
    title: 'Email Marketing & Outreach Campaigns',
    icon: Mail,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    contactServiceParam: 'Other',
    description:
      'Strategic email marketing campaigns, automated multi-stage lead nurturing sequences, cold outreach systems, and deliverability infrastructure designed to turn prospects into loyal clients.',
    deliverables: [
      'Comprehensive Email Marketing Campaign Strategy',
      'Automated Multi-Stage Lead Nurturing Sequences',
      'Targeted B2B Cold Outreach Frameworks & Sequences',
      'Audience Segmentation & Behavioral Triggers',
      'Inbox Deliverability Setup (SPF, DKIM, DMARC)',
      'Conversion Tracking, Split Testing & Performance Analytics',
    ],
    highlights: [
      'High-deliverability domain warm-up and sender reputation management',
      'Dynamic behavioral branching based on opens, link clicks, and replies',
      'Compelling, conversion-focused copywriting and sequence blueprints',
      'Detailed open rate, click-through, and conversion performance reporting',
    ],
    technologies: ['Email Automation Engines', 'Resend API', 'DKIM & SPF Protocols', 'Analytics Tools', 'CRM Workflows'],
  },
  {
    id: 'full-stack-dev',
    category: 'Software Engineering',
    title: 'Full-Stack Web & SaaS Development',
    icon: Code2,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    contactServiceParam: 'Web Development',
    description:
      'Custom full-stack web applications, scalable SaaS architectures, and high-performance business portals engineered using Next.js App Router, React 18, TypeScript, and modern cloud databases.',
    deliverables: [
      'Custom Web Applications & SaaS Platforms',
      'High-Performance Admin Dashboards & Client Portals',
      'Scalable RESTful & Webhook API Endpoints',
      'Relational Database Schemas & Vector Storage',
      'Responsive, Modern User Interfaces with Tailwind CSS',
    ],
    highlights: [
      'Next.js 14 Server-Side Rendering (SSR) and Edge Caching',
      'Granular Supabase PostgreSQL Row Level Security (RLS) policies',
      'Strict enterprise TypeScript typing and clean modular architecture',
      'Optimized Core Web Vitals, SEO foundations, and sub-second load speeds',
    ],
    technologies: ['Next.js 14', 'React 18', 'TypeScript', 'Supabase & PostgreSQL', 'Tailwind CSS'],
  },
];

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  let dbServices: Service[] = [];

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (data && data.length > 0) {
      dbServices = data;
    }
  } catch (err) {
    console.warn('DB services fallback:', err);
  }

  return (
    <div className="relative pt-24 pb-16 overflow-hidden bg-white nexa-mesh-bg">
      {/* Subtle Background Grid & Glows */}
      <div className="absolute inset-0 nexa-grid-pattern pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200">
            <span className="typography-label text-blue-700">NexaCore Offerings</span>
          </div>
          <h1 className="typography-h2">
            ENGINEERED SERVICES & <br />
            <span className="nexa-gradient-text">
              TECHNICAL SOLUTIONS
            </span>
          </h1>
          <p className="typography-body-lg text-slate-600">
            Our team specializes in four interconnected disciplines: AI Automation, Conversational Chatbots, Email Marketing & Outreach, and Full-Stack SaaS Engineering.
          </p>
        </div>

        {/* Primary Comprehensive Service Catalog (Focused strictly on what the 3 people offer) */}
        <div className="space-y-6 sm:space-y-8">
          {agencyServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="rounded-3xl p-6 sm:p-8 bg-[#F8FAFC] border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left overview */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${service.color} shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="typography-label text-slate-400">
                        Service 0{index + 1}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="typography-label text-blue-600">
                        {service.category}
                      </span>
                      <h2 className="typography-h3 text-2xl sm:text-3xl text-[#0F172A]">
                        {service.title}
                      </h2>
                    </div>

                    <p className="typography-body text-slate-600">
                      {service.description}
                    </p>

                    <div className="pt-2">
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.contactServiceParam)}`}
                        className="typography-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-[#0F172A] hover:bg-blue-600 transition-all shadow-md"
                      >
                        <span>Start With This Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right specs: deliverables + architecture highlights + tech stack */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm">
                    {/* Deliverables */}
                    <div className="space-y-4">
                      <h4 className="typography-label text-[#0F172A] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-600" />
                        <span>Capabilities & Deliverables</span>
                      </h4>
                      <ul className="space-y-2.5 typography-body-sm text-slate-600 font-medium">
                        {service.deliverables.map((deliv) => (
                          <li key={deliv} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Architecture / Strategy Highlights */}
                    <div className="space-y-4">
                      <h4 className="typography-label text-[#0F172A] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>Engineering & Strategy Highlights</span>
                      </h4>
                      <ul className="space-y-2.5 typography-body-sm text-slate-600 font-medium">
                        {service.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="sm:col-span-2 pt-4 border-t border-slate-100">
                      <h4 className="typography-label text-slate-500 mb-2.5">
                        Technologies & Frameworks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((t) => (
                          <span
                            key={t}
                            className="typography-badge px-3 py-1 rounded-lg bg-slate-50 text-slate-700 border border-slate-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-50/70 via-purple-50/50 to-orange-50/40 border border-slate-200 p-6 sm:p-8 text-center space-y-3 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Ready to scope your project?
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Tell us about your automation goals, chatbot requirements, outreach campaigns, or full-stack software specifications.
          </p>
          <div className="pt-1">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md shadow-blue-600/20 transition-all hover:scale-105"
            >
              <span>Submit Project Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
