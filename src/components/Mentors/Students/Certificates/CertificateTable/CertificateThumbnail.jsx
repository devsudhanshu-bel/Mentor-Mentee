import React from "react";

import certificate1 from "./../../../../../assets/certificate1.jpg";
import certificate2 from "./../../../../../assets/certificate2.jpg";
import certificate3 from "./../../../../../assets/certificate3.jpg";
import certificate4 from "./../../../../../assets/certificate4.jpg";
import certificate5 from "./../../../../../assets/certificate5.png";

const thumbnails = {
  certificate1: certificate1,
  certificate2: certificate2,
  certificate3: certificate3,
  certificate4: certificate4,
  certificate5: certificate5,
};

const CertificateThumbnail = ({ image }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <img
        src={thumbnails[image]}
        alt="Certificate"
        className="h-12 w-20 object-cover transition-transform duration-200 hover:scale-105"
      />
    </div>
  );
};

export default CertificateThumbnail;