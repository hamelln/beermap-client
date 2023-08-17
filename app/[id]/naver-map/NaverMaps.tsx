import React, { useState } from "react";
import { Container, NaverMap, Marker, useNavermaps } from "react-naver-maps";
import S from "./NaverMaps.module.scss";
import useDebounce from "@/utils/useDebounce";
import CopyIcon from "@/app/icons/CopyIcon";
import NavigationIcon from "@/app/icons/NavigationIcon";
import CloseIcon from "@/app/icons/CloseIcon";
import MyLocationIcon from "@/app/icons/MyLocationIcon";

interface Props {
  isMapOpen: boolean;
  breweryName: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  handleMap: () => void;
}

const NaverMaps = ({
  isMapOpen,
  breweryName,
  fullAddress,
  latitude,
  longitude,
  handleMap,
}: Props) => {
  if (!isMapOpen) return <></>;

  const NAVIGATION_URL = `https://map.naver.com/index.nhn?elng=${longitude}&elat=${latitude}&pathType=0&showMap=true&etext=${breweryName}&menu=route`;
  const navermaps = useNavermaps();
  const [showNotification, setShowNotification] = useState(false);
  const debouncedSetShowNotification = useDebounce(() => {
    setShowNotification(false);
  });
  const [center, setCenter] = useState([latitude, longitude]);
  const [markers, setMarkers] = useState([[latitude, longitude]]);
  const [zoom, setZoom] = useState<number>(17);
  const MAX_ZOOM = 21;
  const MIN_ZOOM = 7;

  const handleClick = () => {
    navigator.clipboard.writeText(fullAddress);
    setShowNotification(true);
    debouncedSetShowNotification();
  };

  const zoomIn = () => {
    if (zoom >= MAX_ZOOM) return;
    setZoom(zoom + 1);
  };

  const zoomOut = () => {
    if (zoom <= MIN_ZOOM) return;
    setZoom(zoom - 1);
  };

  const findClient = (e: any) => {
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
          zoom={zoom}
        >
          {markers.map((marker, index) => {
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
        <button className={S.my_location} onClick={findClient}>
          <MyLocationIcon />
        </button>
        <div className={S.scale_box}>
          <button className={S.nav_inner_box} onClick={zoomIn}>
            +
          </button>
          <button className={S.nav_inner_box} onClick={zoomOut}>
            -
          </button>
        </div>
        <h3 className={S.place_name}>{breweryName}</h3>
        <div className={S.place_address_box} onClick={handleClick}>
          <p className={S.place_address}>
            {fullAddress}
            <CopyIcon />
            <span className={S.place_copy_text}>복사</span>
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
          <a className={S.nav_inner_box} href={NAVIGATION_URL} target="_blank">
            <NavigationIcon />
            길찾기
          </a>
          <button className={S.nav_inner_box} onClick={handleMap}>
            <CloseIcon />
            닫기
          </button>
        </nav>
      </aside>
    </section>
  );
};

export default NaverMaps;
