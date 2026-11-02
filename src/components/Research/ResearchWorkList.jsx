
import { useCallback, useEffect, useState } from "react";

import { Plus, FileSearch } from "lucide-react";

import api from "../../api/axios";

import ResearchWorkCard from "./ResearchWorkCard";
import UploadResearchModal from "./UploadResearchModal";
import ResearchDocumentPreviewModal from "./ResearchDocumentPreviewModal";

import {
  getResearchDocuments,
  deleteDocument,
} from "../../api/document.api";

// ==========================================================
// FILE URL HELPER
// ==========================================================

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

// ==========================================================
// RESPONSE NORMALIZER
// ==========================================================

const normalizeResearchDocuments = (data) => {
  if (Array.isArray(data?.documents)) {
    return data.documents;
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
};

// ==========================================================
// RESEARCH WORK LIST
// ==========================================================

const ResearchWorkList = ({ onEditResearch }) => {
  const [researchDocuments, setResearchDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // ==========================================================
  // INITIAL FETCH
  // ==========================================================

  useEffect(() => {
    let isActive = true;

    getResearchDocuments()
      .then((data) => {
        if (!isActive) return;

        setResearchDocuments(normalizeResearchDocuments(data));
      })
      .catch((error) => {
        if (!isActive) return;

        console.error(
          "ResearchWorkList.fetchResearchDocuments error:",
          error
        );

        console.error("Backend response:", error?.response?.data);

        setResearchDocuments([]);
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
  // REFRESH RESEARCH DOCUMENTS
  // ==========================================================

  const fetchResearchDocuments = useCallback(async () => {
    try {
      const data = await getResearchDocuments();

      setResearchDocuments(normalizeResearchDocuments(data));
    } catch (error) {
      console.error(
        "ResearchWorkList.fetchResearchDocuments error:",
        error
      );

      console.error("Backend response:", error?.response?.data);

      setResearchDocuments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // VIEW DOCUMENT
  // ==========================================================

  const handleView = (researchDocument) => {
    setSelectedDocument(researchDocument);
  };

  // ==========================================================
  // DOWNLOAD DOCUMENT
  // ==========================================================

  const handleDownload = async (researchDocument) => {
    if (!researchDocument?.fileUrl) {
      alert("File URL is not available.");
      return;
    }

    try {
      const response = await api.get(
        resolveFileUrl(researchDocument.fileUrl),
        {
          responseType: "blob",
        }
      );

      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = window.document.createElement("a");

      link.href = downloadUrl;
      link.download =
        researchDocument.documentName || "research-document";

      window.document.body.appendChild(link);
      link.click();
      link.remove();

      window.setTimeout(() => {
        window.URL.revokeObjectURL(downloadUrl);
      }, 60000);
    } catch (error) {
      console.error("Research document download error:", error);
      console.error("Backend response:", error?.response?.data);

      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
      } else if (error.response?.status === 403) {
        alert("You do not have permission to download this document.");
      } else if (error.response?.status === 404) {
        alert("The research document could not be found.");
      } else {
        alert("Failed to download the research document. Please try again.");
      }
    }
  };

  // ==========================================================
  // EDIT / REPLACE DOCUMENT
  // ==========================================================

  const handleEdit = (researchDocument) => {
    if (!researchDocument?.id) {
      alert("Unable to edit this document because its ID is missing.");
      return;
    }

    if (typeof onEditResearch !== "function") {
      console.error(
        "onEditResearch was not provided by the Research page."
      );

      alert(
        "The edit modal is not connected. Check the Research.jsx integration."
      );

      return;
    }

    onEditResearch(researchDocument);
  };

  // ==========================================================
  // DELETE DOCUMENT
  // ==========================================================

  const handleDelete = async (researchDocument) => {
    if (!researchDocument?.id) {
      alert("Unable to delete this document because its ID is missing.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${researchDocument.documentName}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(researchDocument.id);

      await deleteDocument(researchDocument.id);

      setResearchDocuments((previous) =>
        previous.filter((item) => item.id !== researchDocument.id)
      );

      setSelectedDocument((previous) =>
        previous?.id === researchDocument.id ? null : previous
      );
    } catch (error) {
      console.error("Delete document error:", error);
      console.error("Backend response:", error?.response?.data);

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to delete the research document."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================================
  // UPLOAD SUCCESS
  // ==========================================================

  const handleUploadSuccess = async () => {
    setIsUploadModalOpen(false);
    setLoading(true);

    await fetchResearchDocuments();
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-5">

        {/* HEADER */}

        <div className="mb-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="min-w-0 break-words text-base font-semibold text-slate-800 sm:text-lg">
            My Research Works
          </h2>

          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex min-h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700 sm:w-auto"
          >
            <Plus size={15} className="shrink-0" />
            Upload Research
          </button>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 px-4 py-12">
            <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

            <p className="text-center text-sm text-slate-500">
              Loading research works...
            </p>
          </div>
        ) : researchDocuments.length === 0 ? (

          /* EMPTY STATE */

          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 px-4 py-10 text-center sm:px-6 sm:py-12">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <FileSearch size={23} className="text-blue-600" />
            </div>

            <h3 className="text-sm font-semibold text-slate-700">
              No research works yet
            </h3>

            <p className="mt-1 max-w-sm break-words text-xs leading-5 text-slate-400">
              Upload your first research paper, presentation, or report.
            </p>

            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="mt-4 inline-flex min-h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
            >
              Upload Research
            </button>
          </div>
        ) : (

          /* RESEARCH DOCUMENT LIST */

          <div className="min-w-0 space-y-3">
            {researchDocuments.map((researchDocument) => (
              <ResearchWorkCard
                key={researchDocument.id}
                research={researchDocument}
                onView={handleView}
                onDownload={handleDownload}
                onDelete={handleDelete}
                onEdit={handleEdit}
                deleting={deletingId === researchDocument.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* UPLOAD RESEARCH MODAL */}

      <UploadResearchModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
        onUploaded={handleUploadSuccess}
      />

      {/* RESEARCH DOCUMENT PREVIEW MODAL */}

      <ResearchDocumentPreviewModal
        isOpen={Boolean(selectedDocument)}
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
        onDownload={handleDownload}
      />
    </>
  );
};

export default ResearchWorkList;
