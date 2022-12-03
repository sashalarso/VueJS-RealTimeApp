const { LocalStorage } = require("quasar");

describe("E2E SPEC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/signInPage");

    cy.get('[data-cy="adress"]').type("afatchawo@et.esiea.fr");
    cy.get('[data-cy="password"]').type("test003");
    cy.get('[data-cy="signIn"').click();
  });

  it("first create counters", () => {
    cy.get('[data-cy="btn-create"]').click();
    cy.get('[data-cy="counterId"]').type("A");
    cy.get('[data-cy="addCounter"]').click();

    cy.get('[data-cy="btn-create"]').click();
    cy.get('[data-cy="counterId"]').clear().type("B");
    cy.get('[data-cy="addCounter"]').click();
  });

  it("works on one counter", () => {
    const max = Math.floor(Math.random() * 19 + 1);
    for (let i = 0; i < max; i++) {
      cy.get("#A").find('[data-cy="btn-up"]').click();
    }
    cy.get("#A").find('[data-cy="saisie"]').should("have.value", max);
  });

  it("works sum of two counters is correct", () => {
    const letters = ["A", "B"];
    letters.forEach((letter) => {
      cy.get(`#${letter}`).find('[data-cy="btn-up"]').click();
      cy.get(`#${letter}`).find('[data-cy="saisie"]').should("have.value", 1);
    });
    cy.get('[data-cy="total"]').should("have.text", 2);
  });

  it("should show an error", () => {
    cy.get("#A").find('[data-cy="saisie"]').clear().type("have").blur();
    cy.get("#B").find('[data-cy="saisie"]').clear().type("AAA").blur();
    cy.get("#A").should("contain", "Input must be a number");
  });

  it("scrolling", () => {
    cy.viewport(375, 667);
    cy.scrollTo("bottom", { duration: 3000 });
    cy.scrollTo("top", { duration: 3000 });
  });

  it("responsive test for 5 random sizes with iphone4 size, the smallest size", () => {
    const sizes = [
      "ipad-2",
      "iphone-4",
      "macbook-13",
      "samsung-s10",
      "macbook-16",
    ];
    sizes.forEach((size) => {
      cy.viewport(`${size}`);
      cy.get("#A").find('[data-cy="btn-dn"]').should("be.visible");
    });
  });

  it("should reset counter value", () => {
    cy.get("#A").find('[data-cy="btn-up"]').click();
    cy.get("#A").find('[data-cy="btn-reset"]').click();
    cy.get("#A").find("[data-cy=saisie]").should("have.value", 0);
  });

  it("check server storage", () => {
    cy.get("#A").find('[data-cy="btn-up"]').click();
    cy.get("#A").find('[data-cy="btn-up"]').click();
    cy.get("#A").find('[data-cy="syncTo"]').click();
    cy.get("#A").find('[data-cy="btn-reset"]').click();
    cy.get("#A").find('[data-cy="syncFrom"]').click();
    cy.get("#A").find("[data-cy=saisie]").should("have.value", 2);
  });
});
