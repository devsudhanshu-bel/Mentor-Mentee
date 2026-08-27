import React, {
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

import AwardsDocumentViewerModal from "./AwardsDocumentViewerModal";
import AwardsDeleteModal from "./AwardsDeleteModal";

import {
  getDocumentsDashboard,
  deleteDocument,
} from "../../api/document.api";

const AchievementList = ({
  onUploadClick,
  refreshKey = 0,
}) => {
  // ==========================================================
  // STATE
  // ==========================================================

  const [
    achievements,
    setAchievements,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deleting, setDeleting] =
    useState(false);

  // ==========================================================
  // VIEWER
  // ==========================================================

  const [
    selectedAchievement,
    setSelectedAchievement,
  ] = useState(null);

  const [
    isViewerOpen,
    setIsViewerOpen,
  ] = useState(false);

  // ==========================================================
  // DELETE MODAL
  // ==========================================================

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  const [
    achievementToDelete,
    setAchievementToDelete,
  ] = useState(null);

  // ==========================================================
  // FILTER
  // ==========================================================

  const [filter, setFilter] =
    useState("ALL");

  // ==========================================================
  // FETCH AWARDS
  // ==========================================================

  const fetchAchievements =
    async () => {
      try {
        setLoading(true);

        const data =
          await getDocumentsDashboard(
            "AWARDS"
          );

        console.log(
          "Awards documents response:",
          data
        );

        const documents =
          Array.isArray(
            data?.documents
          )
            ? data.documents
            : [];

        const awardDocuments =
          documents.filter(
            (document) =>
              document?.category ===
              "AWARDS"
          );

        setAchievements(
          awardDocuments
        );
      } catch (error) {
        console.error(
          "AchievementList.fetchAchievements error:",
          error
        );

        setAchievements([]);
      } finally {
        setLoading(false);
      }
    };

  // ==========================================================
  // INITIAL LOAD + REFRESH AFTER UPLOAD
  // ==========================================================

  useEffect(() => {
    fetchAchievements();
  }, [refreshKey]);

  // ==========================================================
  // FILTERED DATA
  // ==========================================================

  const filteredAchievements =
    useMemo(() => {
      if (filter === "ALL") {
        return achievements;
      }

      return achievements.filter(
        (achievement) => {
          const level =
            achievement?.level ||
            achievement?.achievementLevel;

          return level === filter;
        }
      );
    }, [
      achievements,
      filter,
    ]);

  // ==========================================================
  // VIEW
  // ==========================================================

  const handleView = (
    achievement
  ) => {
    if (!achievement) {
      return;
    }

    console.log(
      "Opening Award document:",
      achievement
    );

    setSelectedAchievement(
      achievement
    );

    setIsViewerOpen(true);
  };

  // ==========================================================
  // CLOSE VIEWER
  // ==========================================================

  const handleCloseViewer =
    () => {
      setIsViewerOpen(false);
      setSelectedAchievement(null);
    };

  // ==========================================================
  // DOWNLOAD
  // ==========================================================

  const handleDownload = (
    achievement
  ) => {
    if (!achievement?.fileUrl) {
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
      achievement.fileUrl;

    link.target = "_blank";

    link.rel =
      "noopener noreferrer";

    link.download =
      achievement.documentName ||
      "award-document";

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

  const handleDelete = (
    achievement
  ) => {
    if (!achievement?.id) {
      return;
    }

    setAchievementToDelete(
      achievement
    );

    setIsDeleteModalOpen(true);
  };

  // ==========================================================
  // CANCEL DELETE
  // ==========================================================

  const handleCancelDelete =
    () => {
      if (deleting) {
        return;
      }

      setIsDeleteModalOpen(false);
      setAchievementToDelete(null);
    };

  // ==========================================================
  // CONFIRM DELETE
  // ==========================================================

  const handleConfirmDelete =
    async () => {
      if (
        !achievementToDelete?.id ||
        deleting
      ) {
        return;
      }

      try {
        setDeleting(true);

        await deleteDocument(
          achievementToDelete.id
        );

        setAchievements(
          (previous) =>
            previous.filter(
              (item) =>
                item.id !==
                achievementToDelete.id
            )
        );

        if (
          selectedAchievement?.id ===
          achievementToDelete.id
        ) {
          setIsViewerOpen(false);
          setSelectedAchievement(
            null
          );
        }

        setIsDeleteModalOpen(false);
        setAchievementToDelete(
          null
        );

        console.log(
          "Award deleted successfully."
        );
      } catch (error) {
        console.error(
          "AchievementList.handleConfirmDelete error:",
          error
        );

        alert(
          error?.response?.data
            ?.message ||
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
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-lg font-semibold text-slate-800">
            Your Achievements
          </h2>

          <div className="flex items-center gap-2">

            <AchievementFilter
              value={filter}
              onChange={setFilter}
            />

            <button
              type="button"
              onClick={onUploadClick}
              className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium flex items-center gap-2 transition"
            >
              <Plus size={15} />

              Add Achievement
            </button>

          </div>

        </div>

        {/* ==================================================
            LOADING
        ================================================== */}

        {loading ? (

          <div className="border border-slate-200 rounded-lg px-4 py-12 flex flex-col items-center justify-center">

            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />

            <p className="text-sm text-slate-500">
              Loading achievements...
            </p>

          </div>

        ) : filteredAchievements.length ===
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
              {filter === "ALL"
                ? "No achievements yet"
                : "No achievements found"}
            </h3>

            <p className="text-xs text-slate-400 mt-1 max-w-md">
              {filter === "ALL"
                ? "Upload your first award, certificate, recognition, or achievement."
                : "Try selecting a different achievement level."}
            </p>

            {filter === "ALL" && (
              <button
                type="button"
                onClick={
                  onUploadClick
                }
                className="mt-4 h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition"
              >
                Upload Achievement
              </button>
            )}

          </div>

        ) : (

          /* ==================================================
             LIST
          ================================================== */

          <div className="space-y-2.5">

            {filteredAchievements.map(
              (achievement) => (
                <AchievementCard
                  key={
                    achievement.id
                  }
                  achievement={
                    achievement
                  }
                  onView={
                    handleView
                  }
                  onDownload={
                    handleDownload
                  }
                  onDelete={
                    handleDelete
                  }
                  deleting={
                    deleting
                  }
                />
              )
            )}

          </div>
        )}

      </div>

      {/* ======================================================
          VIEWER
      ====================================================== */}

      <AwardsDocumentViewerModal
        isOpen={isViewerOpen}
        onClose={
          handleCloseViewer
        }
        document={
          selectedAchievement
        }
      />

      {/* ======================================================
          DELETE MODAL
      ====================================================== */}

      <AwardsDeleteModal
        isOpen={
          isDeleteModalOpen
        }
        document={
          achievementToDelete
        }
        onCancel={
          handleCancelDelete
        }
        onConfirm={
          handleConfirmDelete
        }
        isDeleting={
          deleting
        }
      />
    </>
  );
};

export default AchievementList;