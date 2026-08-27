import React from "react";
import { Pencil, Camera } from "lucide-react";

import profile from "../../assets/profile.jpg";

const ProfileSettingsCard = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3">

      {/* Header */}
      <div className="flex items-start justify-between mb-3">

        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Profile Settings
          </h2>

          <p className="text-[11px] text-slate-500 mt-0.5">
            Manage your personal information and profile details.
          </p>
        </div>

        <button className="flex items-center gap-1.5 border border-slate-200 rounded-md px-2.5 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50 transition">
          <Pencil size={12} />
          Edit Profile
        </button>

      </div>

      {/* Body */}
      <div className="grid grid-cols-12 gap-4">

        {/* Profile */}
        <div className="col-span-3 flex justify-center">

          <div className="relative w-fit">

            <img
              src={profile}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border border-slate-200"
            />

            {/* Camera Button */}
            <button
              className="
                absolute
                bottom-1
                right-1
                w-8
                h-8
                rounded-full
                bg-slate-700
                hover:bg-slate-800
                text-white
                flex
                items-center
                justify-center
                border-2
                border-white
                shadow-md
                transition
              "
            >
              <Camera size={14} />
            </button>

          </div>

        </div>

        {/* Details */}
        <div className="col-span-9">

          <div className="grid grid-cols-2 gap-x-6 gap-y-3">

            <div>
              <p className="text-[10px] text-slate-500">
                Full Name
              </p>

              <h4 className="text-sm font-semibold text-slate-800 mt-0.5">
                Admin User
              </h4>
            </div>

            <div>
              <p className="text-[10px] text-slate-500">
                Register Number
              </p>

              <h4 className="text-sm font-semibold text-slate-800 mt-0.5">
                2362177
              </h4>
            </div>

            <div>
              <p className="text-[10px] text-slate-500">
                Email
              </p>

              <h4 className="text-xs font-medium text-slate-800 break-all mt-0.5">
                admin@christuniversity.in
              </h4>
            </div>

            <div>
              <p className="text-[10px] text-slate-500">
                Department
              </p>

              <h4 className="text-xs font-medium text-slate-800 mt-0.5 leading-5">
                Computer Science and Engineering
              </h4>
            </div>

            <div>
              <p className="text-[10px] text-slate-500">
                Phone Number
              </p>

              <h4 className="text-xs font-medium text-slate-800 mt-0.5">
                +91 98765 43210
              </h4>
            </div>

            <div>
              <p className="text-[10px] text-slate-500">
                Class &amp; Section
              </p>

              <h4 className="text-xs font-medium text-slate-800 mt-0.5">
                7 BTCS AIML A
              </h4>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfileSettingsCard;