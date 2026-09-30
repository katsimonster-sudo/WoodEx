export default function DownloadsPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>Мої <span className="gradient-text">завантаження</span></h1>
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>⬇️</span>
          <p style={{ color: 'var(--text-secondary)' }}>Придбаних цифрових файлів поки немає. Перейдіть до цифрового магазину.</p>
          <a href="/uk/digital" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Цифровий магазин</a>
        </div>
      </div>
    </section>
  );
}
