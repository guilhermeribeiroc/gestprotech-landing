import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, CheckCircle2, Rocket } from 'lucide-react';
import styles from './Pricing.module.css';

gsap.registerPlugin(ScrollTrigger);

const Pricing: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
            
            {/* Badge */}
            <div className={styles.badgeWrapper}>
              <span className={styles.planBadge}>
                <Star size={11} fill="currentColor" /> Plano Completo — Todos os Módulos
              </span>
            </div>

            {/* Price Detail */}
            <div className={styles.priceHeader}>
              <div className={styles.priceRow}>
                <span className={styles.currency}>R$</span>
                <span className={styles.amount}>129</span>
                <div className={styles.centRow}>
                  <span className={styles.cents}>,90</span>
                  <span className={styles.period}>/mês</span>
                </div>
              </div>
              <p className={styles.dailyCost}>
                Equivale a <strong className={styles.dailyCostHighlight}>R$ 4,33/dia</strong> pelo controle total
              </p>
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
