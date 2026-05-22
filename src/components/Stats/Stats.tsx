import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Stats.module.css';

gsap.registerPlugin(ScrollTrigger);

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const num1Ref = useRef<HTMLDivElement>(null);
  const num2Ref = useRef<HTMLDivElement>(null);
  const num3Ref = useRef<HTMLDivElement>(null);
  const num4Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Anima +300
    const obj1 = { val: 0 };
    gsap.to(obj1, {
      val: 300,
      scrollTrigger: {
        trigger: num1Ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        if (num1Ref.current) {
          num1Ref.current.textContent = `+${Math.floor(obj1.val)}`;
        }
      }
    });

    // 2. Anima 99,9%
    const obj2 = { val: 0 };
    gsap.to(obj2, {
      val: 99.9,
      scrollTrigger: {
        trigger: num2Ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => {
        if (num2Ref.current) {
          num2Ref.current.textContent = `${obj2.val.toFixed(1).replace('.', ',')}%`;
        }
      }
    });

    // 3. Anima 7 dias
    const obj3 = { val: 0 };
    gsap.to(obj3, {
      val: 7,
      scrollTrigger: {
        trigger: num3Ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        if (num3Ref.current) {
          num3Ref.current.textContent = `${Math.floor(obj3.val)} dias`;
        }
      }
    });

    // 4. Anima 24h
    const obj4 = { val: 0 };
    gsap.to(obj4, {
      val: 24,
      scrollTrigger: {
        trigger: num4Ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => {
        if (num4Ref.current) {
          num4Ref.current.textContent = `${Math.floor(obj4.val)}h`;
        }
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.statItem}>
          <div ref={num1Ref} className={styles.statNumber}>+0</div>
          <p className={styles.statLabel}>Processos gerenciados</p>
        </div>
        <div className={styles.statItem}>
          <div ref={num2Ref} className={styles.statNumber}>0%</div>
          <p className={styles.statLabel}>Uptime garantido</p>
        </div>
        <div className={styles.statItem}>
          <div ref={num3Ref} className={styles.statNumber}>0 dias</div>
          <p className={styles.statLabel}>Grátis para testar</p>
        </div>
        <div className={styles.statItem}>
          <div ref={num4Ref} className={styles.statNumber}>0h</div>
          <p className={styles.statLabel}>Suporte VIP respondendo</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
