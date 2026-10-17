import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import WorkspaceHeader from "./WorkspaceHeader";
import WorkspaceSidebar from "./WorkspaceSidebar";
import WorkspaceRightPanel from "./WorkspaceRightPanel";

import NotesTab from "./NotesTab";
import DiscussionTab from "./DiscussionTab";
import FeedbackTab from "./FeedbackTab";
import FollowUpTab from "./FollowUpTab";
import EndMeetingModal from "./EndMeetingModal";

import meetingsService from "../../../services/meetingsService";

// =========================================================
// HELPERS
// =========================================================

const getMeetingId = (meeting) =>
  meeting?.id ??
  meeting?.meetingId ??
  meeting?.meeting_id ??
  null;

const unwrapResponse = (response) => {
  let result = response;

  for (let i = 0; i < 5; i += 1) {
    if (
      result &&
      typeof result === "object" &&
      !Array.isArray(result) &&
      result.data !== undefined &&
      (
        result.success !== undefined ||
        result.message !== undefined ||
        Object.keys(result).length === 1
      )
    ) {
      result = result.data;
    } else {
      break;
    }
  }

  return result;
};

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message ??
  error?.response?.data?.error ??
  error?.message ??
  fallback;

const normalizeStatus = (status) =>
  String(status ?? "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

const getInitialNotes = (meeting) => {
  const value =
    meeting?.notes ??
    meeting?.meetingNotes ??
    meeting?.meeting_notes ??
    meeting?.mentorMeetingNotes ??
    meeting?.mentor_meeting_notes ??
    "";

  if (Array.isArray(value)) {
    return value[0]?.content ?? "";
  }

  return typeof value === "string"
    ? value
    : value?.content ?? "";
};

const getDiscussionRecords = (meeting) => {
  const points =
    meeting?.discussionPoints ??
    meeting?.discussion_points ??
    meeting?.mentorMeetingDiscussionPoints ??
    meeting?.mentor_meeting_discussion_points ??
    [];

  if (!Array.isArray(points)) return [];

  return points.map((point, index) =>
    typeof point === "string"
      ? {
          id: null,
          content: point,
          localKey: `discussion-${index}-${point}`,
        }
      : point
  );
};

const getPointContent = (point) =>
  typeof point === "string"
    ? point
    : point?.content ?? point?.text ?? "";

const getRecordId = (record) =>
  record?.id ??
  record?.discussionPointId ??
  record?.discussion_point_id ??
  null;

const getFeedbackData = (meeting) => {
  const value =
    meeting?.feedback ??
    meeting?.mentorFeedback ??
    meeting?.mentor_feedback ??
    meeting?.mentorMeetingFeedback ??
    meeting?.mentor_meeting_feedback ??
    null;

  return Array.isArray(value)
    ? value[0] ?? null
    : value;
};

const getFollowUpData = (meeting) =>
  meeting?.followUp ??
  meeting?.follow_up ??
  meeting?.mentor_meeting_follow_ups ??
  null;

const parseFollowUp = (record) => {
  if (!record) {
    return {
      date: "",
      time: "",
      agenda: "",
    };
  }

  const scheduledAt =
    record.scheduledAt ??
    record.scheduled_at ??
    record.scheduledFor ??
    record.scheduled_for ??
    null;

  const parsedDate = scheduledAt
    ? new Date(scheduledAt)
    : null;

  const validDate =
    parsedDate &&
    !Number.isNaN(parsedDate.getTime());

  return {
    date:
      record.date ??
      (validDate
        ? [
            parsedDate.getFullYear(),
            String(parsedDate.getMonth() + 1).padStart(2, "0"),
            String(parsedDate.getDate()).padStart(2, "0"),
          ].join("-")
        : ""),

    time:
      record.time ??
      (validDate
        ? [
            String(parsedDate.getHours()).padStart(2, "0"),
            String(parsedDate.getMinutes()).padStart(2, "0"),
          ].join(":")
        : ""),

    agenda:
      record.agenda ??
      record.title ??
      record.content ??
      "",
  };
};

// =========================================================
// MEETING WORKSPACE
// =========================================================

const MeetingWorkspaceModal = ({
  open,
  onClose,
  meeting,
  onMeetingUpdated,
  onEndMeeting,
}) => {
  const meetingId = getMeetingId(meeting);

  const [activeTab, setActiveTab] = useState("notes");
  const [seconds, setSeconds] = useState(0);

  const [notes, setNotes] = useState("");
  const [discussionRecords, setDiscussionRecords] = useState([]);

  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState("");

  const [followUp, setFollowUp] = useState({
    date: "",
    time: "",
    agenda: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [ending, setEnding] = useState(false);

  const [showEndMeetingModal, setShowEndMeetingModal] =
    useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [lastSaved, setLastSaved] = useState("Not saved");

  const [dirtyNotes, setDirtyNotes] = useState(false);
  const [loadedMeetingId, setLoadedMeetingId] = useState(null);

  const meetingStatus = normalizeStatus(meeting?.status);

  const canRecordFeedback = [
    "IN_PROGRESS",
    "COMPLETED",
  ].includes(meetingStatus);

  const isMeetingTerminal = [
    "COMPLETED",
    "CANCELLED",
    "CANCELED",
    "NO_SHOW",
  ].includes(meetingStatus);

  const discussionPoints = useMemo(
    () => discussionRecords.map(getPointContent).filter(Boolean),
    [discussionRecords]
  );

  const duration = useMemo(() => {
    const hours = String(
      Math.floor(seconds / 3600)
    ).padStart(2, "0");

    const minutes = String(
      Math.floor((seconds % 3600) / 60)
    ).padStart(2, "0");

    const remainingSeconds = String(
      seconds % 60
    ).padStart(2, "0");

    return `${hours}:${minutes}:${remainingSeconds}`;
  }, [seconds]);

  // =======================================================
  // TIMER
  // =======================================================

  useEffect(() => {
    if (!open) return undefined;

    setSeconds(0);

    const interval = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [open, meetingId]);

  // =======================================================
  // RESET WORKSPACE WHEN MEETING CHANGES
  // =======================================================

  useEffect(() => {
    setLoadedMeetingId(null);
    setActiveTab("notes");
    setError("");
    setSuccessMessage("");
    setDirtyNotes(false);
    setLastSaved("Not saved");
    setShowEndMeetingModal(false);
  }, [open, meetingId]);

  // =======================================================
  // LOAD MEETING DATA
  // =======================================================

  const loadWorkspace = useCallback(async () => {
    if (!open || !meetingId) return;

    setLoading(true);
    setError("");

    try {
      const response =
        await meetingsService.getMeeting(meetingId);

      const result = unwrapResponse(response);
      const loadedMeeting = result?.meeting ?? result;

      if (
        !loadedMeeting ||
        typeof loadedMeeting !== "object"
      ) {
        throw new Error(
          "The server returned invalid meeting details."
        );
      }

      setNotes(getInitialNotes(loadedMeeting));

      setDiscussionRecords(
        getDiscussionRecords(loadedMeeting)
      );

      const existingFeedback =
        getFeedbackData(loadedMeeting);

      setRating(
        Math.min(
          5,
          Math.max(
            1,
            Number(existingFeedback?.rating ?? 4)
          )
        )
      );

      setFeedback(
        existingFeedback?.comments ??
        existingFeedback?.feedback ??
        existingFeedback?.remarks ??
        ""
      );

      setFollowUp(
        parseFollowUp(getFollowUpData(loadedMeeting))
      );

      setDirtyNotes(false);
      setLastSaved("Saved");
      setLoadedMeetingId(meetingId);
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "Unable to load the meeting workspace."
        )
      );
    } finally {
      setLoading(false);
    }
  }, [open, meetingId]);

  useEffect(() => {
    if (
      !open ||
      !meetingId ||
      loadedMeetingId === meetingId
    ) {
      return;
    }

    loadWorkspace();
  }, [
    open,
    meetingId,
    loadedMeetingId,
    loadWorkspace,
  ]);

  // =======================================================
  // SAVE NOTES
  // =======================================================

  const saveNotes = useCallback(async () => {
    if (!meetingId) {
      throw new Error(
        "This meeting does not have a valid ID."
      );
    }

    setSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      await meetingsService.saveNotes(meetingId, notes);

      setDirtyNotes(false);

      setLastSaved(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      setSuccessMessage("Meeting notes saved.");
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "Unable to save meeting notes."
        )
      );

      throw requestError;
    } finally {
      setSaving(false);
    }
  }, [meetingId, notes]);

  // =======================================================
  // ADD DISCUSSION POINT
  // =======================================================

  const addDiscussionPoint = useCallback(
    async (content) => {
      const trimmedContent = String(content ?? "").trim();

      if (!meetingId || !trimmedContent) {
        throw new Error("Enter a discussion point first.");
      }

      setSaving(true);
      setError("");
      setSuccessMessage("");

      try {
        const response =
          await meetingsService.addDiscussionPoint(
            meetingId,
            trimmedContent
          );

        const result = unwrapResponse(response);

        const createdPoint =
          result?.discussionPoint ??
          result?.point ??
          result?.data?.discussionPoint ??
          result?.data?.point ??
          result;

        if (getRecordId(createdPoint)) {
          setDiscussionRecords((previous) => [
            ...previous,
            createdPoint,
          ]);
        } else {
          await loadWorkspace();
        }

        setSuccessMessage("Discussion point added.");
      } catch (requestError) {
        setError(
          getErrorMessage(
            requestError,
            "Unable to add the discussion point."
          )
        );

        throw requestError;
      } finally {
        setSaving(false);
      }
    },
    [meetingId, loadWorkspace]
  );

  // =======================================================
  // UPDATE DISCUSSION POINT
  // =======================================================

  const updateDiscussionPoint = useCallback(
    async (index, nextContent) => {
      const content = String(nextContent ?? "").trim();

      const record = discussionRecords[index];
      const recordId = getRecordId(record);

      if (!meetingId || !recordId || !content) {
        throw new Error(
          "This discussion point has no valid database ID or content."
        );
      }

      setSaving(true);
      setError("");
      setSuccessMessage("");

      try {
        await meetingsService.updateDiscussionPoint(
          meetingId,
          recordId,
          content
        );

        setDiscussionRecords((previous) =>
          previous.map((point, pointIndex) =>
            pointIndex === index
              ? {
                  ...point,
                  content,
                  text: undefined,
                }
              : point
          )
        );

        setSuccessMessage("Discussion point updated.");
      } catch (requestError) {
        setError(
          getErrorMessage(
            requestError,
            "Unable to update the discussion point."
          )
        );

        throw requestError;
      } finally {
        setSaving(false);
      }
    },
    [meetingId, discussionRecords]
  );

  // =======================================================
  // DELETE DISCUSSION POINT
  // =======================================================

  const deleteDiscussionPoint = useCallback(
    async (index) => {
      const record = discussionRecords[index];
      const recordId = getRecordId(record);

      if (!meetingId || !recordId) {
        throw new Error(
          "This discussion point has no valid database ID."
        );
      }

      setSaving(true);
      setError("");
      setSuccessMessage("");

      try {
        await meetingsService.deleteDiscussionPoint(
          meetingId,
          recordId
        );

        setDiscussionRecords((previous) =>
          previous.filter(
            (_, pointIndex) => pointIndex !== index
          )
        );

        setSuccessMessage("Discussion point deleted.");
      } catch (requestError) {
        setError(
          getErrorMessage(
            requestError,
            "Unable to delete the discussion point."
          )
        );

        throw requestError;
      } finally {
        setSaving(false);
      }
    },
    [meetingId, discussionRecords]
  );

  // =======================================================
  // SAVE FEEDBACK / REMARKS
  // =======================================================

  const saveFeedback = useCallback(async () => {
    if (!meetingId) {
      setError("This meeting does not have a valid ID.");
      return;
    }

    if (!canRecordFeedback) {
      setError(
        "Feedback can be recorded once the meeting is in progress."
      );
      return;
    }

    setSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      await meetingsService.saveFeedback(meetingId, {
        rating: Number(rating),
        comments: feedback.trim(),
      });

      setSuccessMessage("Mentor feedback saved.");

      await loadWorkspace();
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "Unable to save feedback."
        )
      );
    } finally {
      setSaving(false);
    }
  }, [
    meetingId,
    canRecordFeedback,
    rating,
    feedback,
    loadWorkspace,
  ]);

  // =======================================================
  // SCHEDULE FOLLOW-UP
  // =======================================================

  const scheduleFollowUp = useCallback(async () => {
    if (!meetingId) {
      setError("This meeting does not have a valid ID.");
      return;
    }

    if (
      !followUp.date ||
      !followUp.time ||
      !followUp.agenda.trim()
    ) {
      setError(
        "Enter a follow-up date, time, and agenda."
      );
      return;
    }

    const scheduledAt = new Date(
      `${followUp.date}T${followUp.time}`
    );

    if (
      Number.isNaN(scheduledAt.getTime()) ||
      scheduledAt.getTime() <= Date.now()
    ) {
      setError(
        "Choose a future date and time for the follow-up."
      );
      return;
    }

    setSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      await meetingsService.scheduleFollowUp(
        meetingId,
        {
          date: followUp.date,
          time: followUp.time,
          agenda: followUp.agenda.trim(),
        }
      );

      setSuccessMessage("Follow-up meeting scheduled.");

      await loadWorkspace();
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "Unable to schedule the follow-up."
        )
      );
    } finally {
      setSaving(false);
    }
  }, [meetingId, followUp, loadWorkspace]);

  // =======================================================
  // OPEN END-MEETING CONFIRMATION
  // =======================================================

  const requestEndMeeting = useCallback(() => {
    if (!meetingId) {
      setError("This meeting does not have a valid ID.");
      return;
    }

    if (ending || saving || loading) return;

    if (isMeetingTerminal) {
      setError("This meeting has already ended or is no longer active.");
      return;
    }

    setError("");
    setSuccessMessage("");
    setShowEndMeetingModal(true);
  }, [
    meetingId,
    ending,
    saving,
    loading,
    isMeetingTerminal,
  ]);

  // =======================================================
  // CONFIRM AND COMPLETE MEETING
  // Returns true only when the operation succeeds.
  // =======================================================

  const handleEndMeeting = useCallback(async () => {
    if (!meetingId) {
      setError("This meeting does not have a valid ID.");
      return false;
    }

    if (ending || saving || loading) return false;

    setEnding(true);
    setError("");
    setSuccessMessage("");

    try {
      // Persist unsaved notes before completing the meeting.
      if (dirtyNotes) {
        await meetingsService.saveNotes(
          meetingId,
          notes
        );

        setDirtyNotes(false);

        setLastSaved(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      }

      let updatedMeeting = meeting;

      if (!isMeetingTerminal) {
        const response =
          await meetingsService.completeMeeting(meetingId);

        const result = unwrapResponse(response);

        updatedMeeting =
          result?.meeting ?? result ?? meeting;

        onMeetingUpdated?.(updatedMeeting);
      }

      setShowEndMeetingModal(false);

      if (onEndMeeting) {
        await onEndMeeting(updatedMeeting);
      } else {
        onClose?.();
      }

      return true;
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "Unable to finish the meeting."
        )
      );

      return false;
    } finally {
      setEnding(false);
    }
  }, [
    meetingId,
    ending,
    saving,
    loading,
    dirtyNotes,
    notes,
    isMeetingTerminal,
    onMeetingUpdated,
    onEndMeeting,
    onClose,
    meeting,
  ]);

  // =======================================================
  // RENDER
  // =======================================================

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px]"
      />

      <div className="fixed inset-3 z-[9999] overflow-hidden rounded-2xl bg-white shadow-2xl md:inset-6">
        <WorkspaceHeader
          meeting={meeting}
          duration={duration}
          onClose={onClose}
          onSaveMeeting={saveNotes}
          onEndMeeting={requestEndMeeting}
          saving={saving}
          ending={ending}
        />

        <div className="grid h-[calc(100%-72px)] grid-cols-1 overflow-hidden md:grid-cols-[190px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)_280px]">
          <WorkspaceSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <main className="overflow-y-auto bg-white p-4 md:p-6">
            {error && (
              <div
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}

                <button
                  type="button"
                  onClick={() => setError("")}
                  className="ml-3 font-semibold underline"
                >
                  Dismiss
                </button>
              </div>
            )}

            {successMessage && (
              <div
                role="status"
                className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
              >
                {successMessage}
              </div>
            )}

            {loading && (
              <p className="mb-4 text-sm text-gray-500">
                Loading meeting workspace...
              </p>
            )}

            {!loading && activeTab === "notes" && (
              <NotesTab
                notes={notes}
                setNotes={(value) => {
                  setNotes(value);
                  setDirtyNotes(true);
                  setLastSaved("Unsaved changes");
                }}
                saveNotes={saveNotes}
                lastSaved={lastSaved}
                saving={saving}
              />
            )}

            {!loading && activeTab === "discussion" && (
              <DiscussionTab
                discussionPoints={discussionRecords}
                onAddDiscussion={addDiscussionPoint}
                onUpdateDiscussion={updateDiscussionPoint}
                onDeleteDiscussion={deleteDiscussionPoint}
                saving={saving}
              />
            )}

            {!loading && activeTab === "feedback" && (
              <FeedbackTab
                rating={rating}
                setRating={setRating}
                feedback={feedback}
                setFeedback={setFeedback}
                onSaveFeedback={saveFeedback}
                saving={saving}
                meetingStatus={meetingStatus}
              />
            )}

            {!loading && activeTab === "followup" && (
              <FollowUpTab
                followUp={followUp}
                setFollowUp={setFollowUp}
                onSaveFollowUp={scheduleFollowUp}
                saving={saving}
              />
            )}
          </main>

          <div className="hidden overflow-y-auto border-l border-gray-100 xl:block">
            <WorkspaceRightPanel
              meeting={meeting}
              duration={duration}
              notes={notes}
              discussionPoints={discussionPoints}
              rating={rating}
              feedback={feedback}
              saveNotes={saveNotes}
              onEndMeeting={requestEndMeeting}
              onClose={onClose}
              saving={saving}
              ending={ending}
              dirtyNotes={dirtyNotes}
            />
          </div>
        </div>
      </div>

      <EndMeetingModal
        open={showEndMeetingModal}
        meeting={meeting}
        duration={duration}
        loading={ending}
        onCancel={() => {
          if (!ending) {
            setShowEndMeetingModal(false);
          }
        }}
        onConfirm={handleEndMeeting}
      />
    </>
  );
};

export default MeetingWorkspaceModal;