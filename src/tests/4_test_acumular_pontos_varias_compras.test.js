import { describe, it, expect, vi } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

const mockCarteira = {
  adicionarPontos: vi.fn(),
  consultarPontos: vi.fn()
};

// Teste 4: Testar o acúmulo de pontos em várias compras consecutivas
describe('test_acumular_pontos_varias_compras', () => {
  it('deve chamar carteira.adicionarPontos para cada compra realizada', () => {
    const cliente = new Cliente('Ana', TIPOS_CLIENTE.PADRAO, mockCarteira);
    
    // Reseta o mock para garantir isolamento
    vi.clearAllMocks();

    cliente.registrarCompra(50);
    cliente.registrarCompra(30);
    cliente.registrarCompra(20);
    
    expect(mockCarteira.adicionarPontos).toHaveBeenCalledTimes(3);
    expect(mockCarteira.adicionarPontos).toHaveBeenNthCalledWith(1, 50);
    expect(mockCarteira.adicionarPontos).toHaveBeenNthCalledWith(2, 30);
    expect(mockCarteira.adicionarPontos).toHaveBeenNthCalledWith(3, 20);
  });
});
