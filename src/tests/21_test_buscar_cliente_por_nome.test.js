import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { ClienteRepository } from '../repository/ClienteRepository.js';

// Teste 21: Pesquisar cliente pelo nome em uma lista de clientes
describe('test_buscar_cliente_por_nome', () => {
  it('deve buscar cliente por nome', () => {
    const repository = new ClienteRepository();
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);

    const encontrado = repository.buscarPorNome('Maria');
    expect(encontrado).toBe(cliente2);
    expect(encontrado.nome).toBe('Maria');

    const naoEncontrado = repository.buscarPorNome('Pedro');
    expect(naoEncontrado).toBeNull();
  });
});

