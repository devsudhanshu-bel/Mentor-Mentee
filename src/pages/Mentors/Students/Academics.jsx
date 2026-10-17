import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";

import {
  AlertCircle,
  LoaderCircle,
  RotateCcw,
} from "lucide-react";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";

import BackButton from "../../../components/Mentors/Students/Header/BackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import StudentTabs from "../../../components/Mentors/Students/Header/StudentTabs";

import StudentAcademicsProfile from "../../../components/Mentors/Students/Academics/StudentAcademicsProfile";
import AcademicInformation from "../../../components/Mentors/Students/Academics/AcademicInformation";

import api from "../../../api/axios";

const API = "/mentor/students";

// ==========================================================
// STUDENT ID RESOLUTION
// Same pattern as the working Co-Curricular page
// ==========================================================

function getStudentIdFromValue(value) {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (value && typeof value === "object") {
    return (
      getStudentIdFromValue(value.studentId) ||
      getStudentIdFromValue(value.id) ||
      getStudentIdFromValue(value.student?.id) ||
      getStudentIdFromValue(value.selectedStudent?.id) ||
      getStudentIdFromValue(value.student?.studentId) ||
      null
    );
  }

  return null;
}

function useSelectedStudentId(studentIdProp) {
  const params = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const state = location.state;

    const candidates = [
      studentIdProp,
      params.studentId,
      params.studentID,
      params.id,
      state?.studentId,
      state?.studentID,
      state?.id,
      state?.student,
      state?.selectedStudent,
      state?.studentData,
      state?.data?.student,
      state?.data?.selectedStudent,
      searchParams.get("studentId"),
      searchParams.get("studentID"),
      searchParams.get("id"),
    ];

    for (const candidate of candidates) {
      const id = getStudentIdFromValue(candidate);

      if (id) {
        return id;
      }
    }

    return null;
  }, [
    studentIdProp,
    params.studentId,
    params.studentID,
    params.id,
    location.state,
    searchParams,
  ]);
}

// ==========================================================
// API HELPER
// ==========================================================

async function apiRequest(url) {
  try {
    const response = await api.request({
      url,
      method: "GET",
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Unable to load student information."
    );
  }
}

// ==========================================================
// MAIN ACADEMICS PAGE
// ==========================================================

const Academics = ({
  studentId: studentIdProp,
  student: studentProp,
  mentor: mentorProp,
}) => {
  const studentId = useSelectedStudentId(studentIdProp);
  const location = useLocation();

  const [student, setStudent] = useState(
    studentProp || location.state?.student || null
  );

  const [mentor, setMentor] = useState(
    mentorProp || location.state?.mentor || null
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // --------------------------------------------------------
  // LOAD STUDENT AND MENTOR PROFILE DATA
  // --------------------------------------------------------

  const loadStudentProfile = useCallback(async () => {
    if (!studentId) {
      setIsLoading(false);

      setError(
        "Student ID is missing. Open Academics from a selected student's profile."
      );

      return;
    }

    setIsLoading(true);
    setError("");

    try {
      /*
       * This is the existing, verified dashboard endpoint
       * used by your Co-Curricular page.
       *
       * Its response contains student and mentor information.
       */
      const response = await apiRequest(
        `${API}/${encodeURIComponent(studentId)}/cocurricular/dashboard`
      );

      const data = response?.data;

      if (!data) {
        throw new Error(
          "The server did not return student profile information."
        );
      }

      setStudent(data.student || null);
      setMentor(data.mentor || null);
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to load the student profile."
      );
    } finally {
      setIsLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    loadStudentProfile();
  }, [loadStudentProfile]);

  // --------------------------------------------------------
  // NORMALIZE STUDENT FIELDS
  // --------------------------------------------------------

  const normalizedStudent = useMemo(() => {
    const currentStudent = student || {};

    return {
      ...currentStudent,

      fullName:
        currentStudent.fullName ||
        currentStudent.studentName ||
        currentStudent.name ||
        currentStudent.user?.fullName ||
        currentStudent.user?.name ||
        "",

      registerNumber:
        currentStudent.registerNumber ||
        currentStudent.registrationNumber ||
        currentStudent.regNo ||
        currentStudent.rollNumber ||
        "",

      programme:
        currentStudent.programme ||
        currentStudent.program ||
        currentStudent.course ||
        currentStudent.department?.name ||
        "",

      semester:
        currentStudent.semester ??
        currentStudent.currentSemester ??
        currentStudent.current_semester ??
        "",

      profileImage:
        currentStudent.profileImage ||
        currentStudent.profilePicture ||
        currentStudent.profilePhoto ||
        currentStudent.avatar ||
        currentStudent.user?.profileImage ||
        "",
    };
  }, [student]);

  // --------------------------------------------------------
  // NORMALIZE MENTOR FIELDS
  // --------------------------------------------------------

  const normalizedMentor = useMemo(() => {
    if (typeof mentor === "string") {
      return { fullName: mentor };
    }

    const currentMentor =
      mentor ||
      student?.mentor ||
      student?.assignedMentor ||
      {};

    return {
      ...currentMentor,

      fullName:
        currentMentor.fullName ||
        currentMentor.mentorName ||
        currentMentor.name ||
        currentMentor.user?.fullName ||
        currentMentor.user?.name ||
        "",
    };
  }, [mentor, student]);

  // --------------------------------------------------------
  // RENDER
  // --------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#EEF4F9]">
      {/* SIDEBAR */}
      <MentorSidebar />

      {/* MAIN CONTENT */}
      <div className="ml-[290px] min-h-screen">
        <MentorHeader />

        <main className="p-5">
          {/* TOP ACTIONS */}
          <div className="mb-3 flex items-center justify-between gap-3">
            <BackButton />

            <div className="flex items-center gap-2">
              <ActionButtons />
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div
              role="alert"
              className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0"
              />

              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  Unable to load student information
                </p>

                <p className="mt-1">{error}</p>
              </div>

              <button
                type="button"
                onClick={loadStudentProfile}
                disabled={isLoading || !studentId}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 font-medium hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RotateCcw size={14} />
                Retry
              </button>
            </div>
          )}

          {/* STUDENT DASHBOARD LAYOUT */}
          <div className="grid grid-cols-[270px_minmax(0,1fr)] items-start gap-3">
            {/* LEFT: STUDENT PROFILE */}
            <aside className="min-w-0 space-y-3">
              {isLoading && !student ? (
                <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-5">
                  <LoaderCircle
                    size={27}
                    className="animate-spin text-blue-600"
                  />

                  <p className="text-center text-sm text-slate-500">
                    Loading student profile...
                  </p>
                </div>
              ) : (
                <StudentAcademicsProfile
                  student={normalizedStudent}
                  mentor={normalizedMentor}
                />
              )}
            </aside>

            {/* RIGHT: ACADEMIC INFORMATION */}
            <section className="min-w-0 space-y-3">
              {/* STUDENT NAVIGATION */}
              <StudentTabs />

              {/* EXISTING ACADEMIC CONTENT */}
              <AcademicInformation />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Academics;