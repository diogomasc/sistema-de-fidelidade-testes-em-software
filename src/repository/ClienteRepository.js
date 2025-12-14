import { clienteExiste } from "../utils/index.js";

/**
 * Classe ClienteRepository
 * Gerencia persistência de clientes em memória (CRUD).
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
    if (!this.clientes.includes(cliente)) {
      this.clientes.push(cliente);
    }

    return cliente;
  }

  /**
   * Busca um cliente pelo nome
   * @param {string} nome - Nome do cliente
   * @returns {Cliente} Cliente encontrado
   * @throws {Error} Se o cliente não for encontrado
   */
  buscarPorNome(nome) {
    const cliente =
      this.clientes.find((cliente) => cliente.nome === nome) || null;

    if (!clienteExiste(cliente)) {
      throw new Error("Cliente não encontrado.");
    }
    return cliente;
  }

  /**
   * Retorna todos os clientes
   * @returns {Cliente[]} Lista de clientes
   */
  listarTodos() {
    return [...this.clientes];
  }

  /**
   * Remove um cliente do repositório
   * @param {Cliente} cliente - Cliente a ser removido
   * @throws {Error} Se o cliente não for encontrado no repositório
   */
  remover(cliente) {
    if (!clienteExiste(cliente)) {
      throw new Error("Cliente inválido");
    }

    if (!this.clientes.includes(cliente)) {
      throw new Error("Cliente não encontrado no repositório.");
    }

    const index = this.clientes.indexOf(cliente);
    this.clientes.splice(index, 1);
  }
}
