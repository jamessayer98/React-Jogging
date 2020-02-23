describe('When a new user signup', () => {
  const user = Cypress.env('user');

  before(() => {
    cy.visit('/signup');
  });

  it('should require input fields', () => {
    cy.get('[name="username"]').type(user.username);
    cy.get('[name="password"]').type(user.password);
    cy.get('[name="confirm-password"]').type(user.password);
    cy.get('[type="submit"]').click();

    cy.get('form').contains('Email is required');
  });

  it('should create a new user successfully', () => {
    cy.get('[name="email"]').type(user.email);
    cy.get('[type="submit"]').click();

    cy.url().should('include', '/login');
  });
});