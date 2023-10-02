import BreweryServiceConstructor from "@/types/BreweryService";
import Brewery from "@/types/Brewery";
import { isBrewery } from "@/utils/type-checker";
import { BreweryError } from "@/utils/brewery-error";

type Method = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
type StrictRequestInit = RequestInit & { method: Method };

class BreweryService implements BreweryServiceConstructor {
  private readonly BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  async fetchBreweryListByInputText(query: string): Promise<Brewery[]> {
    const URI = `${this.BASE_URL}?q=${query}`;
    const options: StrictRequestInit = { method: "POST" };

    try {
      const response = await fetch(URI, options);
      this.validateResponse(response);
      const breweryList = response.json();
      return breweryList;
    } catch (error) {
      throw new BreweryError({
        name: "ERROR",
        message: "브루어리 조회 중 에러 발생",
        cause: error,
      });
    }
  }

  async fetchBreweryById(breweryId: string): Promise<Brewery> {
    const URI = `${this.BASE_URL}/${breweryId}`;
    const options: StrictRequestInit = {
      method: "GET",
      next: { revalidate: 64000 },
    };

    try {
      const brewery = await this.tryFetchBrewery(URI, options);
      return brewery;
    } catch (error) {
      throw new BreweryError({
        name: "ERROR",
        message: "브루어리 조회 중 에러 발생",
        cause: error,
      });
    }
  }

  private async tryFetchBrewery(
    URI: string,
    options: StrictRequestInit
  ): Promise<Brewery> {
    const response = await fetch(URI, options);
    this.validateResponse(response);
    const result: unknown = await response.json();
    const typedResult = this.validateType<Brewery>(result, isBrewery);
    return typedResult;
  }

  private validateResponse(response: Response): void {
    if (!response.ok) {
      if (response.status === 404) {
        throw new BreweryError({
          name: "NOT_FOUND_ERROR",
          message: "주소 에러: 요청하신 주소의 형식이 맞지 않습니다.",
        });
      } else if (response.status === 0) {
        throw new BreweryError({
          name: "NETWORK_ERROR",
          message:
            "네트워크 에러: 서버와 연결 중 문제가 발생했습니다. 인터넷 연결 상태를 확인해주세요.",
        });
      } else {
        throw new BreweryError({
          name: "SERVER_ERROR",
          message: "서버 에러: 서버 응답이 실패했습니다.",
        });
      }
    }
  }

  private validateType<ResultType>(
    result: unknown,
    typeChecker: (result: unknown) => result is ResultType
  ) {
    if (typeChecker(result)) {
      return result;
    }
    throw new BreweryError({
      name: "TYPE_ERROR",
      message: "타입 에러: 올바른 타입의 데이터가 아닙니다.",
    });
  }
}

export default BreweryService;
