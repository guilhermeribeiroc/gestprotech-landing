import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Rocket, Play, ShieldCheck, Cloud, Newspaper } from 'lucide-react';
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
          <a href="#preco" className={styles.primaryBtn}>
            <Rocket size={18} /> Conhecer os planos
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
            <Cloud size={16} /> Gestão na nuvem
          </span>
          <span className={styles.trustItem}>
            <Newspaper size={16} /> Publicações por OAB, 24h, grátis
          </span>
        </div>

        {/* Laptop Mockup — screenshot real do sistema */}
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
            <img
              src="/screenshots/painel-geral.jpg"
              alt="Painel do GestProTech em uso real"
              className={styles.screenshotImg}
            />
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
