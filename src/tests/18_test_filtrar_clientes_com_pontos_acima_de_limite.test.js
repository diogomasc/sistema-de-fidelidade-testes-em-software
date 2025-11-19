import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { ClienteRepository } from '../repository/ClienteRepository.js';

// Teste 18: Filtrar clientes cujo saldo de pontos é superior a determinado valor
describe('test_filtrar_clientes_com_pontos_acima_de_limite', () => {
  it('deve filtrar clientes com pontos acima de limite', () => {
    const repository = new ClienteRepository();
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const cliente3 = new Cliente('Pedro', TIPOS_CLIENTE.VIP);

    cliente1.registrarCompra(50);  // 50 pontos
    cliente2.registrarCompra(100);  // 150 pontos
    cliente3.registrarCompra(100);  // 200 pontos

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);
    repository.adicionar(cliente3);

    const clientesFiltrados = repository.filtrarPorPontosAcimaDe(100);
    expect(clientesFiltrados.length).toBe(2);
    expect(clientesFiltrados).toContain(cliente2);
    expect(clientesFiltrados).toContain(cliente3);
  });
});

