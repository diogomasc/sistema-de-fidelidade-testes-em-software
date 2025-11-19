import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 13: Validar o cadastro de um cliente com pontos de boas-vindas
describe('test_registrar_novo_cliente_com_pontos_iniciais', () => {
  it('deve registrar novo cliente com pontos iniciais', () => {
    const cliente = new Cliente('João', TIPOS_CLIENTE.PADRAO, 100);
    expect(cliente.consultarPontos()).toBe(100);
  });
});

