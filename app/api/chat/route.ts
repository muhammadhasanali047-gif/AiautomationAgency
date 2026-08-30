import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NEXACORE_MASTER_SYSTEM_PROMPT } from '@/lib/gemini/prompt';
import { generateGroundedResponse, detectNavigationIntent } from '@/lib/ai/assistant-engine';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const { message, sessionId, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const trimmed = message.trim();
    let replyText = '';
    let action: { type: 'navigate'; path: string; label: string } | undefined;

    // Check for direct navigation intent first
    const navCheck = detectNavigationIntent(trimmed);
    if (navCheck.isNav && navCheck.destination) {
      const grounded = generateGroundedResponse(trimmed, history);
      replyText = grounded.reply;
      action = grounded.action;
    } else {
      const apiKey = process.env.GEMINI_API_KEY;

      if (apiKey && apiKey.trim().length > 10) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: NEXACORE_MASTER_SYSTEM_PROMPT,
          });

          const contents = [];
          if (Array.isArray(history)) {
            for (const item of history.slice(-6)) {
              contents.push({
                role: item.role === 'user' ? 'user' : 'model',
                parts: [{ text: item.content }],
              });
            }
          }
          contents.push({
            role: 'user',
            parts: [{ text: trimmed }],
          });

          const result = await model.generateContent({ contents });
          const response = await result.response;
          const rawText = response.text().trim();

          // Check if Gemini outputted structured JSON with action
          if (rawText.startsWith('{') && rawText.endsWith('}')) {
            try {
              const parsed = JSON.parse(rawText);
              replyText = parsed.reply || rawText;
              if (parsed.action && parsed.action.type === 'navigate') {
                action = parsed.action;
              }
            } catch {
              replyText = rawText;
            }
          } else {
            replyText = rawText;
          }
        } catch (geminiErr) {
          console.warn('Gemini API call fallback to grounded engine:', geminiErr);
          const fallback = generateGroundedResponse(trimmed, history);
          replyText = fallback.reply;
          action = fallback.action;
        }
      } else {
        // High-precision grounded engine based on verified website knowledge
        const grounded = generateGroundedResponse(trimmed, history);
        replyText = grounded.reply;
        action = grounded.action;
      }
    }

    // Persist conversation and messages to Supabase if configured
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && sessionId) {
        const supabase = createAdminClient();

        let convId = '';
        const { data: conv } = await supabase
          .from('chat_conversations')
          .select('id')
          .eq('session_id', sessionId)
          .maybeSingle();

        if (conv) {
          convId = conv.id;
        } else {
          const { data: newConv } = await supabase
            .from('chat_conversations')
            .insert({
              session_id: sessionId,
              title: trimmed.slice(0, 50),
            })
            .select('id')
            .single();
          if (newConv) convId = newConv.id;
        }

        if (convId) {
          await supabase.from('chat_messages').insert([
            {
              conversation_id: convId,
              role: 'user',
              content: trimmed,
            },
            {
              conversation_id: convId,
              role: 'assistant',
              content: replyText,
            },
          ]);
        }
      }
    } catch (dbErr) {
      console.warn('Chat persistence warning:', dbErr);
    }

    return NextResponse.json({
      reply: replyText,
      action: action || null,
    });
  } catch (error) {
    console.error('Chat API Fatal Error:', error);
    return NextResponse.json(
      {
        reply:
          "Sorry, abhi response dene mein issue aa raha hai. Thori dair baad dobara try karein ya NexaCore team se contact karein.",
        action: null,
      },
      { status: 500 }
    );
  }
}
