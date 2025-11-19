import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 11: Garantir que o saldo de pontos nunca seja negativo
describe('test_nao_permitir_pontos_negativos', () => {
  it('não deve permitir pontos negativos', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
    cliente.registrarCompra(100); // 200 pontos
    cliente.resgatarPontos(200);
    cliente.resgatarPontos(50); // Tentando resgatar mais do que tem
    
    expect(cliente.consultarPontos()).toBe(0);
    expect(cliente.consultarPontos()).toBeGreaterThanOrEqual(0);
  });
});

