import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { ClienteRepository } from '../repository/ClienteRepository.js';

// Teste 19: Ordenar clientes conforme o total de pontos acumulados
describe('test_ordenar_clientes_por_pontos', () => {
  it('deve ordenar clientes por pontos', () => {
    const repository = new ClienteRepository();
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const cliente3 = new Cliente('Pedro', TIPOS_CLIENTE.VIP);

    cliente1.registrarCompra(100);  // 100 pontos
    cliente2.registrarCompra(50);   // 75 pontos
    cliente3.registrarCompra(100);   // 200 pontos

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);
    repository.adicionar(cliente3);

    const ordenados = repository.ordenarPorPontos();
    expect(ordenados[0]).toBe(cliente3); // 200 pontos
    expect(ordenados[1]).toBe(cliente1);  // 100 pontos
    expect(ordenados[2]).toBe(cliente2);  // 75 pontos
  });
});

