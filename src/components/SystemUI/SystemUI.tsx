import React, { useEffect, useRef, useState } from 'react';
import {
  Users, FolderOpen, Archive, Calendar, CheckSquare, Newspaper, PieChart,
  Wallet, Share2, LayoutDashboard, Search, Plus, Zap, Printer, Filter,
  ChevronLeft, ChevronRight, Download, FileText, Clock, Scale, Check, ExternalLink,
  Calculator, Mail, Copy, Send, Sparkles,
} from 'lucide-react';
import styles from './SystemUI.module.css';

/**
 * Telas do GestProTech redesenhadas em código (dados fictícios).
 * Cada tela é desenhada numa tela fixa de 1100×640 e escalada para caber no container.
 */

export type ScreenId =
  | 'painel' | 'processos' | 'agenda' | 'financeiro' | 'publicacoes' | 'tarefas'
  | 'previdenciario' | 'emails';

const W = 1100;
const H = 640;
const SIDEBAR_W = 190;
/** escala usada no celular: texto legível, com rolagem horizontal */
const COMPACT_SCALE = 0.8;

/* ───────────────── Shell (sidebar + área principal) ───────────────── */

const NAV: { group: string; items: { id: ScreenId | 'x'; label: string; icon: React.ElementType }[] }[] = [
  {
    group: 'Gestão',
    items: [
      { id: 'painel', label: 'Painel Geral', icon: LayoutDashboard },
      { id: 'x', label: 'Todos os Clientes', icon: Users },
      { id: 'processos', label: 'Processos', icon: FolderOpen },
      { id: 'x', label: 'Arquivados', icon: Archive },
    ],
  },
  {
    group: 'Agenda & Tarefas',
    items: [
      { id: 'agenda', label: 'Agenda/Calendário', icon: Calendar },
      { id: 'tarefas', label: 'Tarefas', icon: CheckSquare },
      { id: 'publicacoes', label: 'Movimentações', icon: Newspaper },
    ],
  },
  {
    group: 'Análise',
    items: [
      { id: 'x', label: 'Estatísticas', icon: PieChart },
      { id: 'financeiro', label: 'Financeiro', icon: Wallet },
      { id: 'x', label: 'Parcerias', icon: Share2 },
    ],
  },
  {
    group: 'Novos módulos',
    items: [
      { id: 'previdenciario', label: 'Prev. e Cálculos', icon: Calculator },
      { id: 'emails', label: 'E-mails Exclusivos', icon: Mail },
    ],
  },
];

const Shell: React.FC<{ active: ScreenId; children: React.ReactNode }> = ({ active, children }) => (
  <div className={styles.shell}>
    <aside className={styles.sidebar}>
      <div className={styles.sbBrand}>
        <img src="/LOGOGEST.png" alt="" className={styles.sbLogo} />
        <strong>silvaecosta</strong>
        <span>Advocacia & Consultoria</span>
      </div>
      {NAV.map((g) => (
        <div key={g.group} className={styles.sbGroup}>
          <span className={styles.sbGroupTitle}>{g.group}</span>
          {g.items.map((it) => {
            const Icon = it.icon;
            const isActive = it.id === active;
            return (
              <div key={it.label} className={`${styles.sbItem} ${isActive ? styles.sbItemActive : ''}`}>
                <Icon size={15} />
                {it.label}
              </div>
            );
          })}
        </div>
      ))}
    </aside>
    <main className={styles.main}>{children}</main>
  </div>
);

const PageHead: React.FC<{
  icon: React.ElementType;
  title: string;
  sub: string;
  children?: React.ReactNode;
  tone?: 'teal' | 'amber' | 'red';
}> = ({ icon: Icon, title, sub, children, tone = 'teal' }) => (
  <header className={styles.pageHead}>
    <div className={`${styles.headIcon} ${styles[`tone_${tone}`]}`}><Icon size={20} /></div>
    <div className={styles.headText}>
      <h3>{title}</h3>
      <p>{sub}</p>
    </div>
    <div className={styles.headActions}>{children}</div>
  </header>
);

/* ───────────────── Telas ───────────────── */

