import React from "react";
import banner from "../../assets/settings.png";

const SettingsBanner = () => {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <img
        src={banner}
        alt="Settings Banner"
        className="w-full h-44 object-cover object-center"
      />
    </div>
  );
};

export default SettingsBanner;