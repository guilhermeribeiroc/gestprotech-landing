import { useEffect, useState } from 'react';
import './campaign.css';
// Centraliza a oferta vigente junto à apresentação, conforme o briefing.
// eslint-disable-next-line react-refresh/only-export-components
export const OFERTA = {
  inicio: '2026-11-15T00:00:00-03:00', fim: '2026-12-01T00:00:00-03:00',
  mensalTabela: 199,
  novos: { anual: 1399, mensal: 116.58, mesesPagos: 7, desconto: 41, semestral: 750, contratoAnual: 139, contratoSemestral: 135, vagas: 25 },
  clientes: { anual: 1199, meses: 13, semestral: 690, mesesSemestral: 7, vagas: 15 },
};
const o = OFERTA;
const money = (v:number) => v.toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
const link = (perfil = '') => `https://wa.me/5588993699357?text=${encodeURIComponent(`Olá! Quero a oferta Black Friday GestProTech. Perfil: ${perfil === 'cliente' ? 'cliente atual' : perfil === 'novo' ? 'novo escritório' : 'a confirmar'}. Gostaria de confirmar o plano e as opções à vista, cartão em 6x ou 8x com taxa, ou mensal com contrato para novos escritórios. Origem: landing / blackfriday2026.`)}`;
const active = (now:number) => now >= Date.parse(o.inicio) && now < Date.parse(o.fim);
// eslint-disable-next-line react-refresh/only-export-components
export function useCampaign() {
  const [now,setNow] = useState(Date.now);
  useEffect(() => { const id = setInterval(() => setNow(Date.now()),1000); return () => clearInterval(id); },[]);
  return { now, enabled:active(now) };
}
export function Campaign({now}:{now:number}) {
  const [closed,setClosed] = useState(false);
  const [paused,setPaused] = useState(false);
  useEffect(() => { document.documentElement.dataset.campaign = closed ? 'closed' : 'open'; return () => {delete document.documentElement.dataset.campaign;}; },[closed]);
  const seconds = Math.max(0,Math.floor((Date.parse(o.fim)-now)/1000));
  return <div className="campaign">
    {!closed && <aside className={`campaign-bar ${paused?'paused':''}`}><div><span>BLACK FRIDAY GESTPROTECH · Pague {o.novos.mesesPagos} meses, use 12* · {o.novos.vagas} vagas</span></div><a href={link()}>Garantir minha oferta</a><button aria-label={paused?'Retomar animação':'Pausar animação'} onClick={()=>setPaused(!paused)}>Ⅱ</button><button aria-label="Fechar faixa promocional" onClick={()=>setClosed(true)}>×</button></aside>}
    <section className="campaign-hero" id="top">
      <div className="campaign-copy"><p className="eyebrow">BLACK FRIDAY / 16—30 NOVEMBRO</p><h1>Pague {o.novos.mesesPagos} meses.<br/><em>Use 12.*</em></h1><p className="intro">O trabalho do seu escritório, em um só lugar.<br/>Processos, clientes, agenda e financeiro.</p>
      <div className="hero-price"><div><span>Anual à vista · novos escritórios</span><strong>{money(o.novos.anual)}</strong><p>{money(o.novos.mensal)} por mês equivalente</p></div><span className="saving-badge">{o.novos.desconto}% OFF*</span></div>
      <p className="price-explainer">Tabela: 12 × {money(o.mensalTabela)} = <s>{money(o.mensalTabela * 12)}</s><br/>Economia de <b>{money(o.mensalTabela * 12 - o.novos.anual)}</b> no anual à vista.</p>
      <div className="campaign-actions"><a href={link('novo')}>Quero essa condição ↗</a><a href={link('cliente')}>Já sou cliente</a></div><p className="campaign-fineprint">*Sobre o mensal de tabela de {money(o.mensalTabela)}. Condições válidas de 16 a 30/11.</p></div>
      <div className="hero-product"><div className="product-browser"><span>GestProTech</span><span>Visão geral do escritório</span></div><img src="/screenshots/painel-geral.jpg" alt="Tela real do GestProTech: visão geral de processos, agenda e financeiro" fetchPriority="high"/><div className="hero-product-caption"><span>Seu próximo prazo. Seu próximo passo.</span><span>Uma visão completa.</span></div><div className="hero-deadline"><p>Condições até 30/11<br/><span>23:59 · Fortaleza</span></p><div className="countdown" role="timer">{[[Math.floor(seconds/86400),'dias'],[Math.floor(seconds/3600)%24,'horas'],[Math.floor(seconds/60)%60,'min'],[seconds%60,'seg']].map(([n,l])=><div key={l}><b>{String(n).padStart(2,'0')}</b><span>{l}</span></div>)}</div></div></div>
    </section>
    <section className="campaign-offers" id="ofertas-black-friday"><p className="eyebrow">SEU PRÓXIMO PASSO</p><h2>Comece agora. Ou renove por mais tempo.</h2><div className="offer-grid"><article><p>NOVOS ESCRITÓRIOS</p><h3>Horizonte Black</h3><p>Para quem está chegando · anual</p><strong>{money(o.novos.anual)}</strong><p>Anual à vista · {money(o.novos.mensal)} por mês</p><p className="offer-tag">Pague {o.novos.mesesPagos} meses, use 12* · {o.novos.desconto}% OFF*</p><ul><li>Importação dos cadastros grátis</li><li>Treinamento individual de 1 hora</li><li>Semestral: {money(o.novos.semestral)} à vista ({money(o.novos.semestral/6)}/mês)</li></ul><p><b>Outras formas de pagar</b><br/>Cartão em 6x ou 8x, com taxa a confirmar.<br/><b>Mensal com contrato</b><br/>Anual: 12x de {money(o.novos.contratoAnual)}<br/>Semestral: 6x de {money(o.novos.contratoSemestral)}</p><a href={link('novo')}>Garantir oferta para meu escritório →</a></article><article><p>CLIENTES GESTPROTECH</p><h3>Renovação Black</h3><p>Para quem já é cliente · anual</p><strong>{money(o.clientes.anual)}</strong><p>Anual à vista · {o.clientes.meses} meses de acesso</p><p className="offer-tag">Leve {o.clientes.meses} meses pagando menos de 10*</p><ul><li>Semestral: {money(o.clientes.semestral)} com {o.clientes.mesesSemestral} meses</li><li>{o.clientes.vagas} vagas para clientes atuais</li></ul><a href={link('cliente')}>Garantir minha renovação →</a></article></div><p>*Percentual e meses pagos calculados sobre o mensal de tabela de R$ 199. Clientes: sobre a mensalidade atual.</p>
    <section className="campaign-capacity"><div><h2>Quando acabar,<br/>acabou.</h2><p>Vagas exclusivas para esta campanha.</p></div><div><strong>{o.novos.vagas} vagas</strong><p>Novos escritórios</p><hr/><strong>{o.clientes.vagas} vagas</strong><p>Clientes atuais</p></div></section>
    <section className="campaign-referral"><h2>Indique e ganhe.</h2><p>Cada colega indicado que assinar rende 1 mês de acesso para você. Até 3 meses.</p></section><section className="campaign-faq"><h2>Dúvidas, resolvidas.</h2>{[
      ['Como funciona a vaga?','A vaga fica reservada por 48h e é confirmada com o pagamento.'],
      ['Quais são as formas de pagamento?','À vista, no cartão ou mensal com contrato. Cartão em 6x ou 8x, com taxa. Confira os contratos para novos escritórios no card acima.'],
      ['O que são os meses extras?',`Clientes atuais recebem ${o.clientes.meses} meses no anual ou ${o.clientes.mesesSemestral} meses no semestral.`],
      ['Como indicar?','Indique um colega e informe sua indicação ao contratar. Cada colega indicado que assinar rende 1 mês de acesso, até 3 meses.'],
    ].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section></section><a className="campaign-mobile" href={link()}>Black Friday · Garantir minha oferta →</a>
  </div>;
}
export function DailyBenefits(){return <section className="normal-plans"><h2>O que muda no seu dia</h2><div className="daily-grid"><p>Prazos que avisam antes.</p><p>Clientes no WhatsApp sem trocar de tela.</p><p>Processos do PJe sem digitar.</p></div></section>}
