'use client';

import React, { useState } from 'react';
import { TEAM_MEMBERS } from '@/lib/data/team';
import { TeamMember } from '@/types/team';
import TeamMemberCard from './TeamMemberCard';
import TeamModal from './TeamModal';
import TeamSynergy from './TeamSynergy';

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section className="relative py-16 sm:py-20 bg-[#FFFFFF] border-t border-slate-200/80 overflow-hidden" id="team">
      {/* Subtle Ambient Brand Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200">
            <span className="typography-label text-blue-700">The Team Behind NexaCore</span>
          </div>

          <h2 className="typography-h2">
            MEET OUR SPECIALISTS
          </h2>

          <p className="typography-body text-slate-600">
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

        {/* Agency Synergy Section: AI + Marketing + Engineering */}
        <TeamSynergy />
      </div>

      {/* Interactive Member Modal */}
      <TeamModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  );
}
