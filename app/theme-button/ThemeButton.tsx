"use client";

import React, { useLayoutEffect, useState } from "react";
import S from "./ThemeButton.module.scss";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";

const ThemeButton = () => {
  const [theme, setTheme] = useState<string>("");

  const changeTheme = (theme: string) => {
    document.body.setAttribute("data-theme", theme);
  };

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      changeTheme("dark");
    } else {
      setTheme("light");
      localStorage.removeItem("theme");
      changeTheme("light");
    }
  };

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme") ?? "light";
    changeTheme(savedTheme);
  }, []);

  return (
    <div className={S.main} onClick={handleTheme}>
      <div>{theme && theme === "light" ? <SunIcon /> : <MoonIcon />}</div>
    </div>
  );
};

export default ThemeButton;
