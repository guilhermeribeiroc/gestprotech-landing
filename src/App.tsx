import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registra ScrollTrigger globalmente no GSAP
gsap.registerPlugin(ScrollTrigger);

// Importa os Componentes da Landing Page
import BackgroundVideo from './components/BackgroundVideo/BackgroundVideo';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Stats from './components/Stats/Stats';
import Features from './components/Features/Features';
import InteractiveTabs from './components/InteractiveTabs/InteractiveTabs';
import Pricing from './components/Pricing/Pricing';
import FinalCTA from './components/FinalCTA/FinalCTA';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';

function App() {
  useEffect(() => {
    // Inicializa a rolagem inercial suave Lenis
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing customizado e fluido
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    // Atualiza o ScrollTrigger do GSAP sempre que o Lenis rolar a tela
    lenis.on('scroll', ScrollTrigger.update);

    // Adiciona a renderização do Lenis ao Ticker do GSAP (mesmo frame rate)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Desativa a suavização de lag interna para evitar dessincronia física de scroll e GSAP
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      {/* Vídeo de background com overlay radial */}
      <BackgroundVideo />
      
      {/* Navbar suspensa estilo HUD */}
      <Navbar />
      
      <main>
        {/* Painel Hero,Headline e mockup */}
        <Hero />
        
        {/* Métricas que contam progressivamente */}
        <Stats />
        
        {/* Grid de 12 Funcionalidades + Modo Imobiliário */}
        <Features />
        
        {/* Simulador Interativo do Sistema com rotador de 4s */}
        <InteractiveTabs />
        
        {/* Card do plano de alta conversão */}
        <Pricing />
        
        {/* Chamada Final de conversão */}
        <FinalCTA />
      </main>

      {/* Rodapé institucional e contatos */}
      <Footer />

      {/* Botão de WhatsApp Flutuante com efeito pulso */}
      <WhatsAppButton />
    </>
  );
}

export default App;
