import { motion } from 'framer-motion';

export function Navbar(): React.JSX.Element {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="landing-nav"
    >
      {/* Logo */}
      <div className="landing-nav__logo">
        <div className="landing-nav__logo-icon" />
        <span className="landing-nav__logo-text">Prismatica</span>
      </div>

      {/* Nav links */}
      <div className="landing-nav__links">
        {['Platform', 'Features', 'Docs'].map((item) => (
          <span key={item} className="landing-nav__link">
            {item}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button className="landing-nav__cta">Get Access</button>
    </motion.nav>
  );
}
