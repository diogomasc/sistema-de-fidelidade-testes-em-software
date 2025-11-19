import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 3: Validar que clientes VIP recebem 2 pontos por real gasto
describe('test_calcular_pontos_cliente_vip', () => {
  it('deve calcular pontos corretamente para cliente VIP', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
    cliente.registrarCompra(100);
    expect(cliente.consultarPontos()).toBe(200);
  });
});

