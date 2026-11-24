import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Rocket, Play, ShieldCheck, Newspaper, CalendarCheck, Flame,
  AlarmClock, Wallet, Calculator, Mail, Calendar,
} from 'lucide-react';
import Countdown from '../Countdown/Countdown';
import {
  REGISTER_URL, WHATSAPP_URL, PRICE_PROMO, PRICE_REGULAR, PROMO_END_LABEL, DISCOUNT_PERCENT,
} from '../../config/promo';
import styles from './Hero.module.css';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M12.031 2c-5.502 0-9.97 4.468-9.97 9.97 0 1.916.545 3.701 1.488 5.216l-1.549 5.666 5.822-1.527a9.92 9.92 0 004.21 1.002c5.502 0 9.97-4.468 9.97-9.97C22.002 6.468 17.533 2 12.031 2zm0 17.159c-1.637 0-3.2-.444-4.57-1.285l-.328-.196-3.398.892.909-3.324-.215-.342a8.21 8.21 0 01-1.258-4.394c0-4.526 3.684-8.211 8.21-8.211 4.526 0 8.211 3.685 8.211 8.211 0 4.526-3.685 8.211-8.211 8.211zm4.512-6.177c-.247-.124-1.463-.722-1.69-.804-.226-.083-.392-.124-.556.124-.165.247-.638.804-.783.97-.144.165-.288.185-.535.061-.247-.124-1.042-.383-1.986-1.225-.733-.655-1.229-1.464-1.373-1.711-.144-.247-.015-.38.109-.503.111-.11.247-.288.371-.432.124-.144.165-.247.247-.412.083-.165.042-.309-.021-.433-.062-.124-.556-1.34-.762-1.836-.2-.486-.421-.42-.577-.428-.149-.008-.32-.01-.49-.01a.94.94 0 00-.68.32c-.227.247-.866.845-.866 2.062 0 1.216.887 2.392.986 2.556.103.165 1.745 2.665 4.227 3.733.59.254 1.05.406 1.41.52.593.189 1.133.162 1.56.098.476-.072 1.463-.598 1.669-1.175.206-.578.206-1.073.144-1.175-.062-.103-.227-.165-.474-.29z" />
  </svg>
);

/** Cartões que "flutuam" em volta do ticket: o que o sistema faz por você, sem esforço. */
const CHIPS = [
  { id: 'pub', icon: Newspaper, tone: 'red', title: 'Publicação nova', sub: 'TJCE · Intimação, 1ª Vara Cível', pos: 'p1' },
  { id: 'prazo', icon: AlarmClock, tone: 'amber', title: 'Prazo amanhã', sub: 'Contestação · Proc. 0803391', pos: 'p2' },
  { id: 'agenda', icon: Calendar, tone: 'cyan', title: 'Audiência 14h', sub: 'Sincronizada no Google Agenda', pos: 'p3' },
  { id: 'fin', icon: Wallet, tone: 'green', title: 'Honorário recebido', sub: '+ R$ 2.500,00 · Parcela 3/6', pos: 'p4' },
  { id: 'prev', icon: Calculator, tone: 'cyan', title: 'RMI calculada', sub: 'R$ 4.180,00 · Melhor regra', pos: 'p5' },
  { id: 'mail', icon: Mail, tone: 'amber', title: 'E-mail exclusivo criado', sub: 'Vinculado à ficha do cliente', pos: 'p6' },
] as const;

const EMBERS = Array.from({ length: 18 }, (_, i) => i);

