import React from "react";
import {
  X,
  UploadCloud,
  FileBadge,
} from "lucide-react";

const UploadCertificateModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl border border-slate-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Upload Certificate
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Upload your course certificates and professional learning achievements.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>

        </div>

        {/* Body */}
        <div className="p-6 space-y-5">

          {/* Certificate Title */}
          <div>

            <label className="block text-xs font-medium text-slate-700 mb-1">
              Certificate Title
            </label>

            <input
              type="text"
              placeholder="Enter certificate title"
              className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
            />

          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="block text-xs font-medium text-slate-700 mb-1">
                Category
              </label>

              <select className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500">
                <option>Data Science</option>
                <option>Machine Learning</option>
                <option>Cloud Computing</option>
                <option>Programming</option>
                <option>Business</option>
                <option>Other</option>
              </select>

            </div>

            <div>

              <label className="block text-xs font-medium text-slate-700 mb-1">
                Issue Date
              </label>

              <input
                type="date"
                className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
              />

            </div>

          </div>

          {/* Issuer */}
          <div>

            <label className="block text-xs font-medium text-slate-700 mb-1">
              Issued By
            </label>

            <input
              type="text"
              placeholder="Enter issuing organization"
              className="w-full h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
            />

          </div>

          {/* Upload */}
          <div>

            <label className="block text-xs font-medium text-slate-700 mb-2">
              Upload Certificate
            </label>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 transition cursor-pointer">

              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">

                <UploadCloud
                  size={24}
                  className="text-blue-600"
                />

              </div>

              <p className="text-sm font-medium text-slate-700">
                Drag & Drop your certificate here
              </p>

              <p className="text-xs text-slate-500 mt-1">
                or click below to browse
              </p>

              <button
                type="button"
                className="mt-3 h-9 px-4 rounded-md border border-slate-300 text-xs font-medium hover:bg-slate-50 transition"
              >
                Browse Files
              </button>

              <p className="text-[11px] text-slate-400 mt-3">
                PDF, JPG, PNG • Max 5MB
              </p>

            </div>

          </div>

          {/* Description */}
          <div>

            <label className="block text-xs font-medium text-slate-700 mb-1">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Add a short description..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm resize-none outline-none focus:border-blue-500"
            />

          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200">

          <button
            onClick={onClose}
            className="h-10 px-4 rounded-md border border-slate-300 text-sm font-medium hover:bg-slate-50 transition"
          >
            Cancel
          </button>

          <button className="h-10 px-5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium flex items-center gap-2 transition">

            <FileBadge size={16} />

            Upload Certificate

          </button>

        </div>

      </div>

    </div>
  );
};

export default UploadCertificateModal;