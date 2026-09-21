import React, { useEffect, useState } from "react";

import {
  Share2,
  GraduationCap,
  Globe,
  ExternalLink,
  Pencil,
  Save,
  X,
} from "lucide-react";

/* ==========================================================
   EMPTY FORM
========================================================== */

const EMPTY_FORM = {
  linkedIn: "",
  googleScholar: "",
  researchGate: "",
  orcid: "",
  website: "",
};

/* ==========================================================
   GET FORM DATA FROM MENTOR
========================================================== */

const getFormDataFromMentor = (mentor) => ({
  linkedIn: mentor?.linkedIn || "",
  googleScholar: mentor?.googleScholar || "",
  researchGate: mentor?.researchGate || "",
  orcid: mentor?.orcid || "",
  website: mentor?.website || "",
});

/* ==========================================================
   CLEAN URL
========================================================== */

const cleanUrl = (value) => {
  if (!value) {
    return "";
  }

  return value.trim();
};

/* ==========================================================
   VALIDATE URL
========================================================== */

const isValidUrl = (value) => {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
};

/* ==========================================================
   SOCIAL LINK INPUT
========================================================== */

const SocialLinkInput = ({
  icon: Icon,
  iconColor,
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold text-slate-700">
        <Icon
          size={15}
          className={iconColor}
        />

        {label}
      </label>

      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[11px] text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
};

/* ==========================================================
   SOCIAL LINKS
========================================================== */

const SocialLinks = ({ mentor, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState(
    mentor
      ? getFormDataFromMentor(mentor)
      : EMPTY_FORM
  );

  /* ========================================================
     SYNC FORM WITH MENTOR
  ======================================================== */

  useEffect(() => {
    if (mentor && !isEditing) {
      setFormData(getFormDataFromMentor(mentor));
    }
  }, [mentor, isEditing]);

  /* ========================================================
     NO PROFILE
  ======================================================== */

  if (!mentor) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-slate-500">
            No social links available.
          </p>
        </div>
      </div>
    );
  }

  /* ========================================================
     HANDLE CHANGE
  ======================================================== */

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /* ========================================================
     EDIT
  ======================================================== */

  const handleEdit = () => {
    setFormData(getFormDataFromMentor(mentor));
    setError("");
    setIsEditing(true);
  };

  /* ========================================================
     CANCEL
  ======================================================== */

  const handleCancel = () => {
    setFormData(getFormDataFromMentor(mentor));
    setError("");
    setIsEditing(false);
  };

  /* ========================================================
     SAVE
  ======================================================== */

  const handleSave = async () => {
    if (!onSave) {
      console.error(
        "SocialLinks: onSave function is not provided."
      );

      setError("Unable to save social links.");

      return;
    }

    /* ======================================================
       CLEAN VALUES
    ====================================================== */

    const updatedData = {
      linkedIn: cleanUrl(formData.linkedIn),

      googleScholar: cleanUrl(
        formData.googleScholar
      ),

      researchGate: cleanUrl(
        formData.researchGate
      ),

      orcid: cleanUrl(formData.orcid),

      website: cleanUrl(formData.website),
    };

    /* ======================================================
       URL VALIDATION
    ====================================================== */

    const invalidLinks = [
      {
        label: "LinkedIn",
        value: updatedData.linkedIn,
      },
      {
        label: "Google Scholar",
        value: updatedData.googleScholar,
      },
      {
        label: "ResearchGate",
        value: updatedData.researchGate,
      },
      {
        label: "ORCID",
        value: updatedData.orcid,
      },
      {
        label: "Website",
        value: updatedData.website,
      },
    ].filter(
      (item) =>
        item.value &&
        !isValidUrl(item.value)
    );

    if (invalidLinks.length > 0) {
      setError(
        `${invalidLinks[0].label} must be a valid URL starting with http:// or https://`
      );

      return;
    }

    /* ======================================================
       SAVE TO BACKEND
    ====================================================== */

    try {
      setIsSaving(true);
      setError("");

      console.log(
        "Saving social links:",
        updatedData
      );

      await onSave(updatedData);

      /*
       * Parent updates mentor state with
       * fresh backend response.
       */

      setIsEditing(false);
    } catch (error) {
      console.error(
        "Failed to save social links:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Failed to save social links. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  /* ========================================================
     DISPLAY LINKS
  ======================================================== */

  const links = [
    {
      icon: Globe,
      title: "LinkedIn",
      url: mentor.linkedIn,
      color: "text-[#0A66C2]",
    },

    {
      icon: GraduationCap,
      title: "Google Scholar",
      url: mentor.googleScholar,
      color: "text-blue-600",
    },

    {
      icon: Globe,
      title: "ResearchGate",
      url: mentor.researchGate,
      color: "text-emerald-600",
    },

    {
      icon: Globe,
      title: "ORCID",
      url: mentor.orcid,
      color: "text-lime-600",
    },

    {
      icon: Globe,
      title: "Website",
      url: mentor.website,
      color: "text-violet-600",
    },
  ].filter(
    (item) =>
      item.url &&
      item.url.trim() !== ""
  );

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="flex items-center justify-between border-b border-slate-100 p-4">

        <div className="flex items-center gap-2">

          <Share2
            size={16}
            className="text-blue-600"
          />

          <h2 className="text-[16px] font-semibold text-slate-900">
            Social Links
          </h2>

        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        {!isEditing ? (
          <button
            type="button"
            onClick={handleEdit}
            className="flex items-center gap-1.5 rounded-lg border border-blue-600 px-3 py-1.5 text-[11px] font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white"
          >
            <Pencil size={12} />

            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-[11px] font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={12} />

              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={12} />

              {isSaving
                ? "Saving..."
                : "Save"}
            </button>

          </div>
        )}

      </div>

      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div className="p-4">

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2">
            <p className="text-[11px] leading-5 text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* ==================================================
            EDIT MODE
        ================================================== */}

        {isEditing ? (
          <div className="space-y-4">

            <SocialLinkInput
              icon={Globe}
              iconColor="text-[#0A66C2]"
              label="LinkedIn"
              value={formData.linkedIn}
              onChange={(value) =>
                handleChange(
                  "linkedIn",
                  value
                )
              }
              placeholder="https://linkedin.com/in/your-profile"
            />

            <SocialLinkInput
              icon={GraduationCap}
              iconColor="text-blue-600"
              label="Google Scholar"
              value={formData.googleScholar}
              onChange={(value) =>
                handleChange(
                  "googleScholar",
                  value
                )
              }
              placeholder="https://scholar.google.com/citations/..."
            />

            <SocialLinkInput
              icon={Globe}
              iconColor="text-emerald-600"
              label="ResearchGate"
              value={formData.researchGate}
              onChange={(value) =>
                handleChange(
                  "researchGate",
                  value
                )
              }
              placeholder="https://www.researchgate.net/profile/..."
            />

            <SocialLinkInput
              icon={Globe}
              iconColor="text-lime-600"
              label="ORCID"
              value={formData.orcid}
              onChange={(value) =>
                handleChange(
                  "orcid",
                  value
                )
              }
              placeholder="https://orcid.org/0000-0000-0000-0000"
            />

            <SocialLinkInput
              icon={Globe}
              iconColor="text-violet-600"
              label="Website"
              value={formData.website}
              onChange={(value) =>
                handleChange(
                  "website",
                  value
                )
              }
              placeholder="https://yourwebsite.com"
            />

            <p className="text-[10px] leading-4 text-slate-400">
              All links are optional. Use complete
              URLs beginning with https://.
            </p>

          </div>
        ) : (
          /* ==================================================
             VIEW MODE
          ================================================== */

          <div className="space-y-4">

            {links.length > 0 ? (
              links.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={`${item.title}-${index}`}
                    className="flex items-center justify-between"
                  >

                    <div className="flex min-w-0 items-center gap-3">

                      <Icon
                        size={18}
                        className={`${item.color} shrink-0`}
                      />

                      <div className="min-w-0">

                        <p className="text-[12px] font-medium text-slate-800">
                          {item.title}
                        </p>

                        <p className="max-w-[220px] truncate text-[11px] text-blue-600">
                          {item.url}
                        </p>

                      </div>

                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${item.title}`}
                      className="ml-2 shrink-0 rounded-md p-1 transition hover:bg-slate-100"
                    >
                      <ExternalLink
                        size={14}
                        className="text-slate-400"
                      />
                    </a>

                  </div>
                );
              })
            ) : (
              <div className="flex h-32 items-center justify-center">
                <p className="text-sm text-slate-500">
                  No social links available.
                </p>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default SocialLinks;