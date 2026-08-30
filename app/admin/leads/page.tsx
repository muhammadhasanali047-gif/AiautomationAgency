'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ContactLead, LeadStatus } from '@/types/database';
import { updateLeadStatus, deleteLead } from '@/app/actions/admin';
import {
  Search,
  Filter,
  Trash2,
  Loader2,
  X,
  ExternalLink,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

const STATUS_OPTIONS: LeadStatus[] = ['new', 'contacted', 'in_progress', 'converted', 'closed'];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setLeads(data);
      }
    } catch (e) {
      console.error('Error fetching leads:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    setActionLoading(true);
    const res = await updateLeadStatus(id, newStatus);
    if (res.success) {
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
      if (selectedLead?.id === id) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    }
    setActionLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry record?')) return;
    setActionLoading(true);
    const res = await deleteLead(id);
    if (res.success) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) setSelectedLead(null);
    }
    setActionLoading(false);
  };

  // Filtered leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.company && l.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      l.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Lead & Inquiry Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Review incoming project inquiries, update engagement statuses, and manage client communications.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-blue-600 shadow-sm font-medium"
          >
            <option value="all">All Statuses ({leads.length})</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table / List */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-xs text-slate-500">Loading leads from Supabase...</span>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center text-xs text-slate-500 shadow-sm">
          No inquiries found matching the active filters.
        </div>
      ) : (
        <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-4 px-5">Contact</th>
                  <th className="py-4 px-5">Service & Budget</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">Date</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#0F172A]">{lead.name}</div>
                      <div className="text-slate-500 text-[11px]">{lead.email}</div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#0F172A]">{lead.service}</div>
                      <div className="text-slate-500 text-[11px]">{lead.budget}</div>
                    </td>
                    <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] font-bold text-[#0F172A] focus:outline-none focus:border-blue-600"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 px-5 text-slate-500 text-[11px]">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">
                Inquiry Details
              </span>
              <h2 className="text-xl font-bold text-[#0F172A] mt-1">{selectedLead.name}</h2>
              <a
                href={`mailto:${selectedLead.email}`}
                className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 mt-0.5 font-medium"
              >
                <span>{selectedLead.email}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Company:</span>
                <span className="font-bold text-[#0F172A]">
                  {selectedLead.company || 'Individual'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Service:</span>
                <span className="font-bold text-[#0F172A]">{selectedLead.service}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Budget:</span>
                <span className="font-bold text-[#0F172A]">{selectedLead.budget}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Submitted On:</span>
                <span className="font-bold text-[#0F172A]">
                  {formatDate(selectedLead.created_at)}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Project Scope / Message:
              </span>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                {selectedLead.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <select
                value={selectedLead.status}
                onChange={(e) =>
                  handleStatusChange(selectedLead.id, e.target.value as LeadStatus)
                }
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#0F172A]"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    Status: {s.toUpperCase()}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
