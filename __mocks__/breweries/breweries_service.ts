import Brewery from "src/types/Brewery";
import StubBreweriesClient from "./stub_breweries_client";

class BreweriesService {
  breweriesClient: StubBreweriesClient;
  constructor(breweriesClient: StubBreweriesClient) {
    this.breweriesClient = breweriesClient;
  }

  async fetchBreweriesByQuery(query: string): Promise<Brewery[]> {
    return this.breweriesClient.fetchBreweries().then((breweriesInfo) => {
      return breweriesInfo.filter((brewery) => {
        brewery.city.includes(query) ||
          brewery.name.includes(query) ||
          brewery.state_province.includes(query);
      });
    });
  }
}
export default BreweriesService;
