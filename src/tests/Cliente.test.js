import { describe, it, expect, beforeEach, vi } from "vitest";
import { Cliente } from "../entities/Cliente.js";
import { Carteira } from "../entities/Carteira.js";
import { ClienteRepository } from "../repository/ClienteRepository.js";
import { ClienteService } from "../services/ClienteService.js";
import { TIPOS_CLIENTE, VALOR_DESCONTO_POR_PONTO } from "../consts/index.js";

describe("Cliente - Testes Unitários", () => {
  let cliente;
  let carteira;

  beforeEach(() => {
    carteira = new Carteira();
    cliente = new Cliente("João", TIPOS_CLIENTE.PADRAO, carteira);
  });

  describe("Cálculo de Pontos por Tipo de Cliente (Testes 1-3)", () => {
    it("test #1: deve calcular pontos para cliente padrão (1 ponto por R$1)", () => {
      cliente.registrarCompra(100);
      expect(cliente.consultarPontos()).toBe(100);
    });

    it("test #2: deve calcular pontos para cliente premium (1.5 pontos por R$1)", () => {
      const clientePremium = new Cliente(
        "Maria",
        TIPOS_CLIENTE.PREMIUM,
        new Carteira()
      );
      clientePremium.registrarCompra(100);
      expect(clientePremium.consultarPontos()).toBe(150);
    });

    it("test #3: deve calcular pontos para cliente VIP (2 pontos por R$1)", () => {
      const clienteVIP = new Cliente(
        "Carlos",
        TIPOS_CLIENTE.VIP,
        new Carteira()
      );
      clienteVIP.registrarCompra(100);
      expect(clienteVIP.consultarPontos()).toBe(200);
    });
  });

  describe("Acúmulo e Consulta de Pontos (Testes 4-5)", () => {
    it("test #4: deve acumular pontos em várias compras consecutivas", () => {
      cliente.registrarCompra(50);
      expect(cliente.consultarPontos()).toBe(50);

      cliente.registrarCompra(30);
      expect(cliente.consultarPontos()).toBe(80);

      cliente.registrarCompra(20);
      expect(cliente.consultarPontos()).toBe(100);
    });

    it("test #5: deve consultar pontos de cliente existente", () => {
      cliente.registrarCompra(150);
      const pontos = cliente.consultarPontos();
      expect(pontos).toBe(150);
    });
  });

  describe("Resgate de Pontos (Testes 6-8)", () => {
    it("test #6: deve resgatar pontos e gerar desconto correto", () => {
      cliente.registrarCompra(100);
      const pontosResgatados = cliente.resgatarPontos(50);
      const desconto = pontosResgatados * VALOR_DESCONTO_POR_PONTO;

      expect(pontosResgatados).toBe(50);
      expect(desconto).toBe(2.5);
      expect(cliente.consultarPontos()).toBe(50);
    });

    it("test #7: deve impedir resgate com saldo insuficiente", () => {
      cliente.registrarCompra(50);
      expect(() => cliente.resgatarPontos(100)).toThrow("Saldo insuficiente");
    });

    it("test #8: deve permitir resgatar todos os pontos disponíveis", () => {
      cliente.registrarCompra(80);
      const pontosResgatados = cliente.resgatarPontos(80);

      expect(pontosResgatados).toBe(80);
      expect(cliente.consultarPontos()).toBe(0);
    });
  });

  describe("Validações de Compra (Testes 9-10)", () => {
    it("test #9: não deve gerar pontos para valor zero", () => {
      expect(() => cliente.registrarCompra(0)).toThrow();
      expect(cliente.consultarPontos()).toBe(0);
    });

    it("test #10: deve gerar pontos para valores decimais", () => {
      cliente.registrarCompra(49.99);
      expect(cliente.consultarPontos()).toBe(49.99);
    });
  });

  describe("Proteção de Saldo (Teste 11)", () => {
    it("test #11: não deve permitir pontos negativos", () => {
      cliente.registrarCompra(50);
      expect(() => cliente.resgatarPontos(100)).toThrow();
      expect(cliente.consultarPontos()).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Busca de Cliente (Teste 12, 21)", () => {
    let repository;

    beforeEach(() => {
      repository = new ClienteRepository();
    });

    it("test #12: deve lançar erro ao consultar cliente inexistente", () => {
      expect(() => repository.buscarPorNome("Inexistente")).toThrow(
        "Cliente não encontrado"
      );
    });

    it("test #21: deve buscar cliente por nome", () => {
      const cliente1 = new Cliente(
        "João",
        TIPOS_CLIENTE.PADRAO,
        new Carteira()
      );
      const cliente2 = new Cliente(
        "Maria",
        TIPOS_CLIENTE.PREMIUM,
        new Carteira()
      );

      repository.adicionar(cliente1);
      repository.adicionar(cliente2);

      const encontrado = repository.buscarPorNome("Maria");
      expect(encontrado).toBe(cliente2);
      expect(encontrado.nome).toBe("Maria");
    });
  });

  describe("Validações do ClienteRepository", () => {
    let repository;

    beforeEach(() => {
      repository = new ClienteRepository();
    });

    it("deve lançar erro ao tentar remover cliente null/undefined", () => {
      expect(() => repository.remover(null)).toThrow("Cliente inválido"); // Cobre linha 55
      expect(() => repository.remover(undefined)).toThrow("Cliente inválido");
    });

    it("deve lançar erro ao tentar remover cliente não cadastrado", () => {
      const cliente = new Cliente("João", TIPOS_CLIENTE.PADRAO, new Carteira());
      expect(() => repository.remover(cliente)).toThrow(
        "Cliente não encontrado no repositório"
      );
    });
  });

  describe("Validações do ClienteService", () => {
    it("deve lançar erro ao criar service sem repository", () => {
      expect(() => new ClienteService(null)).toThrow(
        "ClienteRepository é obrigatório"
      );
      expect(() => new ClienteService(undefined)).toThrow(
        "ClienteRepository é obrigatório"
      );
    });
  });

  describe("Validações de Desconto Promocional", () => {
    it("deve lançar erro para desconto inválido (zero ou negativo)", () => {
      expect(() => cliente.registrarCompra(100, 0)).toThrow(
        "Desconto promocional deve estar entre 0.01 (1%) e 1.0 (100%)"
      );
      expect(() => cliente.registrarCompra(100, -0.1)).toThrow(
        "Desconto promocional deve estar entre 0.01 (1%) e 1.0 (100%)"
      );
    });

    it("deve lançar erro para desconto maior que 100%", () => {
      expect(() => cliente.registrarCompra(100, 1.5)).toThrow(
        "Desconto promocional deve estar entre 0.01 (1%) e 1.0 (100%)"
      );
    });
  });

  describe("Validações de Tipo de Cliente", () => {
    it("deve lançar erro para tipo de cliente inválido", () => {
      const carteiraInvalida = new Carteira();
      expect(() =>
        carteiraInvalida.adicionarPontosPorCompra(100, "INVALIDO")
      ).toThrow("Tipo de cliente inválido");
    });
  });

  describe("Pontos Iniciais e Bônus (Testes 13-14)", () => {
    it("test #13: deve registrar novo cliente com pontos iniciais (boas-vindas)", () => {
      const novaCarteira = new Carteira(100);
      const novoCliente = new Cliente(
        "Ana",
        TIPOS_CLIENTE.PADRAO,
        novaCarteira
      );

      expect(novoCliente.consultarPontos()).toBe(100);

      novoCliente.adicionarPontosBoasVindas(50);
      expect(novoCliente.consultarPontos()).toBe(150);
    });

    it("test #14: deve aplicar bônus promocional em compra", () => {
      cliente.registrarCompra(100, 0.2);
      expect(cliente.consultarPontos()).toBe(80);
    });
  });

  describe("Expiração de Pontos (Teste 15)", () => {
    it("test #15: deve expirar pontos antigos após período", () => {
      cliente.registrarCompra(200);
      expect(cliente.consultarPontos()).toBe(200);

      cliente.expirarPontos(50);
      expect(cliente.consultarPontos()).toBe(150);
    });
  });

  describe("Cálculo de Pontos em Lista (Teste 17)", () => {
    it("test #17: deve calcular pontos para lista de clientes", async () => {
      const repository = new ClienteRepository();
      const service = new ClienteService(repository);

      const c1 = new Cliente("João", TIPOS_CLIENTE.PADRAO, new Carteira());
      const c2 = new Cliente("Maria", TIPOS_CLIENTE.PREMIUM, new Carteira());

      c1.registrarCompra(100);
      c2.registrarCompra(100);

      const lista = [c1, c2];
      const { calcularPontosLista } = await import("../utils/relatorios.js");
      const resultado = calcularPontosLista(lista); // Cobre relatorios.js linha 32

      expect(resultado).toHaveLength(2);
      expect(resultado[0]).toHaveProperty("cliente");
      expect(resultado[0]).toHaveProperty("pontos");
      expect(resultado[0].pontos).toBe(100);
      expect(resultado[1].pontos).toBe(150);
    });
  });

  describe("Operações em Lista de Clientes (Testes 16-20, 22-23)", () => {
    let repository;
    let service;

    beforeEach(() => {
      repository = new ClienteRepository();
      service = new ClienteService(repository);

      const c1 = new Cliente("João", TIPOS_CLIENTE.PADRAO, new Carteira());
      const c2 = new Cliente("Maria", TIPOS_CLIENTE.PREMIUM, new Carteira());
      const c3 = new Cliente("Carlos", TIPOS_CLIENTE.VIP, new Carteira());
      const c4 = new Cliente("Ana", TIPOS_CLIENTE.PADRAO, new Carteira());

      c1.registrarCompra(100);
      c2.registrarCompra(200);
      c3.registrarCompra(300);

      repository.adicionar(c1);
      repository.adicionar(c2);
      repository.adicionar(c3);
      repository.adicionar(c4);
    });

    it("test #16: deve registrar vários clientes em lista", () => {
      const clientes = repository.listarTodos();
      expect(clientes.length).toBe(4);
    });

    it("test #18: deve filtrar clientes com pontos acima de limite", () => {
      const clientesFiltrados = service.filtrarPorPontosAcimaDe(200);
      expect(clientesFiltrados.length).toBeGreaterThan(0);
      clientesFiltrados.forEach((c) => {
        expect(c.consultarPontos()).toBeGreaterThan(200);
      });
    });

    it("test #19: deve ordenar clientes por pontos", () => {
      const ordenados = service.ordenarPorPontos();
      for (let i = 0; i < ordenados.length - 1; i++) {
        expect(ordenados[i].consultarPontos()).toBeGreaterThanOrEqual(
          ordenados[i + 1].consultarPontos()
        );
      }
    });

    it("test #20: deve remover clientes com saldo zero", () => {
      const quantidadeAntes = repository.listarTodos().length;
      const quantidadeDepois = service.removerComSaldoZero();

      expect(quantidadeDepois).toBeLessThanOrEqual(quantidadeAntes);

      const clientesRestantes = repository.listarTodos();
      clientesRestantes.forEach((c) => {
        expect(c.consultarPontos()).toBeGreaterThan(0);
      });
    });

    it("test #22: deve somar total de pontos de todos os clientes", () => {
      const total = service.somarTotalPontos();
      expect(total).toBeGreaterThan(0);
      expect(total).toBe(100 + 300 + 600 + 0);
    });

    it("test #23: deve gerar ranking de clientes por pontos", () => {
      const ranking = service.gerarRanking();

      expect(ranking.length).toBe(4);
      expect(ranking[0].posicao).toBe(1);
      expect(ranking[0].pontos).toBeGreaterThanOrEqual(ranking[1].pontos);

      ranking.forEach((item, index) => {
        expect(item.posicao).toBe(index + 1);
        expect(item).toHaveProperty("cliente");
        expect(item).toHaveProperty("pontos");
      });
    });
  });
});
