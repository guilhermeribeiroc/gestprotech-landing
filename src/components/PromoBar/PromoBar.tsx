import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Copy, Check } from 'lucide-react';
import styles from './PromoBar.module.css';

const PromoBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(() => {
    gsap.set(barRef.current, { y: -44, opacity: 0 });
    gsap.to(barRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out'
    });
  }, { scope: barRef });

  const handleCopy = () => {
    navigator.clipboard.writeText('COPA50');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div ref={barRef} className={styles.promoBar}>
      <div className={styles.container}>
        <span className={styles.flag} aria-hidden="true">🏆</span>
        <p className={styles.text}>
          <span className={styles.textFull}>Copa do Mundo 2026 está chegando — </span>
          cupom <strong className={styles.highlight}>COPA50</strong> = <strong className={styles.highlight}>50% OFF</strong> na 1ª mensalidade
        </p>
        <button
          className={styles.couponChip}
          onClick={handleCopy}
          type="button"
          aria-label="Copiar cupom COPA50"
        >
          <span className={styles.couponCode}>{copied ? 'Copiado!' : 'COPA50'}</span>
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      </div>
    </div>
  );
};

export default PromoBar;
