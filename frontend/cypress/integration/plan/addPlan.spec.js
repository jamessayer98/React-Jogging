describe('When create a new travel plan', () => {
  before(() => {
    const user = Cypress.env('user');
    cy.login(user.username, user.password);
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  
  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('go to travel plans page', () => {
    cy.get('[href="/plans"]').click();
    cy.url().should('include', '/plans');
  });

  it('go to add plan page', () => {
    cy.get('.makeStyles-root-338 > .MuiButtonBase-root').click();
    cy.url().should('include', '/plan');
  });

  it('create a new plan successfully', () => {
    const plan = Cypress.env('plan');

    cy.get('[name="destination"]').type(plan.destination);
    cy.get('[name="startDate"]').type(plan.startDate);
    cy.get('[name="endDate"]').type(plan.endDate);
    cy.get('[name="comment"]').type(plan.comment);
    cy.get('[type="submit"]').click();

    cy.get('form').contains('Create a new plan successfully');
  });
});