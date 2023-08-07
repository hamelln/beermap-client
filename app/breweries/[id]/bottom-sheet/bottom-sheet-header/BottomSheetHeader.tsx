import React from "react";
import S from "./BottomSheetHeader.module.scss";

interface Props {
  breweryName: string;
}

const BottomSheetHeader = ({ breweryName }: Props) => {
  return (
    <div className={S.main}>
      <div className={S.handle}></div>
      <div>
        <span className={S.brewery_name}>{breweryName}</span>
      </div>
    </div>
  );
};

export default BottomSheetHeader;
