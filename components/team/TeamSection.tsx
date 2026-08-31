'use client';

import React, { useState } from 'react';
import { TEAM_MEMBERS } from '@/lib/data/team';
import { TeamMember } from '@/types/team';
import TeamMemberCard from './TeamMemberCard';
import TeamModal from './TeamModal';
export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section className="relative py-16 sm:py-20 bg-[#FFFFFF] border-t border-slate-200/80 overflow-hidden" id="team">
      {/* Subtle Ambient Brand Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">The Team Behind NexaCore</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A]">
            MEET OUR SPECIALISTS
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            Three specialists. One mission — building intelligent digital systems that automate, connect and scale modern businesses.
          </p>
        </div>

        {/* 3-Column Desktop Grid / Vertical Mobile Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onSelect={(m) => setSelectedMember(m)}
            />
          ))}
        </div>

      </div>

      {/* Interactive Member Modal */}
      <TeamModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
}
