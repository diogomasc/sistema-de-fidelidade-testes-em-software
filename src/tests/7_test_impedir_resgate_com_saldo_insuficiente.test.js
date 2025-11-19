import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 7: Certificar que o cliente não possa resgatar mais pontos do que possui
describe('test_impedir_resgate_com_saldo_insuficiente', () => {
  it('deve impedir resgate com saldo insuficiente', () => {
    const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    cliente.registrarCompra(100); // 150 pontos
    const pontosResgatados = cliente.resgatarPontos(200); // Tentando resgatar mais do que tem
    
    expect(pontosResgatados).toBe(150); // Deve resgatar apenas o disponível
    expect(cliente.consultarPontos()).toBe(0);
  });
});

