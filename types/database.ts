export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed';

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  description: string;
  features: string[];
  technologies: string[];
  icon: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_summary: string;
  description: string;
  problem: string;
  solution: string;
  key_features: string[];
  architecture?: string;
  technologies: string[];
  screenshots: string[];
  challenges?: string;
  outcome?: string;
  live_demo_url?: string | null;
  github_url?: string | null;
  featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  client_company: string;
  client_avatar_url?: string | null;
  content: string;
  rating: number;
  is_published: boolean;
  created_at: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  service: string;
  budget: string;
  message: string;
  status: LeadStatus;
  ip_address?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatConversation {
  id: string;
  session_id: string;
  title?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

export interface Profile {
  id: string;
  role: string;
  full_name: string;
  updated_at: string;
}
