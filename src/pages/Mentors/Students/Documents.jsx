import React, { useCallback, useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  FileText,
  FolderOpen,
  CalendarDays,
  Files,
} from "lucide-react";

import api from "../../../api/axios";

import MentorSidebar from "../../../components/layouts/MentorSidebar";
import AdminSidebar from "../../../components/layouts/AdminSidebar";
import MentorHeader from "../../../components/layouts/MentorHeader";
import AdminHeader from "../../../components/layouts/AdminHeader";

import BackButton from "../../../components/Mentors/Students/Header/BackButton";
import AdminBackButton from "../../../components/Admin/Students/Header/AdminBackButton";
import ActionButtons from "../../../components/Mentors/Students/Header/ActionButtons";
import StudentTabs from "../../../components/Mentors/Students/Header/StudentTabs";
import AdminStudentTabs from "../../../components/Admin/Students/Header/AdminStudentTabs";

import StudentProfileSidebar from "../../../components/Mentors/Students/Sidebar/StudentProfileSidebar";

import DocumentStatCard from "../../../components/Mentors/Students/Documents/DocumentStatCard";
import StudentDocumentsTable from "../../../components/Mentors/Students/Documents/DocumentsTable/StudentDocumentsTable";
import MentorNote from "../../../components/Mentors/Students/Documents/MentorNote";

const getProfileApiRoot = (isAdminRoute) => isAdminRoute ? "/admin/student-profile" : "/mentor/students";

const DEFAULT_STATS = {
  totalDocuments: 0,
  totalCategories: 0,
  recentlyAdded: 0,
  totalFiles: 0,
};

const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

// ==========================================================
// STUDENT ID RESOLUTION
// ==========================================================

function resolveStudentId(value) {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (value && typeof value === "object") {
    return (
      resolveStudentId(value.studentId) ||
      resolveStudentId(value.id) ||
      resolveStudentId(value.student?.id) ||
      resolveStudentId(value.selectedStudent?.id) ||
      resolveStudentId(value.student?.studentId) ||
      ""
    );
  }

  return "";
}

