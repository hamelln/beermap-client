import React from "react";
import Brewery from "@/types/Brewery";
import {
  saveBreweryList,
  saveKeyword,
  saveScrollPosition,
} from "@/utils/search-result-cacher";
import BreweryCard from "./BreweryCard";
import S from "./BreweryList.module.scss";

interface Props {
  inputText: string;
  breweryList: Brewery[];
}

const BreweryList = ({ inputText, breweryList }: Props) => {
  const saveSearchInfo = () => {
    saveKeyword(inputText);
    saveBreweryList(breweryList);
    saveScrollPosition(screenY);
  };

  return (
    <section className={S.section}>
      <ul className={S.list} data-testid="searchResult">
        {breweryList.map((brewery) => {
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
