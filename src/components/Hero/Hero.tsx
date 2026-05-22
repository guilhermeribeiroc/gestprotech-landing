import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Rocket, Play, ShieldCheck, Cloud, Headset } from 'lucide-react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    // 1. No mount: tudo começa invisível (gsap.set)
    gsap.set(containerRef.current, { opacity: 0 });
    gsap.set(badgeRef.current, { opacity: 0, y: 15 });
    gsap.set(subheadlineRef.current, { opacity: 0, y: 30 });
    gsap.set(ctaRef.current, { opacity: 0, y: 30 });
    gsap.set(trustRef.current, { opacity: 0, y: 20 });
    gsap.set(mockupRef.current, { opacity: 0, y: 40, scale: 0.96 });
    gsap.set(scrollIndicatorRef.current, { opacity: 0 });

    // Encontra todas as palavras criadas para animar com o clip-path
    const words = headlineRef.current?.querySelectorAll(`.${styles.word}`);

    // Criação da Timeline principal para sincronizar perfeitamente
    const tl = gsap.timeline();

    // 2. Overlay faz fade in em 0.8s (Já calibrado no BackgroundVideo, e o contêiner principal entra com leve fade in)
    tl.to(containerRef.current, { opacity: 1, duration: 0.6 });

    // Anima o Badge inicial
    tl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, '-=0.3');

    // 4. Headline: palavras reveladas de baixo para cima com clip-path inset(100% 0 0 0) -> inset(0% 0 0 0)
    if (words && words.length > 0) {
      tl.to(words, {
        clipPath: 'inset(0% 0% 0% 0%)',
        y: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out'
      }, '-=0.4');
    }

    // 5. Sub-headline: fade up depois da headline, delay 0.2s
    tl.to(subheadlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');

    // CTAs e Trust indicators entram na sequência
    tl.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');

    tl.to(trustRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6');

    // Mockup do Laptop entra com elegância
    tl.to(mockupRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.1,
      ease: 'power3.out'
    }, '-=0.7');

    // 6. Scroll indicator: aparece por último, pulsa infinitamente com opacity 0.4 -> 1 -> 0.4, 2s, ease sine.inOut
    tl.to(scrollIndicatorRef.current, {
      opacity: 1,
      duration: 0.8,
      onComplete: () => {
        // Inicia a pulsação infinita lenta usando GSAP
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0.4,
          yoyo: true,
          repeat: -1,
          duration: 1.0,
          ease: 'sine.inOut'
        });
      }
    }, '-=0.4');

  }, { scope: containerRef });

  // Função auxiliar para quebrar a headline em spans individuais de palavras
  const renderHeadlineWords = () => {
    const text1 = "Gestão Inteligente";
    const textTeal = "para Escritórios";
    const text2 = "que Querem Crescer.";

    const wordSpan = (word: string, isGold: boolean = false) => (
      <span key={word} className={styles.wordContainer}>
        <span className={`${styles.word} ${isGold ? styles.goldWord : ''}`}>
          {word}
        </span>
        &nbsp;
      </span>
    );

    return (
      <>
        {text1.split(' ').map(w => wordSpan(w))}
        <span className={styles.lineBreak}></span>
        {textTeal.split(' ').map(w => wordSpan(w, true))}
        <span className={styles.lineBreak}></span>
        {text2.split(' ').map(w => wordSpan(w))}
      </>

    );
  };

  return (
    <section ref={containerRef} className={styles.heroSection}>
      <div className={styles.container}>
        {/* Badge */}
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.badgeDot}></span>
          Plataforma 100% na nuvem para advogados
        </div>

        {/* Headline */}
        <h1 ref={headlineRef} className={styles.headline}>
          {renderHeadlineWords()}
        </h1>

        {/* Sub-headline */}
        <p ref={subheadlineRef} className={styles.subheadline}>
          Centralize processos, clientes, agenda e financeiro em uma única interface moderna, clara e na nuvem. Pare de perder tempo com planilhas.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className={styles.ctaContainer}>
          <a href="https://gestprotech.com.br/registrar/" className={styles.primaryBtn}>
            <Rocket size={18} /> Começar Agora — 7 Dias Grátis
          </a>
          <a href="#demo" className={styles.ghostBtn}>
            <Play size={18} /> Ver o Sistema
          </a>
        </div>

        {/* Trust elements */}
        <div ref={trustRef} className={styles.trustContainer}>
          <span className={styles.trustItem}>
            <ShieldCheck size={16} /> Sem cartão para ativar
          </span>
          <span className={styles.trustItem}>
            <Cloud size={16} /> Acesso imediato na nuvem
          </span>
          <span className={styles.trustItem}>
            <Headset size={16} /> Suporte VIP incluso
          </span>
        </div>

        {/* Laptop Mockup */}
        <div ref={mockupRef} className={styles.mockupWrapper}>
          <div className={styles.laptopScreen}>
            <div className={styles.sysHeader}>
              <div className={styles.dot} style={{ backgroundColor: '#f87171' }}></div>
              <div className={styles.dot} style={{ backgroundColor: '#fbbf24' }}></div>
              <div className={styles.dot} style={{ backgroundColor: '#4ade80' }}></div>
              <div className={styles.urlBar}>
                <span className={styles.urlText}>gestprotech.com.br</span>
              </div>
            </div>
            <div className={styles.sysBody}>
              {/* Sidebar */}
              <div className={styles.sidebar}>
                <div className={styles.sbLogoBox}>
                  <img src="/LOGOGEST.png" alt="logo" className={styles.sbLogoImg} />
                  <span className={styles.sbLogoText}>GESTPROTECH</span>
                </div>
                <div className={`${styles.sbItem} ${styles.sbActive}`}><i className="bi bi-speedometer2"></i> Painel</div>
                <div className={styles.sbItem}><i className="bi bi-people"></i> Clientes</div>
                <div className={styles.sbItem}><i className="bi bi-folder2-open"></i> Processos</div>
                <div className={styles.sbItem}><i className="bi bi-calendar3"></i> Agenda</div>
                <div className={styles.sbItem}><i className="bi bi-bank"></i> Financeiro</div>
                <div className={styles.sbItem}><i className="bi bi-diagram-3"></i> Parcerias</div>
              </div>

              {/* Workspace */}
              <div className={styles.sysContent}>
                {/* KPIs */}
                <div className={styles.kpiGrid}>
                  <div className={styles.kpiCard}>
                    <div className={styles.kpiLabel}>Processos</div>
                    <div className={styles.kpiValue}>47</div>
                  </div>
                  <div className={styles.kpiCard} style={{ borderColor: 'rgba(45, 212, 191, 0.4)' }}>
                    <div className={styles.kpiLabel}>Clientes</div>
                    <div className={styles.kpiValue} style={{ color: '#14b8a6' }}>31</div>
                  </div>
                  <div className={styles.kpiCard}>
                    <div className={styles.kpiLabel}>Honorários</div>
                    <div className={styles.kpiValue}>R$12k</div>
                  </div>
                  <div className={styles.kpiCard} style={{ borderColor: 'rgba(124, 58, 237, 0.3)' }}>
                    <div className={styles.kpiLabel}>Prazos Hoje</div>
                    <div className={styles.kpiValue} style={{ color: '#7c3aed' }}>3</div>
                  </div>
                </div>

                {/* Grid */}
                <div className={styles.subGrid}>
                  <div className={styles.panelCard}>
                    <div className={styles.panelTitle}>Processos Urgentes</div>
                    <div className={styles.panelRow}>
                      <span style={{ fontWeight: 700, color: '#0f2440' }}>João M. Silva</span>
                      <span style={{ color: '#64748b', fontSize: '0.6rem' }}>Previdenciário</span>
                      <span className={styles.badgeRed}>Urgente</span>
                    </div>
                    <div className={styles.panelRow}>
                      <span style={{ fontWeight: 700, color: '#0f2440' }}>Maria Santos</span>
                      <span style={{ color: '#64748b', fontSize: '0.6rem' }}>Trabalhista</span>
                      <span className={styles.badgeAmber}>Atenção</span>
                    </div>
                    <div className={styles.panelRow}>
                      <span style={{ fontWeight: 700, color: '#0f2440' }}>Carlos Pereira</span>
                      <span style={{ color: '#64748b', fontSize: '0.6rem' }}>Civil</span>
                      <span className={styles.badgeGreen}>Em dia</span>
                    </div>
                  </div>

                  <div className={styles.panelCard} style={{ borderColor: 'rgba(45, 212, 191, 0.25)' }}>
                    <div className={styles.panelTitle}>Agenda Hoje</div>
                    <div className={styles.agendaItem}>
                      <span className={styles.agendaTime} style={{ color: '#2dd4bf' }}>09h</span> Audiência
                    </div>
                    <div className={styles.agendaItem}>
                      <span className={styles.agendaTime} style={{ color: '#7c3aed' }}>14h</span> Perícia Méd.
                    </div>
                    <div className={styles.agendaItem}>
                      <span className={styles.agendaTime} style={{ color: '#f59e0b' }}>16h</span> Atendimento
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.laptopBase}></div>
          <div className={styles.laptopStand}></div>
        </div>

        {/* Scroll indicator */}
        <a
          ref={scrollIndicatorRef}
          href="#features"
          className={styles.scrollIndicator}
        >
          <span>Role para explorar</span>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollWheel}></div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
