import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 8: Validar que o sistema permita resgatar todo o saldo disponível
describe('test_resgatar_todos_os_pontos_disponiveis', () => {
  it('deve permitir resgatar todos os pontos disponíveis', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
    cliente.registrarCompra(100); // 200 pontos
    const pontosResgatados = cliente.resgatarPontos(200);
    
    expect(pontosResgatados).toBe(200);
    expect(cliente.consultarPontos()).toBe(0);
  });
});

