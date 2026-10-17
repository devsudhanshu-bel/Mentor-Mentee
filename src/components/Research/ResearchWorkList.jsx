import React, { useCallback, useEffect, useState } from "react";

import { Plus, FileSearch } from "lucide-react";

import ResearchWorkCard from "./ResearchWorkCard";
import UploadResearchModal from "./UploadResearchModal";
import ResearchDocumentPreviewModal from "./ResearchDocumentPreviewModal";

import {
  getResearchDocuments,
  deleteDocument,
} from "../../api/document.api";

const ResearchWorkList = ({ onEditResearch }) => {
  const [researchDocuments, setResearchDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // ==========================================================
  // FETCH RESEARCH DOCUMENTS
  // ==========================================================

  const fetchResearchDocuments = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getResearchDocuments();

      const documents = Array.isArray(data?.documents)
        ? data.documents
        : Array.isArray(data)
          ? data
          : [];

      setResearchDocuments(documents);
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

  useEffect(() => {
    fetchResearchDocuments();
  }, [fetchResearchDocuments]);

  // ==========================================================
  // VIEW DOCUMENT
  // ==========================================================

  const handleView = (researchDocument) => {
    setSelectedDocument(researchDocument);
  };

  // ==========================================================
  // DOWNLOAD DOCUMENT
  // ==========================================================

  const handleDownload = (researchDocument) => {
    if (!researchDocument?.fileUrl) {
      alert("File URL is not available.");
      return;
    }

    const link = window.document.createElement("a");

    link.href = researchDocument.fileUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download =
      researchDocument.documentName || "research-document";

    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
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
    await fetchResearchDocuments();
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        {/* HEADER */}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            My Research Works
          </h2>

          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="h-9 px-3 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition"
          >
            <Plus size={15} />
            Upload Research
          </button>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="border border-slate-200 rounded-lg px-4 py-12 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />

            <p className="text-sm text-slate-500">
              Loading research works...
            </p>
          </div>
        ) : researchDocuments.length === 0 ? (
          /* EMPTY STATE */

          <div className="border-2 border-dashed border-slate-200 rounded-lg px-6 py-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
              <FileSearch size={23} className="text-blue-600" />
            </div>

            <h3 className="text-sm font-semibold text-slate-700">
              No research works yet
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Upload your first research paper, presentation, or report.
            </p>

            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="mt-4 h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition"
            >
              Upload Research
            </button>
          </div>
        ) : (
          /* RESEARCH DOCUMENT LIST */

          <div className="space-y-2.5">
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