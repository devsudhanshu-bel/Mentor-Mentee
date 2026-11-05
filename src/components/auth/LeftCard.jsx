import React from "react";

import logo from "../../assets/logo.png";
import illustration from "../../assets/login-illustration.png";

const LeftCard = () => {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-[#F5F9FF]">
      {/* CHRIST logo sits above the title already included in the illustration */}
      <div className="absolute left-4 top-1/2 z-20 -translate-y-1/2 sm:left-6 xl:left-[42px] xl:top-[18px] xl:translate-y-0">
        <img
          src={logo}
          alt="CHRIST University"
          draggable={false}
          className="h-3 w-50 max-w-[150px] select-none object-contain sm:h-11 sm:max-w-[180px] xl:h-[54px] xl:max-w-[172px]"
        />
      </div>

      {/* Illustration includes the page heading and supporting copy */}
      <img
        src={illustration}
        alt="Mentor Mentee Management System"
        draggable={false}
        className="pointer-events-none absolute left-0 top-0 hidden h-auto w-full select-none object-contain object-top xl:block"
      />
    </div>
  );
};

export default LeftCard;
