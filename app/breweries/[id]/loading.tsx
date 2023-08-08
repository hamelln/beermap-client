import React from "react";
import S from "./BreweryDetails.module.scss";
import CarouselSkeleton from "./carousel/CarouselSkeleton";
import BottomSheetSkeleton from "./bottom-sheet/BottomSheetSkeleton";

const Loading = () => {
  return (
    <article className={S.main}>
      <CarouselSkeleton />
      <div className={S.info_box}></div>
      <BottomSheetSkeleton />
    </article>
  );
};

export default Loading;
