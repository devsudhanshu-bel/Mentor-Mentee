import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MailCheck,
  RefreshCw,
  ArrowLeft,
  Headphones,
} from "lucide-react";

import verifyIllustration from "../../../assets/verify-email.png";

const VerifyEmailCard = ({
  email = "your.email@christuniversity.in",
  onResend,
  onChangeEmail,
}) => {
  //--------------------------------------------------
  // React Router
  //--------------------------------------------------

  const navigate = useNavigate();

  //--------------------------------------------------
  // Countdown Timer
  //--------------------------------------------------

  const [countdown, setCountdown] = useState(60);

  const [canResend, setCanResend] = useState(false);

  //--------------------------------------------------
  // Timer Effect
  //--------------------------------------------------

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  //--------------------------------------------------
  // Resend Email
  //--------------------------------------------------

  const handleResend = () => {
    if (!canResend) return;

    if (onResend) {
      onResend();
    }

    setCountdown(60);
    setCanResend(false);
  };

  //--------------------------------------------------
  // Change Email
  //--------------------------------------------------

  const handleChangeEmail = () => {
    if (onChangeEmail) {
      onChangeEmail();
      return;
    }

    navigate("/register");
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

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">

            <MailCheck
              size={34}
              strokeWidth={2}
              className="text-blue-600"
            />

          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Verify Your Email
          </h1>

          <p className="mt-3 text-center text-sm leading-6 text-slate-500">
            We've sent a verification link to
          </p>

          <p className="mt-1 text-center text-base font-semibold text-blue-600 break-all">
            {email}
          </p>

        </div>
                {/* Illustration */}

        <div className="mb-6 flex justify-center">

          <img
            src={verifyIllustration}
            alt="Verify Email"
            draggable={false}
            className="w-full max-w-[240px] select-none object-contain"
          />

        </div>

        {/* Instructions */}

        <div className="space-y-2 text-center">

          <p className="text-sm leading-7 text-slate-600">
            Please check your inbox and click the
            verification link to activate your account.
          </p>

          <p className="pt-3 text-sm font-medium text-slate-700">
            Didn't receive the email?
          </p>

        </div>

        {/* Resend Button */}

        <div className="mt-6">

          <button
            type="button"
            disabled={!canResend}
            onClick={handleResend}
            className={`
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              text-sm
              font-semibold
              transition-all
              duration-300
              ${
                canResend
                  ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                  : "cursor-not-allowed border-slate-200 text-slate-400 bg-slate-50"
              }
            `}
          >

            <RefreshCw size={18} />

            Resend Verification Email

          </button>

          {!canResend && (

            <p className="mt-3 text-center text-xs text-slate-500">

              Resend available in{" "}

              <span className="font-semibold text-blue-600">
                {countdown}s
              </span>

            </p>

          )}

        </div>
                {/* Change Email */}

        <div className="mt-8">

          <button
            type="button"
            onClick={handleChangeEmail}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              py-3
              text-sm
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:bg-slate-50
            "
          >
            <ArrowLeft size={18} />

            Change Email Address

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

export default VerifyEmailCard;