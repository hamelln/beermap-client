import React from "react";
import BreweryService from "@/services/BreweryService";
import S from "./BreweryDetails.module.scss";
import Carousel from "@/components/brewery_details/Carousel";
import BeerIcon from "@/components/icons/BeerIcon";
import Contact from "@/components/brewery_details/Contact";

interface Props {
  params: { id: string };
}

export default async function BreweryDetails({ params }: Props) {
  const breweryService = new BreweryService();
  const { id } = params;
  const brewery = await breweryService.fetchBreweryById(id);
  const {
    breweryName,
    initialCarouselImage,
    images,
    breweryDescription,
    beerName,
    beerDescription,
  } = brewery;

  const carouselImages = images ?? [];
  const firstImage =
    initialCarouselImage ?? "/carousel_titles/default_image.webp";

  return (
    <article className={S.main}>
      <Carousel initialCarouselImage={firstImage} images={carouselImages} />
      <div className={S.info_box}>
        <header className={S.title_header}>
          <h2>{breweryName}</h2>
        </header>
        <Contact brewery={brewery} />
        <div className={S.cutline}></div>
        <section className={S.description_section}>
          <span className={S.long_text}>{breweryDescription}</span>
        </section>
        <div className={S.cutline}></div>
        <section className={S.recommend_section}>
          <div className={S.beer_figure}>
            <div>
              <BeerIcon />
              <span>추천 맥주</span>
            </div>
            <h3>{beerName}</h3>
            <span className={S.long_text}>{beerDescription}</span>
          </div>
        </section>
      </div>
    </article>
  );
}
