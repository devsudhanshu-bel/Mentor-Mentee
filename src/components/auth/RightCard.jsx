
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  UserCircle2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Headphones,
  Loader2,
} from "lucide-react";

const RightCard = ({ onLogin, loading = false }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading || !email.trim() || !password) return;

    onLogin({
      email: email.trim(),
      password,
      remember,
    });
  };

  return (
    <div className="
      relative flex min-h-full w-full
      items-center justify-center
      overflow-hidden
      bg-gradient-to-br from-slate-50 via-white to-blue-50
      px-4 py-8
      sm:px-8 sm:py-10
      lg:px-10 lg:py-8
    ">

      {/* Background Blur */}

      <div className="
        pointer-events-none absolute right-0 top-0
        h-48 w-48 rounded-full bg-blue-100/40 blur-3xl
        sm:h-72 sm:w-72
      " />

      <div className="
        pointer-events-none absolute bottom-0 left-0
        h-40 w-40 rounded-full bg-indigo-100/30 blur-3xl
        sm:h-56 sm:w-56
      " />

      {/* Login Card */}

      <div className="
        relative z-10 w-full max-w-md
        rounded-2xl border border-slate-200
        bg-white p-5 shadow-2xl
        sm:rounded-3xl sm:p-8
      ">

        <form onSubmit={handleSubmit}>

          {/* Header */}

          <div className="mb-7 flex flex-col items-center sm:mb-8">

            <div className="
              mb-4 flex h-14 w-14 items-center
              justify-center rounded-full border-2
              border-blue-600
              sm:mb-5 sm:h-16 sm:w-16
            ">

              <UserCircle2
                size={36}
                strokeWidth={1.8}
                className="text-blue-600"
              />

            </div>

            <h1 className="
              text-center text-2xl font-bold
              text-slate-900 sm:text-3xl
            ">
              Welcome Back!
            </h1>

            <p className="
              mt-2 text-center text-xs
              text-slate-500 sm:text-sm
            ">
              Sign in to continue to your account
            </p>

          </div>

          {/* Email */}

          <div className="mb-5">

            <label className="
              mb-2 block text-sm font-semibold
              text-slate-700
            ">
              Email / Registration No.
            </label>

            <div className="
              flex h-12 items-center rounded-xl
              border border-slate-300 px-4
              transition-all duration-200
              focus-within:border-blue-500
              focus-within:ring-2
              focus-within:ring-blue-100
            ">

              <Mail
                size={18}
                className="mr-3 shrink-0 text-slate-400"
              />

              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="username"
                required
                className="
                  w-full min-w-0 bg-transparent
                  text-sm outline-none
                  placeholder:text-slate-400
                "
              />

            </div>

          </div>

          {/* Password */}

          <div className="mb-5">

            <label className="
              mb-2 block text-sm font-semibold
              text-slate-700
            ">
              Password
            </label>

            <div className="
              flex h-12 items-center rounded-xl
              border border-slate-300 px-4
              transition-all duration-200
              focus-within:border-blue-500
              focus-within:ring-2
              focus-within:ring-blue-100
            ">

              <Lock
                size={18}
                className="mr-3 shrink-0 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="
                  w-full min-w-0 bg-transparent
                  text-sm outline-none
                  placeholder:text-slate-400
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="
                  ml-2 shrink-0 text-slate-400
                  transition hover:text-blue-600
                "
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* Remember & Forgot Password */}

          <div className="
            mb-7 flex flex-wrap items-center
            justify-between gap-3 text-xs
            sm:text-sm
          ">

            <label className="
              flex cursor-pointer items-center gap-2
            ">

              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-blue-600"
              />

              <span className="text-slate-600">
                Remember me
              </span>

            </label>

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="
                font-medium text-blue-600
                transition hover:text-blue-700
                hover:underline
              "
            >
              Forgot Password?
            </button>

          </div>

          {/* Sign In */}

          <button
            type="submit"
            disabled={loading}
            className="
              flex h-12 w-full items-center
              justify-center gap-2 rounded-xl
              bg-gradient-to-r from-blue-600
              to-blue-700 text-sm font-semibold
              text-white shadow-lg
              transition duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-70
              disabled:hover:translate-y-0
            "
          >

            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}

          </button>

          {/* Register */}

          <div className="
            mt-5 text-center text-xs sm:text-sm
          ">

            <span className="text-slate-500">
              Need to Register?
            </span>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="
                ml-2 font-semibold text-blue-600
                transition hover:text-blue-700
                hover:underline
              "
            >
              Register Here
            </button>

          </div>

          {/* Footer */}

          <div className="
            mt-6 flex flex-wrap items-center
            justify-center gap-2
            border-t border-slate-100
            pt-5 text-xs text-slate-500
          ">

            <Headphones size={16} />

            <span>Need Help?</span>

            <button
              type="button"
              className="
                font-semibold text-blue-600
                transition hover:text-blue-700
                hover:underline
              "
            >
              Contact Support
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default RightCard;
