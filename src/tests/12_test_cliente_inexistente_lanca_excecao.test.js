import { describe, it, expect } from 'vitest';
import { ClienteRepository } from '../repository/ClienteRepository.js';

// Teste 12: Verificar se o sistema lança erro ao consultar cliente inexistente
describe('test_cliente_inexistente_lanca_excecao', () => {
  it('deve lançar erro ao buscar cliente inexistente no repositório', () => {
    const repository = new ClienteRepository();
    
    // Deve lançar erro ao buscar cliente inexistente
    expect(() => repository.buscarPorNome('ClienteInexistente')).toThrow('Cliente não encontrado: ClienteInexistente');
  });
});

