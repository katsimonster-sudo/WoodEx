'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

const navItems = [
  { href: '', labelUk: 'Головна', labelEn: 'Home', icon: '🏠' },
  { href: 'catalog', labelUk: 'Каталог', labelEn: 'Catalog', icon: '🪵', badge: 'Меблі & Декор' },
  { href: 'digital', labelUk: '3D & ЧПК', labelEn: '3D & CNC', icon: '📐', badge: 'Файли' },
  { href: '#portfolio', labelUk: 'Портфоліо', labelEn: 'Portfolio', icon: '🖼️' },
  { href: '#order', labelUk: 'Калькулятор', labelEn: 'Configurator', icon: '🎨' },
  { href: 'about', labelUk: 'Про нас', labelEn: 'About', icon: '🌿' },
  { href: 'contact', labelUk: 'Контакти', labelEn: 'Contact', icon: '📞' },
];

const quickCategories = [
  { href: 'catalog/tables', labelUk: 'Столи з масиву', icon: '🪑' },
  { href: 'catalog/lighting', labelUk: 'Освітлення & Люстри', icon: '💡' },
  { href: 'catalog/decor', labelUk: 'Декор & Дошки', icon: '🪵' },
  { href: 'catalog/panels', labelUk: 'Стінові панно', icon: '🖼️' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'uk';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isUk = locale === 'uk';
  const getHref = (path: string) => {
    if (path.startsWith('#')) return `/${locale}${path}`;
    return `/${locale}${path ? `/${path}` : ''}`;
  };

  const isLinkActive = (path: string) => {
    if (path === '') return pathname === `/${locale}` || pathname === `/${locale}/`;
    if (path.startsWith('#')) return false;
    return pathname.startsWith(`/${locale}/${path}`);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href={`/${locale}`} className={styles.logo} onClick={() => setMenuOpen(false)}>
            <span className={styles.logoIcon}>🪵</span>
            <span className={styles.logoText}>
              Wood<span className="gradient-text">Ex</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getHref(item.href)}
                className={`${styles.navLink} ${isLinkActive(item.href) ? styles.active : ''}`}
              >
                {isUk ? item.labelUk : item.labelEn}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Language Switcher */}
            <Link
              href={`/${isUk ? 'en' : 'uk'}${pathname.replace(/^\/(uk|en)/, '') || ''}`}
              className={styles.langBtn}
              title={isUk ? 'Switch to English' : 'Перемкнути на українську'}
            >
              {isUk ? 'EN' : 'UK'}
            </Link>

            {/* Cart Link */}
            <Link href={`/${locale}/cart`} className={styles.cartBtn} aria-label="Cart">
              <span>🛒</span>
            </Link>

            {/* CTA Button (Desktop only) */}
            <a href={getHref('#order')} className={`btn btn-primary btn-sm ${styles.desktopCta}`}>
              {isUk ? 'Замовити' : 'Order'}
            </a>

            {/* Hamburger Button (Mobile) */}
            <button
              className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
            >
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
              <span className={styles.burgerLine} />
            </button>
          </div>
        </div>

        {/* Mobile Quick Category Horizontal Bar (under header) */}
        <div className={styles.mobileQuickBar}>
          <div className={styles.quickBarScroll}>
            <Link href={`/${locale}/catalog`} className={styles.quickChip}>
              🪵 {isUk ? 'Весь Каталог' : 'All Catalog'}
            </Link>
            <a href={getHref('#order')} className={`${styles.quickChip} ${styles.quickChipPrimary}`}>
              🎨 {isUk ? 'Калькулятор' : 'Configurator'}
            </a>
            <Link href={`/${locale}/digital`} className={styles.quickChip}>
              📐 {isUk ? '3D & ЧПК' : '3D / CNC'}
            </Link>
            <a href={getHref('#portfolio')} className={styles.quickChip}>
              🖼️ {isUk ? 'Портфоліо' : 'Portfolio'}
            </a>
            <Link href={`/${locale}/about`} className={styles.quickChip}>
              🌿 {isUk ? 'Про нас' : 'About'}
            </Link>
            <Link href={`/${locale}/contact`} className={styles.quickChip}>
              📞 {isUk ? 'Контакти' : 'Contacts'}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {menuOpen && (
        <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile Drawer Menu */}
      <aside className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerLogo}>
            <span>🪵</span>
            <span className={styles.drawerBrand}>Wood<span className="gradient-text">Ex</span></span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Закрити"
          >
            ✕
          </button>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.drawerSectionLabel}>
            {isUk ? 'Розділи сайту' : 'Site Navigation'}
          </div>

          <nav className={styles.drawerNav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getHref(item.href)}
                className={`${styles.drawerLink} ${isLinkActive(item.href) ? styles.drawerLinkActive : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span className={styles.drawerIcon}>{item.icon}</span>
                <span className={styles.drawerLabel}>
                  {isUk ? item.labelUk : item.labelEn}
                </span>
                {item.badge && <span className={styles.drawerBadge}>{item.badge}</span>}
                <span className={styles.drawerArrow}>›</span>
              </Link>
            ))}
          </nav>

          <div className={styles.drawerSectionLabel}>
            {isUk ? 'Популярні категорії' : 'Categories'}
          </div>

          <div className={styles.drawerCategories}>
            {quickCategories.map((cat) => (
              <Link
                key={cat.href}
                href={getHref(cat.href)}
                className={styles.drawerCatCard}
                onClick={() => setMenuOpen(false)}
              >
                <span>{cat.icon}</span>
                <span>{cat.labelUk}</span>
              </Link>
            ))}
          </div>

          <div className={styles.drawerCtaBox}>
            <p className={styles.drawerCtaText}>
              {isUk
                ? 'Потрібен унікальний стіл чи виріб за вашими розмірами?'
                : 'Need custom wood furniture tailored to your exact space?'}
            </p>
            <a
              href={getHref('#order')}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setMenuOpen(false)}
            >
              🎨 {isUk ? 'Розрахувати вартість' : 'Custom Estimate'}
            </a>
          </div>
        </div>

        <div className={styles.drawerFooter}>
          <a href="tel:+380979112973" className={styles.phoneLink}>
            📞 +38 (097) 911-29-73
          </a>
          <div className={styles.drawerFooterBottom}>
            <span>👤 пан Андрій · 📍 м. Київ</span>
          </div>
        </div>
      </aside>
    </>
  );
}
