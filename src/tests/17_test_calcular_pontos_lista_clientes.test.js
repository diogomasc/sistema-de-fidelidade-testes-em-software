import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { ClienteRepository } from '../repository/ClienteRepository.js';

// Teste 17: Calcular pontos para todos os clientes de uma lista
describe('test_calcular_pontos_lista_clientes', () => {
  it('deve calcular pontos para lista de clientes', () => {
    const repository = new ClienteRepository();
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    
    cliente1.registrarCompra(100);
    cliente2.registrarCompra(100);

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);

    expect(cliente1.consultarPontos()).toBe(100);
    expect(cliente2.consultarPontos()).toBe(150);
  });
});

