import React, { useEffect, useMemo, useState } from "react";

import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceSidebar from "./WorkspaceSidebar";
import WorkspaceRightPanel from "./WorkspaceRightPanel";

import NotesTab from "./NotesTab";
import DiscussionTab from "./DiscussionTab";
import ActionItemsTab from "./ActionItemsTab";
import ResourcesTab from "./ResourcesTab";
import FeedbackTab from "./FeedbackTab";
import FollowUpTab from "./FollowUpTab";

const MeetingWorkspaceModal = ({
  open,
  onClose,
  meeting,
}) => {
  /* ============================================================
      ACTIVE TAB
  ============================================================ */

  const [activeTab, setActiveTab] =
    useState("notes");

  /* ============================================================
      TIMER
  ============================================================ */

  const [seconds, setSeconds] =
    useState(0);

  useEffect(() => {
    if (!open) return;

    setSeconds(0);

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  const duration = useMemo(() => {
    const hrs = String(
      Math.floor(seconds / 3600)
    ).padStart(2, "0");

    const mins = String(
      Math.floor((seconds % 3600) / 60)
    ).padStart(2, "0");

    const secs = String(
      seconds % 60
    ).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  }, [seconds]);

  /* ============================================================
      NOTES
  ============================================================ */

  const [notes, setNotes] = useState(`Meeting Agenda

• Academic Performance Review

• Internship Progress

• Placement Preparation

• Research Discussion

----------------------------------------------------

Discussion

`);

  const [lastSaved, setLastSaved] =
    useState("Not Saved");

  const saveNotes = () => {
    const now = new Date();

    setLastSaved(
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  /* ============================================================
      DISCUSSION
  ============================================================ */

  const [discussionPoints, setDiscussionPoints] =
    useState([
      "Reviewed Semester Results",
      "Internship Opportunities",
      "Mini Project Progress",
    ]);

  /* ============================================================
      ACTION ITEMS
  ============================================================ */

  const [actionItems, setActionItems] =
    useState([
      {
        task: "Complete Resume",
        completed: false,
      },
      {
        task: "Solve 20 DSA Problems",
        completed: false,
      },
      {
        task: "Upload Project Documentation",
        completed: true,
      },
    ]);

  /* ============================================================
      RESOURCES
  ============================================================ */

  const [resources, setResources] =
    useState([
      "Placement Roadmap.pdf",
      "Operating Systems Notes",
      "Research Paper Template",
    ]);

  /* ============================================================
      FEEDBACK
  ============================================================ */

  const [rating, setRating] =
    useState(4);

  const [feedback, setFeedback] =
    useState("");

  /* ============================================================
      FOLLOW UP
  ============================================================ */

  const [followUp, setFollowUp] =
    useState({
      date: "",
      time: "",
      agenda: "",
    });

  /* ============================================================
      CLOSE MODAL
  ============================================================ */

  if (!open) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
      />

      {/* Modal */}

      <div className="fixed inset-6 z-[9999] overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <WorkspaceHeader
          meeting={meeting}
          duration={duration}
          onClose={onClose}
          onSaveMeeting={saveNotes}
          onEndMeeting={onClose}
        />

        {/* Workspace */}

        <div className="grid h-[calc(100%-72px)] grid-cols-[210px_1fr_300px]">

          <WorkspaceSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Center Workspace */}

          <div className="overflow-y-auto bg-white">
                        {/* ===================== NOTES ===================== */}

            {activeTab === "notes" && (
              <NotesTab
                notes={notes}
                setNotes={setNotes}
                saveNotes={saveNotes}
                lastSaved={lastSaved}
              />
            )}

            {/* ===================== DISCUSSION ===================== */}

            {activeTab === "discussion" && (
              <DiscussionTab
                discussionPoints={discussionPoints}
                setDiscussionPoints={setDiscussionPoints}
              />
            )}

            {/* ===================== ACTION ITEMS ===================== */}

            {activeTab === "actions" && (
              <ActionItemsTab
                actionItems={actionItems}
                setActionItems={setActionItems}
              />
            )}

            {/* ===================== RESOURCES ===================== */}

            {activeTab === "resources" && (
              <ResourcesTab
                resources={resources}
                setResources={setResources}
              />
            )}

            {/* ===================== FEEDBACK ===================== */}

            {activeTab === "feedback" && (
              <FeedbackTab
                rating={rating}
                setRating={setRating}
                feedback={feedback}
                setFeedback={setFeedback}
              />
            )}

            {/* ===================== FOLLOW UP ===================== */}

            {activeTab === "followup" && (
              <FollowUpTab
                followUp={followUp}
                setFollowUp={setFollowUp}
              />
            )}

          </div>

          {/* ===================== RIGHT PANEL ===================== */}

          <WorkspaceRightPanel
            meeting={meeting}
            duration={duration}
            notes={notes}
            discussionPoints={discussionPoints}
            actionItems={actionItems}
            resources={resources}
            saveNotes={saveNotes}
            onClose={onClose}
          />

        </div>

      </div>

    </>
  );
};

export default MeetingWorkspaceModal;