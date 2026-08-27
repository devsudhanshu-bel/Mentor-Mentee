import React from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import logo from "../../assets/logo.png";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Mentors",
    path: "/admin/mentors",
    icon: Users,
  },
  {
    title: "Assignments",
    path: "/admin/assignments",
    icon: ClipboardList,
  },
  {
    title: "Profile",
    path: "/admin/admin-profile",
    icon: User,
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //--------------------------------------------------
  // Logged In User
  //--------------------------------------------------

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const userName =
    user?.fullName ||
    user?.username ||
    "Administrator";

  const userRole =
    user?.role ||
    "ADMIN";

  const initial = userName.charAt(0).toUpperCase();

  //--------------------------------------------------
  // Logout
  //--------------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <aside
      className="
        fixed
        top-0
        left-0
        bottom-0
        w-[290px]
        bg-white
        border-r
        border-gray-200
        shadow-xl
        flex
        flex-col
        overflow-hidden
        z-50
      "
    >
      {/* ================= Header ================= */}

      <div className="flex flex-col flex-1 overflow-hidden">
        <div
          className="
            h-24
            px-6
            flex
            items-center
            justify-center
            border-b
            border-gray-100
            shrink-0
          "
        >
          <img
            src={logo}
            alt="CHRIST University"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* ================= Navigation ================= */}

        <nav
          className="
            flex-1
            overflow-y-auto
            px-3
            py-4
            space-y-1.5
            scrollbar-thin
          "
        >
          {menuItems.map((item) => {
            const Icon = item.icon;

            // ==========================================
            // Active Route
            // ==========================================

            const active =
              item.path === "/admin/mentors"
                ? location.pathname.startsWith("/admin/mentors") ||
                  location.pathname.startsWith("/admin/mentor/") 
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={`
                  group
                  relative
                  flex
                  items-center
                  justify-between
                  rounded-[18px]
                  px-4
                  py-3
                  transition-all
                  duration-300
                  hover:translate-x-1
                  ${
                    active
                      ? "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200"
                      : "text-gray-600 hover:bg-slate-100"
                  }
                `}
              >
                {active && (
                  <div
                    className="
                      absolute
                      left-0
                      top-1/2
                      -translate-y-1/2
                      h-8
                      w-1
                      rounded-r-full
                      bg-white
                    "
                  />
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`
                      h-10
                      w-10
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      group-hover:scale-110
                      ${
                        active
                          ? "bg-white/20"
                          : "group-hover:bg-white group-hover:shadow-md"
                      }
                    `}
                  >
                    <Icon
                      size={19}
                      strokeWidth={2}
                    />
                  </div>

                  <span className="text-[14px] font-medium tracking-wide">
                    {item.title}
                  </span>
                </div>

                <ChevronRight
                  size={16}
                  className={`
                    transition-all
                    duration-300
                    ${
                      active
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-60 group-hover:translate-x-1"
                    }
                  `}
                />
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* ================= User Card ================= */}

      <div
        className="
          border-t
          border-gray-100
          bg-white
          p-3
          shrink-0
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-gradient-to-br
            from-white
            to-slate-50
            p-3
            transition-all
            duration-300
            hover:shadow-lg
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                h-11
                w-11
                rounded-xl
                bg-gradient-to-br
                from-blue-600
                via-blue-500
                to-indigo-600
                flex
                items-center
                justify-center
                text-white
                font-semibold
                shadow-md
              "
            >
              {initial}
            </div>

            <div className="flex-1 overflow-hidden">
              <h3 className="truncate text-sm font-semibold text-gray-900">
                {userName}
              </h3>

              <p className="text-xs capitalize text-gray-500">
                {userRole.toLowerCase()}
              </p>
            </div>
          </div>

          <div className="my-3 h-px bg-gray-200" />

          <button
            onClick={handleLogout}
            className="
              flex
              h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-red-50
              text-sm
              font-medium
              text-red-600
              transition-all
              duration-300
              hover:bg-red-500
              hover:text-white
            "
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>

        <div className="mt-3 text-center">
          <p className="text-[11px] text-gray-400">
            Admin Portal
          </p>

          <p className="mt-1 text-[10px] text-gray-300">
            Version 1.0.0
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;