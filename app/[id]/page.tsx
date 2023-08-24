import React from "react";
import BreweriesApi from "@/services/BreweriesApi";
import Carousel from "@/app/[id]/carousel/Carousel";
import S from "./BreweryDetails.module.scss";
import Contact from "./contact/Contact";
import BeerIcon from "@/app/icons/BeerIcon";
import BreweryDetailsProps from "@/types/BreweryDetailsProps";

interface Props {
  params: { id: string };
}

export default async function BreweryDetails({ params }: Props) {
  const breweriesApi = new BreweriesApi();
  const id = params.id;
  const breweryInfo: BreweryDetailsProps = await breweriesApi.fetchBreweryById(
    id
  );
  const {
    breweryName,
    breweryDescription,
    stateProvince,
    city,
    address,
    phone,
    websiteUrl,
    officeHours,
    signatureBeer,
    websiteType,
    summarizedOfficeHours,
    images,
    latitude,
    longitude,
  } = breweryInfo;
  const fullAddress = `${stateProvince} ${city} ${address}`;
  const { beerName, beerDescription } = signatureBeer;
  const carouselImages = images ?? [
    {
      id: "232",
      small: "/brewery-image.png",
      medium: "/brewery-image.png",
      large: "/brewery-image.png",
    },
  ];
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
      <Carousel images={carouselImages} />
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
