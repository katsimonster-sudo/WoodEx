import Link from 'next/link';
import Image from 'next/image';
import { digitalProducts } from '@/lib/mock-digital';
import styles from './DigitalTeaser.module.css';

export default function DigitalTeaser() {
  const featured = digitalProducts.filter(d => d.featured).slice(0, 3);
  return (
    <section className={`section ${styles.section}`} id="digital">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Для майстрів ЧПК</span>
          <h2>Цифровий <span className="gradient-text">магазин</span></h2>
          <p className="section-desc">3D моделі та вектори SVG для ЧПК фрезерування та лазерного різання. Миттєве завантаження після оплати.</p>
        </div>
        <div className={styles.grid}>
          {featured.map(p => (
            <div key={p.id} className={`card ${styles.card}`}>
              <div className={styles.imgWrap}>
                <Image src={p.previewImage} alt={p.titleUk} fill style={{ objectFit: 'cover' }} sizes="350px" />
                <div className={styles.badge}>{p.category === 'models3d' ? '🧊 3D' : '✏️ SVG'}</div>
              </div>
              <div className={styles.body}>
                <h3 className={styles.title}>{p.titleUk}</h3>
                <p className={styles.desc}>{p.descUk}</p>
                <div className={styles.formats}>
                  {p.formats.map(f => <span key={f} className={styles.format}>{f}</span>)}
                </div>
                <div className={styles.footer}>
                  <span className={styles.price}>{p.price} ₴</span>
                  <Link href={`/uk/digital/${p.slug}`} className="btn btn-primary btn-sm">Купити</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <Link href="/uk/digital" className="btn btn-secondary">Переглянути всі файли →</Link>
        </div>
      </div>
    </section>
  );
}
