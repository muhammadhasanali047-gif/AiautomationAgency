import React from 'react';
import { Testimonial } from '@/types/database';
import { Star, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  // If zero real testimonials in Supabase, hide the section per prompt instructions
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 bg-white border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700">
            Client Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            CLIENT TESTIMONIALS
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Verified feedback from companies that scaled operations with NexaCore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl p-8 bg-[#F8FAFC] border border-slate-200/90 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center gap-3">
                {item.client_avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.client_avatar_url}
                    alt={item.client_name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {item.client_name.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">{item.client_name}</h4>
                  <p className="text-xs text-slate-500">
                    {item.client_role} {item.client_company ? `• ${item.client_company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
