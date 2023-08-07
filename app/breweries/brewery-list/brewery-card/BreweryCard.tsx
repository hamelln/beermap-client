import React, { MouseEvent } from "react";
import Brewery from "@/types/Brewery";
import S from "./BreweryCard.module.scss";
import { useRouter } from "next/navigation";

interface Props {
  brewery: Brewery;
  saveSearchInfo: () => void;
}

const BreweryCard = ({ brewery, saveSearchInfo }: Props) => {
  const {
    id,
    breweryName,
    breweryDescription,
    stateProvince,
    city,
    address,
    signatureBeer,
  } = brewery;
  const fullAddress = `${stateProvince} ${city} ${address}`;
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    router.push(`/breweries/${id}`);
    saveSearchInfo();
  };

  return (
    <>
      <li className={S.brewery_item} onClick={handleClick}>
        <div className={S.inner_box}>
          <div className={S.image_box}>
            <img src="/test-image.png" alt="가게 이미지"></img>
          </div>
          <div className={S.content_box}>
            <h3 className={S.brewery_name}>{breweryName}</h3>
            <div className={S.brewery_desc}>{breweryDescription}</div>
            <div className={S.recommend_box}>
              <span className={S.recommend_title}>추천 맥주</span>
              <span className={S.recommend_beer}>{signatureBeer.beerName}</span>
            </div>
          </div>
        </div>
        <div className={S.address}>
          <span>{fullAddress}</span>
        </div>
      </li>
      <div className={S.cutline}></div>
    </>
  );
};

export default BreweryCard;
