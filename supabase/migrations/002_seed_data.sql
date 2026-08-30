-- Seed initial projects into Supabase for Hassan Agency

INSERT INTO public.projects (
  title,
  slug,
  category,
  short_summary,
  description,
  problem,
  solution,
  key_features,
  architecture,
  technologies,
  challenges,
  outcome,
  featured,
  is_published,
  display_order
) VALUES
(
  'AI Knowledge RAG Bot',
  'ai-knowledge-rag-bot',
  'RAG & Knowledge AI',
  'An intelligent document-based AI assistant that allows users to upload knowledge and interact with it through natural language.',
  'Designed and engineered a full-stack enterprise knowledge retrieval system that converts unstructured documents into high-dimensional vector embeddings, allowing organizational teams to query internal documentation with zero hallucinations and accurate citation references.',
  'Organizations struggle with information silos where critical operating procedures and technical documentation are buried in PDFs and disconnected folders, causing team members to waste hours searching for basic answers.',
  'Engineered an end-to-end RAG pipeline using Google Gemini and Supabase pgvector. Documents are chunked into semantically coherent segments, embedded into 768-dimension vectors, and retrieved using hybrid semantic cosine similarity before prompting Gemini to synthesize grounded answers.',
  ARRAY[
    'Multi-format document ingestion (PDF, TXT, MD, DOCX)',
    'Recursive semantic chunking with overlapping windows',
    'High-speed vector similarity queries powered by pgvector',
    'Deterministic citations pointing directly to document pages',
    'Strict multi-tenant Row Level Security data segregation'
  ],
  'Client Browser (Next.js 14) -> Server Action Upload Handler -> Document Parsing & Chunking Worker -> Embedding Generation -> Supabase pgvector Storage -> Query Engine -> Gemini 1.5 Synthesis -> Streamed Client Response.',
  ARRAY['Next.js 14', 'Supabase', 'Google Gemini', 'PostgreSQL', 'pgvector', 'TypeScript', 'Tailwind CSS'],
  'Preventing context window degradation on complex multi-page PDF documents and ensuring precise chunk boundaries so semantic continuity was not severed between tables and text.',
  'Achieved sub-200ms vector retrieval latency and delivered 100% grounded answers verified with source document citations.',
  true,
  true,
  1
),
(
  'AI Sales & Email Bot',
  'ai-sales-email-bot',
  'AI Automation & Sales',
  'An AI-powered sales communication system designed to intelligently process customer emails and assist with lead conversations.',
  'An automated inbound sales communication engine that monitors incoming emails, extracts customer requirements, classifies lead intent, and drafts personalized, context-aware responses ready for one-click approval or autonomous dispatch.',
  'Sales and customer support teams lose high-value deals because responding to incoming inquiries often takes 12 to 24 hours. Repetitive technical and pricing questions delay first-touch responses.',
  'Built an intelligent email triage automation engine integrating Gemini with Gmail webhooks and Supabase. The system classifies lead intent into tiers, summarizes key requirements, and generates context-grounded email responses.',
  ARRAY[
    'Automated email webhook ingestion and intent classification',
    'Context-aware lead qualification scoring',
    'Draft response generation based on predefined company guidelines',
    'Human-in-the-loop review dashboard with one-click sending',
    'Audit logging of all AI suggestions in Supabase'
  ],
  'Gmail Pub/Sub Webhook -> Next.js API Route Handler -> Gemini Intent Classifier -> Lead Record Storage (Supabase) -> Draft Synthesis -> Notification via Resend -> Web Dashboard.',
  ARRAY['Next.js 14', 'Google Gemini', 'Gmail API', 'Supabase', 'TypeScript', 'Resend'],
  'Accurately identifying nuanced edge cases (such as pricing objections vs general inquiries) and avoiding rigid robot-like email phrasing.',
  'Accelerated average response time from 14 hours down to under 5 minutes for first-touch customer communications.',
  true,
  true,
  2
),
(
  'AI Business Assistant',
  'ai-business-assistant',
  'Full-Stack Business Systems',
  'An AI-powered business assistant combining customer management, lead intelligence and automated communication.',
  'A comprehensive internal operations platform that consolidates client records, tracks multi-stage project pipelines, analyzes client communications, and automates transactional notifications.',
  'Small to mid-sized businesses rely on disconnected spreadsheets, disparate communication tools, and manual email reminders, leading to neglected client follow-ups and lost revenue.',
  'Developed an integrated operations dashboard combining customer relationship tracking with intelligent AI assistance and automated transactional notifications powered by Resend.',
  ARRAY[
    'Centralized client and project pipeline management',
    'Automated lead status transition triggers',
    'Integrated AI conversational assistant for quick operational lookups',
    'Transactional email notifications for milestones and follow-ups',
    'Secure role-based dashboard access with Supabase Auth'
  ],
  'Next.js 14 App Router UI -> Supabase Auth & PostgreSQL -> Gemini Assistant Agent -> Resend Email Dispatcher -> Vercel Edge Hosting.',
  ARRAY['Next.js 14', 'Supabase', 'Google Gemini', 'Resend', 'Tailwind CSS', 'TypeScript'],
  'Ensuring real-time state synchronization across team members while maintaining strict Row Level Security so sensitive customer details remained isolated.',
  'Created a single unified dashboard that reduced manual administrative overhead by over 60%.',
  true,
  true,
  3
)
ON CONFLICT (slug) DO NOTHING;
