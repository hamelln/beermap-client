import { ChangeEvent, useEffect, useState, useTransition } from "react";
import BreweryService from "@/services/BreweryService";
import Brewery from "@/types/Brewery";
import {
  loadBreweryList,
  loadKeyword,
  loadScrollPosition,
} from "@/utils/search-result-cacher";

const useSearchBrewery = () => {
  const [searchText, setSearchText] = useState("");
  const [breweryList, setbreweryList] = useState<Brewery[]>([]);
  const [isPending, startTransition] = useTransition();
  const breweryService = new BreweryService();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleBreweryList = async () => {
    const newBreweryList = await breweryService.fetchBreweryListByInputText(
      searchText
    );
    setbreweryList(newBreweryList);
  };

  const restoreScroll = (y: number) => {
    if (y === 0 || scrollY !== 0) return;
    requestAnimationFrame(() => {
      scrollTo(0, y);
      restoreScroll(y);
    });
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      if (sessionStorage.length > 0) {
        setSearchText(loadKeyword());
        setbreweryList(loadBreweryList());
        restoreScroll(loadScrollPosition());
      }
    }
  }, []);

  useEffect(() => {
    startTransition(() => {
      handleBreweryList();
    });
  }, [searchText]);

  return { searchText, breweryList, handleChange };
};

export default useSearchBrewery;
