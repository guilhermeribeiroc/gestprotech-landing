import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Users, FolderOpen, AlarmClock, Calendar, RefreshCw, BarChart3,
  FileText, FileEdit, Kanban, Share2, FileSpreadsheet, PieChart,
  CheckCircle2, Home, Landmark, Building, MapPin, ClipboardList, Layers,
  Newspaper, Calculator, Mail
} from 'lucide-react';
import styles from './Features.module.css';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>;
  tone: 'cyan' | 'slate' | 'red' | 'blue' | 'violet' | 'amber' | 'green';
  bullets: string[];
  highlight?: boolean;
  /** módulo novo: ganha selo "Novo módulo" */
  isNew?: boolean;
}

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imobCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
      title: "Análise Previdenciária",
      subtitle: "Cálculos com RMI e CNIS",
      icon: Calculator,
      tone: "cyan",
      isNew: true,
      bullets: [
        "Análise do CNIS: vínculos, tempo e carência",
        "Cálculo da RMI com média salarial e coeficiente",
        "Comparação entre regras de concessão e transição",
        "Cálculos salvos no processo do cliente"
      ]
    },
    {
      title: "E-mails Exclusivos",
      subtitle: "Um endereço para cada cliente",
      icon: Mail,
      tone: "violet",
      isNew: true,
      bullets: [
        "Geração do e-mail exclusivo em um clique",
        "Endereço padronizado a partir do nome do cliente",
        "Vinculado à ficha e aos processos",
        "Copie ou envie o endereço ao cliente"
      ]
    },
    {
      title: "Gestão de Clientes",
      subtitle: "Ficha completa de cada cliente",
      icon: Users,
      tone: "cyan",
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
      tone: "slate",
      bullets: [
        "Esfera, área do direito e tipo de benefício",
        "Polo passivo com qualificação completa",
        "Vara, comarca, tribunal e chave de acesso",
        "Resultado, acordo e arquivamento de processos"
      ]
    },
    {
      title: "Publicações por OAB",
      subtitle: "Monitoramento automático 24h",
      icon: Newspaper,
      tone: "cyan",
      highlight: true,
      bullets: [
        "Busca automática de publicações pela sua OAB",
        "Monitoramento contínuo via DJEN, 24 horas por dia",
        "Alertas de novas publicações e intimações",
        "Sem custo adicional — incluso em qualquer plano"
      ]
    },
    {
      title: "Prazos e Compromissos",
      subtitle: "Nunca perca uma data crítica",
      icon: AlarmClock,
      tone: "red",
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
      tone: "cyan",
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
      tone: "blue",
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
      tone: "violet",
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
      tone: "amber",
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
      tone: "slate",
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
      tone: "blue",
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
      tone: "amber",
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
      tone: "green",
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
      tone: "violet",
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
            Cada detalhe do escritório,<br /><em>sob controle.</em>
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
                className={`${styles.featCard} ${feat.highlight || feat.isNew ? styles.featCardHighlight : ''}`}
              >
                {(feat.highlight || feat.isNew) && (
                  <div className={styles.highlightTag}>{feat.isNew ? 'Novo módulo' : '24h · Sem custo adicional'}</div>
                )}
                <div className={styles.cardHeader}>
                  <div className={`${styles.iconWrapper} ${styles[`tone_${feat.tone}`]}`}>
                    <Icon size={22} aria-hidden />
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>{feat.title}</h3>
                    <p className={styles.cardSubtitle}>{feat.subtitle}</p>
                  </div>
                </div>
                <div className={styles.bulletList}>
                  {feat.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className={styles.bullet}>
                      <CheckCircle2 size={14} className={styles.checkIcon} aria-hidden />
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
