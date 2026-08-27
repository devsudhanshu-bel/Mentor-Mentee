import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../api/auth.api";

import LeftCard from "../../components/auth/LeftCard";
import FeatureStrip from "../../components/auth/FeatureStrip";
import LoginCard from "../../components/auth/RightPanel/LoginCard";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //--------------------------------------------------
  // Backend Login
  //--------------------------------------------------

  const handleLogin = async (data) => {
    try {
      setLoading(true);

      const response = await login(
        data.email,
        data.password
      );

      const { token, user } = response.data;

      // Store Authentication
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", user.role);

      // Redirect Based On Role
      switch (user.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "MENTOR":
          navigate("/mentor/dashboard");
          break;

        case "STUDENT":
          navigate("/student/dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to login. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[56%_44%] bg-[#F8FAFC]">
      {/* ========================= Left Section ========================= */}

      <div className="relative flex flex-col bg-[#EEF5FF]">
        <div className="flex-1">
          <LeftCard />
        </div>

        <FeatureStrip />
      </div>

      {/* ========================= Right Section ========================= */}

      <div className="relative flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <LoginCard
          onLogin={handleLogin}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Login;