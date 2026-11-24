import React from 'react';
import { PROMO_END_LABEL } from '../../config/promo';
import styles from './TapeBand.module.css';

/** Duas fitas cruzadas, amarela e preta, com texto correndo. Separador visual da Black Friday. */
const TapeBand: React.FC = () => {
  const phrase = (key: string) => (
    <span className={styles.set} key={key}>
      <span>Black Friday</span><i aria-hidden="true">✦</i>
      <span>Oferta até {PROMO_END_LABEL}</span><i aria-hidden="true">✦</i>
      <span>7 dias grátis</span><i aria-hidden="true">✦</i>
      <span>Sem cartão</span><i aria-hidden="true">✦</i>
    </span>
  );

  return (
    <div className={styles.wrap} aria-hidden="true" data-reveal="fade">
      <div className={`${styles.tape} ${styles.yellow}`}>
        <div className={styles.track}>{[0, 1, 2, 3].map((n) => phrase(`a${n}`))}</div>
      </div>
      <div className={`${styles.tape} ${styles.black}`}>
        <div className={`${styles.track} ${styles.reverse}`}>{[0, 1, 2, 3].map((n) => phrase(`b${n}`))}</div>
      </div>
    </div>
  );
};

export default TapeBand;
