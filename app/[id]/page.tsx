import React from "react";
import BreweryDetailsProps from "@/types/BreweryDetailsProps";
import BreweryService from "@/services/BreweryService";
import S from "./BreweryDetails.module.scss";
import Carousel from "@/components/brewery-details/Carousel";
import BeerIcon from "@/components/icons/BeerIcon";
import Contact from "@/components/brewery-details/Contact";

interface Props {
  params: { id: string };
}

export default async function BreweryDetails({ params }: Props) {
  const breweryService = new BreweryService();
  const id = params.id;
  const breweryInfo: BreweryDetailsProps =
    await breweryService.fetchBreweryById(id);
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
  } = breweryInfo;
  const fullAddress = `${stateProvince} ${city} ${address}`;
  const carouselImages = [
    {
      id: "tbzsecesrje8hguiexmn",
      small:
        "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_280,h_280/f_webp/q_auto/tbzsecesrje8hguiexmn.png",
      medium:
        "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_428,h_428/f_webp/q_auto/tbzsecesrje8hguiexmn.png",
      large:
        "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_800,h_800/f_webp/q_auto/tbzsecesrje8hguiexmn.png",
    },
    {
      id: "ioi33rfom6jnddsvhugk",
      small:
        "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_280,h_280/f_webp/q_auto/ioi33rfom6jnddsvhugk.webp",
      medium:
        "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_428,h_428/f_webp/q_auto/ioi33rfom6jnddsvhugk.webp",
      large:
        "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_800,h_800/f_webp/q_auto/ioi33rfom6jnddsvhugk.webp",
    },
    {
      id: "jbhy6cnlx4ctgwdrpfx3",
      small:
        "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_280,h_280/f_webp/q_auto/jbhy6cnlx4ctgwdrpfx3.png",
      medium:
        "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_428,h_428/f_webp/q_auto/jbhy6cnlx4ctgwdrpfx3.png",
      large:
        "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_800,h_800/f_webp/q_auto/jbhy6cnlx4ctgwdrpfx3.png",
    },
    {
      id: "opkfvq0ksmmoxlgpklf8",
      small:
        "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_280,h_280/f_webp/q_auto/opkfvq0ksmmoxlgpklf8.webp",
      medium:
        "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_428,h_428/f_webp/q_auto/opkfvq0ksmmoxlgpklf8.webp",
      large:
        "https://res.cloudinary.com/daqb6szdi/image/upload/c_scale,w_800,h_800/f_webp/q_auto/opkfvq0ksmmoxlgpklf8.webp",
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
