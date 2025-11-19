import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 9: Assegurar que compras de valor zero não gerem pontos
describe('test_nao_gerar_pontos_para_valor_zero', () => {
  it('não deve gerar pontos para valor zero', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    expect(() => cliente.registrarCompra(0)).toThrow('O valor da compra deve ser maior que zero');
    expect(cliente.consultarPontos()).toBe(0);
  });
});

