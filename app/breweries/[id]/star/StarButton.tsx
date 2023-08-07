"use client";

import React, { useState } from "react";
import StarIcon from "../../../icons/StarIcon";

const StarButton = () => {
  const [isStarFilled, setIsStarFilled] = useState(false);

  const handleButtonClick = () => {
    setIsStarFilled(!isStarFilled);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        <StarIcon isFilled={isStarFilled} />
      </button>
    </div>
  );
};

export default StarButton;
