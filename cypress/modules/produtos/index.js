class Produtos {
  visualizarPrimeiroProduto() {
    cy.get('.features_items .choose a').first().click();
  }

  pesquisarProduto(nomeProduto) {
    cy.get('#search_product').clear().type(nomeProduto);
    cy.get('#submit_search').click();
  }
}

export default new Produtos();

