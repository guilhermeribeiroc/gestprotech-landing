import React from 'react';
import { CheckCircle2, Rocket, Flame, Lock, Users, Gift } from 'lucide-react';
import Countdown from '../Countdown/Countdown';
import {
  REGISTER_URL, PLANS, PRICE_LIST, PRICE_MONTHLY, PRICE_UNDER, PROMO_END_LABEL, SLOTS, LOCK_HOURS, TRIAL_DAYS,
} from '../../config/promo';
import styles from './Pricing.module.css';

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
  return (
    <section id="preco" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header} data-reveal="up">
          <p className={styles.tagline}>Oferta de Black Friday</p>
          <h2 className={styles.title}>
            Escolha seu plano.<br />Por <em>menos de {PRICE_UNDER}</em> ao mês.
          </h2>
          <p className={styles.description}>
            Preço de Black Friday no anual à vista, com todos os módulos liberados desde o primeiro dia e sem taxa de adesão.
            Comece com {TRIAL_DAYS} dias grátis.
          </p>
        </div>

        <div className={styles.urgency} data-reveal="up" data-reveal-delay={0.1}>
          <div className={styles.urgencyTimer}>
            <span>A oferta acaba em</span>
            <Countdown size="compact" />
          </div>
          <ul className={styles.rules}>
            <li><Users size={16} aria-hidden="true" /> <span><strong>{SLOTS} vagas</strong> para clientes novos</span></li>
            <li><Lock size={16} aria-hidden="true" /> <span>Preço travado por <strong>{LOCK_HOURS} horas</strong> ao reservar</span></li>
          </ul>
        </div>

        <div className={styles.plans}>
          {PLANS.map((p, i) => (
            <article
              key={p.id}
              className={`${styles.plan} ${p.featured ? styles.featured : ''}`}
              data-reveal="up"
              data-reveal-delay={0.15 + i * 0.12}
            >
              {p.featured && <div className={styles.glow} aria-hidden="true" />}
              <div className={styles.planTop}>
                <h3 className={styles.planName}>Plano {p.name}</h3>
                {p.featured
                  ? <span className={styles.badge}><Flame size={13} aria-hidden="true" /> Melhor oferta</span>
                  : <span className={styles.badgeSoft}>Black Friday</span>}
              </div>

              <div className={styles.option}>
                <span className={styles.optLabel}>À vista · pagamento único</span>
                <div className={styles.oldRow}>
                  <s className={styles.old}>{PRICE_LIST.full}/mês</s>
                  <span className={styles.off}>-{p.off}%</span>
                </div>
                <div className={styles.priceRow}>
                  <span className={styles.currency}>R$</span>
                  <span className={styles.amount}>{p.equivWhole}</span>
                  {p.equivCents && <span className={styles.cents}>{p.equivCents}</span>}
                  <span className={styles.per}>/mês</span>
                </div>
                {p.underHundred && <span className={styles.under}>Menos de {PRICE_UNDER} por mês</span>}
                <p className={styles.equiv}>Total de <strong>{p.cash.full}</strong> à vista (Pix, boleto ou cartão)</p>
              </div>

              {p.installments ? (
                <>
                  <div className={styles.or}><span>ou</span></div>
                  <div className={styles.option}>
                    <span className={styles.optLabel}>
                      Parcelado no Pix ou boleto · fidelidade de {p.installments.lockMonths} meses
                    </span>
                    <div className={styles.monthlyRow}>
                      <span className={styles.mAmount}>{p.installments.count}x</span>
                      <span className={styles.mCurrency}>{p.installments.value}</span>
                    </div>
                    <p className={styles.equiv}>Total de <strong>{p.installments.total}</strong></p>
                  </div>
                </>
              ) : null}

              {p.perks && (
                <ul className={styles.perks}>
                  {p.perks.map((perk) => (
                    <li key={perk}><Gift size={15} aria-hidden="true" /> {perk}</li>
                  ))}
                </ul>
              )}

              <a href={REGISTER_URL} className={p.featured ? styles.cta : styles.ctaAlt}>
                <Rocket size={17} aria-hidden="true" /> Garantir plano {p.name.toLowerCase()}
              </a>
            </article>
          ))}
        </div>

        <p className={styles.note} data-reveal="fade">
          Oferta válida até {PROMO_END_LABEL}. Plano mensal sem contrato: {PRICE_MONTHLY.full}/mês.
          Quem já é cliente mantém o valor atual.
        </p>

        <div className={styles.included} data-reveal="up">
          <h3 className={styles.listTitle}>Incluído em todos os planos</h3>
          <ul className={styles.list}>
            {BENEFITS.map((b, i) => (
              <li key={b.text} className={b.bold ? styles.listBold : ''} data-reveal="left" data-reveal-delay={0.05 + i * 0.05}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
