import { MetadataRoute } from 'next';
import { products, categories } from '@/lib/mock-products';
import { digitalProducts } from '@/lib/mock-digital';

const baseUrl = 'https://woodex.store';
const locales = ['uk', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];
  const now = new Date();

  // Core static pages for each locale
  const staticPages = [
    '',
    '/catalog',
    '/portfolio',
    '/digital',
    '/about',
    '/contact',
    '/order',
  ];

  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page === '/catalog' || page === '/order' ? 0.9 : 0.8,
      });
    });
  });

  // Product categories
  locales.forEach((locale) => {
    categories.forEach((cat) => {
      routes.push({
        url: `${baseUrl}/${locale}/catalog/${cat.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  // Individual products
  locales.forEach((locale) => {
    products.forEach((prod) => {
      routes.push({
        url: `${baseUrl}/${locale}/catalog/${prod.category}/${prod.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.75,
      });
    });
  });

  // Digital CNC/3D items
  locales.forEach((locale) => {
    digitalProducts.forEach((item) => {
      routes.push({
        url: `${baseUrl}/${locale}/digital/${item.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.75,
      });
    });
  });

  return routes;
}
