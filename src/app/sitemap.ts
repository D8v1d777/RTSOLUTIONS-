import type { MetadataRoute } from 'next';
import { config } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || config.url;

  return [
    {
      url: new URL('/', siteUrl).toString(),
      priority: 1,
    },
  ];
}
