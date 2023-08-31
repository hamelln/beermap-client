import Brewery from "./Brewery";
import BreweryDetailsProps from "./BreweryDetailsProps";

interface BreweryService {
  fetchBreweriesByInputText(query: string): Promise<Brewery[]>;
  fetchBreweryById(breweryId: string): Promise<BreweryDetailsProps>;
}

export default BreweryService;
