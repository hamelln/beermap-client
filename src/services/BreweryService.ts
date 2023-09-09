import BreweryServiceConstructor from "@/types/BreweryService";
import Brewery from "@/types/Brewery";

class BreweryService implements BreweryServiceConstructor {
  private readonly BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  async fetchBreweriesByInputText(query: string): Promise<Brewery[]> {
    const URI = `${this.BASE_URL}?q=${query}`;
    const options: RequestInit = { method: "POST", cache: "no-cache" };
    const breweries: Brewery[] = await fetch(URI, options).then((res) =>
      res.json()
    );
    return breweries;
  }

  async fetchBreweryById(breweryId: string): Promise<Brewery> {
    const URI = `${this.BASE_URL}/${breweryId}`;
    const options: RequestInit = { method: "GET", cache: "no-cache" };

    try {
      const brewery: Brewery = await fetch(URI, options).then((res) =>
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
