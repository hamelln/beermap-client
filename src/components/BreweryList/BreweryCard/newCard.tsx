import React, { MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Brewery from "@/types/Brewery";
import S from "./NewCard.module.scss";

interface Props {
  brewery: Brewery;
  saveSearchInfo: () => void;
}

const NewCard = ({ brewery, saveSearchInfo }: Props) => {
  const {
    id,
    breweryName,
    breweryIntro,
    stateProvince,
    city,
    address,
    logo,
    beerName,
    initialCarouselImage
  } = brewery;
  const fullAddress = `${stateProvince} ${city} ${address}`;
  const router = useRouter();
  // const src = logo ?? "/logos/default_logo.webp";

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    router.push(`/${id}`);
    saveSearchInfo();
  };

  return (
    <>
      <li className={S.brewery_item} onClick={handleClick}>
        <h2 className={S.brewery_title}>{breweryName}</h2>
        <span className={S.brewery_description}>{breweryIntro}</span>
        <address>{fullAddress}</address>
        <span></span>
        <img src={initialCarouselImage} alt="가게 이미지"></img>
      </li>
    </>
  );
};

export default NewCard;
