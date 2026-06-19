import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './PromoBar.module.css';

const PromoBar: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('COPA50');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useGSAP(() => {
    // Entrada do HUD: desce e some o fade in
    gsap.set(wrapRef.current, { y: -44, opacity: 0 });
    gsap.to(wrapRef.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });

    // Marquee infinito — desloca exatamente a largura de um conjunto
    const track = trackRef.current;
    const firstSet = track?.children[0] as HTMLElement | undefined;
    if (!track || !firstSet) return;

    const setWidth = firstSet.getBoundingClientRect().width;
    gsap.set(track, { x: 0 });

    tweenRef.current = gsap.to(track, {
      x: -setWidth,
      duration: setWidth / 48,
      ease: 'none',
      repeat: -1
    });
  }, { scope: wrapRef });

  const renderSet = (keyPrefix: string) => (
    <div className={styles.set} key={keyPrefix}>
      <span className={styles.item}>
        <span className={styles.flag} aria-hidden="true">🏆</span> Copa do Mundo 2026 está chegando
      </span>
      <span className={styles.dot} aria-hidden="true">⚽</span>
      <span className={styles.item}>
        Cupom{' '}
        <button className={styles.code} onClick={handleCopy} type="button" aria-label="Copiar cupom COPA50">
          {copied ? 'COPIADO!' : 'COPA50'}
        </button>
      </span>
      <span className={styles.dot} aria-hidden="true">⚽</span>
      <span className={styles.item}>
        <strong className={styles.highlight}>50% OFF</strong> na 1ª mensalidade
      </span>
      <span className={styles.dot} aria-hidden="true">⚽</span>
      <span className={styles.item}>Válido por tempo limitado</span>
      <span className={styles.dot} aria-hidden="true">⚽</span>
    </div>
  );

  return (
    <div
      ref={wrapRef}
      className={styles.promoBar}
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
    >
      <div ref={trackRef} className={styles.track}>
        {renderSet('a')}
        {renderSet('b')}
      </div>
    </div>
  );
};

export default PromoBar;
