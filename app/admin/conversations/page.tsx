'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ChatConversation, ChatMessage } from '@/types/database';
import { MessageSquare, Bot, User, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminConversationsPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('chat_conversations')
          .select('*')
          .order('created_at', { ascending: false });

        if (data) {
          setConversations(data);
          if (data.length > 0) {
            setSelectedConv(data[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load conversations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    if (!selectedConv) return;
    const fetchMessages = async () => {
      setMessagesLoading(true);
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('conversation_id', selectedConv.id)
          .order('created_at', { ascending: true });

        if (data) setMessages(data);
      } catch (err) {
        console.error('Failed to load messages:', err);
      } finally {
        setMessagesLoading(false);
      }
    };
    fetchMessages();
  }, [selectedConv]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          AI Assistant Chat Logs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          Review real visitor interactions, questions, and inquiries handled by the NexaCore AI Assistant.
        </p>
      </div>

      {/* Main Split Layout */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-xs text-slate-500">Loading AI conversations...</span>
        </div>
      ) : conversations.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-16 text-center space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A]">0 AI Conversations Logged</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            As visitors interact with the floating NexaCore AI Assistant on the public website, sessions and queries will be recorded here for inspection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Conversation List */}
          <div className="md:col-span-4 rounded-3xl bg-white border border-slate-200 p-4 space-y-2 max-h-[70vh] overflow-y-auto shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 block mb-2">
              Visitor Sessions ({conversations.length})
            </span>

            {conversations.map((c) => {
              const isSelected = selectedConv?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedConv(c)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all text-xs space-y-1 ${
                    isSelected
                      ? 'bg-blue-50 border border-blue-200 text-blue-900 shadow-sm'
                      : 'bg-slate-50 border border-slate-100 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <p className="font-bold line-clamp-1">
                    {c.title || 'Inquiry Session'}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{c.session_id.substring(0, 14)}...</span>
                    <span>{formatDate(c.created_at)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conversation Transcript */}
          <div className="md:col-span-8 rounded-3xl bg-white border border-slate-200 p-6 flex flex-col h-[70vh] shadow-sm">
            <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  {selectedConv?.title || 'Session Details'}
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  Session ID: {selectedConv?.session_id}
                </p>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {selectedConv ? formatDate(selectedConv.created_at) : ''}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs">
              {messagesLoading ? (
                <div className="py-12 text-center text-slate-500">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-blue-600" />
                  Loading transcript...
                </div>
              ) : messages.length === 0 ? (
                <div className="py-12 text-center text-slate-400 font-medium">
                  No individual messages recorded in this conversation.
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl ${
                        m.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                          : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                      <span
                        className={`text-[9px] block mt-1.5 text-right font-medium ${
                          m.role === 'user' ? 'text-blue-100' : 'text-slate-400'
                        }`}
                      >
                        {formatDate(m.created_at)}
                      </span>
                    </div>
                    {m.role === 'user' && (
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
