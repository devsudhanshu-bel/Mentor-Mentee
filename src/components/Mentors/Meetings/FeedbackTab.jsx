import React from "react";
import { Star, MessageSquareText } from "lucide-react";

const FeedbackTab = ({
  rating,
  setRating,
  feedback,
  setFeedback,
}) => {
  return (
    <div className="p-5">

      {/* Header */}

      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          Mentor Feedback
        </h2>

        <p className="mt-1 text-[13px] text-slate-500">
          Record your observations, suggestions and overall meeting feedback.
        </p>

      </div>

      {/* Rating */}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-semibold text-slate-700">
              Overall Rating
            </h3>

            <p className="mt-1 text-[12px] text-slate-500">
              Rate the mentee's performance during this session.
            </p>

          </div>

          <div className="rounded-lg bg-blue-50 px-4 py-2">

            <span className="text-lg font-bold text-blue-700">
              {rating}/5
            </span>

          </div>

        </div>

        <div className="mt-5 flex gap-2">

          {[1, 2, 3, 4, 5].map((star) => (

            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="transition hover:scale-110"
            >

              <Star
                size={30}
                fill={
                  star <= rating
                    ? "#FACC15"
                    : "none"
                }
                className={
                  star <= rating
                    ? "text-yellow-400"
                    : "text-slate-300"
                }
              />

            </button>

          ))}

        </div>

      </div>

      {/* Feedback */}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center gap-2">

          <MessageSquareText
            size={18}
            className="text-blue-600"
          />

          <h3 className="font-semibold text-slate-700">
            Meeting Feedback
          </h3>

        </div>

        <textarea
          value={feedback}
          onChange={(e) =>
            setFeedback(e.target.value)
          }
          placeholder="Write detailed mentor feedback here..."
          className="h-[260px] w-full resize-none rounded-lg border border-slate-300 p-4 text-[13px] leading-6 outline-none transition focus:border-blue-500"
        />

        <div className="mt-4 flex items-center justify-between">

          <span className="text-[12px] text-slate-500">
            Keep your feedback clear and constructive.
          </span>

          <span className="text-[12px] font-medium text-slate-500">
            {feedback.length} Characters
          </span>

        </div>

      </div>

    </div>
  );
};

export default FeedbackTab;