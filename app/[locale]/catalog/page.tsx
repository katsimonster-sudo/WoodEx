import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { products, categories } from '@/lib/mock-products';

export const metadata: Metadata = { title: 'Каталог', description: 'Каталог виробів WoodEx — освітлення, різьблення, меблі, рустик.' };

export default function CatalogPage({ params }: { params?: { locale?: string } }) {
  const locale = params?.locale || 'uk';
  const isEn = locale === 'en';

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">
            {isEn ? 'Our Products' : 'Наша продукція'}
          </span>
          <h1>
            {isEn ? 'Product ' : 'Каталог '}
            <span className="gradient-text">{isEn ? 'Catalog' : 'виробів'}</span>
          </h1>
          <p className="section-desc">
            {isEn
              ? 'Exclusive solid wood creations handcrafted with passion. Each piece is unique.'
              : 'Ексклюзивні вироби з натурального дерева. Кожен виріб виготовляється вручну.'}
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map(c => (
            <Link
              key={c.slug}
              href={`/${locale}/catalog/${c.slug}`}
              style={{
                padding: '0.65rem 1.4rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.92rem',
                transition: 'var(--transition)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <span>{c.icon}</span>
              <span>{isEn ? (c.labelEn || c.labelUk) : c.labelUk}</span>
            </Link>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {products.map(p => {
            const cat = categories.find(c => c.slug === p.category);
            const title = isEn ? (p.titleEn || p.titleUk) : p.titleUk;
            const desc = isEn ? (p.descEn || p.descUk) : p.descUk;
            const catLabel = isEn ? (cat?.labelEn || cat?.labelUk) : cat?.labelUk;

            return (
              <Link
                key={p.id}
                href={`/${locale}/catalog/${p.category}/${p.slug}`}
                className="card"
                style={{
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
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
                      top: '0.85rem',
                      right: '0.85rem',
                      display: 'flex',
                      gap: '0.5rem',
                    }}
                  >
                    {!p.inStock ? (
                      <span
                        style={{
                          padding: '0.3rem 0.75rem',
                          background: 'rgba(18,11,6,0.85)',
                          backdropFilter: 'blur(6px)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          color: 'var(--accent-gold)',
                          fontWeight: 700,
                        }}
                      >
                        {isEn ? 'Custom' : 'На замовлення'}
                      </span>
                    ) : (
                      <span
                        style={{
                          padding: '0.3rem 0.75rem',
                          background: 'rgba(18,11,6,0.85)',
                          backdropFilter: 'blur(6px)',
                          border: '1px solid rgba(46, 204, 113, 0.4)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          color: '#2ecc71',
                          fontWeight: 700,
                        }}
                      >
                        {isEn ? 'In Stock' : 'В наявності'}
                      </span>
                    )}
                  </div>
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
                  <p style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                    {cat?.icon} {catLabel}
                  </p>
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
