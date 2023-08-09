import Brewery from "@/types/Brewery";
import BreweryDetailsProps from "@/types/BreweryDetailsProps";
import axios from "axios";

class BreweriesApi {
  private readonly baseUrl: string =
    (process.env.NEXT_PUBLIC_BASE_URL as string) || "http://localhost:3008";

  async fetchBreweriesByInputText(query: string): Promise<Brewery[]> {
    const breweries: Brewery[] = await axios
      .post(`${this.baseUrl}?q=${query}`)
      .then((res) => res.data);
    return breweries;
  }

  async fetchAllBreweries(): Promise<Brewery[]> {
    const breweries: Brewery[] = await axios
      .post(this.baseUrl)
      .then((res) => res.data);
    return breweries;
  }

  async fetchBreweryById(breweryId: string): Promise<BreweryDetailsProps> {
    try {
      const brewery: BreweryDetailsProps = await axios
        .get(`${this.baseUrl}/${breweryId}`)
        .then((res) => res.data);

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

export default BreweriesApi;
