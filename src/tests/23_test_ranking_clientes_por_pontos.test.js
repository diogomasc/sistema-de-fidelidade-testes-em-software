import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { ClienteRepository } from '../repository/ClienteRepository.js';

// Teste 23: Gerar ranking dos clientes ordenado por pontuação decrescente
describe('test_ranking_clientes_por_pontos', () => {
  it('deve gerar ranking de clientes por pontos', () => {
    const repository = new ClienteRepository();
    const cliente1 = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    const cliente2 = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    const cliente3 = new Cliente('Pedro', TIPOS_CLIENTE.VIP);

    cliente1.registrarCompra(100);  // 100 pontos
    cliente2.registrarCompra(50);   // 75 pontos
    cliente3.registrarCompra(100);  // 200 pontos

    repository.adicionar(cliente1);
    repository.adicionar(cliente2);
    repository.adicionar(cliente3);

    const ranking = repository.gerarRanking();
    expect(ranking.length).toBe(3);
    expect(ranking[0].cliente).toBe(cliente3);
    expect(ranking[0].pontos).toBe(200);
    expect(ranking[0].posicao).toBe(1);
    expect(ranking[1].cliente).toBe(cliente1);
    expect(ranking[1].pontos).toBe(100);
    expect(ranking[1].posicao).toBe(2);
    expect(ranking[2].cliente).toBe(cliente2);
    expect(ranking[2].pontos).toBe(75);
    expect(ranking[2].posicao).toBe(3);
  });
});

