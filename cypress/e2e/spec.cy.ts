const WAIT_TIME = 400;
const BASE_URL = "http://localhost:3000";

describe("Search and Navigate", () => {
  it("검색 -> 상세 페이지 -> 모달 로직 점검 -> 뒤로 가기", () => {
    let initialSearchResults: any[] = [];

    cy.visit(BASE_URL);
    const 검색창 = cy.get("input[type='text']");
    검색창.type("트리");
    cy.wait(WAIT_TIME);

    const 검색결과 = cy.get('[data-testid="searchResult"]');
    검색결과.within(() => {
      cy.get("li").then(($liElements) => {
        initialSearchResults = $liElements
          .map((_, element) => Cypress.$(element).html())
          .get();
      });
    });

    const 검색된아이템 = cy.get("[data-testid=searchResult] li").first();
    검색된아이템.click();

    const 영업시간더보기 = cy.get("[data-cy=office-hours]");
    영업시간더보기.click();

    const 전체영업시간모달 = cy.get("[data-cy=other-office-hours-modal]");
    전체영업시간모달.click();
    cy.wait(WAIT_TIME);
    
    cy.go("back");
    cy.get("[data-cy=modal-children]").should("not.exist");
    cy.get("[data-cy=other-office-hours-modal]").click();
    cy.wait(WAIT_TIME);
    cy.get("[data-cy=modal-children]").should("be.visible");
    cy.get("[data-cy=modal-close-button]").click();
    cy.wait(WAIT_TIME);
    cy.get("[data-cy=other-office-hours-modal]").click();
    cy.wait(WAIT_TIME);
    cy.get("body").click(10, 10);
    cy.wait(WAIT_TIME);
    cy.go("back");
    cy.get("[data-cy=search-input]")
      .invoke("val")
      .then((inputValue) => {
        cy.log("Input Value: " + inputValue);
        expect(inputValue).to.equal("트리");
      });

    cy.wait(WAIT_TIME);
    cy.get('[data-testid="searchResult"]').within(() => {
      cy.get("li").then(($liElements) => {
        const updatedResults = $liElements
          .map((_, element) => Cypress.$(element).html())
          .get();
        expect(updatedResults).to.deep.equal(initialSearchResults);
      });
    });
  });
});