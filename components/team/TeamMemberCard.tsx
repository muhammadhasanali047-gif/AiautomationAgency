'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '@/types/team';
import {
  Bot,
  Mail,
  Code2,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface TeamMemberCardProps {
  member: TeamMember;
  onSelect: (member: TeamMember) => void;
}

function LinkedInIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function TeamMemberCard({ member, onSelect }: TeamMemberCardProps) {
  const [imageError, setImageError] = useState(false);

  // Specialist role icon
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => onSelect(member)}
      className="group relative rounded-3xl bg-white border border-slate-200/90 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer p-5 sm:p-6 hover:-translate-y-1"
    >
      {/* Top Ambient Glow on Card Hover */}
      <div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
        style={{ background: member.accent.badgeGlow }}
      />

      <div className="space-y-4">
        {/* Photo Framing Container */}
        <div className="relative aspect-[4/4.2] w-full rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/70 border border-slate-200/80 overflow-hidden flex items-center justify-center shadow-inner">
          {!imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.image}
              alt={`${member.name} - ${member.role}`}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-[50%_15%] brightness-[1.12] contrast-[1.04] group-hover:scale-105 transition-all duration-500"
            />
          ) : (
            /* Premium Stylized Fallback Portrait Visual */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-50 relative">
              <div className="absolute inset-0 bg-radial from-blue-500/5 to-transparent pointer-events-none" />
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${member.accent.gradient} text-white flex items-center justify-center shadow-lg shadow-blue-500/20 mb-3 group-hover:scale-105 transition-transform duration-300`}
              >
                <SpecialistIcon className="w-9 h-9" />
              </div>
              <div className="space-y-0.5 relative z-10">
                <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-blue-600 font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Specialist</span>
                </div>
                <span className="font-extrabold text-xs tracking-tight text-[#0F172A]">
                  {member.name.toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* Floating Role Pill Badge */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md border shadow-sm ${member.accent.pillText} ${member.accent.pillBg}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{member.role.split('&')[0].trim()}</span>
            </span>

            <span className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Member Profile Details */}
        <div className="space-y-2">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight group-hover:text-blue-600 transition-colors">
              {member.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-blue-600 mt-0.5">
              {member.role}
            </p>
          </div>

          <p className="typography-body-sm text-slate-600 line-clamp-3">
            {member.description}
          </p>
        </div>
      </div>

      {/* Skills Badges & CTA Footer */}
      <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
        {/* 4–6 Skills Pill Badges */}
        <div className="flex flex-wrap gap-1.5">
          {member.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="typography-badge px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-700 group-hover:border-slate-300 transition-colors"
            >
              {skill}
            </span>
          ))}
          {member.skills.length > 5 && (
            <span className="typography-badge px-2 py-1 rounded-lg text-slate-500">
              +{member.skills.length - 5}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(member);
            }}
            className="typography-btn flex-1 py-2.5 px-3 rounded-xl text-[#0F172A] bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 hover:border-blue-200 transition-colors flex items-center justify-center gap-1.5 text-xs sm:text-sm"
          >
            <span>View Capabilities</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={`View ${member.name}'s LinkedIn Profile`}
              aria-label={`View ${member.name}'s LinkedIn Profile`}
              className="py-2.5 px-3 rounded-xl bg-blue-50/70 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 hover:border-blue-600 transition-all flex items-center justify-center gap-1.5 text-xs font-semibold shadow-xs shrink-0"
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
