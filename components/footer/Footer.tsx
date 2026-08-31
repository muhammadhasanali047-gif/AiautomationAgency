import React from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import Logo from '@/components/brand/Logo';

// Configurable Footer Data Model
export const FOOTER_CONFIG = {
  brand: {
    name: 'NEXACORE AUTOMATIONS',
    tagline: 'AUTOMATE • INNOVATE • ELEVATE',
    description:
      'Building intelligent AI automation, chatbots, email marketing systems, and scalable full-stack solutions for modern businesses.',
    status: 'Accepting New Client Projects',
  },
  quickLinks: [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Team', href: '/#team' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'AI Automation', href: '/services#ai-automation' },
    { name: 'AI Chatbots', href: '/services#ai-chatbots' },
    { name: 'WhatsApp Automation', href: '/services#whatsapp-chatbots' },
    { name: 'Email Marketing', href: '/services#email-marketing' },
    { name: 'Full-Stack Development', href: '/services#full-stack-web-apps' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  connect: [
    {
      name: 'Email',
      href: 'mailto:contact@nexacoreautomations.com',
      ariaLabel: 'Send email to NexaCore Automations',
      type: 'email' as const,
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/923000000000',
      ariaLabel: 'Message NexaCore on WhatsApp',
      type: 'whatsapp' as const,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/nexacore-automations',
      ariaLabel: 'Connect with NexaCore on LinkedIn',
      type: 'linkedin' as const,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/nexacore-automations',
      ariaLabel: 'View NexaCore on GitHub',
      type: 'github' as const,
    },
  ],
  cta: {
    heading: 'Have a project in mind?',
    subheading: "Let's build something intelligent.",
    buttonText: 'Start a Project',
    buttonHref: '/contact',
  },
  legal: [
    { name: 'Terms of Service', href: '/terms' },
  ],
};

function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-[#F8FAFC] border-t border-slate-200/90 pt-12 pb-8 sm:pt-14 sm:pb-8 overflow-hidden text-slate-700"
      role="contentinfo"
      aria-label="Site footer"
    >

      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-20 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-orange-500/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Contact CTA Banner */}
        <div className="mb-10 sm:mb-12 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-[#0F172A]">
              {FOOTER_CONFIG.cta.heading}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              {FOOTER_CONFIG.cta.subheading}
            </p>
          </div>
          <Link
            href={FOOTER_CONFIG.cta.buttonHref}
            className="typography-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 transition-all text-xs sm:text-sm shrink-0 hover:-translate-y-0.5"
          >
            <span>{FOOTER_CONFIG.cta.buttonText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-slate-200/80">
          {/* Col 1: Brand & Tagline (Span 5 on Desktop) */}
          <div className="lg:col-span-5 space-y-3.5">
            <Link
              href="/"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-lg"
              aria-label="NexaCore Automations Home"
            >
              <Logo variant="horizontal" size="md" showTagline={false} />
            </Link>

            <p className="text-xs font-mono font-bold tracking-wider text-slate-500">
              {FOOTER_CONFIG.brand.tagline}
            </p>

            <p className="typography-body-sm text-slate-600 max-w-sm">
              {FOOTER_CONFIG.brand.description}
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {FOOTER_CONFIG.brand.status}
              </span>
            </div>
          </div>

          {/* Col 2: Services (Span 3 on Desktop) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="typography-label text-[#0F172A] tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_CONFIG.services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-slate-600 hover:text-blue-600 font-normal transition-colors inline-block focus:outline-none focus:text-blue-600"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect / Social Links (Span 4 on Desktop) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="typography-label text-[#0F172A] tracking-wider uppercase">
              Connect
            </h4>
            <div className="flex flex-col gap-2 pt-0.5">
              {FOOTER_CONFIG.connect.map((item) => {
                const isEmail = item.type === 'email';
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    {...(!isEmail ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={item.ariaLabel}
                    className="group flex items-center gap-2.5 p-2 px-3 rounded-xl bg-white border border-slate-200/90 hover:border-blue-400 hover:bg-blue-50/30 transition-all text-xs font-medium text-[#0F172A] shadow-xs"
                  >
                    <div className="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-600 transition-colors shrink-0">
                      {item.type === 'email' && <Mail className="w-3.5 h-3.5" />}
                      {item.type === 'whatsapp' && <WhatsAppIcon className="w-3.5 h-3.5" />}
                      {item.type === 'linkedin' && <LinkedInIcon className="w-3.5 h-3.5" />}
                      {item.type === 'github' && <Github className="w-3.5 h-3.5" />}
                    </div>
                    <span className="flex-1 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-normal">
          <p>© {currentYear} NexaCore Automations. All rights reserved.</p>

          <div className="flex items-center gap-4 text-xs">
            {FOOTER_CONFIG.legal.map((item, idx) => (
              <React.Fragment key={item.name}>
                {idx > 0 && <span className="text-slate-300">|</span>}
                <Link
                  href={item.href}
                  className="text-slate-500 hover:text-blue-600 transition-colors focus:outline-none focus:text-blue-600"
                >
                  {item.name}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
