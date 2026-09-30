import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { digitalProducts } from '@/lib/mock-digital';

export default function DigitalProductPage({ params }: { params: { slug: string } }) {
  const product = digitalProducts.find(p => p.slug === params.slug);
  if (!product) notFound();
  return (
    <section className="section">
      <div className="container">
        <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <Link href="../../digital" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Цифровий магазин</Link> → {product.titleUk}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '1 / 1', border: '1px solid var(--border)' }}>
            <Image src={product.previewImage} alt={product.titleUk} fill style={{ objectFit: 'cover' }} sizes="600px" priority />
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.4rem 1rem', background: 'rgba(18,11,6,0.9)', border: '1px solid var(--border-hover)', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', color: 'var(--accent-light)', fontWeight: 700 }}>
              {product.category === 'models3d' ? '🧊 3D Модель' : '✏️ SVG Вектор'}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>{product.titleUk}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>{product.descUk}</p>
            <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Формати файлів</span><div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>{product.formats.map(f => <span key={f} style={{ padding: '0.3rem 0.8rem', background: 'rgba(201,146,58,0.12)', border: '1px solid rgba(201,146,58,0.3)', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{f}</span>)}</div></div>
              <div><span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Розмір файлу</span><p style={{ fontWeight: 600 }}>{product.fileSize}</p></div>
              {product.polygons && <div><span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Полігони</span><p style={{ fontWeight: 600 }}>{product.polygons}</p></div>}
              <div><span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Тип</span><p style={{ fontWeight: 600, color: 'var(--accent-light)' }}>⚡ Миттєве завантаження</p></div>
            </div>
            <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--accent-light)' }}>{product.price} ₴</div>
            <button className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '1.1rem 2.5rem' }}>💳 Купити та завантажити</button>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>💳 Оплата: Monobank, PrivatBank, PayPal. Файл надходить після підтвердження оплати.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
