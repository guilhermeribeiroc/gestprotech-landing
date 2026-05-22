import React from 'react';
import styles from './BackgroundVideo.module.css';

interface BackgroundVideoProps {
  videoSrc?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  videoSrc = 'https://cdn.pixabay.com/video/2020/09/24/51090-464871903_large.mp4' // Vídeo abstrato dark tech de alta qualidade
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
