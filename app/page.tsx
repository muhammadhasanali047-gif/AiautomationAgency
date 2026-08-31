import React from 'react';
import Hero from '@/components/hero/Hero';
import TechStrip from '@/components/hero/TechStrip';
import Capabilities from '@/components/capabilities/Capabilities';
import TeamSection from '@/components/team/TeamSection';
import ProcessSection from '@/components/sections/ProcessSection';
import WhyWorkSection from '@/components/sections/WhyWorkSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { createClient } from '@/lib/supabase/server';
import { Testimonial } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let testimonials: Testimonial[] = [];

  try {
    const supabase = createClient();

    // Fetch testimonials (if verified client reviews exist)
    const { data: testimonialsData, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (!testimonialsError && testimonialsData) {
      testimonials = testimonialsData;
    }
  } catch (error) {
    console.warn('Supabase query fallback on home page:', error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <TechStrip />
      <Capabilities />
      <WhyWorkSection />
      <ProcessSection />
      <TeamSection />
      <TestimonialsSection testimonials={testimonials} />
    </div>
  );
}
