import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE, PONTOS_BOAS_VINDAS } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

describe('Cliente - Funcionalidades Avançadas', () => {
  // Teste 13: Validar o cadastro de um cliente com pontos de boas-vindas
  it('deve registrar novo cliente com pontos iniciais', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    cliente.adicionarPontosBoasVindas();
    
    expect(cliente.consultarPontos()).toBe(PONTOS_BOAS_VINDAS);
  });

  // Teste 14: Testar aplicação de bônus promocional sobre compras
  it('deve aplicar bônus promocional em compra', () => {
    const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const valorCompra = 100;
    const bonusPromocional = 1.2; // 20% de bônus
    
    cliente.registrarCompra(valorCompra); // 150 pontos
    cliente.aplicarBonusPromocional(bonusPromocional);
    
    expect(cliente.consultarPontos()).toBe(180); // 150 * 1.2
  });

  // Teste 15: Simular expiração de pontos antigos após período determinado
  it('deve expirar pontos antigos após período', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
    
    cliente.registrarCompra(100); // 200 pontos
    cliente.expirarPontos(50); // Remove 50 pontos antigos
    
    expect(cliente.consultarPontos()).toBe(150);
  });
});

