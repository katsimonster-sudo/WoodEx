import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image
          src="https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=1920&q=85"
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
            <span className="badge">🌿 Ексклюзивна майстерня</span>
          </div>

          <h1 className={styles.brandName}>
            Wood<span className="gradient-text">Ex</span>
          </h1>

          <div className={styles.taglineWrapper}>
            <p className={styles.tagline}>
              Вироби з дерева, <span className={styles.taglineAccent}>народжені руками</span>
            </p>
          </div>

          <p className={styles.subtitle}>
            Освітлення, різьблення, меблі рустик та цифрові 3D моделі — кожен виріб є неповторним твором мистецтва
          </p>

          <div className={styles.ctas}>
            <Link href="/uk/catalog" className="btn btn-primary">
              🪵 Каталог виробів
            </Link>
            <Link href="/uk/order" className="btn btn-secondary">
              ✍️ Індивідуальне замовлення
            </Link>
            <Link href="/uk/digital" className="btn btn-glass">
              📐 3D Моделі & Макети
            </Link>
          </div>

          <div className={styles.stats}>
            {[
              ['200+', 'Робіт виконано'],
              ['9', 'Років досвіду'],
              ['12', 'Порід деревини'],
              ['100%', 'Ручна робота'],
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
        <span>Гортайте вниз</span>
      </div>
    </section>
  );
}
