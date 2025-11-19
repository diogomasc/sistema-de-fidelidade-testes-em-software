import { MULTIPLICADOR_PONTOS } from '../consts/index.js';

/**
 * Valida se um multiplicador é válido (está presente nas constantes)
 * @param {number} multiplicador - Multiplicador a ser validado
 * @returns {boolean} true se válido, false caso contrário
 */
export function multiplicadorValido(multiplicador) {
  return Object.values(MULTIPLICADOR_PONTOS).includes(multiplicador);
}

/**
 * Valida se um cliente existe (não é null ou undefined)
 * @param {any} cliente - Cliente a ser validado
 * @returns {boolean} true se válido, false caso contrário
 */
export function clienteExiste(cliente) {
  return cliente !== null && cliente !== undefined;
}

