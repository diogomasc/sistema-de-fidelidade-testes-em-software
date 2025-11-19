import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 4: Testar o acúmulo de pontos em várias compras consecutivas
describe('test_acumular_pontos_varias_compras', () => {
  it('deve acumular pontos em várias compras consecutivas', () => {
    const cliente = new Cliente('Ana', TIPOS_CLIENTE.PADRAO);
    cliente.registrarCompra(50);
    cliente.registrarCompra(30);
    cliente.registrarCompra(20);
    expect(cliente.consultarPontos()).toBe(100);
  });
});

