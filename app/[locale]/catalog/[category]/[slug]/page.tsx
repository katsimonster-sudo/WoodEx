import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, categories } from '@/lib/mock-products';

export default function ProductPage({ params }: { params: { category: string; slug: string } }) {
  const product = products.find(p => p.slug === params.slug && p.category === params.category);
  if (!product) notFound();
  const cat = categories.find(c => c.slug === product.category);
  return (
    <section className="section">
      <div className="container">
        <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <Link href="../../catalog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Каталог</Link> → <Link href={`../${product.category}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{cat?.labelUk}</Link> → {product.titleUk}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '1 / 1' }}>
            <Image src={product.images[0]} alt={product.titleUk} fill style={{ objectFit: 'cover' }} sizes="600px" priority />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px' }}>{cat?.icon} {cat?.labelUk}</span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>{product.titleUk}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>{product.descUk}</p>
            <div className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {product.materials && <div><span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Матеріали</span><p style={{ fontWeight: 600 }}>{product.materials.join(', ')}</p></div>}
              {product.dimensions && <div><span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Розміри</span><p style={{ fontWeight: 600 }}>{product.dimensions}</p></div>}
              <div><span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Наявність</span><p style={{ fontWeight: 600, color: product.inStock ? 'var(--accent-light)' : 'var(--accent-copper)' }}>{product.inStock ? '✅ В наявності' : '🔄 На замовлення (3–6 тижнів)'}</p></div>
            </div>
            <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--accent-light)' }}>
              {product.price ? `${product.price.toLocaleString()} ₴` : 'Ціна індивідуально'}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href={`/uk/order`} className="btn btn-primary" style={{ flex: 1 }}>✍️ Замовити</Link>
              <a href="https://t.me/woodex_ua" target="_blank" rel="noopener" className="btn btn-secondary">📞 Обговорити</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
