import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import "whatwg-fetch";
import { server } from "@/src/mocks/server";

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "warn",
  });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
