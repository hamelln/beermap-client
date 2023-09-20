import Brewery from "@/types/Brewery";
import { isBreweryList } from "./type-checker";

export const saveScrollPosition = (scrollY: number) => {
  sessionStorage.setItem("scrollPosition", String(scrollY));
};
export const saveKeyword = (inputText: string) => {
  sessionStorage.setItem("keyword", inputText);
};
export const saveBreweries = (breweries: Brewery[]) => {
  const encodedBreweries = JSON.stringify(breweries);
  sessionStorage.setItem("brewery-list", encodedBreweries);
};

export const loadScrollPosition = () => {
  const scrollY = sessionStorage.getItem("scrollPosition");
  return scrollY ? Number(scrollY) : 0;
};

export const loadKeyword = () => {
  const keyword = sessionStorage.getItem("keyword");
  return keyword ?? "";
};

export const loadBreweries = (): Brewery[] => {
  const encodedBreweries = sessionStorage.getItem("brewery-list");
  if (encodedBreweries) {
    const decodedBreweries: unknown = JSON.parse(encodedBreweries);
    if (isBreweryList(decodedBreweries)) {
      return decodedBreweries;
    }
  }
  return [];
};
