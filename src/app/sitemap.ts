import type { MetadataRoute } from 'next'
import { DOMAIN } from '../../config'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${DOMAIN}/home`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    }
  ]
}