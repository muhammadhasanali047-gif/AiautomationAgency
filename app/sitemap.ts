import { MetadataRoute } from 'next';
import { createAdminClient } from '@/lib/supabase/admin';
import { INITIAL_PROJECTS } from '@/lib/data/initial-projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexacoreautomations.com';

  // Base routes
  const routes = ['', '/about', '/services', '/projects', '/skills', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
    })
  );

  // Project dynamic routes
  let projectRoutes: {
    url: string;
    lastModified: Date;
    changeFrequency: 'monthly';
    priority: number;
  }[] = [];

  try {
    const supabase = createAdminClient();
    const { data: projects } = await supabase
      .from('projects')
      .select('slug, updated_at')
      .eq('is_published', true);

    if (projects && projects.length > 0) {
      projectRoutes = projects.map((p) => ({
        url: `${baseUrl}/projects/${p.slug}`,
        lastModified: new Date(p.updated_at || Date.now()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    } else {
      projectRoutes = INITIAL_PROJECTS.map((p) => ({
        url: `${baseUrl}/projects/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    projectRoutes = INITIAL_PROJECTS.map((p) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  }

  return [...routes, ...projectRoutes];
}
