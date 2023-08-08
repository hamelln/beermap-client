import React from "react";
import LocationIcon from "@/app/icons/LocationIcon";
import S from "./Contact.module.scss";
import PhoneIcon from "@/app/icons/PhoneIcon";
import ClockIcon from "@/app/icons/ClockIcon";

const ContactSkeleton = () => {
  return (
    <section className={S.main}>
      <address className={S.address_box}>
        <LocationIcon />
      </address>
      <div className={S.office_hours_box}>
        <ClockIcon />
        <div>
          <details className={S.details}>
            <summary className={S.summary}>
              <p className={S.today}>오늘</p>
              <div className={S.office_hours_inner_box}></div>
            </summary>
          </details>
        </div>
      </div>
      <div className={S.phone_box}>
        <PhoneIcon />
      </div>
      <div className={S.site_box}></div>
    </section>
  );
};

export default ContactSkeleton;
