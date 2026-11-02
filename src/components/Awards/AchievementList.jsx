
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Plus,
  FileSearch,
} from "lucide-react";

import AchievementFilter from "./AchievementFilter";
import AchievementCard from "./AchievementCard";
import EditAchievementModal from "./EditAchievementModal";

import AwardsDocumentViewerModal from "./AwardsDocumentViewerModal";
import AwardsDeleteModal from "./AwardsDeleteModal";

import {
  getDocumentsDashboard,
  updateDocument,
  deleteDocument,
} from "../../api/document.api";

const AchievementList = ({
  onUploadClick,
  refreshKey = 0,
}) => {
  // ==========================================================
  // STATE
  // ==========================================================

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // ==========================================================
  // VIEWER
  // ==========================================================

  const [selectedAchievement, setSelectedAchievement] =
    useState(null);

  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // ==========================================================
  // EDIT / RESUBMIT MODAL
  // ==========================================================

  const [achievementToEdit, setAchievementToEdit] =
    useState(null);

  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  // ==========================================================
  // DELETE MODAL
  // ==========================================================

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [achievementToDelete, setAchievementToDelete] =
    useState(null);

  // ==========================================================
  // FILTER
  // ==========================================================

  const [filter, setFilter] = useState("ALL");

  // ==========================================================
  // FETCH AWARDS
  // ==========================================================

  const fetchAchievements = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getDocumentsDashboard("AWARDS");

      const documents = Array.isArray(data?.documents)
        ? data.documents
        : Array.isArray(data)
          ? data
          : [];

      const awardDocuments = documents.filter(
        (document) => document?.category === "AWARDS"
      );

      setAchievements(awardDocuments);
    } catch (error) {
      console.error(
        "AchievementList.fetchAchievements error:",
        error
      );

      setAchievements([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // INITIAL LOAD + REFRESH AFTER UPLOAD / UPDATE
  // ==========================================================

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements, refreshKey]);

  // ==========================================================
  // FILTERED DATA
  // ==========================================================

  const filteredAchievements = useMemo(() => {
    if (filter === "ALL") {
      return achievements;
    }

    return achievements.filter((achievement) => {
      const level =
        achievement?.level ||
        achievement?.achievementLevel;

      return level === filter;
    });
  }, [achievements, filter]);

  // ==========================================================
  // VIEW
  // ==========================================================

  const handleView = (achievement) => {
    if (!achievement) {
      return;
    }

    setSelectedAchievement(achievement);
    setIsViewerOpen(true);
  };

  // ==========================================================
  // CLOSE VIEWER
  // ==========================================================

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedAchievement(null);
  };

  // ==========================================================
  // DOWNLOAD
  // ==========================================================

  const handleDownload = (achievement) => {
    if (!achievement?.fileUrl) {
      alert("File URL is not available.");
      return;
    }

    const link = window.document.createElement("a");

    link.href = achievement.fileUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download =
      achievement.documentName || "award-document";

    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  // ==========================================================
  // OPEN EDIT / REPLACE / RESUBMIT MODAL
  // ==========================================================

  const handleEdit = (achievement) => {
    if (!achievement?.id) {
      return;
    }

    setAchievementToEdit(achievement);
    setIsEditModalOpen(true);
  };

  // ==========================================================
  // CLOSE EDIT MODAL
  // ==========================================================

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setAchievementToEdit(null);
  };

  // ==========================================================
  // SAVE EDIT / RESUBMISSION
  // ==========================================================

  const handleSaveEdit = async ({
    id,
    documentName,
    description,
    file,
  }) => {
    if (!id) {
      throw new Error("Achievement ID is missing.");
    }

    if (!file) {
      throw new Error(
        "Please select the revised achievement document."
      );
    }

    try {
      await updateDocument({
        documentId: id,
        documentName: documentName.trim(),
        category: "AWARDS",
        description: description?.trim() || "",
        file,
      });

      // Close the viewer if the edited achievement is open.
      if (selectedAchievement?.id === id) {
        setIsViewerOpen(false);
        setSelectedAchievement(null);
      }

      // The edit modal calls onSuccess after onSave resolves.
      // Its onSuccess callback refreshes the list.
      return true;
    } catch (error) {
      console.error(
        "AchievementList.handleSaveEdit error:",
        error
      );

      throw error;
    }
  };

  // ==========================================================
  // OPEN DELETE MODAL
  // ==========================================================

  const handleDelete = (achievement) => {
    if (!achievement?.id) {
      return;
    }

    setAchievementToDelete(achievement);
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
    setAchievementToDelete(null);
  };

  // ==========================================================
  // CONFIRM DELETE
  // ==========================================================

  const handleConfirmDelete = async () => {
    if (!achievementToDelete?.id || deleting) {
      return;
    }

    try {
      setDeleting(true);

      await deleteDocument(achievementToDelete.id);

      setAchievements((previous) =>
        previous.filter(
          (item) => item.id !== achievementToDelete.id
        )
      );

      if (
        selectedAchievement?.id === achievementToDelete.id
      ) {
        setIsViewerOpen(false);
        setSelectedAchievement(null);
      }

      setIsDeleteModalOpen(false);
      setAchievementToDelete(null);
    } catch (error) {
      console.error(
        "AchievementList.handleConfirmDelete error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Failed to delete the award."
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
      <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

        {/* HEADER */}

        <div className="mb-5 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="min-w-0 text-base font-semibold text-slate-800 sm:text-lg">
            Your Achievements
          </h2>

          <div className="flex w-full min-w-0 flex-col gap-2 xs:flex-row sm:w-auto sm:items-center">
            <div className="w-full min-w-0 sm:w-auto">
              <AchievementFilter
                value={filter}
                onChange={setFilter}
              />
            </div>

            <button
              type="button"
              onClick={onUploadClick}
              className="flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 text-xs font-medium text-white transition hover:bg-blue-700 sm:w-auto"
            >
              <Plus size={15} />
              <span>Add Achievement</span>
            </button>
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 px-4 py-12">
            <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

            <p className="text-center text-sm text-slate-500">
              Loading achievements...
            </p>
          </div>
        ) : filteredAchievements.length === 0 ? (
          /* EMPTY STATE */

          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 px-4 py-10 text-center sm:px-6 sm:py-12">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <FileSearch
                size={23}
                className="text-blue-600"
              />
            </div>

            <h3 className="text-sm font-semibold text-slate-700">
              {filter === "ALL"
                ? "No achievements yet"
                : "No achievements found"}
            </h3>

            <p className="mt-1 max-w-md text-xs leading-5 text-slate-400">
              {filter === "ALL"
                ? "Upload your first award, certificate, recognition, or achievement."
                : "Try selecting a different achievement level."}
            </p>

            {filter === "ALL" && (
              <button
                type="button"
                onClick={onUploadClick}
                className="mt-4 flex h-9 w-full items-center justify-center rounded-md bg-blue-600 px-4 text-xs font-medium text-white transition hover:bg-blue-700 sm:w-auto"
              >
                Upload Achievement
              </button>
            )}
          </div>
        ) : (
          /* ACHIEVEMENT LIST */

          <div className="min-w-0 space-y-2.5">
            {filteredAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
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

      {/* EDIT / REPLACE / RESUBMIT MODAL */}

      <EditAchievementModal
        isOpen={isEditModalOpen}
        achievement={achievementToEdit}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        onSuccess={fetchAchievements}
      />

      {/* DOCUMENT VIEWER */}

      <AwardsDocumentViewerModal
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        document={selectedAchievement}
      />

      {/* DELETE CONFIRMATION */}

      <AwardsDeleteModal
        isOpen={isDeleteModalOpen}
        document={achievementToDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={deleting}
      />
    </>
  );
};

export default AchievementList;
