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

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email or Registration Number is required.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading || !validate()) return;

    onLogin?.({ ...formData, rememberMe });
  };

  const handleRegister = () => navigate("/register");
  const handleForgotPassword = () => navigate("/forgot-password");

  return (
    <div className="relative flex w-full min-w-0 items-center justify-center bg-transparent px-0 py-0">
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-44 w-44 rounded-full bg-indigo-100/30 blur-3xl" />

      <div className="relative z-10 w-full min-w-0 max-w-[448px] rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:rounded-3xl sm:p-7 lg:p-8 xl:py-8">
        {/* HEADER */}
        <div className="mb-5 flex flex-col items-center sm:mb-6">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-600 sm:mb-4 sm:h-14 sm:w-14">
            <UserCircle2 size={30} strokeWidth={1.8} className="text-blue-600 sm:h-8 sm:w-8" />
          </div>

          <h1 className="text-center text-2xl font-bold leading-tight text-slate-900 sm:text-[28px]">
            Welcome Back!
          </h1>

          <p className="mt-1.5 text-center text-xs text-slate-500 sm:text-sm">
            Sign in to continue to your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="mb-4 sm:mb-5">
            <label className="mb-2 block text-xs font-semibold text-slate-700 sm:text-sm">
              Email / Registration No.
            </label>

            <div className="flex h-11 min-w-0 items-center rounded-xl border border-slate-300 px-3.5 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 sm:h-12 sm:px-4">
              <Mail size={17} className="mr-3 shrink-0 text-slate-400" />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="username"
                disabled={loading}
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div className="mb-4 sm:mb-5">
            <label className="mb-2 block text-xs font-semibold text-slate-700 sm:text-sm">
              Password
            </label>

            <div className="flex h-11 min-w-0 items-center rounded-xl border border-slate-300 px-3.5 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 sm:h-12 sm:px-4">
              <Lock size={17} className="mr-3 shrink-0 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="ml-2 shrink-0 text-slate-400 transition hover:text-blue-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
          </div>

          {/* REMEMBER ME & FORGOT PASSWORD */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs sm:mb-6 sm:text-sm">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                disabled={loading}
                className="h-4 w-4 rounded border-slate-300 accent-blue-600"
              />
              <span className="text-slate-600">Remember me</span>
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* SIGN IN */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:h-12 sm:text-[15px]"
          >
            {loading ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-5 flex items-center sm:my-6">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="mx-4 text-[11px] font-medium uppercase tracking-wider text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* REGISTER */}
        <div className="text-center">
          <span className="text-xs text-slate-500 sm:text-sm">Need to Register?</span>
          <button
            type="button"
            onClick={handleRegister}
            className="ml-2 text-xs font-semibold text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline sm:text-sm"
          >
            Register Here
          </button>
        </div>

        {/* SUPPORT */}
        <div className="mt-5 border-t border-slate-100 pt-4 sm:mt-6 sm:pt-5">
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500 sm:text-xs">
            <Headphones size={15} />
            <span>Need Help?</span>
            <button
              type="button"
              onClick={() => {
                window.location.href = "mailto:support@christuniversity.in";
              }}
              className="font-semibold text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline"
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
