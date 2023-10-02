import Brewery from "@/types/Brewery";
import StubBreweryListClient from "./StubBreweryListClient";

class BreweryService {
  breweryListClient: StubBreweryListClient;
  constructor(breweryListClient: StubBreweryListClient) {
    this.breweryListClient = breweryListClient;
  }

  async fetchBreweryListByQuery(query: string): Promise<Brewery[]> {
    return this.breweryListClient.fetchBreweryList().then((breweryList) => {
      return breweryList.filter((brewery) => {
        brewery.city.includes(query) ||
          brewery.stateProvince.includes(query) ||
          brewery.breweryName.includes(query);
      });
    });
  }
}
export default BreweryService;
