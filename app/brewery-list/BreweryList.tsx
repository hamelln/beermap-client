import React from "react";
import S from "./BreweryList.module.scss";
import Brewery from "@/types/Brewery";
import {
  saveBreweries,
  saveKeyword,
  saveScrollPosition,
} from "@/utils/search-result-cacher";
import BreweryCard from "./brewery-card/BreweryCard";

interface Props {
  inputText: string;
  breweries: Brewery[];
}

const BreweryList = ({ inputText, breweries }: Props) => {
  const saveSearchInfo = () => {
    saveKeyword(inputText);
    saveBreweries(breweries);
    saveScrollPosition(window.scrollY);
  };

  return (
    <section className={S.section}>
      <ul className={S.brewery_list} data-testid="searchResult">
        {breweries.map((brewery: Brewery) => {
          return (
            <BreweryCard
              key={brewery.id}
              brewery={brewery}
              saveSearchInfo={saveSearchInfo}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default BreweryList;
