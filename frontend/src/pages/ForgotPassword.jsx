import axios from "axios";
import React, { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
function ForgotPassword() {

  const primaryColor = "#0f766e"; // Deep Teal
  const hoverColor = "#0d9488"; // Lighter Teal
  const bgColor = "#f0fdfa"; // Very Light Teal/Mint background
  const borderColor = "#e2e8f0"; // Soft Slate border
  
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
      setStep(2);
      setLoading(false);
    } catch (error) {
      setErr(error.response.data.message);
      setLoading(false);
    }
  };
  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
      setStep(3);
      setLoading(false);
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };
  const handleResetPassword = async () => {
    if (newPassword != confirmPassword) {
      return null;
    }
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );
      setErr("");
      console.log(result);
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    <div
      className="flex w-full items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border-[1px]"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div
            className="p-1 rounded-full hover:bg-teal-50 transition-colors cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            <IoIosArrowRoundBack size={32} style={{ color: primaryColor }} />
          </div>
          <h1
            className="text-2xl font-extrabold text-center"
            style={{ color: primaryColor }}
          >
            Forgot Password
          </h1>
        </div>

        {step === 1 && (
          <div>
            <p className="text-slate-500 mb-6 text-sm">
              Enter your email address and we'll send you an OTP to reset your
              password.
            </p>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-slate-700 font-medium mb-1 text-sm"
              >
                Email Address
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all"
                style={{ border: `1px solid ${borderColor}` }}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <button
              className="w-full font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center text-white"
              onClick={handleSendOtp}
              disabled={loading}
              style={{ backgroundColor: primaryColor }}
              onMouseOver={(e) => (e.target.style.backgroundColor = hoverColor)}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = primaryColor)
              }
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Send OTP"}
            </button>
            {err && (
              <p className="text-red-500 text-sm text-center mt-4 font-medium">
                ! {err}
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-slate-500 mb-6 text-sm">
              Please enter the verification code sent to <b>{email}</b>
            </p>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-slate-700 font-medium mb-1 text-sm"
              >
                Verification Code
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all tracking-widest text-center text-lg font-bold"
                style={{ border: `1px solid ${borderColor}` }}
                placeholder="0 0 0 0 0 0"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
              />
            </div>
            <button
              className="w-full font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center text-white"
              onClick={handleVerifyOtp}
              disabled={loading}
              style={{ backgroundColor: primaryColor }}
              onMouseOver={(e) => (e.target.style.backgroundColor = hoverColor)}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = primaryColor)
              }
            >
              {loading ? <ClipLoader size={20} color="white" /> : "Verify Code"}
            </button>
            {err && (
              <p className="text-red-500 text-sm text-center mt-4 font-medium">
                ! {err}
              </p>
            )}
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-slate-500 mb-6 text-sm">
              Create a strong new password for your account.
            </p>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-slate-700 font-medium mb-1 text-sm"
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all"
                style={{ border: `1px solid ${borderColor}` }}
                placeholder="••••••••"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="ConfirmPassword"
                className="block text-slate-700 font-medium mb-1 text-sm"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-100 focus:outline-none transition-all"
                style={{ border: `1px solid ${borderColor}` }}
                placeholder="••••••••"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>
            <button
              className="w-full font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center text-white"
              onClick={handleResetPassword}
              disabled={loading}
              style={{ backgroundColor: primaryColor }}
              onMouseOver={(e) => (e.target.style.backgroundColor = hoverColor)}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = primaryColor)
              }
            >
              {loading ? (
                <ClipLoader size={20} color="white" />
              ) : (
                "Update Password"
              )}
            </button>
            {err && (
              <p className="text-red-500 text-sm text-center mt-4 font-medium">
                ! {err}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
