describe("Posts", () => {
  beforeEach(() => {
    cy.viewFeed();
  });

  it("shows a list of posts", () => {
    cy.get(".post.list").should("be.visible");
  });

  it("shows a single post", () => {
    cy.get(".post.list")
      .find(".post")
      .first()
      .find("[data-action=view]")
      .click();
    cy.wait(500);
    // query string should include id value
    cy.url().should("include", "postId=");
  });
});
