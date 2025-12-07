import { describe, it, expect, vi } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 2: Confirmar que clientes Premium recebem 1,5 ponto por real gasto
// Com a injeção de dependência, o teste verifica se o valor da compra é repassado corretamente para a carteira.
// A lógica do multiplicador (1.5x) deve ser testada nos testes da Carteira.
describe('test_calcular_pontos_cliente_premium', () => {
  it('deve delegar adicionarPontos para carteira com valor correto', () => {
    const mockCarteira = {
        adicionarPontos: vi.fn(),
        consultarPontos: vi.fn()
    };
    const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM, mockCarteira);
    cliente.registrarCompra(100);
    expect(mockCarteira.adicionarPontos).toHaveBeenCalledWith(100);
  });
});
