export default function AccountPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-heading)', marginBottom: '2rem' }}>Особистий <span className="gradient-text">кабінет</span></h1>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem', alignItems: 'start' }}>
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[['📦', 'Мої замовлення', 'orders'], ['⬇️', 'Завантаження', 'downloads'], ['👤', 'Профіль', '']].map(([icon, label, sub]) => (
              <a key={label} href={sub ? `account/${sub}` : '#'} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 1rem', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition-fast)', fontSize: '0.97rem' }}>
                {icon} {label}
              </a>
            ))}
          </div>
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>👋</span>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--accent-light)', marginBottom: '0.75rem' }}>Вітаємо!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Увійдіть або зареєструйтеся, щоб переглядати замовлення та завантаження.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-primary">Увійти</button>
              <button className="btn btn-secondary">Реєстрація</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
