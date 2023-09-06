import React from "react";
import BreweryService from "@/services/BreweryService";
import S from "./BreweryDetails.module.scss";
import Carousel from "@/components/brewery_details/Carousel";
import BeerIcon from "@/components/icons/BeerIcon";
import Contact from "@/components/brewery_details/Contact";
import Brewery from "@/types/Brewery";
import BreweryServiceInterface from "@/types/BreweryServiceInterface";
import Img from "@/types/Img";

interface Props {
  params: { id: string };
}

export default async function BreweryDetails({ params }: Props) {
  const breweryService: BreweryServiceInterface = new BreweryService();
  const id = params.id;
  const brewery: Brewery = await breweryService.fetchBreweryById(id);
  const {
    breweryName,
    breweryDescription,
    stateProvince,
    city,
    address,
    phone,
    websiteUrl,
    officeHours,
    beerName,
    beerDescription,
    websiteType,
    summarizedOfficeHours,
    images,
    latitude,
    longitude,
  } = brewery;
  const fullAddress = `${stateProvince} ${city} ${address}`;
  const carouselImages: Img[] = [];
  const breweryDescriptionTexts = breweryDescription.split("\\n");
  const EnteredBreweryDescription = breweryDescriptionTexts.map(
    (line, index) => {
      return (
        <p>
          {line}
          {index < breweryDescriptionTexts.length - 1 && <br />}
        </p>
      );
    }
  );

  return (
    <article className={S.main}>
      <Carousel images={images ?? carouselImages} />
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
          {EnteredBreweryDescription}
        </section>
        <div className={S.cutline}></div>
        <section className={S.recommend_section}>
          <div className={S.beer_figure}>
            <div>
              <BeerIcon />
              <span>추천 맥주</span>
            </div>
            <h3>{beerName}</h3>
            <p>{beerDescription}</p>
          </div>
        </section>
      </div>
    </article>
  );
}
