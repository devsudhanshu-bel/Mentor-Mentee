import React, {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  FileSearch,
} from "lucide-react";

import CoCurricularActivityCard from "./CoCurricularActivityCard";

import {
  getCoCurricularDocuments,
  deleteDocument,
} from "../../api/document.api";

const CoCurricularActivityList = ({
  onUploadClick,
}) => {
  const [
    activities,
    setActivities,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deleting, setDeleting] =
    useState(false);

  const [
    selectedActivity,
    setSelectedActivity,
  ] = useState(null);

  // ==========================================================
  // FETCH CO-CURRICULAR DOCUMENTS
  // ==========================================================

  const fetchActivities = async () => {
    try {
      setLoading(true);

      const data =
        await getCoCurricularDocuments();

      console.log(
        "Co-Curricular documents response:",
        data
      );

      const documents =
        Array.isArray(data?.documents)
          ? data.documents
          : [];

      setActivities(documents);
    } catch (error) {
      console.error(
        "CoCurricularActivityList.fetchActivities error:",
        error
      );

      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    fetchActivities();
  }, []);

  // ==========================================================
  // VIEW
  // ==========================================================

  const handleView = (
    activity
  ) => {
    console.log(
      "Opening co-curricular activity:",
      activity
    );

    setSelectedActivity(activity);

    if (activity?.fileUrl) {
      window.open(
        activity.fileUrl,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  // ==========================================================
  // DOWNLOAD
  // ==========================================================

  const handleDownload = (
    activity
  ) => {
    if (!activity?.fileUrl) {
      alert(
        "File URL is not available."
      );
      return;
    }

    const link =
      window.document.createElement(
        "a"
      );

    link.href =
      activity.fileUrl;

    link.target = "_blank";

    link.rel =
      "noopener noreferrer";

    link.download =
      activity.documentName ||
      "co-curricular-activity";

    window.document.body.appendChild(
      link
    );

    link.click();

    window.document.body.removeChild(
      link
    );
  };

  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete = async (
    activity
  ) => {
    if (!activity?.id) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${activity.documentName}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await deleteDocument(
        activity.id
      );

      setActivities(
        (previous) =>
          previous.filter(
            (item) =>
              item.id !== activity.id
          )
      );

      if (
        selectedActivity?.id ===
        activity.id
      ) {
        setSelectedActivity(null);
      }
    } catch (error) {
      console.error(
        "CoCurricularActivityList.handleDelete error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to delete the co-curricular activity."
      );
    } finally {
      setDeleting(false);
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-lg font-semibold text-slate-800">
          My Co-Curricular Activities
        </h2>

        <button
          type="button"
          onClick={onUploadClick}
          className="h-9 px-3 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition"
        >
          <Plus size={15} />

          Upload Activity
        </button>

      </div>

      {/* ==================================================
          LOADING
      ================================================== */}

      {loading ? (
        <div className="border border-slate-200 rounded-lg px-4 py-12 flex flex-col items-center justify-center">

          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />

          <p className="text-sm text-slate-500">
            Loading co-curricular activities...
          </p>

        </div>
      ) : activities.length ===
        0 ? (

        /* ==================================================
           EMPTY STATE
        ================================================== */

        <div className="border-2 border-dashed border-slate-200 rounded-lg px-6 py-12 flex flex-col items-center justify-center text-center">

          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">

            <FileSearch
              size={23}
              className="text-blue-600"
            />

          </div>

          <h3 className="text-sm font-semibold text-slate-700">
            No co-curricular activities yet
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Upload your first certificate,
            activity record, or participation
            document.
          </p>

          <button
            type="button"
            onClick={onUploadClick}
            className="mt-4 h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition"
          >
            Upload Activity
          </button>

        </div>
      ) : (

        /* ==================================================
           ACTIVITY LIST
        ================================================== */

        <div className="space-y-2.5">

          {activities.map(
            (activity) => (
              <CoCurricularActivityCard
                key={activity.id}
                activity={activity}
                onView={handleView}
                onDownload={
                  handleDownload
                }
                onDelete={handleDelete}
                deleting={deleting}
              />
            )
          )}

        </div>
      )}

    </div>
  );
};

export default CoCurricularActivityList;