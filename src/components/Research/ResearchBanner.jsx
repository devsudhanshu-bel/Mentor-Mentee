
import React from "react";
import researchBanner from "../../assets/research.png";

const ResearchBanner = () => {
  return (
    <img
      src={researchBanner}
      alt="Research Banner"
      className="hidden h-auto max-h-[220px] w-full rounded-xl object-cover sm:block lg:max-h-[260px] lg:rounded-2xl"
    />
  );
};

export default ResearchBanner;
