import IBrewery from "@/types/Brewery";

type SessionValue = string | null;

export const saveScrollPosition = (scrollY: number) => {
  sessionStorage.setItem("scrollPosition", String(scrollY));
};
export const saveKeyword = (inputText: string) => {
  sessionStorage.setItem("keyword", inputText);
};
export const saveBreweries = (breweries: IBrewery[]) => {
  const encodedBreweries = JSON.stringify(breweries);
  sessionStorage.setItem("brewery-list", encodedBreweries);
};

export const loadScrollPosition = () => {
  const scrollY: SessionValue = sessionStorage.getItem("scrollPosition");
  return scrollY ? Number(scrollY) : 0;
};

export const loadKeyword = () => {
  const keyword: SessionValue = sessionStorage.getItem("keyword");
  return keyword ?? "";
};

export const loadBreweries = (): IBrewery[] => {
  const encodedBreweries: SessionValue = sessionStorage.getItem("brewery-list");
  if (encodedBreweries) {
    const decodedBreweries = JSON.parse(encodedBreweries);
    return decodedBreweries;
  }
  return [];
};
