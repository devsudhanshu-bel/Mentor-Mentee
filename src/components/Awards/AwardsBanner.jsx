
import React from "react";
import banner from "../../assets/awards.png";

const AwardsBanner = () => {
  return (
    <div className="hidden w-full min-w-0 md:block">
      <img
        src={banner}
        alt="Awards & Achievements Banner"
        className="h-40 w-full rounded-xl object-cover lg:h-44"
      />
    </div>
  );
};

export default AwardsBanner;
