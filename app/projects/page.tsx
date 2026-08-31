import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Project } from '@/types/database';
import { INITIAL_PROJECTS } from '@/lib/data/initial-projects';
import { ArrowUpRight, Code2, ExternalLink, Github, Bot, Mail, Globe, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects & Case Studies | NexaCore Automations',
  description:
    'Production AI automation systems, enterprise email marketing infrastructures, and full-stack software built by NexaCore Automations specialists.',
};

export const dynamic = 'force-dynamic';

function getSpecialistForProject(category: string) {
  if (category.toLowerCase().includes('email')) {
    return {
      name: 'Muhammad Saqlain',
      role: 'Email Marketing Manager',
      avatar: '/team/saqlain.jpg',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: Mail,
      linkedinUrl: 'https://www.linkedin.com/in/muhammad-saqlain-klaviyo-expert/',
    };
  }
  if (category.toLowerCase().includes('stack') || category.toLowerCase().includes('web') || category.toLowerCase().includes('saas')) {
    return {
      name: 'Muhammad Hamdan',
      role: 'Full-Stack Developer',
      avatar: '/team/hamdan.jpg',
      badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      icon: Globe,
    };
  }
  if (category.toLowerCase().includes('triad')) {
    return {
      name: 'Hassan • Saqlain • Hamdan',
      role: 'Unified Agency Triad',
      avatar: null,
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Sparkles,
    };
  }
  return {
    name: 'Muhammad Hassan',
    role: 'AI Automation & Chatbot Specialist',
    avatar: '/team/hassan.jpg',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Bot,
  };
}

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      // Merge database items or prioritize updated INITIAL_PROJECTS if database has outdated categories
      projects = INITIAL_PROJECTS;
    } else {
      projects = INITIAL_PROJECTS;
    }
  } catch (err) {
    projects = INITIAL_PROJECTS;
  }

  return (
    <div className="relative pt-24 pb-16 overflow-hidden bg-white nexa-mesh-bg">
      {/* Subtle Background Grid & Glows */}
      <div className="absolute inset-0 nexa-grid-pattern pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200">
            <span className="typography-label text-blue-700">Portfolio & Case Studies</span>
          </div>

          <h1 className="typography-h2">
            FEATURED PROJECTS & <br />
            <span className="nexa-gradient-text">
              TECHNICAL CASE STUDIES
            </span>
          </h1>

          <p className="typography-body-lg text-slate-600">
            Real architectural breakdowns of production AI automation systems, high-converting email marketing infrastructures, and scalable full-stack web platforms engineered by our 3 specialists.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => {
            const specialist = getSpecialistForProject(project.category);
            const SpecialistIcon = specialist.icon;

            return (
              <div
                key={project.id}
                className="group rounded-3xl bg-transparent border border-slate-200/90 hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                {/* Media Header with Specialist Attribution */}
                <div className="relative aspect-square sm:aspect-[4/3] w-full bg-gradient-to-br from-slate-100 to-slate-50 border-b border-slate-200/80 overflow-hidden flex items-center justify-center p-6">
                  <div className="text-center space-y-3 flex flex-col items-center justify-center max-w-sm">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                      <SpecialistIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                      {project.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#0F172A] line-clamp-2">
                      {project.title}
                    </h3>
                  </div>

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${specialist.badgeColor}`}>
                      {project.category}
                    </span>
                  </div>

                  {/* Specialist Avatar Pill */}
                  {specialist.linkedinUrl ? (
                    <a
                      href={specialist.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Connect with ${specialist.name} on LinkedIn`}
                      className="absolute top-4 right-4 bg-white/95 hover:bg-blue-50/90 backdrop-blur-md border border-slate-200/80 hover:border-blue-300 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-xs transition-all hover:scale-105 z-10"
                    >
                      {specialist.avatar && (
                        <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={specialist.avatar} alt={specialist.name} className="w-full h-full object-cover object-[50%_15%]" />
                        </div>
                      )}
                      <span className="text-[11px] font-semibold text-[#0F172A] hover:text-blue-700 transition-colors">
                        {specialist.name}
                      </span>
                    </a>
                  ) : (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-xs">
                      {specialist.avatar ? (
                        <div className="w-5 h-5 rounded-full overflow-hidden border border-slate-200 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={specialist.avatar} alt={specialist.name} className="w-full h-full object-cover object-[50%_15%]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[9px] font-bold">
                          3x
                        </div>
                      )}
                      <span className="text-[11px] font-semibold text-[#0F172A]">
                        {specialist.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group-hover:text-blue-600 transition-colors inline-block"
                    >
                      <h2 className="typography-h3 text-xl sm:text-2xl text-[#0F172A] tracking-tight flex items-center gap-2">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </h2>
                    </Link>
                    <p className="typography-body-sm text-slate-600 line-clamp-3">
                      {project.short_summary}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-white text-slate-700 border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions Footer */}
                    <div className="pt-3.5 border-t border-slate-200/90 flex items-center justify-between">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <span>Read Technical Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-2">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-500 hover:text-[#0F172A] rounded-xl hover:bg-white transition-colors"
                            title="View Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.live_demo_url && (
                          <a
                            href={project.live_demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-500 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

