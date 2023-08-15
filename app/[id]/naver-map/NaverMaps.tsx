"use client";

import React, { useState } from "react";
import {
  Container,
  NaverMap,
  Marker,
  useNavermaps,
  NavermapsProvider,
} from "react-naver-maps";
import S from "./NaverMaps.module.scss";
import useDebounce from "@/utils/useDebounce";
import MouseClick from "@/types/MouseClick";

interface Props {
  breweryName: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
}

const NaverMaps = ({
  breweryName,
  fullAddress,
  latitude,
  longitude,
}: Props) => {
  const [showNotification, setShowNotification] = useState(false);
  const debouncedSetShowNotification = useDebounce(() => {
    setShowNotification(false);
  });
  const ADDRESS_BOX_HEIGHT_RATIO = 0.2;
  const LATITUDE_SPAN = 0.005;
  const LATITUDE_ADJUSTMENT = LATITUDE_SPAN * ADDRESS_BOX_HEIGHT_RATIO;

  const handleClick = (e: MouseClick) => {
    navigator.clipboard.writeText(fullAddress);
    setShowNotification(true);
    debouncedSetShowNotification();
  };

  const getDirections = () => {
    location.href = `https://map.naver.com/index.nhn?elng=${longitude}&elat=${latitude}&pathType=0&showMap=true&etext=${breweryName}&menu=route`;
  };

  const BreweryPlace = () => {
    const navermaps = useNavermaps();
    return (
      <NaverMap
        defaultCenter={
          new navermaps.LatLng(latitude - LATITUDE_ADJUSTMENT, longitude)
        }
        defaultZoom={17}
      >
        <Marker defaultPosition={new navermaps.LatLng(latitude, longitude)} />
      </NaverMap>
    );
  };

  return (
    <NavermapsProvider
      ncpClientId={process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID!}
    >
      <div className={S.map_box}>
        <Container className={S.map}>
          <BreweryPlace />
        </Container>
        <div className={S.place_description_box}>
          <h3 className={S.place_name}>{breweryName}</h3>
          <div className={S.place_address_box} onClick={handleClick}>
            <p className={S.place_address}>{fullAddress}</p>
            {/* <img className={S.place_copy_svg}></img> */}
            <p className={S.place_copy_text}>복사</p>
          </div>
          <div
            className={`${S.notification} ${
              showNotification && S.show_notification
            }`}
          >
            주소를 복사했습니다.
          </div>
          <div onClick={getDirections}>길찾기</div>
        </div>
      </div>
    </NavermapsProvider>
  );
};

export default NaverMaps;
