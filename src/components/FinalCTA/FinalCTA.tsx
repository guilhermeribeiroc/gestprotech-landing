import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Rocket } from 'lucide-react';
import Countdown from '../Countdown/Countdown';
import { REGISTER_URL, WHATSAPP_URL, PRICE_UNDER, SLOTS, PROMO_END_LABEL } from '../../config/promo';
import styles from './FinalCTA.module.css';

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M12.031 2c-5.502 0-9.97 4.468-9.97 9.97 0 1.916.545 3.701 1.488 5.216l-1.549 5.666 5.822-1.527a9.92 9.92 0 004.21 1.002c5.502 0 9.97-4.468 9.97-9.97C22.002 6.468 17.533 2 12.031 2zm0 17.159c-1.637 0-3.2-.444-4.57-1.285l-.328-.196-3.398.892.909-3.324-.215-.342a8.21 8.21 0 01-1.258-4.394c0-4.526 3.684-8.211 8.21-8.211 4.526 0 8.211 3.685 8.211 8.211 0 4.526-3.685 8.211-8.211 8.211zm4.512-6.177c-.247-.124-1.463-.722-1.69-.804-.226-.083-.392-.124-.556.124-.165.247-.638.804-.783.97-.144.165-.288.185-.535.061-.247-.124-1.042-.383-1.986-1.225-.733-.655-1.229-1.464-1.373-1.711-.144-.247-.015-.38.109-.503.111-.11.247-.288.371-.432.124-.144.165-.247.247-.412.083-.165.042-.309-.021-.433-.062-.124-.556-1.34-.762-1.836-.2-.486-.421-.42-.577-.428-.149-.008-.32-.01-.49-.01a.94.94 0 00-.68.32c-.227.247-.866.845-.866 2.062 0 1.216.887 2.392.986 2.556.103.165 1.745 2.665 4.227 3.733.59.254 1.05.406 1.41.52.593.189 1.133.162 1.56.098.476-.072 1.463-.598 1.669-1.175.206-.578.206-1.073.144-1.175-.062-.103-.227-.165-.474-.29z" />
  </svg>
);

const FinalCTA: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.from(`.${styles.box}`, {
      opacity: 0, y: 40, duration: 0.9,
      scrollTrigger: { trigger: `.${styles.box}`, start: 'top 85%' },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.box}>
        <div className={styles.glow} aria-hidden="true" />
        <p className={styles.kicker}>Últimos dias de Black Friday</p>
        <h2 className={styles.title}>
          Pare de perder prazo.<br /><em>Comece hoje por menos de {PRICE_UNDER}/mês.</em>
        </h2>
        <p className={styles.description}>
          Configure em menos de 5 minutos. 7 dias grátis, sem cartão. Oferta válida até {PROMO_END_LABEL}, só {SLOTS} vagas para novos clientes.
        </p>
        <Countdown size="compact" className={styles.timer} />
        <div className={styles.buttons}>
          <a href={REGISTER_URL} className={styles.primaryBtn}>
            <Rocket size={18} aria-hidden="true" /> Garantir oferta agora
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
            <WhatsAppIcon /> Falar com um especialista
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
