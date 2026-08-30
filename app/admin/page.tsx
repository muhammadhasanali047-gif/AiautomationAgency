import React from 'react';
import { createAdminClient } from '@/lib/supabase/admin';
import Link from 'next/link';
import {
  Users,
  FolderGit2,
  Workflow,
  Quote,
  MessageSquare,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { ContactLead, ChatConversation } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  let totalLeadsCount = 0;
  let newLeadsCount = 0;
  let totalProjectsCount = 0;
  let totalServicesCount = 0;
  let totalTestimonialsCount = 0;
  let totalConversationsCount = 0;

  let recentLeads: ContactLead[] = [];
  let recentConversations: ChatConversation[] = [];

  try {
    const supabase = createAdminClient();

    // 1. Total Leads
    const { count: leadsCount, data: leadsData } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5);

    totalLeadsCount = leadsCount || 0;
    if (leadsData) recentLeads = leadsData;

    // 2. New Leads
    const { count: newCount } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new');

    newLeadsCount = newCount || 0;

    // 3. Projects Count
    const { count: projectsCount } = await supabase
      .from('projects')
      .select('*', { count: 'exact', head: true });

    totalProjectsCount = projectsCount || 0;

    // 4. Services Count
    const { count: servicesCount } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true });

    totalServicesCount = servicesCount || 0;

    // 5. Testimonials Count
    const { count: testimonialsCount } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true });

    totalTestimonialsCount = testimonialsCount || 0;

    // 6. Conversations Count
    const { count: convsCount, data: convsData } = await supabase
      .from('chat_conversations')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5);

    totalConversationsCount = convsCount || 0;
    if (convsData) recentConversations = convsData;
  } catch (err) {
    console.warn('Admin overview fetch fallback:', err);
  }

  const statCards = [
    {
      title: 'Total Inquiries',
      value: totalLeadsCount,
      sub: `${newLeadsCount} awaiting contact`,
      icon: Users,
      href: '/admin/leads',
    },
    {
      title: 'New Leads',
      value: newLeadsCount,
      sub: 'Action required',
      icon: Clock,
      href: '/admin/leads',
      highlight: newLeadsCount > 0,
    },
    {
      title: 'Active Projects',
      value: totalProjectsCount,
      sub: 'Published in portfolio',
      icon: FolderGit2,
      href: '/admin/projects',
    },
    {
      title: 'Services',
      value: totalServicesCount,
      sub: 'Offered solutions',
      icon: Workflow,
      href: '/admin/services',
    },
    {
      title: 'Testimonials',
      value: totalTestimonialsCount,
      sub: 'Verified client reviews',
      icon: Quote,
      href: '/admin/testimonials',
    },
    {
      title: 'AI Conversations',
      value: totalConversationsCount,
      sub: 'Visitor chat sessions',
      icon: MessageSquare,
      href: '/admin/conversations',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Real-time analytics and dynamic content management for NexaCore Automations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/projects"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
          >
            + New Project
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group shadow-sm ${
                card.highlight
                  ? 'bg-blue-50/80 border-blue-300 hover:border-blue-500'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight block">
                  {card.value}
                </span>
                <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{card.sub}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Tables Section: Recent Inquiries & AI Conversations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0F172A]">Recent Project Inquiries</h2>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-2xl">
              0 inquiries received yet. Submissions through the Contact form will appear here.
            </div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A]">{lead.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          lead.status === 'new'
                            ? 'bg-blue-100 text-blue-800'
                            : lead.status === 'contacted'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-slate-600">{lead.service} • {lead.budget}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {formatDate(lead.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent AI Assistant Conversations */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0F172A]">Recent AI Conversations</h2>
            <Link
              href="/admin/conversations"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentConversations.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 border border-dashed border-slate-200 rounded-2xl">
              0 AI assistant conversations recorded yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentConversations.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#0F172A]">
                      {c.title || 'Inquiry Session'}
                    </span>
                    <p className="text-slate-500 font-mono text-[10px]">{c.session_id}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {formatDate(c.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
