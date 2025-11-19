import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE, VALOR_DESCONTO_POR_PONTO } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 6: Garantir que o resgate de pontos gere o desconto correto
describe('test_resgatar_pontos_para_desconto', () => {
  it('deve resgatar pontos e gerar desconto correto', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    cliente.registrarCompra(100); // 100 pontos
    const pontosResgatados = cliente.resgatarPontos(50);
    const desconto = pontosResgatados * VALOR_DESCONTO_POR_PONTO;
    
    expect(pontosResgatados).toBe(50);
    expect(desconto).toBe(2.5);
    expect(cliente.consultarPontos()).toBe(50);
  });
});

