// Centralized Source of Truth for NexaCore AI Assistant
// All facts, team member profiles, services, projects, process, and routes

export interface TeamMemberKnowledge {
  name: string;
  role: string;
  discipline: string;
  expertise: string[];
  bio: string;
}

export interface ServiceKnowledge {
  name: string;
  slug: string;
  path: string;
  leadSpecialist: string;
  description: string;
  keyDeliverables: string[];
  technologies: string[];
}

export interface ProjectKnowledge {
  title: string;
  slug: string;
  path: string;
  category: string;
  leadSpecialist: string;
  summary: string;
  outcome: string;
  technologies: string[];
}

export const NEXACORE_KNOWLEDGE = {
  brand: {
    name: 'NexaCore Automations',
    shortName: 'NexaCore',
    tagline: 'Automate • Innovate • Elevate',
    description:
      'NexaCore Automations is a premium AI Automation, Email Marketing & Full-Stack Development Agency delivering intelligent workflows, conversational chatbots, and scalable digital platforms.',
    valueEquation:
      'AI Automation (Muhammad Hassan) + Email Outreach (Muhammad Saqlain) + Full-Stack Software (Muhammad Hamdan) = Complete End-to-End Digital Solutions.',
    status: 'Accepting New Client Projects',
  },

  team: {
    hassan: {
      name: 'Muhammad Hassan',
      role: 'AI Automation & Chatbot Specialist',
      discipline: 'AI Automation, Autonomous Agents & Conversational Bots',
      expertise: [
        'AI Automation Workflows',
        'Autonomous AI Agents',
        'WhatsApp Cloud API Chatbots',
        'Website Customer Engagement Chatbots',
        'RAG (Retrieval-Augmented Generation) Knowledge Systems',
        'Google Gemini 1.5 & OpenAI LLM Integrations',
        'Business Process Automation (Make / n8n / Zapier)',
      ],
      bio: 'Specializes in engineering autonomous AI workflows, 24/7 conversational customer service chatbots on WhatsApp and web, and vector-grounded RAG systems with zero hallucinations.',
    } as TeamMemberKnowledge,

    saqlain: {
      name: 'Muhammad Saqlain',
      role: 'Email Marketing Manager',
      discipline: 'B2B Email Marketing, Outbound Infrastructure & Deliverability',
      expertise: [
        'B2B Cold Email Outreach Campaigns',
        'Inbox Deliverability & DNS Architecture (SPF, DKIM, DMARC)',
        'Automated Lead Nurturing Drip Sequences',
        'Audience Enrichment & B2B Segmentation (Apollo.io, Instantly)',
        'Conversion Copywriting & A/B Testing',
        'CRM Integration & Deal Pipeline Syncing',
      ],
      bio: 'Specializes in architecting high-converting email outreach infrastructure, multi-inbox rotation with guaranteed inbox placement, and behavioral drip funnels that consistently generate qualified sales meetings.',
    } as TeamMemberKnowledge,

    hamdan: {
      name: 'Muhammad Hamdan',
      role: 'Full-Stack Developer',
      discipline: 'Production Full-Stack Web Development & Cloud Systems',
      expertise: [
        'Next.js 14 App Router & React 18 Architecture',
        'TypeScript & Modern JavaScript',
        'Supabase PostgreSQL & Row Level Security (RLS)',
        'Server Actions & Server Components',
        'RESTful APIs & Webhook Event Handlers',
        'High-Density UI Engineering with Tailwind CSS & Framer Motion',
        'Multi-Tenant SaaS Platforms & Scalable Cloud Deployment',
      ],
      bio: 'Specializes in engineering fast, secure, and production-grade full-stack web platforms using Next.js 14 and Supabase, with sub-second page loads and strict database security.',
    } as TeamMemberKnowledge,
  },

  services: [
    {
      name: 'AI Automation & Autonomous Agents',
      slug: 'ai-automation',
      path: '/services#ai-automation',
      leadSpecialist: 'Muhammad Hassan',
      description:
        'Custom autonomous task execution pipelines that eliminate repetitive manual business operations, sync multi-system data, and automate workflows.',
      keyDeliverables: [
        'Multi-step workflow automation (Make, n8n, custom Node.js)',
        'Document and invoice parsing with structured AI outputs',
        'CRM and database synchronization with webhook triggers',
        'Custom autonomous task execution pipelines',
      ],
      technologies: ['Google Gemini', 'Node.js', 'Supabase', 'Webhooks', 'Make / n8n'],
    },
    {
      name: 'AI & WhatsApp Chatbots',
      slug: 'ai-chatbots',
      path: '/services#ai-chatbots',
      leadSpecialist: 'Muhammad Hassan',
      description:
        '24/7 intelligent conversational agents deployed across WhatsApp Cloud API and web interfaces to capture leads and resolve support queries instantly.',
      keyDeliverables: [
        'Official WhatsApp Cloud API conversational bots',
        'RAG vector knowledge retrieval from company documentation',
        'Context-aware lead qualification scoring',
        'Automated calendar scheduling and appointment booking',
      ],
      technologies: ['WhatsApp Cloud API', 'Google Gemini 1.5', 'pgvector', 'Supabase', 'Next.js'],
    },
    {
      name: 'Email Marketing & Cold Outreach',
      slug: 'email-marketing',
      path: '/services#email-marketing',
      leadSpecialist: 'Muhammad Saqlain',
      description:
        'Strategic outbound email infrastructure, automated multi-touch drip funnels, and domain deliverability management to drive measurable pipeline revenue.',
      keyDeliverables: [
        'Dedicated sending domain setup with SPF, DKIM, and DMARC protocols',
        'Multi-inbox rotation and automated gradual warm-up',
        'Segmented B2B prospect scraping and lead list enrichment',
        'Automated multi-stage follow-up sequences based on recipient behavior',
      ],
      technologies: ['Instantly', 'Apollo.io', 'Resend API', 'Smartlead', 'DNS Deliverability'],
    },
    {
      name: 'Full-Stack Web Development',
      slug: 'full-stack-web-apps',
      path: '/services#full-stack-web-apps',
      leadSpecialist: 'Muhammad Hamdan',
      description:
        'Production-grade web applications, custom SaaS platforms, and internal business tools built with Next.js 14, TypeScript, and Supabase.',
      keyDeliverables: [
        'Next.js 14 App Router with Server Actions & Server Components',
        'Supabase PostgreSQL database with Row Level Security (RLS)',
        'Airtight role-based authentication and permissions',
        'Ultra-fast responsive interfaces with Tailwind CSS and Framer Motion',
      ],
      technologies: ['Next.js 14', 'TypeScript', 'Supabase PostgreSQL', 'Tailwind CSS', 'Vercel Edge'],
    },
  ] as ServiceKnowledge[],

  projects: [
    {
      title: 'Enterprise WhatsApp & AI Customer Support Bot',
      slug: 'ai-knowledge-rag-bot',
      path: '/projects/ai-knowledge-rag-bot',
      category: 'AI Automation & Chatbots',
      leadSpecialist: 'Muhammad Hassan',
      summary:
        'Autonomous conversational AI system integrated with WhatsApp Cloud API and Google Gemini delivering 24/7 intelligent customer engagement, document-grounded RAG answers, and automated meeting booking.',
      outcome:
        'Handled 12,000+ monthly inquiries with 99.8% bot uptime, reducing first-response latency from 3 hours to 4 seconds and automating 78% of tier-1 support.',
      technologies: ['Google Gemini 1.5', 'WhatsApp Cloud API', 'Supabase pgvector', 'Next.js 14', 'TypeScript'],
    },
    {
      title: 'Automated B2B Cold Outreach & Lead Nurturing Engine',
      slug: 'ai-sales-email-bot',
      path: '/projects/ai-sales-email-bot',
      category: 'Email Marketing',
      leadSpecialist: 'Muhammad Saqlain',
      summary:
        'High-converting cold email outreach infrastructure featuring inbox warm-up protocols (SPF, DKIM, DMARC), targeted prospect segmentation, and automated multi-touch drip sequences.',
      outcome:
        'Achieved a sustained 64.2% open rate, a 22.8% positive reply rate, and booked 45+ qualified sales meetings in the first 60 days.',
      technologies: ['Instantly', 'Apollo.io', 'Resend API', 'DNS Deliverability', 'Make / Zapier'],
    },
    {
      title: 'Enterprise SaaS Operations & Client Management Platform',
      slug: 'ai-business-assistant',
      path: '/projects/ai-business-assistant',
      category: 'Full-Stack Development',
      leadSpecialist: 'Muhammad Hamdan',
      summary:
        'Mission-critical internal operations web application and client portal built with Next.js 14 App Router, TypeScript, and Supabase PostgreSQL with strict Row Level Security (RLS).',
      outcome:
        'Sub-120ms page load times, 100% tenant data isolation, and a 65% reduction in administrative project tracking overhead.',
      technologies: ['Next.js 14', 'TypeScript', 'Supabase PostgreSQL', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      title: 'Autonomous Lead-to-Close Pipeline (Integrated Agency Triad)',
      slug: 'unified-agency-triad-pipeline',
      path: '/projects/unified-agency-triad-pipeline',
      category: 'Integrated Triad',
      leadSpecialist: 'Hassan • Saqlain • Hamdan',
      summary:
        'Synchronized ecosystem combining cold email outreach (Saqlain), inbound WhatsApp AI chatbots (Hassan), and a dedicated full-stack client portal (Hamdan).',
      outcome:
        'Increased conversion from cold prospect to signed client by 3.8x with automated handoffs across all three agency specialties.',
      technologies: ['Google Gemini 1.5', 'Next.js 14', 'WhatsApp API', 'Email Automation', 'Supabase'],
    },
  ] as ProjectKnowledge[],

  process: [
    {
      step: 1,
      name: 'Discovery',
      description: 'We analyze your operational friction, existing workflows, tech stack, and core goals.',
    },
    {
      step: 2,
      name: 'Strategy',
      description: 'We architect deterministic system designs, database schemas, prompt logic, and UI wireframes.',
    },
    {
      step: 3,
      name: 'Development',
      description: 'We engineer modular, production-ready code with clean git commits and strict type safety.',
    },
    {
      step: 4,
      name: 'Testing',
      description: 'Rigorous end-to-end testing, error boundary validation, security audits, and load testing.',
    },
    {
      step: 5,
      name: 'Deployment & Optimization',
      description: 'Cloud deployment to edge infrastructure with continuous monitoring and performance tuning.',
    },
  ],

  pricingPolicy: {
    hasFixedPricing: false,
    statement:
      'NexaCore Automations does not offer generic one-size-fits-all fixed packages online. Every project has unique requirements, integrations, and architectural scopes. We provide custom, transparent scoped quotes after reviewing your requirements through our Contact / Start a Project page.',
    statementRomanUrdu:
      'Hamari website par fixed pricing mention nahi hai kyunki har project ki technical requirements aur scope alag hota hai. Aap Contact page se apni requirements share kar sakte hain taake team aapko customized proposal provide kar sake.',
  },

  contact: {
    contactPage: '/contact',
    email: 'contact@nexacoreautomations.com',
    whatsappUrl: 'https://wa.me/923000000000',
    linkedinUrl: 'https://linkedin.com/company/nexacore-automations',
    githubUrl: 'https://github.com/nexacore-automations',
  },

  navigationAllowlist: [
    { keywords: ['home', 'homepage', 'main page', 'start'], path: '/', label: 'Home' },
    { keywords: ['service', 'services', 'offering', 'kya karte ho', 'services dekhao', 'services dikhao'], path: '/services', label: 'Services' },
    { keywords: ['project', 'projects', 'portfolio', 'case study', 'case studies', 'work', 'projects dikhao'], path: '/projects', label: 'Projects' },
    { keywords: ['team', 'members', 'founders', 'who is', 'hassan', 'saqlain', 'hamdan', 'team dikhao', 'team dekhao'], path: '/#team', label: 'Team Section' },
    { keywords: ['about', 'about us', 'agency', 'company', 'philosophy'], path: '/about', label: 'About Page' },
    { keywords: ['contact', 'hire', 'start a project', 'quote', 'get in touch', 'rabta', 'contact page'], path: '/contact', label: 'Contact Page' },
    { keywords: ['privacy', 'privacy policy', 'data policy'], path: '/privacy', label: 'Privacy Policy' },
    { keywords: ['terms', 'terms of service', 'agreement', 'contract'], path: '/terms', label: 'Terms of Service' },
    { keywords: ['ai automation', 'automation service', 'agents'], path: '/services#ai-automation', label: 'AI Automation' },
    { keywords: ['chatbot', 'chatbots', 'bot', 'whatsapp bot', 'whatsapp chatbot'], path: '/services#ai-chatbots', label: 'AI Chatbots' },
    { keywords: ['email marketing', 'cold email', 'outreach', 'email service'], path: '/services#email-marketing', label: 'Email Marketing' },
    { keywords: ['full stack', 'full-stack', 'web development', 'saas', 'software development'], path: '/services#full-stack-web-apps', label: 'Full-Stack Development' },
  ],
};
