'use client';
import { useState } from 'react';
import styles from './OrderForm.module.css';

const categories = [
  { value: 'lighting', label: 'Освітлення', icon: '💡' },
  { value: 'carving', label: 'Різьблення', icon: '🪚' },
  { value: 'rustic', label: 'Рустик / Slab', icon: '🏡' },
  { value: 'furniture', label: 'Меблі', icon: '🪑' },
  { value: 'other', label: 'Інше', icon: '✨' },
];

export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [form, setForm] = useState({ description: '', size: '', wood: '', budget: '', deadline: '', name: '', phone: '', email: '', messenger: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className={`section ${styles.section}`} id="order">
        <div className="container">
          <div className={styles.success}>
            <span className={styles.successIcon}>🎉</span>
            <h2>Дякуємо за замовлення!</h2>
            <p>Ми зв'яжемося з вами протягом 24 годин для уточнення деталей.</p>
            <button className="btn btn-primary" onClick={() => { setSubmitted(false); setStep(1); }}>Нове замовлення</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${styles.section}`} id="order">
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.header}>
            <span className="section-subtitle">Індивідуальний підхід</span>
            <h2>Замовити <span className="gradient-text">виріб</span></h2>
            <p className={styles.desc}>Опишіть вашу ідею — і ми втілимо її в дереві. Кожен виріб виготовляється вручну під замовника.</p>
          </div>
          <div className={styles.steps}>
            {[1, 2, 3].map(s => (
              <div key={s} className={`${styles.step} ${step === s ? styles.stepActive : ''} ${step > s ? styles.stepDone : ''}`}>
                <div className={styles.stepNum}>{step > s ? '✓' : s}</div>
                <span>{s === 1 ? 'Тип виробу' : s === 2 ? 'Деталі' : 'Контакти'}</span>
              </div>
            ))}
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            {step === 1 && (
              <div className={styles.catGrid}>
                {categories.map(c => (
                  <button type="button" key={c.value} className={`${styles.catCard} ${category === c.value ? styles.catActive : ''}`} onClick={() => setCategory(c.value)}>
                    <span className={styles.catIcon}>{c.icon}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className={styles.fields}>
                <div className={styles.field}>
                  <label className="form-label">Опис виробу *</label>
                  <textarea className="form-textarea" name="description" rows={4} placeholder="Опишіть що ви хочете: стиль, матеріал, призначення..." value={form.description} onChange={handleChange} required />
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className="form-label">Розмір / габарити</label>
                    <input className="form-input" name="size" type="text" placeholder="напр. 120×80 см" value={form.size} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label className="form-label">Порода деревини</label>
                    <input className="form-input" name="wood" type="text" placeholder="дуб, горіх, ясен..." value={form.wood} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className="form-label">Орієнтовний бюджет</label>
                    <input className="form-input" name="budget" type="text" placeholder="від 2000 ₴" value={form.budget} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label className="form-label">Бажаний термін</label>
                    <input className="form-input" name="deadline" type="text" placeholder="2–4 тижні" value={form.deadline} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className={styles.fields}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className="form-label">Ім'я *</label>
                    <input className="form-input" name="name" type="text" placeholder="Ваше ім'я" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className={styles.field}>
                    <label className="form-label">Телефон *</label>
                    <input className="form-input" name="phone" type="tel" placeholder="+380 (XX) XXX-XX-XX" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className="form-label">Email</label>
                    <input className="form-input" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label className="form-label">Telegram / Viber</label>
                    <input className="form-input" name="messenger" type="text" placeholder="@username" value={form.messenger} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}
            <div className={styles.nav}>
              {step > 1 && <button type="button" className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>← Назад</button>}
              {step < 3 && <button type="button" className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={step === 1 && !category}>Далі →</button>}
              {step === 3 && <button type="submit" className="btn btn-primary">🌲 Надіслати замовлення</button>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
