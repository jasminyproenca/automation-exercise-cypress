import { faker } from '@faker-js/faker';

class Carrinho {
  adicionarPrimeiroProdutoAoCarrinhoEIrParaCarrinho() {
    cy.get('.features_items .productinfo a.add-to-cart').first().click();
    cy.get('#cartModal a[href="/view_cart"]').click();
  }

  prosseguirParaCheckout() {
    cy.get('.btn.btn-default.check_out').click();
  }

  inserirComentarioEFinalizarPedido(comentario = 'Pedido de teste automatizado com Cypress.') {
    cy.get('textarea[name="message"]').type(comentario);
    cy.get('a[href="/payment"].check_out').click();
  }

  preencherDadosPagamentoEConfirmar() {
    cy.get('[data-qa="name-on-card"]').type(faker.person.fullName());
    cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber('################'));
    cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV());
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2030');
    cy.get('[data-qa="pay-button"]').click();
  }
}

export default new Carrinho();

