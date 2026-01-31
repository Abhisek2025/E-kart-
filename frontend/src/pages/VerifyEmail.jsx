import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { MailCheck, MailX, Loader2 } from "lucide-react";

function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("verifying"); 
  // verifying | success | error
  const navigate = useNavigate();

  const verifyEmail = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/user/verify",
        {}, // ⚠️ backend still expects token in header (as per your setup)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus("success");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (token) verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 rounded-3xl shadow-xl text-center w-full max-w-md"
      >
        {/* ICON */}
        <div className="flex justify-center mb-4">
          {status === "verifying" && (
            <Loader2 className="h-10 w-10 text-pink-600 animate-spin" />
          )}
          {status === "success" && (
            <MailCheck className="h-10 w-10 text-green-600" />
          )}
          {status === "error" && (
            <MailX className="h-10 w-10 text-red-600" />
          )}
        </div>

        {/* TEXT */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {status === "verifying" && "Verifying your email..."}
          {status === "success" && "Email Verified Successfully 🎉"}
          {status === "error" && "Verification Failed ❌"}
        </h2>

        <p className="text-sm text-gray-500">
          {status === "verifying" &&
            "Please wait while we confirm your email address."}
          {status === "success" &&
            "Your email has been verified. Redirecting to login..."}
          {status === "error" &&
            "The verification link is invalid or expired. Please try again."}
        </p>
      </motion.div>
    </div>
  );
}

export default VerifyEmail;
