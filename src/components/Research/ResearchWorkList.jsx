import React, {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  FileSearch,
} from "lucide-react";

import ResearchWorkCard from "./ResearchWorkCard";
import UploadResearchModal from "./UploadResearchModal";
import ResearchDocumentPreviewModal from "./ResearchDocumentPreviewModal";

import {
  getResearchDocuments,
  deleteDocument,
} from "../../api/document.api";

const ResearchWorkList = () => {
  const [
    researchDocuments,
    setResearchDocuments,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState(null);

  const [
    selectedDocument,
    setSelectedDocument,
  ] = useState(null);

  const [
    isUploadModalOpen,
    setIsUploadModalOpen,
  ] = useState(false);

  // ==========================================================
  // FETCH RESEARCH DOCUMENTS
  // ==========================================================

  const fetchResearchDocuments =
    async () => {
      try {
        setLoading(true);

        const data =
          await getResearchDocuments();

        console.log(
          "Research documents response:",
          data
        );

        const documents =
          Array.isArray(
            data?.documents
          )
            ? data.documents
            : Array.isArray(data)
            ? data
            : [];

        console.log(
          "Research documents:",
          documents
        );

        setResearchDocuments(
          documents
        );
      } catch (error) {
        console.error(
          "ResearchWorkList.fetchResearchDocuments error:",
          error
        );

        console.error(
          "Backend response:",
          error?.response?.data
        );

        setResearchDocuments([]);
      } finally {
        setLoading(false);
      }
    };

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    fetchResearchDocuments();
  }, []);

  // ==========================================================
  // VIEW DOCUMENT
  // ==========================================================

  const handleView = (
    researchDocument
  ) => {
    console.log(
      "Opening research document:",
      researchDocument
    );

    setSelectedDocument(
      researchDocument
    );
  };

  // ==========================================================
  // DOWNLOAD DOCUMENT
  // ==========================================================

  const handleDownload = (
    researchDocument
  ) => {
    if (
      !researchDocument?.fileUrl
    ) {
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
      researchDocument.fileUrl;

    link.target = "_blank";

    link.rel =
      "noopener noreferrer";

    link.download =
      researchDocument.documentName ||
      "research-document";

    window.document.body.appendChild(
      link
    );

    link.click();

    window.document.body.removeChild(
      link
    );
  };

  // ==========================================================
  // DELETE DOCUMENT
  // ==========================================================

  const handleDelete = async (
    researchDocument
  ) => {
    console.log(
      "========================================"
    );

    console.log(
      "DELETE HANDLER STARTED"
    );

    console.log(
      "Document object:",
      researchDocument
    );

    console.log(
      "Document ID:",
      researchDocument?.id
    );

    console.log(
      "Document name:",
      researchDocument?.documentName
    );

    console.log(
      "========================================"
    );

    // --------------------------------------------------------
    // CHECK ID
    // --------------------------------------------------------

    if (!researchDocument?.id) {
      console.error(
        "DELETE FAILED: Missing document ID."
      );

      alert(
        "Unable to delete this document because its ID is missing."
      );

      return;
    }

    // --------------------------------------------------------
    // CONFIRM
    // --------------------------------------------------------

    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${researchDocument.documentName}"?`
      );

    if (!confirmed) {
      console.log(
        "Delete cancelled by user."
      );

      return;
    }

    // --------------------------------------------------------
    // START DELETE
    // --------------------------------------------------------

    try {
      setDeletingId(
        researchDocument.id
      );

      console.log(
        "Calling deleteDocument with ID:",
        researchDocument.id
      );

      const result =
        await deleteDocument(
          researchDocument.id
        );

      console.log(
        "Delete API result:",
        result
      );

      // ------------------------------------------------------
      // REMOVE FROM UI
      // ------------------------------------------------------

      setResearchDocuments(
        (previous) =>
          previous.filter(
            (item) =>
              item.id !==
              researchDocument.id
          )
      );

      // ------------------------------------------------------
      // CLOSE PREVIEW
      // ------------------------------------------------------

      if (
        selectedDocument?.id ===
        researchDocument.id
      ) {
        setSelectedDocument(null);
      }

      console.log(
        "Document successfully removed from UI."
      );

      // ------------------------------------------------------
      // OPTIONAL SUCCESS MESSAGE
      // ------------------------------------------------------

      // Don't use alert here because
      // the UI update itself confirms success.

    } catch (error) {
      console.error(
        "========================================"
      );

      console.error(
        "DELETE DOCUMENT ERROR"
      );

      console.error(
        "Status:",
        error?.response?.status
      );

      console.error(
        "Status text:",
        error?.response?.statusText
      );

      console.error(
        "Backend response:",
        error?.response?.data
      );

      console.error(
        "Error message:",
        error?.message
      );

      console.error(
        "========================================"
      );

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error;

      alert(
        backendMessage ||
          "Failed to delete the research document. Check the browser console for the exact error."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================================
  // UPLOAD SUCCESS
  // ==========================================================

  const handleUploadSuccess =
    async () => {
      setIsUploadModalOpen(
        false
      );

      await fetchResearchDocuments();
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

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-lg font-semibold text-slate-800">
            My Research Works
          </h2>

          <button
            type="button"
            onClick={() =>
              setIsUploadModalOpen(
                true
              )
            }
            className="h-9 px-3 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition"
          >
            <Plus size={15} />

            Upload Research
          </button>

        </div>

        {/* ==================================================
            LOADING
        ================================================== */}

        {loading ? (
          <div className="border border-slate-200 rounded-lg px-4 py-12 flex flex-col items-center justify-center">

            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />

            <p className="text-sm text-slate-500">
              Loading research works...
            </p>

          </div>
        ) : researchDocuments.length ===
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
              No research works yet
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Upload your first research
              paper, presentation, or
              report.
            </p>

            <button
              type="button"
              onClick={() =>
                setIsUploadModalOpen(
                  true
                )
              }
              className="mt-4 h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition"
            >
              Upload Research
            </button>

          </div>

        ) : (

          /* ==================================================
             RESEARCH DOCUMENT LIST
          ================================================== */

          <div className="space-y-2.5">

            {researchDocuments.map(
              (
                researchDocument
              ) => (
                <ResearchWorkCard
                  key={
                    researchDocument.id
                  }
                  research={
                    researchDocument
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
                    deletingId ===
                    researchDocument.id
                  }
                />
              )
            )}

          </div>
        )}

      </div>

      {/* ====================================================
          UPLOAD RESEARCH MODAL
      ==================================================== */}

      <UploadResearchModal
        isOpen={
          isUploadModalOpen
        }
        onClose={() =>
          setIsUploadModalOpen(
            false
          )
        }
        onSuccess={
          handleUploadSuccess
        }
        onUploaded={
          handleUploadSuccess
        }
      />

      {/* ====================================================
          RESEARCH DOCUMENT PREVIEW MODAL
      ==================================================== */}

      <ResearchDocumentPreviewModal
        isOpen={Boolean(
          selectedDocument
        )}
        document={
          selectedDocument
        }
        onClose={() =>
          setSelectedDocument(null)
        }
        onDownload={
          handleDownload
        }
      />
    </>
  );
};

export default ResearchWorkList;