const BF_WORDS = ['BLACK', 'FRIDAY'];

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(ref);
      const letters = q(`.${styles.letter}`);
      const chips = q(`.${styles.chip}`);

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. selo + título: letras caem com "impacto" e o título pisca como neon
      tl.from(`.${styles.eyebrow}`, { opacity: 0, y: -16, duration: 0.6 })
        .from(letters, {
          yPercent: 130,
          rotateX: -80,
          opacity: 0,
          scale: 1.25,
          transformOrigin: '50% 100%',
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.055,
        }, '-=0.2')
        .fromTo(`.${styles.bfFlash}`, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1.1, duration: 0.35, ease: 'power2.out' }, '-=0.25')
        .to(`.${styles.bfFlash}`, { opacity: 0.45, scale: 1, duration: 0.8 })
        .to(`.${styles.bfTitle}`, { keyframes: { x: [0, -6, 5, -3, 2, 0], easeEach: 'none' }, duration: 0.4 }, '<-0.9')
        .add(() => {
          // flicker neon curto
          gsap.fromTo(letters, { opacity: 0.25 }, {
            opacity: 1, duration: 0.07, repeat: 4, yoyo: true, // nº ímpar de passadas: termina visível
            stagger: { each: 0.03, from: 'random' }, ease: 'none',
            onComplete: () => { gsap.set(letters, { opacity: 1 }); },
          });
        }, '-=0.5')
        .from(`.${styles.tapeLine}`, { scaleX: 0, duration: 0.7, ease: 'power4.out' }, '-=0.2')
        .from(`.${styles.headline}`, { opacity: 0, y: 26, filter: 'blur(10px)', duration: 0.8 }, '-=0.4')
        .from(`.${styles.countdownWrap}`, { opacity: 0, y: 26, scale: 0.92, duration: 0.7 }, '-=0.5')
        .from(`.${styles.sub}`, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
        .from(`.${styles.offer}`, { opacity: 0, x: -40, duration: 0.6 }, '-=0.35')
        .from(`.${styles.ctas} > *`, { opacity: 0, y: 22, scale: 0.95, duration: 0.55, stagger: 0.1, ease: 'back.out(1.6)' }, '-=0.3')
        .from(`.${styles.trust} li`, { opacity: 0, y: 14, duration: 0.5, stagger: 0.08 }, '-=0.3');

      // 2. palco: ticket entra girando e os cartões vêm de lados diferentes
      const stageTl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.6 });
      stageTl
        .from(`.${styles.ring}`, { scale: 0.3, opacity: 0, duration: 1.2, stagger: 0.12 })
        .from(`.${styles.ticket}`, { opacity: 0, y: 90, rotateX: -35, rotateZ: -8, scale: 0.8, duration: 1.1, ease: 'back.out(1.3)' }, 0.1)
        .from(chips, {
          opacity: 0,
          x: (i: number) => (i % 2 === 0 ? -140 : 140),
          y: (i: number) => (i < 3 ? 30 : -30),
          scale: 0.7,
          duration: 0.8,
          stagger: 0.12,
          ease: 'back.out(1.5)',
        }, 0.5)
        .add(() => {
          // 3. flutuação contínua
          chips.forEach((el, i) => {
            gsap.to(el, { y: `+=${10 + (i % 3) * 4}`, duration: 2.2 + (i % 4) * 0.35, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.15 });
          });
          gsap.to(`.${styles.ticket}`, { rotateZ: 1.6, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        });

      // 4. título: brilho "respirando"
      gsap.to(`.${styles.bfFlash}`, { opacity: 0.85, scale: 1.12, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 3 });

      // 5. paralaxe leve com o mouse (só em telas largas)
      const stage = stageRef.current;
      if (stage && window.matchMedia('(min-width: 900px) and (pointer: fine)').matches) {
        const moveChips = chips.map((el) => gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' }));
        const tilt = gsap.quickTo(`.${styles.ticketWrap}`, 'rotateY', { duration: 0.8, ease: 'power3.out' });
        const onMove = (e: PointerEvent) => {
          const r = stage.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          moveChips.forEach((fn, i) => fn(nx * (i % 2 === 0 ? -26 : 26)));
          tilt(nx * 14);
        };
        const onLeave = () => { moveChips.forEach((fn) => fn(0)); tilt(0); };
        stage.addEventListener('pointermove', onMove);
        stage.addEventListener('pointerleave', onLeave);
        return () => {
          stage.removeEventListener('pointermove', onMove);
          stage.removeEventListener('pointerleave', onLeave);
        };
      }
    });

    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} id="top" className={styles.hero}>
      {/* brasas subindo */}
      <div className={styles.embers} aria-hidden="true">
        {EMBERS.map((i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 7) * 0.9}s`,
              animationDuration: `${6 + (i % 5) * 1.6}s`,
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
            }}
          />
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.eyebrow}>
          <Flame size={14} aria-hidden="true" /> Ofertas de Black Friday até {PROMO_END_LABEL}
        </div>

        <h1 className={styles.title}>
          <span className={styles.bfTitle} aria-label="Black Friday">
            <span className={styles.bfFlash} aria-hidden="true" />
            {BF_WORDS.map((word, w) => (
              <span key={word} className={styles.word} aria-hidden="true">
                {word.split('').map((ch, i) => (
                  <span
                    key={i}
                    className={styles.letter}
                    style={{ animationDelay: `${(w * 5 + i) * 0.13 + 2.4}s` }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </span>
          <span className={styles.tapeLine} aria-hidden="true" />
          <span className={styles.headline}>
            Seu escritório de advocacia <em>sem planilhas</em>,<br className={styles.br} /> com prazos e publicações no automático.
          </span>
        </h1>

        <div className={styles.countdownWrap}>
          <span className={styles.countdownLabel}>A oferta acaba em</span>
          <Countdown />
        </div>

        <p className={styles.sub}>
          Processos, clientes, agenda, financeiro e publicações da OAB em um só sistema, na nuvem. Feito para o dia a dia do advogado.
        </p>

        <div className={styles.offer}>
          <span className={styles.offerTag}>-{DISCOUNT_PERCENT}%</span>
          <span>
            <strong>1ª mensalidade por {PRICE_PROMO.full.replace(' ', ' ')}</strong>
            <small>depois {PRICE_REGULAR.full}/mês · cancele quando quiser</small>
          </span>
        </div>

        <div className={styles.ctas}>
          <a href={REGISTER_URL} className={styles.primaryBtn}>
            <Rocket size={18} aria-hidden="true" /> Garantir oferta · 7 dias grátis
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
            <WhatsAppIcon /> Falar no WhatsApp
          </a>
          <a href="#demo" className={styles.ghostBtn}>
            <Play size={16} aria-hidden="true" /> Ver o sistema
          </a>
        </div>

        <ul className={styles.trust}>
          <li><ShieldCheck size={16} aria-hidden="true" /> Sem cartão para ativar</li>
          <li><Newspaper size={16} aria-hidden="true" /> Publicações por OAB, 24h, grátis</li>
          <li><CalendarCheck size={16} aria-hidden="true" /> Google Agenda sincronizado</li>
        </ul>

        {/* Palco: ticket de oferta + cartões flutuando */}
        <div ref={stageRef} className={styles.stage} aria-hidden="true">
          <span className={styles.ring} />
          <span className={`${styles.ring} ${styles.ring2}`} />
          <span className={`${styles.ring} ${styles.ring3}`} />

          <div className={styles.ticketWrap}>
            <div className={styles.ticket}>
              <div className={styles.stub}>
                <span>BLACK FRIDAY</span>
              </div>
              <div className={styles.ticketMain}>
                <span className={styles.tkSmall}>1ª mensalidade</span>
                <div className={styles.tkPrice}>
                  <small>R$</small><b>{PRICE_PROMO.whole}</b><i>{PRICE_PROMO.cents}</i>
                </div>
                <span className={styles.tkOld}>de <s>{PRICE_REGULAR.full}</s>/mês</span>
                <div className={styles.barcode} />
                <span className={styles.tkValid}>Válido até {PROMO_END_LABEL} · 7 dias grátis</span>
              </div>
              <span className={styles.stamp}>-{DISCOUNT_PERCENT}%</span>
            </div>
          </div>

          <div className={styles.chipLayer}>
            {CHIPS.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.id} className={`${styles.chip} ${styles[c.pos]} ${styles[`tone_${c.tone}`]}`}>
                  <span className={styles.chipIcon}><Icon size={18} /></span>
                  <span className={styles.chipText}>
                    <strong>{c.title}</strong>
                    <small>{c.sub}</small>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
