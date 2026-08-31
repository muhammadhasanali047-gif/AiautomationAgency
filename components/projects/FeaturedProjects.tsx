import React from 'react';
import Link from 'next/link';
import { Project } from '@/types/database';
import { ArrowUpRight, Code2, ExternalLink, Github, FolderGit2 } from 'lucide-react';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 bg-[#F8FAFC] border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wider text-blue-700">
              Selected Work
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]">
              FEATURED PROJECTS
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 group"
          >
            <span>View All Case Studies</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Empty State if no projects in Supabase */}
        {projects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0F172A]">No Featured Projects Published Yet</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Projects added and marked as featured in the Admin Dashboard will appear here dynamically.
            </p>
            <div className="pt-2">
              <Link
                href="/admin/projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#0F172A] hover:bg-blue-600 transition-colors shadow-sm"
              >
                Manage Projects in Admin
              </Link>
            </div>
          </div>
        ) : (
          /* Project Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                {/* Project Header / Screenshot area */}
                <div className="relative aspect-[16/9] w-full bg-slate-100 border-b border-slate-200/80 overflow-hidden flex items-center justify-center">
                  {project.screenshots && project.screenshots.length > 0 && project.screenshots[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.screenshots[0]}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    /* Clean professional empty state placeholder for project screenshot */
                    <div className="p-8 text-center space-y-2 flex flex-col items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-2 shadow-sm">
                        <Code2 className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                        {project.category}
                      </span>
                      <h4 className="text-base font-bold text-[#0F172A]">{project.title}</h4>
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md border border-slate-200 text-blue-700 shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group-hover:text-blue-600 transition-colors inline-block"
                    >
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
                        {project.title}
                        <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </h3>
                    </Link>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {project.short_summary}
                    </p>
                  </div>

                  {/* Tech stack badges */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-slate-50 border border-slate-200 text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies && project.technologies.length > 4 && (
                        <span className="px-2 py-1 rounded-lg text-[10px] text-slate-500 font-medium">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-500 hover:text-[#0F172A] rounded-xl hover:bg-slate-100 transition-colors"
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
                          className="p-2 text-slate-500 hover:text-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
