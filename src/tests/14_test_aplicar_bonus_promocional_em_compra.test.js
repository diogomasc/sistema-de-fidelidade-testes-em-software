import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 14: Testar aplicação de bônus promocional sobre compras
describe('test_aplicar_bonus_promocional_em_compra', () => {
  it('deve aplicar bônus promocional em compra', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const valorCompra = 200;
    const descontoPromocional = 0.6; // 60% de desconto: 200 * (1 - 0.6) = 200 * 0.4 = 80
    
    cliente.registrarCompra(valorCompra, descontoPromocional);
    
    // Cliente padrão: 1 ponto por real, então 80 pontos
    expect(cliente.consultarPontos()).toBe(80);
  });

  it('deve lançar erro ao aplicar bônus promocional igual a 0', () => {
    const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    expect(() => cliente.registrarCompra(100, 0)).toThrow('Desconto promocional deve estar entre 0.01 (1%) e menor que 1.0 (100%)');
  });

  it('deve lançar erro ao aplicar bônus promocional igual a 1', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
    expect(() => cliente.registrarCompra(100, 1)).toThrow('Desconto promocional deve estar entre 0.01 (1%) e menor que 1.0 (100%)');
  });
});

