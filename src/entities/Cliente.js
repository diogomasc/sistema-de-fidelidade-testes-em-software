import { Carteira } from './Carteira.js';

/**
 * Classe Cliente
 * Representa um cliente do sistema de fidelidade
 * Encapsula as regras de negócio relacionadas ao cliente
 */
export class Cliente {
  constructor(nome, tipoCliente, pontosIniciais = 0) {
    this.nome = nome;
    this.tipoCliente = tipoCliente;
    this.carteira = new Carteira(tipoCliente, pontosIniciais);
  }

  /**
   * Registra uma compra e adiciona pontos à carteira
   * @param {number} valorCompra - Valor da compra em reais
   * @param {number} [descontoPromocional] - Desconto promocional em decimal (ex: 0.1 para 10%, 0.2 para 20%, até 1.0 para 100% - produto grátis)
   * @throws {Error} Se o desconto promocional estiver fora do range válido (0.01 a 1.0)
   */
  registrarCompra(valorCompra, descontoPromocional = null) {
    // Valida valor da compra antes de processar desconto
    if (valorCompra <= 0) {
      throw new Error('O valor da compra deve ser maior que zero');
    }
    
    let valorFinal = valorCompra;
    
    if (descontoPromocional !== null) {
      // Valida range do desconto: deve estar entre 0.01 e 1.0 (inclui 1.0 para produto grátis)
      if (descontoPromocional <= 0 || descontoPromocional > 1.0) {
        throw new Error('Desconto promocional deve estar entre 0.01 (1%) e 1.0 (100%)');
      }
      
      // Calcula valor final com desconto: precoFinal = precoOriginal * (1 - taxaDeDesconto)
      valorFinal = valorCompra * (1 - descontoPromocional);
    }
    
    // Se o valor final for maior que zero, adiciona pontos (produto grátis não gera pontos)
    if (valorFinal > 0) {
      this.carteira.adicionarPontos(valorFinal);
    }
  }

  /**
   * Consulta o total de pontos do cliente
   * @returns {number} Total de pontos acumulados
   */
  consultarPontos() {
    return this.carteira.consultarPontos();
  }

  /**
   * Resgata pontos para desconto
   * @param {number} pontosResgatar - Quantidade de pontos a resgatar
   * @returns {number} Pontos efetivamente resgatados
   */
  resgatarPontos(pontosResgatar) {
    return this.carteira.resgatarPontos(pontosResgatar);
  }

  /**
   * Adiciona pontos de boas-vindas ao cliente
   */
  adicionarPontosBoasVindas(pontosBoasVindas) {
    this.carteira.adicionarPontosDiretos(pontosBoasVindas);
  }

  /**
   * Aplica bônus promocional na próxima compra (desconto)
   * @param {number} valorCompra - Valor da compra em reais
   * @param {number} descontoPromocional - Desconto promocional (ex: 1.2 para 20% de desconto)
   */
  aplicarBonusPromocional(valorCompra, descontoPromocional) {
    this.registrarCompra(valorCompra, descontoPromocional);
  }

  /**
   * Expira uma quantidade de pontos antigos
   * @param {number} pontosExpirados - Quantidade de pontos a expirar
   */
  expirarPontos(pontosExpirados) {
    this.carteira.removerPontos(pontosExpirados);
  }
}

