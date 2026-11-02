
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BadgeCheck,
  ArrowRight,
  Headphones,
} from "lucide-react";

import verifiedIllustration from "../../../assets/email-verified.png";

const EmailVerifiedCard = () => {
  const navigate = useNavigate();

  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (seconds <= 0) {
      navigate("/student/dashboard");
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, navigate]);

  const handleDashboard = () => {
    navigate("/student/dashboard");
  };

  return (
    <div className="
      relative flex min-h-full w-full
      items-center justify-center
      overflow-hidden
      bg-gradient-to-br from-slate-50 via-white to-blue-50
      px-4 py-8
      sm:px-8 sm:py-10
      lg:px-10
    ">

      {/* Background */}

      <div className="
        pointer-events-none absolute right-0 top-0
        h-48 w-48 rounded-full
        bg-blue-100/40 blur-3xl
        sm:h-72 sm:w-72
      " />

      <div className="
        pointer-events-none absolute bottom-0 left-0
        h-40 w-40 rounded-full
        bg-indigo-100/30 blur-3xl
        sm:h-56 sm:w-56
      " />

      {/* Card */}

      <div className="
        relative z-10 w-full max-w-md
        rounded-2xl border border-slate-200
        bg-white p-5 shadow-2xl
        sm:rounded-3xl sm:p-8
      ">

        {/* Header */}

        <div className="mb-6 flex flex-col items-center sm:mb-8">

          <div className="
            mb-4 flex h-14 w-14 items-center
            justify-center rounded-full bg-green-50
            sm:mb-5 sm:h-16 sm:w-16
          ">

            <BadgeCheck
              size={34}
              strokeWidth={2}
              className="text-green-600 sm:h-9 sm:w-9"
            />

          </div>

          <h1 className="
            text-center text-2xl font-bold
            text-slate-900 sm:text-3xl
          ">
            Email Verified!
          </h1>

          <p className="
            mt-2 text-center text-xs
            leading-6 text-slate-500 sm:text-sm
          ">
            Your email has been successfully verified.
          </p>

          <p className="
            mt-1 text-center text-xs
            leading-6 text-slate-500 sm:text-sm
          ">
            Your account is now ready to use.
          </p>

        </div>

        {/* Illustration */}

        <div className="mb-5 flex justify-center sm:mb-6">

          <img
            src={verifiedIllustration}
            alt="Email Verified"
            draggable={false}
            className="
              w-full max-w-[180px]
              select-none object-contain
              sm:max-w-[240px]
            "
          />

        </div>

        {/* Success Message */}

        <div className="space-y-2 text-center">

          <p className="
            text-xs leading-6 text-slate-600
            sm:text-sm sm:leading-7
          ">
            Your Mentor–Mentee Management System account
            has been successfully activated.
          </p>

          <p className="
            text-xs leading-6 text-slate-600
            sm:text-sm sm:leading-7
          ">
            You can now securely access all student
            services and dashboard features.
          </p>

        </div>

        {/* Countdown */}

        <div className="
          mt-5 rounded-xl border border-green-100
          bg-green-50 px-3 py-3 sm:mt-6
        ">

          <p className="
            text-center text-xs text-slate-600
            sm:text-sm
          ">

            Redirecting to your dashboard in{" "}

            <span className="font-bold text-green-600">
              {seconds}
            </span>{" "}

            second{seconds !== 1 ? "s" : ""}...

          </p>

        </div>

        {/* Dashboard Button */}

        <div className="mt-5 sm:mt-6">

          <button
            type="button"
            onClick={handleDashboard}
            className="
              flex h-12 w-full items-center
              justify-center gap-2 rounded-xl
              bg-gradient-to-r from-green-600
              to-emerald-600 text-sm font-semibold
              text-white shadow-lg
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
              active:scale-[0.98]
            "
          >

            Go to Dashboard

            <ArrowRight size={18} />

          </button>

        </div>

        {/* Divider */}

        <div className="my-5 flex items-center sm:my-6">

          <div className="h-px flex-1 bg-slate-200" />

          <span className="
            mx-4 text-[10px] font-medium
            uppercase tracking-wider
            text-slate-400 sm:text-xs
          ">
            SUPPORT
          </span>

          <div className="h-px flex-1 bg-slate-200" />

        </div>

        {/* Footer */}

        <div className="
          flex flex-wrap items-center
          justify-center gap-2
          text-xs text-slate-500
        ">

          <Headphones size={16} />

          <span>Need Help?</span>

          <button
            type="button"
            onClick={() => {
              window.location.href =
                "mailto:support@christuniversity.in";
            }}
            className="
              font-semibold text-blue-600
              transition-all duration-200
              hover:text-blue-700 hover:underline
            "
          >
            Contact Support
          </button>

        </div>

      </div>

    </div>
  );
};

export default EmailVerifiedCard;
