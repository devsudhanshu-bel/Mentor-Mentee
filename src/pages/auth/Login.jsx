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

      // ====================================================
      // REDIRECT BASED ON ROLE
      // ====================================================

      switch (user.role) {
        // --------------------------------------------------
        // ADMIN
        // --------------------------------------------------

        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        // --------------------------------------------------
        // MENTOR
        // --------------------------------------------------

        case "MENTOR":
          navigate("/mentor/dashboard");
          break;

        // --------------------------------------------------
        // STUDENT
        // --------------------------------------------------

        case "STUDENT":
          if (user.mustChangePassword) {
            navigate("/change-password");
          } else {
            navigate("/student/dashboard");
          }
          break;

        // --------------------------------------------------
        // FALLBACK
        // --------------------------------------------------

        default:
          navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to login. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[56%_44%] bg-[#F8FAFC]">
      {/* ==================================================
          LEFT SECTION
          ================================================== */}

      <div className="relative flex flex-col bg-[#EEF5FF]">
        <div className="flex-1">
          <LeftCard />
        </div>

        <FeatureStrip />
      </div>

      {/* ==================================================
          RIGHT SECTION
          ================================================== */}

      <div className="relative flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <LoginCard onLogin={handleLogin} loading={loading} />
      </div>
    </div>
  );
};

export default Login;
