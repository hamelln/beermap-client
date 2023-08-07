// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { within } from "@testing-library/dom";
// import StubBreweriesClient from "@/mocks/breweries/stub_breweries_client";
// import BreweriesService from "@/mocks/breweries/breweries_service";
// import SearchBar from "@/app/search/search-bar/page";
// import Breweries from "@/app/search/breweries/page";
// import BreweriesApi from "src/services/BreweriesApi";
// jest.mock("src/services/BreweriesApi");
// BreweriesApi.prototype.fetchBreweriesByQuery = jest.fn();

// async function renderComplexForm() {
//   const breweriesClient = new StubBreweriesClient();
//   const breweriesService = new BreweriesService(breweriesClient);
//   const mockHandleChange = jest.fn();

//   render(
//     <>
//       <SearchBar inputValue="" handleChange={mockHandleChange} />
//       <Breweries inputValue="" />
//     </>
//   );
//   const user = userEvent.setup();
//   const input: () => HTMLInputElement = () => screen.getByRole("textbox");
//   const textOnInput = () => input().value;

//   return { user, input, textOnInput, breweriesService, mockHandleChange };
// }

// describe("검색창 테스트", () => {
//   it("입력한 값이 보이는가", async () => {
//     const { input, textOnInput, user, mockHandleChange } =
//       await renderComplexForm();
//     await user.type(input(), "버");
//     expect(mockHandleChange).toBeCalledTimes(1);
//   });

//   it("검색 결과가 정상적으로 출력되는가", async () => {
//     const fakeBreweries = [
//       { id: 1, name: "Example Brewery 1" },
//       { id: 2, name: "Example Brewery 2" },
//     ];

//     const { input, user, breweriesService } = await renderComplexForm();

//     await user.type(input(), "버드");
//     await breweriesService.fetchBreweriesByQuery("버드");

//     const searchResult = screen.getByTestId("searchResult");

//     expect(searchResult).toBeInTheDocument();

//     const searchItems = await waitFor(() =>
//       within(searchResult).queryAllByTestId("search-items")
//     );

//     expect(searchItems.length).toBeGreaterThan(0);

//     searchItems.forEach((item) => {
//       expect(item).toHaveTextContent(/버드/i);
//     });
//   });
// });
