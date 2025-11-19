import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { ClienteRepository } from '../repository/ClienteRepository.js';

// Teste 16: Validar a inserção de múltiplos clientes em uma lista
describe('test_registrar_varios_clientes_em_lista', () => {
  it('deve registrar vários clientes em lista', () => {
    const repository = new ClienteRepository();
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const cliente3 = new Cliente('Pedro', TIPOS_CLIENTE.VIP);

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);
    repository.adicionar(cliente3);

    expect(repository.listarTodos().length).toBe(3);
  });
});

