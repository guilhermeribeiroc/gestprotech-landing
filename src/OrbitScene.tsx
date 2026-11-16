export default function OrbitScene(){
 return <div className="orbit-scene" aria-label="Processos, clientes, agenda e financeiro conectados ao GestProTech">
  <div className="orbit-line" aria-hidden="true"/>
  <div className="orbit-modules"><span>Processos</span><span>Clientes</span><span className="orbit-space"/><span>Agenda</span><span>Financeiro</span></div>
  <div className="orbit-core"><div className="orbit-ring orbit-ring-one"/><div className="orbit-ring orbit-ring-two"/><div className="orbit-center"><img src="/LOGOGEST.png" alt="GestProTech"/></div></div>
  <p>Uma plataforma. Toda a sua operação.</p>
 </div>;
}
export function Horizon(){
 return <section className="horizon-section"><p className="overline">VISÃO DO ESCRITÓRIO</p><h2>Clareza para decidir.<br/>Controle para trabalhar.</h2><div className="horizon-art" aria-hidden="true"><svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="horizon-fill"><stop stopColor="#1c3b9d" stopOpacity=".6"/><stop offset="1" stopColor="#070b18"/></radialGradient></defs><ellipse cx="500" cy="420" rx="620" ry="340" fill="url(#horizon-fill)" stroke="#4777df" strokeWidth="2"/>{Array.from({length:9},(_,i)=><ellipse key={'v'+i} cx="500" cy="420" rx={65+i*65} ry="340" fill="none" stroke="#4777df" strokeOpacity=".22"/>)}{Array.from({length:6},(_,i)=><ellipse key={'h'+i} cx="500" cy={130+i*48} rx={270+i*68} ry={30+i*12} fill="none" stroke="#4777df" strokeOpacity=".2"/>)}</svg><span className="horizon-label label-left">Processos organizados</span><span className="horizon-label label-center">Prazos acompanhados</span><span className="horizon-label label-right">Financeiro integrado</span></div><p className="horizon-description">O que importa para o seu escritório,<br/>conectado em um único sistema.</p></section>;
}
