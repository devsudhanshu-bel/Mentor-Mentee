
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

import api from "../../../../api/axios";

import SemesterTabs from "./SemesterTabs";
import SemesterCourseTable from "./SemesterCourseTable";
import SemesterSummary from "./SemesterSummary";
import GradeDistribution from "./GradeDistribution";
import SGPATrend from "./SGPATrend";

/* =========================================================
   RESPONSE HELPERS
========================================================= */

const isObject = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value);

const unwrapResponse = (response) => {
  let result = response?.data ?? response;

  // Supports:
  // { success, statusCode, message, data: {...} }
  for (let i = 0; i < 4; i += 1) {
    if (
      isObject(result) &&
      Object.prototype.hasOwnProperty.call(result, "data") &&
      result.data !== null &&
      result.data !== undefined
    ) {
      result = result.data;
    } else {
      break;
    }
  }

  return result;
};

const getErrorMessage = (error, fallback) => {
  const status = error?.response?.status;

  if (status === 401) {
    return "Your session has expired or authentication is missing. Please log in again.";
  }

  if (status === 403) {
    return (
      error?.response?.data?.message ||
      "You are not authorized to view this student's academic records."
    );
  }

  if (status === 404) {
    return (
      error?.response?.data?.message ||
      "The academic endpoint or student record was not found."
    );
  }

  return (
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
};

const isCancelledRequest = (error) =>
  error?.code === "ERR_CANCELED" ||
  error?.name === "CanceledError";

/* =========================================================
   API URL
========================================================= */

// Uses the base URL and authentication interceptor configured
// in src/api/axios.js. Do not add /api again here.
const getAcademicUrl = (studentId) =>
  `/mentor/students/${encodeURIComponent(studentId)}/academics`;

/* =========================================================
   STUDENT ID RESOLUTION
========================================================= */

// Passing studentId from the parent is preferred.
// The URL fallback supports routes such as:
// /mentor/students/:studentId/academics
const getStudentIdFromPath = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const match = window.location.pathname.match(
    /\/students\/([^/]+)(?:\/academics)?\/?$/
  );

  return match?.[1] || null;
};

/* =========================================================
   ACADEMIC INFORMATION
========================================================= */

