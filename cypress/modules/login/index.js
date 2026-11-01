class Login {
  preencherFormularioPreCadastro(nome, email) {
    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
  }

  preencherFormularioLogin(email, senha) {
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(senha, { log: false });
    cy.get('[data-qa="login-button"]').click();
  }
}

export default new Login();

