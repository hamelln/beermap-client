import Brewery from "@/types/Brewery";

function _dummy() {
  return typeof "";
}
type TypeofType = ReturnType<typeof _dummy>;
interface TypeofTypeMap {
  number: number;
  string: string;
  boolean: boolean;
  bigint: bigint;
  object: object | null;
  function: Function;
  symbol: symbol;
  undefined: undefined;
}

function isEqualFieldType<
  Object extends object,
  Key extends keyof Object,
  TypeofKey extends TypeofType
>(
  object: Object,
  key: Key,
  typeofKey: TypeofKey
): object is Object & Record<Key, TypeofTypeMap[TypeofKey]> {
  return typeof object[key] === typeofKey;
}

export function isBreweryList(datas: unknown): datas is Brewery[] {
  return Array.isArray(datas) && datas.every(isBrewery);
}

// images 등 몇 속성을 안 넣은 이유: 필수 속성이어도 값이 비어있으면 DB에서 가져올 때 제외됨.
export function isBrewery(data: unknown): data is Brewery {
  if (
    data === null ||
    typeof data !== "object" ||
    !("id" in data) ||
    !isEqualFieldType(data, "id", "string") ||
    !("breweryName" in data) ||
    !isEqualFieldType(data, "breweryName", "string") ||
    !("breweryType" in data) ||
    !isEqualFieldType(data, "breweryType", "string") ||
    !("stateProvince" in data) ||
    !isEqualFieldType(data, "stateProvince", "string") ||
    !("city" in data) ||
    !isEqualFieldType(data, "city", "string") ||
    !("address" in data) ||
    !isEqualFieldType(data, "address", "string") ||
    !("postalCode" in data) ||
    !isEqualFieldType(data, "postalCode", "string") ||
    !("longitude" in data) ||
    !isEqualFieldType(data, "longitude", "number") ||
    !("latitude" in data) ||
    !isEqualFieldType(data, "latitude", "number") ||
    !("phone" in data) ||
    !isEqualFieldType(data, "phone", "string") ||
    !("websiteUrl" in data) ||
    !isEqualFieldType(data, "websiteUrl", "string") ||
    !("websiteType" in data) ||
    !isEqualFieldType(data, "websiteType", "string") ||
    !("breweryIntro" in data) ||
    !isEqualFieldType(data, "breweryIntro", "string") ||
    !("breweryDescription" in data) ||
    !isEqualFieldType(data, "breweryDescription", "string") ||
    !("beerName" in data) ||
    !isEqualFieldType(data, "beerName", "string") ||
    !("beerDescription" in data) ||
    !isEqualFieldType(data, "beerDescription", "string") ||
    !("officeHours" in data)
  ) {
    return false;
  }
  return true;
}
