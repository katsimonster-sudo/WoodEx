export default function CartPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>Кошик <span className="gradient-text">🛒</span></h1>
        <div className="card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <span style={{ fontSize: '3.5rem', display: 'block', marginBottom: '1.5rem' }}>🛒</span>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-light)' }}>Кошик порожній</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Перейдіть до каталогу або цифрового магазину, щоб додати товари.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/uk/catalog" className="btn btn-primary">Каталог виробів</a>
            <a href="/uk/digital" className="btn btn-secondary">Цифровий магазин</a>
          </div>
        </div>
      </div>
    </section>
  );
}
