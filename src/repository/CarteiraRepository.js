/**
 * Classe CarteiraRepository
 * Gerencia persistência de instâncias de Carteira.
 */
export class CarteiraRepository {
  constructor() {
    this.carteiras = [];
  }

  /**
   * Salva ou atualiza uma carteira
   * @param {Carteira} carteira - A carteira a ser salva
   * @returns {Carteira} A carteira salva
   */
  salvar(carteira) {
    if (!this.carteiras.includes(carteira)) {
      this.carteiras.push(carteira);
    }

    return carteira;
  }

  /**
   * Lista todas as carteiras
   * @returns {Carteira[]}
   */
  listarTodas() {
    return [...this.carteiras];
  }
}
