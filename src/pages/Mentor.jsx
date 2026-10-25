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
import StudentMentoringAttendance from "../components/Mentor/StudentMentoringAttendance";

/* ==========================================================
   NORMALIZE MEETINGS API RESPONSE
   Supports common API response wrappers and preserves
   saved mentor feedback from the backend.
========================================================== */

const normalizeMeetingsResponse = (response) => {
  let payload = response?.data ?? response;

  // Unwrap common API envelopes, such as:
  // { success, message, data: [...] }
  // { data: { meetings: [...] } }
  for (let i = 0; i < 5; i += 1) {
    if (
      payload &&
      !Array.isArray(payload) &&
      typeof payload === "object" &&
      payload.data !== undefined &&
      (
        payload.success !== undefined ||
        payload.message !== undefined ||
        Object.keys(payload).length === 1
      )
    ) {
      payload = payload.data;
    } else {
      break;
    }
  }

  let meetingList = [];

  if (Array.isArray(payload)) {
    meetingList = payload;
  } else if (Array.isArray(payload?.meetings)) {
    meetingList = payload.meetings;
  } else if (Array.isArray(payload?.items)) {
    meetingList = payload.items;
  } else if (Array.isArray(payload?.data)) {
    meetingList = payload.data;
  } else if (Array.isArray(payload?.data?.meetings)) {
    meetingList = payload.data.meetings;
  }

  return meetingList.map((meeting) => {
    const rawMeeting = meeting?.rawMeeting ?? meeting;

    // Preserve the feedback relation regardless of whether the
    // backend uses snake_case or camelCase naming.
    const mentorFeedback =
      meeting?.mentor_meeting_feedback ??
      meeting?.mentorMeetingFeedback ??
      meeting?.mentor_feedback ??
      meeting?.mentorFeedback ??
      rawMeeting?.mentor_meeting_feedback ??
      rawMeeting?.mentorMeetingFeedback ??
      rawMeeting?.mentor_feedback ??
      rawMeeting?.mentorFeedback ??
      null;

    return {
      ...meeting,

      // Explicit aliases for frontend components.
      mentor_meeting_feedback: mentorFeedback,
      mentorMeetingFeedback: mentorFeedback,

      // Retain the original backend response.
      rawMeeting,
    };
  });
};

/* ==========================================================
   MENTOR & MENTEE PAGE
========================================================== */

const Mentor = () => {
  /* ========================================================
     ASSIGNED MENTOR AND STUDENT
  ======================================================== */

  const [mentorData, setMentorData] = useState(null);
  const [loadingMentor, setLoadingMentor] = useState(true);
  const [mentorError, setMentorError] = useState("");

  /* ========================================================
     STUDENT MEETINGS
  ======================================================== */

  const [meetings, setMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(true);
  const [meetingsError, setMeetingsError] = useState("");

  /* ========================================================
     FETCH ASSIGNED MENTOR
  ======================================================== */

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

  /* ========================================================
     FETCH MEETINGS FOR AUTHENTICATED STUDENT
  ======================================================== */

  const fetchMeetings = useCallback(async () => {
    try {
      setLoadingMeetings(true);
      setMeetingsError("");

      const response =
        await menteeMeetingsService.getMeetings();

      const meetingList =
        normalizeMeetingsResponse(response);

      // Diagnostic logging: verify the actual feedback returned
      // by the student meetings endpoint.
      console.log(
        "[Student Mentor Page] Meetings received:",
        meetingList
      );

      console.log(
        "[Student Mentor Page] Saved mentor feedback:",
        meetingList.map((meeting) => ({
          id: meeting.id ?? meeting.meetingId,
          title: meeting.title,
          feedback:
            meeting.mentor_meeting_feedback ??
            meeting.mentorMeetingFeedback ??
            meeting.rawMeeting?.mentor_meeting_feedback ??
            null,
        }))
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

  /* ========================================================
     INITIAL DATA FETCH
  ======================================================== */

  useEffect(() => {
    fetchMyMentor();

    fetchMeetings().catch(() => {
      // The error is displayed through meetingsError.
    });
  }, [fetchMyMentor, fetchMeetings]);

  /* ========================================================
     PAGE
  ======================================================== */

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[290px] flex min-h-screen flex-col">
        {/* Header */}
        <Header />

        {/* Mentor Page Content */}
        <main className="flex-1 space-y-4 px-4 py-4">
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

          {/* Student's mentoring attendance summary. This is additive; existing page sections are unchanged. */}
          <StudentMentoringAttendance />

          {/* Mentor, Mentee and Relationship Summary */}
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 lg:col-span-4">
              <MentorCard
                mentorData={mentorData}
                loading={loadingMentor}
              />
            </div>

            <div className="col-span-12 lg:col-span-4">
              <MenteeCard
                mentorData={mentorData}
                loading={loadingMentor}
              />
            </div>

            <div className="col-span-12 lg:col-span-4">
              <RelationshipSummary
                mentorData={mentorData}
                loading={loadingMentor}
              />
            </div>
          </div>

          {/* Meetings and Discussion */}
          <div className="grid grid-cols-12 items-stretch gap-3">
            {/* Left Column */}
            <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
              <UpcomingMeeting
                meetings={meetings}
                loading={loadingMeetings}
                error={meetingsError}
                onRefresh={fetchMeetings}
              />

              <Discussion />
            </div>

            {/* Right Column: Recent Meetings */}
            <div className="col-span-12 flex lg:col-span-8">
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