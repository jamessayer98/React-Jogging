describe('When a new user signup', () => {
  const user = Cypress.env('user');

  before(() => {
    cy.visit('/login');
  });

  it('should require input fields', () => {
    cy.get('[name="username"]').type(user.username);
    cy.get('[type="submit"]').click();

    cy.get('form').contains('Password is required');
  });

  it('should be invalid request with wrong credentials', () => {
    cy.get('[name="password"]').type(`wrong ${user.password}`);
    cy.get('[type="submit"]').click();

    cy.get('.MuiAlert-message').contains('Invalid username or password');
  });

  it('should login successfully', () => {
    cy.get('[name="password"]').clear().type(user.password);
    cy.get('[type="submit"]').click();

    cy.url().should('include', '/dashboard');
  });
});