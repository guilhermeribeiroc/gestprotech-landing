import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PRICE_UNDER, SLOTS, PROMO_END_LABEL } from '../../config/promo';
import styles from './PromoBar.module.css';

const PromoBar: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Marquee infinito — desloca exatamente a largura de um conjunto
      const track = trackRef.current;
      const firstSet = track?.children[0] as HTMLElement | undefined;
      if (!track || !firstSet) return;
      const setWidth = firstSet.getBoundingClientRect().width;
      tweenRef.current = gsap.to(track, {
        x: -setWidth,
        duration: setWidth / 55,
        ease: 'none',
        repeat: -1,
      });
    });
    return () => mm.revert();
  }, { scope: wrapRef });

  const renderSet = (key: string) => (
    <div className={styles.set} key={key} aria-hidden={key === 'b'}>
      <span className={styles.item}><b className={styles.tagBf}>Black Friday</b></span>
      <span className={styles.item}>
        Por menos de <strong className={styles.highlight}>{PRICE_UNDER}/mês</strong>
      </span>
      <span className={styles.dot}>✦</span>
      <span className={styles.item}>Só {SLOTS} vagas para novos clientes</span>
      <span className={styles.dot}>✦</span>
      <span className={styles.item}>7 dias grátis, sem cartão</span>
      <span className={styles.dot}>✦</span>
      <span className={styles.item}>Oferta até {PROMO_END_LABEL}</span>
      <span className={styles.dot}>✦</span>
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
        {renderSet('c')}
      </div>
    </div>
  );
};

export default PromoBar;
