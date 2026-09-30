import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, categories } from '@/lib/mock-products';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = categories.find(c => c.slug === params.category);
  if (!cat) notFound();
  const catProducts = products.filter(p => p.category === params.category);
  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: '1rem' }}>
          <Link href="../catalog" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>← Каталог</Link>
        </div>
        <div className="section-header">
          <span className="section-subtitle">{cat.icon} Категорія</span>
          <h1><span className="gradient-text">{cat.labelUk}</span></h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem' }}>
          {catProducts.length === 0 && <p style={{ color: 'var(--text-secondary)', gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>Товарів у цій категорії поки немає.</p>}
          {catProducts.map(p => (
            <Link key={p.id} href={`${p.slug}`} className="card" style={{ overflow: 'hidden', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <Image src={p.images[0]} alt={p.titleUk} fill style={{ objectFit: 'cover' }} sizes="350px" />
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{p.titleUk}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1, lineHeight: 1.55 }}>{p.descUk.slice(0, 90)}...</p>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-light)' }}>{p.price ? `${p.price.toLocaleString()} ₴` : 'Індивідуально'}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
