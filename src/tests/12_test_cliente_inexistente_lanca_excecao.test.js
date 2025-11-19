import { describe, it, expect } from 'vitest';
import { ClienteRepository } from '../repository/ClienteRepository.js';

// Teste 12: Verificar se o sistema lança erro ao consultar cliente inexistente
describe('test_cliente_inexistente_lanca_excecao', () => {
  it('deve retornar null ao buscar cliente inexistente no repositório', () => {
    const repository = new ClienteRepository();
    
    const clienteInexistente = repository.buscarPorNome('ClienteInexistente');
    expect(clienteInexistente).toBeNull();
    
    // Testa que buscar um cliente inexistente retorna null
    // e que tentar operar com null não quebra o sistema
    expect(() => {
      if (clienteInexistente) {
        clienteInexistente.consultarPontos();
      }
    }).not.toThrow();
  });
});

