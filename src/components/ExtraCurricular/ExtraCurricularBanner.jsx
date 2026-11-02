
import React from "react";
import banner from "../../assets/extra-curricular.png";

const ExtraCurricularBanner = () => {
  return (
    <div className="hidden w-full min-w-0 md:block">
      <img
        src={banner}
        alt="Extra Curricular Banner"
        className="h-40 w-full rounded-xl object-cover lg:h-44"
      />
    </div>
  );
};

export default ExtraCurricularBanner;
