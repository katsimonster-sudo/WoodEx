import type { Metadata } from 'next';
import styles from './contact.module.css';

export const metadata: Metadata = {
  title: 'Контакти майстерні WoodEx',
  description: 'Зв\'яжіться з майстернею WoodEx. Контактна особа: пан Андрій. Виробничі потужності в м. Київ. Телефон, Telegram, Viber.',
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={`section ${styles.hero}`}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-subtitle">
            <span>🌿</span> Майстерня авторського дерева
          </span>
          <h1>
            Зв'яжіться <span className="gradient-text">з майстернею</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '640px', margin: '1rem auto 0', lineHeight: '1.6' }}>
            Маєте питання, власний ескіз чи хочете замовити меблі за індивідуальними розмірами? Проконсультуємо та зробимо точний розрахунок.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className={styles.grid}>
            {/* Info Column */}
            <div className={styles.info}>
              {/* Contact Person Card */}
              <div className={`card ${styles.contactCard} ${styles.highlightCard}`}>
                <span className={styles.contactIcon}>👤</span>
                <div>
                  <h3 className={styles.contactTitle}>Контактна особа</h3>
                  <p className={styles.contactLine}>
                    <strong>пан Андрій</strong> — провідний майстер та консультант
                  </p>
                  <p className={styles.contactSub}>
                    Прямий зв'язок щодо замовлень, підбору деревини та ескізів
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className={`card ${styles.contactCard}`}>
                <span className={styles.contactIcon}>📞</span>
                <div>
                  <h3 className={styles.contactTitle}>Телефон для зв'язку</h3>
                  <p className={styles.contactLine}>
                    <a href="tel:+380979112973" className={styles.activeLink}>
                      +38 (097) 911-29-73
                    </a>
                  </p>
                  <p className={styles.contactSub}>Щоденно з 9:00 до 20:00 (дзвінки та повідомлення)</p>
                </div>
              </div>

              {/* Messengers Card */}
              <div className={`card ${styles.contactCard}`}>
                <span className={styles.contactIcon}>💬</span>
                <div>
                  <h3 className={styles.contactTitle}>Месенджери (миттєвий зв'язок)</h3>
                  <p className={styles.contactLine}>
                    Надсилайте фото, схеми або посилання з Pinterest:
                  </p>
                  <div className={styles.messengerBtns}>
                    <a
                      href="https://t.me/+380979112973"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.tgBtn}
                    >
                      ✈️ Telegram (+380979112973)
                    </a>
                    <a
                      href="viber://chat?number=%2B380979112973"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.viberBtn}
                    >
                      💜 Viber (+380979112973)
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className={`card ${styles.contactCard}`}>
                <span className={styles.contactIcon}>📍</span>
                <div>
                  <h3 className={styles.contactTitle}>Виробництво</h3>
                  <p className={styles.contactLine}>
                    <strong>Потужності виробництва знаходяться в місті Києві</strong>
                  </p>
                  <p className={styles.contactSub}>
                    Доставка готових виробів по Києву та всій Україні (Нова Пошта, кур'єрська доставка, самовивіз)
                  </p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <form className={`card ${styles.form}`}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                Надіслати запит майстру
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                Залиште ваші контакти, і пан Андрій зв'яжеться з вами для уточнення деталей та прорахунку.
              </p>

              <div className={styles.field}>
                <label className="form-label">Ваше ім'я *</label>
                <input className="form-input" type="text" placeholder="Як до вас звертатися?" required />
              </div>

              <div className={styles.field}>
                <label className="form-label">Номер телефону (Viber / Telegram) *</label>
                <input className="form-input" type="tel" placeholder="+38 (097) 911-29-73" required />
              </div>

              <div className={styles.field}>
                <label className="form-label">Бажаний виріб або запитання</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder="Опишіть розміри, бажану породу дерева (дуб, ясен, горіх) або ваші побажання..."
                  style={{ resize: 'vertical', minHeight: '110px' }}
                />
              </div>

              <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}>
                📨 Надіслати повідомлення
              </button>

              <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Або пишіть напряму у Viber / Telegram: <strong>+38 (097) 911-29-73</strong>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
