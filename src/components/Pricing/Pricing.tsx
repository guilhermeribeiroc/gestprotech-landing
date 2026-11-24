import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CheckCircle2, Rocket, Flame } from 'lucide-react';
import Countdown from '../Countdown/Countdown';
import {
  REGISTER_URL, PRICE_PROMO, PRICE_REGULAR, DISCOUNT_PERCENT, PROMO_END_LABEL,
} from '../../config/promo';
import styles from './Pricing.module.css';

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  { text: 'Processos e clientes ilimitados' },
  { text: 'Agenda com Google Calendar sync' },
  { text: 'Dashboard financeiro completo' },
  { text: 'Documentos, modelos e procurações' },
  { text: 'Importação e exportação via Excel' },
  { text: 'Organização em pastas e kanban' },
  { text: 'Publicações por OAB, 24h, sem custo extra', bold: true },
  { text: 'Armazenamento ilimitado na nuvem', bold: true },
  { text: 'Suporte VIP prioritário', bold: true },
  { text: 'Modo Imobiliário incluso', bold: true },
];

const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.from(`.${styles.header}`, {
      opacity: 0, y: 30, duration: 0.8,
      scrollTrigger: { trigger: `.${styles.header}`, start: 'top 85%' },
    });
    gsap.from(`.${styles.card}`, {
      opacity: 0, y: 40, scale: 0.97, duration: 0.8,
      scrollTrigger: { trigger: `.${styles.card}`, start: 'top 85%' },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="preco" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.tagline}>Oferta de Black Friday</p>
          <h2 className={styles.title}>
            Um plano. <em>Tudo incluído.</em><br />Preço de Black Friday.
          </h2>
          <p className={styles.description}>
            Todos os módulos liberados desde o primeiro dia. Sem taxa de adesão e sem fidelidade.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardGlow} aria-hidden="true" />

          <div className={styles.left}>
            <span className={styles.badge}><Flame size={13} aria-hidden="true" /> Black Friday · até {PROMO_END_LABEL}</span>

            <div className={styles.priceBlock}>
              <div className={styles.oldRow}>
                <s className={styles.old}>{PRICE_REGULAR.full}/mês</s>
                <span className={styles.off}>-{DISCOUNT_PERCENT}%</span>
              </div>
              <div className={styles.priceRow}>
                <span className={styles.currency}>R$</span>
                <span className={styles.amount}>{PRICE_PROMO.whole}</span>
                <span className={styles.cents}>{PRICE_PROMO.cents}</span>
              </div>
              <p className={styles.period}>na 1ª mensalidade</p>
              <p className={styles.after}>
                Depois <strong>{PRICE_REGULAR.full}/mês</strong>. Cancele quando quiser.
              </p>
            </div>

            <div className={styles.timer}>
              <span>A oferta acaba em</span>
              <Countdown size="compact" />
            </div>

            <a href={REGISTER_URL} className={styles.cta}>
              <Rocket size={18} aria-hidden="true" /> Garantir oferta · 7 dias grátis
            </a>
            <p className={styles.foot}>Sem cartão para ativar. Cancele quando quiser.</p>
          </div>

          <div className={styles.right}>
            <h3 className={styles.listTitle}>O que está incluído</h3>
            <ul className={styles.list}>
              {BENEFITS.map((b, i) => (
                <li key={b.text} className={b.bold ? styles.listBold : ''} data-reveal="left" data-reveal-delay={0.25 + i * 0.07}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
