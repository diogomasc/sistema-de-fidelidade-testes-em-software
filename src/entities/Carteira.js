import { calcularPontosPorTipoCliente } from "../utils/index.js";

/**
 * Classe Carteira
 * Gerencia pontos com comportamento de negócio encapsulado.
 */
export class Carteira {
  constructor(pontosIniciais = 0) {
    this.pontos = pontosIniciais;
  }

  /**
   * Retorna o total de pontos acumulados
   * @returns {number} Total de pontos
   */
  consultarPontos() {
    return this.pontos;
  }

  /**
   * Adiciona pontos baseado no valor da compra e tipo de cliente
   * @param {number} valorCompra - Valor da compra em reais
   * @param {string} tipoCliente - Tipo do cliente (PADRAO, PREMIUM, VIP)
   * @throws {Error} Se o valor da compra for menor ou igual a zero
   */
  adicionarPontosPorCompra(valorCompra, tipoCliente) {
    if (valorCompra <= 0) {
      throw new Error("O valor da compra deve ser maior que zero");
    }

    const pontosCalculados = calcularPontosPorTipoCliente(
      valorCompra,
      tipoCliente
    );

    this.pontos += pontosCalculados;
  }

  /**
   * Adiciona pontos diretamente (ex: bônus, boas-vindas)
   * @param {number} pontos - Quantidade de pontos a adicionar
   * @throws {Error} Se os pontos forem menores ou iguais a zero
   */
  adicionarPontos(pontos) {
    if (pontos <= 0) {
      throw new Error(
        "A quantidade de pontos a adicionar deve ser maior que zero"
      );
    }

    this.pontos += pontos;
  }

  /**
   * Resgata pontos da carteira
   * @param {number} pontosResgatar - Quantidade de pontos a resgatar
   * @returns {number} Pontos efetivamente resgatados
   * @throws {Error} Se os pontos a resgatar forem menores ou iguais a zero
   * @throws {Error} Se os pontos a resgatar forem maiores que os disponíveis
   */
  resgatarPontos(pontosResgatar) {
    if (pontosResgatar <= 0) {
      throw new Error(
        "A quantidade de pontos a resgatar deve ser maior que zero"
      );
    }

    if (pontosResgatar > this.pontos) {
      throw new Error(
        `Saldo insuficiente. Pontos disponíveis: ${this.pontos}, pontos solicitados: ${pontosResgatar}`
      );
    }

    this.pontos -= pontosResgatar;

    return pontosResgatar;
  }

  /**
   * Remove pontos da carteira (para expiração)
   * @param {number} pontosRemover - Quantidade de pontos a remover
   * @throws {Error} Se os pontos a remover forem maiores que os disponíveis
   */
  removerPontos(pontosRemover) {
    if (pontosRemover <= 0) {
      throw new Error(
        "A quantidade de pontos a remover deve ser maior que zero"
      );
    }

    if (pontosRemover > this.pontos) {
      throw new Error(
        `Não é possível remover mais pontos do que o disponível. Pontos disponíveis: ${this.pontos}, pontos a remover: ${pontosRemover}`
      );
    }

    this.pontos -= pontosRemover;
  }
}
