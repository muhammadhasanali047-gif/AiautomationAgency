'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { sendLeadNotificationEmail } from '@/lib/resend/email';
import { headers } from 'next/headers';

const VALID_SERVICES = [
  // Muhammad Hassan — AI Automation & Chatbots
  'AI Automation & Autonomous Agents',
  'WhatsApp Chatbots & Conversational AI',
  'Intelligent Customer Support Systems',
  'Business Workflow Automation',
  'AI Automation',
  'AI Chatbot',
  'WhatsApp Chatbot',
  'AI Sales Bot',

  // Muhammad Saqlain — Email Marketing
  'Email Marketing & Outreach Campaigns',
  'Automated Email Drip Sequences',
  'B2B Cold Outreach & Lead Nurturing',
  'Deliverability & Inbox Infrastructure',
  'Email Marketing',

  // Muhammad Hamdan — Full-Stack Development
  'Full-Stack Web Development (Next.js)',
  'Custom SaaS Platform Engineering',
  'Supabase & PostgreSQL Architecture',
  'REST & Webhook API Integration',
  'Web Development',
  'SaaS Development',

  // Integrated & Custom Scope
  'Complete Agency Package (All 3 Disciplines)',
  'Other / Custom Technical Scope',
  'Custom AI Solution',
  'Other',
];

const VALID_BUDGETS = [
  'Under $500',
  '$500–$1,000',
  '$1,000–$2,500',
  '$2,500–$5,000',
  '$5,000+',
];

export async function submitContactInquiry(formData: FormData) {
  try {
    // 1. Honeypot check (anti-bot)
    const honeypot = formData.get('hp_field')?.toString();
    if (honeypot && honeypot.length > 0) {
      // Silently fail for bots
      return { success: true };
    }

    // 2. Extract & Sanitize fields
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim().toLowerCase();
    const company = formData.get('company')?.toString().trim() || null;
    const service = formData.get('service')?.toString().trim();
    const budget = formData.get('budget')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    // 3. Validation
    if (!name || name.length < 2) {
      return { error: 'Please provide a valid name (at least 2 characters).' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return { error: 'Please provide a valid email address.' };
    }

    if (!service || !VALID_SERVICES.includes(service)) {
      return { error: 'Please select a valid service from the list.' };
    }

    if (!budget || !VALID_BUDGETS.includes(budget)) {
      return { error: 'Please select a budget range.' };
    }

    if (!message || message.length < 10) {
      return { error: 'Please provide a project description (at least 10 characters).' };
    }

    // Extract client IP if available
    const headerList = headers();
    const ip = headerList.get('x-forwarded-for')?.split(',')[0] || headerList.get('x-real-ip') || null;

    // 4. Save lead to Supabase
    try {
      const supabase = createAdminClient();
      const { error: dbError } = await supabase.from('contact_messages').insert({
        name,
        email,
        company,
        service,
        budget,
        message,
        status: 'new',
        ip_address: ip,
      });

      if (dbError) {
        console.error('Supabase contact insertion error:', dbError);
        // Fallback: Continue to send email even if DB fails
      }
    } catch (dbInitError) {
      console.warn('Supabase client failed to initialize (missing keys):', dbInitError);
    }

    // 5. Send Resend notification (non-blocking)
    sendLeadNotificationEmail({
      name,
      email,
      company,
      service,
      budget,
      message,
    }).catch((err) => {
      console.warn('Failed to send Resend email:', err);
    });

    return { success: true };
  } catch (error: any) {
    console.error('Submit contact inquiry error:', error);
    return { error: `An unexpected server error occurred: ${error?.message || 'Unknown error'}` };
  }
}
