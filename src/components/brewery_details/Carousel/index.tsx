"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img from "@/types/Img";
import S from "./Carousel.module.scss";
import BackArrowIcon from "@/components/icons/BackArrowIcon";

interface Props {
  initialCarouselImage: string;
  images: Img[];
}

const Carousel = ({ initialCarouselImage, images }: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const router = useRouter();

  const redirectToSearchPage = () => {
    router.replace("/");
  };

  const isDifferentDomain = (previousUrl: string, hostName: string) => {
    const previousHostname = previousUrl.split("/")[2];
    return previousUrl === "" || previousHostname.includes(hostName);
  };

  const handleClick = () => {
    const previousUrl = document.referrer;
    const hostName = location.hostname;
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
      <button onClick={handleClick} aria-label="뒤로 가기" data-cy="prev-page">
        <BackArrowIcon />
      </button>
      <Slider {...settings}>
        <div key={30021} className={S.image_box}>
          <Image
            src={initialCarouselImage}
            alt="brewery image"
            fill
            priority={true}
          />
          <div className={S.carosel_background}></div>
        </div>
        {images.map((image: Img) => {
          return (
            <div key={image.id} className={S.image_box}>
              <Image
                src={image.large}
                alt="brewery image"
                fill
                loading={"lazy"}
              />
              <div className={S.carosel_background}></div>
            </div>
          );
        })}
      </Slider>
      <div className={S.indicator}>
        {currentSlide + 1} / {images.length + 1}
      </div>
    </section>
  );
};

export default Carousel;
