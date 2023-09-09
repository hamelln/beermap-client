import React from "react";
import BreweryService from "@/services/BreweryService";
import S from "./BreweryDetails.module.scss";
import Carousel from "@/components/brewery_details/Carousel";
import BeerIcon from "@/components/icons/BeerIcon";
import Contact from "@/components/brewery_details/Contact";
import Brewery from "@/types/Brewery";
import Img from "@/types/Img";

interface Props {
  params: { id: string };
}

export default async function BreweryDetails({ params }: Props) {
  const breweryService = new BreweryService();
  const { id } = params;
  const brewery: Brewery = await breweryService.fetchBreweryById(id);
  const {
    breweryName,
    initialCarouselImage,
    images,
    stateProvince,
    city,
    address,
    longitude,
    latitude,
    phone,
    websiteUrl,
    websiteType,
    breweryDescription,
    beerName,
    beerDescription,
    officeHours,
    summarizedOfficeHours,
  } = brewery;
  const fullAddress = `${stateProvince} ${city} ${address}`;
  const carouselImages: Img[] = images ?? [];
  const firstImage: string =
    initialCarouselImage ?? "/carousel_titles/default_image.webp";

  return (
    <article className={S.main}>
      <Carousel initialCarouselImage={firstImage} images={carouselImages} />
      <div className={S.info_box}>
        <header className={S.title_header}>
          <h2>{breweryName}</h2>
        </header>
        <Contact
          breweryName={breweryName}
          fullAddress={fullAddress}
          phone={phone}
          websiteUrl={websiteUrl}
          officeHours={officeHours}
          websiteType={websiteType}
          summarizedOfficeHours={summarizedOfficeHours}
          latitude={latitude}
          longitude={longitude}
        />
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
