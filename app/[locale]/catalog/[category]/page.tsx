import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products, categories } from '@/lib/mock-products';

interface CategoryPageProps {
  params: {
    locale?: string;
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const locale = params.locale || 'uk';
  const isEn = locale === 'en';
  const cat = categories.find(c => c.slug === params.category);
  if (!cat) notFound();

  const catProducts = products.filter(p => p.category === params.category);
  const catLabel = isEn ? (cat.labelEn || cat.labelUk) : cat.labelUk;

  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            href={`/${locale}/catalog`}
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.92rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            ← {isEn ? 'Back to Catalog' : 'Назад до каталогу'}
          </Link>
        </div>

        <div className="section-header">
          <span className="section-subtitle">{cat.icon} {isEn ? 'Category' : 'Категорія'}</span>
          <h1><span className="gradient-text">{catLabel}</span></h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {catProducts.length === 0 && (
            <p style={{ color: 'var(--text-secondary)', gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>
              {isEn ? 'No products in this category yet.' : 'Товарів у цій категорії поки немає.'}
            </p>
          )}
          {catProducts.map(p => {
            const title = isEn ? (p.titleEn || p.titleUk) : p.titleUk;
            const desc = isEn ? (p.descEn || p.descUk) : p.descUk;

            return (
              <Link
                key={p.id}
                href={`/${locale}/catalog/${params.category}/${p.slug}`}
                className="card"
                style={{
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    height: '270px',
                    overflow: 'hidden',
                    background: 'radial-gradient(ellipse at center, rgba(35, 22, 14, 0.95) 0%, rgba(14, 9, 5, 0.98) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Ambient blur layer */}
                  <Image
                    src={p.images[0]}
                    alt=""
                    fill
                    aria-hidden="true"
                    style={{
                      objectFit: 'cover',
                      filter: 'blur(24px) brightness(0.35)',
                      transform: 'scale(1.15)',
                      opacity: 0.65,
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Main uncropped centered image */}
                  <Image
                    src={p.images[0]}
                    alt={title}
                    fill
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'center',
                      padding: '0.75rem',
                      transition: 'transform 0.4s ease',
                      zIndex: 1,
                    }}
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0.85rem',
                      left: '0.85rem',
                      background: 'rgba(18, 11, 6, 0.75)',
                      backdropFilter: 'blur(6px)',
                      padding: '0.3rem 0.7rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    🔍 <span>{p.images.length} {isEn ? 'photos' : 'фото'} (зум)</span>
                  </div>
                </div>

                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                    {title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1, lineHeight: 1.55, margin: 0 }}>
                    {desc.length > 95 ? `${desc.slice(0, 95)}...` : desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--accent-light)' }}>
                      {p.price ? `${p.price.toLocaleString()} ₴` : (isEn ? 'Custom' : 'Індивідуально')}
                    </span>
                    <span className="btn btn-primary btn-sm" style={{ pointerEvents: 'none' }}>
                      {isEn ? 'View & Zoom →' : 'Дивитись →'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
