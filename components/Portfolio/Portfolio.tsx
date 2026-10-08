'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioItems } from '@/lib/mock-portfolio';
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
  const items = active === 'all' ? portfolioItems : portfolioItems.filter(i => i.category === active);

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
            Кожен виріб створено в єдиному екземплярі з відбірного масиву. Оберіть роботу для натхнення та замовте індивідуальне виконання під ваші розміри.
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
            <div key={item.id} className={`${styles.item} ${i === 0 ? styles.featured : ''}`}>
              <div className={styles.imgWrap}>
                <Image
                  src={item.image}
                  alt={item.titleUk}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <span className={styles.woodBadge}>🌲 {item.woodType}</span>
                    <h3>{item.titleUk}</h3>
                    <p>{item.descUk}</p>
                    <a href="#order" className="btn btn-primary btn-sm">
                      ✨ Замовити схожий виріб
                    </a>
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
    </section>
  );
}
