import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 1: Verificar se o cliente padrão recebe 1 ponto por real gasto
describe('test_calcular_pontos_compra_cliente_padrao', () => {
  it('deve calcular pontos corretamente para cliente padrão', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    cliente.registrarCompra(100);
    expect(cliente.consultarPontos()).toBe(100);
  });
});

