import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';
import { Carteira } from '../entities/Carteira.js';

describe('Exceções - Entradas Negativas ou Igual a Zero', () => {
  // Teste: adicionarPontos com valor negativo
  it('deve lançar erro ao adicionar pontos com valor de compra negativo', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    expect(() => cliente.registrarCompra(-10)).toThrow('O valor da compra deve ser maior que zero');
  });

  // Teste: registrarCompra com valor zero
  it('deve lançar erro ao registrar compra com valor zero', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    expect(() => cliente.registrarCompra(0)).toThrow('O valor da compra deve ser maior que zero');
  });

  // Teste: adicionarPontosDiretos com valor negativo
  it('deve lançar erro ao adicionar pontos diretos com valor negativo', () => {
    const carteira = new Carteira(TIPOS_CLIENTE.PADRAO);
    expect(() => carteira.adicionarPontosDiretos(-10)).toThrow('A quantidade de pontos a adicionar deve ser maior que zero');
  });

  // Teste: adicionarPontosDiretos com valor zero
  it('deve lançar erro ao adicionar pontos diretos com valor zero', () => {
    const carteira = new Carteira(TIPOS_CLIENTE.PADRAO);
    expect(() => carteira.adicionarPontosDiretos(0)).toThrow('A quantidade de pontos a adicionar deve ser maior que zero');
  });

  // Teste: resgatarPontos com valor negativo
  it('deve lançar erro ao resgatar pontos com valor negativo', () => {
    const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    cliente.registrarCompra(100);
    expect(() => cliente.resgatarPontos(-10)).toThrow('A quantidade de pontos a resgatar deve ser maior que zero');
  });

  // Teste: resgatarPontos com valor zero
  it('deve lançar erro ao resgatar pontos com valor zero', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
    cliente.registrarCompra(100);
    expect(() => cliente.resgatarPontos(0)).toThrow('A quantidade de pontos a resgatar deve ser maior que zero');
  });

  // Teste: desconto promocional menor que 0
  it('deve lançar erro ao aplicar desconto promocional menor que 0', () => {
    const cliente = new Cliente('Ana', TIPOS_CLIENTE.PADRAO);
    expect(() => cliente.registrarCompra(100, -0.1)).toThrow('Desconto promocional deve estar entre 0.01 (1%) e 1.0 (100%)');
  });

  // Teste: desconto promocional igual a 0
  it('deve lançar erro ao aplicar desconto promocional igual a 0', () => {
    const cliente = new Cliente('Carlos', TIPOS_CLIENTE.PREMIUM);
    expect(() => cliente.registrarCompra(100, 0)).toThrow('Desconto promocional deve estar entre 0.01 (1%) e 1.0 (100%)');
  });

  // Teste: desconto promocional maior que 1.0
  it('deve lançar erro ao aplicar desconto promocional maior que 1.0', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
    expect(() => cliente.registrarCompra(100, 1.5)).toThrow('Desconto promocional deve estar entre 0.01 (1%) e 1.0 (100%)');
  });

  // Teste: desconto promocional igual a 1.0 (100% - produto grátis, permitido)
  it('deve permitir aplicar desconto promocional igual a 1.0 (produto grátis)', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
    cliente.registrarCompra(100, 1.0); // 100% de desconto: 100 * (1 - 1.0) = 0
    
    // Produto grátis, então não gera pontos
    expect(cliente.consultarPontos()).toBe(0);
  });

  // Teste: desconto promocional válido (0.1 = 10%)
  it('deve aplicar desconto promocional válido corretamente', () => {
    const cliente = new Cliente('Maria', TIPOS_CLIENTE.PADRAO);
    cliente.registrarCompra(100, 0.1); // 10% de desconto: 100 * (1 - 0.1) = 90
    expect(cliente.consultarPontos()).toBe(90);
  });

  // Teste: desconto promocional válido (0.2 = 20%)
  it('deve aplicar desconto promocional de 20% corretamente', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.PREMIUM);
    cliente.registrarCompra(100, 0.2); // 20% de desconto: 100 * (1 - 0.2) = 80, Premium: 80 * 1.5 = 120
    expect(cliente.consultarPontos()).toBe(120);
  });
});

