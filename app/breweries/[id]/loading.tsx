import React from "react";
import S from "./BreweryDetails.module.scss";
import CarouselSkeleton from "./carousel/CarouselSkeleton";
import BeerIcon from "@/app/icons/BeerIcon";
import ContactSkeleton from "./contact/ContactSkeleton";

const Loading = () => {
  return (
    <article className={S.main}>
      <CarouselSkeleton />
      <div className={S.info_box}>
        <header className={S.title_header}>
          <h2 className={S.title}></h2>
        </header>
        <ContactSkeleton />
        <section className={S.description_section}></section>
        <section className={S.recommend_section}>
          <div className={S.beer_figure}>
            <div className={S.beer_title_box}>
              <BeerIcon />
              <span className={S.beer_recommendation}>추천 맥주</span>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Loading;
