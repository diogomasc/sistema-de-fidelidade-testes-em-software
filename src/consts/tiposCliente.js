/**
 * Constantes relacionadas aos tipos de clientes e suas regras de pontuação
 */

// Tipos de cliente disponíveis no sistema
export const TIPOS_CLIENTE = {
  PADRAO: 'PADRAO',
  PREMIUM: 'PREMIUM',
  VIP: 'VIP',
};

// Multiplicadores de pontos por tipo de cliente (pontos por R$1 gasto)
export const MULTIPLICADOR_PONTOS = {
  [TIPOS_CLIENTE.PADRAO]: 1.0,
  [TIPOS_CLIENTE.PREMIUM]: 1.5,
  [TIPOS_CLIENTE.VIP]: 2.0,
};

// Valor do desconto por ponto resgatado (em reais)
export const VALOR_DESCONTO_POR_PONTO = 0.05;

// Pontos de boas-vindas para novos clientes
export const PONTOS_BOAS_VINDAS = 10;

