import Brewery from "src/types/Brewery";

class StubBreweryClient {
  private breweryInfo: Brewery = {
    id: "4cc60614-30c4-406a-9fec-c5dc01b22863",
    name: "Goose Island Brewhouse Seoul",
    brewery_type: "brewpub",
    address_1: "118, Yeoksam-ro",
    address_2: "",
    address_3: "",
    city: "Gangnam-gu",
    state_province: "Seoul",
    postal_code: "06251",
    country: "South Korea",
    phone: "02-6205-1785",
    website_type: "site",
    website_url: "https://gooseisland.kr",
    longitude: 127.0323206,
    latitude: 37.49360307,
  };

  async fetchBrewery(): Promise<Brewery> {
    return this.breweryInfo;
  }
}

export default StubBreweryClient;
