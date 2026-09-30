import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { digitalProducts } from '@/lib/mock-digital';

export const metadata: Metadata = { title: 'Цифровий магазин', description: '3D моделі та SVG вектори для ЧПК фрезерування та лазерного різання. WoodEx Digital.' };

export default function DigitalPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Для майстрів ЧПК</span>
          <h1>Цифровий <span className="gradient-text">магазин</span></h1>
          <p className="section-desc">3D моделі та SVG вектори для ЧПК фрезерування та лазерного різання. Миттєве завантаження після оплати.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
          {[['all', '🗂️ Всі'], ['models3d', '🧊 3D Моделі'], ['vectors', '✏️ Вектори']].map(([val, label]) => (
            <button key={val} style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.93rem', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>{label}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {digitalProducts.map(p => (
            <Link key={p.id} href={`digital/${p.slug}`} className="card" style={{ overflow: 'hidden', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <Image src={p.previewImage} alt={p.titleUk} fill style={{ objectFit: 'cover' }} sizes="320px" />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.3rem 0.8rem', background: 'rgba(18,11,6,0.85)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'var(--accent-light)', fontWeight: 700 }}>
                  {p.category === 'models3d' ? '🧊 3D' : '✏️ SVG'}
                </div>
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{p.titleUk}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1, lineHeight: 1.5 }}>{p.descUk}</p>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', margin: '0.3rem 0' }}>
                  {p.formats.map(f => <span key={f} style={{ padding: '0.2rem 0.6rem', background: 'rgba(201,146,58,0.1)', border: '1px solid rgba(201,146,58,0.25)', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{f}</span>)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-light)' }}>{p.price} ₴</span>
                  <span className="btn btn-primary btn-sm">Купити</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
