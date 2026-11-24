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

// Planos da Black Friday (valores iguais aos do sistema)
export interface BfPlan {
  id: 'anual' | 'semestral';
  name: string;
  cash: { whole: string; full: string }; // à vista (Pix, boleto ou cartão)
  equivalent: string; // à vista dividido pelos meses
  equivWhole: string;
  equivCents: string;
  off: number; // % de desconto do equivalente mensal sobre o preço de tabela (R$ 199)
  underHundred?: boolean;
  featured?: boolean;
  // parcelado no Pix ou boleto, com fidelidade
  installments?: { count: number; value: string; total: string; lockMonths: number };
  perks?: string[]; // brindes
}

export const PLAN_ANNUAL: BfPlan = {
  id: 'anual',
  name: 'Anual',
  cash: { whole: '1.199', full: 'R$ 1.199' },
  equivalent: 'R$ 99,92', // 1.199 / 12
  equivWhole: '99',
  equivCents: ',92',
  off: 50, // 99,92 vs 199 = 49,8%
  underHundred: true,
  featured: true,
  installments: { count: 12, value: 'R$ 99,92', total: 'R$ 1.199,04', lockMonths: 12 },
  perks: ['Importação dos cadastros grátis', '1 hora de treinamento individual'],
};

export const PLAN_SEMESTRAL: BfPlan = {
  id: 'semestral',
  name: 'Semestral',
  cash: { whole: '690', full: 'R$ 690' },
  equivalent: 'R$ 115', // 690 / 6
  equivWhole: '115',
  equivCents: '',
  off: 42, // 115 vs 199 = 42,2%
};

export const PLANS: BfPlan[] = [PLAN_ANNUAL, PLAN_SEMESTRAL];

// Desconto principal da campanha: anual (R$ 99,92/mês) sobre o preço de tabela (R$ 199)
export const DISCOUNT_PERCENT = 50; // 49,8% arredondado
