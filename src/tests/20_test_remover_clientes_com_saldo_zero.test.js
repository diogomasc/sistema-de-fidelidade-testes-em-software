import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { ClienteRepository } from '../repository/ClienteRepository.js';

// Teste 20: Remover da lista os clientes que possuem saldo de pontos igual a zero
describe('test_remover_clientes_com_saldo_zero', () => {
  it('deve remover clientes com saldo zero', () => {
    const repository = new ClienteRepository();
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const cliente3 = new Cliente('Pedro', TIPOS_CLIENTE.VIP);

    cliente1.registrarCompra(100);
    cliente2.registrarCompra(0);  // 0 pontos
    cliente3.registrarCompra(0);  // 0 pontos

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);
    repository.adicionar(cliente3);

    const removidos = repository.removerComSaldoZero();
    expect(removidos).toBe(2);
    expect(repository.listarTodos().length).toBe(1);
    expect(repository.listarTodos()[0]).toBe(cliente1);
  });
});

