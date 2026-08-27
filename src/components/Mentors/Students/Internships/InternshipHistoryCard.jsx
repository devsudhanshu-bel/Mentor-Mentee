import React from "react";
import {
  CalendarDays,
  MapPin,
  Building2,
} from "lucide-react";

import RatingStars from "./RatingStars";
import ViewDetailsButton from "./ViewDetailsButton";

const InternshipHistoryCard = ({
  logo,
  company,
  position,
  location,
  duration,
  durationText,
  role,
  rating,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="grid grid-cols-12 items-center gap-4">
        {/* ================= Company ================= */}

        <div className="col-span-4 flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">
            <img
              src={logo}
              alt={company}
              className="h-10 w-10 object-contain"
            />
          </div>

          <div>
            <h3 className="text-[15px] font-semibold text-slate-800">
              {position}
            </h3>

            <div className="mt-1 flex items-center gap-2">
              <Building2
                size={13}
                className="text-blue-600"
              />

              <span className="text-[12px] font-medium text-blue-600">
                {company}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <MapPin size={12} />

              {location}
            </div>
          </div>
        </div>

        {/* ================= Duration ================= */}

        <div className="col-span-2 border-l border-slate-100 pl-5">
          <div className="flex items-center gap-2 text-slate-500">
            <CalendarDays size={13} />

            <span className="text-[10px] font-medium">
              Duration
            </span>
          </div>

          <p className="mt-3 text-[13px] font-semibold text-slate-800">
            {duration}
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            {durationText}
          </p>
        </div>

        {/* ================= Role ================= */}

        <div className="col-span-2 border-l border-slate-100 pl-5">
          <p className="text-[10px] font-medium text-slate-500">
            Role
          </p>

          <p className="mt-3 text-[12px] font-semibold text-slate-700">
            {role}
          </p>
        </div>

        {/* ================= Rating ================= */}

        <div className="col-span-2 border-l border-slate-100 pl-5">
          <p className="text-[10px] font-medium text-slate-500">
            Mentor Rating
          </p>

          <div className="mt-3">
            <RatingStars rating={rating} />
          </div>

          <p className="mt-2 text-[11px] font-semibold text-slate-700">
            {rating}.0 / 5
          </p>
        </div>

        {/* ================= Button ================= */}

        <div className="col-span-2 flex justify-end">
          <ViewDetailsButton />
        </div>
      </div>
    </div>
  );
};

export default InternshipHistoryCard;