
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import {
  AlertCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  FileText,
  Pencil,
} from "lucide-react";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

import BackButton from "../../../components/Mentors/Students/Header/BackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import StudentTabs from "../../../components/Mentors/Students/Header/StudentTabs";

import StudentAttendanceProfile from "../../../components/Mentors/Students/Attendence/StudentAttendanceProfile";

import api from "../../../api/axios";

const COLORS = {
  attended: "#2563EB",
  missed: "#DBEAFE",
  excellent: "#2563EB",
  good: "#60A5FA",
  risk: "#F59E0B",
  critical: "#EF4444",
  empty: "#E2E8F0",
};

const getSubjectPercentage = (subject) => {
  const held = Number(subject?.classesHeld) || 0;
  const attended = Number(subject?.classesAttended) || 0;

  if (held > 0) {
    return Math.min(100, Math.max(0, (attended / held) * 100));
  }

  const stored = Number(
    subject?.storedAttendance ?? subject?.percentage,
  );

  return Number.isFinite(stored)
    ? Math.min(100, Math.max(0, stored))
    : 0;
};

const getBadgeStyle = (percentage) => {
  if (percentage >= 90) {
    return "bg-emerald-100 text-emerald-700";
  }

  if (percentage >= 75) {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-red-100 text-red-700";
};

// Supports both ApiResponse and a plain { success, data } response.
const unwrapResponse = (response) => {
  let data = response?.data;

  if (
    data &&
    typeof data === "object" &&
    data.data !== undefined
  ) {
    data = data.data;
  }

  return data;
};

const getSemesterNumber = (value) => {
  const match = String(value ?? "").match(/\d+/);
  const semester = match ? Number(match[0]) : 1;

  return Number.isInteger(semester) &&
    semester >= 1 &&
    semester <= 8
    ? semester
    : 1;
};

const formatPercentage = (value) =>
  `${Number(value || 0).toFixed(2)}%`;

const Attendance = () => {
  const { studentId: routeStudentId, id: routeId } = useParams();
  const location = useLocation();

  const selectedStudent = location.state?.student || null;

  const studentId =
    routeStudentId ||
    routeId ||
    location.state?.studentId ||
    selectedStudent?.id ||
    null;

  const [attendanceData, setAttendanceData] = useState(null);

  const [selectedSemester, setSelectedSemester] = useState(() =>
    getSemesterNumber(selectedStudent?.semester),
  );

  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [error, setError] = useState("");

  const loadAttendance = useCallback(
    async (semester, signal) => {
      if (!studentId) {
        setAttendanceData(null);
        setError(
          "Student ID is missing. Open attendance from the selected student's profile.",
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/mentor/students/${encodeURIComponent(studentId)}/attendance`,
          {
            params: { semester },
            signal,
          },
        );

        const data = unwrapResponse(response);

        if (!data || typeof data !== "object") {
          throw new Error("The attendance response is empty.");
        }

        setAttendanceData({
          ...data,
          summary: data.summary || {},
          subjects: Array.isArray(data.subjects)
            ? data.subjects
            : [],
        });
      } catch (err) {
        if (
          err?.code === "ERR_CANCELED" ||
          err?.name === "CanceledError"
        ) {
          return;
        }

        console.error(
          "Failed to fetch student attendance:",
          err,
        );

        setAttendanceData(null);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load attendance for this student.",
        );
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [studentId],
  );

  useEffect(() => {
    const controller = new AbortController();

    loadAttendance(selectedSemester, controller.signal);

    return () => controller.abort();
  }, [loadAttendance, selectedSemester, refreshKey]);

  const summary = attendanceData?.summary || {};
  const subjects = attendanceData?.subjects || [];

  // Prefer API student details, then fall back to the selected student.
  const student = attendanceData?.student || selectedStudent || {};

  const mentor = attendanceData?.mentor || null;

  const classesAttended = Math.max(
    0,
    Number(summary.classesAttended) || 0,
  );

  const classesHeld = Math.max(
    0,
    Number(summary.classesHeld) || 0,
  );

  const classesMissed = Math.max(
    0,
    classesHeld - classesAttended,
  );

  const summaryPercentage = Number(summary.percentage);

  const percentage =
    Number.isFinite(summaryPercentage) &&
    summary.percentage !== null &&
    summary.percentage !== ""
      ? Math.min(100, Math.max(0, summaryPercentage))
      : classesHeld > 0
        ? (classesAttended / classesHeld) * 100
        : 0;

  const hasAttendance =
    attendanceData?.hasAttendance ??
    (
      classesHeld > 0 ||
      subjects.some(
        (subject) =>
          subject.storedAttendance !== null &&
          subject.storedAttendance !== undefined,
      )
    );

  const sortedSubjects = [...subjects].sort(
    (a, b) => getSubjectPercentage(b) - getSubjectPercentage(a),
  );

  const highestSubject = sortedSubjects[0] || null;

  const lowestSubject =
    sortedSubjects[sortedSubjects.length - 1] || null;

  const categories = [
    {
      name: "Excellent",
      range: "90% and above",
      value: subjects.filter(
        (subject) => getSubjectPercentage(subject) >= 90,
      ).length,
      color: COLORS.excellent,
    },
    {
      name: "Good",
      range: "85%–89.99%",
      value: subjects.filter((subject) => {
        const value = getSubjectPercentage(subject);
        return value >= 85 && value < 90;
      }).length,
      color: COLORS.good,
    },
    {
      name: "At Risk",
      range: "75%–84.99%",
      value: subjects.filter((subject) => {
        const value = getSubjectPercentage(subject);
        return value >= 75 && value < 85;
      }).length,
      color: COLORS.risk,
    },
    {
      name: "Critical",
      range: "Below 75%",
      value: subjects.filter(
        (subject) => getSubjectPercentage(subject) < 75,
      ).length,
      color: COLORS.critical,
    },
  ];

  const handleSemesterChange = (event) => {
    const semester = Number(event.target.value);

    if (
      Number.isInteger(semester) &&
      semester >= 1 &&
      semester <= 8
    ) {
      setSelectedSemester(semester);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((key) => key + 1);
  };

  const noSemesterData =
    !loading &&
    !error &&
    attendanceData &&
    !attendanceData.semesterExists &&
    subjects.length === 0;

  return (
    <div className="min-h-screen bg-slate-100">
      <MentorSidebar />

      <div className="ml-[290px] min-h-screen min-w-0">
        <MentorHeader />

        <main className="space-y-4 p-5">
          {/* HEADER ACTIONS */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <BackButton />

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                Attendance for

                <select
                  value={selectedSemester}
                  onChange={handleSemesterChange}
                  className="bg-transparent font-semibold text-[#142970] outline-none"
                  aria-label="Select semester"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(
                    (semester) => (
                      <option key={semester} value={semester}>
                        Semester {semester}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={loading}
                title="Refresh attendance"
                aria-label="Refresh attendance"
                className="rounded-xl border border-slate-200 bg-white p-2.5 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
              </button>

              <ActionButtons />
            </div>
          </div>

          {/* STUDENT PROFILE AND TABS */}
          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="min-w-0">
              <StudentAttendanceProfile
                student={student}
                mentor={mentor}
              />
            </aside>

            <section className="min-w-0 space-y-3">
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <StudentTabs />
              </div>

              <div>
                <h1 className="text-[28px] font-bold text-[#142970]">
                  Attendance Overview
                </h1>

                <p className="mt-1 text-[13px] text-slate-500">
                  Attendance details for Semester {selectedSemester}.
                </p>

                {student?.fullName && (
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {student.fullName}
                    {student.registerNumber
                      ? ` · ${student.registerNumber}`
                      : ""}
                  </p>
                )}
              </div>

              {/* ERROR */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0"
                  />
                  <p>{error}</p>
                </div>
              )}

              {/* LOADING */}
              {loading && (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                  <RefreshCw
                    size={22}
                    className="mx-auto animate-spin text-blue-600"
                  />

                  <p className="mt-3 text-sm text-slate-500">
                    Loading student attendance...
                  </p>
                </div>
              )}

              {/* NO SEMESTER RECORD */}
              {noSemesterData && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  No attendance record exists for Semester{" "}
                  {selectedSemester}.
                </div>
              )}

              {/* ATTENDANCE DASHBOARD */}
              {!loading && !error && attendanceData && (
                <>
                  {/* SUMMARY CARDS */}
                  <div className="grid grid-cols-1 gap-3 2xl:grid-cols-3">
                    {/* OVERALL ATTENDANCE */}
                    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h2 className="text-sm font-semibold text-blue-600">
                        Overall Attendance
                      </h2>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="relative h-32 w-32 shrink-0">
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                          >
                            <PieChart>
                              <Pie
                                data={
                                  hasAttendance
                                    ? [
                                        {
                                          name: "Attended",
                                          value: classesAttended,
                                        },
                                        {
                                          name: "Missed",
                                          value: classesMissed,
                                        },
                                      ]
                                    : [{ name: "No Data", value: 1 }]
                                }
                                dataKey="value"
                                innerRadius={40}
                                outerRadius={58}
                                startAngle={90}
                                endAngle={-270}
                                stroke="none"
                              >
                                {(hasAttendance
                                  ? [
                                      { color: COLORS.attended },
                                      { color: COLORS.missed },
                                    ]
                                  : [{ color: COLORS.empty }]
                                ).map((item, index) => (
                                  <Cell
                                    key={index}
                                    fill={item.color}
                                  />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>

                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <strong className="text-xl text-[#142970]">
                              {hasAttendance
                                ? formatPercentage(percentage)
                                : "—"}
                            </strong>

                            <span
                              className={`text-[10px] font-semibold ${
                                !hasAttendance
                                  ? "text-slate-400"
                                  : percentage >= 85
                                    ? "text-emerald-600"
                                    : percentage >= 75
                                      ? "text-amber-600"
                                      : "text-red-600"
                              }`}
                            >
                              {!hasAttendance
                                ? "No Data"
                                : percentage >= 85
                                  ? "Excellent"
                                  : percentage >= 75
                                    ? "Good"
                                    : "Needs Attention"}
                            </span>
                          </div>
                        </div>

                        <div className="min-w-0 flex-1 space-y-4 text-xs">
                          {[
                            {
                              label: "Classes Attended",
                              value: classesAttended,
                              color: COLORS.attended,
                            },
                            {
                              label: "Classes Held",
                              value: classesHeld,
                              color: COLORS.missed,
                            },
                            {
                              label: "Classes Missed",
                              value: classesMissed,
                              color: COLORS.critical,
                            },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className="flex items-center justify-between gap-2"
                            >
                              <div className="flex min-w-0 items-center gap-2">
                                <span
                                  className="h-3 w-3 shrink-0 rounded-sm"
                                  style={{
                                    backgroundColor: item.color,
                                  }}
                                />
                                <span className="text-slate-600">
                                  {item.label}
                                </span>
                              </div>

                              <strong className="text-[#142970]">
                                {item.value}
                              </strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* ATTENDANCE STATISTICS */}
                    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h2 className="text-sm font-semibold text-blue-600">
                        Attendance Statistics
                      </h2>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-slate-200 p-3">
                          <p className="text-[11px] text-slate-500">
                            This Semester
                          </p>

                          <div className="mt-3 flex items-center justify-between gap-1">
                            <strong className="text-xl text-[#142970]">
                              {hasAttendance
                                ? formatPercentage(percentage)
                                : "—"}
                            </strong>

                            <TrendingUp
                              size={17}
                              className="text-blue-600"
                            />
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-3">
                          <p className="text-[11px] text-slate-500">
                            Subjects
                          </p>

                          <strong className="mt-3 block text-xl text-[#142970]">
                            {subjects.length}
                          </strong>
                        </div>

                        <div className="rounded-xl border border-emerald-200 p-3">
                          <p className="text-[11px] text-slate-500">
                            Highest Subject
                          </p>

                          <strong className="mt-3 block text-xl text-emerald-600">
                            {highestSubject
                              ? formatPercentage(
                                  getSubjectPercentage(highestSubject),
                                )
                              : "—"}
                          </strong>

                          <p
                            className="mt-1 truncate text-[11px] text-slate-500"
                            title={highestSubject?.subjectName || ""}
                          >
                            {highestSubject?.subjectName ||
                              "No subject data"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-orange-200 p-3">
                          <p className="text-[11px] text-slate-500">
                            Lowest Subject
                          </p>

                          <div className="flex items-center justify-between gap-1">
                            <strong className="mt-3 block text-xl text-orange-600">
                              {lowestSubject
                                ? formatPercentage(
                                    getSubjectPercentage(lowestSubject),
                                  )
                                : "—"}
                            </strong>

                            {lowestSubject && (
                              <TrendingDown
                                size={16}
                                className="mt-3 text-orange-500"
                              />
                            )}
                          </div>

                          <p
                            className="mt-1 truncate text-[11px] text-slate-500"
                            title={lowestSubject?.subjectName || ""}
                          >
                            {lowestSubject?.subjectName ||
                              "No subject data"}
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* ATTENDANCE BY CATEGORY */}
                    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                      <h2 className="text-sm font-semibold text-blue-600">
                        Attendance by Category
                      </h2>

                      <div className="mt-4 flex items-center gap-3">
                        <div className="h-32 w-32 shrink-0">
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                          >
                            <PieChart>
                              <Pie
                                data={
                                  subjects.length
                                    ? categories
                                    : [{ name: "No Data", value: 1 }]
                                }
                                dataKey="value"
                                innerRadius={40}
                                outerRadius={58}
                                stroke="white"
                                strokeWidth={2}
                              >
                                {(subjects.length
                                  ? categories
                                  : [
                                      {
                                        name: "No Data",
                                        color: COLORS.empty,
                                      },
                                    ]
                                ).map((item) => (
                                  <Cell
                                    key={item.name}
                                    fill={item.color}
                                  />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="min-w-0 flex-1 space-y-3">
                          {subjects.length ? (
                            categories.map((item) => (
                              <div
                                key={item.name}
                                className="flex items-center justify-between gap-2 text-xs"
                              >
                                <div className="flex min-w-0 items-center gap-2">
                                  <span
                                    className="h-3 w-3 shrink-0 rounded-sm"
                                    style={{
                                      backgroundColor: item.color,
                                    }}
                                  />

                                  <div className="min-w-0">
                                    <p className="text-slate-600">
                                      {item.name}
                                    </p>

                                    <p className="text-[10px] text-slate-400">
                                      {item.range}
                                    </p>
                                  </div>
                                </div>

                                <strong className="text-[#142970]">
                                  {item.value}
                                </strong>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-slate-400">
                              No subject attendance available.
                            </p>
                          )}
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* SUBJECT-WISE ATTENDANCE */}
                  <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <h2 className="text-sm font-semibold text-blue-600">
                        Subject-wise Attendance
                      </h2>

                      <span className="text-xs text-slate-500">
                        {subjects.length} subjects
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full min-w-[650px]">
                        <thead className="bg-slate-50">
                          <tr className="text-left text-[11px] text-slate-600">
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Subject Code</th>
                            <th className="px-4 py-3">Subject Name</th>
                            <th className="px-4 py-3 text-center">
                              Classes Held
                            </th>
                            <th className="px-4 py-3 text-center">
                              Classes Attended
                            </th>
                            <th className="px-4 py-3 text-center">
                              Attendance
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {subjects.map((subject, index) => {
                            const subjectPercentage =
                              getSubjectPercentage(subject);

                            return (
                              <tr
                                key={
                                  subject.id ||
                                  subject.courseCode ||
                                  index
                                }
                                className="border-t border-slate-100 text-xs hover:bg-slate-50"
                              >
                                <td className="px-4 py-3 text-slate-500">
                                  {index + 1}
                                </td>

                                <td className="px-4 py-3 font-medium text-[#142970]">
                                  {subject.courseCode || "—"}
                                </td>

                                <td className="px-4 py-3 text-slate-700">
                                  {subject.subjectName || "—"}
                                </td>

                                <td className="px-4 py-3 text-center text-slate-700">
                                  {Number(subject.classesHeld) || 0}
                                </td>

                                <td className="px-4 py-3 text-center text-slate-700">
                                  {Number(subject.classesAttended) || 0}
                                </td>

                                <td className="px-4 py-3 text-center">
                                  <span
                                    className={`inline-block min-w-[60px] rounded-full px-2 py-1 text-[10px] font-semibold ${getBadgeStyle(subjectPercentage)}`}
                                  >
                                    {formatPercentage(subjectPercentage)}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}

                          {subjects.length === 0 && (
                            <tr>
                              <td
                                colSpan={6}
                                className="px-4 py-12 text-center text-sm text-slate-400"
                              >
                                No attendance entered for this semester yet.
                              </td>
                            </tr>
                          )}
                        </tbody>

                        {subjects.length > 0 && (
                          <tfoot>
                            <tr className="border-t border-slate-200 bg-slate-50">
                              <td
                                colSpan={5}
                                className="px-4 py-4 text-right text-xs font-semibold text-[#142970]"
                              >
                                Overall Attendance
                              </td>

                              <td className="px-4 py-4 text-center">
                                <span
                                  className={`rounded-full px-3 py-1 text-[10px] font-semibold ${getBadgeStyle(percentage)}`}
                                >
                                  {formatPercentage(percentage)}
                                </span>
                              </td>
                            </tr>
                          </tfoot>
                        )}
                      </table>
                    </div>

                    {/* READ-ONLY MENTOR VIEW */}
                    <div className="mt-3 flex flex-wrap justify-center gap-3">
                      <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs text-slate-500">
                        <Pencil size={14} />
                        Read-only mentor view
                      </div>

                      <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs text-slate-500">
                        <FileText size={14} />
                        Attendance report
                      </div>
                    </div>
                  </section>
                </>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Attendance;
