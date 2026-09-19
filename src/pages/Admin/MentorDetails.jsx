import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import AdminSidebar from "../../components/layouts/AdminSidebar";
import AdminHeader from "../../components/layouts/AdminHeader";

import MentorDetailsHeader from "../../components/Admin/MentorDetails/MentorDetailsHeader";
import MentorProfileCard from "../../components/Admin/MentorDetails/MentorProfileCard";
import MentorStats from "../../components/Admin/MentorDetails/MentorStats";
import MentorTabs from "../../components/Admin/MentorDetails/MentorTabs";

import StudentsTab from "../../components/Admin/MentorDetails/Students/StudentsTab";

import { getMentorDetails } from "../../api/mentor.api";

const MentorDetails = () => {
  const { mentorId } = useParams();

  const [activeTab, setActiveTab] = useState("students");

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadMentor = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getMentorDetails(mentorId);

        if (mounted) {
          setData(result);
        }
      } catch (err) {
        console.error("Failed to load mentor details:", err);

        if (mounted) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to load mentor details.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (mentorId) {
      loadMentor();
    }

    return () => {
      mounted = false;
    };
  }, [mentorId]);

  const mentor = data?.mentor || null;

  const stats = data?.stats || {};

  const students = data?.students || [];

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="ml-[290px] flex min-h-screen flex-col">
        <AdminHeader />

        <main className="flex-1 space-y-5 px-6 py-5">
          <MentorDetailsHeader />

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <>
              <div className="h-[190px] animate-pulse rounded-2xl bg-white" />

              <div className="h-[190px] animate-pulse rounded-2xl bg-white" />
            </>
          ) : !mentor ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Mentor details could not be found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
                <div className="xl:col-span-4">
                  <MentorProfileCard mentor={mentor} />
                </div>

                <div className="xl:col-span-8">
                  <MentorStats stats={stats} />
                </div>
              </div>

              <MentorTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              {activeTab === "students" && <StudentsTab students={students} />}

              {activeTab === "overview" && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
                  Mentor overview is based on the current HOD mentor and
                  assignment data.
                </div>
              )}

              {activeTab === "meetings" && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
                  Meeting data is not available in the current HOD schema.
                </div>
              )}

              {activeTab === "reports" && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
                  Reports data is not available in the current HOD schema.
                </div>
              )}

              {activeTab === "documents" && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">
                  Mentor document data is not available in the current HOD
                  schema.
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
