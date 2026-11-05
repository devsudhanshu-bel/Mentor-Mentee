
import React from "react";
import banner from "../../assets/documents.png";

const DocumentsBanner = () => {
  return (
    <div className="hidden w-full sm:block">
      <img
        src={banner}
        alt="Documents Banner"
        className="w-full rounded-xl"
      />
    </div>
  );
};

export default DocumentsBanner;
