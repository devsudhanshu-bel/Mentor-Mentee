import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import MentorDetailsHeader from "../../components/Admin/MentorDetails/MentorDetailsHeader";
import MentorProfileCard from "../../components/Admin/MentorDetails/MentorProfileCard";
import MentorStats from "../../components/Admin/MentorDetails/MentorStats";
import MentorTabs from "../../components/Admin/MentorDetails/MentorTabs";

import StudentsTab from "../../components/Admin/MentorDetails/Students/StudentsTab";
import MeetingsTab from "../../components/Admin/MentorDetails/MeetingsTab";

import {
  getMentorDetails,
  getMentorMeetings,
} from "../../api/mentor.api";

// ==========================================================
// MENTOR DETAILS PAGE
// ==========================================================

const MentorDetails = () => {
  const { mentorId } = useParams();

  // --------------------------------------------------------
  // STATE
  // --------------------------------------------------------

  const [activeTab, setActiveTab] = useState("students");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [meetings, setMeetings] = useState([]);
  const [meetingsLoading, setMeetingsLoading] = useState(false);
  const [meetingsError, setMeetingsError] = useState("");
  const [meetingsRefreshKey, setMeetingsRefreshKey] = useState(0);

  // --------------------------------------------------------
  // LOAD MENTOR DETAILS
  // --------------------------------------------------------

  const loadMentor = useCallback(async () => {
    if (!mentorId) {
      setData(null);
      setError("Mentor ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = await getMentorDetails(mentorId);

      if (!payload?.mentor) {
        throw new Error("Mentor details could not be found.");
      }

      setData(payload);
    } catch (err) {
      console.error("Failed to load mentor details:", err);

      setData(null);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load mentor details."
      );
    } finally {
      setLoading(false);
    }
  }, [mentorId]);

  useEffect(() => {
    let cancelled = false;

    const fetchMentor = async () => {
      if (!mentorId) {
        setData(null);
        setError("Mentor ID is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const payload = await getMentorDetails(mentorId);

        if (cancelled) return;

        if (!payload?.mentor) {
          throw new Error("Mentor details could not be found.");
        }

        setData(payload);
      } catch (err) {
        if (cancelled) return;

        console.error("Failed to load mentor details:", err);

        setData(null);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load mentor details."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchMentor();

    return () => {
      cancelled = true;
    };
  }, [mentorId]);

  // --------------------------------------------------------
  // LOAD MEETINGS WHEN THE MEETINGS TAB IS ACTIVE
  // --------------------------------------------------------

  useEffect(() => {
    if (activeTab !== "meetings" || !mentorId) {
      return undefined;
    }

    let cancelled = false;

    const fetchMeetings = async () => {
      setMeetingsLoading(true);
      setMeetingsError("");

      try {
        const result = await getMentorMeetings(mentorId);

        if (cancelled) return;

        setMeetings(Array.isArray(result) ? result : []);
      } catch (err) {
        if (cancelled) return;

        console.error("Failed to load mentor meetings:", err);

        setMeetings([]);
        setMeetingsError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load mentor meetings."
        );
      } finally {
        if (!cancelled) {
          setMeetingsLoading(false);
        }
      }
    };

    fetchMeetings();

    return () => {
      cancelled = true;
    };
  }, [activeTab, mentorId, meetingsRefreshKey]);

  // --------------------------------------------------------
  // NORMALIZE API DATA
  // --------------------------------------------------------

  const mentor = data?.mentor ?? null;
  const stats = data?.metrics ?? data?.stats ?? {};

  const students = Array.isArray(data?.students)
    ? data.students
    : [];

  // --------------------------------------------------------
  // REFRESH MEETINGS
  // --------------------------------------------------------

  const refreshMeetings = useCallback(() => {
    setMeetingsRefreshKey((current) => current + 1);
  }, []);

  // --------------------------------------------------------
  // RENDER
  // --------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="ml-[290px] flex min-h-screen flex-col">
        <AdminHeader />

        <main className="flex-1 space-y-5 px-6 py-5">
          <MentorDetailsHeader />

          {/* Mentor details error */}
          {error && (
            <div
              role="alert"
              className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
            >
              <p>{error}</p>

              <button
                type="button"
                onClick={loadMentor}
                disabled={loading}
                className="self-start rounded-lg border border-red-200 bg-white px-3 py-2 font-semibold transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:self-center"
              >
                {loading ? "Retrying..." : "Retry"}
              </button>
            </div>
          )}

          {/* Mentor details loading */}
          {loading ? (
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
                <div className="h-[190px] animate-pulse rounded-2xl border border-slate-200 bg-white xl:col-span-4" />

                <div className="h-[190px] animate-pulse rounded-2xl border border-slate-200 bg-white xl:col-span-8" />
              </div>

              <div className="h-[66px] animate-pulse rounded-2xl border border-slate-200 bg-white" />

              <div className="h-[250px] animate-pulse rounded-2xl border border-slate-200 bg-white" />
            </div>
          ) : !mentor ? (
            /* Mentor not found */
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Mentor Not Found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {error ||
                  "Mentor details could not be found. Please verify the mentor ID and try again."}
              </p>

              {!error && (
                <button
                  type="button"
                  onClick={loadMentor}
                  className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Try Again
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Mentor profile and statistics */}
              <section className="grid grid-cols-1 gap-3 xl:grid-cols-12">
                <div className="min-w-0 xl:col-span-4">
                  <MentorProfileCard mentor={mentor} />
                </div>

                <div className="min-w-0 xl:col-span-8">
                  <MentorStats stats={stats} />
                </div>
              </section>

              {/* Tab navigation */}
              <MentorTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {/* Students tab */}
              {activeTab === "students" && (
                <div
                  id="mentor-panel-students"
                  role="tabpanel"
                  aria-labelledby="mentor-tab-students"
                  tabIndex={0}
                  className="min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <StudentsTab
                    students={students}
                    mentorId={mentorId}
                  />
                </div>
              )}

              {/* Meetings tab */}
              {activeTab === "meetings" && (
                <div
                  id="mentor-panel-meetings"
                  role="tabpanel"
                  aria-labelledby="mentor-tab-meetings"
                  tabIndex={0}
                  className="min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <MeetingsTab
                    meetings={meetings}
                    loading={meetingsLoading}
                    error={meetingsError}
                    onRefresh={refreshMeetings}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default MentorDetails;