import React from 'react';
import styles from './BackgroundVideo.module.css';

/** Fundo da página: brilhos suaves + grade sutil. Sem vídeo, leve e estático. */
const BackgroundVideo: React.FC = () => (
  <div className={styles.bg} aria-hidden="true">
    <div className={styles.glowYellow} />
    <div className={styles.glowCyan} />
    <div className={styles.grid} />
  </div>
);

export default BackgroundVideo;
