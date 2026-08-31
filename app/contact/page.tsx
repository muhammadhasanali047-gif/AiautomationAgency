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
  MapPin,
  Phone,
  Mail,
  MessageCircle,
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
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    hp_field: '', // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setErrorMsg(null);
    setLoading(true);

    const payload = new FormData();
    payload.append('name', formData.name);
    // Since our backend expects an email and service/budget, we map phone to email for now
    payload.append('email', `${formData.phone.replace(/[^0-9]/g, '')}@whatsapp.local`); 
    payload.append('company', 'N/A');
    payload.append('service', 'Other');
    payload.append('budget', 'Under $500');
    payload.append(
      'message',
      `[Phone/WhatsApp: ${formData.phone}]\n\n${formData.message}`
    );
    payload.append('hp_field', formData.hp_field);

    try {
      const res = await submitContactInquiry(payload);
      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(res.error || 'Failed to submit message.');
      }
    } catch (err: unknown) {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200/80 p-8 shadow-xl shadow-slate-200/50 relative">
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
            Message Sent Successfully
          </h2>
          <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            Thank you for reaching out, <span className="text-[#0F172A] font-bold">{formData.name}</span>. We will get back to you within 1 hour.
          </p>
          <div className="pt-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', phone: '', message: '', hp_field: '' });
              }}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </motion.div>
      ) : (
        /* Contact Form */
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Send Us a Message</h2>
            <p className="text-sm text-slate-600">Fill out the form below and we will get back to you within 1 hour.</p>
          </div>

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
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#1E293B] focus:ring-1 focus:ring-[#1E293B] transition-colors"
            />
          </div>

          {/* Phone / WhatsApp */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Phone / WhatsApp <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="0300 1234567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#1E293B] focus:ring-1 focus:ring-[#1E293B] transition-colors"
            />
          </div>

          {/* Message / Requirements */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Message / Requirements <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell us about your home/business system requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#1E293B] focus:ring-1 focus:ring-[#1E293B] transition-colors resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E293B] hover:bg-[#0F172A] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-900/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>SEND MESSAGE</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
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
          {/* Left Column: Contact Info Card (Light Theme) */}
          <div className="lg:col-span-5 h-full">
            <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-3xl p-8 sm:p-10 text-[#0F172A] h-full flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="relative z-10 space-y-10">
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">
                    NexaCore HQ
                  </h1>
                  <p className="text-slate-500 text-sm font-medium">
                    Serving clients globally
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="mt-1">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Office Address</p>
                      <p className="text-sm font-bold text-[#0F172A]">Multan / South Punjab, Pakistan</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="mt-1">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Phone / WhatsApp</p>
                      <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#0F172A] hover:text-blue-600 transition-colors">
                        +92 300 0000000
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="mt-1">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Inquiry</p>
                      <a href="mailto:contact@nexacoreautomations.com" className="text-sm font-bold text-[#0F172A] hover:text-blue-600 transition-colors">
                        contact@nexacoreautomations.com
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="mt-1">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Working Hours</p>
                      <p className="text-sm font-bold text-[#0F172A]">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom WhatsApp Button */}
              <div className="relative z-10 pt-10 mt-auto">
                <a
                  href="https://wa.me/923000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>DIRECT WHATSAPP CHAT</span>
                </a>
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
