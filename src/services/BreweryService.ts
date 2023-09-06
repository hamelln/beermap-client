import BreweryServiceInterface from "@/types/BreweryServiceInterface";
import Brewery from "@/types/Brewery";
import BreweryDetailsProps from "@/types/BreweryDetailsProps";

class BreweryService implements BreweryServiceInterface {
  private readonly baseUrl: string =
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3008";

  async fetchBreweriesByInputText(query: string): Promise<Brewery[]> {
    const uri: string = `${this.baseUrl}?q=${query}`;
    const httpOptions: RequestInit = { method: "POST" };
    const breweries: Brewery[] = await fetch(uri, httpOptions).then((res) =>
      res.json()
    );
    return breweries;
  }

  async fetchBreweryById(breweryId: string): Promise<BreweryDetailsProps> {
    const uri: string = `${this.baseUrl}/${breweryId}`;
    const httpOptions: RequestInit = {
      method: "GET",
      cache: "no-store",
    };

    try {
      const brewery: BreweryDetailsProps = await fetch(uri, httpOptions).then(
        (res) => res.json()
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