const Painel: React.FC = () => (
  <Shell active="painel">
    <PageHead icon={LayoutDashboard} title="Boa tarde, Dra. Helena!" sub="Resumo das atividades e compromissos do escritório">
      <span className={styles.btnPrimary}><Zap size={13} /> Nova Ação</span>
      <span className={styles.btnGhost}><Printer size={13} /> Imprimir</span>
    </PageHead>

    <div className={styles.kpiRow}>
      {[
        { l: 'Total de clientes', v: '285', i: Users, c: styles.tone_teal },
        { l: 'Processos ativos', v: '295', i: FolderOpen, c: styles.tone_slate },
        { l: 'Prazos esta semana', v: '12', i: Clock, c: styles.tone_red },
        { l: 'Publicações novas', v: '38', i: Newspaper, c: styles.tone_amber },
      ].map((k) => (
        <div key={k.l} className={styles.kpi}>
          <div className={`${styles.kpiIcon} ${k.c}`}><k.i size={18} /></div>
          <div>
            <span className={styles.kpiLabel}>{k.l}</span>
            <strong className={styles.kpiValue}>{k.v}</strong>
          </div>
        </div>
      ))}
    </div>

    <div className={styles.sectionBar}>
      <h4><Calendar size={15} /> Próximos Compromissos <em className={styles.pillGreen}>Ordem cronológica</em></h4>
      <span className={styles.filterBox}><Filter size={12} /> Todos os compromissos</span>
    </div>

    <div className={styles.card}>
      {[
        { name: 'Maria D. Saraiva', area: 'BPC/LOAS (INSS)', chips: ['Perícia Médica'], date: '07/12/2026', st: 'Pendente' },
        { name: 'Marcos A. Lima', area: 'Aposentadoria por Invalidez', chips: ['Perícia Médica', 'Perícia Social'], date: '14/12/2026', st: 'Em análise' },
        { name: 'Antônio E. Matos', area: 'Auxílio-Doença (INSS)', chips: ['Audiência'], date: '15/12/2026', st: 'Pendente' },
        { name: 'Joana P. Farias', area: 'Cível — Indenização', chips: ['Prazo: Contestação'], date: '17/12/2026', st: 'Urgente' },
      ].map((r) => (
        <div key={r.name} className={styles.row}>
          <div className={styles.rowMain}>
            <div className={styles.chips}>
              {r.chips.map((c) => <span key={c} className={styles.chipCyan}>{c}</span>)}
            </div>
            <strong>{r.name}</strong>
            <small>{r.area}</small>
          </div>
          <span className={`${styles.status} ${r.st === 'Urgente' ? styles.stRed : styles.stAmber}`}>{r.st}</span>
          <span className={styles.rowDate}><Calendar size={13} /> {r.date}</span>
        </div>
      ))}
    </div>
  </Shell>
);

const Processos: React.FC = () => (
  <Shell active="processos">
    <PageHead icon={FolderOpen} title="Processos Ativos" sub="Gerencie todos os casos e movimentações ativas">
      <span className={styles.btnPrimary}><Plus size={13} /> Novo Processo</span>
    </PageHead>

    <div className={styles.card}>
      <div className={styles.searchRow}><Search size={14} /> Buscar por cliente, CPF, nº do processo, tipo de benefício…</div>
      <div className={styles.filtersRow}>
        {['Status: Todos', 'Esfera: Todas', 'Tipo: Todos', 'Ação: Todas'].map((f) => <span key={f}>{f}</span>)}
        <span className={styles.btnTeal}><Filter size={12} /> Filtrar</span>
      </div>
    </div>

    <div className={`${styles.card} ${styles.tableCard}`}>
      <div className={`${styles.tr} ${styles.th}`}>
        <span>Cliente</span><span>Nº do processo</span><span>Esfera / Área</span><span>Status</span><span />
      </div>
      {[
        ['Helena R. Albuquerque', '5004821-33.2026.4.05.8100', 'Federal', 'Aposentadoria por idade', 'Em andamento', 'ok'],
        ['Thiago P. Cavalcante', '0801254-90.2026.8.06.0001', 'Estadual', 'Indenização por danos morais', 'Pendente', 'warn'],
        ['Francisca V. Araújo', '5011733-02.2026.4.05.8100', 'Federal', 'BPC/LOAS — Pessoa com deficiência', 'Perícia marcada', 'info'],
        ['Roberto M. Nogueira', '0803391-15.2026.8.06.0112', 'Estadual', 'Cumprimento de sentença', 'Em andamento', 'ok'],
        ['Luciana B. Fontenele', '5007220-48.2026.4.05.8100', 'Federal', 'Auxílio-doença', 'Pendente', 'warn'],
        ['Ivan S. Monteiro', '0800917-64.2026.8.06.0034', 'Trabalhista', 'Verbas rescisórias', 'Acordo', 'ok'],
      ].map((r) => (
        <div key={r[1]} className={styles.tr}>
          <strong>{r[0]}</strong>
          <span className={styles.mono}>{r[1]}</span>
          <span><b className={styles.tag}>{r[2]}</b><small>{r[3]}</small></span>
          <span className={`${styles.status} ${r[5] === 'ok' ? styles.stGreen : r[5] === 'info' ? styles.stBlue : styles.stAmber}`}>{r[4]}</span>
          <span className={styles.btnGhost}>Editar</span>
        </div>
      ))}
    </div>
  </Shell>
);

