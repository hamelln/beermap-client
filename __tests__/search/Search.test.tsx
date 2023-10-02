import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "@/app/page";
jest.mock("next/navigation");

const renderComplexForm = async () => {
  render(<Search />);

  const user = userEvent.setup();
  const input = (): HTMLInputElement =>
    screen.getByPlaceholderText("지역이나 가게 이름을 입력해보세요");
  const list = (): HTMLLIElement[] => screen.queryAllByRole("listitem");
  const item = () => screen.queryByRole("listitem");
  const typing = async (text: string) => await user.type(input(), text);

  return { input, list, item, typing };
};

describe("useSearchBrewery testing", () => {
  let input: () => HTMLInputElement;
  let item: () => HTMLElement | null;
  let list: () => HTMLLIElement[];
  let typing: (text: string) => Promise<void>;

  beforeEach(async () => {
    const result = await renderComplexForm();
    input = result.input;
    item = result.item;
    list = result.list;
    typing = result.typing;
  });

  it("입력 X: 모든 리스트", async () => {
    await waitFor(() => expect(list()).toHaveLength(4));
  });

  it("아쉬트리 검색: 아쉬트리 포함하는 리스트만", async () => {
    await typing("아쉬트리");

    await waitFor(() =>
      list().every((item) => {
        expect(item).toHaveTextContent("아쉬트리");
      })
    );
  });

  it("jest 검색: 0개", async () => {
    await typing("jest");

    expect(list()).toHaveLength(0);
  });

  it("30자 초과: 30자만 표시", async () => {
    await typing("맥".repeat(48));

    expect(input().value).toHaveLength(30);
  });

  it("대소문자 무관하게 반응하는지", async () => {
    await typing("craftroot");

    await waitFor(() => expect(item()).toHaveTextContent("CRAFTROOT"));
  });
});