const Documents = () => {
  const params = useParams();
  const location = useLocation();
  const isAdminRoute = (location.pathname.startsWith("/admin/overview/students/") || location.pathname.startsWith("/admin/mentor/"));
  const API = getProfileApiRoot(isAdminRoute);
  const [searchParams] = useSearchParams();

  const studentId =
    resolveStudentId(params.studentId) ||
    resolveStudentId(params.studentID) ||
    resolveStudentId(params.id) ||
    resolveStudentId(location.state?.studentId) ||
    resolveStudentId(location.state?.studentID) ||
    resolveStudentId(location.state?.student) ||
    resolveStudentId(location.state?.selectedStudent) ||
    resolveStudentId(location.state?.studentData) ||
    resolveStudentId(searchParams.get("studentId")) ||
    resolveStudentId(searchParams.get("studentID")) ||
    resolveStudentId(searchParams.get("id"));

  const [student, setStudent] = useState(
    location.state?.student ||
      location.state?.selectedStudent ||
      location.state?.mentee ||
      null
  );

  const [mentor, setMentor] = useState(null);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [categories, setCategories] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [loadingDocuments, setLoadingDocuments] = useState(true);

  const [dashboardError, setDashboardError] = useState("");
  const [documentsError, setDocumentsError] = useState("");

  // ==========================================================
  // API HELPER
  // ==========================================================

  const apiRequest = useCallback(async (url, options = {}) => {
    try {
      const response = await api.request({
        url,
        method: options.method || "GET",
        data: options.body,
        params: options.params,
        withCredentials: true,
        headers: options.headers,
      });

      return response.data;
    } catch (error) {
      console.error("Documents API request failed:", {
        url,
        status: error.response?.status,
        response: error.response?.data,
        message: error.message,
      });

      throw new Error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "The request failed."
      );
    }
  }, []);

  // ==========================================================
  // FETCH DASHBOARD
  // ==========================================================

  const fetchDashboard = useCallback(async () => {
    if (!studentId) {
      setDashboardError(
        "Student ID is missing. Open Documents from a selected student's profile."
      );
      setLoadingDashboard(false);
      return;
    }

    setLoadingDashboard(true);
    setDashboardError("");

    try {
      const response = await apiRequest(
        API +
          "/" +
          encodeURIComponent(studentId) +
          "/documents/dashboard"
      );

      const result = response?.data;

      if (!result) {
        throw new Error("The documents dashboard returned no data.");
      }

      setStudent((previous) => result.student || previous);
      setMentor(result.mentor || null);

      setStats({
        ...DEFAULT_STATS,
        ...(result.stats || {}),
      });

      setCategories(
        Array.isArray(result.categories) ? result.categories : []
      );
    } catch (error) {
      setDashboardError(error.message);
    } finally {
      setLoadingDashboard(false);
    }
  }, [studentId, apiRequest]);

  // ==========================================================
  // FETCH ALL DOCUMENTS
  // ==========================================================

  const fetchDocuments = useCallback(async () => {
    if (!studentId) {
      setDocuments([]);
      setLoadingDocuments(false);
      return;
    }

    setLoadingDocuments(true);
    setDocumentsError("");

    try {
      const query = {
        page,
        limit,
      };

      if (searchTerm.trim()) {
        query.search = searchTerm.trim();
      }

      if (selectedCategory) {
        query.category = selectedCategory;
      }

      if (selectedFileType) {
        query.fileType = selectedFileType;
      }

      const response = await apiRequest(
        API +
          "/" +
          encodeURIComponent(studentId) +
          "/documents",
        { params: query }
      );

      const result = response?.data;

      const list = Array.isArray(result?.documents)
        ? result.documents
        : Array.isArray(result)
          ? result
          : [];

      setDocuments(list);

      setPagination({
        ...DEFAULT_PAGINATION,
        ...(result?.pagination || {}),
        page: result?.pagination?.page ?? page,
        limit: result?.pagination?.limit ?? limit,
        total: result?.pagination?.total ?? list.length,
        totalPages:
          result?.pagination?.totalPages ??
          Math.ceil(
            (result?.pagination?.total ?? list.length) / limit
          ),
      });

      if (result?.student) {
        setStudent((previous) => result.student || previous);
      }

      if (result?.mentor) {
        setMentor(result.mentor);
      }
    } catch (error) {
      setDocuments([]);
      setPagination({
        ...DEFAULT_PAGINATION,
        page,
        limit,
      });

      setDocumentsError(error.message);
    } finally {
      setLoadingDocuments(false);
    }
  }, [
    studentId,
    page,
    limit,
    searchTerm,
    selectedCategory,
    selectedFileType,
    apiRequest,
  ]);

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // ==========================================================
  // SEARCH AND FILTERS
  // ==========================================================

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setPage(1);
  };

  const handleFileTypeChange = (value) => {
    setSelectedFileType(value);
    setPage(1);
  };

  const handlePageChange = (nextPage) => {
    const maxPage = Math.max(1, pagination.totalPages || 1);

    setPage(Math.max(1, Math.min(nextPage, maxPage)));
  };

  const handleRefresh = () => {
    fetchDashboard();
    fetchDocuments();
  };

  // ==========================================================
  // INVALID STUDENT ID
  // ==========================================================

  if (!studentId) {
    return (
      <div className="min-h-screen bg-slate-100">
        {isAdminRoute ? <AdminSidebar /> : <MentorSidebar />}

        <div className="ml-[290px] min-h-screen">
          {isAdminRoute ? <AdminHeader /> : <MentorHeader />}

          <main className="p-6">
            <div className="rounded-xl border border-amber-200 bg-white p-6">
              <h2 className="text-sm font-semibold text-slate-900">
                Student not selected
              </h2>

              <p className="mt-1 text-xs text-slate-600">
                Open Documents from a selected student's profile to
                load the correct student ID.
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-slate-100">
      {isAdminRoute ? <AdminSidebar /> : <MentorSidebar />}

      <div className="ml-[290px] min-h-screen">
        {isAdminRoute ? <AdminHeader /> : <MentorHeader />}

        <main className="p-6">
          {/* HEADER ACTIONS */}

          <div className="mb-4 flex items-center justify-between">
            {isAdminRoute ? <AdminBackButton /> : <BackButton />}
            <ActionButtons />
          </div>

          {/* API ERRORS */}

          {dashboardError && (
            <div
              role="alert"
              className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
            >
              <span>{dashboardError}</span>

              <button
                type="button"
                onClick={fetchDashboard}
                disabled={loadingDashboard}
                className="shrink-0 font-semibold underline disabled:opacity-50"
              >
                Retry
              </button>
            </div>
          )}

          {documentsError && (
            <div
              role="alert"
              className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"
            >
              <span>{documentsError}</span>

              <button
                type="button"
                onClick={fetchDocuments}
                disabled={loadingDocuments}
                className="shrink-0 font-semibold underline disabled:opacity-50"
              >
                Retry
              </button>
            </div>
          )}

          {/* DASHBOARD LAYOUT */}

          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-2">
            {/* STUDENT PROFILE */}

            <div className="flex flex-col gap-2">
              <StudentProfileSidebar
                student={student}
                mentor={mentor}
              />
            </div>

            {/* MAIN CONTENT */}

            <div className="flex min-w-0 flex-col gap-2">
              {isAdminRoute ? <AdminStudentTabs /> : <StudentTabs />}

              {/* STATISTICS */}

              <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
                <DocumentStatCard
                  icon={FileText}
                  iconBg="bg-blue-100"
                  iconColor="text-blue-600"
                  title="Total Documents"
                  value={
                    loadingDashboard ? "—" : stats.totalDocuments
                  }
                  subtitle="All documents uploaded"
                />

                <DocumentStatCard
                  icon={FolderOpen}
                  iconBg="bg-green-100"
                  iconColor="text-green-600"
                  title="Total Categories"
                  value={
                    loadingDashboard ? "—" : stats.totalCategories
                  }
                  subtitle="Different categories"
                />

                <DocumentStatCard
                  icon={CalendarDays}
                  iconBg="bg-orange-100"
                  iconColor="text-orange-600"
                  title="Recently Added"
                  value={
                    loadingDashboard ? "—" : stats.recentlyAdded
                  }
                  subtitle="In the last 7 days"
                />

                <DocumentStatCard
                  icon={Files}
                  iconBg="bg-violet-100"
                  iconColor="text-violet-600"
                  title="Total Files"
                  value={
                    loadingDashboard ? "—" : stats.totalFiles
                  }
                  subtitle="Across all categories"
                />
              </div>

              {/* ALL STUDENT DOCUMENTS */}

              <StudentDocumentsTable
                documents={documents}
                categories={categories}
                loading={loadingDocuments}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                selectedFileType={selectedFileType}
                onFileTypeChange={handleFileTypeChange}
                pagination={pagination}
                onPageChange={handlePageChange}
                onRefresh={handleRefresh}
              />

              <MentorNote />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Documents;