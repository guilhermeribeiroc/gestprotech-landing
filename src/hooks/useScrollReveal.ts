import { useLayoutEffect } from 'react';

/**
 * Efeitos de entrada ao rolar a página.
 * Qualquer elemento com data-reveal="up|left|right|scale|blur|fade" aparece quando entra na tela.
 * Use data-reveal-delay="0.1" (segundos) para escalonar. Respeita "reduzir movimento".
 */
export function useScrollReveal() {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    els.forEach((el) => {
      const delay = el.dataset.revealDelay;
      if (delay) el.style.setProperty('--rd', `${delay}s`);
    });
    root.classList.add('reveal-on');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // também libera o que já ficou para trás (página recarregada no meio)
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.classList.remove('reveal-on');
      els.forEach((el) => el.classList.remove('is-in'));
    };
  }, []);
}
