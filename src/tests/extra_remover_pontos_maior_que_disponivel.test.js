import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

describe('Exceções - Remover Pontos Maior que Disponível', () => {
  describe('Grupo: Validação de Remoção de Pontos', () => {
    it('deve lançar erro ao remover mais pontos do que disponível', () => {
      const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO);
      cliente.registrarCompra(100); // 100 pontos
      
      expect(() => cliente.expirarPontos(150)).toThrow('Não é possível remover mais pontos do que o disponível');
    });

    it('deve permitir remover pontos quando quantidade é menor ou igual ao disponível', () => {
      const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
      cliente.registrarCompra(100); // 150 pontos
      
      cliente.expirarPontos(50);
      expect(cliente.consultarPontos()).toBe(100);
    });
  });
});

