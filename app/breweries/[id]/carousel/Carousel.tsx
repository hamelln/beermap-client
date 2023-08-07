"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import S from "./Carousel.module.scss";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  images: string[];
}

const Carousel = ({ images }: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const router = useRouter();

  const redirectToSearchPage = (): void => {
    router.replace("/breweries");
  };

  const isDifferentDomain = (
    previousUrl: string,
    hostName: string
  ): boolean => {
    const previousHostname = previousUrl.split("/")[2];
    return previousUrl === "" || previousHostname.includes(hostName);
  };

  const handleClick = (): void => {
    const previousUrl = document.referrer;
    const hostName = window.location.hostname;

    if (isDifferentDomain(previousUrl, hostName)) {
      redirectToSearchPage();
    } else {
      router.back();
    }
  };

  const settings = {
    beforeChange: (_: number, newSlide: number) => setCurrentSlide(newSlide),
    dots: false,
    infinite: true,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className={S.main}>
      <button className={S.prev_page_arrow} onClick={handleClick}>
        <img src="/images/icons/back-arrow.svg" alt="back-arrow icon"></img>
      </button>
      <Suspense>
        <Slider {...settings}>
          {images.map((image: string, index: number) => {
            return (
              <li key={index}>
                <img
                  className={S.carousel_image}
                  src={image}
                  alt="brewery image"
                />
                <div className={S.carosel_background}></div>
              </li>
            );
          })}
        </Slider>
      </Suspense>
      <div className={S.indicator}>
        {currentSlide + 1} / {images.length}
      </div>
    </section>
  );
};

export default Carousel;
