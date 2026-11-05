import React, { useEffect, useState } from "react";

import {
  User,
  Check,
  FlaskConical,
  Pencil,
  Save,
  X,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| Empty Form
|--------------------------------------------------------------------------
*/

const EMPTY_FORM = {
  about: "",
  highlightOne: "",
  highlightTwo: "",
  highlightThree: "",
  specialization: "",
};

/*
|--------------------------------------------------------------------------
| Convert Mentor Object -> Form Data
|--------------------------------------------------------------------------
*/

const getFormDataFromMentor = (mentor) => ({
  about: mentor?.about || "",
  highlightOne: mentor?.highlightOne || "",
  highlightTwo: mentor?.highlightTwo || "",
  highlightThree: mentor?.highlightThree || "",
  specialization: mentor?.specialization || "",
});

/*
|--------------------------------------------------------------------------
| Clean Comma-Separated Interests
|--------------------------------------------------------------------------
*/

const cleanInterests = (value) => {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .filter(
      (item, index, array) =>
        array.findIndex(
          (existing) =>
            existing.toLowerCase() === item.toLowerCase()
        ) === index
    );
};

/*
|--------------------------------------------------------------------------
| About Me Component
|--------------------------------------------------------------------------
*/

const AboutMe = ({ mentor, loading, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState(
    mentor
      ? getFormDataFromMentor(mentor)
      : EMPTY_FORM
  );

  /*
  |--------------------------------------------------------------------------
  | Sync Form When Mentor Changes
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (mentor && !isEditing) {
      setFormData(getFormDataFromMentor(mentor));
    }
  }, [mentor, isEditing]);

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-[600px] rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-slate-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | No Profile
  |--------------------------------------------------------------------------
  */

  if (!mentor) {
    return (
      <div className="min-h-[600px] rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-slate-500">
            No profile information available.
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Form Change
  |--------------------------------------------------------------------------
  */

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Edit
  |--------------------------------------------------------------------------
  */

  const handleEdit = () => {
    setFormData(getFormDataFromMentor(mentor));
    setIsEditing(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Cancel
  |--------------------------------------------------------------------------
  */

  const handleCancel = () => {
    setFormData(getFormDataFromMentor(mentor));
    setIsEditing(false);
  };

  /*
  |--------------------------------------------------------------------------
  | Save
  |--------------------------------------------------------------------------
  */

  const handleSave = async () => {
    if (!onSave) {
      console.error(
        "AboutMe: onSave function is not provided."
      );
      return;
    }

    try {
      setIsSaving(true);

      /*
       * Clean research interests before sending them
       * to the backend.
       */

      const cleanedInterests = cleanInterests(
        formData.specialization
      );

      const updatedData = {
        about: formData.about.trim(),

        highlightOne:
          formData.highlightOne.trim(),

        highlightTwo:
          formData.highlightTwo.trim(),

        highlightThree:
          formData.highlightThree.trim(),

        /*
         * Store interests as a clean comma-separated string.
         */
        specialization:
          cleanedInterests.join(", "),
      };

      console.log(
        "About Me data being saved:",
        updatedData
      );

      await onSave(updatedData);

      setIsEditing(false);
    } catch (error) {
      console.error(
        "Failed to save About Me:",
        error
      );
    } finally {
      setIsSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Display Data
  |--------------------------------------------------------------------------
  */

  const strengths = [
    mentor.highlightOne,
    mentor.highlightTwo,
    mentor.highlightThree,
  ].filter(Boolean);

  const interests = cleanInterests(
    mentor.specialization || ""
  );

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-[600px] min-w-0 rounded-xl border border-slate-200 bg-white shadow-sm">

      {/* ================= Header ================= */}

      <div className="flex flex-col gap-3 border-b border-slate-100 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">

        <div className="flex items-center gap-2">

          <User
            size={16}
            className="shrink-0 text-blue-600"
          />

          <h2 className="text-[15px] font-semibold text-slate-900 sm:text-[16px]">
            About Me
          </h2>

        </div>

        {/* ================= Header Actions ================= */}

        {!isEditing ? (
          <button
            type="button"
            onClick={handleEdit}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-blue-600 px-3 py-2 text-[11px] font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white sm:w-auto sm:py-1.5"
          >
            <Pencil size={12} />
            Edit
          </button>
        ) : (
          <div className="flex w-full items-center gap-2 sm:w-auto">

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-[11px] font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:py-1.5"
            >
              <X size={12} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:py-1.5"
            >
              <Save size={12} />

              {isSaving
                ? "Saving..."
                : "Save"}
            </button>

          </div>
        )}

      </div>

      {/* ================= Content ================= */}

      <div className="min-w-0 p-3 sm:p-4">

        {/* ================= Biography ================= */}

        <div className="min-w-0">

          {isEditing ? (
            <>
              <label className="mb-2 block text-[12px] font-semibold text-slate-700">
                Biography
              </label>

              <textarea
                value={formData.about}
                onChange={(e) =>
                  handleChange(
                    "about",
                    e.target.value
                  )
                }
                rows={7}
                placeholder="Tell students a little about yourself..."
                className="w-full min-w-0 resize-y rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px] leading-6 text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </>
          ) : (
            <p className="break-words text-[12px] leading-6 text-slate-600">
              {mentor.about ||
                "No biography available."}
            </p>
          )}

        </div>

        {/* ================= Divider ================= */}

        <div className="my-4 border-t border-slate-100 sm:my-5" />

        {/* ================= Highlights ================= */}

        <div className="min-w-0">

          <div className="mb-3">
            <h3 className="text-[13px] font-semibold text-slate-900 sm:text-[14px]">
              Highlights
            </h3>
          </div>

          {isEditing ? (
            <div className="space-y-3">

              <HighlightInput
                value={formData.highlightOne}
                onChange={(value) =>
                  handleChange(
                    "highlightOne",
                    value
                  )
                }
                placeholder="Enter first highlight"
              />

              <HighlightInput
                value={formData.highlightTwo}
                onChange={(value) =>
                  handleChange(
                    "highlightTwo",
                    value
                  )
                }
                placeholder="Enter second highlight"
              />

              <HighlightInput
                value={formData.highlightThree}
                onChange={(value) =>
                  handleChange(
                    "highlightThree",
                    value
                  )
                }
                placeholder="Enter third highlight"
              />

            </div>
          ) : (
            <div className="space-y-3">

              {strengths.length > 0 ? (
                strengths.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex min-w-0 items-start gap-2 sm:gap-3"
                    >

                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                        <Check
                          size={12}
                          className="text-green-600"
                        />
                      </div>

                      <p className="min-w-0 break-words text-[12px] leading-5 text-slate-600">
                        {item}
                      </p>

                    </div>
                  )
                )
              ) : (
                <p className="text-[12px] text-slate-500">
                  No highlights available.
                </p>
              )}

            </div>
          )}

        </div>

        {/* ================= Divider ================= */}

        <div className="my-4 border-t border-slate-100 sm:my-5" />

        {/* ================= Research Interests ================= */}

        <div className="min-w-0">

          <div className="mb-3 flex items-center gap-2">

            <FlaskConical
              size={15}
              className="shrink-0 text-blue-600"
            />

            <h3 className="text-[13px] font-semibold text-slate-900 sm:text-[14px]">
              Research Interests
            </h3>

          </div>

          {isEditing ? (
            <div className="min-w-0">

              <label className="mb-2 block text-[11px] font-medium text-slate-600">
                Research Interests
              </label>

              <input
                type="text"
                value={formData.specialization}
                onChange={(e) =>
                  handleChange(
                    "specialization",
                    e.target.value
                  )
                }
                placeholder="Machine Learning, NLP, Computer Vision"
                className="w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px] text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

              {/* ================= Preview Chips ================= */}

              {cleanInterests(
                formData.specialization
              ).length > 0 && (
                <div className="mt-3">

                  <p className="mb-2 text-[10px] font-medium text-slate-400">
                    Preview
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {cleanInterests(
                      formData.specialization
                    ).map(
                      (interest, index) => (
                        <span
                          key={`${interest}-${index}`}
                          className="max-w-full break-words rounded-md bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700"
                        >
                          {interest}
                        </span>
                      )
                    )}

                  </div>

                </div>
              )}

              <p className="mt-2 text-[10px] text-slate-400">
                Separate multiple research interests
                with commas.
              </p>

            </div>
          ) : (
            <div className="flex flex-wrap gap-2">

              {interests.length > 0 ? (
                interests.map(
                  (interest, index) => (
                    <span
                      key={`${interest}-${index}`}
                      className="max-w-full break-words rounded-md bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700"
                    >
                      {interest}
                    </span>
                  )
                )
              ) : (
                <p className="text-[12px] text-slate-500">
                  No research interests available.
                </p>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Highlight Input
|--------------------------------------------------------------------------
|
| IMPORTANT:
| This component is outside AboutMe.
|
| This prevents React from recreating the component on every keystroke
| and fixes the input-focus problem.
|
*/

const HighlightInput = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex min-w-0 items-start gap-2 sm:gap-3">

      <div className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
        <Check
          size={12}
          className="text-green-600"
        />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[12px] text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
      />

    </div>
  );
};

export default AboutMe;
