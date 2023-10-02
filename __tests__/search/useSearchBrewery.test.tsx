import { render, renderHook, screen } from "@testing-library/react";
import useSearchBrewery from "@/hooks/useSearchBrewery";
import Search from "@/app/page";

describe("useSearchBrewery testing", () => {
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: async () => Promise.resolve([]),
    })
  );
  render(<Search />);
  const input =
    screen.getByPlaceholderText("지역이나 가게 이름을 입력해보세요");
  expect(input).toBeInTheDocument();
});
