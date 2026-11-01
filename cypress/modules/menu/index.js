class Menu {
  irParaLoginCadastro() {
    cy.get('a[href="/login"]').click();
  }

  irParaProdutos() {
    cy.get('a[href="/products"]').click();
  }

  irParaCarrinho() {
    cy.get('.shop-menu a[href="/view_cart"]').click();
  }

  irParaContato() {
    cy.get('a[href="/contact_us"]').click();
  }

  efetuarLogout() {
    cy.get('a[href="/logout"]').click();
  }

  excluirConta() {
    cy.get('a[href="/delete_account"]').click();
  }
}

export default new Menu();

