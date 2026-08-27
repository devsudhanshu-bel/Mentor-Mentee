import React from "react";

import logo from "../../assets/logo.png";
import illustration from "../../assets/login-illustration.png";

const LeftCard = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F5F9FF]">
      {/* Logo */}

      <div className="absolute top-5 left-8 z-20">
        <img
          src={logo}
          alt="CHRIST University"
          className="h-16 w-auto object-contain select-none"
          draggable={false}
        />
      </div>

      {/* Illustration */}

      <img
        src={illustration}
        alt="Mentor Mentee Illustration"
        draggable={false}
        className="
          absolute
          left-0
          top-0
          w-full
          h-auto
          translate-y-2
          object-contain
          object-top
          select-none
          pointer-events-none
        "
      />
    </div>
  );
};

export default LeftCard;