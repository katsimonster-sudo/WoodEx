import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}><span>🪵</span> Wood<span className="gradient-text">Ex</span></div>
            <p className={styles.desc}>Ексклюзивні вироби з натурального дерева ручної роботи. Освітлення, різьблення, меблі рустик, 3D моделі та вектори для ЧПК.</p>
            <div className={styles.socials}>
              <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram">📷</a>
              <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">📘</a>
              <a href="https://t.me" target="_blank" rel="noopener" aria-label="Telegram">✈️</a>
            </div>
          </div>
          <div className={styles.col}>
            <h4>Навігація</h4>
            <ul>
              {[['/', 'Головна'], ['/catalog', 'Каталог'], ['/portfolio', 'Портфоліо'], ['/digital', 'Цифровий магазин'], ['/about', 'Про нас'], ['/contact', 'Контакт']].map(([href, label]) => (
                <li key={href}><Link href={`/uk${href === '/' ? '' : href}`}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.col}>
            <h4>Продукція</h4>
            <ul>
              {[['lighting', 'Освітлення'], ['carving', 'Різьблення'], ['rustic', 'Рустик'], ['furniture', 'Меблі'], ['models3d', '3D Моделі'], ['vectors', 'Вектори SVG']].map(([slug, label]) => (
                <li key={slug}><Link href={`/uk/catalog/${slug}`}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.col}>
            <h4>Контакти</h4>
            <ul className={styles.contacts}>
              <li>📞 <a href="tel:+380XXXXXXXXX">+380 (XX) XXX-XX-XX</a></li>
              <li>✉️ <a href="mailto:hello@woodex.ua">hello@woodex.ua</a></li>
              <li>📍 Україна</li>
              <li>🕐 Пн–Пт 9:00–18:00</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {year} WoodEx. Всі права захищені.</p>
          <div className={styles.payments}>
            <span>💳 Monobank</span>
            <span>💳 PrivatBank</span>
            <span>🌐 PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
