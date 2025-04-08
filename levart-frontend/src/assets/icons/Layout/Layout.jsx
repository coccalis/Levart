import React from "react";

export const LayoutOne = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2186 1243" // Keeps aspect ratio intact
    fill="currentColor"
    {...props} // Allows passing additional props like className, width, height
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 0C6.71573 0 0 6.71573 0 15V879C0 887.284 6.71577 894 15 894H196C196 851.3 212.962 810.349 243.156 780.156C273.349 749.962 314.3 733 357 733C399.7 733 440.651 749.962 470.844 780.156C501.038 810.349 518 851.3 518 894H2171C2179.28 894 2186 887.284 2186 879V15C2186 6.71573 2179.28 0 2171 0H15ZM496.199 894C496.199 857.082 481.533 821.677 455.428 795.572C429.324 769.467 393.918 754.801 357 754.801C320.082 754.801 284.677 769.467 258.572 795.572C232.467 821.677 217.801 857.082 217.801 894H496.199Z"
    />
    <rect x="220" y="1084" width="287" height="46" rx="15" />
    <rect x="1899" y="971" width="287" height="46" rx="15" />
    <rect x="1559" y="971" width="287" height="46" rx="15" />
    <rect x="220" y="1197" width="767" height="46" rx="15" />
    <circle cx="357" cy="899" r="150" />
  </svg>
);
export const LayoutTwo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2186 1243" // Keeps aspect ratio intact
    fill="currentColor"
    stroke="currentColor"
    {...props}
  >
    <circle cx="268" cy="179" r="100" />
    <mask id="path-2-inside-1_434_143" fill="white">
      <rect width="536" height="894" rx="15" />
    </mask>
    <rect
      width="536"
      height="894"
      rx="15"
      fill="transparent"
      strokeWidth="52"
      mask="url(#path-2-inside-1_434_143)"
    />
    <rect x="124" y="318" width="287" height="46" rx="15" />
    <rect x="124" y="401" width="287" height="46" rx="15" />
    <rect x="124" y="484" width="287" height="46" rx="15" />
    <rect x="124" y="691" width="287" height="46" rx="15" />
    <rect x="595" width="1635" height="894" rx="15" />
  </svg>
);
