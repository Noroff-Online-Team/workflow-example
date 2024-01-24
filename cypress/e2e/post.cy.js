describe("Posts", () => {
  beforeEach(() => {
    cy.viewFeed();
  });

  it("allows for a new post to be created and deleted afterwards", () => {
    cy.createDeletePost();
  });

  it("shows a list of posts", () => {
    cy.shouldShowListOfPosts();
  });

  it("shows a single post", () => {
    cy.showSinglePost();
  });
});
