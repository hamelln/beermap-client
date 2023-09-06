import Brewery from "./Brewery";

interface BreweryServiceInterface {
  fetchBreweriesByInputText(query: string): Promise<Brewery[]>;
  fetchBreweryById(breweryId: string): Promise<Brewery>;
}

export default BreweryServiceInterface;
