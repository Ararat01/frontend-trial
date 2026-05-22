import React from "react";

const ArrowIcon = ({ size = 24, color = "#000", rotate = 0 }) => {
  return (
    <svg
      width={size}
      viewBox="0 0 10 6"
      fill="none"
      style={{ transform: `rotate(${rotate}deg)` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L5 5L9 1" stroke={color} stroke-linecap="square" />
    </svg>
  );
};

export default ArrowIcon;
