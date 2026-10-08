import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/account/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'ClaudeBot', 'AnthropicAI', 'Applebot-Extended'],
        allow: '/',
      },
    ],
    sitemap: 'https://woodex.store/sitemap.xml',
    host: 'https://woodex.store',
  };
}
