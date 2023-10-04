describe("Search and Navigate", () => {
  it("검색 후 클릭 -> 상세 페이지로 이동", () => {
    cy.visit("http://localhost:3000");
    cy.get("input[type='text']").type("아쉬트리");
    cy.get("[data-testid=searchResult]").first().click();
    cy.get("[data-cy=office-hours]").click();
    cy.get("[data-cy=other-office-hours-modal]").click({ multiple: true });
    cy.wait(1400);
    cy.go("back");
  });
});
