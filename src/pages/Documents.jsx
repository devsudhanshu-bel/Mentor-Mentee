import React, { useCallback, useEffect, useState } from "react";

// ==========================================================
// Layout
// ==========================================================

import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";

// ==========================================================
// Document Components
// ==========================================================

import DocumentsBanner from "../components/Documents/DocumentsBanner";
import DocumentsStats from "../components/Documents/DocumentsStats";
import DocumentTable from "../components/Documents/DocumentTable";
import CategoriesCard from "../components/Documents/CategoriesCard";
import UploadDocumentCard from "../components/Documents/UploadDocumentCard";
import UploadDocumentModal from "../components/Documents/UploadDocumentModal";
import AllDocumentsModal from "../components/Documents/AllDocumentsModal";
import DocumentViewerModal from "../components/Documents/DocumentViewerModal";
import DocumentDeleteModal from "../components/Documents/DocumentDeleteModal";
import DocumentSuccessModal from "../components/Documents/DocumentSuccessModal";
import DocumentErrorModal from "../components/Documents/DocumentErrorModal";

// ==========================================================
// API
// ==========================================================

import {
  getDocumentsDashboard,
  deleteDocument,
} from "../api/document.api";

// ==========================================================
// Documents Page
// ==========================================================

const Documents = () => {
  // ========================================================
  // DOCUMENT STATE
  // ========================================================

  const [documents, setDocuments] = useState([]);

  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalCategories: 0,
    recentlyAdded: 0,
    totalFiles: 0,
  });

  const [categories, setCategories] = useState([]);

  // ========================================================
  // LOADING / ERROR
  // ========================================================

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ========================================================
  // UPLOAD MODAL
  // ========================================================

  const [isUploadModalOpen, setIsUploadModalOpen] =
    useState(false);

  // ========================================================
  // ALL DOCUMENTS MODAL
  // ========================================================

  const [isAllDocumentsOpen, setIsAllDocumentsOpen] =
    useState(false);

  // ========================================================
  // VIEWER
  // ========================================================

  const [isViewerOpen, setIsViewerOpen] =
    useState(false);

  const [selectedDocument, setSelectedDocument] =
    useState(null);

  // ========================================================
  // DELETE MODAL
  // ========================================================

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [documentToDelete, setDocumentToDelete] =
    useState(null);

  const [isDeleting, setIsDeleting] =
    useState(false);

  // ========================================================
  // SUCCESS MODAL
  // ========================================================

  const [isSuccessModalOpen, setIsSuccessModalOpen] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("Document deleted successfully.");

  // ========================================================
  // ERROR MODAL
  // ========================================================

  const [isErrorModalOpen, setIsErrorModalOpen] =
    useState(false);

  const [errorTitle, setErrorTitle] =
    useState("Something went wrong");

  const [errorMessage, setErrorMessage] =
    useState("Unable to complete the operation.");

  // ========================================================
  // LOAD DOCUMENT DASHBOARD
  // ========================================================

  const loadDocumentsDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const dashboardData =
        await getDocumentsDashboard();

      setStats(
        dashboardData?.stats || {
          totalDocuments: 0,
          totalCategories: 0,
          recentlyAdded: 0,
          totalFiles: 0,
        }
      );

      setCategories(
        dashboardData?.categories || []
      );

      setDocuments(
        dashboardData?.documents || []
      );
    } catch (err) {
      console.error(
        "Failed to load documents dashboard:",
        err
      );

      const message =
        err?.response?.data?.message ||
        "Failed to load your documents. Please try again.";

      setError(message);

      setDocuments([]);
      setCategories([]);

      setStats({
        totalDocuments: 0,
        totalCategories: 0,
        recentlyAdded: 0,
        totalFiles: 0,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================================
  // INITIAL LOAD
  // ========================================================

  useEffect(() => {
    loadDocumentsDashboard();
  }, [loadDocumentsDashboard]);

  // ========================================================
  // OPEN UPLOAD MODAL
  // ========================================================

  const handleOpenUpload = () => {
    setError("");
    setIsUploadModalOpen(true);
  };

  // ========================================================
  // CLOSE UPLOAD MODAL
  // ========================================================

  const handleCloseUpload = () => {
    setIsUploadModalOpen(false);
  };

  // ========================================================
  // UPLOAD SUCCESS
  // ========================================================

  const handleUploadSuccess = async () => {
    setIsUploadModalOpen(false);

    setSuccessMessage(
      "Document uploaded successfully."
    );

    setIsSuccessModalOpen(true);

    await loadDocumentsDashboard();
  };

  // ========================================================
  // VIEW DOCUMENT
  // ========================================================

  const handleViewDocument = (document) => {
    if (!document) {
      return;
    }

    setSelectedDocument(document);
    setIsViewerOpen(true);
  };

  // ========================================================
  // CLOSE VIEWER
  // ========================================================

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedDocument(null);
  };

  // ========================================================
  // REQUEST DELETE
  // ========================================================

  const handleDeleteDocument = (document) => {
    if (!document?.id) {
      setErrorTitle("Unable to Delete");
      setErrorMessage(
        "The document ID is missing. Please refresh the page and try again."
      );
      setIsErrorModalOpen(true);

      return;
    }

    setDocumentToDelete(document);
    setIsDeleteModalOpen(true);
  };

  // ========================================================
  // CANCEL DELETE
  // ========================================================

  const handleCancelDelete = () => {
    if (isDeleting) {
      return;
    }

    setIsDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  // ========================================================
  // CONFIRM DELETE
  // ========================================================

  const handleConfirmDelete = async () => {
    if (!documentToDelete?.id) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteDocument(
        documentToDelete.id
      );

      const deletedId =
        documentToDelete.id;

      // ----------------------------------------------------
      // Remove from local UI immediately
      // ----------------------------------------------------

      setDocuments((currentDocuments) =>
        currentDocuments.filter(
          (document) =>
            document.id !== deletedId
        )
      );

      // ----------------------------------------------------
      // Close viewer if necessary
      // ----------------------------------------------------

      if (
        selectedDocument?.id === deletedId
      ) {
        setIsViewerOpen(false);
        setSelectedDocument(null);
      }

      // ----------------------------------------------------
      // Close delete modal
      // ----------------------------------------------------

      setIsDeleteModalOpen(false);
      setDocumentToDelete(null);

      // ----------------------------------------------------
      // Show success
      // ----------------------------------------------------

      setSuccessMessage(
        "Document deleted successfully."
      );

      setIsSuccessModalOpen(true);

      // ----------------------------------------------------
      // Reload dashboard
      // This keeps stats/categories accurate.
      // ----------------------------------------------------

      await loadDocumentsDashboard();
    } catch (err) {
      console.error(
        "Failed to delete document:",
        err
      );

      setErrorTitle(
        "Delete Failed"
      );

      setErrorMessage(
        err?.response?.data?.message ||
          "Failed to delete the document. Please try again."
      );

      setIsErrorModalOpen(true);
    } finally {
      setIsDeleting(false);
    }
  };

  // ========================================================
  // CLOSE SUCCESS MODAL
  // ========================================================

  const handleCloseSuccess = () => {
    setIsSuccessModalOpen(false);
  };

  // ========================================================
  // CLOSE ERROR MODAL
  // ========================================================

  const handleCloseError = () => {
    setIsErrorModalOpen(false);
  };

  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ====================================================
          SIDEBAR
      ==================================================== */}

      <Sidebar />

      {/* ====================================================
          MAIN CONTENT
      ==================================================== */}

      <div className="ml-[290px] min-h-screen flex flex-col">

        <Header />

        <main className="flex-1 p-6">

          {/* =================================================
              BANNER
          ================================================= */}

          <div className="mb-3">
            <DocumentsBanner />
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 flex items-center justify-between">

              <p className="text-sm text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={loadDocumentsDashboard}
                className="text-sm font-medium text-red-700 hover:text-red-800 underline"
              >
                Try Again
              </button>

            </div>
          )}

          {/* =================================================
              STATS
          ================================================= */}

          <div className="mb-3">
            <DocumentsStats
              stats={stats}
              loading={loading}
            />
          </div>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="grid grid-cols-12 gap-3 items-start">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="col-span-8">

              <DocumentTable
                documents={documents}
                loading={loading}

                onUploadClick={
                  handleOpenUpload
                }

                onView={
                  handleViewDocument
                }

                onViewAll={() =>
                  setIsAllDocumentsOpen(true)
                }

                onDelete={
                  handleDeleteDocument
                }
              />

            </div>

            {/* =================================================
                RIGHT
            ================================================= */}

            <div className="col-span-4 flex flex-col gap-3">

              <UploadDocumentCard
                onUploadClick={
                  handleOpenUpload
                }
              />

              <CategoriesCard
                categories={categories}
                loading={loading}
              />

            </div>

          </div>

        </main>

      </div>

      {/* ======================================================
          UPLOAD MODAL
      ====================================================== */}

      <UploadDocumentModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUpload}
        onSuccess={handleUploadSuccess}
      />

      {/* ======================================================
          ALL DOCUMENTS
      ====================================================== */}

      <AllDocumentsModal
        isOpen={isAllDocumentsOpen}
        onClose={() =>
          setIsAllDocumentsOpen(false)
        }
        documents={documents}
        onView={handleViewDocument}
        onDelete={handleDeleteDocument}
      />

      {/* ======================================================
          DOCUMENT VIEWER
      ====================================================== */}

      <DocumentViewerModal
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        document={selectedDocument}
      />

      {/* ======================================================
          DELETE CONFIRMATION
      ====================================================== */}

      <DocumentDeleteModal
        isOpen={isDeleteModalOpen}
        document={documentToDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* ======================================================
          SUCCESS
      ====================================================== */}

      <DocumentSuccessModal
        isOpen={isSuccessModalOpen}
        title="Success"
        message={successMessage}
        onClose={handleCloseSuccess}
      />

      {/* ======================================================
          ERROR
      ====================================================== */}

      <DocumentErrorModal
        isOpen={isErrorModalOpen}
        title={errorTitle}
        message={errorMessage}
        onClose={handleCloseError}
      />

    </div>
  );
};

export default Documents;