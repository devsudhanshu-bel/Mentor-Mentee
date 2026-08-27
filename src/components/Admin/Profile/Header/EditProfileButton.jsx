import React from "react";
import { Pencil } from "lucide-react";

const EditProfileButton = () => {
  return (
    <button
      className="
        flex items-center gap-2
        border border-blue-600
        text-blue-600
        text-sm
        font-medium
        px-5 py-2.5
        rounded-xl
        transition-all
        duration-200
        hover:bg-blue-600
        hover:text-white
      "
    >
      <Pencil size={16} />
      Edit Profile
    </button>
  );
};

export default EditProfileButton;