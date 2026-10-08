'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNav.module.css';

export default function BottomNav() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'uk';
  const isUk = locale === 'uk';

  const items = [
    { href: `/${locale}`, label: isUk ? 'Головна' : 'Home', icon: '🏠', exact: true },
    { href: `/${locale}/catalog`, label: isUk ? 'Каталог' : 'Catalog', icon: '🪵' },
    { href: `/${locale}/digital`, label: isUk ? '3D/ЧПК' : '3D/CNC', icon: '📐' },
    { href: `/${locale}#order`, label: isUk ? 'Замовити' : 'Order', icon: '🎨', isPrimary: true },
    { href: `/${locale}/contact`, label: isUk ? 'Контакти' : 'Contact', icon: '📞' },
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href || pathname === `${href}/`;
    if (href.includes('#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <nav className={styles.bottomNav} aria-label="Mobile Navigation">
      <div className={styles.container}>
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`${styles.navItem} ${item.isPrimary ? styles.primaryItem : ''} ${
              isActive(item.href, item.exact) ? styles.active : ''
            }`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
