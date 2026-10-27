import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Search,
  Bell,
  ChevronDown,
  UserRound,
  LogOut,
  GraduationCap,
  CalendarDays,
  ClipboardCheck,
  Briefcase,
  Microscope,
  Trophy,
  Star,
  Award,
  BadgeCheck,
  FileText,
  LayoutDashboard,
  LoaderCircle,
  X,
  ArrowUpRight,
  FolderOpen,
} from "lucide-react";

import defaultProfile from "../../assets/profile.jpg";
import api from "../../api/axios";
import FontSizeSettings from "../common/FontSizeSettings";
import { logout } from "../../api/auth.api";
import { getDocumentsDashboard } from "../../api/document.api";

// ==========================================================
// STUDENT NAVIGATION
// ==========================================================

const menuItems = [
  {
    title: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
    keywords: "home overview summary",
  },
  {
    title: "Profile",
    path: "/student/profile",
    icon: UserRound,
    keywords: "personal information details account",
  },
  {
    title: "Academics",
    path: "/student/academics",
    icon: GraduationCap,
    keywords: "academic marks grades cgpa semester subjects",
  },
  {
    title: "Attendance",
    path: "/student/attendance",
    icon: ClipboardCheck,
    keywords: "attendance absent present classes",
  },
  {
    title: "Mentor & Meetings",
    path: "/student/mentor-meetings",
    icon: CalendarDays,
    keywords: "mentor teacher meetings appointment schedule",
  },
  {
    title: "Internships",
    path: "/student/internships",
    icon: Briefcase,
    keywords: "internship company employment offer experience",
  },
  {
    title: "Research",
    path: "/student/research",
    icon: Microscope,
    keywords: "research paper publication journal project",
  },
  {
    title: "Co-Curricular",
    path: "/student/co-curricular",
    icon: Trophy,
    keywords: "co curricular activities participation",
  },
  {
    title: "Extra Curricular",
    path: "/student/extra-curricular",
    icon: Star,
    keywords: "extra curricular events clubs activities",
  },
  {
    title: "Awards & Achievements",
    path: "/student/awards",
    icon: Award,
    keywords: "awards achievements prizes recognition",
  },
  {
    title: "Certificates",
    path: "/student/certificates",
    icon: BadgeCheck,
    keywords: "certificate certification credentials",
  },
  {
    title: "Documents",
    path: "/student/documents",
    icon: FileText,
    keywords: "documents files uploads pdf attachments",
  },
];

// ==========================================================
// HELPERS
// ==========================================================

const normalize = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .trim();

