import React from "react";

interface Props {
  isFilled: boolean;
}

const StarIcon = ({ isFilled }: Props) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5705 1.59385C12.0248 0.135382 13.9752 0.135382 14.4295 1.59385L16.1239 7.03331C16.4539 8.09275 17.4091 8.82977 18.5081 8.82977H23.9911C24.7077 8.82977 25.2262 9.29936 25.4206 9.92362C25.6155 10.5492 25.4619 11.2644 24.8677 11.7147L20.4318 15.0765C19.5559 15.7403 19.199 16.9056 19.5281 17.962L21.2224 23.4015C21.4549 24.1478 21.1652 24.8168 20.6694 25.1926C20.1767 25.566 19.503 25.6372 18.9164 25.1926L14.4805 21.8308C13.5992 21.1629 12.4008 21.1629 11.5195 21.8308L7.08362 25.1926C6.497 25.6372 5.82329 25.566 5.33058 25.1926C4.83476 24.8168 4.54512 24.1478 4.77759 23.4015L6.47194 17.962C6.80102 16.9056 6.44411 15.7403 5.5682 15.0765L1.13234 11.7147C0.538074 11.2644 0.384487 10.5492 0.579352 9.92362C0.773806 9.29936 1.29228 8.82977 2.00886 8.82977H7.49188C8.59093 8.82977 9.54614 8.09275 9.87614 7.03332L11.5705 1.59385Z"
        stroke="var(--color-primary-accent)"
        fill={isFilled ? "var(--color-primary-accent)" : "none"}
      />
    </svg>
  );
};

export default StarIcon;
