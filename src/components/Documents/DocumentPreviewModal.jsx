import React from "react";
import { X, Download, ExternalLink } from "lucide-react";

const getFileExtension = (fileType, fileUrl) => {
  if (fileType) {
    const type = fileType.toLowerCase();

    if (type.includes("pdf")) return "pdf";
    if (type.includes("png")) return "png";
    if (type.includes("jpeg") || type.includes("jpg")) return "jpg";
    if (type.includes("gif")) return "gif";
    if (type.includes("webp")) return "webp";
    if (type.includes("word") || type.includes("document")) return "docx";
    if (type.includes("excel") || type.includes("spreadsheet")) return "xlsx";
    if (type.includes("powerpoint") || type.includes("presentation")) {
      return "pptx";
    }
  }

  if (fileUrl) {
    const cleanUrl = fileUrl.split("?")[0];
    const extension = cleanUrl.split(".").pop()?.toLowerCase();

    return extension || "";
  }

  return "";
};

const isImageFile = (extension) => {
  return ["jpg", "jpeg", "png", "gif", "webp"].includes(extension);
};

const isOfficeFile = (extension) => {
  return ["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(
    extension
  );
};

const DocumentPreviewModal = ({ document, onClose }) => {
  if (!document) return null;

  const extension = getFileExtension(
    document.fileType,
    document.fileUrl
  );

  const isPdf = extension === "pdf";
  const isImage = isImageFile(extension);
  const isOffice = isOfficeFile(extension);

  const handleDownload = () => {
    if (!document.fileUrl) return;

    window.open(
      document.fileUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const officeViewerUrl = isOffice
    ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
        document.fileUrl
      )}`
    : null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200 flex-shrink-0">

          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-800 truncate">
              {document.documentName}
            </h2>

            <p className="text-xs text-slate-500 mt-0.5">
              {extension?.toUpperCase() || "DOCUMENT"}
            </p>
          </div>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={handleDownload}
              className="h-9 px-3 rounded-md border border-slate-300 hover:bg-slate-50 text-sm flex items-center gap-2 transition"
            >
              <Download size={15} />
              Download
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="p-2 rounded-md hover:bg-slate-100 text-slate-500 transition"
              title="Open in new tab"
            >
              <ExternalLink size={18} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-md hover:bg-slate-100 text-slate-500 transition"
              title="Close"
            >
              <X size={20} />
            </button>

          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 bg-slate-100 overflow-hidden">

          {/* PDF */}
          {isPdf && (
            <iframe
              src={document.fileUrl}
              title={document.documentName}
              className="w-full h-full border-0"
            />
          )}

          {/* Images */}
          {isImage && (
            <div className="w-full h-full flex items-center justify-center p-6 overflow-auto">
              <img
                src={document.fileUrl}
                alt={document.documentName}
                className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
              />
            </div>
          )}

          {/* Word / Excel / PowerPoint */}
          {isOffice && (
            <iframe
              src={officeViewerUrl}
              title={document.documentName}
              className="w-full h-full border-0"
            />
          )}

          {/* Unsupported format */}
          {!isPdf && !isImage && !isOffice && (
            <div className="h-full flex items-center justify-center p-6">

              <div className="text-center max-w-md">

                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <ExternalLink
                    size={28}
                    className="text-blue-600"
                  />
                </div>

                <h3 className="text-lg font-semibold text-slate-800">
                  Preview not available
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  This file format cannot be displayed directly in
                  the browser. You can open or download the original
                  document.
                </p>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="mt-5 h-10 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium inline-flex items-center gap-2"
                >
                  <Download size={16} />
                  Download Document
                </button>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;