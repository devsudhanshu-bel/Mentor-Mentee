import React from "react";
import researchBanner from "../../assets/research.png";

const ResearchBanner = () => {
  return (
    <img
      src={researchBanner}
      alt="Research Banner"
      className="w-full h-45 object-cover rounded-xl"
    />
  );
};

export default ResearchBanner;