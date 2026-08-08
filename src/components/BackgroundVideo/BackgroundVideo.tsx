import React from 'react';
import styles from './BackgroundVideo.module.css';

interface BackgroundVideoProps {
  videoSrc?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  videoSrc // sem vídeo por padrão — tema claro usa apenas o gradiente suave
}) => {
  return (
    <div className={styles.videoContainer}>
      <div className={styles.fallbackBg} />
      {videoSrc && (
        <video
          className={styles.videoBg}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        />
      )}
      <div className={styles.overlay} />
    </div>
  );
};

export default BackgroundVideo;
