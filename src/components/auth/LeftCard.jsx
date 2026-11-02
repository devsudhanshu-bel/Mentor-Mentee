
import React from "react";

import logo from "../../assets/logo.png";
import illustration from "../../assets/login-illustration.png";

const LeftCard = () => {
  return (
    <div className="
      relative h-full w-full
      min-h-[110px]
      overflow-hidden
      bg-[#F5F9FF]
      sm:min-h-[130px]
      xl:min-h-0
    ">

      {/* CHRIST UNIVERSITY LOGO */}

      <div className="
        absolute left-5 top-1/2
        z-20 -translate-y-1/2
        sm:left-8
        xl:left-8 xl:top-5
        xl:translate-y-0
      ">

        <img
          src={logo}
          alt="CHRIST University"
          draggable={false}
          className="
            h-12 w-auto
            select-none object-contain
            sm:h-14
            xl:h-16
          "
        />

      </div>

      {/* MENTORING ILLUSTRATION */}

      <img
        src={illustration}
        alt="Mentor Mentee Illustration"
        draggable={false}
        className="
          pointer-events-none
          absolute left-0 top-0
          hidden h-auto w-full
          translate-y-2
          select-none
          object-contain object-top
          xl:block
        "
      />

    </div>
  );
};

export default LeftCard;
