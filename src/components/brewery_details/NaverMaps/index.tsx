"use client";

import React, { MouseEvent, useState } from "react";
import { Container, NaverMap, Marker, useNavermaps } from "react-naver-maps";
import useDebounce from "@/hooks/useDebounce";
import S from "./NaverMaps.module.scss";
import CopyIcon from "@/components/icons/CopyIcon";
import NavigationIcon from "@/components/icons/NavigationIcon";
import CloseIcon from "@/components/icons/CloseIcon";
import MyLocationIcon from "@/components/icons/MyLocationIcon";

interface Props {
  breweryName: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  handleModal: () => void;
}

const NaverMaps = ({
  breweryName,
  fullAddress,
  latitude,
  longitude,
  handleModal,
}: Props) => {
  const NAVIGATION_URL = `https://map.naver.com/index.nhn?elng=${longitude}&elat=${latitude}&pathType=0&showMap=true&etext=${breweryName}&menu=route`;
  const navermaps = useNavermaps();
  const [showNotification, setShowNotification] = useState(false);
  const debouncedSetShowNotification = useDebounce(() => {
    setShowNotification(false);
  });
  const [center, setCenter] = useState([latitude, longitude]);
  const [markers, setMarkers] = useState([[latitude, longitude]]);

  const handleClick = () => {
    navigator.clipboard.writeText(fullAddress);
    setShowNotification(true);
    debouncedSetShowNotification();
  };

  const findClient = (e: MouseEvent) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((pos) => {
      const [lat, lng] = [pos.coords.latitude, pos.coords.longitude];
      const newMarkers = [...markers, [lat, lng]];
      setCenter([lat, lng]);
      setMarkers(newMarkers);
    });
  };

  return (
    <section className={S.map_box}>
      <Container className={S.map} id="map">
        <NaverMap
          center={new navermaps.LatLng(center[0], center[1])}
          zoomControl
          zoomControlOptions={{
            position: navermaps.Position.RIGHT_CENTER,
            style: navermaps.ZoomControlStyle.SMALL,
          }}
          zoom={17}
          minZoom={7}
          maxZoom={21}
          disableKineticPan={true}
          tileTransition={true}
        >
          {markers.map((marker, index) => {
            console.log(123);

            return (
              <Marker
                key={index}
                position={new navermaps.LatLng(marker[0], marker[1])}
              />
            );
          })}
        </NaverMap>
      </Container>
      <aside className={S.place_description_box}>
        <button onClick={findClient}>
          <MyLocationIcon />
        </button>
        <h3>{breweryName}</h3>
        <div className={S.place_address_box} onClick={handleClick}>
          <p>
            {fullAddress}
            <CopyIcon />
            <span>복사</span>
          </p>
        </div>
        <div
          className={`${S.notification} ${
            showNotification && S.show_notification
          }`}
        >
          주소를 복사했습니다.
        </div>
        <nav className={S.nav_box}>
          <a href={NAVIGATION_URL} target="_blank">
            <NavigationIcon />
            길찾기
          </a>
          <button onClick={handleModal}>
            <CloseIcon />
            닫기
          </button>
        </nav>
      </aside>
    </section>
  );
};

export default NaverMaps;
