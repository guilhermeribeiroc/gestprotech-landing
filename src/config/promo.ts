/**
 * Configuração da campanha Black Friday.
 * Para mudar a oferta, as vagas ou o prazo, edite só este arquivo.
 */

// Fim da campanha (horário de Brasília). Depois dessa data o contador zera.
export const PROMO_END = '2026-11-30T23:59:59-03:00';
export const PROMO_END_LABEL = '30/11';

export const REGISTER_URL = 'https://gestprotech.com.br/registrar/';
export const WHATSAPP_URL =
  'https://wa.me/5588993699357?text=Ol%C3%A1!%20Quero%20saber%20mais%20da%20oferta%20de%20Black%20Friday%20do%20GestProTech.';

// Regras da campanha
export const SLOTS = 25; // vagas para clientes novos
export const LOCK_HOURS = 48; // o preço fica travado por esse tempo depois da reserva
export const TRIAL_DAYS = 7;

// Preço de tabela (referência para os descontos) e plano mensal sem contrato
export const PRICE_LIST = { full: 'R$ 199' };
export const PRICE_MONTHLY = { full: 'R$ 159' };
export const PRICE_UNDER = 'R$ 100'; // destaque: o anual à vista sai por menos disso ao mês

// Planos da Black Friday
export interface BfPlan {
  id: 'anual' | 'semestral';
  name: string;
  months: number;
  cash: { whole: string; full: string }; // à vista
  perMonth: { whole: string; full: string }; // mensal com contrato
  equivalent: string; // à vista dividido pelos meses
  equivWhole: string;
  equivCents: string;
  off: number; // % de desconto do equivalente mensal sobre o preço de tabela (R$ 199)
  underHundred?: boolean;
  featured?: boolean;
}

export const PLAN_ANNUAL: BfPlan = {
  id: 'anual',
  name: 'Anual',
  months: 12,
  cash: { whole: '1.199', full: 'R$ 1.199' },
  perMonth: { whole: '119', full: 'R$ 119' },
  equivalent: 'R$99,92', // 1.199 / 12
  equivWhole: '99',
  equivCents: ',92',
  off: 50, // 99,92 vs 199 = 49,8%
  underHundred: true,
  featured: true,
};

export const PLAN_SEMESTRAL: BfPlan = {
  id: 'semestral',
  name: 'Semestral',
  months: 6,
  cash: { whole: '690', full: 'R$ 690' },
  perMonth: { whole: '129', full: 'R$ 129' },
  equivalent: 'R$115', // 690 / 6
  equivWhole: '115',
  equivCents: '',
  off: 42, // 115 vs 199 = 42,2%
};

export const PLANS: BfPlan[] = [PLAN_ANNUAL, PLAN_SEMESTRAL];

// Desconto principal da campanha: anual à vista (R$ 99,92/mês) sobre o preço de tabela (R$ 199)
export const DISCOUNT_PERCENT = 50; // 49,8% arredondado
// Anual com contrato (R$ 119/mês) sobre o preço de tabela
export const DISCOUNT_CONTRACT = 40; // 40,2%
