// components/BlobBackground.tsx
import React from "react";

const BlobBackground: React.FC = React.memo(() => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Top-left blob */}
    <svg
      className="absolute top-[-10rem] left-[-10rem] w-[50rem] opacity-40 blur-xl animate-spin-slow"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#06b6d4"
        d="M45.5,-55.3C58.4,-42.9,67.2,-28,69.8,-12.4C72.5,3.3,68.9,19.6,59.4,31.3C49.8,43,34.3,50,18.6,56.7C2.9,63.4,-13,69.7,-25.7,64.6C-38.4,59.6,-47.9,43.2,-56.3,26.3C-64.8,9.5,-72.1,-7.8,-65.2,-20.4C-58.3,-33.1,-37.2,-41,-19.1,-50.7C-1,-60.4,14,-71.8,27.7,-69.4C41.3,-67,53.6,-50.6,45.5,-55.3Z"
        transform="translate(100 100)"
      />
    </svg>

    {/* Bottom-right blob */}
    <svg
      className="absolute bottom-[-12rem] right-[-12rem] w-[40rem] opacity-30 blur-2xl animate-pulse"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#9333ea"
        d="M50.5,-56.3C64.4,-42.6,74.8,-28,74.8,-12.7C74.8,2.6,64.3,18.7,51.3,30.5C38.2,42.3,22.6,49.7,5.3,52.3C-11.9,54.9,-29.9,52.7,-45.1,44.4C-60.2,36.1,-72.4,21.7,-72.4,7.1C-72.4,-7.5,-60.3,-22.3,-47.4,-35.4C-34.5,-48.4,-20.9,-59.6,-5.6,-58.2C9.6,-56.7,19.1,-42.6,50.5,-56.3Z"
        transform="translate(100 100)"
      />
    </svg>
  </div>
));

BlobBackground.displayName = 'BlobBackground';

export default BlobBackground;
