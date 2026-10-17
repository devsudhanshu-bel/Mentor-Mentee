import React, { useCallback, useEffect, useState } from "react";

import { Plus, FileSearch } from "lucide-react";

import ExtraCurricularActivityCard from "./ExtraCurricularActivityCard";
import ExtraCurricularDocumentViewerModal from "./ExtraCurricularDocumentViewerModal";
import ExtraCurricularDeleteModal from "./ExtraCurricularDeleteModal";
import EditExtraCurricularModal from "./EditExtraCurricularModal";

import {
  getDocumentsDashboard,
  deleteDocument,
  updateDocument,
} from "../../api/document.api";

const ExtraCurricularActivityList = ({ onUploadClick }) => {
  // ==========================================================
  // ACTIVITIES
  // ==========================================================

  const [activities, setActivities] = useState([]);

  // ==========================================================
  // LOADING STATES
  // ==========================================================

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // ==========================================================
  // SELECTED ACTIVITY
  // ==========================================================

  const [selectedActivity, setSelectedActivity] = useState(null);

  // ==========================================================
  // DOCUMENT VIEWER
  // ==========================================================

  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // ==========================================================
  // DELETE MODAL
  // ==========================================================

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  // ==========================================================
  // EDIT / REPLACE MODAL
  // ==========================================================

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState(null);

  // ==========================================================
  // FETCH EXTRA-CURRICULAR DOCUMENTS
  // ==========================================================

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getDocumentsDashboard("EXTRA_CURRICULAR");

      console.log("Extra-Curricular documents response:", data);

      const documents = Array.isArray(data)
        ? data
        : Array.isArray(data?.documents)
          ? data.documents
          : [];

      const extraCurricularDocuments = documents.filter(
        (document) => document?.category === "EXTRA_CURRICULAR"
      );

      setActivities(extraCurricularDocuments);
    } catch (error) {
      console.error(
        "ExtraCurricularActivityList.fetchActivities error:",
        error
      );

      setActivities([]);

      alert(
        error?.response?.data?.message ||
          "Failed to load extra-curricular activities."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // ==========================================================
  // VIEW DOCUMENT
  // ==========================================================

  const handleView = (activity) => {
    if (!activity) return;

    setSelectedActivity(activity);
    setIsViewerOpen(true);
  };

  // ==========================================================
  // CLOSE DOCUMENT VIEWER
  // ==========================================================

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedActivity(null);
  };

  // ==========================================================
  // DOWNLOAD DOCUMENT
  // ==========================================================

  const handleDownload = (activity) => {
    if (!activity?.fileUrl) {
      alert("File URL is not available.");
      return;
    }

    const link = window.document.createElement("a");

    link.href = activity.fileUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download =
      activity.documentName || "extra-curricular-activity";

    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  // ==========================================================
  // OPEN EDIT / REPLACE MODAL
  // ==========================================================

  const handleEdit = (activity) => {
    if (!activity?.id) {
      alert("The selected activity has no valid document ID.");
      return;
    }

    setActivityToEdit(activity);
    setIsEditModalOpen(true);
  };

  // ==========================================================
  // CLOSE EDIT / REPLACE MODAL
  // ==========================================================

  const handleCloseEdit = () => {
    setIsEditModalOpen(false);
    setActivityToEdit(null);
  };

  // ==========================================================
  // UPDATE AND RESUBMIT EXTRA-CURRICULAR DOCUMENT
  // ==========================================================

  const handleSaveEdit = async ({
    id,
    documentName,
    description,
    file,
  }) => {
    if (!id) {
      throw new Error("The activity document ID is missing.");
    }

    if (!file) {
      throw new Error("Please select the revised activity file.");
    }

    try {
      await updateDocument({
        documentId: id,
        documentName,
        category: "EXTRA_CURRICULAR",
        description,
        file,
      });

      // Refresh the list after the backend update succeeds.
      await fetchActivities();

      // Keep the viewer closed if the edited record was open.
      if (selectedActivity?.id === id) {
        setIsViewerOpen(false);
        setSelectedActivity(null);
      }

      console.log(
        "Extra-Curricular document updated and resubmitted successfully."
      );
    } catch (error) {
      console.error(
        "ExtraCurricularActivityList.handleSaveEdit error:",
        error
      );

      throw error;
    }
  };

  // ==========================================================
  // OPEN DELETE MODAL
  // ==========================================================

  const handleDelete = (activity) => {
    if (!activity?.id) return;

    setDocumentToDelete(activity);
    setIsDeleteModalOpen(true);
  };

  // ==========================================================
  // CANCEL DELETE
  // ==========================================================

  const handleCancelDelete = () => {
    if (deleting) return;

    setIsDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  // ==========================================================
  // CONFIRM DELETE
  // ==========================================================

  const handleConfirmDelete = async () => {
    if (!documentToDelete?.id) return;

    const deletingId = documentToDelete.id;

    try {
      setDeleting(true);

      await deleteDocument(deletingId);

      setActivities((previous) =>
        previous.filter((item) => item.id !== deletingId)
      );

      setIsDeleteModalOpen(false);
      setDocumentToDelete(null);

      if (selectedActivity?.id === deletingId) {
        setIsViewerOpen(false);
        setSelectedActivity(null);
      }

      if (activityToEdit?.id === deletingId) {
        setIsEditModalOpen(false);
        setActivityToEdit(null);
      }

      console.log(
        "Extra-Curricular document deleted successfully."
      );
    } catch (error) {
      console.error(
        "ExtraCurricularActivityList.handleConfirmDelete error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to delete the extra-curricular activity."
      );
    } finally {
      setDeleting(false);
    }
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      {/* MAIN ACTIVITY SECTION */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        {/* HEADER */}

        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-800">
            My Extra-Curricular Activities
          </h2>

          <button
            type="button"
            onClick={onUploadClick}
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
              Loading extra-curricular activities...
            </p>
          </div>
        ) : activities.length === 0 ? (
          /* EMPTY STATE */

          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 px-6 py-12 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <FileSearch
                size={23}
                className="text-blue-600"
              />
            </div>

            <h3 className="text-sm font-semibold text-slate-700">
              No extra-curricular activities yet
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Upload your first certificate, activity record, or
              participation document.
            </p>

            <button
              type="button"
              onClick={onUploadClick}
              className="mt-4 h-9 rounded-md bg-blue-600 px-4 text-xs font-medium text-white transition hover:bg-blue-700"
            >
              Upload Activity
            </button>
          </div>
        ) : (
          /* ACTIVITY LIST */

          <div className="space-y-2.5">
            {activities.map((activity) => (
              <ExtraCurricularActivityCard
                key={activity.id}
                activity={activity}
                onView={handleView}
                onDownload={handleDownload}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onResubmit={handleEdit}
                deleting={deleting}
              />
            ))}
          </div>
        )}
      </div>

      {/* DOCUMENT VIEWER MODAL */}

      <ExtraCurricularDocumentViewerModal
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        document={selectedActivity}
      />

      {/* DELETE CONFIRMATION MODAL */}

      <ExtraCurricularDeleteModal
        isOpen={isDeleteModalOpen}
        document={documentToDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={deleting}
      />

      {/* EDIT / REPLACE / RESUBMIT MODAL */}

      <EditExtraCurricularModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
        activity={activityToEdit}
      />
    </>
  );
};

export default ExtraCurricularActivityList;