const formatRole = (role) => {
  if (!role || typeof role !== "string") {
    return "Student";
  }

  return role
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

const getFullName = (data, depth = 0) => {
  if (!data || typeof data !== "object" || depth > 5) {
    return "";
  }

  if (
    typeof data.fullName === "string" &&
    data.fullName.trim()
  ) {
    return data.fullName.trim();
  }

  const nestedKeys = [
    "data",
    "student",
    "profile",
    "studentProfile",
    "students",
    "user",
    "account",
    "result",
  ];

  for (const key of nestedKeys) {
    const result = getFullName(data[key], depth + 1);

    if (result) return result;
  }

  return "";
};

const getProfileImage = (data) =>
  data?.profileImage ||
  data?.profilePicture ||
  data?.student?.profileImage ||
  data?.profile?.profileImage ||
  "";

const getDocumentCategory = (document) =>
  document?.category || document?.documentCategory || "";

const getDocumentRoute = (document) => {
  const category = normalize(getDocumentCategory(document));

  const categoryRoutes = {
    certificates: "/student/certificates",
    awards: "/student/awards",
    "awards achievements": "/student/awards",
    research: "/student/research",
    "co curricular": "/student/co-curricular",
    "extra curricular": "/student/extra-curricular",
    internships: "/student/internships",
    academics: "/student/academics",
    personal: "/student/documents",
    other: "/student/documents",
  };

  return categoryRoutes[category] || "/student/documents";
};

const getInitials = (name) => {
  if (!name || name === "Student") return "S";

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
};

// ==========================================================
// RESPONSE NORMALIZATION
// ==========================================================

const unwrapResponse = (response) =>
  response?.data?.data ?? response?.data ?? response ?? null;

// ==========================================================
// HEADER
// ==========================================================

const Header = () => {
  const navigate = useNavigate();

  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);

  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [documents, setDocuments] = useState([]);

  // ========================================================
  // LOAD STUDENT PROFILE
  // ========================================================

  const loadStudentProfile = useCallback(async (showLoading = false) => {
    if (showLoading) {
      setProfileLoading(true);
    }

    try {
      let storedUser = {};

      try {
        storedUser = JSON.parse(
          localStorage.getItem("user") || "{}"
        );
      } catch (error) {
        console.error("Unable to read stored user:", error);
      }

      // Display cached information immediately.
      setUser((previous) => ({
        ...storedUser,
        ...(previous || {}),
      }));

      // Fetch the authoritative personal profile.
      try {
        const response = await api.get(
          "/mentee/profile/personal/"
        );

        const payload = unwrapResponse(response);

        if (payload && typeof payload === "object") {
          const profileData =
            payload.student ||
            payload.profile ||
            payload;

          const updatedUser = {
            ...storedUser,
            ...profileData,
            fullName:
              profileData.fullName ||
              storedUser.fullName ||
              "",
            profileImage:
              profileData.profileImage ??
              storedUser.profileImage ??
              null,
          };

          setUser(updatedUser);

          localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
          );

          return;
        }
      } catch (error) {
        if (
          error.response?.status !== 404 &&
          error.response?.status !== 405
        ) {
          console.warn(
            "Unable to fetch personal profile:",
            error.response?.data?.message || error.message
          );
        }
      }

      // Fallback endpoints for deployments where profile details
      // are provided by a dashboard endpoint.
      const endpoints = [
        "/mentee/profile",
        "/mentee/dashboard",
        "/mentee/dashboard/banner",
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await api.get(endpoint);
          const payload = unwrapResponse(response);
          const fullName = getFullName(payload);

          if (!fullName) continue;

          const updatedUser = {
            ...storedUser,
            fullName,
            profileImage:
              getProfileImage(payload) ||
              getProfileImage(storedUser) ||
              null,
          };

          setUser(updatedUser);

          localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
          );

          break;
        } catch (error) {
          if (
            error.response?.status !== 404 &&
            error.response?.status !== 405
          ) {
            console.warn(
              `Profile request failed for ${endpoint}:`,
              error.response?.data?.message || error.message
            );
          }
        }
      }
    } finally {
      if (showLoading) {
        setProfileLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    let active = true;

    const initializeProfile = async () => {
      try {
        await loadStudentProfile(true);
      } catch (error) {
        console.error("Unable to load student profile:", error);
      } finally {
        if (active) {
          setProfileLoading(false);
        }
      }
    };

    initializeProfile();

    const handleProfileUpdated = (event) => {
      const updatedImage = event?.detail?.profileImage;

      // Reflect the new avatar immediately without waiting for a request.
      if (updatedImage !== undefined) {
        setUser((previous) => {
          const nextUser = {
            ...(previous || {}),
            profileImage: updatedImage || null,
          };

          try {
            const storedUser = JSON.parse(
              localStorage.getItem("user") || "{}"
            );

            localStorage.setItem(
              "user",
              JSON.stringify({
                ...storedUser,
                ...nextUser,
              })
            );
          } catch (error) {
            console.warn(
              "Unable to update cached profile image:",
              error
            );
          }

          return nextUser;
        });
      }

      // Refresh from the backend so the saved profile remains authoritative.
      loadStudentProfile(false).catch((error) => {
        console.error("Unable to refresh student profile:", error);
      });
    };

    window.addEventListener(
      "student-profile-updated",
      handleProfileUpdated
    );

    return () => {
      active = false;

      window.removeEventListener(
        "student-profile-updated",
        handleProfileUpdated
      );
    };
  }, [loadStudentProfile]);

  // ========================================================
  // LOAD DOCUMENTS
  // ========================================================

  const loadDocuments = useCallback(async () => {
    setSearchLoading(true);
    setSearchError("");

    try {
      const result = await getDocumentsDashboard();
      const payload = result?.data ?? result;

      const documentList = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.documents)
          ? payload.documents
          : Array.isArray(payload?.data?.documents)
            ? payload.data.documents
            : [];

      setDocuments(documentList);
    } catch (error) {
      console.error("Unable to load documents:", error);

      setSearchError(
        error.response?.data?.message ||
          "Unable to load your documents. Please try again."
      );
    } finally {
      setSearchLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  // ========================================================
  // SEARCH DISMISSAL
  // ========================================================

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
        searchRef.current?.blur();
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // ========================================================
  // PROFILE DISPLAY
  // ========================================================

  const displayName =
    getFullName(user) ||
    (profileLoading ? "Loading profile..." : "Student");

  const displayRole = formatRole(user?.role);

  const profileImage = getProfileImage(user) || defaultProfile;

  // ========================================================
  // SEARCH RESULTS
  // ========================================================

  const normalizedQuery = normalize(searchTerm);

  const filteredPages = useMemo(() => {
    if (!normalizedQuery) return [];

    return menuItems
      .filter((item) =>
        normalize(
          `${item.title} ${item.keywords} ${item.path}`
        ).includes(normalizedQuery)
      )
      .slice(0, 5);
  }, [normalizedQuery]);

  const filteredDocuments = useMemo(() => {
    if (!normalizedQuery) return [];

    return documents
      .filter((document) => {
        const searchableText = normalize(
          [
            document.documentName,
            document.fileName,
            document.description,
            document.category,
            document.fileType,
          ]
            .filter(Boolean)
            .join(" ")
        );

        return searchableText.includes(normalizedQuery);
      })
      .slice(0, 6);
  }, [documents, normalizedQuery]);

  const hasResults =
    filteredPages.length > 0 ||
    filteredDocuments.length > 0;

  // ========================================================
  // SEARCH NAVIGATION
  // ========================================================

  const handlePageSelect = (path) => {
    setSearchOpen(false);
    setSearchTerm("");
    navigate(path);
  };

  const handleDocumentSelect = (document) => {
    setSearchOpen(false);
    setSearchTerm("");

    navigate(getDocumentRoute(document), {
      state: {
        selectedDocumentId: document.id,
      },
    });
  };

  const handleProfile = () => {
    setProfileOpen(false);
    navigate("/student/profile");
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchError("");
    setSearchOpen(true);
    searchRef.current?.focus();
  };

  // ========================================================
  // SIGN OUT
  // ========================================================

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setProfileOpen(false);

    try {
      await logout();
    } catch (error) {
      console.error(
        "Logout request failed:",
        error.response?.data?.message || error.message
      );
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userRole");
      localStorage.removeItem("isAuthenticated");

      sessionStorage.clear();

      setUser(null);
      setLoggingOut(false);

      navigate("/login", {
        replace: true,
      });
    }
  };

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-5 lg:px-8">
      {/* SEARCH */}

      <div
        ref={searchContainerRef}
        className="relative min-w-0 flex-1"
      >
        <div className="relative max-w-xl">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            ref={searchRef}
            type="search"
            value={searchTerm}
            placeholder="Search pages, certificates, documents..."
            aria-label="Search student pages and documents"
            aria-expanded={searchOpen}
            aria-controls="student-header-search-results"
            autoComplete="off"
            onFocus={() => setSearchOpen(true)}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setSearchOpen(true);
              setSearchError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (filteredDocuments.length === 1) {
                  handleDocumentSelect(filteredDocuments[0]);
                } else if (filteredPages.length === 1) {
                  handlePageSelect(filteredPages[0].path);
                }
              }
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
        </div>

        {/* SEARCH DROPDOWN */}

        {searchOpen && normalizedQuery && (
          <div
            id="student-header-search-results"
            className="absolute left-0 top-full z-50 mt-3 max-h-[min(72vh,560px)] w-full min-w-[300px] max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70"
          >
            <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3">
              <p className="text-xs font-semibold text-slate-700">
                Search results
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Pages and your uploaded documents
              </p>
            </div>

            {searchLoading ? (
              <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-slate-500">
                <LoaderCircle
                  size={17}
                  className="animate-spin text-blue-600"
                />
                Loading your documents...
              </div>
            ) : (
              <>
                {filteredPages.length > 0 && (
                  <section className="p-2">
                    <div className="flex items-center gap-2 px-3 py-2">
                      <LayoutDashboard
                        size={15}
                        className="text-blue-600"
                      />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Pages
                      </p>
                    </div>

                    {filteredPages.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.path}
                          type="button"
                          onClick={() =>
                            handlePageSelect(item.path)
                          }
                          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-blue-50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                            <Icon size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-800 group-hover:text-blue-700">
                              {item.title}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              Open page
                            </p>
                          </div>

                          <ArrowUpRight
                            size={16}
                            className="shrink-0 text-slate-300 transition group-hover:text-blue-600"
                          />
                        </button>
                      );
                    })}
                  </section>
                )}

                {filteredDocuments.length > 0 && (
                  <section
                    className={
                      filteredPages.length > 0
                        ? "border-t border-slate-100 p-2"
                        : "p-2"
                    }
                  >
                    <div className="flex items-center gap-2 px-3 py-2">
                      <FolderOpen
                        size={15}
                        className="text-violet-600"
                      />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Documents
                      </p>
                    </div>

                    {filteredDocuments.map((document, index) => (
                      <button
                        key={
                          document.id ||
                          `${document.documentName}-${index}`
                        }
                        type="button"
                        onClick={() =>
                          handleDocumentSelect(document)
                        }
                        className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-violet-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                          <FileText size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-800 group-hover:text-violet-700">
                            {document.documentName ||
                              document.fileName ||
                              "Untitled document"}
                          </p>

                          <p className="mt-0.5 truncate text-xs text-slate-500">
                            {String(
                              getDocumentCategory(document) ||
                                "Document"
                            ).replace(/[_-]+/g, " ")}
                            {document.description
                              ? ` · ${document.description}`
                              : ""}
                          </p>
                        </div>

                        <ArrowUpRight
                          size={16}
                          className="shrink-0 text-slate-300 transition group-hover:text-violet-600"
                        />
                      </button>
                    ))}
                  </section>
                )}

                {searchError && (
                  <div className="border-t border-slate-100 px-4 py-3">
                    <p className="text-xs text-amber-700">
                      {searchError}
                    </p>
                    <button
                      type="button"
                      onClick={loadDocuments}
                      className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Retry document search
                    </button>
                  </div>
                )}

                {!hasResults && (
                  <div className="px-5 py-9 text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <Search size={19} />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      No results found
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Try a page name, certificate name, or document
                      description.
                    </p>
                  </div>
                )}
              </>
            )}

            {!searchLoading && hasResults && (
              <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2">
                <p className="text-[10px] text-slate-400">
                  Select a result to open its page.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* FONT SIZE, NOTIFICATIONS AND PROFILE */}

      <div className="ml-1 flex shrink-0 items-center gap-2 sm:ml-4 sm:gap-4">
        <FontSizeSettings compact />
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          onClick={() => {
            // Notification integration can be added later.
          }}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 hover:text-blue-600 sm:h-11 sm:w-11"
        >
          <Bell size={20} />
        </button>

        <div className="hidden h-10 w-px bg-slate-200 sm:block" />

        {/* PROFILE MENU */}

        <div className="relative">
          <button
            type="button"
            aria-label="Open student profile menu"
            aria-expanded={profileOpen}
            onClick={() =>
              setProfileOpen((previous) => !previous)
            }
            className="flex items-center gap-2 rounded-xl px-1.5 py-2 transition hover:bg-slate-100 sm:gap-3 sm:px-2"
          >
            <img
              src={profileImage}
              alt={displayName}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = defaultProfile;
              }}
              className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm sm:h-11 sm:w-11"
            />

            <div className="hidden min-w-0 text-left sm:block">
              <h3 className="max-w-44 truncate text-sm font-semibold text-slate-800">
                {displayName}
              </h3>
              <p className="max-w-44 truncate text-xs text-slate-500">
                {displayRole}
              </p>
            </div>

            <ChevronDown
              size={17}
              className={`hidden text-slate-500 transition-transform sm:block ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <>
              <button
                type="button"
                aria-label="Close profile menu"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setProfileOpen(false)}
              />

              <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                <div className="border-b border-slate-100 px-4 py-3">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {displayName}
                  </p>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {displayRole}
                  </p>

                  {user?.email && (
                    <p className="mt-1 truncate text-xs text-slate-400">
                      {user.email}
                    </p>
                  )}
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
                  disabled={loggingOut}
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loggingOut ? (
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <LogOut size={17} />
                  )}

                  {loggingOut ? "Signing out..." : "Sign Out"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;