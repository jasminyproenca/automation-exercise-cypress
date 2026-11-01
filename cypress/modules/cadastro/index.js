import { faker } from '@faker-js/faker';

class Cadastro {
  preencherFormularioCadastroCompleto(usuario = {}) {
    const senha = usuario.senha || faker.internet.password({ length: 10 });
    const primeiroNome = usuario.primeiroNome || faker.person.firstName();
    const ultimoNome = usuario.ultimoNome || faker.person.lastName();
    const empresa = usuario.empresa || faker.company.name();
    const endereco = usuario.endereco || faker.location.streetAddress();
    const estado = usuario.estado || faker.location.state();
    const cidade = usuario.cidade || faker.location.city();
    const cep = usuario.cep || faker.location.zipCode();
    const telefone = usuario.telefone || faker.phone.number('###########');

    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type(senha, { log: false });

    cy.get('[data-qa="days"]').select('15');
    cy.get('[data-qa="months"]').select('May');
    cy.get('[data-qa="years"]').select('1995');

    cy.get('input#newsletter').check();
    cy.get('input#optin').check();

    cy.get('[data-qa="first_name"]').type(primeiroNome);
    cy.get('[data-qa="last_name"]').type(ultimoNome);
    cy.get('[data-qa="company"]').type(empresa);
    cy.get('[data-qa="address"]').type(endereco);
    cy.get('[data-qa="address2"]').type('Apt 101');
    cy.get('[data-qa="country"]').select('Canada');
    cy.get('[data-qa="state"]').type(estado);
    cy.get('[data-qa="city"]').type(cidade);
    cy.get('[data-qa="zipcode"]').type(cep);
    cy.get('[data-qa="mobile_number"]').type(telefone);

    cy.get('[data-qa="create-account"]').click();
  }

  continuarAposCriarOuDeletarConta() {
    cy.get('[data-qa="continue-button"]').click();
  }
}

export default new Cadastro();

