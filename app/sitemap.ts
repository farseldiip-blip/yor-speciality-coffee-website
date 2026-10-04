import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://yor-coffee.vercel.app', lastModified: new Date() }, { url: 'https://yor-coffee.vercel.app/menu', lastModified: new Date() }]
}
