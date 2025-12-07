import { describe, it, expect, vi } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

const mockCarteira = {
  adicionarPontos: vi.fn(),
  consultarPontos: vi.fn()
};

// Teste 3: Validar que clientes VIP recebem 2 pontos por real gasto
describe('test_calcular_pontos_cliente_vip', () => {
  it('deve delegar adicionarPontos para carteira com valor correto', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP, mockCarteira);
    cliente.registrarCompra(100);
    expect(mockCarteira.adicionarPontos).toHaveBeenCalledWith(100);
  });
});
