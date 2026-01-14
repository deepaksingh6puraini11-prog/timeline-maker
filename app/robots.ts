import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/'], // In raaston par Google ko mat jane do
    },
    sitemap: 'https://aitimelinemaker.online/sitemap.xml', // ✅ Sitemap ka link
  }
}