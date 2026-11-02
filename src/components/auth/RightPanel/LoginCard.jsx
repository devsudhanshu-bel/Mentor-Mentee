
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

const LoginCard = ({ onLogin, loading = false }) => {
  const navigate = useNavigate();

  // ========================================================
  // STATE
  // ========================================================

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // ========================================================
  // HANDLE INPUT CHANGE
  // ========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ========================================================
  // VALIDATION
  // ========================================================

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email =
        "Email or Registration Number is required.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ========================================================
  // LOGIN SUBMIT
  // ========================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading || !validate()) return;

    onLogin?.({
      ...formData,
      rememberMe,
    });
  };

  // ========================================================
  // NAVIGATION
  // ========================================================

  const handleRegister = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  // ========================================================
  // UI
  // ========================================================

  return (
    <div className="
      relative flex w-full
      items-start justify-center
      overflow-hidden bg-transparent
      px-0 py-0
      xl:items-center
    ">

      {/* BACKGROUND EFFECTS */}

      <div className="
        pointer-events-none absolute
        right-0 top-0
        h-72 w-72 rounded-full
        bg-blue-100/40 blur-3xl
      " />

      <div className="
        pointer-events-none absolute
        bottom-0 left-0
        h-56 w-56 rounded-full
        bg-indigo-100/30 blur-3xl
      " />

      {/* LOGIN CARD */}

      <div className="
        relative z-10
        w-full max-w-md
        rounded-2xl
        border border-slate-200
        bg-white p-5
        shadow-2xl

        sm:max-w-lg sm:rounded-3xl sm:p-9

        xl:max-w-[520px]
        xl:p-12
      ">

        {/* HEADER */}

        <div className="
          mb-7 flex flex-col items-center
          sm:mb-9
          xl:mb-10
        ">

          <div className="
            mb-4 flex h-14 w-14
            items-center justify-center
            rounded-full border-2 border-blue-600

            sm:mb-5 sm:h-16 sm:w-16

            xl:mb-6 xl:h-20 xl:w-20
          ">

            <UserCircle2
              size={36}
              strokeWidth={1.8}
              className="
                text-blue-600
                xl:h-11 xl:w-11
              "
            />

          </div>

          <h1 className="
            text-center
            text-[26px]
            font-bold
            text-slate-900

            md:text-3xl

            xl:text-[40px]
            xl:leading-tight
          ">
            Welcome Back!
          </h1>

          <p className="
            mt-2
            text-center
            text-[13px]
            text-slate-500

            md:text-base

            xl:mt-3
            xl:text-lg
          ">
            Sign in to continue to your account
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}

          <div className="mb-5 xl:mb-7">

            <label className="
              mb-2 block
              text-sm
              font-semibold
              text-slate-700

              xl:mb-3
              xl:text-[17px]
            ">
              Email / Registration No.
            </label>

            <div className="
              flex h-12 items-center
              rounded-xl
              border border-slate-300
              px-4
              transition-all duration-200

              focus-within:border-blue-500
              focus-within:ring-2
              focus-within:ring-blue-100

              xl:h-14 xl:px-5
            ">

              <Mail
                size={18}
                className="
                  mr-3 shrink-0
                  text-slate-400
                  xl:h-5 xl:w-5
                "
              />

              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="username"
                disabled={loading}
                className="
                  w-full min-w-0
                  bg-transparent
                  text-[14px]
                  outline-none
                  placeholder:text-slate-400

                  xl:text-[17px]
                "
              />

            </div>

            {errors.email && (
              <p className="mt-2 text-xs text-red-500 xl:text-sm">
                {errors.email}
              </p>
            )}

          </div>

          {/* PASSWORD */}

          <div className="mb-5 xl:mb-7">

            <label className="
              mb-2 block
              text-sm
              font-semibold
              text-slate-700

              xl:mb-3
              xl:text-[17px]
            ">
              Password
            </label>

            <div className="
              flex h-12 items-center
              rounded-xl
              border border-slate-300
              px-4
              transition-all duration-200

              focus-within:border-blue-500
              focus-within:ring-2
              focus-within:ring-blue-100

              xl:h-14 xl:px-5
            ">

              <Lock
                size={18}
                className="
                  mr-3 shrink-0
                  text-slate-400
                  xl:h-5 xl:w-5
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
                className="
                  w-full min-w-0
                  bg-transparent
                  text-[14px]
                  outline-none
                  placeholder:text-slate-400

                  xl:text-[17px]
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="
                  ml-2 shrink-0
                  text-slate-400
                  transition hover:text-blue-600
                "
              >

                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}

              </button>

            </div>

            {errors.password && (
              <p className="mt-2 text-xs text-red-500 xl:text-sm">
                {errors.password}
              </p>
            )}

          </div>

          {/* REMEMBER ME & FORGOT PASSWORD */}

          <div className="
            mb-7
            flex flex-wrap
            items-center justify-between
            gap-3
            text-xs

            md:text-sm

            xl:mb-9
            xl:text-[15px]
          ">

            <label className="
              flex cursor-pointer
              items-center gap-2
            ">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                disabled={loading}
                className="
                  h-4 w-4
                  rounded border-slate-300
                  accent-blue-600

                  xl:h-5 xl:w-5
                "
              />

              <span className="text-slate-600">
                Remember me
              </span>

            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="
                font-medium
                text-blue-600
                transition
                hover:text-blue-700
                hover:underline
              "
            >
              Forgot Password?
            </button>

          </div>

          {/* SIGN IN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              flex h-12 w-full
              items-center justify-center
              gap-2 rounded-xl

              bg-gradient-to-r
              from-blue-600 to-blue-700

              text-[15px]
              font-semibold
              text-white

              shadow-lg
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
              active:scale-[0.98]

              disabled:cursor-not-allowed
              disabled:opacity-70

              md:text-base

              xl:h-14
              xl:text-lg
            "
          >

            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}

          </button>

        </form>

        {/* DIVIDER */}

        <div className="my-6 flex items-center xl:my-8">

          <div className="h-px flex-1 bg-slate-200" />

          <span className="
            mx-4
            text-xs
            font-medium
            uppercase
            tracking-wider
            text-slate-400

            xl:text-sm
          ">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-200" />

        </div>

        {/* REGISTER */}

        <div className="text-center">

          <span className="
            text-[13px]
            text-slate-500

            md:text-sm
            xl:text-base
          ">
            Need to Register?
          </span>

          <button
            type="button"
            onClick={handleRegister}
            className="
              ml-2
              text-[13px]
              font-semibold
              text-blue-600

              transition-all duration-200
              hover:text-blue-700
              hover:underline

              md:text-sm
              xl:text-base
            "
          >
            Register Here
          </button>

        </div>

        {/* FOOTER */}

        <div className="
          mt-6
          border-t border-slate-100
          pt-5

          xl:mt-8
          xl:pt-6
        ">

          <div className="
            flex flex-wrap
            items-center justify-center
            gap-2
            text-xs
            text-slate-500

            xl:text-sm
          ">

            <Headphones
              size={16}
              className="xl:h-5 xl:w-5"
            />

            <span>
              Need Help?
            </span>

            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "mailto:support@christuniversity.in";
              }}
              className="
                font-semibold
                text-blue-600
                transition-all duration-200
                hover:text-blue-700
                hover:underline
              "
            >
              Contact Support
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginCard;
