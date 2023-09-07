import BreweryServiceInterface from "@/types/BreweryServiceInterface";
import Brewery from "@/types/Brewery";

class BreweryService implements BreweryServiceInterface {
  private readonly BASE_URL: string =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3008";

  async fetchBreweriesByInputText(query: string): Promise<Brewery[]> {
    const uri: string = `${this.BASE_URL}?q=${query}`;
    const httpOptions: RequestInit = { method: "POST", cache: "no-cache" };
    const breweries: Brewery[] = await fetch(uri, httpOptions).then((res) =>
      res.json()
    );
    return breweries;
  }

  async fetchBreweryById(breweryId: string): Promise<Brewery> {
    const uri: string = `${this.BASE_URL}/${breweryId}`;
    const httpOptions: RequestInit = { method: "GET", cache: "no-cache" };

    try {
      const brewery: Brewery = await fetch(uri, httpOptions).then((res) =>
        res.json()
      );
      return brewery;
    } catch (e: any) {
      if (e.response.status === 404) {
        throw new Error("찾으시는 브루어리가 없습니다.");
      } else {
        throw new Error(e.response.data.message);
      }
    }
  }
}

export default BreweryService;
