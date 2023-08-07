"use client";

import React from "react";
import S from "./page.module.scss";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/breweries`);
  };

  return (
    <button className={S.button} onClick={handleClick}>
      브루어리 찾기
    </button>
  );
};

export default Page;
