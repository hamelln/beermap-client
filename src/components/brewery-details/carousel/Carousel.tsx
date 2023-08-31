"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import S from "./Carousel.module.scss";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import BackArrowIcon from "src/components/icons/BackArrowIcon";
import Image from "@/types/Image";

interface Props {
  images: Image[];
}

const Carousel = ({ images }: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const router = useRouter();

  const redirectToSearchPage = (): void => {
    router.replace("/");
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
      <button onClick={handleClick} aria-label="뒤로 가기">
        <BackArrowIcon />
      </button>
      <Slider {...settings}>
        {images.map((image: Image, index: number) => {
          return (
            <Fragment key={image.id}>
              <img
                className={S.carousel_image}
                src={image.small}
                alt="brewery image"
                srcSet={`${image.small} 280w, ${image.medium} 428w, ${image.large} 800w`}
                sizes="(max-width: 280px) 280w, (max-width: 428px) 428w, 800w"
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index !== 0 ? "lazy" : "eager"}
              />
              <div className={S.carosel_background}></div>
            </Fragment>
          );
        })}
      </Slider>
      <div className={S.indicator}>
        {currentSlide + 1} / {images.length}
      </div>
    </section>
  );
};

export default Carousel;
