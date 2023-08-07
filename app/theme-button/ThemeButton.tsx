"use client";

import React, { useEffect, useState } from "react";
import S from "./ThemeButton.module.scss";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";

const ThemeButton = () => {
  const [theme, setTheme] = useState<string>("light");

  const changeTheme = (theme: string) => {
    document.body.setAttribute("data-theme", theme);
  };

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.removeItem("theme");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") ?? "light";
    if (theme !== savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  return (
    <div className={S.main} onClick={handleTheme}>
      <div>{theme && theme === "light" ? <SunIcon /> : <MoonIcon />}</div>
    </div>
  );
};

export default ThemeButton;
