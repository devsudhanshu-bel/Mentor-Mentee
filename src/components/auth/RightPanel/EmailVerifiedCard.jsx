import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BadgeCheck,
  ArrowRight,
  Headphones,
} from "lucide-react";

import verifiedIllustration from "../../../assets/email-verified.png";

const EmailVerifiedCard = () => {
  //--------------------------------------------------
  // React Router
  //--------------------------------------------------

  const navigate = useNavigate();

  //--------------------------------------------------
  // Countdown
  //--------------------------------------------------

  const [seconds, setSeconds] = useState(3);

  //--------------------------------------------------
  // Auto Redirect
  //--------------------------------------------------

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

  //--------------------------------------------------
  // Dashboard
  //--------------------------------------------------

  const handleDashboard = () => {
    navigate("/student/dashboard");
  };

  //--------------------------------------------------
  // UI
  //--------------------------------------------------

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-10">

      {/* Background */}

      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-indigo-100/30 blur-3xl" />

      {/* Card */}

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">

        {/* Header */}

        <div className="mb-8 flex flex-col items-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">

            <BadgeCheck
              size={36}
              strokeWidth={2}
              className="text-green-600"
            />

          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Email Verified!
          </h1>

          <p className="mt-2 text-center text-sm leading-6 text-slate-500">
            Your email has been successfully verified.
          </p>

          <p className="mt-1 text-center text-sm leading-6 text-slate-500">
            Your account is now ready to use.
          </p>

        </div>
                {/* Illustration */}

        <div className="mb-6 flex justify-center">

          <img
            src={verifiedIllustration}
            alt="Email Verified"
            draggable={false}
            className="w-full max-w-[240px] select-none object-contain"
          />

        </div>

        {/* Success Message */}

        <div className="space-y-2 text-center">

          <p className="text-sm leading-7 text-slate-600">
            Your Mentor–Mentee Management System account
            has been successfully activated.
          </p>

          <p className="text-sm leading-7 text-slate-600">
            You can now securely access all student
            services and dashboard features.
          </p>

        </div>

        {/* Countdown */}

        <div className="mt-6 rounded-xl border border-green-100 bg-green-50 py-3">

          <p className="text-center text-sm text-slate-600">

            Redirecting to your dashboard in{" "}

            <span className="font-bold text-green-600">
              {seconds}
            </span>{" "}

            second{seconds !== 1 ? "s" : ""}...

          </p>

        </div>

        {/* Dashboard Button */}

        <div className="mt-6">

          <button
            type="button"
            onClick={handleDashboard}
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-green-600
              to-emerald-600
              text-sm
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
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

        <div className="my-6 flex items-center">

          <div className="h-px flex-1 bg-slate-200" />

          <span className="mx-4 text-xs font-medium uppercase tracking-wider text-slate-400">
            SUPPORT
          </span>

          <div className="h-px flex-1 bg-slate-200" />

        </div>

        {/* Footer */}

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">

          <Headphones
            size={16}
            className="text-slate-500"
          />

          <span>
            Need Help?
          </span>

          <button
            type="button"
            onClick={() =>
              window.location.href =
                "mailto:support@christuniversity.in"
            }
            className="
              font-semibold
              text-blue-600
              transition-all
              duration-200
              hover:text-blue-700
              hover:underline
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