import { MULTIPLICADOR_PONTOS } from "../consts/index.js";

/**
 * Calcula o valor final de uma compra aplicando desconto promocional
 * @param {number} valorCompra - Valor original da compra
 * @param {number} descontoPromocional - Desconto promocional em decimal (ex: 0.1 para 10%, 0.2 para 20%, até 1.0 para 100%)
 * @returns {number} Valor final após aplicar o desconto
 */
export function calcularValorFinalComDesconto(
  valorCompra,
  descontoPromocional
) {
  return valorCompra * (1 - descontoPromocional);
}

/**
 * Valida se o desconto promocional está no range válido
 * @param {number} descontoPromocional - Desconto promocional a ser validado
 * @throws {Error} Se o desconto estiver fora do range válido (0.01 a 1.0)
 */
export function validarDescontoPromocional(descontoPromocional) {
  if (descontoPromocional <= 0 || descontoPromocional > 1.0) {
    throw new Error(
      "Desconto promocional deve estar entre 0.01 (1%) e 1.0 (100%)"
    );
  }
}

/**
 * Calcula pontos baseado no tipo de cliente e valor da compra
 * @param {number} valorCompra - Valor da compra em reais
 * @param {string} tipoCliente - Tipo do cliente (PADRAO, PREMIUM, VIP)
 * @returns {number} Pontos calculados
 */
export function calcularPontosPorTipoCliente(valorCompra, tipoCliente) {
  const multiplicador = MULTIPLICADOR_PONTOS[tipoCliente];

  if (multiplicador === undefined) {
    throw new Error("Tipo de cliente inválido.");
  }

  return valorCompra * multiplicador;
}
