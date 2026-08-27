import React, { useState } from "react";

import LeftCard from "../../components/auth/LeftCard";
import FeatureStrip from "../../components/auth/FeatureStrip";

import RegisterCard from "../../components/auth/RightPanel/RegisterCard";
import VerifyEmailCard from "../../components/auth/RightPanel/VerifyEmailCard";
import EmailVerifiedCard from "../../components/auth/RightPanel/EmailVerifiedCard";

const Register = () => {
  //--------------------------------------------------
  // State
  //--------------------------------------------------

  const [step, setStep] = useState("register");

  const [registeredEmail, setRegisteredEmail] = useState("");

  //--------------------------------------------------
  // Register
  //--------------------------------------------------

  const handleRegister = (data) => {
    console.log("Register Data:", data);

    setRegisteredEmail(data.email);

    // Backend Later
    // If registration succeeds

    setStep("verify");
  };

  //--------------------------------------------------
  // Resend Email
  //--------------------------------------------------

  const handleResend = () => {
    console.log("Resend Email");

    // Backend Later
  };

  //--------------------------------------------------
  // Change Email
  //--------------------------------------------------

  const handleChangeEmail = () => {
    setStep("register");
  };

  //--------------------------------------------------
  // Verification Success
  //--------------------------------------------------

  const handleVerified = () => {
    setStep("verified");
  };

  //--------------------------------------------------
  // UI
  //--------------------------------------------------

  return (
    <div className="grid min-h-screen lg:grid-cols-[56%_44%] bg-[#F8FAFC]">
      {/* ================= Left Section ================= */}

      <div className="relative flex flex-col bg-[#EEF5FF]">

        <div className="flex-1">
          <LeftCard />
        </div>

        <FeatureStrip />

      </div>

      {/* ================= Right Section ================= */}

      <div className="relative flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">

        {step === "register" && (
          <RegisterCard
            onRegister={handleRegister}
          />
        )}

        {step === "verify" && (
          <VerifyEmailCard
            email={registeredEmail}
            onResend={handleResend}
            onChangeEmail={handleChangeEmail}
            onVerified={handleVerified}
          />
        )}

        {step === "verified" && (
          <EmailVerifiedCard />
        )}

      </div>
    </div>
  );
};

export default Register;