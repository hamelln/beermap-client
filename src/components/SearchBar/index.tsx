import React, { ChangeEvent } from "react";
import S from "./SearchBar.module.scss";
import SearchIcon from "@/components/icons/SearchIcon";

interface Props {
  inputText: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ inputText, handleChange }: Props) => {
  return (
    <div className={S.search_bar_box}>
      <div>
        <SearchIcon />
        <input
          className={S.search_bar_input}
          type="text"
          placeholder="지역이나 가게 이름을 입력해보세요"
          value={inputText}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
