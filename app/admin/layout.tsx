'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FolderGit2,
  Workflow,
  Quote,
  MessageSquare,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import BrandMark from '@/components/brand/BrandMark';

const adminNav = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Leads & Inquiries', href: '/admin/leads', icon: Users },
  { name: 'Projects', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Services', href: '/admin/services', icon: Workflow },
  { name: 'Testimonials', href: '/admin/testimonials', icon: Quote },
  { name: 'AI Conversations', href: '/admin/conversations', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <BrandMark size={32} />
              <div>
                <span className="text-base font-extrabold tracking-tight text-[#0F172A] block leading-none">
                  NEXA<span className="text-blue-600">CORE</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block mt-1">
                  Admin Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation links */}
          <nav className="p-4 space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0F172A] hover:bg-slate-50 transition-colors"
          >
            <span>Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
