import { ChangeEvent, useEffect, useState, useTransition } from "react";
import BreweryService from "@/services/BreweryService";
import Brewery from "@/types/Brewery";
import {
  loadBreweryList,
  loadKeyword,
  loadScrollPosition,
} from "@/utils/search-result-cacher";
import useDebounce from "./useDebounce";

const useSearchBrewery = () => {
  const [searchText, setSearchText] = useState("");
  const [breweryList, setBreweryList] = useState<Brewery[]>([]);
  const [isPending, startTransition] = useTransition();
  const breweryService = new BreweryService();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleBreweryList = async () => {
    const newBreweryList = await breweryService.fetchBreweryListByInputText(
      searchText
    );
    setBreweryList(newBreweryList);
  };

  const debouncedHandleBrewery = useDebounce(handleBreweryList);

  const restoreScroll = (y: number) => {
    if (y === 0 || scrollY !== 0) return;
    requestAnimationFrame(() => {
      scrollTo(0, y);
      restoreScroll(y);
    });
  };

  useEffect(() => {
    const fetchDataFromSessionStorage = () => {
      if (typeof window !== "undefined") {
        const savedBreweryList = loadBreweryList();
        const savedKeyword = loadKeyword();
        const savedScrollPosition = loadScrollPosition();

        if (savedBreweryList.length > 0) {
          setSearchText(savedKeyword);
          restoreScroll(savedScrollPosition);
          setBreweryList(savedBreweryList);
        }
      }
    };
    fetchDataFromSessionStorage();
  }, []);

  useEffect(() => {
    setTimeout(debouncedHandleBrewery, searchText === "" ? 0 : 10);
  }, [searchText]);

  return { searchText, breweryList, handleChange };
};

export default useSearchBrewery;
