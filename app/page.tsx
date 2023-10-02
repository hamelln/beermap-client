"use client";

import React from "react";
import SearchBar from "@/components/SearchBar";
import BreweryList from "@/components/BreweryList";
import useSearchBrewery from "@/hooks/useSearchBrewery";

const Search = () => {
  const { searchText, breweryList, handleChange } = useSearchBrewery();

  return (
    <>
      <SearchBar inputText={searchText} handleChange={handleChange} />
      <BreweryList inputText={searchText} breweryList={breweryList} />
    </>
  );
};

export default Search;
