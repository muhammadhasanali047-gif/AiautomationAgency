'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  ArrowUpRight,
  Loader2,
  Navigation,
} from 'lucide-react';
import Link from 'next/link';
import BrandMark from '@/components/brand/BrandMark';

interface AssistantAction {
  type: 'navigate';
  path: string;
  label: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  action?: AssistantAction;
}

const suggestedPrompts = [
  'What services does NexaCore offer?',
  'Can you build a WhatsApp chatbot?',
  'Who are the team members?',
  'What is your development process?',
];

export default function FloatingAssistant() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        "Hello! Welcome to NexaCore Automations. I'm your AI Assistant. I can answer questions about our AI automation workflows, WhatsApp chatbots, email marketing, full-stack software, projects, and team. You can also ask me to navigate the website for you. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or retrieve session ID
  useEffect(() => {
    let sid = localStorage.getItem('nexacore_assistant_session');
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('nexacore_assistant_session', sid);
    }
    setSessionId(sid);
  }, []);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: 'user_' + Date.now(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          sessionId: sessionId || 'default_session',
          history: messages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: Message = {
        id: 'bot_' + Date.now(),
        role: 'assistant',
        content:
          data.reply ||
          "I apologize, but I couldn't process that response right now. Please feel free to contact our team directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: data.action || undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Execute website navigation action if requested
      if (data.action && data.action.type === 'navigate' && data.action.path) {
        setTimeout(() => {
          router.push(data.action.path);
        }, 400);
      }
    } catch (err: unknown) {
      const errorMessage: Message = {
        id: 'err_' + Date.now(),
        role: 'assistant',
        content:
          "Sorry, abhi response dene mein issue aa raha hai. Thori dair baad dobara try karein ya NexaCore team se contact karein.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content:
          "Conversation cleared. How can I assist you with NexaCore's AI automation, WhatsApp chatbots, email marketing, or full-stack software?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button with Brand Gradient */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 border border-white/20 transition-all duration-300"
            aria-label="Open NexaCore AI Assistant"
          >
            <div className="relative">
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-blue-600 animate-pulse" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Assistant Window (White-First Design) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[92vw] sm:w-[420px] h-[590px] max-h-[85vh] bg-white border border-slate-200/90 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header: Deep Navy with Logo & Status */}
            <div className="px-5 py-4 bg-[#0F172A] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center p-1">
                  <BrandMark size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold tracking-tight">NexaCore AI Assistant</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-slate-300 font-medium">Automate • Innovate • Elevate</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  title="Clear conversation"
                  className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex-shrink-0 flex items-center justify-center mt-0.5 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none shadow-sm'
                        : 'bg-white border border-slate-200 text-[#0F172A] rounded-bl-none shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    {/* Navigation Action Feedback Chip */}
                    {msg.action && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-semibold text-blue-600 flex items-center gap-1">
                          <Navigation className="w-3 h-3 text-blue-600" />
                          <span>Navigating to {msg.action.label}</span>
                        </span>
                        <Link
                          href={msg.action.path}
                          onClick={() => setIsOpen(false)}
                          className="text-[11px] font-medium text-slate-500 hover:text-blue-700 underline flex items-center gap-0.5"
                        >
                          <span>Open</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}

                    <div
                      className={`text-[10px] mt-1.5 text-right ${
                        msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex-shrink-0 flex items-center justify-center mt-0.5 shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 pt-1 bg-white border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  Suggested queries:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="text-[11px] bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 px-3 py-1 rounded-full transition-colors text-left font-medium"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Direct Project Inquiry Banner */}
            <div className="px-4 py-2 bg-blue-50/80 border-t border-blue-100 flex items-center justify-between text-xs">
              <span className="text-slate-700 font-medium">Ready to build your solution?</span>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about AI, automation, or custom systems..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-600/20"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
