import React from "react";
import Brewery from "@/types/Brewery";
import {
  saveBreweryList,
  saveKeyword,
  saveScrollPosition,
} from "@/utils/search-result-cacher";
import BreweryCard from "./BreweryCard";

interface Props {
  inputText: string;
  breweryList: Brewery[];
}

const BreweryList = ({ inputText, breweryList }: Props) => {
  const saveSearchInfo = () => {
    saveKeyword(inputText);
    saveBreweryList(breweryList);
    saveScrollPosition(window.scrollY);
  };

  return (
    <section style={{ marginTop: "48px", height: "100%", width: "100vw" }}>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 4vw",
        }}
        data-testid="searchResult"
      >
        {breweryList.map((brewery: Brewery) => {
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
