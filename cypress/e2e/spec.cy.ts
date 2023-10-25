describe("Search and Navigate", () => {
  it("검색 -> 상세 페이지 -> 모달 로직 점검 -> 뒤로 가기", () => {
    let initialSearchResults: any[] = [];

    cy.visit("http://localhost:3000");
    cy.get("input[type='text']").type("트리");
    cy.wait(400);

    cy.get('[data-testid="searchResult"]').within(() => {
      cy.get("li").then(($liElements) => {
        initialSearchResults = $liElements
          .map((_, element) => Cypress.$(element).html())
          .get();
      });
    });

    cy.get("[data-testid=searchResult] li").first().click();
    cy.get("[data-cy=office-hours]").click();
    cy.get("[data-cy=other-office-hours-modal]").click();
    // 뒤로 가기로 모달 종료
    cy.wait(600);
    cy.go("back");
    // 모달의 자식 요소는 화면에서 지워진다
    cy.get("[data-cy=modal-children]").should("not.exist");
    // 닫기 버튼으로 모달 종료
    cy.get("[data-cy=other-office-hours-modal]").click();
    cy.wait(400);
    // 모달이 열리면 자식 요소가 보인다
    cy.get("[data-cy=modal-children]").should("be.visible");
    cy.get("[data-cy=modal-close-button]").click();
    cy.wait(400);
    // 모달창 바깥 클릭으로 모달 종료
    cy.get("[data-cy=other-office-hours-modal]").click();
    cy.wait(400);
    cy.get("body").click(10, 10);
    cy.wait(400);
    cy.go("back");
    // 뒤로 가기로 페이지에 돌아올 시 이전의 검색 결과가 복귀한다
    cy.get("[data-cy=search-input]")
      .invoke("val")
      .then((inputValue) => {
        cy.log("Input Value: " + inputValue);
        expect(inputValue).to.equal("트리");
      });

    cy.wait(400);
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
