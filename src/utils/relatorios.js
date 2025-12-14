/**
 * Utilitários para geração de relatórios e ordenação de clientes
 */

/**
 * Filtra clientes com pontos acima de um limite
 * @param {Array} clientes
 * @param {number} limite
 * @returns {Array}
 */
export function filtrarClientesPorPontos(clientes, limite) {
  return clientes.filter((cliente) => cliente.consultarPontos() > limite);
}

/**
 * Ordena clientes por pontos (decrescente)
 * @param {Array} clientes
 * @returns {Array} Cópia da lista ordenada
 */
export function ordenarClientesPorPontos(clientes) {
  return [...clientes].sort(
    (a, b) => b.consultarPontos() - a.consultarPontos()
  );
}

/**
 * Calcula pontos para todos os clientes de uma lista
 * @param {Array} listaClientes
 * @returns {Array<{cliente: Object, pontos: number}>}
 */
export function calcularPontosLista(listaClientes) {
  return listaClientes.map((cliente) => ({
    cliente,
    pontos: cliente.consultarPontos(),
  }));
}

/**
 * Calcula o total de pontos de todos os clientes
 * @param {Array} clientes
 * @returns {number}
 */
export function somarTotalPontos(clientes) {
  return clientes.reduce(
    (total, cliente) => total + cliente.consultarPontos(),
    0
  );
}

/**
 * Gera ranking dos clientes
 * @param {Array} clientes
 * @returns {Array<{cliente: Object, pontos: number, posicao: number}>}
 */
export function gerarRankingClientes(clientes) {
  const clientesOrdenados = ordenarClientesPorPontos(clientes);
  return clientesOrdenados.map((cliente, index) => ({
    cliente,
    pontos: cliente.consultarPontos(),
    posicao: index + 1,
  }));
}
