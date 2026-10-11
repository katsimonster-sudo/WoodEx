'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioItems } from '@/lib/mock-portfolio';
import LightboxViewer, { type LightboxItem } from '@/components/LightboxViewer/LightboxViewer';
import styles from './portfolio.module.css';

const categories = [
  { value: 'all', labelUk: 'Всі роботи', labelEn: 'All Works' },
  { value: 'lighting', labelUk: '💡 Освітлення', labelEn: '💡 Lighting' },
  { value: 'carving', labelUk: '🪵 Різьблення', labelEn: '🪵 Carving' },
  { value: 'rustic', labelUk: '🌲 Рустик', labelEn: '🌲 Rustic' },
  { value: 'furniture', labelUk: '🪑 Меблі', labelEn: '🪑 Furniture' },
];

export default function PortfolioPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'uk';
  const isEn = locale === 'en';
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  const lightboxItems: LightboxItem[] = filteredItems.map(item => ({
    id: item.id,
    image: item.image,
    title: isEn ? item.titleEn : item.titleUk,
    description: isEn ? item.descEn : item.descUk,
    woodType: item.woodType,
    dimensions: item.dimensions,
    orderUrl: `/${locale}/order`,
  }));

  return (
    <div className={styles.portfolioPage}>
      <div className="container">
        <header className={styles.pageHeader}>
          <div className="badge">🪵 Галерея майстерні WoodEx</div>
          <h1 className={styles.title}>
            Портфоліо <span className="gradient-text">авторських робіт</span>
          </h1>
          <p className={styles.subtitle}>
            {isEn
              ? 'Unique handmade wooden creations crafted with passion, respect for nature and attention to every grain. Click any piece to inspect with zoom.'
              : 'Унікальні вироби з натурального дерева ручної роботи. Натисніть на будь-яку картку, щоб розглянути різьблення та фактуру з наближенням.'}
          </p>

          <div className={styles.filters}>
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`${styles.filterBtn} ${activeFilter === cat.value ? styles.activeFilter : ''}`}
              >
                {isEn ? cat.labelEn : cat.labelUk}
                <span className={styles.count}>
                  {cat.value === 'all'
                    ? portfolioItems.length
                    : portfolioItems.filter(i => i.category === cat.value).length}
                </span>
              </button>
            ))}
          </div>
        </header>

        <div className={styles.grid}>
          {filteredItems.map((item, idx) => (
            <article
              key={item.id}
              className={`${styles.card} ${idx % 3 === 0 ? styles.featured : ''}`}
              onClick={() => setLightboxIdx(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxIdx(idx);
                }
              }}
            >
              <div className={styles.imageContainer}>
                {/* Ambient blur backdrop */}
                <Image
                  src={item.image}
                  alt=""
                  fill
                  aria-hidden="true"
                  className={styles.blurBg}
                  sizes="350px"
                />

                {/* Main uncropped centered image */}
                <Image
                  src={item.image}
                  alt={isEn ? item.titleEn : item.titleUk}
                  fill
                  className={styles.mainImg}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={idx < 2}
                />

                <div className={styles.woodBadge}>
                  🌲 {item.woodType}
                </div>

                <div className={styles.overlay}>
                  <div className={styles.overlayText}>
                    <p className={styles.overlayDesc}>
                      {isEn ? item.descEn : item.descUk}
                    </p>
                    <span className={styles.viewDetails}>
                      🔍 {isEn ? 'Click to zoom & inspect' : 'Відкрити з наближенням'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.categoryLabel}>
                    {categories.find(c => c.value === item.category)?.[isEn ? 'labelEn' : 'labelUk']}
                  </span>
                </div>
                <h2 className={styles.cardTitle}>
                  {isEn ? item.titleEn : item.titleUk}
                </h2>
                {item.dimensions && (
                  <p className={styles.cardDimensions}>
                    📐 {isEn ? `Size: ${item.dimensions}` : `Розмір: ${item.dimensions}`}
                  </p>
                )}
                <div className={styles.cardActions}>
                  <Link
                    href={`/${locale}/order`}
                    className="btn btn-primary btn-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ✍️ {isEn ? 'Order similar' : 'Замовити схоже'}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Fullscreen Zoomable Lightbox */}
        {lightboxIdx !== null && (
          <LightboxViewer
            items={lightboxItems}
            currentIndex={lightboxIdx}
            isOpen={lightboxIdx !== null}
            onClose={() => setLightboxIdx(null)}
            onNavigate={newIdx => setLightboxIdx(newIdx)}
            locale={locale}
          />
        )}
      </div>
    </div>
  );
}
