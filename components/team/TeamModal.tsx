'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember } from '@/types/team';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Bot,
  Mail,
  Code2,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

function LinkedInIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

interface TeamModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export default function TeamModal({ member, onClose }: TeamModalProps) {
  const [imageError, setImageError] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (member) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [member, onClose]);

  if (!member) return null;

  const getSpecialistIcon = () => {
    switch (member.id) {
      case 'hassan':
        return Bot;
      case 'saqlain':
        return Mail;
      case 'hamdan':
        return Code2;
      default:
        return Sparkles;
    }
  };

  const SpecialistIcon = getSpecialistIcon();

  // Contact page preselected service query
  const getPreselectedService = () => {
    if (member.id === 'hassan') return 'AI Automation';
    if (member.id === 'saqlain') return 'Other';
    return 'Full-Stack Development';
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white border border-slate-200/90 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl z-10 my-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Row: Photo + Name + Role */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-4 border-b border-slate-100">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 border border-slate-200/90 overflow-hidden shrink-0 shadow-md">
              {!imageError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-[50%_15%] brightness-[1.12] contrast-[1.04]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-slate-50">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${member.accent.gradient} text-white flex items-center justify-center shadow-sm mb-1`}>
                    <SpecialistIcon className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-[10px] text-slate-700 uppercase">
                    {member.name}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-50 border border-slate-200">
                <SpecialistIcon className="w-3.5 h-3.5 text-blue-600" />
                <span className="typography-label text-slate-700">NexaCore Core Specialist</span>
              </div>

              <h2 className="typography-h3 text-xl sm:text-2xl text-[#0F172A]">
                {member.name}
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-blue-600">
                {member.role}
              </p>

              <p className="typography-body-sm text-slate-500">
                {member.tagline}
              </p>

              {member.linkedinUrl && (
                <div className="pt-1.5 flex justify-center sm:justify-start">
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 transition-all shadow-xs"
                  >
                    <LinkedInIcon className="w-3.5 h-3.5" />
                    <span>View LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Bio Overview */}
          <div className="py-3.5 space-y-2 border-b border-slate-100">
            <h4 className="typography-label text-[#0F172A]">
              Specialist Profile
            </h4>
            <p className="typography-body text-slate-600">{member.description}</p>
          </div>

          {/* Detailed Expertise List */}
          <div className="py-3.5 space-y-3 border-b border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Core Competencies & Technical Scope
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {member.detailedExpertise.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-slate-700 p-2 rounded-xl bg-slate-50 border border-slate-200/80 font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Deliverables */}
          <div className="py-3.5 space-y-2.5 border-b border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Typical Client Deliverables
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {member.keyDeliverables.map((deliv, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50/70 border border-blue-200/70 text-blue-900"
                >
                  {deliv}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct senior engineering engagement</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0F172A] border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Close
              </button>

              <Link
                href={`/contact?service=${encodeURIComponent(getPreselectedService())}&specialist=${member.id}`}
                onClick={onClose}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/20 transition-all hover:scale-105"
              >
                <span>Inquire With {member.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
