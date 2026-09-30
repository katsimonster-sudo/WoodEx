export default function OrdersPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>Мої <span className="gradient-text">замовлення</span></h1>
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📦</span>
          <p style={{ color: 'var(--text-secondary)' }}>Замовлень поки немає. Увійдіть до акаунту або оформте перше замовлення.</p>
        </div>
      </div>
    </section>
  );
}
