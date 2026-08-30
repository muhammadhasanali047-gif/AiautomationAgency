import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | NexaCore Automations',
  description: 'Official data privacy, security, and confidentiality standards for NexaCore Automations.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'August 30, 2026';

  return (
    <div className="relative pt-24 pb-20 overflow-hidden bg-white selection:bg-blue-100 selection:text-blue-900 nexa-mesh-bg">
      {/* Subtle Background Grid & Glows */}
      <div className="absolute inset-0 nexa-grid-pattern pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="space-y-6 mb-12 border-b border-slate-200 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-blue-700">Legal & Transparency</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172A] uppercase">
            PRIVACY <span className="nexa-gradient-text">POLICY</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            Official data governance, security policies, and confidentiality practices at NexaCore Automations.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2">
            <span>Effective Date: {lastUpdated}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Version 1.2</span>
          </div>
        </div>

        {/* Document Content */}
        <div className="prose prose-slate prose-blue max-w-none">
          {/* Section 1 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight">1. Overview & Commitment</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              NexaCore Automations (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates as an AI automation, chatbot engineering, email marketing, and full-stack software development agency. We respect the confidentiality and privacy of our clients, prospective partners, and website visitors.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We strictly adhere to a zero-compromise data privacy stance. <strong>We do not sell, rent, or trade your personal or business data to third parties under any circumstances.</strong>
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight">2. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We operate on a principle of data minimization, collecting only the information intentionally provided by you when submitting project inquiries, requesting architecture quotes, or contacting our specialists. This includes:
            </p>
            <ul className="space-y-3 text-slate-600 list-disc pl-5 marker:text-blue-500">
              <li>
                <strong className="text-slate-800 font-semibold">Contact Details:</strong> Your name, business email address, company name, and project budget.
              </li>
              <li>
                <strong className="text-slate-800 font-semibold">Project Specifications:</strong> Workflow requirements, API documentation, or feature scopes submitted via our contact forms.
              </li>
              <li>
                <strong className="text-slate-800 font-semibold">Technical Metadata:</strong> Standard non-identifying server telemetry (IP address, browser type) used strictly for rate-limiting and DDoS mitigation.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight">3. AI Data Processing & Model Training</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              When architecting custom AI agents, WhatsApp bots, or conversational solutions, client data and proprietary business rules are transmitted strictly through enterprise API endpoints (such as Google Cloud Vertex AI, OpenAI API).
            </p>
            <div className="pl-4 sm:pl-6 py-1 border-l-4 border-blue-500 bg-blue-50/30 rounded-r-lg my-6">
              <p className="text-slate-800 font-semibold mb-1">Strict AI Zero-Retention Guarantee</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Under our engineering protocols, your confidential business inputs, customer dialogues, and proprietary database embeddings are <strong>never used to train public foundation models</strong>. We enforce zero-retention policies on all API layers.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight">4. Data Storage & Infrastructure Security</h2>
            <p className="text-slate-600 leading-relaxed">
              All project records and form submissions are stored securely on enterprise PostgreSQL instances with strict Row Level Security (RLS) policies enabled. All data in transit is protected using TLS 1.3 encryption. Secret keys and credentials are never exposed to client-side code and are managed via secure environment enclaves.
            </p>
          </div>

          {/* Section 5 */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight">5. Your Rights & Data Deletion</h2>
            <p className="text-slate-600 leading-relaxed">
              You retain full ownership of your data at all times. You may request a complete export or permanent deletion of your inquiry details, conversation logs, or client records by messaging our technical team directly. We comply with all data deletion requests within 7 business days.
            </p>
          </div>
        </div>

        {/* Footer Contact Block */}
        <div className="mt-12 pt-8 border-t border-slate-200 bg-slate-50/50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-[#0F172A] text-lg">Have questions about data privacy?</h3>
            <p className="text-slate-500 mt-1 text-sm">Our technical team is available to discuss security and NDA requirements.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white bg-slate-900 hover:bg-black font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0 text-sm"
          >
            <span>Contact NexaCore</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
