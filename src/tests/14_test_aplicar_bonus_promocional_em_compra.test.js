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
});

