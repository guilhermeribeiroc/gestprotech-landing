import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Rocket } from 'lucide-react';
import styles from './FinalCTA.module.css';

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ color: '#4ade80', flexShrink: 0 }}>
    <path d="M12.031 2c-5.502 0-9.97 4.468-9.97 9.97 0 1.916.545 3.701 1.488 5.216l-1.549 5.666 5.822-1.527a9.92 9.92 0 004.21 1.002c5.502 0 9.97-4.468 9.97-9.97C22.002 6.468 17.533 2 12.031 2zm0 17.159c-1.637 0-3.2-.444-4.57-1.285l-.328-.196-3.398.892.909-3.324-.215-.342a8.21 8.21 0 01-1.258-4.394c0-4.526 3.684-8.211 8.21-8.211 4.526 0 8.211 3.685 8.211 8.211 0 4.526-3.685 8.211-8.211 8.211zm4.512-6.177c-.247-.124-1.463-.722-1.69-.804-.226-.083-.392-.124-.556.124-.165.247-.638.804-.783.97-.144.165-.288.185-.535.061-.247-.124-1.042-.383-1.986-1.225-.733-.655-1.229-1.464-1.373-1.711-.144-.247-.015-.38.109-.503.111-.11.247-.288.371-.432.124-.144.165-.247.247-.412.083-.165.042-.309-.021-.433-.062-.124-.556-1.34-.762-1.836-.2-.486-.421-.42-.577-.428-.149-.008-.32-.01-.49-.01a.94.94 0 00-.68.32c-.227.247-.866.845-.866 2.062 0 1.216.887 2.392.986 2.556.103.165 1.745 2.665 4.227 3.733.59.254 1.05.406 1.41.52.593.189 1.133.162 1.56.098.476-.072 1.463-.598 1.669-1.175.206-.578.206-1.073.144-1.175-.062-.103-.227-.165-.474-.29z"/>
  </svg>
);

const FinalCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Fade-in e slide-up para o bloco inteiro
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  }, { scope: containerRef });

  return (
    <section className={styles.ctaSection}>
      <div ref={containerRef} className={styles.container}>
        <h2 className={styles.title}>
          Pronto para transformar<br />a gestão do seu escritório?
        </h2>
        <p className={styles.description}>
          Configure o GestProTech em menos de 5 minutos. 7 dias grátis, sem burocracia.
        </p>
        <div className={styles.buttonsRow}>
          <a 
            href="https://gestprotech.com.br/registrar/" 
            className={styles.primaryBtn}
          >
            <Rocket size={16} fill="currentColor" /> Começar Agora — 7 Dias Grátis
          </a>
          <a 
            href="https://wa.me/5588993699357" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.secondaryBtn}
          >
            <WhatsAppIcon />
            <span>Falar com um especialista</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
