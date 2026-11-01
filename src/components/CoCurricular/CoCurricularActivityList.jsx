import { useCallback, useEffect, useState } from "react";

import {
  Plus,
  FileSearch,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

import api from "../../api/axios";

import CoCurricularActivityCard from "./CoCurricularActivityCard";
import UploadCoCurricularModal from "./UploadCoCurricularModal";

import {
  getCoCurricularDocuments,
  deleteDocument,
} from "../../api/document.api";

const resolveFileUrl = (fileUrl) => {
  if (!fileUrl) return "";

  if (/^https?:\/\//i.test(fileUrl)) {
    return fileUrl;
  }

  if (fileUrl.startsWith("/api/")) {
    return fileUrl.replace(/^\/api/, "");
  }

  return fileUrl.startsWith("/") ? fileUrl : `/${fileUrl}`;
};

const CoCurricularActivityList = ({
  onUploadClick,
  onEditActivity,
}) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // ==========================================================
  // FETCH CO-CURRICULAR ACTIVITIES
  // ==========================================================

  const fetchActivities = useCallback(async () => {
    try {
      const data = await getCoCurricularDocuments();

      const documents = Array.isArray(data?.documents)
        ? data.documents
        : Array.isArray(data?.data?.documents)
          ? data.data.documents
          : Array.isArray(data)
            ? data
            : [];

      setActivities(documents);
      setLoadError("");
    } catch (error) {
      console.error(
        "CoCurricularActivityList.fetchActivities error:",
        error
      );

      console.error("Backend response:", error?.response?.data);

      setLoadError(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Unable to load your co-curricular activities."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    getCoCurricularDocuments()
      .then((data) => {
        if (!isActive) return;

        const documents = Array.isArray(data?.documents)
          ? data.documents
          : Array.isArray(data?.data?.documents)
            ? data.data.documents
            : Array.isArray(data)
              ? data
              : [];

        setActivities(documents);
        setLoadError("");
      })
      .catch((error) => {
        if (!isActive) return;

        console.error(
          "CoCurricularActivityList.fetchActivities error:",
          error
        );

        console.error("Backend response:", error?.response?.data);

        setLoadError(
          error?.response?.data?.message ||
            error?.response?.data?.error ||
            "Unable to load your co-curricular activities."
        );
      })
      .finally(() => {
        if (isActive) {
          setLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  // ==========================================================
  // VIEW ACTIVITY
  // ==========================================================

  const handleView = async (activity) => {
    if (!activity?.fileUrl) {
      alert("File URL is not available.");
      return;
    }

    const newWindow = window.open("", "_blank");

    if (!newWindow) {
      alert("Your browser blocked the new tab. Please allow pop-ups.");
      return;
    }

    try {
      const response = await api.get(
        resolveFileUrl(activity.fileUrl),
        {
          responseType: "blob",
        }
      );

      const previewUrl = window.URL.createObjectURL(response.data);

      newWindow.location.href = previewUrl;

      window.setTimeout(() => {
        window.URL.revokeObjectURL(previewUrl);
      }, 60000);
    } catch (error) {
      newWindow.close();

      console.error("Co-curricular document preview error:", error);
      console.error("Backend response:", error?.response?.data);

      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
      } else if (error.response?.status === 403) {
        alert("You do not have permission to access this document.");
      } else if (error.response?.status === 404) {
        alert("The activity document could not be found.");
      } else {
        alert("Unable to open the activity document. Please try again.");
      }
    }
  };

  // ==========================================================
  // DOWNLOAD ACTIVITY
  // ==========================================================

  const handleDownload = async (activity) => {
    if (!activity?.fileUrl) {
      alert("File URL is not available.");
      return;
    }

    try {
      const response = await api.get(
        resolveFileUrl(activity.fileUrl),
        {
          responseType: "blob",
        }
      );

      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = window.document.createElement("a");

      link.href = downloadUrl;
      link.download =
        activity.documentName ||
        activity.fileName ||
        "co-curricular-activity";

      window.document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        window.URL.revokeObjectURL(downloadUrl);
      }, 60000);
    } catch (error) {
      console.error("Co-curricular document download error:", error);
      console.error("Backend response:", error?.response?.data);

      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
      } else if (error.response?.status === 403) {
        alert("You do not have permission to download this document.");
      } else if (error.response?.status === 404) {
        alert("The activity document could not be found.");
      } else {
        alert("Unable to download the activity document. Please try again.");
      }
    }
  };

  // ==========================================================
  // EDIT / REPLACE ACTIVITY
  // ==========================================================

  const handleEdit = (activity) => {
    if (!activity?.id) {
      alert("Unable to edit this activity because its ID is missing.");
      return;
    }

    if (typeof onEditActivity !== "function") {
      console.error(
        "onEditActivity was not provided by the CoCurricular page."
      );

      alert(
        "The edit action is not connected. Check the CoCurricular.jsx integration."
      );

      return;
    }

    onEditActivity(activity);
  };

  // ==========================================================
  // RESUBMIT ACTIVITY
  // ==========================================================

  const handleResubmit = (activity) => {
    handleEdit(activity);
  };

  // ==========================================================
  // DELETE ACTIVITY
  // ==========================================================

  const handleDelete = async (activity) => {
    if (!activity?.id) {
      alert("Unable to delete this activity because its ID is missing.");
      return;
    }

    if (deletingId) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${
        activity.documentName ||
        activity.fileName ||
        "this activity"
      }"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(activity.id);

      await deleteDocument(activity.id);

      setActivities((previous) =>
        previous.filter((item) => item.id !== activity.id)
      );
    } catch (error) {
      console.error(
        "CoCurricularActivityList.handleDelete error:",
        error
      );

      console.error("Backend response:", error?.response?.data);

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to delete the co-curricular activity."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================================
  // RETRY FETCH
  // ==========================================================

  const handleRetry = async () => {
    setLoading(true);
    setLoadError("");

    await fetchActivities();
  };

  // ==========================================================
  // UPLOAD SUCCESS
  // ==========================================================

  const handleUploadSuccess = async () => {
    setIsUploadModalOpen(false);
    setLoading(true);

    await fetchActivities();
  };

  // ==========================================================
  // OPEN UPLOAD MODAL
  // ==========================================================

  const openUploadModal = () => {
    if (typeof onUploadClick === "function") {
      onUploadClick();
      return;
    }

    setIsUploadModalOpen(true);
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        {/* HEADER */}

        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-800">
            My Co-Curricular Activities
          </h2>

          <button
            type="button"
            onClick={openUploadModal}
            className="flex h-9 shrink-0 items-center gap-1.5 rounded-md bg-blue-600 px-3 text-xs font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={15} />
            Upload Activity
          </button>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 px-4 py-12">
            <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

            <p className="text-sm text-slate-500">
              Loading co-curricular activities...
            </p>
          </div>
        ) : loadError ? (
          /* ERROR STATE */

          <div className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 px-5 py-10 text-center">
            <AlertCircle size={25} className="mb-3 text-red-500" />

            <p className="text-sm font-medium text-red-700">
              {loadError}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 flex h-9 items-center gap-2 rounded-md border border-red-200 bg-white px-4 text-xs font-medium text-red-700 transition hover:bg-red-100"
            >
              <RotateCcw size={14} />
              Try Again
            </button>
          </div>
        ) : activities.length === 0 ? (
          /* EMPTY STATE */

          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 px-6 py-12 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <FileSearch size={23} className="text-blue-600" />
            </div>

            <h3 className="text-sm font-semibold text-slate-700">
              No co-curricular activities yet
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Upload your first certificate, activity record, or
              participation document.
            </p>

            <button
              type="button"
              onClick={openUploadModal}
              className="mt-4 flex h-9 items-center gap-2 rounded-md bg-blue-600 px-4 text-xs font-medium text-white transition hover:bg-blue-700"
            >
              <Plus size={15} />
              Upload Activity
            </button>
          </div>
        ) : (
          /* ACTIVITY LIST */

          <div className="space-y-2.5">
            {activities.map((activity) => (
              <CoCurricularActivityCard
                key={activity.id}
                activity={activity}
                onView={handleView}
                onDownload={handleDownload}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onResubmit={handleResubmit}
                deleting={deletingId === activity.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* FALLBACK UPLOAD MODAL */}

      {!onUploadClick && (
        <UploadCoCurricularModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </>
  );
};

export default CoCurricularActivityList;