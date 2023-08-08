import React from "react";
import S from "./BottomSheet.module.scss";
import BottomSheetHeaderSkeleton from "./bottom-sheet-header/BottomSheetHeaderSkeleton";

const BottomSheetSkeleton = () => {
  return (
    <div className={S.main}>
      <BottomSheetHeaderSkeleton />
      <div className={S.content}></div>
    </div>
  );
};

export default BottomSheetSkeleton;
