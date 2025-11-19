import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 14: Testar aplicação de bônus promocional sobre compras
describe('test_aplicar_bonus_promocional_em_compra', () => {
  it('deve aplicar bônus promocional em compra', () => {
    const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const valorCompra = 100;
    const bonusPromocional = 1.2; // 20% de bônus
    
    cliente.registrarCompra(valorCompra); // 150 pontos
    cliente.aplicarBonusPromocional(bonusPromocional);
    
    expect(cliente.consultarPontos()).toBe(180); // 150 * 1.2
  });
});