const AcademicInformation = ({
  studentId: suppliedStudentId,
}) => {
  const studentId =
    suppliedStudentId || getStudentIdFromPath();

  const [selectedSemester, setSelectedSemester] =
    useState(1);

  const [academicData, setAcademicData] = useState(null);
  const [semesterData, setSemesterData] = useState(null);

  const [loadingOverview, setLoadingOverview] =
    useState(true);

  const [loadingSemester, setLoadingSemester] =
    useState(false);

  const [overviewError, setOverviewError] = useState("");
  const [semesterError, setSemesterError] = useState("");

  const [refreshKey, setRefreshKey] = useState(0);

  /* =======================================================
     FETCH ACADEMIC OVERVIEW
  ======================================================= */

  const fetchOverview = useCallback(
    async (signal) => {
      if (!studentId) {
        setAcademicData(null);
        setOverviewError(
          "Student ID is missing. Pass the selected student's database ID to AcademicInformation."
        );
        setLoadingOverview(false);
        return;
      }

      setLoadingOverview(true);
      setOverviewError("");

      try {
        const response = await api.get(
          getAcademicUrl(studentId),
          { signal }
        );

        const result = unwrapResponse(response);

        if (!isObject(result)) {
          throw new Error(
            "The academic overview response has an invalid format."
          );
        }

        const overview = isObject(result.academicData)
          ? result.academicData
          : isObject(result.academics)
            ? result.academics
            : result;

        if (!Array.isArray(overview.semesters)) {
          throw new Error(
            "The academic overview response is missing the semesters array."
          );
        }

        setAcademicData(overview);

        const currentSemester = Number(
          overview.currentSemester ??
            overview.student?.semester ??
            1
        );

        setSelectedSemester((previous) => {
          if (
            Number.isInteger(currentSemester) &&
            currentSemester >= 1 &&
            currentSemester <= 8
          ) {
            return previous >= 1 &&
              previous <= currentSemester
              ? previous
              : currentSemester;
          }

          return previous;
        });
      } catch (error) {
        if (isCancelledRequest(error)) {
          return;
        }

        console.error(
          "[Mentor Academics] Overview request failed:",
          error
        );

        console.error(
          "[Mentor Academics] Error response:",
          error?.response?.data
        );

        setAcademicData(null);

        setOverviewError(
          getErrorMessage(
            error,
            "Unable to load academic information."
          )
        );
      } finally {
        if (!signal?.aborted) {
          setLoadingOverview(false);
        }
      }
    },
    [studentId]
  );

  useEffect(() => {
    const controller = new AbortController();

    setAcademicData(null);
    setSemesterData(null);
    setSelectedSemester(1);
    setOverviewError("");
    setSemesterError("");
    setLoadingOverview(true);

    fetchOverview(controller.signal);

    return () => controller.abort();
  }, [fetchOverview, refreshKey]);

  /* =======================================================
     FETCH SELECTED SEMESTER
  ======================================================= */

  const fetchSemester = useCallback(
    async (signal) => {
      if (!studentId || !academicData) {
        setSemesterData(null);
        setLoadingSemester(false);
        return;
      }

      const currentSemester = Number(
        academicData.currentSemester ??
          academicData.student?.semester ??
          1
      );

      if (selectedSemester > currentSemester) {
        setSemesterData(null);
        setSemesterError("");
        setLoadingSemester(false);
        return;
      }

      setLoadingSemester(true);
      setSemesterError("");
      setSemesterData(null);

      try {
        const response = await api.get(
          `${getAcademicUrl(studentId)}/semester/${selectedSemester}`,
          { signal }
        );

        const result = unwrapResponse(response);

        if (!isObject(result)) {
          throw new Error(
            "The semester response has an invalid format."
          );
        }

        const semester = isObject(result.semester)
          ? result.semester
          : isObject(result.academicSemester)
            ? result.academicSemester
            : result;

        setSemesterData(semester);
      } catch (error) {
        if (isCancelledRequest(error)) {
          return;
        }

        console.error(
          "[Mentor Academics] Semester request failed:",
          error
        );

        console.error(
          "[Mentor Academics] Semester error response:",
          error?.response?.data
        );

        setSemesterData(null);

        setSemesterError(
          getErrorMessage(
            error,
            "Unable to load semester details."
          )
        );
      } finally {
        if (!signal?.aborted) {
          setLoadingSemester(false);
        }
      }
    },
    [studentId, academicData, selectedSemester]
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchSemester(controller.signal);

    return () => controller.abort();
  }, [fetchSemester]);

  /* =======================================================
     REFRESH
  ======================================================= */

  const handleRefresh = () => {
    setOverviewError("");
    setSemesterError("");
    setSemesterData(null);
    setRefreshKey((previous) => previous + 1);
  };

  const handleSemesterRetry = () => {
    setSemesterError("");
    setRefreshKey((previous) => previous + 1);
  };

  /* =======================================================
     NORMALISED DATA
  ======================================================= */

  const semesters = Array.isArray(academicData?.semesters)
    ? academicData.semesters
    : [];

  const currentSemester = Number(
    academicData?.currentSemester ??
      academicData?.student?.semester ??
      1
  );

  const resolvedSemesterData = semesterData
    ? {
        ...semesterData,
        subjects: Array.isArray(semesterData.subjects)
          ? semesterData.subjects
          : Array.isArray(semesterData.courses)
            ? semesterData.courses
            : [],
      }
    : null;

  /* =======================================================
     OVERVIEW LOADING
  ======================================================= */

  if (loadingOverview && !academicData) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white">
        <Loader2
          size={30}
          className="animate-spin text-[#0B63F6]"
        />

        <p className="mt-3 text-sm font-medium text-slate-600">
          Loading student academics...
        </p>
      </div>
    );
  }

  /* =======================================================
     OVERVIEW ERROR
  ======================================================= */

  if (overviewError && !academicData) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-start gap-3">
          <AlertCircle
            size={22}
            className="shrink-0 text-red-500"
          />

          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-slate-800">
              Unable to load academic information
            </h2>

            <p className="mt-2 break-words text-sm text-slate-500">
              {overviewError}
            </p>

            <button
              type="button"
              onClick={handleRefresh}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0B63F6] px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold text-[#0B3B8F]">
            Academic Information
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {academicData?.student?.fullName
              ? `Academic performance of ${academicData.student.fullName}`
              : "View academic performance and course details"}
          </p>

          {academicData?.student?.registerNumber && (
            <p className="mt-1 text-xs text-slate-400">
              Register Number:{" "}
              {academicData.student.registerNumber}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loadingOverview}
          title="Refresh academic information"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            size={14}
            className={loadingOverview ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {overviewError && academicData && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
          {overviewError}
        </div>
      )}

      <SemesterTabs
        selectedSemester={selectedSemester}
        onSelect={setSelectedSemester}
        semesters={semesters}
        currentSemester={currentSemester}
      />

      {semesterError ? (
        <div className="rounded-xl border border-red-200 bg-white p-5">
          <p className="text-sm font-medium text-red-600">
            {semesterError}
          </p>

          <button
            type="button"
            onClick={handleSemesterRetry}
            className="mt-3 text-xs font-medium text-blue-600 hover:underline"
          >
            Retry semester
          </button>
        </div>
      ) : (
        <SemesterCourseTable
          semesterNumber={selectedSemester}
          semesterData={resolvedSemesterData}
          loading={loadingSemester}
          error=""
        />
      )}

      <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-3">
        <SemesterSummary
          semesterData={resolvedSemesterData}
        />

        <GradeDistribution
          semesterData={resolvedSemesterData}
          loading={loadingSemester}
          error={semesterError}
        />

        <SGPATrend
          academicData={academicData}
          maxSGPA={10}
          loading={loadingOverview}
        />
      </div>

      {academicData?.academicSetupCompleted === false && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-xs text-amber-800">
            Academic setup has not been completed for this
            student. Some semester details may not be
            available yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default AcademicInformation;
