import Brewery from "./Brewery";

interface BreweryServiceConstructor {
  fetchBreweryListByInputText(query: string): Promise<Brewery[]>;
  fetchBreweryById(breweryId: string): Promise<Brewery>;
}

export default BreweryServiceConstructor;
