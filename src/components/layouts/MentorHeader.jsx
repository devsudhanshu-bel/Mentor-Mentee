import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  UserRound,
  LogOut,
  GraduationCap,
  CalendarDays,
  LoaderCircle,
  X,
  ArrowUpRight,
  Clock3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import profile from "../../assets/profile.jpg";
import api from "../../api/axios";

const MIN_SEARCH_LENGTH = 1;

const MentorHeader = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);

  const [mentor, setMentor] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [students, setStudents] = useState([]);
  const [meetings, setMeetings] = useState([]);

  // --------------------------------------------------
  // AUTHENTICATED MENTOR PROFILE
  // --------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    const loadMentorProfile = async () => {
      try {
        const storedUser = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        if (!cancelled) {
          setMentor({
            ...storedUser,
            fullName:
              storedUser.fullName ||
              storedUser.name ||
              "",
          });
        }
      } catch (error) {
        console.error("Unable to read stored user:", error);
      }

      try {
        const response = await api.get("/mentor/dashboard/banner");
        const teacher = response.data?.data;

        if (!teacher || cancelled) return;

        setMentor((previous) => ({
          ...previous,
          ...teacher,
          fullName:
            teacher.fullName ||
            previous?.fullName ||
            "",
          designation:
            teacher.designation ||
            previous?.designation ||
            "",
          profileImage:
            teacher.profileImage ||
            previous?.profileImage ||
            null,
        }));
      } catch (error) {
        console.error(
          "Unable to fetch mentor profile:",
          error.response?.data?.message || error.message
        );
      }
    };

    loadMentorProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  // --------------------------------------------------
  // LOAD SEARCHABLE STUDENTS AND MEETINGS
  // --------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    const loadSearchData = async () => {
      setSearchLoading(true);
      setSearchError("");

      try {
        const [studentsResult, meetingsResult] = await Promise.all([
          api.get("/mentor/students"),
          api.get("/mentor/meetings"),
        ]);

        if (cancelled) return;

        const studentPayload = studentsResult.data?.data;
        const meetingPayload = meetingsResult.data?.data;

        const studentList = Array.isArray(studentPayload)
          ? studentPayload
          : Array.isArray(studentPayload?.students)
            ? studentPayload.students
            : [];

        const meetingList = Array.isArray(meetingPayload)
          ? meetingPayload
          : Array.isArray(meetingPayload?.meetings)
            ? meetingPayload.meetings
            : [];

        setStudents(studentList);
        setMeetings(meetingList);
      } catch (error) {
        if (!cancelled) {
          setSearchError(
            error.response?.data?.message ||
              "Unable to load students and meetings. Please try again."
          );
        }

        console.error("Unable to load header search data:", error);
      } finally {
        if (!cancelled) {
          setSearchLoading(false);
        }
      }
    };

    loadSearchData();

    return () => {
      cancelled = true;
    };
  }, []);

  // --------------------------------------------------
  // CLOSE SEARCH WHEN CLICKING OUTSIDE
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

  const fullName =
    mentor?.fullName ||
    mentor?.name ||
    mentor?.username ||
    "Mentor";

  const designation = mentor?.designation || "Mentor";
  const profileImage = mentor?.profileImage || profile;

  // --------------------------------------------------
  // SEARCH HELPERS
  // --------------------------------------------------

  const normalizedQuery = searchTerm.trim().toLowerCase();

  const matchesQuery = (...values) =>
    values.some(
      (value) =>
        value !== null &&
        value !== undefined &&
        String(value).toLowerCase().includes(normalizedQuery)
    );

  const filteredStudents = normalizedQuery
    ? students
        .filter((student) =>
          matchesQuery(
            student.fullName,
            student.name,
            student.registerNumber,
            student.registrationNumber,
            student.programme,
            student.semester
          )
        )
        .slice(0, 6)
    : [];

  const filteredMeetings = normalizedQuery
    ? meetings
        .filter((meeting) =>
          matchesQuery(
            meeting.title,
            meeting.meetingType,
            meeting.status,
            meeting.students?.fullName,
            meeting.students?.registerNumber,
            meeting.student?.fullName,
            meeting.student?.registerNumber
          )
        )
        .slice(0, 6)
    : [];

  const hasResults =
    filteredStudents.length > 0 || filteredMeetings.length > 0;

  // --------------------------------------------------
  // NAVIGATION
  // --------------------------------------------------

  const handleStudentSelect = (student) => {
    const studentId = student.id || student.studentId;

    if (!studentId) {
      setSearchError("This student does not have a valid ID.");
      return;
    }

    setSearchOpen(false);
    setSearchTerm("");
    navigate(`/mentor/students/${encodeURIComponent(studentId)}/overview`);
  };

  const handleMeetingSelect = (meeting) => {
    setSearchOpen(false);
    setSearchTerm("");

    // The current application registers only the meetings list route.
    // Pass the selected meeting ID so the page can optionally use it.
    navigate("/mentor/meetings", {
      state: {
        selectedMeetingId: meeting.id,
      },
    });
  };

  const handleProfile = () => {
    setProfileMenuOpen(false);
    navigate("/mentor/profile");
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

  const clearSearch = () => {
    setSearchTerm("");
    setSearchError("");
    setSearchOpen(true);
    searchRef.current?.focus();
  };

  const formatMeetingDate = (value) => {
    if (!value) return "Date unavailable";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
        <div className="relative max-w-xl">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            ref={searchRef}
            type="search"
            value={searchTerm}
            placeholder="Search students, meetings..."
            aria-label="Search students and meetings"
            aria-expanded={searchOpen}
            aria-controls="mentor-header-search-results"
            autoComplete="off"
            onFocus={() => setSearchOpen(true)}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setSearchOpen(true);
              setSearchError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (filteredStudents.length === 1) {
                  handleStudentSelect(filteredStudents[0]);
                } else if (filteredMeetings.length === 1) {
                  handleMeetingSelect(filteredMeetings[0]);
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

        {/* SEARCH RESULTS */}
        {searchOpen && normalizedQuery && (
          <div
            id="mentor-header-search-results"
            className="absolute left-0 top-full z-50 mt-3 max-h-[min(72vh,560px)] w-full min-w-[300px] max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70"
          >
            <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3">
              <p className="text-xs font-semibold text-slate-700">
                Search results
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Students and meetings only
              </p>
            </div>

            {searchLoading ? (
              <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-slate-500">
                <LoaderCircle
                  size={17}
                  className="animate-spin text-blue-600"
                />
                Loading search data...
              </div>
            ) : searchError ? (
              <div className="px-4 py-6">
                <p className="text-sm text-red-600">{searchError}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Reload page
                </button>
              </div>
            ) : !hasResults ? (
              <div className="px-5 py-9 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Search size={19} />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  No results found
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Try a student name, register number, meeting title, or status.
                </p>
              </div>
            ) : (
              <div className="p-2">
                {/* STUDENTS */}
                {filteredStudents.length > 0 && (
                  <section>
                    <div className="flex items-center gap-2 px-3 py-2">
                      <GraduationCap
                        size={15}
                        className="text-blue-600"
                      />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Students
                      </p>
                      <span className="ml-auto rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                        {filteredStudents.length}
                      </span>
                    </div>

                    {filteredStudents.map((student) => {
                      const id = student.id || student.studentId;
                      const name =
                        student.fullName ||
                        student.name ||
                        "Unnamed Student";

                      const initials = name
                        .trim()
                        .split(/\s+/)
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((part) => part[0].toUpperCase())
                        .join("");

                      return (
                        <button
                          key={id || name}
                          type="button"
                          onClick={() => handleStudentSelect(student)}
                          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-blue-50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-blue-50 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                            {student.profileImage ? (
                              <img
                                src={student.profileImage}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              initials || "ST"
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-800 group-hover:text-blue-700">
                              {name}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {student.registerNumber ||
                                student.registrationNumber ||
                                "Register number unavailable"}
                              {student.programme
                                ? ` · ${student.programme}`
                                : ""}
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

                {/* MEETINGS */}
                {filteredMeetings.length > 0 && (
                  <section
                    className={
                      filteredStudents.length > 0
                        ? "mt-2 border-t border-slate-100 pt-2"
                        : ""
                    }
                  >
                    <div className="flex items-center gap-2 px-3 py-2">
                      <CalendarDays
                        size={15}
                        className="text-violet-600"
                      />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Meetings
                      </p>
                      <span className="ml-auto rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-600">
                        {filteredMeetings.length}
                      </span>
                    </div>

                    {filteredMeetings.map((meeting) => {
                      const meetingStudent =
                        meeting.students || meeting.student;

                      return (
                        <button
                          key={meeting.id}
                          type="button"
                          onClick={() => handleMeetingSelect(meeting)}
                          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-violet-50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
                            <CalendarDays size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-800 group-hover:text-violet-700">
                              {meeting.title || "Untitled meeting"}
                            </p>
                            <p className="mt-1 flex items-center gap-1 truncate text-xs text-slate-500">
                              <UserRound
                                size={12}
                                className="shrink-0"
                              />
                              <span className="truncate">
                                {meetingStudent?.fullName ||
                                  meetingStudent?.registerNumber ||
                                  "Student unavailable"}
                              </span>
                            </p>
                            <p className="mt-1 flex items-center gap-1 truncate text-[11px] text-slate-400">
                              <Clock3
                                size={11}
                                className="shrink-0"
                              />
                              {formatMeetingDate(meeting.startAt)}
                              {meeting.status
                                ? ` · ${meeting.status.replaceAll("_", " ")}`
                                : ""}
                            </p>
                          </div>

                          <ArrowUpRight
                            size={16}
                            className="shrink-0 text-slate-300 transition group-hover:text-violet-600"
                          />
                        </button>
                      );
                    })}
                  </section>
                )}
              </div>
            )}

            {!searchLoading && !searchError && hasResults && (
              <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2">
                <p className="text-[10px] text-slate-400">
                  Select a result to open it.
                </p>
              </div>
            )}
          </div>
        )}

        {/* CLICK-TO-CLOSE BACKDROP FOR SEARCH */}
        {searchOpen && normalizedQuery && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close search results"
            className="fixed inset-0 z-[-1] cursor-default"
            onClick={() => setSearchOpen(false)}
          />
        )}
      </div>

      {/* NOTIFICATIONS AND PROFILE */}
      <div className="ml-1 flex shrink-0 items-center gap-2 sm:ml-4 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          onClick={() => {
            // Notification functionality will be connected separately.
          }}
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 hover:text-blue-600 sm:h-11 sm:w-11"
        >
          <Bell size={20} />
        </button>

        <div className="hidden h-10 w-px bg-slate-200 sm:block" />

        <div className="relative">
          <button
            type="button"
            aria-label="Open mentor profile menu"
            aria-expanded={profileMenuOpen}
            onClick={() =>
              setProfileMenuOpen((previous) => !previous)
            }
            className="flex items-center gap-2 rounded-xl px-1.5 py-2 transition hover:bg-slate-100 sm:gap-3 sm:px-2"
          >
            <img
              src={profileImage}
              alt={fullName}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = profile;
              }}
              className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm sm:h-11 sm:w-11"
            />

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
                    {mentor?.department || designation}
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

export default MentorHeader;