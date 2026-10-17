import React, { useCallback, useEffect, useState } from "react";

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

import MentorCard from "../components/Mentor/MentorCard";
import MenteeCard from "../components/Mentor/MenteeCard";
import RelationshipSummary from "../components/Mentor/RelationshipSummary";

import UpcomingMeeting from "../components/Mentor/UpcomingMeeting";
import RecentMeetings from "../components/Mentor/RecentMeetings";
import Discussion from "../components/Mentor/Discussion";

import { getMyMentor } from "../api/mentor.api";
import menteeMeetingsService from "../api/menteeMeetings.api";

// ==========================================================
// NORMALIZE MEETINGS API RESPONSE
// Supports common API response wrappers.
// ==========================================================

const normalizeMeetingsResponse = (response) => {
  const payload = response?.data ?? response;

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.meetings)) {
    return payload.meetings;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.meetings)) {
    return payload.data.meetings;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
};

const Mentor = () => {
  // ========================================================
  // STUDENT AND ASSIGNED MENTOR
  // ========================================================

  const [mentorData, setMentorData] = useState(null);
  const [loadingMentor, setLoadingMentor] = useState(true);
  const [mentorError, setMentorError] = useState("");

  // ========================================================
  // STUDENT MEETINGS
  // ========================================================

  const [meetings, setMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(true);
  const [meetingsError, setMeetingsError] = useState("");

  // ========================================================
  // FETCH STUDENT AND ASSIGNED MENTOR
  // ========================================================

  const fetchMyMentor = useCallback(async () => {
    try {
      setLoadingMentor(true);
      setMentorError("");

      const data = await getMyMentor();

      setMentorData(data);
    } catch (error) {
      console.error(
        "Failed to fetch mentor and student details:",
        error
      );

      setMentorError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load your mentor and student details. Please try again."
      );
    } finally {
      setLoadingMentor(false);
    }
  }, []);

  // ========================================================
  // FETCH MEETINGS FOR THE AUTHENTICATED STUDENT
  // ========================================================

  const fetchMeetings = useCallback(async () => {
    try {
      setLoadingMeetings(true);
      setMeetingsError("");

      const response = await menteeMeetingsService.getMeetings();

      const meetingList = normalizeMeetingsResponse(response);

      console.log(
        "[Student Mentor Page] Meetings received:",
        meetingList
      );

      setMeetings(meetingList);

      return meetingList;
    } catch (error) {
      console.error(
        "Failed to fetch student meetings:",
        error
      );

      setMeetingsError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to load your meetings. Please try again."
      );

      setMeetings([]);

      throw error;
    } finally {
      setLoadingMeetings(false);
    }
  }, []);

  // ========================================================
  // INITIAL DATA FETCH
  // ========================================================

  useEffect(() => {
    fetchMyMentor();
    fetchMeetings();
  }, [fetchMyMentor, fetchMeetings]);

  // ========================================================
  // PAGE
  // ========================================================

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[290px] min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Mentor Page Content */}
        <main className="flex-1 px-4 py-4 space-y-4">
          {/* Page Heading */}
          <div>
            <h1 className="text-[22px] font-bold text-[#142970]">
              Mentor &amp; Mentee
            </h1>

            <p className="text-[12px] text-slate-500">
              Connect, collaborate and grow together.
            </p>
          </div>

          {/* Mentor API Error */}
          {mentorError && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              <p>{mentorError}</p>

              <button
                type="button"
                onClick={fetchMyMentor}
                disabled={loadingMentor}
                className="mt-2 font-semibold underline disabled:opacity-50"
              >
                {loadingMentor ? "Retrying..." : "Try again"}
              </button>
            </div>
          )}

          {/* First Row */}
          <div className="grid grid-cols-12 gap-3">
            {/* Assigned Mentor */}
            <div className="col-span-12 lg:col-span-4">
              <MentorCard
                mentorData={mentorData}
                loading={loadingMentor}
              />
            </div>

            {/* Logged-in Student */}
            <div className="col-span-12 lg:col-span-4">
              <MenteeCard
                mentorData={mentorData}
                loading={loadingMentor}
              />
            </div>

            {/* Relationship Summary */}
            <div className="col-span-12 lg:col-span-4">
              <RelationshipSummary
                mentorData={mentorData}
                loading={loadingMentor}
              />
            </div>
          </div>

          {/* Meetings and Discussion */}
          <div className="grid grid-cols-12 gap-3 items-stretch">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
              {/* Upcoming Meetings */}
              <div>
                <UpcomingMeeting
                  meetings={meetings}
                  loading={loadingMeetings}
                  error={meetingsError}
                  onRefresh={fetchMeetings}
                />
              </div>

              {/* Discussion */}
              <div>
                <Discussion />
              </div>
            </div>

            {/* Right Column: Recent Meetings */}
            <div className="col-span-12 lg:col-span-8 flex">
              <div className="w-full [&>*]:h-full">
                <RecentMeetings
                  meetings={meetings}
                  loading={loadingMeetings}
                  error={meetingsError}
                  onRefresh={fetchMeetings}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Mentor;