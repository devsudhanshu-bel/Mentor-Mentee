
import React, { useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import logo from "../../assets/logo.png";

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardList,
  User,
  LogOut,
  ChevronRight,
  Megaphone,
  FolderKanban,
  Menu,
  X,
} from "lucide-react";

// ==========================================================
// ADMIN NAVIGATION
// ==========================================================

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
    title: "Students",
    path: "/admin/students",
    icon: GraduationCap,
  },
  {
    title: "Announcements",
    path: "/admin/announcements",
    icon: Megaphone,
  },
  {
    title: "Assignments",
    path: "/admin/assignments",
    icon: ClipboardList,
  },
  {
    title: "Projects",
    path: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Profile",
    path: "/admin/admin-profile",
    icon: User,
  },
];

// ==========================================================
// ADMIN SIDEBAR
// ==========================================================

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState({});

  // ========================================================
  // LOAD USER
  // ========================================================

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("user");

        setUser(
          storedUser ? JSON.parse(storedUser) : {}
        );
      } catch (error) {
        console.error("Failed to load admin details:", error);
        setUser({});
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // ========================================================
  // CLOSE DRAWER ON ROUTE CHANGE
  // ========================================================

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // ========================================================
  // ESCAPE KEY AND BODY SCROLL
  // ========================================================

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [mobileOpen]);

  // ========================================================
  // USER DETAILS
  // ========================================================

  const userName =
    user?.fullName ||
    user?.username ||
    "Administrator";

  const userRole = user?.role || "ADMIN";

  const initial =
    userName.trim().charAt(0).toUpperCase() || "A";

  // ========================================================
  // LOGOUT
  // ========================================================

  const handleLogout = () => {
    setMobileOpen(false);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");

    navigate("/login", {
      replace: true,
    });
  };

  // ========================================================
  // ACTIVE ROUTE HANDLING
  // Preserve existing Admin route logic
  // ========================================================

  const isActiveRoute = (item) => {
    if (item.path === "/admin/mentors") {
      return (
        location.pathname.startsWith("/admin/mentors") ||
        location.pathname.startsWith("/admin/mentor/")
      );
    }

    if (item.path === "/admin/students") {
      return (
        location.pathname === "/admin/students" ||
        location.pathname.startsWith("/admin/students/")
      );
    }

    return (
      location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`)
    );
  };

  // ========================================================
  // LOGO HEADER
  // ========================================================

  const renderLogo = (mobile = false) => (
    <div className="
      relative
      flex h-24 shrink-0
      items-center justify-center
      border-b border-gray-100
      px-6
    ">

      <img
        src={logo}
        alt="CHRIST University"
        draggable={false}
        className="h-16 w-auto object-contain"
      />

      {mobile && (
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation menu"
          className="
            absolute right-3 top-1/2
            flex h-9 w-9
            -translate-y-1/2
            items-center justify-center
            rounded-lg
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-blue-600
          "
        >
          <X size={21} />
        </button>
      )}

    </div>
  );

  // ========================================================
  // NAVIGATION
  // ========================================================

  const renderNavigation = () => (
    <nav className="
      scrollbar-thin
      flex-1
      space-y-1.5
      overflow-y-auto
      px-3 py-4
    ">

      {menuItems.map((item) => {
        const Icon = item.icon;
        const active = isActiveRoute(item);

        return (
          <NavLink
            key={item.title}
            to={item.path}
            onClick={() => setMobileOpen(false)}
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
              <div className="
                absolute
                left-0
                top-1/2
                -translate-y-1/2
                h-8
                w-1
                rounded-r-full
                bg-white
              " />
            )}

            <div className="flex min-w-0 items-center gap-3">

              <div
                className={`
                  h-10
                  w-10
                  shrink-0
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

              <span className="
                text-[13px]
                font-medium
                tracking-wide
                sm:text-[14px]
              ">
                {item.title}
              </span>

            </div>

            <ChevronRight
              size={16}
              className={`
                shrink-0
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
  );

  // ========================================================
  // USER CARD
  // ========================================================

  const renderUserCard = () => (
    <div className="
      border-t
      border-gray-100
      bg-white
      p-3
      shrink-0
    ">

      <div className="
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
      ">

        <div className="flex items-center gap-3">

          <div className="
            h-11
            w-11
            shrink-0
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
          ">
            {initial}
          </div>

          <div className="min-w-0 flex-1">

            <h3 className="
              truncate
              text-[13px]
              font-semibold
              text-gray-900
              sm:text-sm
            ">
              {userName}
            </h3>

            <p className="
              text-[11px]
              capitalize
              text-gray-500
              sm:text-xs
            ">
              {userRole.toLowerCase().replace(/_/g, " ")}
            </p>

          </div>

        </div>

        <div className="my-3 h-px bg-gray-200" />

        <button
          type="button"
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
            text-[13px]
            font-medium
            text-red-600
            transition-all
            duration-300
            hover:bg-red-500
            hover:text-white
            sm:text-sm
          "
        >
          <LogOut size={17} />
          Logout
        </button>

      </div>

      <div className="mt-3 text-center">

        <p className="text-[10px] text-gray-400 sm:text-[11px]">
          Admin Portal
        </p>

        <p className="mt-1 text-[9px] text-gray-300 sm:text-[10px]">
          Version 1.0.0
        </p>

      </div>

    </div>
  );

  // ========================================================
  // SHARED SIDEBAR BODY
  // ========================================================

  const renderSidebarBody = () => (
    <>
      {renderNavigation()}
      {renderUserCard()}
    </>
  );

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <>

      {/* ==================================================
          MOBILE HAMBURGER
      ================================================== */}

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={mobileOpen}
        aria-controls="admin-mobile-sidebar"
        className="
          fixed
          left-4
          top-4
          z-[60]
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-700
          shadow-md
          transition-all
          duration-200
          hover:bg-blue-50
          hover:text-blue-600
          active:scale-95
          lg:hidden
        "
      >
        <Menu size={23} />
      </button>

      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        className={`
          fixed
          inset-0
          z-[70]
          bg-slate-950/50
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          lg:hidden

          ${
            mobileOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }
        `}
      />

      {/* ==================================================
          MOBILE DRAWER
      ================================================== */}

      <aside
        id="admin-mobile-sidebar"
        aria-label="Admin navigation"
        aria-hidden={!mobileOpen}
        className={`
          fixed
          bottom-0
          left-0
          top-0
          z-[80]
          flex
          w-[290px]
          max-w-[85vw]
          flex-col
          overflow-hidden
          border-r
          border-gray-200
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          lg:hidden

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* SINGLE CHRIST LOGO */}

        {renderLogo(true)}

        {/* NAVIGATION AND USER CARD */}

        {renderSidebarBody()}

      </aside>

      {/* ==================================================
          DESKTOP SIDEBAR
      ================================================== */}

      <aside className="
        fixed
        top-0
        left-0
        bottom-0
        hidden
        w-[290px]
        bg-white
        border-r
        border-gray-200
        shadow-xl
        flex-col
        overflow-hidden
        z-50
        lg:flex
      ">

        {renderLogo(false)}

        {renderSidebarBody()}

      </aside>

    </>
  );
};

export default AdminSidebar;
