import React from "react";
import S from "./Contact.module.scss";
import OfficeHours from "@/types/OfficeHours";
import ChevronIcon from "@/app/icons/ChevronIcon";
import ClockIcon from "@/app/icons/ClockIcon";
import AllDayOfficeHours from "./AllDayOfficeHours";

interface Props {
  officeHours: OfficeHours;
  summarizedOfficeHours: string[][];
}

const OfficeHours = ({ officeHours, summarizedOfficeHours }: Props) => {
  const today = new Date().getDay();
  const day = ["일", "월", "화", "수", "목", "금", "토"][today];
  const operatingHours = officeHours[day as keyof OfficeHours];
  const { openTime, closeTime, breakTime, lastOrder } = operatingHours;

  return (
    <div className={S.office_hours_box}>
      <ClockIcon />
      <div>
        <details className={S.details}>
          <summary className={S.summary}>
            <p className={S.today}>오늘({day})</p>
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
            <AllDayOfficeHours summarizedOfficeHours={summarizedOfficeHours} />
          </div>
        </details>
      </div>
    </div>
  );
};

export default OfficeHours;
