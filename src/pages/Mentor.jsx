
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

  // Unwrap common API envelopes.
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

    // Preserve feedback regardless of backend naming convention.
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

      mentor_meeting_feedback: mentorFeedback,
      mentorMeetingFeedback: mentorFeedback,

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

      // Diagnostic logging.
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
      // Error is displayed through meetingsError.
    });
  }, [fetchMyMentor, fetchMeetings]);

  /* ========================================================
     PAGE
  ======================================================== */

  return (
    <div className="min-h-screen w-full bg-slate-100 overflow-x-hidden">
      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div
        className="
          ml-0
          w-full
          lg:ml-[290px]
          lg:w-[calc(100%-290px)]
          min-h-screen
          flex
          flex-col
          min-w-0
        "
      >
        {/* HEADER */}

        <Header />

        {/* MENTOR PAGE CONTENT */}

        <main
          className="
            flex-1
            w-full
            min-w-0
            space-y-4
            px-3
            py-3
            sm:px-4
            sm:py-4
            lg:px-5
            lg:py-5
          "
        >
          {/* PAGE HEADING */}

          <div className="min-w-0">
            <h1
              className="
                text-[20px]
                sm:text-[22px]
                font-bold
                text-[#142970]
              "
            >
              Mentor &amp; Mentee
            </h1>

            <p className="text-[11px] sm:text-[12px] text-slate-500 mt-1">
              Connect, collaborate and grow together.
            </p>
          </div>

          {/* MENTOR API ERROR */}

          {mentorError && (
            <div
              role="alert"
              className="
                rounded-lg
                border
                border-red-200
                bg-red-50
                px-3
                sm:px-4
                py-3
                text-xs
                sm:text-sm
                text-red-700
                break-words
              "
            >
              <p>{mentorError}</p>

              <button
                type="button"
                onClick={fetchMyMentor}
                disabled={loadingMentor}
                className="
                  mt-2
                  font-semibold
                  underline
                  disabled:opacity-50
                "
              >
                {loadingMentor ? "Retrying..." : "Try again"}
              </button>
            </div>
          )}

          {/* STUDENT MENTORING ATTENDANCE */}

          <div className="w-full min-w-0">
            <StudentMentoringAttendance />
          </div>

          {/* MENTOR, MENTEE AND RELATIONSHIP SUMMARY */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-3
              w-full
              min-w-0
            "
          >
            <div className="min-w-0 w-full">
              <MentorCard
                mentorData={mentorData}
                loading={loadingMentor}
              />
            </div>

            <div className="min-w-0 w-full">
              <MenteeCard
                mentorData={mentorData}
                loading={loadingMentor}
              />
            </div>

            <div className="min-w-0 w-full md:col-span-2 xl:col-span-1">
              <RelationshipSummary
                mentorData={mentorData}
                loading={loadingMentor}
              />
            </div>
          </div>

          {/* MEETINGS AND DISCUSSION */}

          <div
            className="
              grid
              grid-cols-1
              xl:grid-cols-12
              items-stretch
              gap-3
              w-full
              min-w-0
            "
          >
            {/* LEFT COLUMN */}

            <div
              className="
                col-span-1
                xl:col-span-4
                flex
                flex-col
                gap-4
                min-w-0
              "
            >
              <div className="w-full min-w-0">
                <UpcomingMeeting
                  meetings={meetings}
                  loading={loadingMeetings}
                  error={meetingsError}
                  onRefresh={fetchMeetings}
                />
              </div>

              <div className="w-full min-w-0">
                <Discussion />
              </div>
            </div>

            {/* RIGHT COLUMN: RECENT MEETINGS */}

            <div
              className="
                col-span-1
                xl:col-span-8
                flex
                min-w-0
                w-full
              "
            >
              <div className="w-full min-w-0 [&>*]:h-full">
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
