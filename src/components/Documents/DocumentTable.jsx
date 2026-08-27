import React, { useMemo, useState } from "react";
import {
  Plus,
  Loader2,
  FileText,
} from "lucide-react";

import DocumentRow from "./DocumentRow";
import DocumentFilter from "./DocumentFilter";

const DocumentTable = ({
  documents = [],
  loading = false,
  onUploadClick,
  onDelete,
  onView,
  onViewAll,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState("ALL");

  const filteredDocuments = useMemo(() => {
    if (selectedCategory === "ALL") {
      return documents;
    }

    return documents.filter(
      (document) =>
        document.category === selectedCategory
    );
  }, [documents, selectedCategory]);

  const displayedDocuments =
    filteredDocuments.slice(0, 10);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-xl font-semibold text-slate-800">
          My Documents
        </h2>

        <div className="flex items-center gap-2">

          <DocumentFilter
            value={selectedCategory}
            onChange={handleFilterChange}
          />

          <button
            type="button"
            onClick={onUploadClick}
            className="h-9 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-sm transition"
          >
            <Plus size={15} />
            Upload Document
          </button>

        </div>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-slate-50 border border-slate-200 text-left text-xs text-slate-500">

              <th className="px-3 py-3 font-medium">
                Document Name
              </th>

              <th className="px-3 py-3 font-medium">
                Category
              </th>

              <th className="px-3 py-3 font-medium">
                Type
              </th>

              <th className="px-3 py-3 font-medium">
                Uploaded On
              </th>

              <th className="px-3 py-3 font-medium">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {/* LOADING */}

            {loading ? (

              <tr>

                <td
                  colSpan="5"
                  className="py-12 text-center"
                >

                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500">

                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Loading documents...

                  </div>

                </td>

              </tr>

            ) : displayedDocuments.length === 0 ? (

              /* EMPTY */

              <tr>

                <td
                  colSpan="5"
                  className="py-12 text-center"
                >

                  <div className="flex flex-col items-center justify-center">

                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">

                      <FileText
                        size={22}
                        className="text-slate-400"
                      />

                    </div>

                    <p className="text-sm font-medium text-slate-700">

                      {selectedCategory === "ALL"
                        ? "No documents found"
                        : "No documents found in this category"}

                    </p>

                    <p className="text-xs text-slate-400 mt-1">

                      {selectedCategory === "ALL"
                        ? "Upload your first document to get started."
                        : "Try selecting another category."}

                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              displayedDocuments.map((document) => (

                <DocumentRow
                  key={document.id}
                  document={document}
                  onDelete={onDelete}
                  onView={onView}
                />

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* COUNT */}

      {!loading &&
        filteredDocuments.length > 0 && (

          <div className="flex items-center justify-between mt-4">

            <p className="text-xs text-slate-400">

              Showing{" "}

              <span className="font-medium text-slate-500">
                {Math.min(
                  filteredDocuments.length,
                  10
                )}
              </span>{" "}

              of{" "}

              <span className="font-medium text-slate-500">
                {filteredDocuments.length}
              </span>{" "}

              {selectedCategory !== "ALL"
                ? "filtered documents"
                : "documents"}

            </p>

            {filteredDocuments.length > 10 && (

              <button
                type="button"
                onClick={onViewAll}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
              >
                View All Documents
              </button>

            )}

          </div>

        )}

      {/* VIEW ALL */}

      {!loading &&
        filteredDocuments.length > 0 &&
        filteredDocuments.length <= 10 && (

          <div className="flex justify-center mt-5">

            <button
              type="button"
              onClick={onViewAll}
              className="w-80 h-10 rounded-md border border-slate-300 hover:bg-slate-50 text-sm font-medium text-slate-700 transition"
            >
              View All Documents
            </button>

          </div>

        )}

    </div>
  );
};

export default DocumentTable;