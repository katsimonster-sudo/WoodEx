import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, categories } from '@/lib/mock-products';
import ImageGallery from '@/components/ImageGallery/ImageGallery';

interface ProductPageProps {
  params: {
    locale?: string;
    category: string;
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const locale = params.locale || 'uk';
  const isEn = locale === 'en';
  const product = products.find(p => p.slug === params.slug && p.category === params.category);
  if (!product) notFound();

  const cat = categories.find(c => c.slug === product.category);
  const title = isEn ? (product.titleEn || product.titleUk) : product.titleUk;
  const desc = isEn ? (product.descEn || product.descUk) : product.descUk;
  const catLabel = isEn ? (cat?.labelEn || cat?.labelUk) : cat?.labelUk;

  return (
    <section className="section" style={{ minHeight: '80vh', padding: '2rem 0 5rem' }}>
      <div className="container">
        {/* Breadcrumb navigation */}
        <nav aria-label="Хлібні крихти" style={{ marginBottom: '2rem', fontSize: '0.92rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href={`/${locale}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            {isEn ? 'Home' : 'Головна'}
          </Link>
          <span>→</span>
          <Link href={`/${locale}/catalog`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            {isEn ? 'Catalog' : 'Каталог'}
          </Link>
          <span>→</span>
          <Link href={`/${locale}/catalog/${product.category}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            {catLabel}
          </Link>
          <span>→</span>
          <span style={{ color: 'var(--accent-light)', fontWeight: 500 }}>{title}</span>
        </nav>

        {/* Product view: Gallery + Info */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Gallery with Zoom (Wheel, Drag, Pinch, Double-Tap) */}
          <div>
            <ImageGallery images={product.images} alt={title} />
          </div>

          {/* Details & Specs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--accent-gold)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1.4px',
              }}
            >
              {cat?.icon} {catLabel}
            </span>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.7rem)', lineHeight: 1.2, margin: 0 }}>
              {title}
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.75 }}>
              {desc}
            </p>

            <div
              className="card"
              style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'var(--border)',
              }}
            >
              {product.materials && (
                <div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                    {isEn ? 'Materials' : 'Матеріали'}
                  </span>
                  <p style={{ fontWeight: 600, margin: 0 }}>{product.materials.join(', ')}</p>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                    {isEn ? 'Dimensions' : 'Розміри'}
                  </span>
                  <p style={{ fontWeight: 600, margin: 0 }}>{product.dimensions}</p>
                </div>
              )}
              <div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                  {isEn ? 'Availability' : 'Наявність'}
                </span>
                <p
                  style={{
                    fontWeight: 600,
                    margin: 0,
                    color: product.inStock ? 'var(--accent-light)' : 'var(--accent-copper)',
                  }}
                >
                  {product.inStock
                    ? (isEn ? '✅ In Stock' : '✅ В наявності')
                    : (isEn ? '🔄 Made to Order (3–6 weeks)' : '🔄 На замовлення (3–6 тижнів)')}
                </p>
              </div>
            </div>

            <div
              style={{
                fontSize: '2.4rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--accent-light)',
              }}
            >
              {product.price
                ? `${product.price.toLocaleString()} ₴`
                : (isEn ? 'Custom Price' : 'Ціна індивідуально')}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <Link
                href={`/${locale}/#order`}
                className="btn btn-primary"
                style={{ flex: 1, minWidth: '180px', textAlign: 'center', justifyContent: 'center' }}
              >
                ✨ {isEn ? 'Order Now' : 'Замовити виріб'}
              </Link>
              <a
                href="https://t.me/woodex_ua"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ minWidth: '160px', textAlign: 'center', justifyContent: 'center' }}
              >
                💬 {isEn ? 'Chat Telegram' : 'Обговорити'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

