import BreweryServiceConstructor from "@/types/BreweryService";
import Brewery from "@/types/Brewery";
import { isBrewery } from "@/utils/type-checker";
import { BreweryError } from "@/utils/brewery-error";

class BreweryService implements BreweryServiceConstructor {
  private readonly BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  async fetchBreweriesByInputText(query: string): Promise<Brewery[]> {
    const URI = `${this.BASE_URL}?q=${query}`;
    const options: RequestInit = { method: "POST" };

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
    const options: RequestInit = { method: "GET", next: { revalidate: 1200 } };

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
    options: RequestInit
  ): Promise<Brewery> {
    const response = await fetch(URI, options);
    this.validateResponse(response);
    const result: unknown = await response.json();
    const typedResult = this.validateType<Brewery>(result, isBrewery);
    return typedResult;
  }

  private validateResponse(response: Response): void {
    if (!response.ok) {
      throw new BreweryError({
        name: "URI_ERROR",
        message: "유효한 주소가 아닙니다.",
      });
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
      message: "데이터 유형이 맞지 않음.",
    });
  }
}

export default BreweryService;
