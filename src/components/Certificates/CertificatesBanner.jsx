import React from "react";
import banner from "../../assets/certificates.png";

const CertificatesBanner = () => {
  return (
    <div className="hidden w-full sm:block">
      <img
        src={banner}
        alt="Certificates Banner"
        className="h-auto w-full rounded-xl"
      />
    </div>
  );
};

export default CertificatesBanner;
