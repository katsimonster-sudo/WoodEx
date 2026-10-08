import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/app/globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import BottomNav from '@/components/BottomNav/BottomNav';

export const metadata: Metadata = {
  metadataBase: new URL('https://woodex.store'),
  title: {
    default: 'WoodEx — Авторські меблі та вироби з масиву дерева | Київ',
    template: '%s | WoodEx Майстерня',
  },
  description:
    'Авторська майстерня ексклюзивних виробів з натурального дерева в Києві. Столи з живим краєм, освітлення, 3D різьблення, цифровий магазин STL/DXF для ЧПК. Індивідуальне замовлення.',
  keywords: [
    'вироби з дерева',
    'столи з масиву',
    'стіл сляб',
    'live edge Київ',
    'дерев’яні люстри',
    'різьблення по дереву',
    '3D моделі для ЧПК',
    'меблі на замовлення Київ',
    'WoodEx',
    'пан Андрій меблі',
  ],
  authors: [{ name: 'WoodEx Workshop / пан Андрій', url: 'https://woodex.store' }],
  creator: 'WoodEx',
  publisher: 'WoodEx',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://woodex.store/uk',
    languages: {
      'uk-UA': 'https://woodex.store/uk',
      'en-US': 'https://woodex.store/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    alternateLocale: 'en_US',
    url: 'https://woodex.store',
    siteName: 'WoodEx — Авторська майстерня дерева',
    title: 'WoodEx — Ексклюзивні вироби з дерева ручної роботи',
    description:
      'Виробництво авторських столів зі слябів, освітлення, панно та цифрових 3D моделей у Києві. Контактна особа: пан Андрій.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'WoodEx Workshop — авторські вироби з дерева',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WoodEx — Авторські вироби з дерева ручної роботи',
    description: 'Майстерня авторських меблів та 3D/ЧПК файлів. Київ, Україна.',
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  // JSON-LD Structured Data Schema for LocalBusiness and Organization
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'WoodEx — Авторська майстерня дерева',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
    url: 'https://woodex.store',
    telephone: '+380979112973',
    priceRange: '₴₴₴',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Київ',
      addressCountry: 'UA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.4501,
      longitude: 30.5234,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+380979112973',
      contactType: 'sales and customer service',
      contactOption: 'TollFree',
      areaServed: ['UA', 'EU', 'US'],
      availableLanguage: ['Ukrainian', 'English'],
    },
    founder: {
      '@type': 'Person',
      name: 'пан Андрій',
    },
    sameAs: [
      'https://t.me/+380979112973',
      'https://woodex.store',
    ],
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 350px)', paddingTop: '68px', paddingBottom: '60px' }}>
            {children}
          </main>
          <Footer />
          <BottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
