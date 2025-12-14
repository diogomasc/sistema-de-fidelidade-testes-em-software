import {
  filtrarClientesPorPontos,
  ordenarClientesPorPontos,
  somarTotalPontos,
  gerarRankingClientes,
} from "../utils/index.js";

/**
 * Classe ClienteService
 * Operações de consulta e relatórios sobre clientes.
 */
export class ClienteService {
  constructor(clienteRepository) {
    if (!clienteRepository) {
      throw new Error("ClienteRepository é obrigatório");
    }
    this.clienteRepository = clienteRepository;
  }

  /**
   * Filtra clientes com pontos acima de um limite
   * @param {number} limite - Limite mínimo de pontos
   * @returns {Cliente[]} Lista de clientes filtrados
   */
  filtrarPorPontosAcimaDe(limite) {
    const clientes = this.clienteRepository.listarTodos();
    return filtrarClientesPorPontos(clientes, limite);
  }

  /**
   * Ordena clientes por pontos (decrescente)
   * @returns {Cliente[]} Lista de clientes ordenados
   */
  ordenarPorPontos() {
    const clientes = this.clienteRepository.listarTodos();
    return ordenarClientesPorPontos(clientes);
  }

  /**
   * Calcula o total de pontos de todos os clientes
   * @returns {number} Soma total de pontos
   */
  somarTotalPontos() {
    const clientes = this.clienteRepository.listarTodos();
    return somarTotalPontos(clientes);
  }

  /**
   * Gera ranking dos clientes ordenado por pontuação decrescente
   * @returns {Array<{cliente: Cliente, pontos: number, posicao: number}>} Ranking
   */
  gerarRanking() {
    const clientes = this.clienteRepository.listarTodos();
    return gerarRankingClientes(clientes);
  }

  /**
   * Remove clientes com saldo zero
   * @returns {number} Quantidade de clientes que permaneceram no repositório
   */
  removerComSaldoZero() {
    const clientes = this.clienteRepository.listarTodos();
    const clientesComSaldoZero = clientes.filter(
      (cliente) => cliente.consultarPontos() === 0
    );

    clientesComSaldoZero.forEach((cliente) => {
      this.clienteRepository.remover(cliente);
    });

    return this.clienteRepository.listarTodos().length;
  }
}
