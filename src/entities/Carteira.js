import { MULTIPLICADOR_PONTOS } from '../consts/index.js';

/**
 * Classe Carteira
 * Encapsula a lógica de gerenciamento de pontos de um cliente
 */
export class Carteira {
  constructor(tipoCliente) {
    this.tipoCliente = tipoCliente;
    this.pontos = 0;
  }

  /**
   * Adiciona pontos à carteira baseado no valor da compra
   * @param {number} valorCompra - Valor da compra em reais
   */
  adicionarPontos(valorCompra) {
    if (valorCompra <= 0) {
      return;
    }

    const multiplicador = MULTIPLICADOR_PONTOS[this.tipoCliente];
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
   * Resgata pontos da carteira
   * @param {number} pontosResgatar - Quantidade de pontos a resgatar
   * @returns {number} Pontos efetivamente resgatados
   */
  resgatarPontos(pontosResgatar) {
    if (pontosResgatar <= 0) {
      return 0;
    }

    const pontosDisponiveis = this.pontos;
    const pontosEfetivamenteResgatados = Math.min(pontosResgatar, pontosDisponiveis);
    this.pontos -= pontosEfetivamenteResgatados;

    return pontosEfetivamenteResgatados;
  }

  /**
   * Adiciona pontos diretamente à carteira (sem cálculo por compra)
   * @param {number} pontos - Quantidade de pontos a adicionar
   */
  adicionarPontosDiretos(pontos) {
    if (pontos > 0) {
      this.pontos += pontos;
    }
  }

  /**
   * Aplica um bônus multiplicando os pontos atuais
   * @param {number} multiplicador - Multiplicador do bônus
   */
  aplicarBonus(multiplicador) {
    if (multiplicador > 0) {
      this.pontos = this.pontos * multiplicador;
    }
  }

  /**
   * Remove pontos da carteira (para expiração)
   * @param {number} pontosRemover - Quantidade de pontos a remover
   */
  removerPontos(pontosRemover) {
    if (pontosRemover > 0) {
      this.pontos = Math.max(0, this.pontos - pontosRemover);
    }
  }
}

