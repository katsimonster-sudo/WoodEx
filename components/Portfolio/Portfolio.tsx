'use client';
import { useState } from 'react';
import Image from 'next/image';
import { portfolioItems } from '@/lib/mock-portfolio';
import LightboxViewer, { type LightboxItem } from '@/components/LightboxViewer/LightboxViewer';
import styles from './Portfolio.module.css';

const filters = [
  { value: 'all', label: 'Всі роботи' },
  { value: 'furniture', label: 'Меблі & Столи' },
  { value: 'carving', label: 'Різьблення & Панно' },
  { value: 'rustic', label: 'Рустик & Сляби' },
  { value: 'lighting', label: 'Освітлення' },
];

export default function Portfolio() {
  const [active, setActive] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const items = active === 'all' ? portfolioItems : portfolioItems.filter(i => i.category === active);

  const lightboxItems: LightboxItem[] = items.map(item => ({
    id: item.id,
    image: item.image,
    title: item.titleUk,
    description: item.descUk,
    woodType: item.woodType,
    dimensions: item.dimensions,
    orderUrl: '#order',
  }));

  return (
    <section className={`section ${styles.portfolio}`} id="portfolio">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            <span>🪵</span> Авторська колекція
          </span>
          <h2>
            Галерея <span className="gradient-text">виконаних робіт</span>
          </h2>
          <p className="section-desc">
            Кожен виріб створено в єдиному екземплярі з відбірного масиву. Натисніть на роботу для детального перегляду та масштабування.
          </p>
        </div>

        <div className={styles.filters}>
          {filters.map(f => (
            <button
              key={f.value}
              type="button"
              className={`${styles.filterBtn} ${active === f.value ? styles.filterActive : ''}`}
              onClick={() => setActive(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`${styles.item} ${i === 0 ? styles.featured : ''}`}
              onClick={() => setLightboxIdx(i)}
              role="button"
              tabIndex={0}
              aria-label={`Відкрити та наблизити ${item.titleUk}`}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxIdx(i);
                }
              }}
            >
              <div className={styles.imgWrap}>
                {/* Ambient blur backdrop - prevents harsh borders and adds organic warmth */}
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
                  alt={item.titleUk}
                  fill
                  className={styles.mainImg}
                  sizes="(max-width:768px) 100vw, 50vw"
                  priority={i < 2}
                />

                {/* Zoom badge indicator */}
                <span className={styles.zoomBadge}>
                  🔍 Зум
                </span>

                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <span className={styles.woodBadge}>🌲 {item.woodType}</span>
                    <h3>{item.titleUk}</h3>
                    <p>{item.descUk}</p>
                    <span className="btn btn-primary btn-sm" style={{ pointerEvents: 'none' }}>
                      🔍 Відкрити & наблизити
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.infoTop}>
                  <span className={styles.cat}>
                    {filters.find(f => f.value === item.category)?.label || 'Авторський виріб'}
                  </span>
                  {item.dimensions && <span className={styles.dim}>📐 {item.dimensions}</span>}
                </div>
                <h3 className={styles.title}>{item.titleUk}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Zoomable Lightbox */}
      {lightboxIdx !== null && (
        <LightboxViewer
          items={lightboxItems}
          currentIndex={lightboxIdx}
          isOpen={lightboxIdx !== null}
          onClose={() => setLightboxIdx(null)}
          onNavigate={newIdx => setLightboxIdx(newIdx)}
          locale="uk"
        />
      )}
    </section>
  );
}
