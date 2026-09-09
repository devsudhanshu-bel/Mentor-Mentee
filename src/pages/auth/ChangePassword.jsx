import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { changePassword } from "../../api/auth.api";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // ========================================================
  // SUBMIT
  // ========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // ======================================================
    // VALIDATION
    // ======================================================

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");

      return;
    }

    if (newPassword.length < 8) {
      setError("New password must contain at least 8 characters.");

      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation password do not match.");

      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from the current password.");

      return;
    }

    // ======================================================
    // API REQUEST
    // ======================================================

    try {
      setLoading(true);

      await changePassword({
        currentPassword,
        newPassword,
      });

      setSuccess("Password changed successfully.");

      // ====================================================
      // REDIRECT
      // ====================================================

      setTimeout(() => {
        navigate("/student/dashboard", {
          replace: true,
        });
      }, 1000);
    } catch (error) {
      console.error("Change password error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to change password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* ==================================================
            CARD
            ================================================== */}

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          {/* ==================================================
              HEADER
              ================================================== */}

          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-7 w-7 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2zm10-11V7a4 4 0 00-8 0v1"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Change Your Password
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              You are required to change your temporary password before
              continuing.
            </p>
          </div>

          {/* ==================================================
              ERROR
              ================================================== */}

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* ==================================================
              SUCCESS
              ================================================== */}

          {success && (
            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* ==================================================
              FORM
              ================================================== */}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ==================================================
                CURRENT PASSWORD
                ================================================== */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Password
              </label>

              <input
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                placeholder="Enter temporary password"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>

            {/* ==================================================
                NEW PASSWORD
                ================================================== */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Enter new password"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />

              <p className="mt-2 text-xs text-slate-500">
                Minimum 8 characters.
              </p>
            </div>

            {/* ==================================================
                CONFIRM PASSWORD
                ================================================== */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm New Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm new password"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>

            {/* ==================================================
                SUBMIT
                ================================================== */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Changing Password..." : "Change Password"}
            </button>
          </form>

          {/* ==================================================
              INFORMATION
              ================================================== */}

          <div className="mt-6 rounded-lg bg-slate-50 px-4 py-3">
            <p className="text-xs leading-5 text-slate-500">
              For security reasons, your temporary password can only be used for
              your first login. After changing it, you will use your new
              password for future logins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
