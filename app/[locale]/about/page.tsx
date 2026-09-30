import type { Metadata } from 'next';
import styles from './about.module.css';

export const metadata: Metadata = { title: 'Про майстерню', description: 'Дізнайтеся більше про WoodEx — авторську майстерню ексклюзивних виробів з дерева.' };

const milestones = [
  { year: '2015', text: 'Заснування майстерні. Перші вироби з дуба та ясена.' },
  { year: '2017', text: 'Освоєння ЧПК технологій та 3D різьблення.' },
  { year: '2019', text: 'Запуск цифрового магазину 3D моделей та SVG.' },
  { year: '2022', text: 'Понад 200 виконаних замовлень. Вихід на міжнародний ринок.' },
  { year: '2025', text: 'Повноцінний онлайн-магазин з оплатою Monobank, Privat, PayPal.' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={`section ${styles.hero}`}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="section-subtitle">Наша історія</span>
            <h1>Про <span className="gradient-text">майстерню</span></h1>
            <p className={styles.heroText}>З 2015 року ми створюємо ексклюзивні вироби з натурального дерева. Кожна робота — це поєднання традиційної майстерності та сучасного дизайну, любові до природного матеріалу та прагнення до досконалості.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className={styles.values}>
            {[['🌲', 'Натуральність', 'Тільки сертифіковане дерево від українських лісгоспів'], ['✋', 'Ручна праця', 'Кожен виріб проходить ручну обробку та авторське оздоблення'], ['⚡', 'ЧПК точність', '3D фрезерування для деталізованих рельєфів та складних форм'], ['💎', 'Унікальність', 'Жодного масового виробництва — лише індивідуальні рішення']].map(([icon, title, desc]) => (
              <div key={title} className={`card ${styles.valueCard}`}>
                <span className={styles.valueIcon}>{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Шлях майстерні</span>
            <h2>Хронологія <span className="gradient-text">розвитку</span></h2>
          </div>
          <div className={styles.timeline}>
            {milestones.map((m, i) => (
              <div key={m.year} className={`${styles.milestone} ${i % 2 === 0 ? styles.left : styles.right}`}>
                <div className={styles.milestoneYear}>{m.year}</div>
                <div className={styles.milestoneDot} />
                <div className={`card ${styles.milestoneCard}`}><p>{m.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
