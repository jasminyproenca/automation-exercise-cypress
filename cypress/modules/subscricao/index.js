class Subscricao {
  realizarSubscricaoNoFooter(email) {
    cy.get('#footer').scrollIntoView();
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();
  }
}

export default new Subscricao();

