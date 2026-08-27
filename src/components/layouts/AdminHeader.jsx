import React from "react";
import {
  Menu,
  Search,
  Bell,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

import profile from "../../assets/profile.jpg";

const AdminHeader = () => {
  //--------------------------------------------------
  // Logged In Admin
  //--------------------------------------------------

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fullName =
    user?.fullName ||
    user?.username ||
    "Dr. Arjun Mehta";

  const designation =
    user?.designation ||
    "Administrator";

  return (
    <header
      className="
        sticky
        top-0
        z-40
        h-20
        bg-white
        border-b
        border-gray-200
        flex
        items-center
        justify-between
        px-8
      "
    >
      {/* ================= Left ================= */}

      <div className="flex items-center gap-6">
        {/* Menu */}

        <button
          className="
            h-11
            w-11
            rounded-xl
            flex
            items-center
            justify-center
            text-slate-700
            hover:bg-slate-100
            transition-all
            duration-300
          "
        >
          <Menu size={22} />
        </button>

        {/* Search */}

        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search mentors, students, departments..."
            className="
              w-[380px]
              h-11
              rounded-full
              border
              border-slate-200
              bg-slate-50
              pl-11
              pr-4
              text-sm
              outline-none
              transition-all
              duration-300
              focus:border-blue-500
              focus:bg-white
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>
      </div>

      {/* ================= Right ================= */}

      <div className="flex items-center gap-4">
        {/* Notifications */}

        <button
          className="
            relative
            h-11
            w-11
            rounded-xl
            flex
            items-center
            justify-center
            hover:bg-slate-100
            transition-all
            duration-300
          "
        >
          <Bell
            size={20}
            className="text-slate-700"
          />

          <span
            className="
              absolute
              top-2
              right-2
              h-4
              w-4
              rounded-full
              bg-blue-600
              text-[10px]
              text-white
              flex
              items-center
              justify-center
            "
          >
            5
          </span>
        </button>

        {/* Calendar */}

        <button
          className="
            h-11
            w-11
            rounded-xl
            flex
            items-center
            justify-center
            hover:bg-slate-100
            transition-all
            duration-300
          "
        >
          <CalendarDays
            size={20}
            className="text-slate-700"
          />
        </button>

        {/* Divider */}

        <div className="h-10 w-px bg-slate-200" />

        {/* Profile */}

        <button
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            px-3
            py-2
            hover:bg-slate-100
            transition-all
            duration-300
          "
        >
          {/* Avatar */}

          <img
            src={profile}
            alt={fullName}
            className="
              h-11
              w-11
              rounded-full
              object-cover
              border-2
              border-white
              shadow-md
            "
          />

          {/* User Details */}

          <div className="text-left">
            <h3 className="text-sm font-semibold text-slate-800">
              {fullName}
            </h3>

            <p className="text-xs text-slate-500">
              {designation}
            </p>
          </div>

          <ChevronDown
            size={18}
            className="text-slate-500"
          />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;