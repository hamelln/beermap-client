import Brewery from "@/types/Brewery";

export function isBreweryList(datas: unknown): datas is Brewery[] {
  return Array.isArray(datas) && datas.every(isBrewery);
}
/**
 * @ 반드시 해당 속성에 값이 있어야 key 조회 가능.
 * # 예: images: []이면 DB는 images 속성을 없애므로 조회 불가능.
 */
export function isBrewery(data: unknown): data is Brewery {
  if (data && typeof data === "object") {
    return (
      "id" in data &&
      "breweryName" in data &&
      "breweryType" in data &&
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
  return true;
}
