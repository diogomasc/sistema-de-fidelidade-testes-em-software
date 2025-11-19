import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 10: Confirmar que valores decimais geram pontos proporcionais
describe('test_gerar_pontos_para_valores_decimais', () => {
  it('deve gerar pontos para valores decimais', () => {
    const cliente = new Cliente('Maria', TIPOS_CLIENTE.PREMIUM);
    cliente.registrarCompra(10.50);
    // 10.50 * 1.5 = 15.75 pontos
    expect(cliente.consultarPontos()).toBe(15.75);
  });
});

