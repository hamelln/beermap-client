import React from "react";
import S from "./Carousel.module.scss";

const CarouselSkeleton = () => {
  return (
    <section className={S.main} style={{ height: "calc(100vw * 8/9)" }}>
      <button className={S.prev_page_arrow}>
        <img src="/images/icons/back-arrow.svg" alt="back-arrow icon"></img>
      </button>
      <div className={S.spinner}></div>
      <div className={S.indicator}></div>
    </section>
  );
};

export default CarouselSkeleton;
