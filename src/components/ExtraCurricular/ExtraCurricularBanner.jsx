import React from "react";
import banner from "../../assets/extra-curricular.png";

const ExtraCurricularBanner = () => {
  return (
    <div className="w-full">
      <img
        src={banner}
        alt="Extra Curricular Banner"
        className="w-full h-44 object-cover rounded-xl"
      />
    </div>
  );
};

export default ExtraCurricularBanner;