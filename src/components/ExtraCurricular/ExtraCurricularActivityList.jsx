import React, {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  FileSearch,
} from "lucide-react";

import ExtraCurricularActivityCard from "./ExtraCurricularActivityCard";
import ExtraCurricularDocumentViewerModal from "./ExtraCurricularDocumentViewerModal";
import ExtraCurricularDeleteModal from "./ExtraCurricularDeleteModal";

import {
  getDocumentsDashboard,
  deleteDocument,
} from "../../api/document.api";

const ExtraCurricularActivityList = ({
  onUploadClick,
}) => {
  // ==========================================================
  // ACTIVITIES
  // ==========================================================

  const [
    activities,
    setActivities,
  ] = useState([]);

  // ==========================================================
  // LOADING
  // ==========================================================

  const [loading, setLoading] =
    useState(true);

  // ==========================================================
  // DELETE LOADING
  // ==========================================================

  const [deleting, setDeleting] =
    useState(false);

  // ==========================================================
  // SELECTED DOCUMENT
  // ==========================================================

  const [
    selectedActivity,
    setSelectedActivity,
  ] = useState(null);

  // ==========================================================
  // VIEWER STATE
  // ==========================================================

  const [
    isViewerOpen,
    setIsViewerOpen,
  ] = useState(false);

  // ==========================================================
  // DELETE MODAL STATE
  // ==========================================================

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  const [
    documentToDelete,
    setDocumentToDelete,
  ] = useState(null);

  // ==========================================================
  // FETCH EXTRA-CURRICULAR DOCUMENTS
  // ==========================================================

  const fetchActivities = async () => {
    try {
      setLoading(true);

      const data =
        await getDocumentsDashboard(
          "EXTRA_CURRICULAR"
        );

      console.log(
        "Extra-Curricular documents response:",
        data
      );

      const documents =
        Array.isArray(data?.documents)
          ? data.documents
          : [];

      // ======================================================
      // ONLY EXTRA_CURRICULAR DOCUMENTS
      // ======================================================

      const extraCurricularDocuments =
        documents.filter(
          (document) =>
            document?.category ===
            "EXTRA_CURRICULAR"
        );

      setActivities(
        extraCurricularDocuments
      );
    } catch (error) {
      console.error(
        "ExtraCurricularActivityList.fetchActivities error:",
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
  // VIEW DOCUMENT
  // ==========================================================

  const handleView = (activity) => {
    if (!activity) {
      return;
    }

    console.log(
      "Opening Extra-Curricular document:",
      activity
    );

    // Store the exact uploaded document
    setSelectedActivity(activity);

    // Open viewer modal
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
      "extra-curricular-activity";

    window.document.body.appendChild(
      link
    );

    link.click();

    window.document.body.removeChild(
      link
    );
  };

  // ==========================================================
  // OPEN DELETE MODAL
  // ==========================================================

  const handleDelete = (activity) => {
    if (!activity?.id) {
      return;
    }

    console.log(
      "Opening delete confirmation for:",
      activity
    );

    // Store document selected for deletion
    setDocumentToDelete(activity);

    // Open custom Extra-Curricular delete modal
    setIsDeleteModalOpen(true);
  };

  // ==========================================================
  // CANCEL DELETE
  // ==========================================================

  const handleCancelDelete = () => {
    if (deleting) {
      return;
    }

    setIsDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  // ==========================================================
  // CONFIRM DELETE
  // ==========================================================

  const handleConfirmDelete = async () => {
    if (!documentToDelete?.id) {
      return;
    }

    try {
      setDeleting(true);

      console.log(
        "Deleting Extra-Curricular document:",
        documentToDelete
      );

      // ======================================================
      // DELETE FROM BACKEND
      // ======================================================

      await deleteDocument(
        documentToDelete.id
      );

      // ======================================================
      // REMOVE FROM UI
      // ======================================================

      setActivities(
        (previous) =>
          previous.filter(
            (item) =>
              item.id !==
              documentToDelete.id
          )
      );

      // ======================================================
      // CLOSE DELETE MODAL
      // ======================================================

      setIsDeleteModalOpen(false);
      setDocumentToDelete(null);

      // ======================================================
      // CLOSE VIEWER IF DELETED DOCUMENT IS OPEN
      // ======================================================

      if (
        selectedActivity?.id ===
        documentToDelete.id
      ) {
        setIsViewerOpen(false);
        setSelectedActivity(null);
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
      {/* ======================================================
          MAIN ACTIVITY SECTION
      ====================================================== */}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-lg font-semibold text-slate-800">
            My Extra-Curricular Activities
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
              Loading extra-curricular activities...
            </p>

          </div>

        ) : activities.length === 0 ? (

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
              No extra-curricular activities yet
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
                <ExtraCurricularActivityCard
                  key={activity.id}
                  activity={activity}
                  onView={handleView}
                  onDownload={
                    handleDownload
                  }
                  onDelete={
                    handleDelete
                  }
                  deleting={deleting}
                />
              )
            )}

          </div>

        )}

      </div>

      {/* ======================================================
          DOCUMENT VIEWER MODAL
      ====================================================== */}

      <ExtraCurricularDocumentViewerModal
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        document={selectedActivity}
      />

      {/* ======================================================
          EXTRA-CURRICULAR DELETE MODAL
      ====================================================== */}

      <ExtraCurricularDeleteModal
        isOpen={isDeleteModalOpen}
        document={documentToDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={deleting}
      />
    </>
  );
};

export default ExtraCurricularActivityList;