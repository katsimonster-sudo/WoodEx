import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image src="https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=1600&q=85" alt="WoodEx workshop" fill style={{ objectFit: 'cover' }} priority />
        <div className={styles.overlay} />
      </div>
      <div className={`container ${styles.content}`}>
        <div className={styles.left}>
          <div className="badge">🌿 Ексклюзивна майстерня</div>
          <h1 className={styles.title}>
            Вироби з дерева,<br />
            <span className="gradient-text">народжені руками</span>
          </h1>
          <p className={styles.subtitle}>
            Освітлення, різьблення, меблі рустик та цифрові 3D моделі — кожен виріб є неповторним твором мистецтва
          </p>
          <div className={styles.ctas}>
            <Link href="/uk/portfolio" className="btn btn-primary">🖼️ Переглянути роботи</Link>
            <Link href="/uk/order" className="btn btn-secondary">✍️ Замовити виріб</Link>
          </div>
          <div className={styles.stats}>
            {[['200+', 'Робіт виконано'], ['9', 'Років досвіду'], ['12', 'Порід деревини']].map(([num, label]) => (
              <div key={label} className={styles.stat}>
                <span className={styles.statNum}>{num}</span>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.woodCard}>
            <div className={styles.woodCardImg}>
              <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" alt="Wood lamp" fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.woodCardInfo}>
              <p className={styles.woodCardTitle}>Підвісна лампа «Дуб»</p>
              <p className={styles.woodCardPrice}>від 4 800 ₴</p>
            </div>
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
