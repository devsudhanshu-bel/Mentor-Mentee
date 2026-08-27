import React from "react";
import banner from "../../assets/co-curricular.png";

const CoCurricularBanner = () => {
  return (
    <img
      src={banner}
      alt="Co-Curricular Banner"
      className="w-full h-45 object-cover rounded-xl"
    />
  );
};

export default CoCurricularBanner;