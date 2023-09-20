import Brewery from "@/types/Brewery";

export function isBreweryList(datas: unknown): datas is Brewery[] {
  return Array.isArray(datas) && datas.every(isBrewery);
}

export function isBrewery(data: unknown): data is Brewery {
  if (data && typeof data === "object") {
    return (
      "id" in data &&
      "breweryName" in data &&
      "breweryType" in data &&
      "images" in data &&
      "stateProvince" in data &&
      "city" in data &&
      "address" in data &&
      "postalCode" in data &&
      "longitude" in data &&
      "latitude" in data &&
      "phone" in data &&
      "websiteUrl" in data &&
      "websiteType" in data &&
      "breweryIntro" in data &&
      "breweryDescription" in data &&
      "beerName" in data &&
      "beerDescription" in data &&
      "officeHours" in data
    );
  }
  return false;
}
