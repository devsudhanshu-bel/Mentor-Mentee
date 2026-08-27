import React from "react";
import banner from "../../assets/awards.png";

const AwardsBanner = () => {
  return (
    <div className="w-full">
      <img
        src={banner}
        alt="Awards & Achievements Banner"
        className="w-full h-44 object-cover rounded-xl"
      />
    </div>
  );
};

export default AwardsBanner;