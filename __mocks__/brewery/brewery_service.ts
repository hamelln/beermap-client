import Brewery from "src/types/Brewery";
import StubBreweryClient from "./stub_brewery_client";

class BreweryService {
  breweryClient: StubBreweryClient;
  constructor(breweryClient: StubBreweryClient) {
    this.breweryClient = breweryClient;
  }

  async fetchAvailableItems(): Promise<Brewery> {
    return this.breweryClient.fetchBrewery().then((breweryInfo) => breweryInfo);
  }
}
export default BreweryService;
