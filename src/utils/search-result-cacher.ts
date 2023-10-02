import Brewery from "@/types/Brewery";
import { isBreweryList } from "./type-checker";

export const saveScrollPosition = (scrollY: number) => {
  sessionStorage.setItem("scrollPosition", String(scrollY));
};
export const saveKeyword = (inputText: string) => {
  sessionStorage.setItem("keyword", inputText);
};
export const saveBreweryList = (breweryList: Brewery[]) => {
  const encodedBreweryList = JSON.stringify(breweryList);
  sessionStorage.setItem("brewery-list", encodedBreweryList);
};

export const loadScrollPosition = () => {
  const scrollY = sessionStorage.getItem("scrollPosition");
  return scrollY ? Number(scrollY) : 0;
};

export const loadKeyword = () => {
  const keyword = sessionStorage.getItem("keyword");
  return keyword ?? "";
};

export const loadBreweryList = (): Brewery[] => {
  const encodedBreweryList = sessionStorage.getItem("brewery-list");
  if (encodedBreweryList) {
    const decodedBreweryList: unknown = JSON.parse(encodedBreweryList);
    if (isBreweryList(decodedBreweryList)) {
      return decodedBreweryList;
    }
  }
  return [];
};
