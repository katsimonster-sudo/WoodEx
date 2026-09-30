'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

const navLinks = [
  { href: '/', labelUk: 'Головна', labelEn: 'Home' },
  { href: '/catalog', labelUk: 'Каталог', labelEn: 'Catalog' },
  { href: '/portfolio', labelUk: 'Портфоліо', labelEn: 'Portfolio' },
  { href: '/digital', labelUk: 'Цифрові', labelEn: 'Digital' },
  { href: '/about', labelUk: 'Про нас', labelEn: 'About' },
  { href: '/contact', labelUk: 'Контакт', labelEn: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'uk';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const label = (uk: string, en: string) => locale === 'en' ? en : uk;

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href={`/${locale}`} className={styles.logo}>
          <span className={styles.logoIcon}>🪵</span>
          <span className={styles.logoText}>Wood<span className="gradient-text">Ex</span></span>
        </Link>

        <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
          {navLinks.map(l => {
            const href = `/${locale}${l.href === '/' ? '' : l.href}`;
            return (
              <Link key={l.href} href={href} className={`${styles.navLink} ${pathname === href ? styles.active : ''}`} onClick={() => setOpen(false)}>
                {label(l.labelUk, l.labelEn)}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <Link href={`/${locale === 'uk' ? 'en' : 'uk'}${pathname.slice(3) || '/'}`} className={styles.langBtn}>
            {locale === 'uk' ? 'EN' : 'UK'}
          </Link>
          <Link href={`/${locale}/cart`} className={styles.cartBtn}>🛒</Link>
          <Link href={`/${locale}/order`} className="btn btn-primary btn-sm">
            {label('Замовити', 'Order')}
          </Link>
          <button className={`${styles.burger} ${open ? styles.burgerOpen : ''}`} onClick={() => setOpen(v => !v)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </div>
    </header>
  );
}
