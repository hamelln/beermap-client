import React, { MouseEvent } from "react";
import Brewery from "@/types/Brewery";
import S from "./BreweryCard.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  brewery: Brewery;
  saveSearchInfo: () => void;
}

const BreweryCard = ({ brewery, saveSearchInfo }: Props) => {
  const {
    id,
    breweryName,
    breweryIntro,
    stateProvince,
    city,
    address,
    logo,
    signatureBeer,
  } = brewery;
  const fullAddress = `${stateProvince} ${city} ${address}`;
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    router.push(`/${id}`);
    saveSearchInfo();
  };

  return (
    <>
      <li className={S.brewery_item} onClick={handleClick}>
        <div>
          <div>
            <Image
              src={logo ?? "/test-image.webp"}
              alt="가게 이미지"
              width={70}
              height={70}
            ></Image>
          </div>
          <div className={S.content_box}>
            <h3>{breweryName}</h3>
            <span>{breweryIntro}</span>
            <div>
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