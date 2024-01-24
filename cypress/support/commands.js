// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("visitHome", () => {
  cy.visit("/");
  cy.wait(500);
});

Cypress.Commands.add("showLoginForm", () => {
  cy.get("#registerForm").find("button[data-auth=login]").click();
  cy.get("#loginForm").should("be.visible");
  cy.wait(500);
});

Cypress.Commands.add("login", (email, password) => {
  cy.get("#loginForm").find("input[name=email]").type(email);
  cy.get("#loginForm").find("input[name=password]").type(password);
  cy.get("#loginForm").find("button[type=submit]").click();
  cy.wait(1500);
});

Cypress.Commands.add("loginWithTestUser", () => {
  cy.fixture("example").then((user) => {
    cy.login(user.email, Cypress.env("password"));
  });
});

Cypress.Commands.add("logout", () => {
  cy.get("button[data-auth=logout]").click();
  cy.wait(500);
});

Cypress.Commands.add("isLoggedIn", () => {
  cy.window().then((win) => {
    expect(win.localStorage.getItem("token")).to.be.a("string");
  });
});

Cypress.Commands.add("isLoggedOut", () => {
  cy.window().then((win) => {
    expect(win.localStorage.getItem("token")).to.be.null;
  });
});

Cypress.Commands.add("viewFeed", () => {
  cy.visitHome();
  cy.showLoginForm();
  cy.loginWithTestUser();
  cy.visitHome();
  cy.wait(500);
});

Cypress.Commands.add("shouldShowListOfPosts", () => {
  cy.get(".post.list").should("be.visible");
});

Cypress.Commands.add("showSinglePost", () => {
  cy.get(".post.list").find(".post").first().find("[data-action=view]").click();
  cy.wait(500);
  cy.url().should("include", "postId=");
});

Cypress.Commands.add("fillOutPostForm", () => {
  cy.fixture("post").then((post) => {
    cy.get("input[name=title]").type(post.title);
    cy.get("input[name=tags]").type(post.tags);
    cy.get("textarea[name=body]").type(post.body);
  });
});

Cypress.Commands.add("deletePost", () => {
  cy.get("#nav-default button[data-action=delete]").click();

  cy.wait(2000);
});

Cypress.Commands.add("createDeletePost", () => {
  cy.visit("/?view=post");

  cy.wait(2000);

  cy.fillOutPostForm();

  cy.get("#postForm button[type=submit]").click();
  cy.intercept(Cypress.env("apiUrl") + "/api/v1/social/posts");

  cy.url().should("include", "postId=");

  cy.deletePost();

  cy.shouldShowListOfPosts();
});
