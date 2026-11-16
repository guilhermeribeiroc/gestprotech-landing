import { useRef, useState } from 'react';

const plans = [
  { name: 'Flex', period: 'Mensal', price: '159,00', equivalent: '159,00', card6: '—', card8: '—', total6: '—', total8: '—', contract: '159,00', contractTotal: '159,00', months: 1, description: 'Para quem prefere pagar mês a mês.' },
  { name: 'Ritmo', period: 'Trimestral', price: '429,30', equivalent: '143,10', card6: '79,21', card8: '61,99', total6: '475,26', total8: '495,92', contract: '147,00', contractTotal: '441,00', months: 3, description: 'Um compromisso de três meses.' },
  { name: 'Evolução', period: 'Semestral', price: '810,90', equivalent: '135,15', card6: '149,62', card8: '117,08', total6: '897,72', total8: '936,64', contract: '141,00', contractTotal: '846,00', months: 6, description: 'Seis meses de acesso ao sistema.' },
  { name: 'Horizonte', period: 'Anual', price: '1.526,40', equivalent: '127,20', card6: '281,65', card8: '220,39', total6: '1.689,90', total8: '1.763,12', contract: '149,00', contractTotal: '1.788,00', months: 12, description: 'Um ano de gestão com o melhor valor mensal.' },
];
const payments = ['À vista', 'Cartão em 6x', 'Cartão em 8x', 'Mensal com contrato'];

export default function Plans() {
  const [selected, setSelected] = useState(0);
  const [payment, setPayment] = useState('Mensal sem fidelidade');
  const dialog = useRef<HTMLDialogElement>(null);
  const plan = plans[selected];
  const card = payment.startsWith('Cartão');
  const total = payment === 'Cartão em 6x' ? plan.total6 : payment === 'Cartão em 8x' ? plan.total8 : payment === 'Mensal com contrato' ? plan.contractTotal : plan.price;
  const amount = payment === 'Cartão em 6x' ? `6x de R$ ${plan.card6}` : payment === 'Cartão em 8x' ? `8x de R$ ${plan.card8}` : payment === 'Mensal com contrato' ? `${plan.months}x de R$ ${plan.contract}` : `R$ ${plan.price}${plan.months === 1 ? '/mês' : ' à vista'}`;
  const message = `Olá! Quero contratar o GestProTech. Plano ${plan.name} (${plan.period}, ${plan.months} ${plan.months === 1 ? 'mês' : 'meses'}). Forma de pagamento: ${payment}. ${amount}. Total: R$ ${total}. Podem me orientar sobre o pagamento e a ativação?`;
  return <section className="normal-plans" id="preco">
    <div className="plans-heading"><div><p className="plans-eyebrow">PLANOS GESTPROTECH</p><h2>Escolha por quanto tempo.<br/>Conte com a mesma gestão.</h2></div><p>Todos os períodos dão acesso ao GestProTech. Compare a duração e a forma de pagamento para decidir o que faz sentido para o seu escritório.</p></div>
    <div className="payment-guide"><span>À vista</span><span>Cartão em 6x ou 8x, com taxa</span><span>Mensal com contrato</span></div>
    <div className="plans-grid">{plans.map((p, index) => <article key={p.name} className={index === 3 ? 'plan-featured' : ''}>
      <p className="plan-label">{index === 3 ? 'MELHOR VALOR' : p.period.toUpperCase()}</p><h3>{p.name}</h3><p className="plan-description">{p.description}</p>
      <div className="plan-monthly"><strong>R$ {p.equivalent}</strong><span>/mês{p.months > 1 ? ' equivalente' : ''}</span></div>
      <p className="plan-total">{p.months === 1 ? 'De R$ 199 de tabela. Sem fidelidade.' : `R$ ${p.price} à vista por ${p.months} meses.`}</p>
      <ul><li>{p.months === 1 ? 'Pagamento mensal' : `${p.months} meses de acesso`}</li><li>{p.months === 1 ? 'Cancele quando quiser' : `Cartão: 6x de R$ ${p.card6} ou 8x de R$ ${p.card8}`}</li><li>{p.months === 1 ? 'Sem compromisso anual' : `Contrato: ${p.months}x de R$ ${p.contract}`}</li></ul>
      <button className="plan-choose" onClick={() => {setSelected(index);setPayment(p.months === 1 ? 'Mensal sem fidelidade' : 'À vista');dialog.current?.showModal();}}>Escolher {p.name} <span aria-hidden="true">→</span></button>
    </article>)}</div>
    <p className="plans-disclosure">Condições regulares. À vista no Pix ou boleto. O cartão já inclui a taxa de parcelamento. Mensal com contrato exige fidelidade pelo período escolhido. Os valores equivalentes por mês são referências do pagamento à vista.</p>
    <div className="plans-next"><h3>Da escolha ao primeiro acesso.</h3><ol><li><b>01 · Escolha</b><span>Selecione seu plano e a forma de pagamento.</span></li><li><b>02 · Confirme</b><span>A equipe confirma os valores e orienta a contratação.</span></li><li><b>03 · Acesse</b><span>Seu cadastro passa por análise e ativação da equipe.</span></li></ol></div>
    <dialog ref={dialog} className="plan-dialog" aria-labelledby="plan-dialog-title" onClick={event => {if(event.target === event.currentTarget)dialog.current?.close();}}>
      <button className="dialog-close" aria-label="Fechar escolha de plano" onClick={()=>dialog.current?.close()}>×</button><p className="plans-eyebrow">SUA ESCOLHA</p><h2 id="plan-dialog-title">Plano {plan.name}</h2><p>{plan.period} · {plan.months} {plan.months === 1 ? 'mês' : 'meses'} de acesso</p>
      {plan.months > 1 && <fieldset><legend>Como prefere pagar?</legend>{payments.map(option=><label key={option}><input type="radio" name="payment" value={option} checked={payment===option} onChange={()=>setPayment(option)}/>{option}</label>)}</fieldset>}
      <div className="selection-summary"><b>{payment}</b><p>{amount}</p><p>Total: R$ {total}{plan.months === 1 ? ' por mês' : ''}</p><span>{card ? 'Taxa de parcelamento já incluída. O número de parcelas do cartão não altera o período de acesso contratado.' : payment === 'Mensal com contrato' ? 'Pagamento mensal com contrato e fidelidade pelo período escolhido.' : 'Confirme sua escolha com a equipe para receber as orientações de pagamento.'}</span></div>
      <a className="plan-choose" href={`https://wa.me/5588993699357?text=${encodeURIComponent(message)}`}>Continuar com a equipe no WhatsApp →</a><p className="dialog-note">Você enviará sua escolha para o atendimento. Nenhuma cobrança é feita nesta página.</p><a className="registration-link" href="https://gestprotech.com.br/registrar/">Prefiro iniciar meu cadastro</a><p className="dialog-note">O cadastro depende de análise e ativação da equipe.</p>
    </dialog>
  </section>;
}
