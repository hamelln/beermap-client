import React, { useState } from "react";
import {
  Container,
  NaverMap,
  Marker,
  useNavermaps,
  useMap,
} from "react-naver-maps";
import S from "./NaverMaps.module.scss";
import useDebounce from "@/utils/useDebounce";
import MouseClick from "@/types/MouseClick";
import CopyIcon from "@/app/icons/CopyIcon";
import NavigationIcon from "@/app/icons/NavigationIcon";
import CloseIcon from "@/app/icons/CloseIcon";

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
  const [showNotification, setShowNotification] = useState(false);
  const debouncedSetShowNotification = useDebounce(() => {
    setShowNotification(false);
  });

  const NAVIGATION_URL = `https://map.naver.com/index.nhn?elng=${longitude}&elat=${latitude}&pathType=0&showMap=true&etext=${breweryName}&menu=route`;
  const ADDRESS_BOX_HEIGHT_RATIO = 0.18;
  const LATITUDE_SPAN = 0.005;
  const LATITUDE_ADJUSTMENT = LATITUDE_SPAN * ADDRESS_BOX_HEIGHT_RATIO;

  const navermaps = useNavermaps();
  const map = useMap();

  const handleClick = (e: MouseClick) => {
    navigator.clipboard.writeText(fullAddress);
    setShowNotification(true);
    debouncedSetShowNotification();
  };

  const BreweryPlace = () => {
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

  const findClient = (e: any) => {
    e.preventDefault();
    let clientP;
    navigator.geolocation.getCurrentPosition((pos) => {
      const clientLat = pos.coords.latitude;
      const clientLng = pos.coords.longitude;
      clientP = new navermaps.LatLng(clientLat, clientLng);
      map?.panTo(clientP);
    });
  };

  return (
    <section className={S.map_box}>
      <Container className={S.map}>
        <BreweryPlace />
      </Container>
      <aside className={S.place_description_box}>
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
          </a>
          <div className={S.nav_inner_box} onClick={handleMap}>
            <CloseIcon />
          </div>
          <div onClick={findClient}>내 위치 확인</div>
        </nav>
      </aside>
    </section>
  );
};

export default NaverMaps;
