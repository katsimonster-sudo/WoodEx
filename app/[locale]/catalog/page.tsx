import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { products, categories } from '@/lib/mock-products';

export const metadata: Metadata = { title: 'Каталог', description: 'Каталог виробів WoodEx — освітлення, різьблення, меблі, рустик.' };

export default function CatalogPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Наша продукція</span>
          <h1>Каталог <span className="gradient-text">виробів</span></h1>
          <p className="section-desc">Ексклюзивні вироби з натурального дерева. Кожен виріб виготовляється вручну.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map(c => (
            <Link key={c.slug} href={`catalog/${c.slug}`} style={{ padding: '0.7rem 1.5rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {c.icon} {c.labelUk}
            </Link>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem' }}>
          {products.map(p => (
            <Link key={p.id} href={`catalog/${p.category}/${p.slug}`} className="card" style={{ overflow: 'hidden', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <Image src={p.images[0]} alt={p.titleUk} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} sizes="350px" />
                {!p.inStock && <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.3rem 0.8rem', background: 'rgba(18,11,6,0.85)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700 }}>На замовлення</div>}
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{categories.find(c => c.slug === p.category)?.labelUk}</p>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{p.titleUk}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1, lineHeight: 1.55 }}>{p.descUk.slice(0, 90)}...</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-light)' }}>{p.price ? `${p.price.toLocaleString()} ₴` : 'Індивідуально'}</span>
                  <span className="btn btn-primary btn-sm">Детальніше</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
