/**
 * Valida se um cliente existe (não é null ou undefined)
 * @param {any} cliente - Cliente a ser validado
 * @returns {boolean} true se válido, false caso contrário
 */
export function clienteExiste(cliente) {
  return cliente !== null && cliente !== undefined;
}

