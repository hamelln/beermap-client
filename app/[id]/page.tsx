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
    latitude,
    longitude,
  } = breweryInfo;
  const fullAddress = `${stateProvince} ${city} ${address}`;
  const { beerName, beerDescription } = signatureBeer;
  const images = ["/brewery-image.png", "/brewery-image.png"];
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
      <Carousel images={images} />
      <div className={S.info_box}>
        <header className={S.title_header}>
          <h2 className={S.title}>{breweryName}</h2>
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
            <div className={S.beer_title_box}>
              <BeerIcon />
              <span className={S.beer_recommendation}>추천 맥주</span>
            </div>
            <h3 className={S.beer_name}>{beerName}</h3>
            <p className={S.beer_description}>{beerDescription}</p>
          </div>
        </section>
      </div>
    </article>
  );
}
