import { describe, it, expect } from 'vitest';
import { TIPOS_CLIENTE } from '../consts/index.js';
import { Cliente } from '../entities/Cliente.js';

// Teste 15: Simular expiração de pontos antigos após período determinado
describe('test_expirar_pontos_antigos_apos_periodo', () => {
  it('deve expirar pontos antigos após período', () => {
    const cliente = new Cliente('Pedro', TIPOS_CLIENTE.VIP);
    
    cliente.registrarCompra(100); // 200 pontos
    cliente.expirarPontos(50); // Remove 50 pontos antigos
    
    expect(cliente.consultarPontos()).toBe(150);
  });
});

