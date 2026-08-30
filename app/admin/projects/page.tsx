'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Project } from '@/types/database';
import { saveProject, deleteProject } from '@/app/actions/admin';
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X,
  FolderGit2,
} from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [techInput, setTechInput] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data) {
        setProjects(data);
      }
    } catch (e) {
      console.error('Error fetching projects:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject({
      title: '',
      slug: '',
      category: 'AI Automation',
      short_summary: '',
      description: '',
      problem: '',
      solution: '',
      key_features: [],
      architecture: '',
      technologies: [],
      screenshots: [],
      challenges: '',
      outcome: '',
      live_demo_url: '',
      github_url: '',
      featured: false,
      is_published: true,
      display_order: projects.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.slug) return;

    setActionLoading(true);
    const res = await saveProject({
      id: editingProject.id,
      title: editingProject.title,
      slug: editingProject.slug,
      category: editingProject.category || 'AI Automation',
      short_summary: editingProject.short_summary || '',
      description: editingProject.description || '',
      problem: editingProject.problem || '',
      solution: editingProject.solution || '',
      key_features: editingProject.key_features || [],
      architecture: editingProject.architecture || '',
      technologies: editingProject.technologies || [],
      screenshots: editingProject.screenshots || [],
      challenges: editingProject.challenges || '',
      outcome: editingProject.outcome || '',
      live_demo_url: editingProject.live_demo_url || null,
      github_url: editingProject.github_url || null,
      featured: Boolean(editingProject.featured),
      is_published: Boolean(editingProject.is_published),
      display_order: Number(editingProject.display_order) || 1,
    });

    if (res.success) {
      setModalOpen(false);
      fetchProjects();
    } else {
      alert(res.error || 'Failed to save project');
    }
    setActionLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setActionLoading(true);
    const res = await deleteProject(id);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
    setActionLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Project & Case Study Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Create, edit, feature, and publish your production systems and technical case studies.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-xs text-slate-500">Loading projects from Supabase...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-16 text-center space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A]">0 Projects in Database</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            No custom projects have been added yet. Click the button below to add your first case study.
          </p>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            Create First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-blue-600 font-bold">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {proj.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        FEATURED
                      </span>
                    )}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        proj.is_published
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {proj.is_published ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A] tracking-tight">{proj.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {proj.short_summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-slate-50 text-slate-700 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  Slug: /{proj.slug}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
                    title="Edit Project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Project Modal */}
      {modalOpen && editingProject && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">
                {editingProject.id ? 'Edit Project' : 'Create New Project'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Configure details, architecture breakdown, and display settings.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setEditingProject({
                        ...editingProject,
                        title,
                        slug: editingProject.id ? editingProject.slug : slug,
                      });
                    }}
                    placeholder="e.g. AI Knowledge RAG Bot"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0F172A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, slug: e.target.value })
                    }
                    placeholder="ai-knowledge-rag-bot"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Category</label>
                  <input
                    type="text"
                    value={editingProject.category || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value })
                    }
                    placeholder="e.g. RAG & Knowledge AI"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0F172A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Display Order</label>
                  <input
                    type="number"
                    value={editingProject.display_order ?? 1}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        display_order: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.short_summary || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, short_summary: e.target.value })
                  }
                  placeholder="Concise 1-2 sentence executive summary..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#0F172A]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  placeholder="Detailed architectural and functional overview..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">The Problem</label>
                  <textarea
                    rows={2}
                    value={editingProject.problem || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, problem: e.target.value })
                    }
                    placeholder="Operational bottleneck solved..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#0F172A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">The Solution</label>
                  <textarea
                    rows={2}
                    value={editingProject.solution || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, solution: e.target.value })
                    }
                    placeholder="Engineering solution deployed..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#0F172A]"
                  />
                </div>
              </div>

              {/* Technologies input */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Technologies (Press Enter to add)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && techInput.trim()) {
                        e.preventDefault();
                        const existing = editingProject.technologies || [];
                        if (!existing.includes(techInput.trim())) {
                          setEditingProject({
                            ...editingProject,
                            technologies: [...existing, techInput.trim()],
                          });
                        }
                        setTechInput('');
                      }
                    }}
                    placeholder="e.g. Next.js 14, Supabase, Gemini"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#0F172A]"
                  />
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {editingProject.technologies?.map((tech) => (
                    <span
                      key={tech}
                      onClick={() =>
                        setEditingProject({
                          ...editingProject,
                          technologies: editingProject.technologies?.filter((t) => t !== tech),
                        })
                      }
                      className="cursor-pointer px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-medium hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors"
                      title="Click to remove"
                    >
                      {tech} ✕
                    </span>
                  ))}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProject.featured)}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, featured: e.target.checked })
                    }
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Show in Featured Projects</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProject.is_published)}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, is_published: e.target.checked })
                    }
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Published Live</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:text-[#0F172A] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 flex items-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Project</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
