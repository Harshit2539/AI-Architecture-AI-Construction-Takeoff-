import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    jobTitle: "",
    companySize: "",
    projectType: "",
    role: "",
    password: "",
  });

  const [userId, setUserId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateUserId = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `us00-${randomNumber}`;
  };

  const mapCompanySizeToMaxUsers = (size) => {
    switch (size) {
      case "1-10":
        return 10;
      case "11-51":
        return 50;
      case "51-100":
        return 100;
      default:
        return 10;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1️⃣ Check if company exists or create it
      let companyId = null;
      const companyResponse = await fetch(
        `${apiUrl}/api/companies?name=${formData.companyName}`
      );
      const companies = await companyResponse.json();

      if (companies.length > 0) {
        companyId = companies[0]._id;
      } else {
        // Create new company
        const newCompanyResponse = await fetch(
          `${apiUrl}/api/companies`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.companyName,
              maxUsers: mapCompanySizeToMaxUsers(formData.companySize),
            }),
          }
        );
        const newCompany = await newCompanyResponse.json();
        companyId = newCompany.company._id;
      }

      const userResponse = await fetch(
        `${apiUrl}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            companyId: companyId,
            role: formData.role.toLowerCase(), // ✅ ensures enum validation passes
            projectType: formData.projectType,
            userId: generateUserId(),
          }),
        }
      );

      const result = await userResponse.json();

      if (userResponse.ok) {
        alert(
          `Account created successfully! Your User ID: ${result.user.userId || "N/A"}`
        );
        navigate("/signin");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl border border-[#1b263b]">
        {/* Left Side - Branding */}
        <div className="w-full md:w-[35%] bg-gradient-to-br from-[#1b263b] to-[#415a77] p-6 flex flex-col justify-center items-center text-white">
          <div className="text-center mb-8">
            <img
              src="/assets/images/logo.png"
              alt="BCBP Logo"
              className="h-16 w-48 object-contain mx-auto mb-6"
            />
            <h1 className="text-2xl font-bold mb-3 text-white">Welcome to BCBP</h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              Join thousands of construction professionals managing their projects efficiently with our platform.
            </p>
          </div>

          <div className="mt-8 space-y-4 w-full max-w-xs">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue bg-opacity-10 backdrop-blur-sm">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-200">Project Management</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue bg-opacity-10 backdrop-blur-sm">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-200">Team Collaboration</span>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue bg-opacity-10 backdrop-blur-sm">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-200">Real-time Analytics</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-[65%] bg-[#0d1b2a] p-8 md:p-10 border-t md:border-t-0 md:border-l border-[#1b263b]">
          <div className="text-center mb-8">
            <h2 className="text-white text-xl font-bold mb-2">Create Account</h2>
            <p className="text-gray-400 text-sm">Fill in your details to get started</p>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center space-x-2 bg-[#1b263b] hover:bg-[#243447] text-white py-2.5 rounded-md transition-colors duration-200">
              <FcGoogle size={18} />
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-[#1b263b] hover:bg-[#243447] text-white py-2.5 rounded-md transition-colors duration-200">
              <FaLinkedin size={18} className="text-blue-400" />
              <span className="text-sm">LinkedIn</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0d1b2a] text-gray-400">Or continue with email</span>
            </div>
          </div>

      
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#1b263b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Last Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#1b263b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Work Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your work email"
                required
                className="w-full px-4 py-3 rounded-lg bg-[#1b263b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Company Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#1b263b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Job Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Job Title"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#1b263b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Dropdown Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Company Size <span className="text-red-400">*</span>
                </label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#1b263b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-51">11-51 employees</option>
                  <option value="51-100">51-100 employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Project Type <span className="text-red-400">*</span>
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#1b263b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select type</option>
                  <option value="Commercial Construction">Commercial Construction</option>
                  <option value="Industrial Construction">Industrial Construction</option>
                  <option value="Infrastructure Construction">Infrastructure Construction</option>
                  <option value="Revolutional Construction">Revolutional Construction</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Role <span className="text-red-400">*</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#1b263b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select role</option>
                  <option value="admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User Supervisor">Supervisor</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-lg bg-[#1b263b] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
              >
                Sign In
              </Link>
            </p>
            <p className="text-gray-500 text-xs mt-4">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
