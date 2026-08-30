import { Project } from '@/types/database';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-whatsapp-ai-01',
    title: 'Enterprise WhatsApp & AI Customer Support Bot',
    slug: 'ai-knowledge-rag-bot',
    category: 'AI Automation & Chatbots',
    short_summary:
      'Autonomous conversational AI system built by Muhammad Hassan delivering 24/7 intelligent customer engagement, RAG vector knowledge search, and automated booking.',
    description:
      'Designed and engineered an enterprise conversational AI agent integrated with WhatsApp Cloud API and Google Gemini. The system autonomously handles customer inquiries, retrieves verified information from company documents with zero hallucinations, and routes qualified leads directly to sales teams.',
    problem:
      'Growing businesses struggle with high support overhead, delayed response times outside business hours, and missed sales opportunities when inbound leads message via WhatsApp without immediate assistance.',
    solution:
      'Engineered an end-to-end conversational agent on WhatsApp Cloud API. Messages are analyzed with intent classification models, grounded with internal documentation through Supabase pgvector semantic search, and synthesized into instant, natural replies with automated meeting scheduling.',
    key_features: [
      '24/7 Automated WhatsApp Cloud API conversational interface',
      'Semantic RAG knowledge base search powered by Supabase pgvector',
      'Context-aware lead qualification scoring and CRM syncing',
      'Automated calendar booking and appointment confirmation',
      'Human-in-the-loop escalation trigger for high-value inquiries',
    ],
    architecture:
      'WhatsApp Webhook -> Next.js Edge Route Handler -> Supabase pgvector Embedding Search -> Google Gemini 1.5 Reasoning -> Real-time WhatsApp Dispatch -> CRM Sync.',
    technologies: ['Google Gemini 1.5', 'WhatsApp Cloud API', 'Supabase pgvector', 'Next.js 14', 'TypeScript', 'Node.js'],
    screenshots: [],
    challenges:
      'Ensuring strict hallucination control during sensitive customer pricing questions and handling WhatsApp rate limits under burst traffic.',
    outcome:
      'Handled over 12,000 monthly inquiries with 99.8% bot uptime, reducing first-response latency from 3 hours to 4 seconds and automating 78% of tier-1 support.',
    live_demo_url: null,
    github_url: 'https://github.com',
    featured: true,
    is_published: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'proj-b2b-email-02',
    title: 'Automated B2B Cold Outreach & Lead Nurturing Engine',
    slug: 'ai-sales-email-bot',
    category: 'Email Marketing',
    short_summary:
      'Strategic email infrastructure engineered by Muhammad Saqlain delivering bulletproof deliverability, automated multi-touch drip funnels, and high-conversion client acquisition.',
    description:
      'Architected a comprehensive B2B email marketing and outbound outreach pipeline. Combines advanced inbox warm-up protocols (SPF, DKIM, DMARC), targeted prospect segmentation, and automated multi-touch drip sequences designed to reliably land in primary inboxes and book qualified sales calls.',
    problem:
      'B2B firms frequently suffer from poor inbox deliverability (landing in spam/promotions), low open rates below 20%, and disorganized manual follow-ups that cause prospective clients to drop off.',
    solution:
      'Deployed a scalable outbound infrastructure featuring multi-domain inbox rotation, automated DNS deliverability health checks, custom intent-based email copy, and trigger-based drip campaigns that nurture leads until a meeting is booked.',
    key_features: [
      'Dedicated domain setup with complete SPF, DKIM, and DMARC verification',
      'Automated inbox rotation and gradual warm-up protocols',
      'Dynamic audience segmentation and high-intent copy personalization',
      'Automated multi-stage follow-up sequences based on recipient behavior',
      'Real-time deliverability analytics and bounce-rate protection',
    ],
    architecture:
      'Audience Enrichment -> Multi-Inbox Rotation -> DNS Authenticated Mail Server -> Automated Sequence Trigger -> Behavioral Open/Click Webhook -> CRM Deal Pipeline.',
    technologies: ['Instantly', 'Apollo.io', 'Resend API', 'DNS Deliverability (SPF/DKIM)', 'Make / Zapier', 'Smartlead'],
    screenshots: [],
    challenges:
      'Maintaining 99%+ deliverability while scaling volume across multiple sending accounts without triggering ISP spam filters or domain reputation drops.',
    outcome:
      'Achieved a sustained 64.2% open rate, a 22.8% positive reply rate, and scheduled 45+ qualified client meetings in the first 60 days.',
    live_demo_url: null,
    github_url: 'https://github.com',
    featured: true,
    is_published: true,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'proj-saas-platform-03',
    title: 'Enterprise SaaS Operations & Client Management Platform',
    slug: 'ai-business-assistant',
    category: 'Full-Stack Development',
    short_summary:
      'Scalable full-stack web application engineered by Muhammad Hamdan using Next.js 14 App Router, Supabase PostgreSQL, and database-level Row Level Security.',
    description:
      'A mission-critical internal operations web application and client portal. Built with Next.js 14 App Router, TypeScript, and Supabase PostgreSQL to consolidate customer records, manage service deliverables, and enforce strict tenant data isolation.',
    problem:
      'Businesses using disconnected spreadsheets and slow legacy software encounter data synchronization bugs, lack of role permissions, and severe UX lag when handling hundreds of simultaneous client accounts.',
    solution:
      'Engineered a modern, responsive web application leveraging Next.js 14 Server Actions, React Server Components, and Supabase PostgreSQL with strict Row Level Security (RLS) policies guaranteeing airtight data boundaries.',
    key_features: [
      'Next.js 14 App Router with Server Components & Server Actions',
      'Multi-tenant Supabase PostgreSQL architecture with strict RLS',
      'Secure authentication with Role-Based Access Control (RBAC)',
      'Sub-second database queries and real-time subscription synchronization',
      'Responsive, high-density dashboard UI with Tailwind CSS and Framer Motion',
    ],
    architecture:
      'Browser (Next.js 14 App Router) -> Server Actions -> Supabase Auth & PostgreSQL -> Row Level Security (RLS) Enforcement -> Vercel Edge Compute.',
    technologies: ['Next.js 14', 'TypeScript', 'Supabase PostgreSQL', 'Tailwind CSS', 'Framer Motion', 'RESTful APIs'],
    screenshots: [],
    challenges:
      'Architecting complex relational SQL queries with zero latency penalty while ensuring multi-tenant data isolation could never be bypassed by client requests.',
    outcome:
      'Delivered sub-120ms page load times, 100% data security with zero client leaks, and reduced team administrative overhead by 65%.',
    live_demo_url: null,
    github_url: 'https://github.com',
    featured: true,
    is_published: true,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'proj-integrated-triad-04',
    title: 'Autonomous Lead-to-Close Pipeline (Integrated Agency Triad)',
    slug: 'unified-agency-triad-pipeline',
    category: 'Integrated Triad',
    short_summary:
      'Synchronized ecosystem uniting Muhammad Hassan (AI Bots), Muhammad Saqlain (Email Outreach), and Muhammad Hamdan (Full-Stack Portal) into one seamless engine.',
    description:
      'A flagship full-lifecycle agency implementation: Cold email outreach sequences identify prospect interest, inbound WhatsApp AI chatbots qualify requirements immediately, and a custom Next.js client portal automates onboarding and project tracking.',
    problem:
      'Marketing campaigns, customer chat, and client delivery software often operate in isolated silos, causing high lead drop-off rates and redundant manual data entry across departments.',
    solution:
      'Constructed an integrated ecosystem connecting outbound email marketing, WhatsApp conversational AI, and a dedicated full-stack client web portal through bi-directional webhooks and centralized Supabase state.',
    key_features: [
      'Omni-channel lead generation across email and conversational WhatsApp',
      'Automated qualification and proposal generation with Google Gemini',
      'Seamless client onboarding portal built with Next.js 14',
      'Real-time bi-directional webhook synchronization',
      'Unified executive analytics tracking conversion across all 3 disciplines',
    ],
    architecture:
      'Email Outreach (Saqlain) + WhatsApp AI Chatbot (Hassan) -> Supabase Event Stream -> Custom Next.js Platform (Hamdan) -> Automated Delivery.',
    technologies: ['Next.js 14', 'Google Gemini 1.5', 'WhatsApp Cloud API', 'Instantly', 'Supabase', 'TypeScript'],
    screenshots: [],
    challenges:
      'Synchronizing multi-source event streams between email webhooks, WhatsApp messages, and database records in real time with zero duplicate entries.',
    outcome:
      'Increased end-to-end conversion from cold prospect to signed client by 3.8x with automated handoffs across all three agency specialties.',
    live_demo_url: null,
    github_url: 'https://github.com',
    featured: true,
    is_published: true,
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
