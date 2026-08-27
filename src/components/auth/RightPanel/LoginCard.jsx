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
} from "lucide-react";

const LoginCard = ({ onLogin }) => {
  //---------------------------------------------------------
  // React Router
  //---------------------------------------------------------

  const navigate = useNavigate();

  //---------------------------------------------------------
  // State
  //---------------------------------------------------------

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  //---------------------------------------------------------
  // Handle Input Change
  //---------------------------------------------------------

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

  //---------------------------------------------------------
  // Validation
  //---------------------------------------------------------

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email =
        "Email or Registration Number is required.";
    }

    if (!formData.password.trim()) {
      newErrors.password =
        "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  //---------------------------------------------------------
  // Login Submit
  //---------------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (onLogin) {
      onLogin({
        ...formData,
        rememberMe,
      });
    }
  };

  //---------------------------------------------------------
  // Navigation
  //---------------------------------------------------------

  const handleRegister = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  //---------------------------------------------------------
  // UI
  //---------------------------------------------------------

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-10">
      {/* Background */}

      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-indigo-100/30 blur-3xl" />

      {/* Card */}

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
        {/* Header */}

        <div className="mb-8 flex flex-col items-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-blue-600">
            <UserCircle2
              size={36}
              strokeWidth={1.8}
              className="text-blue-600"
            />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back!
          </h1>

          <p className="mt-2 text-center text-sm text-slate-500">
            Sign in to continue to your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
                      {/* Email */}

          <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email / Registration No.
            </label>

            <div className="flex h-12 items-center rounded-xl border border-slate-300 px-4 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

              <Mail
                size={18}
                className="mr-3 text-slate-400"
              />

              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />

            </div>

            {errors.email && (
              <p className="mt-2 text-xs text-red-500">
                {errors.email}
              </p>
            )}

          </div>

          {/* Password */}

          <div className="mb-5">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <div className="flex h-12 items-center rounded-xl border border-slate-300 px-4 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

              <Lock
                size={18}
                className="mr-3 text-slate-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 transition hover:text-blue-600"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            {errors.password && (
              <p className="mt-2 text-xs text-red-500">
                {errors.password}
              </p>
            )}

          </div>

          {/* Remember Me & Forgot Password */}

          <div className="mb-7 flex items-center justify-between text-sm">

            <label className="flex cursor-pointer items-center gap-2">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 rounded border-slate-300 accent-blue-600"
              />

              <span className="text-slate-600">
                Remember me
              </span>

            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </button>

          </div>

          {/* Sign In */}

          <button
            type="submit"
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-blue-700
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

            <LogIn size={18} />

            Sign In

          </button>

        </form>
                {/* Divider */}

        <div className="my-6 flex items-center">

          <div className="h-px flex-1 bg-slate-200" />

          <span className="mx-4 text-xs font-medium uppercase tracking-wider text-slate-400">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-200" />

        </div>

        {/* Register */}

        <div className="text-center">

          <span className="text-sm text-slate-500">
            Need to Register?
          </span>

          <button
            type="button"
            onClick={handleRegister}
            className="
              ml-2
              text-sm
              font-semibold
              text-blue-600
              transition-all
              duration-200
              hover:text-blue-700
              hover:underline
              cursor-pointer
            "
          >
            Register Here
          </button>

        </div>

        {/* Footer */}

        <div className="mt-6 border-t border-slate-100 pt-5">

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">

            <Headphones size={16} />

            <span>
              Need Help?
            </span>

            <button
              type="button"
              onClick={() => window.location.href = "mailto:support@christuniversity.in"}
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

    </div>
  );
};

export default LoginCard;