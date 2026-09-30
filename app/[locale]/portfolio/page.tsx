'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioItems } from '@/lib/mock-portfolio';
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
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  return (
    <div className={styles.portfolioPage}>
      <div className="container">
        <header className={styles.pageHeader}>
          <div className="badge">🪵 Галерея майстерні WoodEx</div>
          <h1 className={styles.title}>
            Портфоліо <span className="gradient-text">авторських робіт</span>
          </h1>
          <p className={styles.subtitle}>
            {locale === 'en'
              ? 'Unique handmade wooden creations crafted with passion, respect for nature and attention to every grain.'
              : 'Унікальні вироби з натурального дерева ручної роботи. Кожен предмет створений в єдиному екземплярі з душею та повагою до природи.'}
          </p>

          <div className={styles.filters}>
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`${styles.filterBtn} ${activeFilter === cat.value ? styles.activeFilter : ''}`}
              >
                {locale === 'en' ? cat.labelEn : cat.labelUk}
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
              onClick={() => setSelectedItem(item)}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={item.image}
                  alt={locale === 'en' ? item.titleEn : item.titleUk}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className={styles.woodBadge}>
                  🌲 {item.woodType}
                </div>
                <div className={styles.overlay}>
                  <div className={styles.overlayText}>
                    <p className={styles.overlayDesc}>
                      {locale === 'en' ? item.descEn : item.descUk}
                    </p>
                    <span className={styles.viewDetails}>
                      🔍 {locale === 'en' ? 'Quick view' : 'Детальний перегляд'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <span className={styles.categoryLabel}>
                    {categories.find(c => c.value === item.category)?.[locale === 'en' ? 'labelEn' : 'labelUk']}
                  </span>
                </div>
                <h2 className={styles.cardTitle}>
                  {locale === 'en' ? item.titleEn : item.titleUk}
                </h2>
                {item.dimensions && (
                  <p className={styles.cardDimensions}>
                    📐 {locale === 'en' ? `Size: ${item.dimensions}` : `Розмір: ${item.dimensions}`}
                  </p>
                )}
                <div className={styles.cardActions}>
                  <Link
                    href={`/${locale}/order`}
                    className="btn btn-primary btn-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    ✍️ {locale === 'en' ? 'Order similar' : 'Замовити схоже'}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal preview */}
        {selectedItem && (
          <div className={styles.modalBackdrop} onClick={() => setSelectedItem(null)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.closeBtn}
                onClick={() => setSelectedItem(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className={styles.modalImageWrapper}>
                <Image
                  src={selectedItem.image}
                  alt={locale === 'en' ? selectedItem.titleEn : selectedItem.titleUk}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.modalInfo}>
                <div className={styles.woodBadge}>🌲 {selectedItem.woodType}</div>
                {selectedItem.dimensions && (
                  <div className={styles.modalDimensions}>
                    📐 {locale === 'en' ? `Dimensions: ${selectedItem.dimensions}` : `Розміри: ${selectedItem.dimensions}`}
                  </div>
                )}
                <h2>{locale === 'en' ? selectedItem.titleEn : selectedItem.titleUk}</h2>
                <p className={styles.modalDesc}>
                  {locale === 'en' ? selectedItem.descEn : selectedItem.descUk}
                </p>
                <div className={styles.modalFooter}>
                  <Link
                    href={`/${locale}/order`}
                    className="btn btn-primary"
                    onClick={() => setSelectedItem(null)}
                  >
                    ✍️ {locale === 'en' ? 'Order custom piece' : 'Замовити індивідуальний виріб'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
