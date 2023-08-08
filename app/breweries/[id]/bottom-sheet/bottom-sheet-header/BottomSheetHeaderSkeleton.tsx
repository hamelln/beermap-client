import React from "react";
import S from "./BottomSheetHeader.module.scss";

const BottomSheetHeaderSkeleton = () => {
  return (
    <div className={S.main}>
      <div className={S.handle}></div>
    </div>
  );
};

export default BottomSheetHeaderSkeleton;
