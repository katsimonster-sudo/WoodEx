import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🪵</span>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-light)' }}>Сторінку не знайдено</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
          Схоже, цей виріб або сторінка були переміщені чи ще обробляються в нашій майстерні.
        </p>
        <Link href="/" className="btn btn-primary">🌲 Повернутися на головну</Link>
      </div>
    </div>
  );
}
