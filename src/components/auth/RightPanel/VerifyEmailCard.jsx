
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
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Timer Effect

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

  // Resend Email

  const handleResend = () => {
    if (!canResend) return;

    if (onResend) {
      onResend();
    }

    setCountdown(60);
    setCanResend(false);
  };

  // Change Email

  const handleChangeEmail = () => {
    if (onChangeEmail) {
      onChangeEmail();
      return;
    }

    navigate("/register");
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
            justify-center rounded-full bg-blue-50
            sm:mb-5 sm:h-16 sm:w-16
          ">

            <MailCheck
              size={34}
              strokeWidth={2}
              className="text-blue-600"
            />

          </div>

          <h1 className="
            text-center text-2xl font-bold
            text-slate-900 sm:text-3xl
          ">
            Verify Your Email
          </h1>

          <p className="
            mt-3 text-center text-xs
            leading-6 text-slate-500 sm:text-sm
          ">
            We've sent a verification link to
          </p>

          <p className="
            mt-1 max-w-full break-all
            text-center text-sm font-semibold
            text-blue-600 sm:text-base
          ">
            {email}
          </p>

        </div>

        {/* Illustration */}

        <div className="mb-5 flex justify-center sm:mb-6">

          <img
            src={verifyIllustration}
            alt="Verify Email"
            draggable={false}
            className="
              w-full max-w-[180px]
              select-none object-contain
              sm:max-w-[240px]
            "
          />

        </div>

        {/* Instructions */}

        <div className="space-y-2 text-center">

          <p className="
            text-xs leading-6 text-slate-600
            sm:text-sm sm:leading-7
          ">
            Please check your inbox and click the
            verification link to activate your account.
          </p>

          <p className="
            pt-3 text-xs font-medium
            text-slate-700 sm:text-sm
          ">
            Didn't receive the email?
          </p>

        </div>

        {/* Resend Button */}

        <div className="mt-5 sm:mt-6">

          <button
            type="button"
            disabled={!canResend}
            onClick={handleResend}
            className={`
              flex h-12 w-full items-center
              justify-center gap-2 rounded-xl
              border text-xs font-semibold
              transition-all duration-300
              sm:text-sm
              ${
                canResend
                  ? "border-blue-600 text-blue-600 hover:bg-blue-50"
                  : "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
              }
            `}
          >

            <RefreshCw size={18} />

            Resend Verification Email

          </button>

          {!canResend && (
            <p className="
              mt-3 text-center text-xs
              text-slate-500
            ">

              Resend available in{" "}

              <span className="font-semibold text-blue-600">
                {countdown}s
              </span>

            </p>
          )}

        </div>

        {/* Change Email */}

        <div className="mt-6 sm:mt-8">

          <button
            type="button"
            onClick={handleChangeEmail}
            className="
              flex w-full items-center
              justify-center gap-2
              rounded-xl border border-slate-200
              py-3 text-xs font-semibold
              text-slate-700
              transition-all duration-300
              hover:bg-slate-50
              sm:text-sm
            "
          >

            <ArrowLeft size={18} />

            Change Email Address

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

export default VerifyEmailCard;
