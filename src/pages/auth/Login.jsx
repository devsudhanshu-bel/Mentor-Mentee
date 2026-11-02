
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/auth.api";

import LeftCard from "../../components/auth/LeftCard";
import FeatureStrip from "../../components/auth/FeatureStrip";
import LoginCard from "../../components/auth/RightPanel/LoginCard";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ========================================================
  // BACKEND LOGIN
  // ========================================================

  const handleLogin = async (data) => {
    try {
      setLoading(true);

      const response = await login(data.email, data.password);
      const { user } = response.data;

      switch (user.role) {
        case "ADMIN":
        case "SYSTEM_ADMIN":
          navigate("/admin/dashboard");
          break;

        case "MENTOR":
          navigate(
            user.mustChangePassword
              ? "/change-password"
              : "/mentor/dashboard"
          );
          break;

        case "STUDENT":
          navigate(
            user.mustChangePassword
              ? "/change-password"
              : "/student/dashboard"
          );
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      grid min-h-screen
      grid-cols-1
      overflow-x-hidden
      bg-[#F8FAFC]
      xl:grid-cols-[56%_44%]
    ">

      {/* ==================================================
          LEFT SECTION
          ================================================== */}

      <section className="
        relative flex
        h-[110px] flex-col
        bg-[#F5F9FF]
        sm:h-[130px]
        xl:h-auto xl:min-h-screen
      ">

        {/* LOGO AND DESKTOP ILLUSTRATION */}

        <div className="min-h-0 flex-1">
          <LeftCard />
        </div>

        {/* DESKTOP FEATURE STRIP */}

        <div className="hidden xl:block">
          <FeatureStrip />
        </div>

      </section>

      {/* ==================================================
          RIGHT SECTION - LOGIN
          ================================================== */}

      <section className="
        relative flex min-h-0 w-full
        items-start justify-center
        bg-gradient-to-br
        from-slate-50 via-white to-blue-50
        px-4 pt-3 pb-8
        sm:px-8 sm:pt-5 sm:pb-10
        xl:min-h-screen
        xl:items-center
        xl:px-10 xl:py-10
      ">

        <LoginCard
          onLogin={handleLogin}
          loading={loading}
        />

      </section>

    </div>
  );
};

export default Login;
