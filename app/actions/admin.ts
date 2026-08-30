'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { LeadStatus } from '@/types/database';

export async function updateLeadStatus(id: string, status: LeadStatus) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from('contact_messages')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    revalidatePath('/admin/leads');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update lead status';
    return { error: message };
  }
}

export async function deleteLead(id: string) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/admin/leads');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete lead';
    return { error: message };
  }
}

export async function saveProject(projectData: {
  id?: string;
  title: string;
  slug: string;
  category: string;
  short_summary: string;
  description: string;
  problem?: string;
  solution?: string;
  key_features?: string[];
  architecture?: string;
  technologies?: string[];
  screenshots?: string[];
  challenges?: string;
  outcome?: string;
  live_demo_url?: string | null;
  github_url?: string | null;
  featured: boolean;
  is_published: boolean;
  display_order: number;
}) {
  try {
    const supabase = createAdminClient();

    if (projectData.id) {
      // Update
      const { error } = await supabase
        .from('projects')
        .update({
          ...projectData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', projectData.id);
      if (error) throw error;
    } else {
      // Insert
      const { error } = await supabase.from('projects').insert([projectData]);
      if (error) throw error;
    }

    revalidatePath('/projects');
    revalidatePath(`/projects/${projectData.slug}`);
    revalidatePath('/admin/projects');
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save project';
    return { error: message };
  }
}

export async function deleteProject(id: string) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;

    revalidatePath('/projects');
    revalidatePath('/admin/projects');
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete project';
    return { error: message };
  }
}

export async function saveService(serviceData: {
  id?: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  description: string;
  features?: string[];
  technologies?: string[];
  icon?: string;
  display_order: number;
  is_published: boolean;
}) {
  try {
    const supabase = createAdminClient();

    if (serviceData.id) {
      const { error } = await supabase
        .from('services')
        .update({
          ...serviceData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', serviceData.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('services').insert([serviceData]);
      if (error) throw error;
    }

    revalidatePath('/services');
    revalidatePath('/admin/services');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save service';
    return { error: message };
  }
}

export async function deleteService(id: string) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) throw error;

    revalidatePath('/services');
    revalidatePath('/admin/services');
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete service';
    return { error: message };
  }
}

export async function saveTestimonial(data: {
  id?: string;
  client_name: string;
  client_role: string;
  client_company: string;
  client_avatar_url?: string | null;
  content: string;
  rating: number;
  is_published: boolean;
}) {
  try {
    const supabase = createAdminClient();
    if (data.id) {
      const { error } = await supabase.from('testimonials').update(data).eq('id', data.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('testimonials').insert([data]);
      if (error) throw error;
    }
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to save testimonial';
    return { error: message };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) throw error;
    revalidatePath('/');
    revalidatePath('/admin/testimonials');
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete testimonial';
    return { error: message };
  }
}
