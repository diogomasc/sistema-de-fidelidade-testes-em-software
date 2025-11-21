import { describe, expect, it } from "vitest";
import { TIPOS_CLIENTE } from "../consts/index.js";
import { Carteira } from "../entities/Carteira.js";
import { Cliente } from "../entities/Cliente.js";

describe("Testes Extras - Carteira", () => {
  describe("Casos de Sucesso", () => {
    it("deve adicionar pontos diretos corretamente quando o valor é positivo", () => {
      const carteira = new Carteira(TIPOS_CLIENTE.PADRAO);
      carteira.adicionarPontosDiretos(50);
      expect(carteira.consultarPontos()).toBe(50);
      carteira.adicionarPontosDiretos(25);
      expect(carteira.consultarPontos()).toBe(75);
    });

    it("deve permitir remover pontos quando quantidade é menor ou igual ao disponível", () => {
      const cliente = new Cliente("Maria", TIPOS_CLIENTE.PREMIUM);
      cliente.registrarCompra(100); // 150 pontos

      cliente.carteira.removerPontos(50);
      expect(cliente.consultarPontos()).toBe(100);
    });
  });

  describe("Casos de Exceção", () => {
    describe("Grupo: Validação de Pontos Diretos", () => {
      it("deve lançar erro ao adicionar pontos diretos com valor negativo", () => {
        const carteira = new Carteira(TIPOS_CLIENTE.PADRAO);
        expect(() => carteira.adicionarPontosDiretos(-10)).toThrow(
          "A quantidade de pontos a adicionar deve ser maior que zero"
        );
      });

      it("deve lançar erro ao adicionar pontos diretos com valor zero", () => {
        const carteira = new Carteira(TIPOS_CLIENTE.PADRAO);
        expect(() => carteira.adicionarPontosDiretos(0)).toThrow(
          "A quantidade de pontos a adicionar deve ser maior que zero"
        );
      });
    });

    describe("Grupo: Validação de Resgate de Pontos", () => {
      it("deve lançar erro ao resgatar pontos com valor negativo", () => {
        const cliente = new Cliente("Maria", TIPOS_CLIENTE.PREMIUM);
        cliente.registrarCompra(100);
        expect(() => cliente.resgatarPontos(-10)).toThrow(
          "A quantidade de pontos a resgatar deve ser maior que zero"
        );
      });

      it("deve lançar erro ao resgatar pontos com valor zero", () => {
        const cliente = new Cliente("Pedro", TIPOS_CLIENTE.VIP);
        cliente.registrarCompra(100);
        expect(() => cliente.resgatarPontos(0)).toThrow(
          "A quantidade de pontos a resgatar deve ser maior que zero"
        );
      });

      // Teste de impedir resgate com saldo insuficiente feito em src/tests/7_test_impedir_resgate_com_saldo_insuficiente.test.js
    });

    describe("Grupo: Validação de Remoção de Pontos", () => {
      it("deve lançar erro ao remover mais pontos do que o disponível", () => {
        const cliente = new Cliente("João", TIPOS_CLIENTE.PADRAO);
        cliente.registrarCompra(100); // 100 pontos

        expect(() => cliente.carteira.removerPontos(150)).toThrow(
          "Não é possível remover mais pontos do que o disponível. Pontos disponíveis: 100, pontos a remover: 150"
        );
      });

      it("deve lançar erro ao remover pontos com valor zero", () => {
        const cliente = new Cliente("João", TIPOS_CLIENTE.PADRAO);
        cliente.registrarCompra(100); // 100 pontos

        expect(() => cliente.carteira.removerPontos(0)).toThrow(
          "A quantidade de pontos a remover deve ser maior que zero"
        );
      });

      it("deve lançar erro ao remover pontos com valor negativo", () => {
        const cliente = new Cliente("João", TIPOS_CLIENTE.PADRAO);
        cliente.registrarCompra(100); // 100 pontos

        expect(() => cliente.carteira.removerPontos(-10)).toThrow(
          "A quantidade de pontos a remover deve ser maior que zero"
        );
      });
    });
  });
});
