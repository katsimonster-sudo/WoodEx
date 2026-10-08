import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/app/globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import BottomNav from '@/components/BottomNav/BottomNav';

export const metadata: Metadata = {
  title: { default: 'WoodEx — Вироби з дерева ручної роботи', template: '%s | WoodEx' },
  description: 'Авторська майстерня ексклюзивних виробів з дерева. Освітлення, різьблення, меблі, рустик, 3D моделі та вектори для ЧПК.',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
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
