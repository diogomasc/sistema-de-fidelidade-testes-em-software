import { Carteira } from "./Carteira.js";
import {
  calcularValorFinalComDesconto,
  validarDescontoPromocional,
} from "../utils/index.js";

/**
 * Classe Cliente
 * Representa um cliente com comportamento de negócio.
 */
export class Cliente {
  constructor(nome, tipoCliente, carteira) {
    this.nome = nome;
    this.tipoCliente = tipoCliente;
    this.carteira = carteira;
  }

  /**
   * Registra uma compra e adiciona pontos à carteira
   * @param {number} valorCompra - Valor da compra em reais
   * @param {number} [descontoPromocional] - Desconto promocional em decimal
   */
  registrarCompra(valorCompra, descontoPromocional = null) {
    let valorFinal = valorCompra;

    if (descontoPromocional !== null) {
      validarDescontoPromocional(descontoPromocional);
      valorFinal = calcularValorFinalComDesconto(
        valorCompra,
        descontoPromocional
      );
    }

    if (valorFinal <= 0) {
      throw new Error("O valor final da compra deve ser maior que zero");
    }

    this.carteira.adicionarPontosPorCompra(valorFinal, this.tipoCliente);
  }

  /**
   * Consulta o total de pontos do cliente
   * @returns {number}
   */
  consultarPontos() {
    return this.carteira.consultarPontos();
  }

  /**
   * Resgata pontos para desconto
   * @param {number} pontosResgatar
   * @returns {number} Pontos efetivamente resgatados
   */
  resgatarPontos(pontosResgatar) {
    return this.carteira.resgatarPontos(pontosResgatar);
  }

  /**
   * Adiciona pontos de boas-vindas ao cliente
   * @param {number} pontosBoasVindas
   */
  adicionarPontosBoasVindas(pontosBoasVindas) {
    this.carteira.adicionarPontos(pontosBoasVindas);
  }

  /**
   * Expira uma quantidade de pontos antigos
   * @param {number} pontosExpirados
   */
  expirarPontos(pontosExpirados) {
    this.carteira.removerPontos(pontosExpirados);
  }
}
