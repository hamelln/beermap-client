import Brewery from "./Brewery";
import BreweryDetailsProps from "./BreweryDetailsProps";

interface BreweryServiceInterface {
  fetchBreweriesByInputText(query: string): Promise<Brewery[]>;
  fetchBreweryById(breweryId: string): Promise<BreweryDetailsProps>;
}

export default BreweryServiceInterface;
