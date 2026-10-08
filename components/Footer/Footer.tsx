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
            <p className={styles.desc}>
              Авторська майстерня ексклюзивних виробів з масиву дерева ручної роботи. Виробничі потужності в м. Київ. Стійкі екологічні покриття, точна геометрія та індивідуальні 3D-проекти.
            </p>
            <div className={styles.socials}>
              <a href="https://t.me/+380979112973" target="_blank" rel="noopener" aria-label="Telegram" title="Telegram: +380979112973">✈️</a>
              <a href="viber://chat?number=%2B380979112973" target="_blank" rel="noopener" aria-label="Viber" title="Viber: +380979112973">💜</a>
              <a href="tel:+380979112973" aria-label="Телефон" title="Зателефонувати: +380979112973">📞</a>
            </div>
          </div>
          <div className={styles.col}>
            <h4>Навігація</h4>
            <ul>
              {[['/', 'Головна'], ['/catalog', 'Каталог'], ['/portfolio', 'Портфоліо'], ['/digital', '3D & ЧПК моделі'], ['/about', 'Про нас'], ['/contact', 'Контакти']].map(([href, label]) => (
                <li key={href}><Link href={`/uk${href === '/' ? '' : href}`}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.col}>
            <h4>Каталог</h4>
            <ul>
              {[['tables', 'Столи з масиву'], ['lighting', 'Освітлення & Люстри'], ['decor', 'Декор & Дошки'], ['furniture', 'Меблі'], ['panels', 'Стінові панно'], ['digital', 'Цифрові креслення']].map(([slug, label]) => (
                <li key={slug}><Link href={slug === 'digital' ? '/uk/digital' : `/uk/catalog/${slug}`}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.col}>
            <h4>Контакти</h4>
            <ul className={styles.contacts}>
              <li>👤 <strong>Контактна особа:</strong> пан Андрій</li>
              <li>📞 <a href="tel:+380979112973">+38 (097) 911-29-73</a></li>
              <li>✈️ <a href="https://t.me/+380979112973" target="_blank" rel="noopener">Telegram / Viber</a></li>
              <li>📍 <strong>Виробництво:</strong> м. Київ, Україна</li>
              <li>🕐 Щоденно 9:00–20:00</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {year} WoodEx. Всі права захищені. Вироблено в Києві, Україна 🇺🇦</p>
          <div className={styles.payments}>
            <span>💳 Оплата за реквізитами / ФОП</span>
            <span>💳 Безготівковий розрахунок</span>
            <span>💳 Післяплата</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
