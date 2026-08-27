import React from "react";
import {
  User,
  Check,
  FlaskConical,
} from "lucide-react";

const AboutMe = ({ mentor }) => {
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

  const strengths = [
    mentor.highlightOne,
    mentor.highlightTwo,
    mentor.highlightThree,
  ].filter(Boolean);

  const interests = mentor.specialization
    ? mentor.specialization
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-[600px] rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 p-4">
        <User
          size={16}
          className="text-blue-600"
        />

        <h2 className="text-[16px] font-semibold text-slate-900">
          About Me
        </h2>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Bio */}
        <p className="text-[12px] leading-6 text-slate-600">
          {mentor.about || "No biography available."}
        </p>

        {/* Divider */}
        <div className="my-5 border-t border-slate-100" />

        {/* Highlights */}
        <div className="space-y-3">
          {strengths.length > 0 ? (
            strengths.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-50">
                  <Check
                    size={12}
                    className="text-green-600"
                  />
                </div>

                <p className="text-[12px] leading-5 text-slate-600">
                  {item}
                </p>
              </div>
            ))
          ) : (
            <p className="text-[12px] text-slate-500">
              No highlights available.
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-slate-100" />

        {/* Research Interests */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <FlaskConical
              size={15}
              className="text-blue-600"
            />

            <h3 className="text-[14px] font-semibold text-slate-900">
              Research Interests
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {interests.length > 0 ? (
              interests.map((interest, index) => (
                <span
                  key={index}
                  className="rounded-md bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700"
                >
                  {interest}
                </span>
              ))
            ) : (
              <p className="text-[12px] text-slate-500">
                No research interests available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;