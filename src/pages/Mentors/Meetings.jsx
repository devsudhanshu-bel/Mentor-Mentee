import React, { useState } from "react";

import MentorSidebar from "../../components/layouts/MentorSidebar";
import MentorHeader from "../../components/layouts/MentorHeader";

import MeetingHeader from "../../components/Mentors/Meetings/MeetingHeader";
import MeetingActions from "../../components/Mentors/Meetings/MeetingActions";
import UpcomingMeetings from "../../components/Mentors/Meetings/UpcomingMeetings";
import RecentMeetings from "../../components/Mentors/Meetings/RecentMeetings";
import MeetingSummary from "../../components/Mentors/Meetings/MeetingSummary";
import MeetingGuidelines from "../../components/Mentors/Meetings/MeetingGuidelines";

import ScheduleMeetingModal from "../../components/Mentors/Meetings/ScheduleMeetingModal";
import RecurringMeetingModal from "../../components/Mentors/Meetings/RecurringMeetingModal";
import InstantMeetingModal from "../../components/Mentors/Meetings/InstantMeetingModal";
import StartMeetingModal from "../../components/Mentors/Meetings/StartMeetingModal";
import MeetingWorkspaceModal from "../../components/Mentors/Meetings/MeetingWorkspaceModal";
import MeetingScheduledSuccessModal from "../../components/Mentors/Meetings/MeetingScheduledSuccessModal";

import FloatingDiscussionButton from "../../components/Mentors/Discussion/FloatingDiscussionButton";
import DiscussionDrawer from "../../components/Mentors/Discussion/DiscussionDrawer";

const Meetings = () => {

  /* ==========================================================
     Discussion Drawer
  ========================================================== */

  const [isDiscussionOpen, setIsDiscussionOpen] =
    useState(false);

  /* ==========================================================
     Meeting Creation
  ========================================================== */

  const [
    isScheduleMeetingOpen,
    setIsScheduleMeetingOpen,
  ] = useState(false);

  const [
    isRecurringMeetingOpen,
    setIsRecurringMeetingOpen,
  ] = useState(false);

  const [
    isInstantMeetingOpen,
    setIsInstantMeetingOpen,
  ] = useState(false);

  /* ==========================================================
     Start Meeting Modal
  ========================================================== */

  const [
    isStartMeetingOpen,
    setIsStartMeetingOpen,
  ] = useState(false);

  const [
    selectedMeeting,
    setSelectedMeeting,
  ] = useState(null);

  /* ==========================================================
     Meeting Workspace Popup
  ========================================================== */

  const [
    isWorkspaceOpen,
    setIsWorkspaceOpen,
  ] = useState(false);

  const [
    activeMeeting,
    setActiveMeeting,
  ] = useState(null);

  /* ==========================================================
     Success Modal
  ========================================================== */

  const [
    isMeetingSuccessOpen,
    setIsMeetingSuccessOpen,
  ] = useState(false);

  const [
    meetingData,
    setMeetingData,
  ] = useState(null);

  /* ==========================================================
     Handlers
  ========================================================== */

  const handleMeetingSuccess = (meeting) => {

    setMeetingData(meeting);

    setIsMeetingSuccessOpen(true);

  };

  const handleOpenStartMeeting = (meeting) => {

    setSelectedMeeting(meeting);

    setIsStartMeetingOpen(true);

  };

  const handleLaunchWorkspace = (meeting) => {

    setActiveMeeting(meeting);

    setIsWorkspaceOpen(true);

  };

  const closeWorkspace = () => {

    setIsWorkspaceOpen(false);

    setActiveMeeting(null);

  };

  return (
    <>

      <div className="min-h-screen bg-slate-100">

        {/* Sidebar */}

        <MentorSidebar />

        {/* Main Content */}

        <div className="ml-[290px] min-h-screen">

          <MentorHeader />

          <main className="space-y-2 px-6 py-5">

            <MeetingHeader />

            <MeetingActions
              onScheduleMeeting={() =>
                setIsScheduleMeetingOpen(true)
              }
              onRecurringMeeting={() =>
                setIsRecurringMeetingOpen(true)
              }
              onInstantMeeting={() =>
                setIsInstantMeetingOpen(true)
              }
            />

            <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">

              <UpcomingMeetings
                onStartMeeting={
                  handleOpenStartMeeting
                }
              />

              <RecentMeetings />

            </div>

            <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">

              <MeetingSummary />

              <MeetingGuidelines />

            </div>

          </main>

        </div>

      </div>
            {/* ==========================================================
          Discussion Drawer
      ========================================================== */}

      <DiscussionDrawer
        isOpen={isDiscussionOpen}
        setIsDiscussionOpen={setIsDiscussionOpen}
      />

      {/* ==========================================================
          Start Meeting Modal
      ========================================================== */}

      <StartMeetingModal
        open={isStartMeetingOpen}
        meeting={selectedMeeting}
        onClose={() => {
          setIsStartMeetingOpen(false);
          setSelectedMeeting(null);
        }}
        onStartMeeting={(meeting) => {

          /* Close Confirmation Modal */

          setIsStartMeetingOpen(false);

          /* Open Workspace */

          handleLaunchWorkspace(meeting);

        }}
      />

      {/* ==========================================================
          Meeting Workspace Popup
      ========================================================== */}

      <MeetingWorkspaceModal
        open={isWorkspaceOpen}
        meeting={activeMeeting}
        onClose={closeWorkspace}
      />

      {/* ==========================================================
          Schedule Meeting Modal
      ========================================================== */}

      <ScheduleMeetingModal
        open={isScheduleMeetingOpen}
        onClose={() =>
          setIsScheduleMeetingOpen(false)
        }
        onMeetingSuccess={(meeting) => {

          setIsScheduleMeetingOpen(false);

          handleMeetingSuccess(meeting);

        }}
      />

      {/* ==========================================================
          Recurring Meeting Modal
      ========================================================== */}

      <RecurringMeetingModal
        open={isRecurringMeetingOpen}
        onClose={() =>
          setIsRecurringMeetingOpen(false)
        }
        onMeetingSuccess={(meeting) => {

          setIsRecurringMeetingOpen(false);

          handleMeetingSuccess(meeting);

        }}
      />

      {/* ==========================================================
          Instant Meeting Modal
      ========================================================== */}

      <InstantMeetingModal
        open={isInstantMeetingOpen}
        onClose={() =>
          setIsInstantMeetingOpen(false)
        }
        onMeetingSuccess={(meeting) => {

          setIsInstantMeetingOpen(false);

          handleMeetingSuccess(meeting);

        }}
      />

      {/* ==========================================================
          Meeting Scheduled Success Modal
      ========================================================== */}

      <MeetingScheduledSuccessModal
        open={isMeetingSuccessOpen}
        meeting={meetingData}
        onClose={() => {

          setIsMeetingSuccessOpen(false);

          setMeetingData(null);

        }}
      />

      {/* ==========================================================
          Floating Discussion Button
      ========================================================== */}

      <FloatingDiscussionButton
        isOpen={isDiscussionOpen}
        setIsDiscussionOpen={setIsDiscussionOpen}
      />

    </>
  );
};

export default Meetings;