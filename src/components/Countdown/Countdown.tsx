import React, { useEffect, useState } from 'react';
import { PROMO_END } from '../../config/promo';
import styles from './Countdown.module.css';

interface Props {
  /** compact = versão pequena para cartões */
  size?: 'large' | 'compact';
  className?: string;
}

const END = new Date(PROMO_END).getTime();

const calc = () => {
  const diff = Math.max(0, END - Date.now());
  return {
    d: Math.floor(diff / 86_400_000),
    h: Math.floor((diff / 3_600_000) % 24),
    m: Math.floor((diff / 60_000) % 60),
    s: Math.floor((diff / 1000) % 60),
    over: diff === 0,
  };
};

const pad = (n: number) => String(n).padStart(2, '0');

const Countdown: React.FC<Props> = ({ size = 'large', className = '' }) => {
  const [t, setT] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: [string, number][] = [
    ['dias', t.d],
    ['horas', t.h],
    ['min', t.m],
    ['seg', t.s],
  ];

  const deadline = new Date(PROMO_END).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo',
  });

  return (
    <div
      className={`${styles.countdown} ${size === 'compact' ? styles.compact : ''} ${className}`}
      role="timer"
      aria-label={t.over ? 'Oferta encerrada' : `Oferta termina em ${t.d} dias, ${t.h} horas e ${t.m} minutos`}
    >
      {units.map(([label, value], i) => (
        <React.Fragment key={label}>
          <div className={styles.unit} aria-hidden="true">
            <span key={value} className={styles.value}>{pad(value)}</span>
            <span className={styles.label}>{label}</span>
          </div>
          {i < units.length - 1 && (
            <span className={styles.sep} aria-hidden="true">:</span>
          )}
        </React.Fragment>
      ))}
      <span className="sr-only">Prazo final: {deadline} (horário de Brasília)</span>
    </div>
  );
};

export default Countdown;
