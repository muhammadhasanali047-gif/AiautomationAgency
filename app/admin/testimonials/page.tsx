'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Testimonial } from '@/types/database';
import { saveTestimonial, deleteTestimonial } from '@/app/actions/admin';
import { Plus, Trash2, Star, Quote, Loader2, X } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Testimonial> | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setTestimonials(data);
      }
    } catch (e) {
      console.error('Error fetching testimonials:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingItem({
      client_name: '',
      client_role: '',
      client_company: '',
      client_avatar_url: '',
      content: '',
      rating: 5,
      is_published: true,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem?.client_name || !editingItem?.content) return;

    setActionLoading(true);
    const res = await saveTestimonial({
      id: editingItem.id,
      client_name: editingItem.client_name,
      client_role: editingItem.client_role || 'Founder',
      client_company: editingItem.client_company || '',
      client_avatar_url: editingItem.client_avatar_url || null,
      content: editingItem.content,
      rating: Number(editingItem.rating) || 5,
      is_published: Boolean(editingItem.is_published),
    });

    if (res.success) {
      setModalOpen(false);
      fetchTestimonials();
    } else {
      alert(res.error || 'Failed to save testimonial');
    }
    setActionLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    setActionLoading(true);
    const res = await deleteTestimonial(id);
    if (res.success) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    }
    setActionLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Client Testimonials
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Manage genuine client reviews and endorsements. Unverified reviews should never be published.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-xs text-slate-500">Loading reviews from Supabase...</span>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-16 text-center space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
            <Quote className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A]">0 Testimonials in Database</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            In compliance with our anti-fake data policy, zero synthetic testimonials are present. Once verified clients submit feedback, add them here to display on the public website.
          </p>
          <button
            onClick={openCreateModal}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            Add First Review
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      t.is_published ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {t.is_published ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">{t.client_name}</h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {t.client_role} {t.client_company ? `• ${t.client_company}` : ''}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">Add Verified Testimonial</h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Client Name *</label>
                <input
                  type="text"
                  required
                  value={editingItem.client_name || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, client_name: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Role / Title</label>
                  <input
                    type="text"
                    value={editingItem.client_role || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, client_role: e.target.value })
                    }
                    placeholder="e.g. Founder & CTO"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#0F172A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Company</label>
                  <input
                    type="text"
                    value={editingItem.client_company || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, client_company: e.target.value })
                    }
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Rating (1 to 5)</label>
                <select
                  value={editingItem.rating || 5}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, rating: parseInt(e.target.value) })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#0F172A] font-medium"
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Review Content *</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.content || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, content: e.target.value })
                  }
                  placeholder="Feedback quote from client..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[#0F172A]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={Boolean(editingItem.is_published)}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, is_published: e.target.checked })
                    }
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Publish to Homepage</span>
                </label>
              </div>

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
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
