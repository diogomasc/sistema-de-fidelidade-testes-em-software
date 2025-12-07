import { describe, it, expect, vi } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 1: Verificar se o cliente padrão recebe 1 ponto por real gasto
describe('test_calcular_pontos_compra_cliente_padrao', () => {
    it('deve chamar carteira.adicionarPontos com o valor da compra para cliente padrão', () => {
        const mockCarteira = {
            adicionarPontos: vi.fn(),
            consultarPontos: vi.fn()
        };
        const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO, mockCarteira);
        
        cliente.registrarCompra(100);
        
        expect(mockCarteira.adicionarPontos).toHaveBeenCalledWith(100);
    });
});
