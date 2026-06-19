import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, CheckCircle2, Rocket, Trophy, Copy, Check } from 'lucide-react';
import styles from './Pricing.module.css';

gsap.registerPlugin(ScrollTrigger);

const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('COPA50');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  useGSAP(() => {
    // Fade-in para o cabeçalho
    gsap.from(sectionRef.current?.querySelector(`.${styles.header}`) as HTMLElement, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current?.querySelector(`.${styles.header}`) as HTMLElement,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });

    // Fade-in e scale sutil para o card de preço
    gsap.from(cardRef.current, {
      opacity: 0,
      scale: 0.96,
      y: 40,
      duration: 0.8,
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  }, { scope: sectionRef });

  const benefits = [
    { text: "Processos e clientes ilimitados", bold: false },
    { text: "Agenda com Google Calendar sync", bold: false },
    { text: "Dashboard financeiro completo", bold: false },
    { text: "Documentos, modelos e procurações", bold: false },
    { text: "Importação e exportação via Excel", bold: false },
    { text: "Organização em pastas e kanban", bold: false },
    { text: "Armazenamento ilimitado na nuvem", bold: true },
    { text: "Suporte VIP prioritário", bold: true },
    { text: "Modo Imobiliário incluso", bold: true }
  ];

  return (
    <section ref={sectionRef} id="preco" className={styles.pricingSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.tagline}>Preço simples e justo</p>
          <h2 className={styles.title}>
            Tudo incluído.<br />Sem surpresas.
          </h2>
          <p className={styles.description}>
            Um único plano com acesso a todos os módulos — para o escritório que quer crescer sem limite.
          </p>
        </div>

        {/* Pricing Card */}
        <div className={styles.cardWrapper}>
          <div ref={cardRef} className={styles.priceCard}>

            {/* Ribbon Copa do Mundo */}
            <div className={styles.promoRibbon}>
              <Trophy size={12} /> Promoção Copa do Mundo 2026
            </div>

            {/* Badge */}
            <div className={styles.badgeWrapper}>
              <span className={styles.planBadge}>
                <Star size={11} fill="currentColor" /> Plano Completo — Todos os Módulos
              </span>
            </div>

            {/* Price Detail */}
            <div className={styles.priceHeader}>
              <div className={styles.originalPriceRow}>
                <span className={styles.originalPrice}>R$ 129,90/mês</span>
                <span className={styles.discountTag}>-50%</span>
              </div>
              <div className={styles.priceRow}>
                <span className={styles.currency}>R$</span>
                <span className={styles.amount}>64</span>
                <div className={styles.centRow}>
                  <span className={styles.cents}>,95</span>
                  <span className={styles.period}>1ª mensalidade</span>
                </div>
              </div>
              <p className={styles.dailyCost}>
                Depois, <strong className={styles.dailyCostHighlight}>R$ 129,90/mês</strong> — cancele quando quiser
              </p>

              <button
                className={styles.couponChip}
                onClick={handleCopy}
                type="button"
                aria-label="Copiar cupom COPA50"
              >
                <span className={styles.couponLabel}>Use o cupom no checkout</span>
                <span className={styles.couponCode}>{copied ? 'Copiado!' : 'COPA50'}</span>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>

            {/* Benefits List */}
            <div className={styles.bulletsList}>
              {benefits.map((benefit, idx) => (
                <div key={idx} className={styles.bulletItem}>
                  <CheckCircle2 size={16} className={styles.bulletIcon} />
                  {benefit.bold ? (
                    <span className={styles.boldText}>{benefit.text}</span>
                  ) : (
                    <span>{benefit.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA CTA */}
            <a 
              href="https://gestprotech.com.br/registrar/" 
              className={styles.ctaBtn}
            >
              <Rocket size={16} fill="currentColor" /> Começar Agora — 7 Dias Grátis
            </a>
            <p className={styles.footNote}>Sem cartão para ativar. Cancele quando quiser.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
