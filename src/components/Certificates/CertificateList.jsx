import React, {
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

import {
  getDocumentsDashboard,
  deleteDocument,
} from "../../api/document.api";

import CertificatesDocumentViewerModal from "./CertificatesDocumentViewerModal";
import CertificatesDeleteModal from "./CertificatesDeleteModal";

const CertificateList = ({
  onUploadClick,
  refreshKey = 0,
}) => {
  // ==========================================================
  // STATE
  // ==========================================================

  const [certificates, setCertificates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deleting, setDeleting] =
    useState(false);

  // ==========================================================
  // FILTER
  // ==========================================================

  const [filter, setFilter] =
    useState("ALL");

  // ==========================================================
  // VIEWER
  // ==========================================================

  const [
    selectedCertificate,
    setSelectedCertificate,
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
    certificateToDelete,
    setCertificateToDelete,
  ] = useState(null);

  // ==========================================================
  // FETCH CERTIFICATES
  // ==========================================================

  const fetchCertificates = async () => {
    try {
      setLoading(true);

      const data =
        await getDocumentsDashboard(
          "CERTIFICATES"
        );

      console.log(
        "Certificates API response:",
        data
      );

      const documents =
        Array.isArray(data?.documents)
          ? data.documents
          : [];

      const certificateDocuments =
        documents.filter(
          (document) =>
            document?.category ===
            "CERTIFICATES"
        );

      setCertificates(
        certificateDocuments
      );
    } catch (error) {
      console.error(
        "CertificateList.fetchCertificates error:",
        error
      );

      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // INITIAL LOAD + REFRESH AFTER UPLOAD
  // ==========================================================

  useEffect(() => {
    fetchCertificates();
  }, [refreshKey]);

  // ==========================================================
  // FILTERED CERTIFICATES
  // ==========================================================

  const filteredCertificates =
    useMemo(() => {
      if (filter === "ALL") {
        return certificates;
      }

      return certificates.filter(
        (certificate) =>
          certificate?.certificateType ===
            filter ||
          certificate?.type ===
            filter
      );
    }, [
      certificates,
      filter,
    ]);

  // ==========================================================
  // VIEW CERTIFICATE
  // ==========================================================

  const handleView = (
    certificate
  ) => {
    if (!certificate) {
      return;
    }

    console.log(
      "Opening certificate:",
      certificate
    );

    setSelectedCertificate(
      certificate
    );

    setIsViewerOpen(true);
  };

  // ==========================================================
  // CLOSE VIEWER
  // ==========================================================

  const handleCloseViewer =
    () => {
      setIsViewerOpen(false);

      setSelectedCertificate(
        null
      );
    };

  // ==========================================================
  // DOWNLOAD CERTIFICATE
  // ==========================================================

  const handleDownload = (
    certificate
  ) => {
    if (!certificate?.fileUrl) {
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
      certificate.fileUrl;

    link.target = "_blank";

    link.rel =
      "noopener noreferrer";

    link.download =
      certificate.documentName ||
      "certificate";

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
    certificate
  ) => {
    if (!certificate?.id) {
      return;
    }

    setCertificateToDelete(
      certificate
    );

    setIsDeleteModalOpen(
      true
    );
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

      setCertificateToDelete(
        null
      );
    };

  // ==========================================================
  // CONFIRM DELETE
  // ==========================================================

  const handleConfirmDelete =
    async () => {
      if (
        !certificateToDelete?.id ||
        deleting
      ) {
        return;
      }

      try {
        setDeleting(true);

        await deleteDocument(
          certificateToDelete.id
        );

        // Immediately update list
        setCertificates(
          (previous) =>
            previous.filter(
              (item) =>
                item.id !==
                certificateToDelete.id
            )
        );

        // Close viewer if required
        if (
          selectedCertificate?.id ===
          certificateToDelete.id
        ) {
          setIsViewerOpen(false);

          setSelectedCertificate(
            null
          );
        }

        // Close delete modal
        setIsDeleteModalOpen(false);

        setCertificateToDelete(
          null
        );

        console.log(
          "Certificate deleted successfully."
        );
      } catch (error) {
        console.error(
          "CertificateList.handleConfirmDelete error:",
          error
        );

        alert(
          error?.response?.data
            ?.message ||
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
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-lg font-semibold text-slate-800">
            Your Certificates
          </h2>

          <div className="flex items-center gap-2">

            <CertificateFilter
              value={filter}
              onChange={setFilter}
            />

            <button
              type="button"
              onClick={
                onUploadClick
              }
              className="h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium flex items-center gap-2 transition"
            >
              <Plus size={15} />

              Upload Certificate
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
              Loading certificates...
            </p>

          </div>

        ) : filteredCertificates.length === 0 ? (

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
                ? "No certificates yet"
                : "No certificates found"}
            </h3>

            <p className="text-xs text-slate-400 mt-1 max-w-md">
              {filter === "ALL"
                ? "Upload your first course, professional, or learning certificate."
                : "Try selecting a different certificate category."}
            </p>

            {filter === "ALL" && (
              <button
                type="button"
                onClick={
                  onUploadClick
                }
                className="mt-4 h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition"
              >
                Upload Certificate
              </button>
            )}

          </div>

        ) : (

          /* ==================================================
             CERTIFICATE LIST
          ================================================== */

          <div className="space-y-2.5">

            {filteredCertificates.map(
              (certificate) => (
                <CertificateCard
                  key={
                    certificate.id
                  }
                  certificate={
                    certificate
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
          CERTIFICATE VIEWER
      ====================================================== */}

      <CertificatesDocumentViewerModal
        isOpen={
          isViewerOpen
        }
        onClose={
          handleCloseViewer
        }
        document={
          selectedCertificate
        }
      />

      {/* ======================================================
          DELETE MODAL
      ====================================================== */}

      <CertificatesDeleteModal
        isOpen={
          isDeleteModalOpen
        }
        document={
          certificateToDelete
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

export default CertificateList;