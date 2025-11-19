import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 2: Confirmar que clientes Premium recebem 1,5 ponto por real gasto
describe('test_calcular_pontos_cliente_premium', () => {
  it('deve calcular pontos corretamente para cliente premium', () => {
    const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    cliente.registrarCompra(100);
    expect(cliente.consultarPontos()).toBe(150);
  });
});

