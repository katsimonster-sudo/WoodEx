'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioItems } from '@/lib/mock-portfolio';
import styles from './Portfolio.module.css';

const filters = [
  { value: 'all', label: 'Всі' },
  { value: 'lighting', label: 'Освітлення' },
  { value: 'carving', label: 'Різьблення' },
  { value: 'rustic', label: 'Рустик' },
  { value: 'furniture', label: 'Меблі' },
];

export default function Portfolio() {
  const [active, setActive] = useState('all');
  const items = active === 'all' ? portfolioItems : portfolioItems.filter(i => i.category === active);

  return (
    <section className={`section ${styles.portfolio}`} id="portfolio">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Портфоліо</span>
          <h2>Наші <span className="gradient-text">роботи</span></h2>
          <p className="section-desc">Кожен виріб — унікальна історія дерева та майстерності. Замовте схоже або обговоріть вашу ідею.</p>
        </div>
        <div className={styles.filters}>
          {filters.map(f => (
            <button key={f.value} className={`${styles.filterBtn} ${active === f.value ? styles.filterActive : ''}`} onClick={() => setActive(f.value)}>{f.label}</button>
          ))}
        </div>
        <div className={styles.grid}>
          {items.map((item, i) => (
            <div key={item.id} className={`${styles.item} ${i === 0 ? styles.featured : ''}`}>
              <div className={styles.imgWrap}>
                <Image src={item.image} alt={item.titleUk} fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 50vw" />
                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <span className={styles.woodType}>🌲 {item.woodType}</span>
                    <h3>{item.titleUk}</h3>
                    <p>{item.descUk}</p>
                    <Link href={`/uk/order`} className="btn btn-primary btn-sm">Замовити схоже</Link>
                  </div>
                </div>
              </div>
              <div className={styles.info}>
                <span className={styles.cat}>{filters.find(f => f.value === item.category)?.label}</span>
                <h3 className={styles.title}>{item.titleUk}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
