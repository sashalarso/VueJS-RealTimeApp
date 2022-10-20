const { LocalStorage } = require("quasar");

describe("E2E SPEC", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/signInPage");

    cy.get('[data-cy="adress"]').type("larsonneur@et.esiea.fr");
    cy.get('[data-cy="password"]').type("testtest");
    cy.get('[data-cy="signIn"').click();

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
      cy.get("A").find('[data-cy="btn-up"]').click();
    }
    cy.get("A").find('[data-cy="input"]').should("have.value", max);
  });

  it("works sum of two counters is correct", () => {
    const letters = ["A", "B"];
    letters.forEach((letter) => {
      cy.get(`${letter}`).find('[data-cy="btn-up"]').click();
      cy.get(`${letter}`).find('[data-cy="input"]').should("have.value", 1);
    });
    cy.get('[data-cy="total"]').should("have.text", 2);
  });

  it("should show an error", () => {
    cy.get("A").find('[data-cy="input"]').clear().type("AAA").blur();
    cy.get("A").should("contain", "Input must be a number");
  });

  it("scrolling", () => {
    cy.viewport(375, 667);
    cy.scrollTo("bottom", { duration: 3000 });
    cy.scrollTo("top", { duration: 3000 });
  });

  it("check localStorage Save", () => {
    const letters = ["A", "B"];
    letters.forEach((letter) => {
      cy.get(`${letter}`).find('[data-cy="btn-up"]').click();
      cy.get(`${letter}`).find('[data-cy="btn-up"]').click();
      cy.get(`${letter}`)
        .find('[data-cy="btn-save"]')
        .click()
        .should(() => {
          expect(LocalStorage.getItem("A_value")).to.eq(2);
        });
      cy.get(`${letter}`).find('[data-cy="btn-dn"]').click();
      cy.get(`${letter}`).find('[data-cy="btn-dn"]').click();
      cy.get(`${letter}`).find('[data-cy="btn-sync"]').click();
      cy.get(`${letter}`).find("[data-cy=input]").should("have.value", 2);
    });
  });
});