const Agenda: React.FC = () => {
  const events: Record<number, { t: string; c: string }[]> = {
    3: [{ t: 'Atendimento', c: 'teal' }],
    5: [{ t: 'Audiência 14h', c: 'red' }],
    10: [{ t: 'Perícia Médica', c: 'amber' }, { t: 'Reunião', c: 'teal' }],
    12: [{ t: 'Prazo: Recurso', c: 'red' }],
    17: [{ t: 'Perícia Social', c: 'amber' }],
    19: [{ t: 'Atendimento', c: 'teal' }, { t: 'Audiência 9h', c: 'red' }],
    24: [{ t: 'Prazo: Réplica', c: 'red' }, { t: 'Reunião', c: 'teal' }],
    26: [{ t: 'Atendimento', c: 'teal' }],
    30: [{ t: 'Audiência 10h', c: 'red' }],
  };
  // Novembro/2026 começa num domingo
  const cells = Array.from({ length: 35 }, (_, i) => (i + 1 <= 30 ? i + 1 : null));
  return (
    <Shell active="agenda">
      <PageHead icon={Calendar} title="Agenda" sub="Audiências, perícias, prazos e atendimentos — sincronizado com o Google Agenda">
        <span className={styles.btnGhost}><ChevronLeft size={13} /></span>
        <span className={styles.monthLabel}>Novembro 2026</span>
        <span className={styles.btnGhost}><ChevronRight size={13} /></span>
        <span className={styles.btnPrimary}><Plus size={13} /> Novo compromisso</span>
      </PageHead>
      <div className={styles.agendaGrid}>
        <div className={`${styles.card} ${styles.calendar}`}>
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => <span key={d} className={styles.dow}>{d}</span>)}
          {cells.map((d, i) => (
            <div key={i} className={`${styles.day} ${d === 24 ? styles.dayToday : ''} ${d === null ? styles.dayEmpty : ''}`}>
              {d && <b>{d}</b>}
              {d && events[d]?.map((e) => (
                <span key={e.t} className={`${styles.ev} ${styles[`ev_${e.c}`]}`}>{e.t}</span>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.agendaSide}>
          <h4>Hoje · 24/11</h4>
          {[
            { h: '09:30', t: 'Atendimento — Marcos Lima', s: 'Presencial', c: 'teal' },
            { h: '14:00', t: 'Audiência — Proc. 0803391', s: '2ª Vara Cível', c: 'red' },
            { h: '17:00', t: 'Prazo: Réplica', s: 'Joana Farias', c: 'amber' },
          ].map((e) => (
            <div key={e.h} className={`${styles.agendaItem} ${styles[`bar_${e.c}`]}`}>
              <time>{e.h}</time>
              <div><strong>{e.t}</strong><small>{e.s}</small></div>
            </div>
          ))}
          <div className={styles.syncBadge}><Check size={13} /> Google Agenda sincronizado</div>
        </div>
      </div>
    </Shell>
  );
};

const Financeiro: React.FC = () => {
  const bars = [38, 52, 44, 61, 58, 72, 66, 80, 74, 92, 86, 100];
  const months = ['D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N'];
  return (
    <Shell active="financeiro">
      <PageHead icon={Wallet} title="Resumo Financeiro" sub="Controle de honorários, despesas e lançamentos" tone="amber">
        <span className={styles.segmented}><b>Mês corrente</b><i>Total histórico</i></span>
        <span className={styles.btnGreen}><Download size={13} /> Excel</span>
        <span className={styles.btnRed}><FileText size={13} /> PDF</span>
      </PageHead>

      <div className={styles.kpiRow5}>
        {[
          { l: 'Faturamento bruto', v: 'R$ 48.250', c: '' },
          { l: 'Repasse parceiros', v: '− R$ 3.600', c: styles.neg },
          { l: 'Despesas', v: '− R$ 6.820', c: styles.neg },
          { l: 'Lucro líquido', v: 'R$ 37.830', c: styles.pos },
          { l: 'A receber', v: 'R$ 12.400', c: styles.warn },
        ].map((k) => (
          <div key={k.l} className={styles.kpiMini}>
            <span>{k.l}</span><strong className={k.c}>{k.v}</strong>
          </div>
        ))}
      </div>

      <div className={styles.finGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Faturamento mês a mês</div>
          <div className={styles.chart}>
            {bars.map((b, i) => (
              <div key={i} className={styles.barCol}>
                <div className={`${styles.bar} ${i === bars.length - 1 ? styles.barNow : ''}`} style={{ height: `${b}%` }} />
                <span>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Extrato de entradas</div>
          {[
            ['Honorários — H. Albuquerque', '12/11', 'R$ 2.500'],
            ['Parcela 3/6 — T. Cavalcante', '10/11', 'R$ 1.200'],
            ['Êxito — F. Araújo', '07/11', 'R$ 8.000'],
            ['Parcela 2/4 — R. Nogueira', '05/11', 'R$ 950'],
          ].map((e) => (
            <div key={e[0]} className={styles.extRow}>
              <div><strong>{e[0]}</strong><small>{e[1]}</small></div>
              <span className={styles.stGreen + ' ' + styles.status}>{e[2]}</span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
};

const Publicacoes: React.FC = () => (
  <Shell active="publicacoes">
    <PageHead icon={Newspaper} title="Movimentações" sub="Publicações do Diário Oficial pela sua OAB — monitoramento 24h, sem custo extra" tone="red">
      <span className={styles.badgeRed}>38 novas</span>
    </PageHead>
    <div className={styles.pillTabs}>
      <span className={styles.pillTabActive}>Todas (42)</span>
      <span>Diário Oficial (42)</span>
      <span>Andamentos DataJud (0)</span>
    </div>
    {[
      { tr: 'TJCE', d: '24/11/2026', t: 'ESTADO DO CEARÁ — PODER JUDICIÁRIO — 1ª VARA CÍVEL DA COMARCA DE MORADA NOVA. Intimação da parte autora para manifestação sobre o laudo pericial no prazo de 15 (quinze) dias…', hot: false },
      { tr: 'TRF5', d: '23/11/2026', t: 'JUSTIÇA FEDERAL DA 5ª REGIÃO — 29ª VARA FEDERAL/CE. Procedimento do Juizado Especial Cível. Designada perícia médica; intimem-se as partes para ciência da data…', hot: true },
      { tr: 'TRF5', d: '23/11/2026', t: 'PODER JUDICIÁRIO — 29ª Vara Federal CE. Sentença publicada: julgo procedente o pedido para condenar o INSS à concessão do benefício…', hot: true },
    ].map((p, i) => (
      <div key={i} className={`${styles.pubCard} ${p.hot ? styles.pubHot : ''}`}>
        <div className={styles.pubTop}>
          <span className={p.hot ? styles.tagRed : styles.tag}>{p.tr}</span>
          <span className={styles.pubDate}><Calendar size={12} /> {p.d}</span>
          <span className={styles.btnGhost}><ExternalLink size={12} /> Ver íntegra</span>
        </div>
        <p>{p.t}</p>
      </div>
    ))}
  </Shell>
);

const Tarefas: React.FC = () => {
  const cols = [
    { t: 'A fazer', n: 4, c: 'slate', cards: [
      ['Protocolar recurso — T. Cavalcante', 'Prazo 27/11', 'red'],
      ['Reunir documentos — F. Araújo', 'Prazo 01/12', 'amber'],
      ['Ligar para cliente — R. Nogueira', 'Sem prazo', 'slate'],
    ] },
    { t: 'Em andamento', n: 3, c: 'cyan', cards: [
      ['Elaborar petição inicial — L. Fontenele', 'Dra. Helena', 'cyan'],
      ['Contrato de honorários — I. Monteiro', 'Dr. Paulo', 'cyan'],
    ] },
    { t: 'Concluído', n: 12, c: 'green', cards: [
      ['Procuração assinada — H. Albuquerque', 'Hoje', 'green'],
      ['Audiência realizada — Proc. 0803391', 'Ontem', 'green'],
    ] },
  ];
  return (
    <Shell active="tarefas">
      <PageHead icon={CheckSquare} title="Tarefas" sub="Quadro kanban para organizar a rotina da equipe">
        <span className={styles.btnPrimary}><Plus size={13} /> Nova tarefa</span>
      </PageHead>
      <div className={styles.kanban}>
        {cols.map((c) => (
          <div key={c.t} className={styles.kCol}>
            <div className={styles.kHead}><i className={styles[`dot_${c.c}`]} /> {c.t} <b>{c.n}</b></div>
            {c.cards.map((k) => (
              <div key={k[0]} className={styles.kCard}>
                <strong>{k[0]}</strong>
                <span className={`${styles.kMeta} ${styles[`meta_${k[2]}`]}`}><Clock size={11} /> {k[1]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Shell>
  );
};


const Previdenciario: React.FC = () => {
  const vinculos = [
    { n: 'Comercial Nordeste Ltda', p: '03/1993 a 08/2004', l: 0.5, w: 35 },
    { n: 'Prefeitura de Morada Nova', p: '09/2004 a 12/2015', l: 35.4, w: 34.2 },
    { n: 'Contribuinte individual', p: '01/2016 a 11/2026', l: 69.7, w: 30.3 },
  ];
  const regras = [
    { n: 'Pedágio 100%', st: 'Elegível', c: 'ok', v: 'R$ 4.180,00', best: true },
    { n: 'Regra de pontos', st: 'Elegível', c: 'ok', v: 'R$ 4.012,80' },
    { n: 'Idade mínima progressiva', st: 'Faltam 8 meses', c: 'warn', v: 'R$ 4.012,80' },
    { n: 'Regra permanente (idade)', st: 'Faltam 4 anos', c: 'no', v: 'R$ 4.012,80' },
  ];
  return (
    <Shell active="previdenciario">
      <PageHead icon={Calculator} title="Análise Previdenciária" sub="CNIS, tempo de contribuição, carência e cálculo da RMI">
        <span className={styles.btnGhost}><FileText size={13} /> Salvar no processo</span>
        <span className={styles.btnPrimary}><Plus size={13} /> Novo cálculo</span>
      </PageHead>

      <div className={`${styles.card} ${styles.clientStrip}`}>
        <span className={styles.avatar}>HA</span>
        <div><strong>Helena R. Albuquerque</strong><small>58 anos · Mulher · DER 12/11/2026</small></div>
        <span className={styles.chipCyan}>Aposentadoria programada</span>
        <span className={styles.recalc}><Sparkles size={12} /> Cálculo atualizado</span>
      </div>

      <div className={styles.kpiRow}>
        {[
          { l: 'Tempo de contribuição', v: '33a 7m 10d' },
          { l: 'Carência', v: '403 / 180' },
          { l: 'Média salarial', v: 'R$ 4.180' },
          { l: 'Melhor RMI', v: 'R$ 4.180' },
        ].map((k, i) => (
          <div key={k.l} className={`${styles.kpiMini} ${i === 3 ? styles.kpiBest : ''}`}>
            <span>{k.l}</span><strong className={i === 3 ? styles.pos : ''}>{k.v}</strong>
          </div>
        ))}
      </div>

      <div className={styles.prevGrid}>
        <div className={styles.card}>
          <div className={styles.cardTitle}>Vínculos do CNIS</div>
          <div className={styles.timeline}>
            {vinculos.map((v) => (
              <div key={v.n} className={styles.tlRow}>
                <div className={styles.tlLabel}><strong>{v.n}</strong><small>{v.p}</small></div>
                <div className={styles.tlTrack}><i style={{ left: `${v.l}%`, width: `${v.w}%` }} /></div>
              </div>
            ))}
            <div className={styles.tlAxis}><span>1993</span><span>2004</span><span>2015</span><span>2026</span></div>
          </div>
          <div className={styles.miniStats}>
            {[
              ['Até a EC 103/2019', '24a 9m'],
              ['Após a reforma', '8a 10m'],
              ['Idade na DER', '58a 3m'],
              ['Pedágio cumprido', 'Sim'],
            ].map((m) => (
              <div key={m[0]}><span>{m[0]}</span><b>{m[1]}</b></div>
            ))}
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>Regras de concessão · cálculo da RMI</div>
          <div className={styles.formula}>RMI = <b>média salarial</b> × <b>coeficiente</b></div>
          {regras.map((r) => (
            <div key={r.n} className={`${styles.regra} ${r.best ? styles.regraBest : ''}`}>
              <div><strong>{r.n}</strong>{r.best && <em>Melhor opção</em>}</div>
              <span className={`${styles.status} ${r.c === 'ok' ? styles.stGreen : r.c === 'warn' ? styles.stAmber : styles.stRed}`}>{r.st}</span>
              <b className={styles.regraVal}>{r.v}</b>
            </div>
          ))}
          <div className={styles.conclusao}>
            <Check size={16} />
            <div>
              <strong>Melhor opção: Pedágio 100%</strong>
              <small>RMI de R$ 4.180,00 na DER 12/11/2026, R$ 167,20 a mais por mês que a regra de pontos.</small>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.simNote}>Simulação ilustrativa com dados fictícios.</p>
    </Shell>
  );
};

const Emails: React.FC = () => {
  const list = [
    ['HA', 'Helena R. Albuquerque', 'helena.albuquerque@silvaecosta.com.br', 'Ativo'],
    ['TC', 'Thiago P. Cavalcante', 'thiago.cavalcante@silvaecosta.com.br', 'Ativo'],
    ['FA', 'Francisca V. Araújo', 'francisca.araujo@silvaecosta.com.br', 'Ativo'],
    ['RN', 'Roberto M. Nogueira', 'roberto.nogueira@silvaecosta.com.br', 'Novo'],
    ['LF', 'Luciana B. Fontenele', 'luciana.fontenele@silvaecosta.com.br', 'Ativo'],
    ['IM', 'Ivan S. Monteiro', 'ivan.monteiro@silvaecosta.com.br', 'Ativo'],
    ['MS', 'Maria D. Saraiva', 'maria.saraiva@silvaecosta.com.br', 'Ativo'],
    ['AM', 'Antônio E. Matos', 'antonio.matos@silvaecosta.com.br', 'Ativo'],
  ];
  return (
    <Shell active="emails">
      <PageHead icon={Mail} title="E-mails Exclusivos" sub="Um endereço de e-mail exclusivo para cada cliente do escritório">
        <span className={styles.btnPrimary}><Plus size={13} /> Gerar e-mail</span>
      </PageHead>
      <div className={styles.mailGrid}>
        <div className={`${styles.card} ${styles.tableCard}`}>
          <div className={styles.cardTitle}>Clientes com e-mail exclusivo</div>
          {list.map((r) => (
            <div key={r[2]} className={styles.mailRow}>
              <span className={styles.avatar}>{r[0]}</span>
              <div className={styles.mailInfo}><strong>{r[1]}</strong><span className={styles.mono}>{r[2]}</span></div>
              <span className={`${styles.status} ${r[3] === 'Novo' ? styles.stBlue : styles.stGreen}`}>{r[3]}</span>
              <span className={styles.btnGhost}><Copy size={12} /></span>
            </div>
          ))}
        </div>

        <div className={`${styles.card} ${styles.genCard}`}>
          <div className={styles.genTitle}><Sparkles size={14} /> Gerar e-mail exclusivo</div>
          <label>Cliente</label>
          <div className={styles.field}>Roberto M. Nogueira</div>
          <label>Endereço gerado</label>
          <div className={`${styles.field} ${styles.fieldMail}`}>
            <span className={styles.mono}>roberto.nogueira@silvaecosta.com.br</span>
            <span className={styles.okBadge}><Check size={11} /> Disponível</span>
          </div>
          <div className={styles.check}><Check size={12} /> Vincular à ficha e aos processos</div>
          <div className={styles.check}><Check size={12} /> Enviar o endereço ao cliente</div>
          <div className={styles.mailPreview}>
            <small>Mensagem ao cliente</small>
            <strong>Seu e-mail exclusivo foi criado</strong>
            <p>Olá, Roberto! Seu endereço de e-mail exclusivo já está pronto.</p>
          </div>
          <span className={`${styles.btnPrimary} ${styles.btnBlock}`}><Send size={13} /> Gerar e-mail exclusivo</span>
          <div className={styles.syncBadge}><Check size={13} /> E-mail criado e vinculado ao cliente</div>
        </div>
      </div>
    </Shell>
  );
};

const SCREENS: Record<ScreenId, React.FC> = {
  painel: Painel,
  processos: Processos,
  agenda: Agenda,
  financeiro: Financeiro,
  publicacoes: Publicacoes,
  tarefas: Tarefas,
  previdenciario: Previdenciario,
  emails: Emails,
};

const SCREEN_LABELS: Record<ScreenId, string> = {
  painel: 'Painel Geral',
  processos: 'Processos',
  agenda: 'Agenda',
  financeiro: 'Financeiro',
  publicacoes: 'Publicações por OAB',
  tarefas: 'Tarefas',
  previdenciario: 'Análise Previdenciária',
  emails: 'E-mails Exclusivos',
};

/* ───────────────── Janela do app (moldura + escala) ───────────────── */

interface AppWindowProps {
  screen: ScreenId;
  /** Renderiza só a tela ativa (mais leve quando não há troca de abas) */
  single?: boolean;
  className?: string;
}

export const AppWindow: React.FC<AppWindowProps> = ({ screen, single = false, className = '' }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  // Em telas estreitas a tela do sistema não cabe inteira: mostra maior, sem a barra lateral, e permite arrastar.
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const narrow = w < 560;
      setCompact(narrow);
      setScale(narrow ? COMPACT_SCALE : w / W);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const canvasW = compact ? W - SIDEBAR_W : W;

  return (
    <div className={`${styles.window} ${className}`}>
      <div className={styles.chrome} aria-hidden="true">
        <i /><i /><i />
        <span className={styles.url}><Scale size={10} /> gestprotech.com.br</span>
      </div>
      <div
        ref={wrapRef}
        className={`${styles.viewport} ${compact ? styles.viewportScroll : ''}`}
        style={{ height: H * scale }}
        role="img"
        aria-label={`Tela de ${SCREEN_LABELS[screen]} do GestProTech`}
      >
        <div className={styles.scroller} style={{ width: canvasW * scale, height: H * scale }}>
          <div
            className={`${styles.canvas} ${compact ? styles.canvasCompact : ''}`}
            style={{ transform: `scale(${scale})` }}
            aria-hidden="true"
          >
            {(single ? [screen] : (Object.keys(SCREENS) as ScreenId[])).map((id) => {
              const Screen = SCREENS[id];
              return (
                <div key={id} className={`${styles.screen} ${id === screen ? styles.screenActive : ''}`}>
                  <Screen />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {compact && (
        <p className={styles.swipeHint} aria-hidden="true">
          <ChevronLeft size={12} /> Arraste para o lado para ver a tela inteira <ChevronRight size={12} />
        </p>
      )}
    </div>
  );
};
