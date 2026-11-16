import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitora o scroll para alterar o background da Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animação de entrada do HUD superior
  useGSAP(() => {
    // 3. HUD superior desce de -30px, opacity 0 -> 1, delay 0.3s, duration 0.7s, ease power3.out
    gsap.set(navbarRef.current, { y: -30, opacity: 0 });
    
    gsap.to(navbarRef.current, {
      y: 0,
      opacity: 1,
      delay: 0.3,
      duration: 0.7,
      ease: 'power3.out'
    });
  }, { scope: navbarRef });

  return (
    <nav
      ref={navbarRef}
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.container}>
        <a href="#top" className={styles.brand}>
          <img
            src="/LOGOGEST.png"
            alt="GestProTech Logo"
            className={styles.logo}
          />
          <span className={styles.brandName}>GestProTech</span>
        </a>

        <div className={styles.navLinks}>
          <a href="#features" className={styles.navLink}>Funcionalidades</a>
          <a href="#demo" className={styles.navLink}>Sistema</a>
          <a href="#preco" className={styles.navLink}>Preço</a>
          <a href="#contato" className={styles.navLink}>Contato</a>
        </div>

        <a href="https://gestprotech.com.br/registrar/" className={styles.ctaBtn}>
          Começar Grátis <ArrowRight size={16} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
