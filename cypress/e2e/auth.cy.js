describe("Authentication", () => {
  beforeEach(() => {
    cy.visitHome();
  });

  it("shows a register form", () => {
    cy.get("#registerForm").should("be.visible");
  });

  it("shows a login form when the login button is pressed", () => {
    cy.showLoginForm();
  });

  it("allows a valid, registered user to login", () => {
    cy.showLoginForm();

    cy.fixture("example").then((user) => {
      cy.login(user.email, Cypress.env("password"));
    });

    cy.isLoggedIn();
  });

  it("allows a valid user to log out", () => {
    cy.showLoginForm();

    cy.fixture("example").then((user) => {
      cy.login(user.email, Cypress.env("password"));
    });

    cy.isLoggedIn();

    cy.logout();

    cy.isLoggedOut();
  });
});
