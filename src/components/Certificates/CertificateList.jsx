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

import CertificateFilter from "./CertificateFilter";
import CertificateCard from "./CertificateCard";
import EditCertificateModal from "./EditCertificateModal";

import CertificatesDocumentViewerModal from "./CertificatesDocumentViewerModal";
import CertificatesDeleteModal from "./CertificatesDeleteModal";

import {
  getDocumentsDashboard,
  updateDocument,
  deleteDocument,
} from "../../api/document.api";

const CertificateList = ({
  onUploadClick,
  refreshKey = 0,
  onRefresh,
}) => {
  // ==========================================================
  // STATE
  // ==========================================================

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // ==========================================================
  // FILTER
  // ==========================================================

  const [filter, setFilter] = useState("ALL");

  // ==========================================================
  // VIEWER
  // ==========================================================

  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // ==========================================================
  // EDIT / RESUBMIT
  // ==========================================================

  const [certificateToEdit, setCertificateToEdit] =
    useState(null);

  const [isEditModalOpen, setIsEditModalOpen] =
    useState(false);

  // ==========================================================
  // DELETE MODAL
  // ==========================================================

  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);

  const [certificateToDelete, setCertificateToDelete] =
    useState(null);

  // ==========================================================
  // FETCH CERTIFICATES
  // ==========================================================

  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getDocumentsDashboard("CERTIFICATES");

      const documents = Array.isArray(data?.documents)
        ? data.documents
        : Array.isArray(data)
          ? data
          : [];

      const certificateDocuments = documents.filter(
        (document) => document?.category === "CERTIFICATES"
      );

      setCertificates(certificateDocuments);
    } catch (error) {
      console.error(
        "CertificateList.fetchCertificates error:",
        error
      );

      setCertificates([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // INITIAL LOAD + EXTERNAL REFRESH
  // ==========================================================

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates, refreshKey]);

  // ==========================================================
  // REFRESH LIST AND PARENT STATS
  // ==========================================================

  const refreshAfterChange = useCallback(async () => {
    await fetchCertificates();
    onRefresh?.();
  }, [fetchCertificates, onRefresh]);

  // ==========================================================
  // FILTERED CERTIFICATES
  // ==========================================================

  const filteredCertificates = useMemo(() => {
    if (filter === "ALL") {
      return certificates;
    }

    return certificates.filter(
      (certificate) =>
        certificate?.certificateType === filter ||
        certificate?.type === filter ||
        certificate?.documentType === filter
    );
  }, [certificates, filter]);

  // ==========================================================
  // VIEW CERTIFICATE
  // ==========================================================

  const handleView = (certificate) => {
    if (!certificate) return;

    setSelectedCertificate(certificate);
    setIsViewerOpen(true);
  };

  // ==========================================================
  // CLOSE VIEWER
  // ==========================================================

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedCertificate(null);
  };

  // ==========================================================
  // DOWNLOAD CERTIFICATE
  // ==========================================================

  const handleDownload = (certificate) => {
    if (!certificate?.fileUrl) {
      alert("File URL is not available.");
      return;
    }

    const link = window.document.createElement("a");

    link.href = certificate.fileUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download =
      certificate.documentName || "certificate";

    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  // ==========================================================
  // OPEN EDIT / REPLACE / RESUBMIT
  // ==========================================================

  const handleEdit = (certificate) => {
    if (!certificate?.id) return;

    const status = String(
      certificate.certificateReviewStatus ??
        certificate.researchReviewStatus ??
        certificate.reviewStatus ??
        certificate.verificationStatus ??
        certificate.approvalStatus ??
        certificate.status ??
        "NOT_REVIEWED"
    )
      .trim()
      .toUpperCase()
      .replace(/[\s-]+/g, "_");

    if (["VERIFIED", "APPROVED"].includes(status)) {
      alert("Verified certificates cannot be edited.");
      return;
    }

    setCertificateToEdit(certificate);
    setIsEditModalOpen(true);
  };

  // ==========================================================
  // CLOSE EDIT MODAL
  // ==========================================================

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setCertificateToEdit(null);
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
      throw new Error("Certificate ID is missing.");
    }

    if (!file) {
      throw new Error(
        "Please select the replacement certificate file."
      );
    }

    try {
      await updateDocument({
        documentId: id,
        documentName: documentName.trim(),
        category: "CERTIFICATES",
        description: description?.trim() || "",
        file,
      });

      await refreshAfterChange();

      if (selectedCertificate?.id === id) {
        setIsViewerOpen(false);
        setSelectedCertificate(null);
      }

      return true;
    } catch (error) {
      console.error(
        "CertificateList.handleSaveEdit error:",
        error
      );

      throw error;
    }
  };

  // ==========================================================
  // OPEN DELETE MODAL
  // ==========================================================

  const handleDelete = (certificate) => {
    if (!certificate?.id) return;

    const status = String(
      certificate.certificateReviewStatus ??
        certificate.researchReviewStatus ??
        certificate.reviewStatus ??
        certificate.verificationStatus ??
        certificate.approvalStatus ??
        certificate.status ??
        "NOT_REVIEWED"
    )
      .trim()
      .toUpperCase()
      .replace(/[\s-]+/g, "_");

    if (["VERIFIED", "APPROVED"].includes(status)) {
      alert("Verified certificates cannot be deleted.");
      return;
    }

    setCertificateToDelete(certificate);
    setIsDeleteModalOpen(true);
  };

  // ==========================================================
  // CANCEL DELETE
  // ==========================================================

  const handleCancelDelete = () => {
    if (deleting) return;

    setIsDeleteModalOpen(false);
    setCertificateToDelete(null);
  };

  // ==========================================================
  // CONFIRM DELETE
  // ==========================================================

  const handleConfirmDelete = async () => {
    if (!certificateToDelete?.id || deleting) return;

    try {
      setDeleting(true);

      await deleteDocument(certificateToDelete.id);

      setCertificates((previous) =>
        previous.filter(
          (item) => item.id !== certificateToDelete.id
        )
      );

      if (
        selectedCertificate?.id === certificateToDelete.id
      ) {
        setIsViewerOpen(false);
        setSelectedCertificate(null);
      }

      setIsDeleteModalOpen(false);
      setCertificateToDelete(null);

      onRefresh?.();
    } catch (error) {
      console.error(
        "CertificateList.handleConfirmDelete error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete the certificate."
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
      <div className="w-full min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4 lg:p-5">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">

          <h2 className="text-base font-semibold text-slate-800 sm:text-lg">
            Your Certificates
          </h2>

          {/* FILTER + UPLOAD */}

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">

            <CertificateFilter
              value={filter}
              onChange={setFilter}
            />

            <button
              type="button"
              onClick={onUploadClick}
              className="
                inline-flex h-9 flex-1 items-center justify-center
                gap-2 rounded-md bg-blue-600 px-3
                text-xs font-medium text-white
                transition hover:bg-blue-700
                active:scale-[0.98]
                sm:h-10 sm:flex-none sm:px-4
              "
            >
              <Plus size={15} className="shrink-0" />
              <span className="whitespace-nowrap">
                Upload Certificate
              </span>
            </button>

          </div>
        </div>

        {/* ====================================================
            LOADING
        ==================================================== */}

        {loading ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 px-4 py-12">

            <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

            <p className="text-center text-sm text-slate-500">
              Loading certificates...
            </p>

          </div>
        ) : filteredCertificates.length === 0 ? (

          /* ==================================================
              EMPTY STATE
          ================================================== */

          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 px-4 py-10 text-center sm:px-6 sm:py-12">

            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <FileSearch
                size={23}
                className="text-blue-600"
              />
            </div>

            <h3 className="text-sm font-semibold text-slate-700">
              {filter === "ALL"
                ? "No certificates yet"
                : "No certificates found"}
            </h3>

            <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-400">
              {filter === "ALL"
                ? "Upload your first course, professional, or learning certificate."
                : "Try selecting a different certificate category."}
            </p>

            {filter === "ALL" && (
              <button
                type="button"
                onClick={onUploadClick}
                className="mt-4 inline-flex min-h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
              >
                Upload Certificate
              </button>
            )}

          </div>
        ) : (

          /* ==================================================
              CERTIFICATE LIST
          ================================================== */

          <div className="w-full min-w-0 space-y-2.5">

            {filteredCertificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
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

      {/* ======================================================
          EDIT / REPLACE / RESUBMIT MODAL
      ====================================================== */}

      <EditCertificateModal
        isOpen={isEditModalOpen}
        certificate={certificateToEdit}
        onClose={handleCloseEditModal}
        onSave={handleSaveEdit}
        onSuccess={refreshAfterChange}
      />

      {/* ======================================================
          DOCUMENT VIEWER
      ====================================================== */}

      <CertificatesDocumentViewerModal
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        document={selectedCertificate}
      />

      {/* ======================================================
          DELETE CONFIRMATION
      ====================================================== */}

      <CertificatesDeleteModal
        isOpen={isDeleteModalOpen}
        document={certificateToDelete}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        isDeleting={deleting}
      />

    </>
  );
};

export default CertificateList;
