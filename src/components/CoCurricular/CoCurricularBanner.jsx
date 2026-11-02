
import React from "react";
import banner from "../../assets/co-curricular.png";

const CoCurricularBanner = () => {
  return (
    <img
      src={banner}
      alt="Co-Curricular Banner"
      className="hidden h-auto max-h-[220px] w-full rounded-xl object-cover sm:block lg:max-h-[260px] lg:rounded-2xl"
    />
  );
};

export default CoCurricularBanner;
