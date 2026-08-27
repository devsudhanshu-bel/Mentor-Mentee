import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Trash2,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

const ResourcesTab = ({
  resources,
  setResources,
}) => {
  const [resourceInput, setResourceInput] = useState("");

  const handleAddResource = () => {
    if (!resourceInput.trim()) return;

    setResources([
      ...resources,
      resourceInput,
    ]);

    setResourceInput("");
  };

  const handleDeleteResource = (index) => {
    setResources(
      resources.filter((_, i) => i !== index)
    );
  };

  const getIcon = (resource) => {
    const value = resource.toLowerCase();

    if (
      value.startsWith("http") ||
      value.startsWith("www")
    ) {
      return (
        <LinkIcon
          size={17}
          className="text-blue-600"
        />
      );
    }

    return (
      <FileText
        size={17}
        className="text-blue-600"
      />
    );
  };

  return (
    <div className="p-5">

      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Resources
          </h2>

          <p className="mt-1 text-[13px] text-slate-500">
            Share useful documents, PDFs, links and
            learning material with your mentee.
          </p>

        </div>

        <div className="rounded-lg bg-blue-50 px-4 py-2 text-center">

          <p className="text-[11px] text-slate-500">
            Total
          </p>

          <p className="text-sm font-bold text-blue-700">
            {resources.length}
          </p>

        </div>

      </div>

      {/* Empty State */}

      {resources.length === 0 ? (

        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center">

          <BookOpen
            size={42}
            className="mx-auto mb-3 text-slate-300"
          />

          <p className="text-[13px] text-slate-500">
            No resources added yet.
          </p>

        </div>

      ) : (

        <div className="space-y-3">

          {resources.map((resource, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >

              <div className="flex items-center gap-3">

                {getIcon(resource)}

                <span className="text-[13px] text-slate-700 break-all">
                  {resource}
                </span>

              </div>

              <button
                onClick={() =>
                  handleDeleteResource(index)
                }
                className="rounded-md p-2 text-red-500 transition hover:bg-red-50"
              >

                <Trash2 size={15} />

              </button>

            </div>

          ))}

        </div>

      )}

      {/* Add Resource */}

      <div className="mt-5 flex gap-2">

        <input
          value={resourceInput}
          onChange={(e) =>
            setResourceInput(e.target.value)
          }
          placeholder="Paste a URL or enter a document name..."
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-[13px] outline-none transition focus:border-blue-500"
        />

        <button
          onClick={handleAddResource}
          className="rounded-lg bg-blue-600 px-4 text-white transition hover:bg-blue-700"
        >

          <Plus size={17} />

        </button>

      </div>

    </div>
  );
};

export default ResourcesTab;