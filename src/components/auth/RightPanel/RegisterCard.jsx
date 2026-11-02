
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  UserPlus2,
  BadgeCheck,
  Mail,
  Info,
  Send,
} from "lucide-react";

const RegisterCard = ({ onRegister }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    registrationNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input

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

  // Validation

  const validate = () => {
    const newErrors = {};

    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber =
        "Registration Number is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email =
          "Please enter a valid email address.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (onRegister) {
      onRegister({
        ...formData,
        email: formData.email.trim(),
      });
    }
  };

  // Navigation

  const handleBackToLogin = () => {
    navigate("/login");
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

        <div className="mb-7 flex flex-col items-center sm:mb-8">

          <div className="
            mb-4 flex h-14 w-14 items-center
            justify-center rounded-full
            border-2 border-blue-600
            sm:mb-5 sm:h-16 sm:w-16
          ">

            <UserPlus2
              size={34}
              strokeWidth={2}
              className="text-blue-600"
            />

          </div>

          <h1 className="
            text-center text-2xl font-bold
            text-slate-900 sm:text-3xl
          ">
            Create Your Account
          </h1>

          <p className="
            mt-2 text-center text-xs
            text-slate-500 sm:text-sm
          ">
            Please provide your details to register
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Registration Number */}

          <div className="mb-5">

            <label className="
              mb-2 block text-sm font-semibold
              text-slate-700
            ">
              Registration Number
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="
              flex h-12 items-center rounded-xl
              border border-slate-300 px-4
              transition-all duration-200
              focus-within:border-blue-500
              focus-within:ring-2
              focus-within:ring-blue-100
            ">

              <BadgeCheck
                size={18}
                className="mr-3 shrink-0 text-slate-400"
              />

              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Enter your registration number"
                required
                className="
                  w-full min-w-0 bg-transparent
                  text-sm outline-none
                  placeholder:text-slate-400
                "
              />

            </div>

            {errors.registrationNumber && (
              <p className="mt-2 text-xs text-red-500">
                {errors.registrationNumber}
              </p>
            )}

          </div>

          {/* Email */}

          <div className="mb-5">

            <label className="
              mb-2 block text-sm font-semibold
              text-slate-700
            ">
              University Email Address
              <span className="ml-1 text-red-500">*</span>
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
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your CHRIST email"
                required
                className="
                  w-full min-w-0 bg-transparent
                  text-sm outline-none
                  placeholder:text-slate-400
                "
              />

            </div>

            {errors.email && (
              <p className="mt-2 text-xs text-red-500">
                {errors.email}
              </p>
            )}

          </div>

          {/* Information Box */}

          <div className="
            mb-6 flex items-start gap-3
            rounded-xl border border-blue-100
            bg-blue-50 px-3 py-3
            sm:px-4
          ">

            <Info
              size={18}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <p className="
              text-xs leading-6 text-slate-600
            ">
              A verification link will be sent to your
              university email address. Please verify
              your email before you can access the
              Mentor–Mentee Management System.
            </p>

          </div>

          {/* Register Button */}

          <button
            type="submit"
            className="
              flex h-12 w-full items-center
              justify-center gap-2 rounded-xl
              bg-gradient-to-r from-blue-600
              to-blue-700 text-sm font-semibold
              text-white shadow-lg
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
              active:scale-[0.98]
            "
          >

            <Send size={18} />

            Register

          </button>

        </form>

        {/* Divider */}

        <div className="my-6 flex items-center">

          <div className="h-px flex-1 bg-slate-200" />

          <span className="
            mx-4 text-xs font-medium
            uppercase tracking-wider
            text-slate-400
          ">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-200" />

        </div>

        {/* Back To Login */}

        <div className="text-center">

          <span className="text-xs text-slate-500 sm:text-sm">
            Already have an account?
          </span>

          <button
            type="button"
            onClick={handleBackToLogin}
            className="
              ml-2 text-xs font-semibold
              text-blue-600 transition-all
              duration-200 hover:text-blue-700
              hover:underline sm:text-sm
            "
          >
            Sign In
          </button>

        </div>

        {/* Footer */}

        <div className="mt-6 border-t border-slate-100 pt-5">

          <div className="
            flex flex-wrap items-center
            justify-center gap-2
            text-xs text-slate-500
          ">

            <Mail size={16} />

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

    </div>
  );
};

export default RegisterCard;
