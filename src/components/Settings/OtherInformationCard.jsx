import React from "react";

const OtherInformationCard = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">

      {/* Header */}
      <div className="mb-5">

        <h2 className="text-base font-semibold text-slate-800">
          Other Information
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          Additional contact and social information.
        </p>

      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4">

        {/* Address */}
        <div className="col-span-2">

          <label className="block text-xs font-medium text-slate-700 mb-1">
            Address
          </label>

          <textarea
            rows={3}
            defaultValue="Christ (Deemed to be University), Bangalore, Karnataka"
            className="w-full rounded-lg border border-slate-300 p-3 text-sm resize-none outline-none focus:border-blue-500"
          />

        </div>

        {/* City */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            City
          </label>

          <input
            type="text"
            defaultValue="Bangalore"
            className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
          />

        </div>

        {/* State */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            State
          </label>

          <input
            type="text"
            defaultValue="Karnataka"
            className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
          />

        </div>

        {/* Country */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            Country
          </label>

          <input
            type="text"
            defaultValue="India"
            className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
          />

        </div>

        {/* Postal Code */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            Postal Code
          </label>

          <input
            type="text"
            defaultValue="560029"
            className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
          />

        </div>

        {/* LinkedIn */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            LinkedIn
          </label>

          <input
            type="url"
            defaultValue="https://linkedin.com/in/adminuser"
            className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
          />

        </div>

        {/* GitHub */}
        <div>

          <label className="block text-xs font-medium text-slate-700 mb-1">
            GitHub
          </label>

          <input
            type="url"
            defaultValue="https://github.com/adminuser"
            className="w-full h-10 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
          />

        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end mt-5">

        <button
          className="
            px-5
            h-10
            rounded-lg
            bg-blue-600
            hover:bg-blue-700
            text-white
            text-sm
            font-medium
            transition
          "
        >
          Save Information
        </button>

      </div>

    </div>
  );
};

export default OtherInformationCard;