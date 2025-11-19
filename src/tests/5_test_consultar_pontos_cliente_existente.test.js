import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 5: Verificar se a consulta retorna o total correto de pontos
describe('test_consultar_pontos_cliente_existente', () => {
  it('deve consultar pontos de cliente existente corretamente', () => {
    const cliente = new Cliente('Carlos', TIPOS_CLIENTE.PREMIUM);
    cliente.registrarCompra(100);
    expect(cliente.consultarPontos()).toBe(150);
  });
});

