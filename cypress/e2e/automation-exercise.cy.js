import { faker } from '@faker-js/faker';
import menu from '../modules/menu';
import login from '../modules/login';
import cadastro from '../modules/cadastro';
import produtos from '../modules/produtos';
import carrinho from '../modules/carrinho';
import subscricao from '../modules/subscricao';

describe('Automation Exercise - Trabalho de Conclusão PGATS', () => {
  const usuarioExistente = {
    nome: faker.person.fullName(),
    email: faker.internet.email({ provider: 'teste.pgats.com' }),
    senha: faker.internet.password({ length: 10 }),
  };

  before(() => {
    // Pré-condição: cria um usuário dinâmico válido para os cenários de Login (CT02), Logout (CT04), E-mail Existente (CT05) e Checkout com Login (CT16)
    cy.visit('/');
    menu.irParaLoginCadastro();
    login.preencherFormularioPreCadastro(usuarioExistente.nome, usuarioExistente.email);
    cadastro.preencherFormularioCadastroCompleto({ senha: usuarioExistente.senha });
    cy.get('[data-qa="account-created"]').should('be.visible');
    cy.clearAllCookies();
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('#slider').should('be.visible');
  });

  it('Test Case 1: Register User', () => {
    const novoUsuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email({ provider: 'teste.pgats.com' }),
      senha: faker.internet.password({ length: 10 }),
    };

    menu.irParaLoginCadastro();
    cy.contains('h2', 'New User Signup!').should('be.visible');

    login.preencherFormularioPreCadastro(novoUsuario.nome, novoUsuario.email);
    cy.contains('b', 'Enter Account Information').should('be.visible');

    cadastro.preencherFormularioCadastroCompleto({ senha: novoUsuario.senha });
    cy.get('[data-qa="account-created"]')
      .should('be.visible')
      .and('contain.text', 'Account Created!');

    cadastro.continuarAposCriarOuDeletarConta();
    cy.get('i.fa-user').parent().should('contain.text', novoUsuario.nome);

    menu.excluirConta();
    cy.get('[data-qa="account-deleted"]')
      .should('be.visible')
      .and('contain.text', 'Account Deleted!');
    cadastro.continuarAposCriarOuDeletarConta();
  });

  it('Test Case 2: Login User with correct email and password', () => {
    menu.irParaLoginCadastro();
    cy.contains('h2', 'Login to your account').should('be.visible');

    login.preencherFormularioLogin(usuarioExistente.email, usuarioExistente.senha);
    cy.get('i.fa-user').parent().should('contain.text', usuarioExistente.nome);
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    menu.irParaLoginCadastro();
    cy.contains('h2', 'Login to your account').should('be.visible');

    login.preencherFormularioLogin(
      faker.internet.email({ provider: 'invalido.com' }),
      'SenhaIncorreta123!'
    );

    cy.get('.login-form form p')
      .should('be.visible')
      .and('contain.text', 'Your email or password is incorrect!');
  });

  it('Test Case 4: Logout User', () => {
    menu.irParaLoginCadastro();
    cy.contains('h2', 'Login to your account').should('be.visible');

    login.preencherFormularioLogin(usuarioExistente.email, usuarioExistente.senha);
    cy.get('i.fa-user').parent().should('contain.text', usuarioExistente.nome);

    menu.efetuarLogout();
    cy.url().should('include', '/login');
    cy.contains('h2', 'Login to your account').should('be.visible');
  });

  it('Test Case 5: Register User with existing email', () => {
    menu.irParaLoginCadastro();
    cy.contains('h2', 'New User Signup!').should('be.visible');

    login.preencherFormularioPreCadastro(usuarioExistente.nome, usuarioExistente.email);

    cy.get('.signup-form form p')
      .should('be.visible')
      .and('contain.text', 'Email Address already exist!');
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    menu.irParaProdutos();
    cy.url().should('include', '/products');
    cy.contains('.title', 'All Products').should('be.visible');
    cy.get('.features_items .col-sm-4').should('have.length.greaterThan', 0);

    produtos.visualizarPrimeiroProduto();
    cy.url().should('include', '/product_details/');

    cy.get('.product-information h2').should('be.visible');
    cy.get('.product-information p').contains('Category:').should('be.visible');
    cy.get('.product-information span span')
      .should('be.visible')
      .and('contain.text', 'Rs.');
    cy.get('.product-information p').contains('Availability:').should('be.visible');
    cy.get('.product-information p').contains('Condition:').should('be.visible');
    cy.get('.product-information p').contains('Brand:').should('be.visible');
  });

  it('Test Case 9: Search Product', () => {
    menu.irParaProdutos();
    cy.url().should('include', '/products');
    cy.contains('.title', 'All Products').should('be.visible');

    produtos.pesquisarProduto('Dress');

    cy.contains('.title', 'Searched Products').should('be.visible');
    cy.get('.features_items .col-sm-4')
      .should('be.visible')
      .and('have.length.greaterThan', 0);
  });

  it('Test Case 10: Verify Subscription in home page', () => {
    cy.get('#footer').scrollIntoView();
    cy.get('.single-widget h2')
      .should('be.visible')
      .and('contain.text', 'Subscription');

    subscricao.realizarSubscricaoNoFooter(faker.internet.email());

    cy.get('#success-subscribe')
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!');
  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    const usuarioCheckout = {
      nome: faker.person.fullName(),
      email: faker.internet.email({ provider: 'teste.pgats.com' }),
      senha: faker.internet.password({ length: 10 }),
    };

    menu.irParaLoginCadastro();
    login.preencherFormularioPreCadastro(usuarioCheckout.nome, usuarioCheckout.email);
    cadastro.preencherFormularioCadastroCompleto({ senha: usuarioCheckout.senha });

    cy.get('[data-qa="account-created"]')
      .should('be.visible')
      .and('contain.text', 'Account Created!');
    cadastro.continuarAposCriarOuDeletarConta();
    cy.get('i.fa-user').parent().should('contain.text', usuarioCheckout.nome);

    carrinho.adicionarPrimeiroProdutoAoCarrinhoEIrParaCarrinho();
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info_table').should('be.visible');

    carrinho.prosseguirParaCheckout();
    cy.get('#address_delivery').should('be.visible');
    cy.get('#address_invoice').should('be.visible');
    cy.get('#cart_info').should('be.visible');

    carrinho.inserirComentarioEFinalizarPedido('Pedido realizado no Test Case 15.');
    carrinho.preencherDadosPagamentoEConfirmar();

    cy.get('[data-qa="order-placed"]')
      .should('be.visible')
      .and('contain.text', 'Order Placed!');
    cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');

    menu.excluirConta();
    cy.get('[data-qa="account-deleted"]')
      .should('be.visible')
      .and('contain.text', 'Account Deleted!');
    cadastro.continuarAposCriarOuDeletarConta();
  });

  it('Test Case 16: Place Order: Login before Checkout', () => {
    menu.irParaLoginCadastro();
    login.preencherFormularioLogin(usuarioExistente.email, usuarioExistente.senha);
    cy.get('i.fa-user').parent().should('contain.text', usuarioExistente.nome);

    carrinho.adicionarPrimeiroProdutoAoCarrinhoEIrParaCarrinho();
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info_table').should('be.visible');

    carrinho.prosseguirParaCheckout();
    cy.get('#address_delivery').should('be.visible');
    cy.get('#address_invoice').should('be.visible');
    cy.get('#cart_info').should('be.visible');

    carrinho.inserirComentarioEFinalizarPedido('Pedido realizado no Test Case 16.');
    carrinho.preencherDadosPagamentoEConfirmar();

    cy.get('[data-qa="order-placed"]')
      .should('be.visible')
      .and('contain.text', 'Order Placed!');
    cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible');

    menu.excluirConta();
    cy.get('[data-qa="account-deleted"]')
      .should('be.visible')
      .and('contain.text', 'Account Deleted!');
    cadastro.continuarAposCriarOuDeletarConta();
  });
});

