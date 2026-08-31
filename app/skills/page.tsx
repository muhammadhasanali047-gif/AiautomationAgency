import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Code2,
  Server,
  Database,
  BrainCircuit,
  Wrench,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Solutions & Tech Stack | NexaCore Automations',
  description:
    'Core technical capabilities, frameworks, database proficiencies, and AI engineering stack utilized by NexaCore Automations.',
};

const skillCategories = [
  {
    name: 'AI & Machine Learning Engineering',
    icon: BrainCircuit,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    description: 'LLM integration, autonomous workflows, embeddings, and context-aware systems.',
    skills: [
      { name: 'Google Gemini Pro 1.5', focus: 'Multimodal, function calling, system instructions' },
      { name: 'RAG Systems', focus: 'Vector search, document chunking, hybrid retrieval' },
      { name: 'Autonomous AI Agents', focus: 'Tool use, multi-step task execution, decision loops' },
      { name: 'LLM Applications', focus: 'Prompt engineering, structured outputs, JSON schema' },
      { name: 'AI Automation Workflows', focus: 'Event triggers, webhooks, automated triaging' },
    ],
  },
  {
    name: 'Frontend Engineering',
    icon: Code2,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    description: 'Modern, performant, accessible, and responsive user interfaces.',
    skills: [
      { name: 'Next.js 14 (App Router)', focus: 'Server Components, SSR, Streaming, layouts' },
      { name: 'React 18', focus: 'Hooks, state management, concurrent features' },
      { name: 'TypeScript', focus: 'Strict type safety, generic types, enterprise schemas' },
      { name: 'Tailwind CSS', focus: 'Responsive layouts, design systems, modern themes' },
      { name: 'Framer Motion', focus: 'Hardware-accelerated animations, micro-interactions' },
      { name: 'HTML5 & Semantic Web', focus: 'Accessibility (a11y), SEO architecture' },
      { name: 'Modern CSS & Grid', focus: 'Pixel-perfect responsive implementations' },
    ],
  },
  {
    name: 'Backend Architecture & APIs',
    icon: Server,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    description: 'High-speed server runtimes, secure actions, and clean API design.',
    skills: [
      { name: 'Next.js Server Actions', focus: 'Type-safe server mutations, zero endpoint bloat' },
      { name: 'Next.js Route Handlers', focus: 'Edge & Node.js HTTP endpoints, webhook handlers' },
      { name: 'Node.js', focus: 'Event-driven asynchronous services, worker pipelines' },
      { name: 'REST APIs & Webhooks', focus: 'JSON standards, pagination, rate limiting, validation' },
      { name: 'Resend & Email APIs', focus: 'Transactional delivery, template rendering' },
    ],
  },
  {
    name: 'Database & Vector Search',
    icon: Database,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    description: 'Relational data modeling, vector embeddings, and access security.',
    skills: [
      { name: 'Supabase', focus: 'BaaS architecture, Supabase Auth, Storage, Edge Functions' },
      { name: 'PostgreSQL', focus: 'Relational indexing, triggers, complex joins, views' },
      { name: 'pgvector', focus: 'High-dimensional vector storage, cosine distance search' },
      { name: 'Row Level Security (RLS)', focus: 'Granular multi-tenant and role-based policies' },
    ],
  },
  {
    name: 'DevOps, Tools & Infrastructure',
    icon: Wrench,
    color: 'text-orange-600 bg-orange-50 border-orange-200',
    description: 'Deployment automation, version control, and cloud edge infrastructure.',
    skills: [
      { name: 'GitHub', focus: 'Git flow, collaborative pull requests, branch rules' },
      { name: 'Vercel Edge Network', focus: 'Global edge deployment, serverless runtimes' },
      { name: 'Docker', focus: 'Containerized environments, reproducible local builds' },
      { name: 'API Integrations', focus: 'WhatsApp Cloud API, Gmail API, Stripe, Webhooks' },
    ],
  },
];

export default function SkillsPage() {
  return (
    <div className="pt-28 pb-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700">
            Technical Stack
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            ENGINEERING SKILLS & <br />
            <span className="nexa-gradient-text">
              TECHNOLOGY PROFICIENCIES
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A battle-tested technology stack focused on building reliable AI automations, secure database systems, and lightning-fast web applications.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="space-y-10">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="rounded-3xl p-8 sm:p-10 bg-[#F8FAFC] border border-slate-200/90 shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${cat.color} shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
                        {cat.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">{cat.description}</p>
                    </div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-sm transition-all space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <h3 className="text-sm font-bold text-[#0F172A] tracking-tight">
                          {skill.name}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                        {skill.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center space-y-4 max-w-xl mx-auto">
          <h3 className="text-2xl font-bold text-[#0F172A]">Have a specific stack requirement?</h3>
          <p className="text-sm text-slate-600">
            Let&apos;s discuss how these technologies can be adapted to integrate with your existing infrastructure.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold text-white bg-[#0F172A] hover:bg-blue-600 transition-all shadow-md"
            >
              <span>Discuss Technical Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
