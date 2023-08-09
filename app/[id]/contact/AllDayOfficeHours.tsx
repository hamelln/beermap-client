"use client";

import React, { ReactElement, useEffect, useRef, useState } from "react";
import S from "./Contact.module.scss";
import useModal from "@/utils/useModal";

interface Props {
  summarizedOfficeHours: string[][];
}

const AllDayOfficeHours = ({ summarizedOfficeHours }: Props) => {
  const { modalRef, openModal, closeModal, handleCloseModal } = useModal();
  const createHourBox = (
    days: string,
    officeHour: string,
    breakTime: string
  ) => {
    if (officeHour === "closed") {
      return (
        <div className={S.summarize_hour_box} key={days}>
          <span className={S.summarize_closed}>매주 {days}요일은 쉽니다</span>
        </div>
      );
    }
    if (breakTime === "none") {
      return (
        <div className={S.summarize_hour_box} key={days}>
          <p className={S.summarize_subtitle}>{days}</p>
          <time>{officeHour}</time>
        </div>
      );
    }
    return (
      <div className={S.summarize_hour_box} key={days}>
        <p className={S.summarize_subtitle}>{days}</p>
        <time>{officeHour}</time>
        <p className={S.summarize_subtitle}>브레이크 타임</p>
        <time>{breakTime}</time>
      </div>
    );
  };
  const temp: { openDays: ReactElement[]; closed: ReactElement } = {
    openDays: [],
    closed: <></>,
  };

  const officeHours = summarizedOfficeHours.reduce(
    (acc, summarizedOfficeHour) => {
      const [days, officeHour, breakTime] = summarizedOfficeHour;
      if (officeHour === "closed") {
        acc.closed = createHourBox(days, officeHour, breakTime);
      } else {
        acc.openDays.push(createHourBox(days, officeHour, breakTime));
      }
      return acc;
    },
    temp
  );

  return (
    <main className={S.modal_box}>
      <button onClick={openModal}>다른 날 영업 시간 확인</button>
      <dialog className={S.modal} ref={modalRef} onClose={handleCloseModal}>
        <h3 className={S.summarize_title}>영업 시간 안내</h3>
        {officeHours.openDays}
        {officeHours.closed}
        <div className={S.summarize_hour_box} onClick={closeModal}>
          <p className={S.summarize_close}>닫기</p>
        </div>
      </dialog>
    </main>
  );
};

export default AllDayOfficeHours;
