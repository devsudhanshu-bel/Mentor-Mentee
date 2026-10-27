import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  UserRound,
  LogOut,
  LoaderCircle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import profileFallback from "../../assets/profile.jpg";
import { getAdminProfile } from "../../api/profile.api";

const AdminHeader = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);

  const [admin, setAdmin] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // --------------------------------------------------
  // FETCH ADMIN PROFILE
  // GET /api/admin/profile
  // --------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    const loadAdminProfile = async () => {
      try {
        const result = await getAdminProfile();
        const profile = result?.profile;

        if (cancelled) return;

        if (profile && typeof profile === "object") {
          setAdmin(profile);
        }
      } catch (error) {
        console.error(
          "Unable to fetch admin profile:",
          error.response?.data?.message || error.message
        );
      } finally {
        if (!cancelled) {
          setProfileLoading(false);
        }
      }
    };

    loadAdminProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  // --------------------------------------------------
  // CLOSE SEARCH AND PROFILE MENU
  // --------------------------------------------------

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setProfileMenuOpen(false);
        searchRef.current?.blur();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // --------------------------------------------------
  // PROFILE DISPLAY
  // --------------------------------------------------

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const fullName =
    admin?.fullName ||
    admin?.username ||
    admin?.email ||
    storedUser?.fullName ||
    storedUser?.username ||
    "Administrator";

  const designation =
    admin?.designation ||
    (admin?.role === "SYSTEM_ADMIN"
      ? "System Administrator"
      : "Administrator");

  const profileImage =
    admin?.profileImage ||
    profileFallback;

  const initials =
    fullName
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "AD";

  // --------------------------------------------------
  // SEARCH
  // No unverified backend endpoints are called.
  // --------------------------------------------------

  const normalizedQuery = searchTerm.trim();

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!normalizedQuery) return;

    // Keep the search field usable without making requests
    // to nonexistent /admin/students or /admin/meetings routes.
    setSearchOpen(true);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchOpen(false);
    searchRef.current?.focus();
  };

  // --------------------------------------------------
  // NAVIGATION
  // --------------------------------------------------

  const handleProfile = () => {
    setProfileMenuOpen(false);
    navigate("/admin/admin-profile");
  };

  const handleLogout = () => {
    setProfileMenuOpen(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("access_token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");

    navigate("/login", { replace: true });
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-5 lg:px-8">
      {/* SEARCH */}
      <div
        ref={searchContainerRef}
        className="relative min-w-0 flex-1"
      >
        <form
          onSubmit={handleSearchSubmit}
          className="relative max-w-xl"
        >
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            ref={searchRef}
            type="search"
            value={searchTerm}
            placeholder="Search mentors, students, meetings..."
            aria-label="Search mentors, students, and meetings"
            aria-expanded={searchOpen}
            autoComplete="off"
            onFocus={() => setSearchOpen(true)}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setSearchOpen(true);
            }}
            className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={15} />
            </button>
          )}
        </form>

        {searchOpen && normalizedQuery && (
          <div className="absolute left-0 top-full z-50 mt-3 w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-center gap-3">
              <Search size={18} className="text-slate-400" />

              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Search
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Student and meeting search will be available once the
                  corresponding Admin API routes are connected.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NOTIFICATIONS AND PROFILE */}
      <div className="ml-1 flex shrink-0 items-center gap-2 sm:ml-4 sm:gap-4">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          onClick={() => {
            // Connect to the Admin notifications workflow when available.
          }}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 hover:text-blue-600 sm:h-11 sm:w-11"
        >
          <Bell size={20} />
        </button>

        <div className="hidden h-10 w-px bg-slate-200 sm:block" />

        {/* ADMIN PROFILE DROPDOWN */}
        <div className="relative">
          <button
            type="button"
            aria-label="Open admin profile menu"
            aria-expanded={profileMenuOpen}
            onClick={() =>
              setProfileMenuOpen((previous) => !previous)
            }
            className="flex items-center gap-2 rounded-xl px-1.5 py-2 transition hover:bg-slate-100 sm:gap-3 sm:px-2"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-blue-50 text-xs font-semibold text-blue-700 shadow-sm sm:h-11 sm:w-11">
              {profileLoading && !admin ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <img
                  src={profileImage}
                  alt={fullName}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = profileFallback;
                  }}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="hidden min-w-0 text-left sm:block">
              <h3 className="max-w-44 truncate text-sm font-semibold text-slate-800">
                {fullName}
              </h3>

              <p className="max-w-44 truncate text-xs text-slate-500">
                {designation}
              </p>
            </div>

            <ChevronDown
              size={17}
              className={`hidden text-slate-500 transition-transform sm:block ${
                profileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileMenuOpen && (
            <>
              <button
                type="button"
                aria-label="Close profile menu"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setProfileMenuOpen(false)}
              />

              <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {fullName}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {admin?.department || designation}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleProfile}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-blue-600"
                >
                  <UserRound size={17} />
                  My Profile
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;