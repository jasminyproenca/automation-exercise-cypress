# Automação de Testes Web com Cypress - Trabalho de Conclusão (PGATS)

Projeto de automação de testes End-to-End (E2E) para a aplicação [Automation Exercise](https://automationexercise.com/), desenvolvido como trabalho de conclusão da disciplina de **Automação de Testes Web** da Pós-Graduação em Automação de Testes de Software (PGATS).

## Casos de Teste Implementados

Foram automatizados os cenários solicitados da página [Test Cases](https://automationexercise.com/test_cases):

- **Test Case 1:** Register User
- **Test Case 2:** Login User with correct email and password
- **Test Case 3:** Login User with incorrect email and password
- **Test Case 4:** Logout User
- **Test Case 5:** Register User with existing email
- **Test Case 8:** Verify All Products and product detail page
- **Test Case 9:** Search Product
- **Test Case 10:** Verify Subscription in home page
- **Test Case 15:** Place Order: Register before Checkout
- **Test Case 16:** Place Order: Login before Checkout

## Arquitetura e Boas Práticas Aplicadas

- **Modularização e Separação de Responsabilidades:** Divisão das ações em módulos independentes em `cypress/modules/` (`menu`, `login`, `cadastro`, `produtos`, `carrinho`, `subscricao`).
- **Seletores Estáveis:** Uso prioritário de atributos dedicados (`[data-qa="..."]`) e IDs.
- **Dados Dinâmicos:** Geração de massas de dados dinâmicas com `@faker-js/faker` para garantir execuções independentes e sem quebras.
- **Hooks e Configuração Global:** Uso de `before` / `beforeEach` e `baseUrl` centralizada em `cypress.config.js`.
- **Relatórios:** Integração com `cypress-mochawesome-reporter` (geração local em `cypress/reports/html/index.html` e upload automático de artefatos no GitHub Actions).

## Como Executar Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute os testes em modo headless:
   ```bash
   npx cypress run
   ```
3. Ou abra a interface interativa do Cypress:
   ```bash
   npx cypress open
   ```
4. Após a execução via `cypress run`, abra o relatório HTML gerado em:
   `cypress/reports/html/index.html`
