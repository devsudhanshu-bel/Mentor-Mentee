import React from "react";
import banner from "../../assets/certificates.png";

const CertificatesBanner = () => {
  return (
    <div className="w-full">
      <img
        src={banner}
        alt="Certificates Banner"
        className="w-full h-auto rounded-xl"
      />
    </div>
  );
};

export default CertificatesBanner;