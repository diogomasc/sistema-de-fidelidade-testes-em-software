import { describe, it, expect, beforeEach } from "vitest";
import { Carteira } from "../entities/Carteira.js";
import { TIPOS_CLIENTE } from "../consts/index.js";

describe("Carteira - Testes Unitários", () => {
  let carteira;

  beforeEach(() => {
    carteira = new Carteira();
  });

  describe("Operações com Pontos", () => {
    describe("Inicialização", () => {
      it("deve iniciar com zero pontos por padrão", () => {
        expect(carteira.consultarPontos()).toBe(0);
      });

      it("deve iniciar com pontos iniciais quando fornecidos", () => {
        const carteiraComPontos = new Carteira(100);
        expect(carteiraComPontos.consultarPontos()).toBe(100);
      });
    });

    describe("Adicionar Pontos", () => {
      describe("Por Compra (com multiplicador)", () => {
        it("deve adicionar pontos para cliente padrão (1x)", () => {
          carteira.adicionarPontosPorCompra(100, TIPOS_CLIENTE.PADRAO);
          expect(carteira.consultarPontos()).toBe(100);
        });

        it("deve adicionar pontos para cliente premium (1.5x)", () => {
          carteira.adicionarPontosPorCompra(100, TIPOS_CLIENTE.PREMIUM);
          expect(carteira.consultarPontos()).toBe(150);
        });

        it("deve adicionar pontos para cliente VIP (2x)", () => {
          carteira.adicionarPontosPorCompra(100, TIPOS_CLIENTE.VIP);
          expect(carteira.consultarPontos()).toBe(200);
        });

        it("deve aceitar valores decimais", () => {
          carteira.adicionarPontosPorCompra(49.99, TIPOS_CLIENTE.PADRAO);
          expect(carteira.consultarPontos()).toBe(49.99);
        });
      });

      describe("Diretamente (bônus)", () => {
        it("deve adicionar pontos de bônus", () => {
          carteira.adicionarPontos(50);
          expect(carteira.consultarPontos()).toBe(50);
        });
      });

      describe("Acúmulo de Pontos", () => {
        it("deve acumular pontos de múltiplas compras", () => {
          carteira.adicionarPontosPorCompra(50, TIPOS_CLIENTE.PADRAO);
          expect(carteira.consultarPontos()).toBe(50);

          carteira.adicionarPontosPorCompra(30, TIPOS_CLIENTE.PADRAO);
          expect(carteira.consultarPontos()).toBe(80);

          carteira.adicionarPontosPorCompra(20, TIPOS_CLIENTE.PADRAO);
          expect(carteira.consultarPontos()).toBe(100);
        });

        it("deve acumular pontos de bônus e compras", () => {
          carteira.adicionarPontos(50);
          carteira.adicionarPontosPorCompra(100, TIPOS_CLIENTE.PREMIUM);
          expect(carteira.consultarPontos()).toBe(200);
        });
      });
    });

    describe("Resgatar Pontos", () => {
      beforeEach(() => {
        carteira.adicionarPontos(100);
      });

      it("deve resgatar pontos com sucesso", () => {
        const resgatados = carteira.resgatarPontos(50);
        expect(resgatados).toBe(50);
        expect(carteira.consultarPontos()).toBe(50);
      });

      it("deve permitir resgatar todos os pontos", () => {
        const resgatados = carteira.resgatarPontos(100);
        expect(resgatados).toBe(100);
        expect(carteira.consultarPontos()).toBe(0);
      });
    });

    describe("Remover Pontos (Expiração)", () => {
      beforeEach(() => {
        carteira.adicionarPontos(150);
      });

      it("deve remover pontos expirados", () => {
        carteira.removerPontos(50);
        expect(carteira.consultarPontos()).toBe(100);
      });
    });
  });

  describe("Validações e Proteções", () => {
    describe("Validações de Entrada", () => {
      it("deve rejeitar valor de compra zero", () => {
        expect(() =>
          carteira.adicionarPontosPorCompra(0, TIPOS_CLIENTE.PADRAO)
        ).toThrow("O valor da compra deve ser maior que zero");
      });

      it("deve rejeitar valor de compra negativo", () => {
        expect(() =>
          carteira.adicionarPontosPorCompra(-50, TIPOS_CLIENTE.PADRAO)
        ).toThrow("O valor da compra deve ser maior que zero");
      });

      it("deve rejeitar adicionar pontos zero ou negativos", () => {
        expect(() => carteira.adicionarPontos(0)).toThrow(
          "A quantidade de pontos a adicionar deve ser maior que zero"
        );

        expect(() => carteira.adicionarPontos(-10)).toThrow(
          "A quantidade de pontos a adicionar deve ser maior que zero"
        );
      });

      it("deve rejeitar resgatar pontos zero ou negativos", () => {
        carteira.adicionarPontos(100);

        expect(() => carteira.resgatarPontos(0)).toThrow(
          "A quantidade de pontos a resgatar deve ser maior que zero"
        );

        expect(() => carteira.resgatarPontos(-20)).toThrow(
          "A quantidade de pontos a resgatar deve ser maior que zero"
        );
      });

      it("deve rejeitar remover pontos zero ou negativos", () => {
        carteira.adicionarPontos(150);

        expect(() => carteira.removerPontos(0)).toThrow(
          "A quantidade de pontos a remover deve ser maior que zero"
        );

        expect(() => carteira.removerPontos(-30)).toThrow(
          "A quantidade de pontos a remover deve ser maior que zero"
        );
      });
    });

    describe("Proteção de Saldo", () => {
      it("deve impedir resgate com saldo insuficiente", () => {
        carteira.adicionarPontos(100);
        expect(() => carteira.resgatarPontos(150)).toThrow(
          "Saldo insuficiente"
        );
      });

      it("deve impedir remoção maior que saldo disponível", () => {
        carteira.adicionarPontos(150);
        expect(() => carteira.removerPontos(200)).toThrow(
          "Não é possível remover mais pontos do que o disponível"
        );
      });
    });

    describe("Integridade do Saldo", () => {
      it("não deve permitir saldo negativo após operações", () => {
        carteira.adicionarPontos(50);

        expect(() => carteira.resgatarPontos(100)).toThrow();
        expect(carteira.consultarPontos()).toBeGreaterThanOrEqual(0);
      });

      it("saldo deve sempre ser não-negativo", () => {
        carteira.adicionarPontos(100);
        carteira.resgatarPontos(50);
        carteira.removerPontos(30);

        expect(carteira.consultarPontos()).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
