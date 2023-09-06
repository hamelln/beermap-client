"use client";

import React from "react";
import { NavermapsProvider } from "react-naver-maps";
import BreweryDetailsProps from "@/types/BreweryDetailsProps";
import S from "./Contact.module.scss";
import useModal from "@/hooks/useModal";
import LocationIcon from "@/components/icons/LocationIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import LinkIcon from "@/components/icons/LinkIcon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import ClockIcon from "@/components/icons/ClockIcon";
import ChevronIcon from "@/components/icons/ChevronIcon";
import Modal from "@/components/Modal";
import ModalLink from "@/components/Modal/ModalLink";
import NaverMaps from "../NaverMaps";

interface Props
  extends Pick<
    BreweryDetailsProps,
    | "breweryName"
    | "phone"
    | "websiteType"
    | "websiteUrl"
    | "officeHours"
    | "summarizedOfficeHours"
    | "latitude"
    | "longitude"
  > {
  fullAddress: string;
}

const Contact = ({
  breweryName,
  fullAddress,
  phone,
  websiteType,
  websiteUrl,
  officeHours,
  summarizedOfficeHours,
  latitude,
  longitude,
}: Props) => {
  const phoneNumber = phone.replaceAll("-", "");
  const today = new Date().getDay();
  const day = ["일", "월", "화", "수", "목", "금", "토"][today];
  const operatingHours = officeHours[day];
  const { openTime, closeTime, breakTime, lastOrder } = operatingHours;
  const officeHourModalProps = useModal("office_hour");
  const mapModalProps = useModal("map");

  return (
    <section className={S.main}>
      <ModalLink modalKey={mapModalProps.modalKey}>
        <address className={S.address_box}>
          <LocationIcon />
          <span>{fullAddress}</span>
        </address>
      </ModalLink>
      <NavermapsProvider
        ncpClientId={process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID!}
      >
        <Modal modalProps={mapModalProps}>
          <NaverMaps
            breweryName={breweryName}
            fullAddress={fullAddress}
            latitude={latitude}
            longitude={longitude}
            handleModal={mapModalProps.closeModal}
          />
        </Modal>
      </NavermapsProvider>
      <div className={S.office_hours_box}>
        <ClockIcon />
        <details>
          <summary>
            <p>오늘({day})</p>
            <div className={S.office_hours_inner_box}>
              {openTime !== "closed" ? (
                <time>
                  {openTime} - {closeTime}
                </time>
              ) : (
                <span className={S.closed}>정기 휴무일</span>
              )}
              <div>
                <ChevronIcon />
              </div>
            </div>
          </summary>
          {breakTime && (
            <div className={S.content}>
              <div>브레이크 타임</div>
              <time>
                {breakTime.startTime} - {breakTime.endTime}
              </time>
            </div>
          )}
          {lastOrder && (
            <div className={S.content}>
              <div>라스트 오더</div>
              <time>{lastOrder}</time>
            </div>
          )}
          <div className={S.content}>
            <ModalLink modalKey={officeHourModalProps.modalKey}>
              <span className={S.open_office_hour_text}>
                다른 날 영업 시간 확인
              </span>
            </ModalLink>
            <Modal modalProps={officeHourModalProps}>
              <h3 className={S.summarize_title}>영업 시간 안내</h3>
              {summarizedOfficeHours.map(([days, officeHour, breakTime]) => {
                if (officeHour !== "closed") {
                  return (
                    <div className={S.summarize_hours_box} key={days}>
                      <p>{days}</p>
                      <time>{officeHour}</time>
                      {breakTime !== "none" && (
                        <>
                          <p>브레이크 타임</p>
                          <time>{breakTime}</time>
                        </>
                      )}
                    </div>
                  );
                }
              })}
              {summarizedOfficeHours.map(([days, officeHour]) => {
                if (officeHour === "closed") {
                  return (
                    <div className={S.summarize_hours_box} key={days}>
                      <p>매주 {days}요일은 쉽니다</p>
                    </div>
                  );
                }
              })}
              <button
                className={S.close_button}
                onClick={officeHourModalProps.closeModal}
              >
                닫기
              </button>
            </Modal>
          </div>
        </details>
      </div>
      <div className={S.phone_box}>
        <PhoneIcon />
        <a href={`tel:${phoneNumber}`}>{phone}</a>
      </div>
      <div className={S.site_box}>
        {websiteType === "홈페이지" ? <LinkIcon /> : <InstagramIcon />}
        <a href={websiteUrl} target="_blank">
          {websiteType}
        </a>
      </div>
    </section>
  );
};

export default Contact;
