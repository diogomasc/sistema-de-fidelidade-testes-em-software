import { MULTIPLICADOR_PONTOS } from '../consts/index.js';

/**
 * Classe Carteira
 * Encapsula a lógica de gerenciamento de pontos de um cliente
 */
export class Carteira {
  constructor(tipoCliente, pontosIniciais = 0) {
    this.tipoCliente = tipoCliente;
    this.pontos = pontosIniciais;
  }

  /**
   * Calcula o multiplicador de pontos baseado no tipo de cliente
   * @returns {number} Multiplicador de pontos
   */
  calcularMultiplicador() {
    return MULTIPLICADOR_PONTOS[this.tipoCliente];
  }

  /**
   * Adiciona pontos à carteira baseado no valor da compra
   * @param {number} valorCompra - Valor da compra em reais
   * @throws {Error} Se o valor da compra for menor ou igual a zero
   */
  adicionarPontos(valorCompra) {
    if (valorCompra <= 0) {
      throw new Error('O valor da compra deve ser maior que zero');
    }

    const multiplicador = this.calcularMultiplicador();
    const pontosGanhos = valorCompra * multiplicador;
    this.pontos += pontosGanhos;
  }

  /**
   * Retorna o total de pontos acumulados
   * @returns {number} Total de pontos
   */
  consultarPontos() {
    return this.pontos;
  }

  /**
   * Calcula os pontos efetivamente resgatados
   * @param {number} pontosResgatar - Quantidade de pontos solicitados
   * @returns {number} Pontos efetivamente resgatados
   */
  calcularPontosEfetivamenteResgatados(pontosResgatar) {
    const pontosDisponiveis = this.pontos;
    return Math.min(pontosResgatar, pontosDisponiveis);
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
      throw new Error('A quantidade de pontos a resgatar deve ser maior que zero');
    }

    const pontosEfetivamenteResgatados = this.calcularPontosEfetivamenteResgatados(pontosResgatar);
    
    if (pontosResgatar > this.pontos) {
      throw new Error(`Saldo insuficiente. Pontos disponíveis: ${this.pontos}, pontos solicitados: ${pontosResgatar}`);
    }

    this.pontos -= pontosEfetivamenteResgatados;

    return pontosEfetivamenteResgatados;
  }

  /**
   * Adiciona pontos diretamente à carteira (sem cálculo por compra)
   * @param {number} pontos - Quantidade de pontos a adicionar
   * @throws {Error} Se os pontos forem menores ou iguais a zero
   */
  adicionarPontosDiretos(pontos) {
    if (pontos <= 0) {
      throw new Error('A quantidade de pontos a adicionar deve ser maior que zero');
    }
    this.pontos += pontos;
  }

  /**
   * Remove pontos da carteira (para expiração)
   * @param {number} pontosRemover - Quantidade de pontos a remover
   * @throws {Error} Se os pontos a remover forem maiores que os disponíveis
   */
  removerPontos(pontosRemover) {
    if (pontosRemover > this.pontos) {
      throw new Error(`Não é possível remover mais pontos do que o disponível. Pontos disponíveis: ${this.pontos}, pontos a remover: ${pontosRemover}`);
    }
    if (pontosRemover > 0) {
      this.pontos = Math.max(0, this.pontos - pontosRemover);
    }
  }
}

