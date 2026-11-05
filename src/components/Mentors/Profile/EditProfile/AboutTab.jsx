import React from "react";

const AboutTab = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-w-0 space-y-4 sm:space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-[14px] font-semibold text-slate-900 sm:text-[15px]">
          About & Mentoring Highlights
        </h2>

        <p className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-[12px]">
          Tell students about yourself and your mentoring experience.
        </p>
      </div>

      {/* About */}
      <div className="space-y-2">
        <label className="text-[12px] font-medium text-slate-700">
          About
        </label>

        <textarea
          rows={7}
          name="about"
          value={formData.about || ""}
          onChange={handleChange}
          placeholder="Write a short professional introduction..."
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-slate-300
            px-3 py-2.5
            text-[13px]
            outline-none
            transition
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            sm:px-4 sm:py-3
          "
        />
      </div>

      {/* Highlights */}
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:gap-4">
        <div className="min-w-0 space-y-2">
          <label className="text-[12px] font-medium text-slate-700">
            Highlight 1
          </label>

          <input
            type="text"
            name="highlightOne"
            value={formData.highlightOne || ""}
            onChange={handleChange}
            placeholder="Example: 12+ Years Teaching Experience"
            className="
              w-full min-w-0
              rounded-xl
              border
              border-slate-300
              px-3 py-2.5
              text-[13px]
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              sm:px-4 sm:py-3
            "
          />
        </div>

        <div className="min-w-0 space-y-2">
          <label className="text-[12px] font-medium text-slate-700">
            Highlight 2
          </label>

          <input
            type="text"
            name="highlightTwo"
            value={formData.highlightTwo || ""}
            onChange={handleChange}
            placeholder="Example: 25+ Research Publications"
            className="
              w-full min-w-0
              rounded-xl
              border
              border-slate-300
              px-3 py-2.5
              text-[13px]
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              sm:px-4 sm:py-3
            "
          />
        </div>

        <div className="min-w-0 space-y-2">
          <label className="text-[12px] font-medium text-slate-700">
            Highlight 3
          </label>

          <input
            type="text"
            name="highlightThree"
            value={formData.highlightThree || ""}
            onChange={handleChange}
            placeholder="Example: IEEE Senior Member"
            className="
              w-full min-w-0
              rounded-xl
              border
              border-slate-300
              px-3 py-2.5
              text-[13px]
              outline-none
              transition
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              sm:px-4 sm:py-3
            "
          />
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
