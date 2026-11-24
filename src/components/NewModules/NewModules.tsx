import React from 'react';
import { Calculator, Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { AppWindow, type ScreenId } from '../SystemUI/SystemUI';
import { REGISTER_URL } from '../../config/promo';
import styles from './NewModules.module.css';

interface Module {
  id: ScreenId;
  icon: React.ElementType;
  kicker: string;
  title: React.ReactNode;
  text: string;
  tags: string[];
  bullets: string[];
}

const MODULES: Module[] = [
  {
    id: 'previdenciario',
    icon: Calculator,
    kicker: 'Análise e cálculos previdenciários',
    title: <>Do CNIS à <em>RMI</em>, sem planilha paralela.</>,
    text: 'Analise o histórico do segurado e calcule o benefício dentro do próprio sistema. Veja qual regra rende mais antes de ajuizar.',
    tags: ['RMI', 'CNIS', 'Carência', 'Tempo de contribuição', 'Regras de transição'],
    bullets: [
      'Análise do CNIS: vínculos, tempo de contribuição e carência',
      'Cálculo da RMI com média salarial e coeficiente',
      'Comparação entre as regras de concessão e de transição',
      'Cálculos salvos no processo do cliente',
    ],
  },
  {
    id: 'emails',
    icon: Mail,
    kicker: 'E-mails exclusivos para o cliente',
    title: <>Um e-mail <em>exclusivo</em> para cada cliente.</>,
    text: 'Gere o endereço de e-mail de cada cliente em um clique e mantenha tudo organizado na ficha dele.',
    tags: ['Um clique', 'Padrão automático', 'Vinculado à ficha'],
    bullets: [
      'Gere o e-mail exclusivo de cada cliente em um clique',
      'Endereço padronizado a partir do nome do cliente',
      'Vinculado à ficha e aos processos',
      'Copie ou envie o endereço direto ao cliente',
    ],
  },
];

const NewModules: React.FC = () => (
  <section id="novidades" className={styles.section}>
    <div className={styles.container}>
      <div className={styles.header} data-reveal="up">
        <span className={styles.newBadge}><Sparkles size={13} aria-hidden="true" /> Novidades no GestProTech</span>
        <h2 className={styles.title}>
          Dois módulos novos para<br /><em>trabalhar menos e acertar mais.</em>
        </h2>
        <p className={styles.description}>
          Cálculos previdenciários e e-mails exclusivos por cliente, direto no sistema que você já usa.
        </p>
      </div>

      {MODULES.map((m, i) => {
        const Icon = m.icon;
        const reverse = i % 2 === 1;
        return (
          <article key={m.id} className={`${styles.block} ${reverse ? styles.reverse : ''}`}>
            <div className={styles.text} data-reveal={reverse ? 'right' : 'left'}>
              <span className={styles.kicker}>
                <span className={styles.kIcon}><Icon size={18} aria-hidden="true" /></span>
                {m.kicker}
                <b className={styles.novo}>Novo</b>
              </span>
              <h3 className={styles.h3}>{m.title}</h3>
              <p className={styles.p}>{m.text}</p>

              <div className={styles.tags}>
                {m.tags.map((t) => <span key={t}>{t}</span>)}
              </div>

              <ul className={styles.bullets}>
                {m.bullets.map((b) => (
                  <li key={b}><CheckCircle2 size={18} aria-hidden="true" /> {b}</li>
                ))}
              </ul>

              <a href={REGISTER_URL} className={styles.cta}>
                Testar grátis por 7 dias <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <div className={styles.visual} data-reveal={reverse ? 'left' : 'right'} data-reveal-delay="0.12">
              <div className={styles.glow} aria-hidden="true" />
              <AppWindow screen={m.id} single />
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

export default NewModules;
