import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { ClienteRepository } from '../repository/ClienteRepository.js';

// Teste 22: Calcular o total de pontos de todos os clientes da lista
describe('test_somar_total_pontos_lista', () => {
  it('deve somar total de pontos da lista', () => {
    const repository = new ClienteRepository();
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const cliente3 = new Cliente('Pedro', TIPOS_CLIENTE.VIP);

    cliente1.registrarCompra(100);  // 100 pontos
    cliente2.registrarCompra(100);  // 150 pontos
    cliente3.registrarCompra(100);  // 200 pontos

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);
    repository.adicionar(cliente3);

    const total = repository.somarTotalPontos();
    expect(total).toBe(450); // 100 + 150 + 200
  });
});

