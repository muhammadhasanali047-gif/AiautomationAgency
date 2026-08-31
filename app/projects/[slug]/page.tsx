import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Project } from '@/types/database';
import { INITIAL_PROJECTS } from '@/lib/data/initial-projects';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) {
    return {
      title: 'Project Not Found | NexaCore Automations',
    };
  }

  return {
    title: `${project.title} | NexaCore Case Study`,
    description: project.short_summary,
    openGraph: {
      title: `${project.title} | NexaCore Automations`,
      description: project.short_summary,
    },
  };
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (!error && data) {
      return data;
    }
  } catch (e) {
    // Proceed to fallback
  }

  const found = INITIAL_PROJECTS.find((p) => p.slug === slug);
  return found || null;
}

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 border border-blue-200 text-blue-700">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured Project
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            {project.short_summary}
          </p>

          {/* Quick Action Links & Tech Preview */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-50 text-slate-700 border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#0F172A] bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.live_demo_url && (
                <a
                  href={project.live_demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Deployment</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Media / Screenshots Section */}
        <div className="mb-14 rounded-3xl bg-transparent border border-slate-200/90 overflow-hidden shadow-sm">
          {project.screenshots && project.screenshots.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 p-4">
              {project.screenshots.map((shot, idx) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={idx}
                  src={shot}
                  alt={`${project.title} screenshot ${idx + 1}`}
                  className="rounded-2xl w-full object-cover border border-slate-200"
                />
              ))}
            </div>
          ) : (
            <div className="py-20 px-8 text-center space-y-4 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto shadow-sm">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Interactive Production Architecture</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                This project represents a backend automation and API-driven system. Technical architectural specifications and problem-solution breakdowns are documented below.
              </p>
            </div>
          )}
        </div>

        {/* Main Content Sections: Problem, Solution, Architecture, Features */}
        <div className="space-y-10">
          {/* Overview */}
          <div className="rounded-3xl p-8 bg-transparent border border-slate-200/90 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-[#0F172A] tracking-tight flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              System Overview
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Problem */}
            <div className="rounded-3xl p-8 bg-white border border-slate-200/90 space-y-4 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
                The Challenge
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">The Operational Problem</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* The Solution */}
            <div className="rounded-3xl p-8 bg-white border border-slate-200/90 space-y-4 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                The Engineering Solution
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">Engineered Implementation</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          {project.key_features && project.key_features.length > 0 && (
            <div className="rounded-3xl p-8 bg-transparent border border-slate-200/90 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#0F172A] tracking-tight flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                Key Architectural Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.key_features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border border-slate-200 flex items-start gap-3 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Pipeline */}
          {project.architecture && (
            <div className="rounded-3xl p-8 bg-[#0F172A] text-white space-y-4 shadow-xl">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-cyan-400" />
                Data & System Architecture Pipeline
              </h2>
              <div className="p-4 rounded-xl bg-black/30 border border-white/10 font-mono text-xs text-slate-300 leading-relaxed">
                {project.architecture}
              </div>
            </div>
          )}

          {/* Challenges & Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.challenges && (
              <div className="p-8 rounded-3xl bg-transparent border border-slate-200/90 space-y-3 shadow-sm">
                <h4 className="text-base font-bold text-[#0F172A]">Technical Complexities Overcome</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{project.challenges}</p>
              </div>
            )}
            {project.outcome && (
              <div className="p-8 rounded-3xl bg-emerald-50/60 border border-emerald-200 space-y-3 shadow-sm">
                <h4 className="text-base font-bold text-emerald-950">Measurable System Outcome</h4>
                <p className="text-xs text-emerald-800 font-medium leading-relaxed">{project.outcome}</p>
              </div>
            )}
          </div>

          {/* CTA Footer */}
          <div className="rounded-3xl bg-gradient-to-r from-blue-50 via-purple-50 to-orange-50 border border-slate-200 p-8 sm:p-10 text-center space-y-4 shadow-sm">
            <h3 className="text-2xl font-bold text-[#0F172A]">
              Interested in building a similar system?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              NexaCore can build a custom solution tailored directly to your company&apos;s data, tools, and workflows.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-600/20"
              >
                <span>Request Project Proposal</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
