import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

describe('Testes Extras - Cliente', () => {

  describe('Casos de Sucesso', () => {
    describe('Grupo: Validação de Desconto Promocional - Valores Válidos', () => {
      it('deve permitir aplicar desconto promocional igual a 1.0 (produto grátis)', () => {
        const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
        cliente.registrarCompra(100, 1.0); // 100% de desconto: 100 * (1 - 1.0) = 0

        // Produto grátis, então não gera pontos
        expect(cliente.consultarPontos()).toBe(0);
      });

      it('deve aplicar desconto promocional válido corretamente (10%)', () => {
        const cliente = new Cliente('Maria', TIPOS_CLIENTE.PADRAO);
        cliente.registrarCompra(100, 0.1); // 10% de desconto: 100 * (1 - 0.1) = 90
        expect(cliente.consultarPontos()).toBe(90);
      });

      it('deve aplicar desconto promocional válido corretamente (20%)', () => {
        const cliente = new Cliente('Pedro', TIPOS_CLIENTE.PREMIUM);
        cliente.registrarCompra(100, 0.2); // 20% de desconto: 100 * (1 - 0.2) = 80, Premium: 80 * 1.5 = 120
        expect(cliente.consultarPontos()).toBe(120);
      });
    });
  });

  describe('Casos de Exceção', () => {
    describe('Grupo: Validação de Compras', () => {
      it('deve lançar erro ao realizar compras com valor negativo', () => {
        const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
        expect(() => cliente.registrarCompra(-10)).toThrow('O valor da compra deve ser maior que zero');
      });

      it('deve lançar erro ao registrar compra com valor zero', () => {
        const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
        expect(() => cliente.registrarCompra(0)).toThrow('O valor da compra deve ser maior que zero');
      });
    });

    describe('Grupo: Validação de Desconto Promocional - Intervalos Inválidos', () => {
      it('deve lançar erro ao aplicar desconto promocional menor que 0', () => {
        const cliente = new Cliente('Ana', TIPOS_CLIENTE.PADRAO);
        expect(() => cliente.registrarCompra(100, -0.1)).toThrow('Desconto promocional deve estar entre 0.01 (1%) e 1.0 (100%)');
      });

      it('deve lançar erro ao aplicar desconto promocional igual a 0', () => {
        const cliente = new Cliente('Carlos', TIPOS_CLIENTE.PREMIUM);
        expect(() => cliente.registrarCompra(100, 0)).toThrow('Desconto promocional deve estar entre 0.01 (1%) e 1.0 (100%)');
      });

      it('deve lançar erro ao aplicar desconto promocional maior que 1.0', () => {
        const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
        expect(() => cliente.registrarCompra(100, 1.5)).toThrow('Desconto promocional deve estar entre 0.01 (1%) e 1.0 (100%)');
      });
    });
  });
});
