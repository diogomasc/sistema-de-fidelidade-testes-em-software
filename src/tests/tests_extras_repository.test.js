import { describe, expect, it } from "vitest";
import { TIPOS_CLIENTE } from "../consts/index.js";
import { Cliente } from "../entities/Cliente.js";
import { ClienteRepository } from "../repository/ClienteRepository.js";

describe("Testes Extras - Repository", () => {
  describe("Casos de Sucesso", () => {
    it("deve remover cliente válido do repositório corretamente", () => {
      const repository = new ClienteRepository();
      const cliente1 = new Cliente("João", TIPOS_CLIENTE.PADRAO);
      const cliente2 = new Cliente("Maria", TIPOS_CLIENTE.PREMIUM);

      repository.adicionar(cliente1);
      repository.adicionar(cliente2);

      // Remove cliente válido
      repository.remover(cliente1);

      expect(repository.listarTodos().length).toBe(1);
      expect(repository.listarTodos()[0]).toBe(cliente2);
      expect(repository.listarTodos()).not.toContain(cliente1);
    });
  });

  describe("Casos de Exceção", () => {
    describe("Grupo: Validação de Remoção de Cliente", () => {
      it("deve lançar erro ao remover cliente null", () => {
        const repository = new ClienteRepository();

        expect(() => repository.remover(null)).toThrow(
          "Cliente não pode ser removido: cliente inválido"
        );
      });

      it("deve lançar erro ao remover cliente inexistente do repositório", () => {
        const repository = new ClienteRepository();
        const cliente1 = new Cliente("João", TIPOS_CLIENTE.PADRAO);
        const cliente2 = new Cliente("Maria", TIPOS_CLIENTE.PREMIUM);

        repository.adicionar(cliente1);

        // Tentar remover cliente que não está no repositório
        expect(() => repository.remover(cliente2)).toThrow(
          "Cliente não encontrado no repositório"
        );
      });
    });
  });
});
