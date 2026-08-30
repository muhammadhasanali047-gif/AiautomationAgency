import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileCheck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | NexaCore Automations',
  description: 'Official terms of service, engagement agreements, and intellectual property terms for NexaCore Automations.',
};

export default function TermsOfServicePage() {
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
            <span className="text-[11px] font-bold tracking-wider uppercase text-blue-700">Legal Agreements</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#0F172A] uppercase">
            TERMS OF <span className="nexa-gradient-text">SERVICE</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            Standard engagement terms, client rights, and service agreements governing NexaCore Automations engineering deliverables.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2">
            <span>Effective Date: {lastUpdated}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Version 1.0</span>
          </div>
        </div>

        {/* Document Content */}
        <div className="prose prose-slate prose-blue max-w-none">
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight">1. Engagement & Project Scopes</h2>
            <p className="text-slate-600 leading-relaxed">
              NexaCore Automations delivers custom software development, AI automation workflows, enterprise chatbot integrations, and email marketing campaigns under tailored Statements of Work (SOW) mutually agreed with each client.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight">2. Intellectual Property Ownership</h2>
            <p className="text-slate-600 leading-relaxed">
              Upon full settlement of project invoices, all custom code, automation blueprints, chatbot configurations, and deliverables created specifically for the client become the exclusive property of the client, unless otherwise stipulated in the SOW.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight">3. Confidentiality & Non-Disclosure</h2>
            <p className="text-slate-600 leading-relaxed">
              We treat all client data, business logic, system credentials, and workflow architecture as strictly confidential. We readily sign mutual Non-Disclosure Agreements (NDAs) prior to project kickoff upon request.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight">4. Warranties & Post-Launch Support</h2>
            <p className="text-slate-600 leading-relaxed">
              All production deployments undergo rigorous QA testing. Standard engagements include a dedicated bug-fixing and stabilization warranty window to guarantee reliability across edge cases.
            </p>
          </div>
        </div>

        {/* Footer Contact Block */}
        <div className="mt-12 pt-8 border-t border-slate-200 bg-slate-50/50 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-[#0F172A] text-lg">Need custom contract terms or an enterprise NDA?</h3>
            <p className="text-slate-500 mt-1 text-sm">Contact our engineering leadership directly.</p>
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
