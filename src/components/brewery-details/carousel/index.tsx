"use client";

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
  images: Img[];
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
        {images.map((image: Img, index: number) => {
          return (
            <div key={image.id} className={S.image_box}>
              <Image
                src={image.large}
                alt="brewery image"
                fill
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index !== 0 ? "lazy" : "eager"}
              />
              <div className={S.carosel_background}></div>
            </div>
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
