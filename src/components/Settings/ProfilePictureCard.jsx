import React from "react";
import {
  Camera,
  Trash2,
} from "lucide-react";

import profile from "../../assets/profile.jpg";

const ProfilePictureCard = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 min-h-[510px]">

      {/* Header */}
      <div className="mb-5">

        <h2 className="text-base font-semibold text-slate-800">
          Profile Picture
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Upload a new profile picture.
        </p>

      </div>

      {/* Profile Image */}
      <div className="flex justify-center mb-6">

        <div className="relative">

          <img
            src={profile}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border border-slate-200"
          />

          <button
            className="
              absolute
              bottom-1
              right-1
              w-8
              h-8
              rounded-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              flex
              items-center
              justify-center
              border-2
              border-white
              shadow
              transition
            "
          >
            <Camera size={14} />
          </button>

        </div>

      </div>

      {/* Upload */}
      <button
        className="
          w-full
          h-10
          rounded-lg
          bg-blue-600
          hover:bg-blue-700
          text-white
          text-sm
          font-medium
          transition
        "
      >
        Upload New Photo
      </button>

      {/* Remove */}
      <button
        className="
          w-full
          h-10
          mt-3
          rounded-lg
          border
          border-red-200
          text-red-600
          text-sm
          font-medium
          hover:bg-red-50
          transition
          flex
          items-center
          justify-center
          gap-2
        "
      >
        <Trash2 size={15} />
        Remove Photo
      </button>

      {/* Info */}
      <p className="text-[11px] text-center text-slate-400 mt-4 leading-5">
        JPG, PNG or GIF
        <br />
        Maximum file size 5 MB
      </p>

    </div>
  );
};

export default ProfilePictureCard;