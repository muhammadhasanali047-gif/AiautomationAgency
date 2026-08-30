'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Clock,
  UserCheck,
} from 'lucide-react';
import { submitContactInquiry } from '@/app/actions/contact';

const services = [
  // Muhammad Hassan — AI Automation & Chatbots
  'AI Automation & Autonomous Agents',
  'WhatsApp Chatbots & Conversational AI',
  'Intelligent Customer Support Systems',
  'Business Workflow Automation',

  // Muhammad Saqlain — Email Marketing
  'Email Marketing & Outreach Campaigns',
  'Automated Email Drip Sequences',
  'B2B Cold Outreach & Lead Nurturing',
  'Deliverability & Inbox Infrastructure',

  // Muhammad Hamdan — Full-Stack Development
  'Full-Stack Web Development (Next.js)',
  'Custom SaaS Platform Engineering',
  'Supabase & PostgreSQL Architecture',
  'REST & Webhook API Integration',

  // Integrated / Other
  'Complete Agency Package (All 3 Disciplines)',
  'Other / Custom Technical Scope',
];

const budgetRanges = [
  'Under $500',
  '$500–$1,000',
  '$1,000–$2,500',
  '$2,500–$5,000',
  '$5,000+',
];

function ContactForm() {
  const searchParams = useSearchParams();
  const specialistParam = searchParams.get('specialist');
  const serviceParam = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'AI Automation & Autonomous Agents',
    budget: '$1,000–$2,500',
    message: '',
    hp_field: '', // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Prepopulate according to arriving specialist or service query
  useEffect(() => {
    if (specialistParam === 'hassan') {
      setFormData((prev) => ({ ...prev, service: 'AI Automation & Autonomous Agents' }));
    } else if (specialistParam === 'saqlain') {
      setFormData((prev) => ({ ...prev, service: 'Email Marketing & Outreach Campaigns' }));
    } else if (specialistParam === 'hamdan') {
      setFormData((prev) => ({ ...prev, service: 'Full-Stack Web Development (Next.js)' }));
    } else if (serviceParam) {
      if (services.includes(serviceParam)) {
        setFormData((prev) => ({ ...prev, service: serviceParam }));
      } else if (serviceParam.toLowerCase().includes('ai')) {
        setFormData((prev) => ({ ...prev, service: 'AI Automation & Autonomous Agents' }));
      } else if (serviceParam.toLowerCase().includes('email')) {
        setFormData((prev) => ({ ...prev, service: 'Email Marketing & Outreach Campaigns' }));
      } else if (serviceParam.toLowerCase().includes('web') || serviceParam.toLowerCase().includes('stack')) {
        setFormData((prev) => ({ ...prev, service: 'Full-Stack Web Development (Next.js)' }));
      }
    }
  }, [specialistParam, serviceParam]);

  const getSpecialistLabel = () => {
    if (specialistParam === 'hassan') return 'Muhammad Hassan (AI Automation & Chatbot Specialist)';
    if (specialistParam === 'saqlain') return 'Muhammad Saqlain (Email Marketing Manager)';
    if (specialistParam === 'hamdan') return 'Muhammad Hamdan (Full-Stack Developer)';
    return null;
  };

  const specialistLabel = getSpecialistLabel();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setErrorMsg(null);
    setLoading(true);

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('company', formData.company);
    payload.append('service', formData.service);
    payload.append('budget', formData.budget);
    payload.append(
      'message',
      specialistLabel
        ? `[Direct inquiry for ${specialistLabel}]\n\n${formData.message}`
        : formData.message
    );
    payload.append('hp_field', formData.hp_field);

    try {
      const res = await submitContactInquiry(payload);
      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(res.error || 'Failed to submit inquiry. Please verify your entries.');
      }
    } catch (err: unknown) {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-md relative">
      {specialistLabel && (
        <div className="mb-4 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Inquiry directed to {specialistLabel}</span>
        </div>
      )}

      {submitted ? (
        /* Success State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-12 text-center space-y-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
            Inquiry Received Successfully
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out, <span className="text-[#0F172A] font-bold">{formData.name}</span>. Your requirements have been logged and our team will review your specifications within 24 hours.
          </p>
          <div className="pt-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  company: '',
                  service: 'AI Automation & Autonomous Agents',
                  budget: '$1,000–$2,500',
                  message: '',
                  hp_field: '',
                });
              }}
              className="px-5 py-2 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </motion.div>
      ) : (
        /* Contact Form */
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field (hidden from real users) */}
          <input
            type="text"
            name="hp_field"
            value={formData.hp_field}
            onChange={(e) => setFormData({ ...formData, hp_field: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
                Your Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Company (Optional) */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
                Company or Organization
              </label>
              <input
                type="text"
                placeholder="Company Ltd. (optional)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              />
            </div>

            {/* Service Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
                Primary Solution Needed <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors cursor-pointer"
              >
                <optgroup label="AI Automation & Chatbots (Muhammad Hassan)">
                  <option value="AI Automation & Autonomous Agents">AI Automation & Autonomous Agents</option>
                  <option value="WhatsApp Chatbots & Conversational AI">WhatsApp Chatbots & Conversational AI</option>
                  <option value="Intelligent Customer Support Systems">Intelligent Customer Support Systems</option>
                  <option value="Business Workflow Automation">Business Workflow Automation</option>
                </optgroup>

                <optgroup label="Email Marketing (Muhammad Saqlain)">
                  <option value="Email Marketing & Outreach Campaigns">Email Marketing & Outreach Campaigns</option>
                  <option value="Automated Email Drip Sequences">Automated Email Drip Sequences</option>
                  <option value="B2B Cold Outreach & Lead Nurturing">B2B Cold Outreach & Lead Nurturing</option>
                  <option value="Deliverability & Inbox Infrastructure">Deliverability & Inbox Infrastructure</option>
                </optgroup>

                <optgroup label="Full-Stack Engineering (Muhammad Hamdan)">
                  <option value="Full-Stack Web Development (Next.js)">Full-Stack Web Development (Next.js)</option>
                  <option value="Custom SaaS Platform Engineering">Custom SaaS Platform Engineering</option>
                  <option value="Supabase & PostgreSQL Architecture">Supabase & PostgreSQL Architecture</option>
                  <option value="REST & Webhook API Integration">REST & Webhook API Integration</option>
                </optgroup>

                <optgroup label="Integrated Agency Package">
                  <option value="Complete Agency Package (All 3 Disciplines)">Complete Agency Package (All 3 Disciplines)</option>
                  <option value="Other / Custom Technical Scope">Other / Custom Technical Scope</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Budget Dropdown */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
              Estimated Project Budget <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
              {budgetRanges.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setFormData({ ...formData, budget: b })}
                  className={`py-1.5 sm:py-2 px-2 rounded-lg text-xs font-medium border text-center transition-all ${
                    formData.budget === b
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/20'
                      : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
              Project Scope & Goals <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe your workflows, goals, timeline, and any key tools to connect..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="typography-btn w-full py-3 rounded-xl text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md shadow-blue-600/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 text-xs sm:text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Securely...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Project Inquiry</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-slate-500 pt-0.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Protected by server-side validation and Supabase RLS. No spam.</span>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="relative pt-24 pb-16 overflow-hidden bg-white nexa-mesh-bg">
      {/* Subtle Background Grid & Glows */}
      <div className="absolute inset-0 nexa-grid-pattern pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200">
                <span className="typography-label text-blue-700">Start Your Project</span>
              </div>
              <h1 className="typography-h2">
                LET&apos;S ENGINEER <br />
                <span className="nexa-gradient-text">
                  YOUR SYSTEM
                </span>
              </h1>
              <p className="typography-body-lg text-slate-600">
                Have a workflow to automate, an email sequence to scale, or a modern full-stack web application to build? Share your requirements with NexaCore Automations.
              </p>
            </div>

            {/* Direct Information Badges */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <div className="p-4 sm:p-4.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">Rapid Response</h4>
                  <p className="text-xs text-slate-500 font-medium">Inquiries reviewed and scoped within 24 hours.</p>
                </div>
              </div>

              <div className="p-4 sm:p-4.5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 flex items-center gap-3.5 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0 shadow-sm">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F172A]">Direct Specialist Access</h4>
                  <p className="text-xs text-slate-500 font-medium">Work directly with Muhammad Hassan, Muhammad Saqlain, or Muhammad Hamdan.</p>
                </div>
              </div>

              {/* 3 Specialists Direct Contact Availability Strip */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
                <span className="typography-label text-slate-500 block">
                  Dedicated Agency Specialists:
                </span>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-200 shrink-0 shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/team/hassan.jpg" alt="Muhammad Hassan" className="w-full h-full object-cover object-[50%_15%]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#0F172A]">Muhammad Hassan</div>
                      <div className="text-[11px] text-blue-600 font-medium truncate">AI Automation & Chatbots</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-200 shrink-0 shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/team/saqlain.jpg" alt="Muhammad Saqlain" className="w-full h-full object-cover object-[50%_15%]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#0F172A]">Muhammad Saqlain</div>
                      <div className="text-[11px] text-purple-600 font-medium truncate">Email Marketing Manager</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-200 shrink-0 shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/team/hamdan.jpg" alt="Muhammad Hamdan" className="w-full h-full object-cover object-[50%_15%]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#0F172A]">Muhammad Hamdan</div>
                      <div className="text-[11px] text-cyan-700 font-medium truncate">Full-Stack Developer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form Card with Suspense for SearchParams */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="rounded-[32px] bg-white border border-slate-200 p-8 text-center text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
                  <span>Loading inquiry form...</span>
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
