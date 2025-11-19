import { describe, it, expect, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';
import { TIPOS_CLIENTE } from '../consts/index.js';

// Importações serão adicionadas conforme implementamos as classes
// import { Cliente } from '../entities/Cliente.js';
// import { Carteira } from '../entities/Carteira.js';

describe('Cliente - Cálculo de Pontos', () => {
  let cliente;

  beforeEach(() => {
    // Setup será implementado quando criarmos as classes
  });

  // Teste 1: Verificar se o cliente padrão recebe 1 ponto por real gasto
  it('deve calcular pontos corretamente para cliente padrão', () => {
    // TODO: Implementar quando Cliente e Carteira estiverem criados
    // const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    // cliente.registrarCompra(100);
    // expect(cliente.consultarPontos()).toBe(100);
  });

  // Teste 2: Confirmar que clientes Premium recebem 1,5 ponto por real gasto
  it('deve calcular pontos corretamente para cliente premium', () => {
    // TODO: Implementar quando Cliente e Carteira estiverem criados
    // const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    // cliente.registrarCompra(100);
    // expect(cliente.consultarPontos()).toBe(150);
  });

  // Teste 3: Validar que clientes VIP recebem 2 pontos por real gasto
  it('deve calcular pontos corretamente para cliente VIP', () => {
    // TODO: Implementar quando Cliente e Carteira estiverem criados
    // const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
    // cliente.registrarCompra(100);
    // expect(cliente.consultarPontos()).toBe(200);
  });

  // Teste 4: Testar o acúmulo de pontos em várias compras consecutivas
  it('deve acumular pontos em várias compras consecutivas', () => {
    // TODO: Implementar quando Cliente e Carteira estiverem criados
    // const cliente = new Cliente('Ana', TIPOS_CLIENTE.PADRAO);
    // cliente.registrarCompra(50);
    // cliente.registrarCompra(30);
    // cliente.registrarCompra(20);
    // expect(cliente.consultarPontos()).toBe(100);
  });

  // Teste 5: Verificar se a consulta retorna o total correto de pontos
  it('deve consultar pontos de cliente existente corretamente', () => {
    // TODO: Implementar quando Cliente e Carteira estiverem criados
    // const cliente = new Cliente('Carlos', TIPOS_CLIENTE.PREMIUM);
    // cliente.registrarCompra(100);
    // expect(cliente.consultarPontos()).toBe(150);
  });
});

