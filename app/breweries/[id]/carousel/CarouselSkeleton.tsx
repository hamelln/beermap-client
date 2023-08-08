import React from "react";
import S from "./Carousel.module.scss";
import BackArrowIcon from "@/app/icons/BackArrowIcon";

const CarouselSkeleton = () => {
  return (
    <section className={S.main}>
      <button className={S.prev_page_arrow} aria-label="뒤로 가기">
        <BackArrowIcon />
      </button>
      <div>
        <img
          className={S.carousel_image}
          src="/brewery-image.webp"
          alt="brewery image"
          fetchPriority="high"
        />
        <div className={S.carosel_background}></div>
      </div>
      <div className={S.indicator}>1 / 1</div>
    </section>
  );
};

export default CarouselSkeleton;
