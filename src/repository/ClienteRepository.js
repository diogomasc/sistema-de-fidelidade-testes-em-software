import { Cliente } from '../entities/Cliente.js';
import { clienteExiste } from '../utils/index.js';

/**
 * Classe ClienteRepository
 * Implementa o padrão Repository para gerenciar clientes em memória
 * Abstrai a persistência, facilitando testes e futuras mudanças de armazenamento
 */
export class ClienteRepository {
  constructor() {
    this.clientes = [];
  }

  /**
   * Adiciona um cliente ao repositório
   * @param {Cliente} cliente - Cliente a ser adicionado
   */
  adicionar(cliente) {
    this.clientes.push(cliente);
  }

  /**
   * Busca um cliente pelo nome
   * @param {string} nome - Nome do cliente
   * @returns {Cliente} Cliente encontrado
   * @throws {Error} Se o cliente não for encontrado
   */
  buscarPorNome(nome) {
    const cliente = this.clientes.find(cliente => cliente.nome === nome) || null;
    if (!clienteExiste(cliente)) {
      throw new Error(`Cliente não encontrado: ${nome}`);
    }
    return cliente;
  }

  /**
   * Retorna todos os clientes
   * @returns {Cliente[]} Lista de clientes
   */
  listarTodos() {
    return [...this.clientes]; // Retorna cópia para evitar mutação externa
  }

  /**
   * Remove um cliente do repositório
   * @param {Cliente} cliente - Cliente a ser removido
   * @throws {Error} Se o cliente não for encontrado no repositório
   */
  remover(cliente) {
    if (!clienteExiste(cliente)) {
      throw new Error('Cliente não pode ser removido: cliente inválido');
    }
    
    const index = this.clientes.indexOf(cliente);
    if (index === -1) {
      throw new Error(`Cliente não encontrado no repositório: ${cliente.nome}`);
    }
    
    this.clientes.splice(index, 1);
  }

  /**
   * Filtra clientes com pontos acima de um limite
   * @param {number} limite - Limite mínimo de pontos
   * @returns {Cliente[]} Lista de clientes filtrados
   */
  filtrarPorPontosAcimaDe(limite) {
    return this.clientes.filter(cliente => cliente.consultarPontos() > limite);
  }

  /**
   * Ordena clientes por pontos (decrescente)
   * @returns {Cliente[]} Lista de clientes ordenados
   */
  ordenarPorPontos() {
    return [...this.clientes].sort((a, b) => b.consultarPontos() - a.consultarPontos());
  }

  /**
   * Remove clientes com saldo zero
   * @returns {number} Quantidade de clientes removidos
   */
  removerComSaldoZero() {
    const quantidadeAntes = this.clientes.length;
    this.clientes = this.clientes.filter(cliente => cliente.consultarPontos() > 0);
    return quantidadeAntes - this.clientes.length;
  }

  /**
   * Calcula o total de pontos de todos os clientes
   * @returns {number} Soma total de pontos
   */
  somarTotalPontos() {
    return this.clientes.reduce((total, cliente) => total + cliente.consultarPontos(), 0);
  }

  /**
   * Gera ranking dos clientes ordenado por pontuação decrescente
   * @returns {Array<{cliente: Cliente, pontos: number, posicao: number}>} Ranking
   */
  gerarRanking() {
    const clientesOrdenados = this.ordenarPorPontos();
    return clientesOrdenados.map((cliente, index) => ({
      cliente,
      pontos: cliente.consultarPontos(),
      posicao: index + 1,
    }));
  }
}

