import { m } from 'framer-motion';
import styles from './Navbar.module.scss';

export function Navbar(): React.JSX.Element {
  return (
    <m.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={styles.navContainer}
    >
      {/* Logo */}
      <div className={styles.logoWrapper}>
        <div className={styles.logoIcon} />
        <span className={styles.logoText}>Prismatica</span>
      </div>

      {/* Nav links */}
      <div className={styles.links}>
        {['Platform', 'Features', 'Docs'].map((item) => (
          <span key={item} className={styles.link}>
            {item}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button className={styles.cta}>Get Access</button>
    </m.nav>
  );
}
