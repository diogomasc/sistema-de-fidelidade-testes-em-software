import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE, VALOR_DESCONTO_POR_PONTO } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

describe('Cliente - Resgate de Pontos', () => {
  // Teste 6: Garantir que o resgate de pontos gere o desconto correto
  it('deve resgatar pontos e gerar desconto correto', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    cliente.registrarCompra(100); // 100 pontos
    const pontosResgatados = cliente.resgatarPontos(50);
    const desconto = pontosResgatados * VALOR_DESCONTO_POR_PONTO;
    
    expect(pontosResgatados).toBe(50);
    expect(desconto).toBe(2.5);
    expect(cliente.consultarPontos()).toBe(50);
  });

  // Teste 7: Certificar que o cliente não possa resgatar mais pontos do que possui
  it('deve impedir resgate com saldo insuficiente', () => {
    const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    cliente.registrarCompra(100); // 150 pontos
    const pontosResgatados = cliente.resgatarPontos(200); // Tentando resgatar mais do que tem
    
    expect(pontosResgatados).toBe(150); // Deve resgatar apenas o disponível
    expect(cliente.consultarPontos()).toBe(0);
  });

  // Teste 8: Validar que o sistema permita resgatar todo o saldo disponível
  it('deve permitir resgatar todos os pontos disponíveis', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
    cliente.registrarCompra(100); // 200 pontos
    const pontosResgatados = cliente.resgatarPontos(200);
    
    expect(pontosResgatados).toBe(200);
    expect(cliente.consultarPontos()).toBe(0);
  });
});

