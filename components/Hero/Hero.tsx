import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=85"
          alt="WoodEx workshop background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className={styles.overlay} />
        <div className={styles.ambientGlow} />
      </div>

      <div className={`container ${styles.content}`}>
        <div className={styles.centerBox}>
          <div className={styles.badgeWrapper}>
            <span className="badge">🌿 Майстерня авторського дерева</span>
          </div>

          <h1 className={styles.brandName}>
            Wood<span className="gradient-text">Ex</span>
          </h1>

          <div className={styles.taglineWrapper}>
            <p className={styles.tagline}>
              Мистецтво масиву, <span className={styles.taglineAccent}>створене для вашого дому</span>
            </p>
          </div>

          <p className={styles.subtitle}>
            Обідні столи з живим краєм, ексклюзивні комоди, різьблені панно та освітлення. Втілюємо в дереві ваші найсміливіші ідеї та креслення.
          </p>

          <div className={styles.ctas}>
            <a href="#order" className="btn btn-primary">
              🎨 Індивідуальний розрахунок
            </a>
            <a href="#portfolio" className="btn btn-secondary">
              🪵 Галерея робіт
            </a>
            <Link href="/uk/digital" className="btn btn-secondary">
              📐 Файли для ЧПК
            </Link>
          </div>

          <div className={styles.stats}>
            {[
              ['250+', 'Унікальних робіт'],
              ['9', 'Років досвіду'],
              ['6', 'Преміум порід'],
              ['100%', 'Масив камерної сушки'],
            ].map(([num, label]) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statNum}>{num}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.scroll}>
        <div className={styles.scrollLine} />
        <span>Гортайте до конфігуратора</span>
      </div>
    </section>
  );
}
