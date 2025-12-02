import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;


  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/api/auth/reset-password-verify/${token}`
        );
        const data = await res.json();
        if (res.ok) setValidToken(true);
        else setMessage(data.message || "Invalid or expired token");
      } catch (err) {
        console.error(err);
        setMessage("Server error. Try again.");
      }
    };
    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${apiUrl}/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successful. Redirecting to Sign In...");
        setTimeout(() => navigate("/signin"), 2000);
      } else setError(data.message || "Reset failed");
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }

    setIsSubmitting(false);
  };

  if (!validToken) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-gray-300">
        <p>{message || "Verifying token..."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center px-4">
      <div className="bg-[#0d1b2a] w-full max-w-md rounded-xl shadow-lg p-8 border border-[#1b263b]">
        <h2 className="text-white text-lg font-semibold text-center mb-6">
          Reset Password
        </h2>

        {message && <p className="text-green-400 text-center mb-2">{message}</p>}
        {error && <p className="text-red-400 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-sm text-gray-300 mb-1">New Password</label>
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="w-full px-3 py-2 rounded-md bg-[#1b263b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute right-3 top-9 text-gray-400 cursor-pointer select-none"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? "Hide" : "Show"}
            </span>
          </div>

          <div className="relative">
            <label className="block text-sm text-gray-300 mb-1">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              required
              className="w-full px-3 py-2 rounded-md bg-[#1b263b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              className="absolute right-3 top-9 text-gray-400 cursor-pointer select-none"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md font-semibold text-white ${
              isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
