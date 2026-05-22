import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  Users, FolderOpen, AlarmClock, Calendar, RefreshCw, BarChart3, 
  FileText, FileEdit, Kanban, Share2, FileSpreadsheet, PieChart, 
  CheckCircle2, Home, Landmark, Building, MapPin, ClipboardList, Layers
} from 'lucide-react';
import styles from './Features.module.css';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  iconColor: string;
  bgGrad: string;
  borderColor: string;
  bullets: string[];
}

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imobCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animação de fade-in e slide-up para o cabeçalho
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

    // Animação stagger progressiva para a grade de cards
    const cards = cardsRef.current?.children;
    if (cards && cards.length > 0) {
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        stagger: 0.06,
        duration: 0.8,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });
    }

    // Animação individual para o card do Modo Imobiliário
    gsap.from(imobCardRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      scrollTrigger: {
        trigger: imobCardRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  }, { scope: sectionRef });

  const featuresList: FeatureItem[] = [
    {
      title: "Gestão de Clientes",
      subtitle: "Ficha completa de cada cliente",
      icon: Users,
      iconColor: "#14b8a6",
      bgGrad: "linear-gradient(135deg, rgba(20, 184, 166, 0.12), rgba(20, 184, 166, 0.03))",
      borderColor: "rgba(20, 184, 166, 0.2)",
      bullets: [
        "Dados pessoais: CPF, RG, nascimento, profissão",
        "Endereço, estado civil e fonte de indicação",
        "Representante legal com dados completos",
        "Histórico de tarefas e anotações por cliente"
      ]
    },
    {
      title: "Controle de Processos",
      subtitle: "Gestão jurídica completa",
      icon: FolderOpen,
      iconColor: "#cbd5e1",
      bgGrad: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))",
      borderColor: "rgba(255, 255, 255, 0.08)",
      bullets: [
        "Esfera, área do direito e tipo de benefício",
        "Polo passivo com qualificação completa",
        "Vara, comarca, tribunal e chave de acesso",
        "Resultado, acordo e arquivamento de processos"
      ]
    },
    {
      title: "Prazos e Compromissos",
      subtitle: "Nunca perca uma data crítica",
      icon: AlarmClock,
      iconColor: "#f87171",
      bgGrad: "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.02))",
      borderColor: "rgba(239, 68, 68, 0.18)",
      bullets: [
        "Audiências com data, hora e modalidade",
        "Perícias médicas, sociais e judiciais",
        "Exigências, intimações e prazos processuais",
        "Log de eventos: realizado, remarcado, cancelado"
      ]
    },
    {
      title: "Agenda Inteligente",
      subtitle: "Atendimentos e compromissos",
      icon: Calendar,
      iconColor: "#14b8a6",
      bgGrad: "linear-gradient(135deg, rgba(20, 184, 166, 0.12), rgba(20, 184, 166, 0.03))",
      borderColor: "rgba(20, 184, 166, 0.2)",
      bullets: [
        "Agendamentos presenciais e online",
        "Tipo de atendimento personalizado",
        "Encerramento com status de resultado",
        "Visualização por dia, semana ou mês"
      ]
    },
    {
      title: "Google Agenda Sync",
      subtitle: "Integração bidirecional completa",
      icon: RefreshCw,
      iconColor: "#3b82f6",
      bgGrad: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.02))",
      borderColor: "rgba(59, 130, 246, 0.2)",
      bullets: [
        "Login OAuth2 com um clique",
        "Criação automática de eventos no Google",
        "Sincronização bidirecional em tempo real",
        "Audiências e perícias no Google Calendar"
      ]
    },
    {
      title: "Dashboard Financeiro",
      subtitle: "Controle financeiro total",
      icon: BarChart3,
      iconColor: "#8b5cf6",
      bgGrad: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.02))",
      borderColor: "rgba(139, 92, 246, 0.18)",
      bullets: [
        "Honorários esperados vs. recebidos",
        "Parcelamento flexível de honorários",
        "Acordos com controle de parcelas automático",
        "Faturamento mês a mês + relatório em PDF"
      ]
    },
    {
      title: "Documentos e Arquivos",
      subtitle: "Organização documental completa",
      icon: FileText,
      iconColor: "#f59e0b",
      bgGrad: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.02))",
      borderColor: "rgba(245, 158, 11, 0.16)",
      bullets: [
        "Upload de arquivos por processo",
        "Pastas: Pessoal, Petições, Provas, Outros",
        "Visualização e download de PDFs direto",
        "Armazenamento ilimitado na nuvem"
      ]
    },
    {
      title: "Modelos e Geração de Docs",
      subtitle: "Documentos gerados automaticamente",
      icon: FileEdit,
      iconColor: "#cbd5e1",
      bgGrad: "linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))",
      borderColor: "rgba(255, 255, 255, 0.08)",
      bullets: [
        "Procuração gerada com dados do processo",
        "Contrato de honorários em PDF",
        "Recibo de parcela com um clique",
        "Upload de modelos Word e PDF customizados"
      ]
    },
    {
      title: "Organização em Pastas",
      subtitle: "Kanban de processos visual",
      icon: Kanban,
      iconColor: "#3b82f6",
      bgGrad: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.02))",
      borderColor: "rgba(59, 130, 246, 0.18)",
      bullets: [
        "Crie pastas com cores personalizadas",
        "Mova processos entre pastas com facilidade",
        "Ordene e agrupe por qualquer critério",
        "Visão kanban do escritório inteiro"
      ]
    },
    {
      title: "Parcerias e Indicações",
      subtitle: "Controle total de repasses",
      icon: Share2,
      iconColor: "#f59e0b",
      bgGrad: "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.02))",
      borderColor: "rgba(245, 158, 11, 0.16)",
      bullets: [
        "Advogado parceiro por processo",
        "Percentual de indicação configurável",
        "Cálculo automático do valor de repasse",
        "Data de repasse e histórico de parceiro"
      ]
    },
    {
      title: "Importação e Exportação",
      subtitle: "Automatize a entrada de dados",
      icon: FileSpreadsheet,
      iconColor: "#22c55e",
      bgGrad: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.02))",
      borderColor: "rgba(34, 197, 94, 0.18)",
      bullets: [
        "Importe centenas de processos via Excel",
        "Mapeamento automático de colunas",
        "Exporte toda sua base para Excel formatado",
        "Relatório financeiro mensal exportável em PDF"
      ]
    },
    {
      title: "Estatísticas e Relatórios",
      subtitle: "Dados para decisões inteligentes",
      icon: PieChart,
      iconColor: "#8b5cf6",
      bgGrad: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.02))",
      borderColor: "rgba(139, 92, 246, 0.18)",
      bullets: [
        "Distribuição por área do direito",
        "Processos por status e resultado",
        "Faturamento e metas mensais",
        "Transações avulsas (entradas e saídas)"
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="features" className={styles.featuresSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.tagline}>Tudo que você precisa</p>
          <h2 className={styles.title}>
            Cada detalhe do seu escritório,<br />sob controle total.
          </h2>
          <p className={styles.description}>
            Do primeiro atendimento ao fechamento financeiro, o GestProTech cobre cada etapa da gestão jurídica — sem precisar de outros sistemas.
          </p>
        </div>

        {/* Feature Grid */}
        <div ref={cardsRef} className={styles.grid}>
          {featuresList.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div 
                key={index} 
                className={styles.featCard}
              >
                <div className={styles.cardHeader}>
                  <div 
                    className={styles.iconWrapper} 
                    style={{ background: feat.bgGrad, borderColor: feat.borderColor }}
                  >
                    <Icon size={22} color={feat.iconColor} />
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>{feat.title}</h3>
                    <p className={styles.cardSubtitle}>{feat.subtitle}</p>
                  </div>
                </div>
                <div className={styles.bulletList}>
                  {feat.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className={styles.bullet}>
                      <CheckCircle2 size={13} className={styles.checkIcon} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modo Imobiliário - Card Especial */}
        <div ref={imobCardRef} className={styles.imobCard}>
          <div className={styles.imobContent}>
            <div className={styles.imobLeft}>
              <div className={styles.imobHeader}>
                <div className={styles.imobIcon}>
                  <Home size={24} />
                </div>
                <div>
                  <h3 className={styles.imobTitle}>Modo Imobiliário</h3>
                  <p className={styles.imobSubtitle}>Módulo extra — ative com um clique</p>
                </div>
              </div>
              <p className={styles.imobDesc}>
                Expanda seu escritório para o direito imobiliário com um módulo dedicado — menu lateral próprio, subáreas específicas e fluxo adaptado para cada tipo de demanda.
              </p>
            </div>
            <div className={styles.imobTagGrid}>
              <div className={styles.imobTag}>
                <MapPin size={14} className={styles.imobTagIcon} /> Usucapião
              </div>
              <div className={styles.imobTag}>
                <Building size={14} className={styles.imobTagIcon} /> REURB
              </div>
              <div className={styles.imobTag}>
                <ClipboardList size={14} className={styles.imobTagIcon} /> Escritura e Registro
              </div>
              <div className={styles.imobTag}>
                <Home size={14} className={styles.imobTagIcon} /> Compra e Venda
              </div>
              <div className={styles.imobTag}>
                <Landmark size={14} className={styles.imobTagIcon} /> Regulariz. Cartório
              </div>
              <div className={styles.imobTag}>
                <Layers size={14} className={styles.imobTagIcon} /> Desmembramento
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
