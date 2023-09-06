"use client";

import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import BreweryService from "@/services/BreweryService";
import Brewery from "@/types/Brewery";
import {
  loadBreweries,
  loadKeyword,
  loadScrollPosition,
} from "@/utils/search-result-cacher";
import SearchBar from "@/components/SearchBar";
import BreweryList from "@/components/BreweryList";
import BreweryServiceInterface from "@/types/BreweryServiceInterface";

const Search = () => {
  const [inputText, setInputText] = useState<string>("");
  const [breweries, setbreweries] = useState<Brewery[]>([]);
  const [isPending, startTransition] = useTransition();
  const breweryService: BreweryServiceInterface = new BreweryService();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handlebreweries = async () => {
    const newBreweries: Brewery[] =
      await breweryService.fetchBreweriesByInputText(inputText);
    setbreweries(newBreweries);
  };

  const restoreScroll = (y: number) => {
    if (y === 0 || window.scrollY !== 0) return;
    requestAnimationFrame(() => {
      scrollTo(0, y);
      restoreScroll(y);
    });
  };

  useEffect(() => {
    if (sessionStorage.length > 0) {
      setInputText(loadKeyword());
      setbreweries(loadBreweries());
      restoreScroll(loadScrollPosition());
    }
  }, []);

  useEffect(() => {
    startTransition(() => {
      handlebreweries();
    });
  }, [inputText]);

  return (
    <>
      <SearchBar inputText={inputText} handleChange={handleChange} />
      <BreweryList inputText={inputText} breweries={breweries} />
    </>
  );
};

export default Search;
