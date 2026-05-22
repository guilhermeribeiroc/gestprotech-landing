import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, Calendar, FolderOpen, BarChart3, Users, Share2, 
  Kanban, PieChart, Plus, Search, FileText, CheckCircle2, 
  Bell, FileSpreadsheet, Home, ArrowUp, Clock, HelpCircle, 
  ExternalLink, FileWarning, Settings, HardDrive
} from 'lucide-react';
import styles from './InteractiveTabs.module.css';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" style={{ flexShrink: 0 }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

interface TabData {
  id: number;
  title: string;
  shortDesc: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  bgGrad: string;
  borderColor: string;
  sidebarId: string;
}

const InteractiveTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<number>(0);

  // Sincronizador de 4 segundos
  useEffect(() => {
    setProgress(0);
    progressRef.current = 0;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((prevTab) => (prevTab + 1) % 7);
          return 0;
        }
        return prev + 1.25; // 1.25 * 80ms = 100ms
      });
    }, 50);

    return () => clearInterval(interval);
  }, [activeTab]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setProgress(0);
  };

  const tabs: TabData[] = [
    {
      id: 0,
      title: "Agenda",
      shortDesc: "Atendimentos e compromissos organizados",
      icon: Calendar,
      iconColor: "#14b8a6",
      bgGrad: "linear-gradient(135deg, rgba(45,212,191,.15), rgba(45,212,191,.07))",
      borderColor: "rgba(45,212,191,.25)",
      sidebarId: "agenda"
    },
    {
      id: 1,
      title: "Processos",
      shortDesc: "Controle jurídico com prazos e status",
      icon: FolderOpen,
      iconColor: "#94a3b8",
      bgGrad: "linear-gradient(135deg, rgba(148,163,184,.12), rgba(148,163,184,.05))",
      borderColor: "rgba(148,163,184,.18)",
      sidebarId: "processos"
    },
    {
      id: 2,
      title: "Financeiro",
      shortDesc: "Honorários, parcelas e faturamento",
      icon: BarChart3,
      iconColor: "#7c3aed",
      bgGrad: "linear-gradient(135deg, rgba(124,58,237,.11), rgba(124,58,237,.05))",
      borderColor: "rgba(124,58,237,.18)",
      sidebarId: "financeiro"
    },
    {
      id: 3,
      title: "Parcerias & Excel",
      shortDesc: "Parceiros, repasses e importação em massa",
      icon: Share2,
      iconColor: "#f59e0b",
      bgGrad: "linear-gradient(135deg, rgba(245,158,11,.12), rgba(245,158,11,.06))",
      borderColor: "rgba(245,158,11,.20)",
      sidebarId: "parcerias"
    },
    {
      id: 4,
      title: "Ficha do Cliente",
      shortDesc: "Dados, processos e histórico completo",
      icon: Users,
      iconColor: "#14b8a6",
      bgGrad: "linear-gradient(135deg, rgba(45,212,191,.12), rgba(45,212,191,.05))",
      borderColor: "rgba(45,212,191,.20)",
      sidebarId: "clientes"
    },
    {
      id: 5,
      title: "Organização",
      shortDesc: "Pastas coloridas e kanban de processos",
      icon: Kanban,
      iconColor: "#3b82f6",
      bgGrad: "linear-gradient(135deg, rgba(59,130,246,.12), rgba(59,130,246,.05))",
      borderColor: "rgba(59,130,246,.20)",
      sidebarId: "organizacao"
    },
    {
      id: 6,
      title: "Estatísticas",
      shortDesc: "Gráficos, totais e análise do escritório",
      icon: PieChart,
      iconColor: "#7c3aed",
      bgGrad: "linear-gradient(135deg, rgba(124,58,237,.12), rgba(124,58,237,.05))",
      borderColor: "rgba(124,58,237,.18)",
      sidebarId: "estatisticas"
    }
  ];

  return (
    <section id="demo" className={styles.tabsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.tagline}>Veja em ação</p>
          <h2 className={styles.title}>
            Explore cada módulo<br />do sistema ao vivo.
          </h2>
          <p className={styles.description}>
            Clique nas abas e navegue pelas telas reais do GestProTech. A interface muda automaticamente a cada 4 segundos.
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
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                  onClick={() => handleTabClick(idx)}
                >
                  <div 
                    className={styles.tabIconWrapper} 
                    style={{ background: tab.bgGrad, borderColor: tab.borderColor }}
                  >
                    <IconComponent size={18} color={tab.iconColor} />
                  </div>
                  <div>
                    <div className={styles.tTitle}>{tab.title}</div>
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

              {/* Workspace */}
              <div className={styles.sysWrap}>
                {/* Simulated Sidebar */}
                <div className={styles.sidebar}>
                  <div className={styles.sbLogo}>
                    <img src="/LOGOGEST.png" alt="logo" className={styles.sbLogoImg} />
                    <span className={styles.sbLogoText}>GESTPRO</span>
                  </div>
                  <div className={`${styles.sbItem} ${activeTab === 0 ? styles.sbItemActive : ''}`}>
                    <Calendar size={13} className={styles.sbIcon} />
                    <span className={styles.sbText}>Agenda</span>
                  </div>
                  <div className={`${styles.sbItem} ${activeTab === 1 ? styles.sbItemActive : ''}`}>
                    <FolderOpen size={13} className={styles.sbIcon} />
                    <span className={styles.sbText}>Processos</span>
                  </div>
                  <div className={`${styles.sbItem} ${activeTab === 2 ? styles.sbItemActive : ''}`}>
                    <BarChart3 size={13} className={styles.sbIcon} />
                    <span className={styles.sbText}>Financeiro</span>
                  </div>
                  <div className={`${styles.sbItem} ${activeTab === 4 ? styles.sbItemActive : ''}`}>
                    <Users size={13} className={styles.sbIcon} />
                    <span className={styles.sbText}>Clientes</span>
                  </div>
                  <div className={`${styles.sbItem} ${activeTab === 3 ? styles.sbItemActive : ''}`}>
                    <Share2 size={13} className={styles.sbIcon} />
                    <span className={styles.sbText}>Parcerias</span>
                  </div>
                  <div className={`${styles.sbItem} ${activeTab === 5 ? styles.sbItemActive : ''}`}>
                    <Kanban size={13} className={styles.sbIcon} />
                    <span className={styles.sbText}>Organização</span>
                  </div>
                  <div className={`${styles.sbItem} ${activeTab === 6 ? styles.sbItemActive : ''}`}>
                    <PieChart size={13} className={styles.sbIcon} />
                    <span className={styles.sbText}>Estatísticas</span>
                  </div>
                  <div className={styles.sbItem} style={{ marginTop: 'auto' }}>
                    <Settings size={13} className={styles.sbIcon} />
                    <span className={styles.sbText}>Config.</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className={styles.content}>
                  
                  {/* PANEL 0: AGENDA */}
                  <div className={`${styles.panel} ${activeTab === 0 ? styles.panelActive : ''}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <h3 className={styles.panelTitle}>Agenda / Atendimentos</h3>
                        <p className={styles.panelSubtitle}>Maio 2026 • Sincronizado com Google Agenda ✓</p>
                      </div>
                      <button className={styles.btnAction}>+ Novo Agendamento</button>
                    </div>

                    <div className={styles.pillsRow}>
                      <span className={styles.pill} style={{ background: '#0f2440', color: '#fff' }}>Todos (8)</span>
                      <span className={styles.pill} style={{ background: '#dcfce7', color: '#15803d' }}>Agendados (5)</span>
                      <span className={styles.pill} style={{ background: '#f1f5f9', color: '#64748b' }}>Encerrados (3)</span>
                    </div>

                    <div className={styles.alertBanner} style={{ background: '#f0fdf4', borderColor: '#86efac', color: '#15803d', marginBottom: '10px' }}>
                      <GoogleIcon />
                      <span style={{ fontSize: '0.66rem', fontWeight: 600 }}>Google Agenda conectado • eventos sincronizados automaticamente</span>
                      <span className={styles.badge} style={{ background: '#86efac', color: '#15803d', marginLeft: 'auto' }}>ATIVO</span>
                    </div>

                    <div className={styles.secLabel}>Hoje — Terça, 20 de Maio</div>
                    
                    <div className={styles.eventCard}>
                      <div className={styles.eventIndicator} style={{ background: '#2dd4bf' }} />
                      <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #0f2440, #133050)', color: '#2dd4bf' }}>JS</div>
                      <div className={styles.eventDetails}>
                        <div className={styles.eventName}>João M. Silva — Audiência Trabalhista</div>
                        <div className={styles.eventMeta}>09:00 • Presencial • TRT 7ª Região • Sala 12</div>
                      </div>
                      <span className={`${styles.badge} ${styles.badgeSuccess}`}>Confirmado</span>
                    </div>

                    <div className={styles.eventCard}>
                      <div className={styles.eventIndicator} style={{ background: '#7c3aed' }} />
                      <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #6d28d9, #7c3aed)' }}>MS</div>
                      <div className={styles.eventDetails}>
                        <div className={styles.eventName}>Maria Santos — Perícia Médica INSS</div>
                        <div className={styles.eventMeta}>14:30 • Presencial • Agência INSS Centro • Proc. #0138</div>
                      </div>
                      <span className={`${styles.badge} ${styles.badgeWarning}`}>Pendente</span>
                    </div>

                    <div className={styles.eventCard}>
                      <div className={styles.eventIndicator} style={{ background: '#f59e0b' }} />
                      <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #92400e, #b45309)' }}>CP</div>
                      <div className={styles.eventDetails}>
                        <div className={styles.eventName}>Carlos Pereira — Consulta Inicial</div>
                        <div className={styles.eventMeta}>16:00 • Online • Videochamada • Assunto: Previdenciário</div>
                      </div>
                      <span className={`${styles.badge} ${styles.badgeSuccess}`}>Confirmado</span>
                    </div>
                  </div>

                  {/* PANEL 1: PROCESSOS */}
                  <div className={`${styles.panel} ${activeTab === 1 ? styles.panelActive : ''}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <h3 className={styles.panelTitle}>Processos Ativos <span style={{ color: '#2dd4bf' }}>(47)</span></h3>
                        <p className={styles.panelSubtitle}>3 processos urgentes • 2 prazos vencendo hoje</p>
                      </div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '5px 10px', fontSize: '0.62rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Search size={10} /> Buscar
                        </div>
                        <button className={styles.btnAction}>+ Novo Processo</button>
                      </div>
                    </div>

                    <div className={styles.pillsRow}>
                      <span className={styles.pill} style={{ background: '#0f2440', color: '#fff' }}>Todos (47)</span>
                      <span className={styles.pill} style={{ background: '#fee2e2', color: '#b91c1c' }}>🔴 Urgentes (3)</span>
                      <span className={styles.pill} style={{ background: '#fef3c7', color: '#b45309' }}>⚠️ Atenção (9)</span>
                      <span className={styles.pill} style={{ background: '#dcfce7', color: '#15803d' }}>✓ Em dia (35)</span>
                    </div>

                    <div className={`${styles.dataRow} ${styles.tableHeader}`}>
                      <span style={{ flex: 1.6 }}>Cliente</span>
                      <span style={{ flex: 1.2 }}>Nº / Área</span>
                      <span style={{ flex: 0.9 }}>Status</span>
                      <span style={{ flex: 0.7 }}>Prazo</span>
                      <span style={{ flex: 0.6 }}>Esfera</span>
                    </div>

                    <div className={styles.dataRow} style={{ background: '#fff5f5', borderLeft: '3px solid #ef4444', borderRadius: '0 8px 8px 0' }}>
                      <span style={{ flex: 1.6, fontWeight: 700, color: '#0f2440' }}>João M. Silva</span>
                      <span style={{ flex: 1.2, color: '#64748b', fontSize: '0.65rem' }}>#0001 • Previdenciário</span>
                      <span style={{ flex: 0.9 }}><span className={`${styles.badge} ${styles.badgeDanger}`}>Urgente</span></span>
                      <span style={{ flex: 0.7, color: '#b91c1c', fontWeight: 700 }}>2 dias</span>
                      <span style={{ flex: 0.6, color: '#64748b', fontSize: '0.62rem' }}>Judicial</span>
                    </div>

                    <div className={styles.dataRow} style={{ background: '#fffbeb', borderLeft: '3px solid #f59e0b', borderRadius: '0 8px 8px 0' }}>
                      <span style={{ flex: 1.6, fontWeight: 700, color: '#0f2440' }}>Maria Santos</span>
                      <span style={{ flex: 1.2, color: '#64748b', fontSize: '0.65rem' }}>#0002 • Trabalhista</span>
                      <span style={{ flex: 0.9 }}><span className={`${styles.badge} ${styles.badgeWarning}`}>Atenção</span></span>
                      <span style={{ flex: 0.7, color: '#b45309', fontWeight: 700 }}>7 dias</span>
                      <span style={{ flex: 0.6, color: '#64748b', fontSize: '0.62rem' }}>Judicial</span>
                    </div>

                    <div className={styles.dataRow}>
                      <span style={{ flex: 1.6, fontWeight: 700, color: '#0f2440' }}>Carlos Pereira</span>
                      <span style={{ flex: 1.2, color: '#64748b', fontSize: '0.65rem' }}>#0003 • Civil</span>
                      <span style={{ flex: 0.9 }}><span className={`${styles.badge} ${styles.badgeSuccess}`}>Em dia</span></span>
                      <span style={{ flex: 0.7, color: '#15803d', fontWeight: 700 }}>18 dias</span>
                      <span style={{ flex: 0.6, color: '#64748b', fontSize: '0.62rem' }}>Administ.</span>
                    </div>

                    <div className={styles.dataRow}>
                      <span style={{ flex: 1.6, fontWeight: 700, color: '#0f2440' }}>Ana Rodrigues</span>
                      <span style={{ flex: 1.2, color: '#64748b', fontSize: '0.65rem' }}>#0004 • Família</span>
                      <span style={{ flex: 0.9 }}><span className={`${styles.badge} ${styles.badgeSuccess}`}>Em dia</span></span>
                      <span style={{ flex: 0.7, color: '#15803d', fontWeight: 700 }}>30 dias</span>
                      <span style={{ flex: 0.6, color: '#64748b', fontSize: '0.62rem' }}>Judicial</span>
                    </div>

                    <div style={{ textAlign: 'center', padding: '6px', fontSize: '0.62rem', color: '#94a3b8', fontWeight: 500 }}>
                      ••• mais 41 processos •••
                    </div>
                  </div>

                  {/* PANEL 2: FINANCEIRO */}
                  <div className={`${styles.panel} ${activeTab === 2 ? styles.panelActive : ''}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <h3 className={styles.panelTitle}>Dashboard Financeiro</h3>
                        <p className={styles.panelSubtitle}>Maio 2026 • atualizado agora</p>
                      </div>
                      <button className={styles.btnAction} style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', border: '1px solid rgba(124,58,237,.25)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FileText size={11} /> Relatório PDF
                      </button>
                    </div>

                    <div className={styles.kpiGrid}>
                      <div className={styles.kpiCard} style={{ borderColor: 'rgba(45, 212, 191, 0.3)' }}>
                        <div className={styles.kpiLabel}>Recebido (mês)</div>
                        <div className={styles.kpiValue} style={{ color: '#0d9488' }}>R$ 12.450</div>
                        <div className={styles.kpiTrend}>
                          <ArrowUp size={8} style={{ marginRight: '1px' }} /> +18% vs Abril
                        </div>
                      </div>
                      <div className={styles.kpiCard}>
                        <div className={styles.kpiLabel}>Honorários Pend.</div>
                        <div className={styles.kpiValue} style={{ color: '#b45309' }}>R$ 3.200</div>
                        <div style={{ fontSize: '0.55rem', color: '#64748b', marginTop: '2px' }}>4 em aberto</div>
                      </div>
                      <div className={styles.kpiCard} style={{ borderColor: 'rgba(124, 58, 237, 0.2)' }}>
                        <div className={styles.kpiLabel}>Acordos Ativos</div>
                        <div className={styles.kpiValue} style={{ color: '#7c3aed' }}>R$ 48.900</div>
                        <div style={{ fontSize: '0.55rem', color: '#64748b', marginTop: '2px' }}>12 em andamento</div>
                      </div>
                    </div>

                    <div className={styles.barChartContainer}>
                      <div className={styles.barChartTitleRow}>
                        <span className={styles.barChartTitle}>Faturamento Mensal 2026</span>
                        <span className={styles.barChartMeta}>Meta: R$ 15.000</span>
                      </div>
                      <div className={styles.barChartBars}>
                        <div className={styles.barWrapper}>
                          <div className={styles.barFill} style={{ height: '38px', opacity: 0.5 }} />
                          <span className={styles.barLabel}>Jan</span>
                        </div>
                        <div className={styles.barWrapper}>
                          <div className={styles.barFill} style={{ height: '50px', opacity: 0.58 }} />
                          <span className={styles.barLabel}>Fev</span>
                        </div>
                        <div className={styles.barWrapper}>
                          <div className={styles.barFill} style={{ height: '43px', opacity: 0.65 }} />
                          <span className={styles.barLabel}>Mar</span>
                        </div>
                        <div className={styles.barWrapper}>
                          <div className={styles.barFill} style={{ height: '61px', opacity: 0.75 }} />
                          <span className={styles.barLabel}>Abr</span>
                        </div>
                        <div className={styles.barWrapper}>
                          <div className={styles.barFill} style={{ height: '72px', boxShadow: '0 0 10px rgba(45,212,191,.35)' }} />
                          <span className={styles.barLabel} style={{ color: '#2dd4bf', fontWeight: 'bold' }}>Mai ➔</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.secLabel}>Parcelas Recentes</div>
                    <div className={styles.dataRow}>
                      <span style={{ flex: 1.5, fontWeight: 700, color: '#0f2440' }}>João M. Silva</span>
                      <span style={{ flex: 1, color: '#64748b', fontSize: '0.62rem' }}>Parcela 3/6</span>
                      <span style={{ flex: 1, color: '#0d9488', fontWeight: 700 }}>+ R$ 850,00</span>
                      <span className={`${styles.badge} ${styles.badgeSuccess}`}>Pago</span>
                    </div>
                    <div className={styles.dataRow}>
                      <span style={{ flex: 1.5, fontWeight: 700, color: '#0f2440' }}>Maria Santos</span>
                      <span style={{ flex: 1, color: '#64748b', fontSize: '0.62rem' }}>Honorários</span>
                      <span style={{ flex: 1, color: '#0d9488', fontWeight: 700 }}>+ R$ 2.400,00</span>
                      <span className={`${styles.badge} ${styles.badgeSuccess}`}>Pago</span>
                    </div>
                  </div>

                  {/* PANEL 3: PARCERIAS & EXCEL */}
                  <div className={`${styles.panel} ${activeTab === 3 ? styles.panelActive : ''}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <h3 className={styles.panelTitle}>Parcerias & Importação</h3>
                        <p className={styles.panelSubtitle}>20 processos em parceria • 2 parceiros ativos</p>
                      </div>
                    </div>

                    <div className={styles.excelBox}>
                      <div className={styles.excelIconBox}>
                        <FileSpreadsheet size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#15803d' }}>Importar Processos via Excel</div>
                        <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '2px' }}>Arraste o arquivo ou clique • Centenas de processos em segundos</div>
                      </div>
                      <button className={styles.excelBtn}>Selecionar</button>
                    </div>

                    <div className={styles.kpiGrid}>
                      <div className={styles.kpiCard}>
                        <div className={styles.kpiLabel}>Em Parceria</div>
                        <div className={styles.kpiValue}>20</div>
                      </div>
                      <div className={styles.kpiCard} style={{ borderColor: 'rgba(45, 212, 191, 0.25)' }}>
                        <div className={styles.kpiLabel}>Repassado</div>
                        <div className={styles.kpiValue} style={{ color: '#0d9488' }}>R$ 7.000</div>
                      </div>
                      <div className={styles.kpiCard}>
                        <div className={styles.kpiLabel}>Parceiros</div>
                        <div className={styles.kpiValue}>2</div>
                      </div>
                    </div>

                    <div className={styles.secLabel}>Parceiros Ativos</div>
                    
                    <div className={styles.eventCard}>
                      <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #0f2440, #133050)', color: '#2dd4bf' }}>MA</div>
                      <div className={styles.eventDetails}>
                        <div className={styles.eventName} style={{ fontSize: '0.74rem' }}>Dr. Marcos Andrade</div>
                        <div className={styles.eventMeta}>12 processos • 30% de indicação</div>
                      </div>
                      <div style={{ textAlign: 'right', marginRight: '8px' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0d9488' }}>R$ 4.200</div>
                        <div style={{ fontSize: '0.58rem', color: '#94a3b8' }}>repassado</div>
                      </div>
                      <span className={`${styles.badge} ${styles.badgeSuccess}`}>Ativo</span>
                    </div>

                    <div className={styles.eventCard}>
                      <div className={styles.avatar} style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: '#fff' }}>CF</div>
                      <div className={styles.eventDetails}>
                        <div className={styles.eventName} style={{ fontSize: '0.74rem' }}>Dra. Carla Fonseca</div>
                        <div className={styles.eventMeta}>8 processos • 25% de indicação</div>
                      </div>
                      <div style={{ textAlign: 'right', marginRight: '8px' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0d9488' }}>R$ 2.800</div>
                        <div style={{ fontSize: '0.58rem', color: '#94a3b8' }}>repassado</div>
                      </div>
                      <span className={`${styles.badge} ${styles.badgeSuccess}`}>Ativo</span>
                    </div>
                  </div>

                  {/* PANEL 4: FICHA DO CLIENTE */}
                  <div className={`${styles.panel} ${activeTab === 4 ? styles.panelActive : ''}`}>
                    <div className={styles.clientHeaderCard}>
                      <div className={styles.clientAvatar}>AR</div>
                      <div className={styles.eventDetails}>
                        <h3 className={styles.panelTitle} style={{ fontSize: '0.88rem' }}>Ana Rodrigues</h3>
                        <p className={styles.panelSubtitle}>Cliente desde Jan/2025 • 2 processos ativos</p>
                      </div>
                      <span className={`${styles.badge} ${styles.badgeSuccess}`} style={{ padding: '4px 11px' }}>Ativa</span>
                      <button className={styles.btnAction} style={{ background: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' }}>Editar</button>
                    </div>

                    <div className={styles.dataGrid}>
                      <div className={styles.dataItem}>
                        <span className={styles.dataLabel}>CPF</span>
                        <div className={styles.dataValue}>412.756.389-02</div>
                      </div>
                      <div className={styles.dataItem}>
                        <span className={styles.dataLabel}>Nascimento</span>
                        <div className={styles.dataValue}>14/03/1982 (43 anos)</div>
                      </div>
                      <div className={styles.dataItem}>
                        <span className={styles.dataLabel}>Estado Civil</span>
                        <div className={styles.dataValue}>Casada</div>
                      </div>
                      <div className={styles.dataItem}>
                        <span className={styles.dataLabel}>Profissão</span>
                        <div className={styles.dataValue}>Professora</div>
                      </div>
                      <div className={`${styles.dataItem} ${styles.dataItemFull}`}>
                        <span className={styles.dataLabel}>Endereço</span>
                        <div className={styles.dataValue}>Rua das Flores, 142, Centro — Fortaleza/CE</div>
                      </div>
                    </div>

                    <div className={styles.timelineBox}>
                      <span className={styles.secLabel} style={{ marginTop: 0, marginBottom: '6px', display: 'block' }}>Histórico de Atendimentos</span>
                      <div className={styles.timelineItem} style={{ background: '#f0fdfa', borderLeft: '3px solid #2dd4bf' }}>
                        <span className={styles.timelineDate}>21/05/2026</span>
                        <span className={styles.timelineText}>Atendimento realizado. Cliente entregou documentos de perícia. Protocolo no INSS.</span>
                      </div>
                      <div className={styles.timelineItem} style={{ background: '#f8fafc', borderLeft: '3px solid #e2e8f0' }}>
                        <span className={styles.timelineDate}>10/05/2026</span>
                        <span className={styles.timelineText}>Ligação: confirmou presença na audiência de 20/05. Sem pendências.</span>
                      </div>
                    </div>
                  </div>

                  {/* PANEL 5: ORGANIZAÇÃO */}
                  <div className={`${styles.panel} ${activeTab === 5 ? styles.panelActive : ''}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <h3 className={styles.panelTitle}>Organização — Pastas</h3>
                        <p className={styles.panelSubtitle}>4 pastas • 47 processos organizados</p>
                      </div>
                      <button className={styles.btnAction}>+ Nova Pasta</button>
                    </div>

                    <div className={styles.folderGrid}>
                      <div className={styles.folderCard} style={{ borderColor: 'rgba(239,68,68,.25)', borderTopColor: '#ef4444' }}>
                        <div className={styles.folderHeader}>
                          <div className={styles.folderTitleBox}>
                            <FolderOpen size={14} color="#ef4444" />
                            <span className={styles.folderTitle}>Prazos Urgentes</span>
                          </div>
                          <span className={styles.folderCount} style={{ background: '#fee2e2', color: '#b91c1c' }}>3</span>
                        </div>
                        <div className={styles.dataRow} style={{ background: '#fff5f5', padding: '6px 8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600, color: '#0f2440', flex: 1 }}>João M. Silva</span>
                          <span style={{ fontSize: '0.6rem', color: '#b91c1c' }}>2 dias</span>
                        </div>
                        <div className={styles.dataRow} style={{ padding: '6px 8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600, color: '#0f2440', flex: 1 }}>Lucas Ferreira</span>
                          <span style={{ fontSize: '0.6rem', color: '#b91c1c' }}>3 dias</span>
                        </div>
                      </div>

                      <div className={styles.folderCard} style={{ borderColor: 'rgba(124,58,237,.2)', borderTopColor: '#7c3aed' }}>
                        <div className={styles.folderHeader}>
                          <div className={styles.folderTitleBox}>
                            <FolderOpen size={14} color="#7c3aed" />
                            <span className={styles.folderTitle}>Perícias Agendadas</span>
                          </div>
                          <span className={styles.folderCount} style={{ background: 'rgba(124,58,237,.1)', color: '#7c3aed' }}>5</span>
                        </div>
                        <div className={styles.dataRow} style={{ padding: '6px 8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600, color: '#0f2440', flex: 1 }}>Maria Santos</span>
                          <span style={{ fontSize: '0.6rem', color: '#64748b' }}>20/05</span>
                        </div>
                        <div className={styles.dataRow} style={{ background: '#faf5ff', padding: '6px 8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600, color: '#0f2440', flex: 1 }}>Roberto Lima</span>
                          <span style={{ fontSize: '0.6rem', color: '#64748b' }}>22/05</span>
                        </div>
                      </div>

                      <div className={styles.folderCard} style={{ borderColor: 'rgba(45,212,191,.25)', borderTopColor: '#2dd4bf' }}>
                        <div className={styles.folderHeader}>
                          <div className={styles.folderTitleBox}>
                            <FolderOpen size={14} color="#2dd4bf" />
                            <span className={styles.folderTitle}>Acordos Ativos</span>
                          </div>
                          <span className={styles.folderCount} style={{ background: 'rgba(45,212,191,.12)', color: '#0d9488' }}>12</span>
                        </div>
                        <div className={styles.dataRow} style={{ padding: '6px 8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600, color: '#0f2440', flex: 1 }}>Carlos Pereira</span>
                          <span style={{ fontSize: '0.6rem', color: '#0d9488' }}>3/6 parc.</span>
                        </div>
                      </div>

                      <div className={styles.folderCard} style={{ borderColor: 'rgba(245,158,11,.2)', borderTopColor: '#f59e0b' }}>
                        <div className={styles.folderHeader}>
                          <div className={styles.folderTitleBox}>
                            <FolderOpen size={14} color="#f59e0b" />
                            <span className={styles.folderTitle}>Audiências Próx.</span>
                          </div>
                          <span className={styles.folderCount} style={{ background: 'rgba(245,158,11,.12)', color: '#b45309' }}>8</span>
                        </div>
                        <div className={styles.dataRow} style={{ padding: '6px 8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600, color: '#0f2440', flex: 1 }}>João M. Silva</span>
                          <span style={{ fontSize: '0.6rem', color: '#b45309' }}>20/05</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PANEL 6: ESTATÍSTICAS */}
                  <div className={`${styles.panel} ${activeTab === 6 ? styles.panelActive : ''}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <h3 className={styles.panelTitle}>Estatísticas do Escritório</h3>
                        <p className={styles.panelSubtitle}>Período: Janeiro — Maio 2026</p>
                      </div>
                      <button className={styles.btnAction} style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', border: '1px solid rgba(124,58,237,.25)' }}>
                        Exportar PDF
                      </button>
                    </div>

                    <div className={styles.kpiGrid} style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                      <div className={styles.kpiCard} style={{ padding: '8px 4px', textAlign: 'center', borderColor: 'rgba(45, 212, 191, 0.3)' }}>
                        <div className={styles.kpiLabel}>Processos</div>
                        <div className={styles.kpiValue} style={{ fontSize: '0.8rem', color: '#0d9488' }}>47</div>
                      </div>
                      <div className={styles.kpiCard} style={{ padding: '8px 4px', textAlign: 'center' }}>
                        <div className={styles.kpiLabel}>Clientes</div>
                        <div className={styles.kpiValue} style={{ fontSize: '0.8rem' }}>31</div>
                      </div>
                      <div className={styles.kpiCard} style={{ padding: '8px 4px', textAlign: 'center', borderColor: 'rgba(124, 58, 237, 0.2)' }}>
                        <div className={styles.kpiLabel}>Procedentes</div>
                        <div className={styles.kpiValue} style={{ fontSize: '0.8rem', color: '#7c3aed' }}>18</div>
                      </div>
                      <div className={styles.kpiCard} style={{ padding: '8px 4px', textAlign: 'center' }}>
                        <div className={styles.kpiLabel}>Faturamento</div>
                        <div className={styles.kpiValue} style={{ fontSize: '0.8rem' }}>R$ 12k</div>
                      </div>
                    </div>

                    <div className={styles.barChartContainer} style={{ padding: '10px' }}>
                      <span className={styles.secLabel} style={{ marginTop: 0, marginBottom: '8px', display: 'block' }}>Distribuição por Área</span>
                      
                      <div className={styles.statProgBar}>
                        <div className={styles.progLabelRow}>
                          <span style={{ color: '#0f2440' }}>Previdenciário</span>
                          <span style={{ color: '#0d9488' }}>18 proc. • 38%</span>
                        </div>
                        <div className={styles.progBarBg}>
                          <div className={styles.progBarFill} style={{ width: '38%', background: 'linear-gradient(90deg, #14b8a6, #2dd4bf)' }} />
                        </div>
                      </div>

                      <div className={styles.statProgBar}>
                        <div className={styles.progLabelRow}>
                          <span style={{ color: '#0f2440' }}>Trabalhista</span>
                          <span style={{ color: '#7c3aed' }}>12 proc. • 26%</span>
                        </div>
                        <div className={styles.progBarBg}>
                          <div className={styles.progBarFill} style={{ width: '26%', background: 'linear-gradient(90deg, #7c3aed, #a855f7)' }} />
                        </div>
                      </div>

                      <div className={styles.statProgBar}>
                        <div className={styles.progLabelRow}>
                          <span style={{ color: '#0f2440' }}>Civil</span>
                          <span style={{ color: '#f59e0b' }}>9 proc. • 19%</span>
                        </div>
                        <div className={styles.progBarBg}>
                          <div className={styles.progBarFill} style={{ width: '19%', background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTabs;
