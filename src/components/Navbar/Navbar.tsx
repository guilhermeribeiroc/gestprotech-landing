import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { REGISTER_URL } from '../../config/promo';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.container} aria-label="Principal">
        <a href="#top" className={styles.brand}>
          <img src="/LOGOGEST.png" alt="" className={styles.logo} />
          <span className={styles.brandName}>GestProTech</span>
        </a>

        <div className={styles.navLinks}>
          <a href="#novidades" className={styles.navLink}>Novidades</a>
          <a href="#features" className={styles.navLink}>Funcionalidades</a>
          <a href="#demo" className={styles.navLink}>Sistema</a>
          <a href="#preco" className={styles.navLink}>Oferta</a>
          <a href="#contato" className={styles.navLink}>Contato</a>
        </div>

        <a href={REGISTER_URL} className={styles.ctaBtn}>
          <span className={styles.ctaLong}>Garantir Black Friday</span>
          <span className={styles.ctaShort}>Black Friday</span>
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
