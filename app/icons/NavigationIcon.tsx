import React from "react";

const NavigationIcon = () => {
  return (
    <svg
      role="img"
      aria-label="[title + description]"
      width="30px"
      height="30px"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="var(--color-font-primary)"
    >
      <title>길찾기 아이콘</title>
      <desc>네이버 길찾기로 연결합니다.</desc>
      <path
        d="M13.25 19.25l3.5-3.5-3.5-3.5"
        stroke="var(--color-font-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M16.75 15.75h-6a4 4 0 01-4-4v-7"
        stroke="var(--color-font-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

export default NavigationIcon;
