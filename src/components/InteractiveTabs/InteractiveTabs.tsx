import React, { useState } from 'react';
import {
  Calendar, FolderOpen, Wallet, Newspaper, CheckSquare, LayoutDashboard, Calculator, Mail,
} from 'lucide-react';
import { AppWindow, type ScreenId } from '../SystemUI/SystemUI';
import styles from './InteractiveTabs.module.css';

interface TabData {
  id: ScreenId;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  highlight?: boolean;
  isNew?: boolean;
}

const TABS: TabData[] = [
  { id: 'painel', title: 'Painel Geral', shortDesc: 'Clientes, prazos e compromissos num relance', icon: LayoutDashboard },
  { id: 'previdenciario', title: 'Análise Previdenciária', shortDesc: 'CNIS, carência e cálculo da RMI', icon: Calculator, isNew: true },
  { id: 'emails', title: 'E-mails Exclusivos', shortDesc: 'Um endereço para cada cliente', icon: Mail, isNew: true },
  { id: 'processos', title: 'Processos', shortDesc: 'Busca, filtros e status de cada caso', icon: FolderOpen },
  { id: 'agenda', title: 'Agenda', shortDesc: 'Audiências e perícias no Google Agenda', icon: Calendar },
  { id: 'financeiro', title: 'Financeiro', shortDesc: 'Honorários, parcelas e faturamento', icon: Wallet },
  { id: 'publicacoes', title: 'Publicações por OAB', shortDesc: 'Monitoramento 24h, sem custo extra', icon: Newspaper, highlight: true },
  { id: 'tarefas', title: 'Tarefas', shortDesc: 'Kanban para a rotina da equipe', icon: CheckSquare },
];

const InteractiveTabs: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  return (
    <section id="demo" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header} data-reveal="up">
          <p className={styles.tagline}>Veja em ação</p>
          <h2 className={styles.title}>
            Um sistema desenhado<br />para a <em>rotina do advogado.</em>
          </h2>
          <p className={styles.description}>
            Navegue pelas telas do GestProTech. Passe o mouse para pausar a troca automática.
          </p>
        </div>

        <div
          className={styles.layout}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className={styles.tabsList} data-reveal="left" data-reveal-delay="0.1" role="tablist" aria-label="Telas do sistema" aria-orientation="vertical">
            {TABS.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = active === idx;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                  onClick={() => setActive(idx)}
                >
                  <span className={`${styles.tabIcon} ${tab.highlight || tab.isNew ? styles.tabIconHot : ''}`}>
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className={styles.tabText}>
                    <span className={styles.tTitle}>
                      {tab.title}
                      {tab.highlight && <span className={styles.freeTag}>Grátis</span>}
                      {tab.isNew && <span className={styles.newTag}>Novo</span>}
                    </span>
                    <span className={styles.tDesc}>{tab.shortDesc}</span>
                  </span>
                  {isActive && !reduced && (
                    <span
                      key={active}
                      className={styles.tabProgress}
                      style={{ animationPlayState: paused ? 'paused' : 'running' }}
                      onAnimationEnd={() => setActive((a) => (a + 1) % TABS.length)}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className={styles.preview} data-reveal="right" data-reveal-delay="0.2" role="tabpanel">
            <AppWindow screen={TABS[active].id} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTabs;
