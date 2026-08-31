import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import FloatingAssistant from '@/components/ai-assistant/FloatingAssistant';
import CustomCursor from '@/components/ui/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'NexaCore Automations | AI Automation & Full-Stack Development',
    template: '%s | NexaCore Automations',
  },
  description:
    'NexaCore Automations builds AI-powered automation systems, intelligent chatbots, modern web applications, WhatsApp bots, and scalable enterprise digital products. Automate. Innovate. Elevate.',
  keywords: [
    'NexaCore Automations',
    'AI Automation Agency',
    'Full-Stack Development',
    'AI Agents',
    'AI Chatbots',
    'WhatsApp Automation',
    'Next.js Development',
    'Supabase',
    'Enterprise Automation',
    'RAG Systems',
  ],
  authors: [{ name: 'NexaCore Automations' }],
  creator: 'NexaCore Automations',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'NexaCore Automations',
    title: 'NexaCore Automations | AI Automation & Full-Stack Development',
    description:
      'Automate Smarter. Build Better. Scale Faster. Enterprise AI automation, intelligent chatbots, and modern full-stack web platforms.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexaCore Automations | AI Automation & Full-Stack Development',
    description:
      'Automate Smarter. Build Better. Scale Faster. Enterprise AI automation, intelligent chatbots, and modern full-stack web platforms.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`}>
      <body
        className="font-sans bg-slate-50 text-[#0F172A] min-h-screen flex flex-col antialiased selection:bg-blue-600/15 selection:text-blue-700 relative"
      >
        {/* Global Ambient Colorful Background */}
        <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden bg-slate-50">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-400/10 blur-[120px]" />
          <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-purple-400/10 blur-[100px]" />
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a08_1px,transparent_1px),linear-gradient(to_bottom,#0f172a08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <FloatingAssistant />
        <CustomCursor />
      </body>
    </html>
  );
}
