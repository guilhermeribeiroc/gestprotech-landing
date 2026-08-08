import React, { useState, useEffect } from 'react';
import {
  Lock, Calendar, FolderOpen, BarChart3, Share2,
  FileSpreadsheet, CheckSquare, Newspaper
} from 'lucide-react';
import styles from './InteractiveTabs.module.css';

interface TabData {
  id: number;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  bgGrad: string;
  borderColor: string;
  image: string;
  highlight?: boolean;
}

const InteractiveTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);

  const tabs: TabData[] = [
    {
      id: 0,
      title: "Agenda",
      shortDesc: "Atendimentos e compromissos organizados",
      icon: Calendar,
      iconColor: "#0e7490",
      bgGrad: "linear-gradient(135deg, rgba(45,175,197,.14), rgba(45,175,197,.05))",
      borderColor: "rgba(45,175,197,.22)",
      image: "/screenshots/agenda.png"
    },
    {
      id: 1,
      title: "Processos",
      shortDesc: "Controle jurídico com prazos e status",
      icon: FolderOpen,
      iconColor: "#475569",
      bgGrad: "linear-gradient(135deg, rgba(71,85,105,.10), rgba(71,85,105,.03))",
      borderColor: "rgba(71,85,105,.18)",
      image: "/screenshots/processos-ativos.png"
    },
    {
      id: 2,
      title: "Financeiro",
      shortDesc: "Honorários, parcelas e faturamento",
      icon: BarChart3,
      iconColor: "#7c3aed",
      bgGrad: "linear-gradient(135deg, rgba(124,58,237,.11), rgba(124,58,237,.04))",
      borderColor: "rgba(124,58,237,.18)",
      image: "/screenshots/financeiro.png"
    },
    {
      id: 3,
      title: "Publicações por OAB",
      shortDesc: "Monitoramento automático 24h, sem custo extra",
      icon: Newspaper,
      iconColor: "#0e7490",
      bgGrad: "linear-gradient(135deg, rgba(45,175,197,.16), rgba(45,175,197,.05))",
      borderColor: "rgba(45,175,197,.28)",
      image: "/screenshots/publicacoes.jpg",
      highlight: true
    },
    {
      id: 4,
      title: "Tarefas",
      shortDesc: "Quadro kanban para a equipe",
      icon: CheckSquare,
      iconColor: "#7c3aed",
      bgGrad: "linear-gradient(135deg, rgba(124,58,237,.11), rgba(124,58,237,.04))",
      borderColor: "rgba(124,58,237,.18)",
      image: "/screenshots/tarefas.png"
    },
    {
      id: 5,
      title: "Parcerias",
      shortDesc: "Processos e repasses com outros advogados",
      icon: Share2,
      iconColor: "#b45309",
      bgGrad: "linear-gradient(135deg, rgba(245,158,11,.12), rgba(245,158,11,.05))",
      borderColor: "rgba(245,158,11,.2)",
      image: "/screenshots/parcerias.png"
    },
    {
      id: 6,
      title: "Modelos de Documentos",
      shortDesc: "Procurações e contratos gerados automaticamente",
      icon: FileSpreadsheet,
      iconColor: "#15803d",
      bgGrad: "linear-gradient(135deg, rgba(34,197,94,.11), rgba(34,197,94,.04))",
      borderColor: "rgba(34,197,94,.2)",
      image: "/screenshots/modelos-documentos.png"
    }
  ];

  // Sincronizador de 4 segundos
  useEffect(() => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
          return 0;
        }
        return prev + 1.25; // 1.25 * 80ms = 100ms
      });
    }, 50);

    return () => clearInterval(interval);
  }, [activeTab, tabs.length]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setProgress(0);
  };

  return (
    <section id="demo" className={styles.tabsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.tagline}>Veja em ação</p>
          <h2 className={styles.title}>
            Telas reais do sistema<br />que sua equipe vai usar.
          </h2>
          <p className={styles.description}>
            Clique nas abas e navegue pelas telas reais do GestProTech. A visualização muda automaticamente a cada 4 segundos.
          </p>
        </div>

        {/* Layout */}
        <div className={styles.layout}>
          {/* ABAS */}
          <div className={styles.tabsList}>
            {tabs.map((tab, idx) => {
              const IconComponent = tab.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''} ${tab.highlight ? styles.tabBtnHighlight : ''}`}
                  onClick={() => handleTabClick(idx)}
                >
                  <div
                    className={styles.tabIconWrapper}
                    style={{ background: tab.bgGrad, borderColor: tab.borderColor }}
                  >
                    <IconComponent size={18} color={tab.iconColor} />
                  </div>
                  <div>
                    <div className={styles.tTitle}>
                      {tab.title}
                      {tab.highlight && <span className={styles.freeTag}>Grátis</span>}
                    </div>
                    <div className={styles.tDesc}>{tab.shortDesc}</div>
                  </div>
                  {isActive && (
                    <div
                      className={styles.tabProgress}
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* PREVIEW */}
          <div className={styles.preview}>
            <div className={styles.appFrame}>
              {/* Browser Bar */}
              <div className={styles.browserBar}>
                <div className={styles.brDot} style={{ background: '#f87171' }}></div>
                <div className={styles.brDot} style={{ background: '#fbbf24' }}></div>
                <div className={styles.brDot} style={{ background: '#4ade80' }}></div>
                <div className={styles.urlBar}>
                  <Lock size={9} color="#94a3b8" />
                  <span className={styles.urlText}>gestprotech.com.br</span>
                </div>
              </div>

              {/* Screenshot */}
              <div className={styles.screenshotWrap}>
                {tabs.map((tab, idx) => (
                  <img
                    key={tab.id}
                    src={tab.image}
                    alt={`Tela de ${tab.title} do GestProTech`}
                    className={`${styles.screenshotImg} ${activeTab === idx ? styles.screenshotActive : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTabs;
