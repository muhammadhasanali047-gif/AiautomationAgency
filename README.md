# Hassan — AI Automation & Full-Stack Agency Website

A premium, production-ready agency website built for **Hassan (AI Automation & Full-Stack Developer)**.

## 🚀 Overview

This website positions Hassan as a high-tier developer building:
* **AI Automation Systems & Autonomous Agents**
* **AI Chatbots (WhatsApp Cloud API, Website Live Bots, Sales Bots)**
* **RAG & Enterprise Knowledge Bases (pgvector, Gemini)**
* **Full-Stack Web Applications & Custom SaaS (Next.js 14, Supabase)**

---

## 🛠️ Technology Stack

* **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React
* **Backend:** Next.js Server Components, Server Actions, Route Handlers
* **Database & Auth:** Supabase (PostgreSQL, pgvector, Supabase Auth, Row Level Security)
* **AI Engine:** Google Gemini API (Server-side execution only)
* **Email Dispatch:** Resend API (Server-side execution only)
* **Deployment:** Vercel

---

## 🔒 Security Architecture

* **Strict RLS:** Public visitors can only query published projects and insert new inquiries. Admin operations require authenticated Supabase session.
* **Server-Only Secrets:** `GEMINI_API_KEY`, `RESEND_API_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` are never exposed to browser bundles.
* **Spam & Abuse Protection:** Server Action input validation, honeypot bot trap, and client IP logging.
* **Zero Mock System:** Dynamic metrics on the admin dashboard display exact database counts. When empty, tasteful zero-states are presented instead of fake data.

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx              # Root Layout, Metadata, Navbar, Footer, Floating Assistant
│   ├── page.tsx                # Homepage (Hero, TechStrip, Capabilities, Projects, Process, CTA)
│   ├── about/page.tsx          # About Hassan & Engineering Philosophy
│   ├── services/page.tsx       # Comprehensive Services Catalog
│   ├── projects/
│   │   ├── page.tsx            # Projects Showcase
│   │   └── [slug]/page.tsx     # Dynamic Case Study Architecture & Problem/Solution
│   ├── skills/page.tsx         # Category-based Tech Stack Proficiencies
│   ├── contact/page.tsx        # Project Inquiry Form with Budget & Service Selection
│   ├── admin/
│   │   ├── layout.tsx          # Admin Navigation & Session Controls
│   │   ├── login/page.tsx      # Supabase Auth Login
│   │   ├── page.tsx            # Live Metrics & Recent Leads Overview
│   │   ├── leads/page.tsx      # Lead Management & Status Workflow
│   │   ├── projects/page.tsx   # Project CRUD & Feature Flags
│   │   ├── services/page.tsx   # Custom Service Offerings CRUD
│   │   ├── testimonials/page.tsx # Testimonials Management (Anti-fake rules)
│   │   └── conversations/page.tsx# AI Assistant Chat Logs
│   ├── api/
│   │   └── chat/route.ts       # Secure Gemini Chat API with Session History
│   ├── sitemap.ts              # Dynamic Search Engine Sitemap
│   └── robots.ts               # Robots Configuration
├── components/
│   ├── navbar/Navbar.tsx       # Sticky Backdrop-blur Navbar & Mobile Drawer
│   ├── footer/Footer.tsx       # Enterprise Agency Footer
│   ├── hero/                   # Hero Section & Tech Strip
│   ├── capabilities/           # 6 Core Capabilities Cards
│   ├── projects/               # Featured Projects Showcase
│   ├── sections/               # Process, Value Proposition, CTA Banner
│   └── ai-assistant/           # Floating Hassan AI Chatbot
├── lib/
│   ├── supabase/               # Browser, Server, and Admin Clients
│   ├── gemini/                 # AI System Prompt & Configuration
│   ├── resend/                 # Transactional Email Notification Helper
│   └── utils.ts                # Tailwind Merge & Date Formatters
└── supabase/
    └── migrations/             # Production SQL Schema & Seed Data
```

---

## ⚙️ Environment Variables Setup

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-or-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

GEMINI_API_KEY=your-gemini-api-key

RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=onboarding@resend.dev
ADMIN_NOTIFICATION_EMAIL=hassan@example.com

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🗄️ Database Setup (Supabase)

1. Open your Supabase Dashboard at [https://supabase.com](https://supabase.com).
2. Go to **SQL Editor**.
3. Run the SQL script located in `supabase/migrations/001_initial_schema.sql` to establish tables, indices, and RLS policies.
4. (Optional) Run `supabase/migrations/002_seed_data.sql` to populate initial case studies.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run typecheck
npm run typecheck

# Run local development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Vercel Deployment

1. Push your repository to GitHub.
2. Import repository into [Vercel](https://vercel.com).
3. Add the environment variables specified in `.env.example`.
4. Deploy!
