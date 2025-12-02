import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // const [adminEmail, setAdminEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState(""); 
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setError("");

    try {
      
      // const adminVerify = await fetch(
      //   `${apiUrl}/api/auth/admin-verify`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ adminEmail }),
      //   }
      // );

      // const verifyData = await adminVerify.json();

      // if (!adminVerify.ok) {
      //   setError(verifyData.message || "Admin verification failed");
      //   setIsSubmitting(false);
      //   return;
      // }

      const response = await fetch(
        `${apiUrl}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link sent successfully to your email.");
        setTimeout(() => navigate("/signin"), 2000); 
      } else {
        setError(data.message || "Failed to send reset link.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center px-4">
      <div className="bg-[#0d1b2a] w-full max-w-md rounded-xl shadow-lg p-8 border border-[#1b263b]">
        <div className="flex justify-center mb-8">
          <img
            src="/assets/images/logo.png"
            alt="BCBP Logo"
            className="h-16 w-100 object-contain"
          />
        </div>

        <h2 className="text-white text-lg font-semibold text-center mb-6">
          Forgot Password
        </h2>

        <p className="text-gray-400 text-sm text-center mb-4">
          Enter your registered email and admin email for authorization.
        </p>

        {message && <p className="text-green-400 text-sm text-center mb-4">{message}</p>}
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#1b263b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* <div>
            <label className="block text-sm text-gray-300 mb-1">
              Admin Authorization Email
            </label>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#1b263b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter admin’s email"
              required
            />
          </div> */}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-600 cursor-not-allowed flex items-center justify-center"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Back to{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
