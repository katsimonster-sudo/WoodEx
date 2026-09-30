import type { Metadata } from 'next';
import styles from './contact.module.css';

export const metadata: Metadata = { title: 'Контакт', description: 'Зв\'яжіться з майстернею WoodEx. Telegram, Viber, Email, телефон.' };

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={`section ${styles.hero}`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Контакт</span>
          <h1>Зв'яжіться <span className="gradient-text">з нами</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '560px', margin: '1rem auto 0' }}>Маєте питання або хочете обговорити замовлення? Ми відповідаємо протягом 24 годин.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.info}>
              {[
                { icon: '📞', title: 'Телефон', lines: ['+380 (XX) XXX-XX-XX', 'Пн–Пт 9:00–18:00'] },
                { icon: '✉️', title: 'Email', lines: ['hello@woodex.ua'] },
                { icon: '📍', title: 'Адреса', lines: ['Україна'] },
                { icon: '✈️', title: 'Telegram / Viber', lines: ['@woodex_ua'] },
              ].map(c => (
                <div key={c.title} className={`card ${styles.contactCard}`}>
                  <span className={styles.contactIcon}>{c.icon}</span>
                  <div>
                    <h3 className={styles.contactTitle}>{c.title}</h3>
                    {c.lines.map(l => <p key={l} className={styles.contactLine}>{l}</p>)}
                  </div>
                </div>
              ))}
            </div>
            <form className={`card ${styles.form}`}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '1.5rem' }}>Написати нам</h2>
              <div className={styles.field}><label className="form-label">Ім'я</label><input className="form-input" type="text" placeholder="Ваше ім'я" /></div>
              <div className={styles.field}><label className="form-label">Email / Телефон</label><input className="form-input" type="text" placeholder="your@email.com або +380..." /></div>
              <div className={styles.field}><label className="form-label">Повідомлення</label><textarea className="form-textarea" rows={5} placeholder="Опишіть ваш запит..." style={{ resize: 'vertical', minHeight: '130px' }} /></div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>📨 Надіслати повідомлення</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
