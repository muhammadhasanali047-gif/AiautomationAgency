import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import BrandMark from '@/components/brand/BrandMark';

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-4 py-24 text-center bg-white nexa-mesh-bg overflow-hidden">
      {/* Subtle Background Grid & Glows */}
      <div className="absolute inset-0 nexa-grid-pattern pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-md space-y-6">
        <div className="flex justify-center">
          <BrandMark size={56} />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-sm uppercase tracking-widest text-blue-600 font-bold">
            404 • Page Not Found
          </span>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            System Route Does Not Exist
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            The page or project case study you requested could not be located or may have been updated.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
