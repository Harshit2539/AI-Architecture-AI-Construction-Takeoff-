import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

const Settings = () => {
  const [userForm, setUserForm] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "",
  });

  const [companyForm, setCompanyForm] = useState({
    name: "Acme Corp",
    maxUsers: 50,
    status: "Active",
  });

  const handleUserChange = (e) => setUserForm({ ...userForm, [e.target.name]: e.target.value });
  const handleCompanyChange = (e) => setCompanyForm({ ...companyForm, [e.target.name]: e.target.value });

  const handleSaveUser = (e) => {
    e.preventDefault();
    alert("User info saved (static)");
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    alert("Company info saved (static)");
  };

  return (
    <motion.main
      className="flex-1 flex flex-col p-8 space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <header className="flex justify-between items-center mb-6">
        <motion.h1
          className="text-3xl font-bold tracking-wide"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
         My Settings
        </motion.h1>
      </header>

      {/* Personal Info */}
      <motion.section
        className="bg-[#1b263b]/50 border border-[#2d3e56] rounded-2xl p-6 shadow-lg shadow-black/30"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={1}
      >
        <h2 className="text-xl font-semibold mb-5 border-b border-[#2d3e56] pb-2">Personal Info</h2>
        <form onSubmit={handleSaveUser} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
          {["firstName", "lastName", "email", "password"].map((field, i) => (
            <motion.input
              key={field}
              type={field === "password" ? "password" : field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.replace(/^\w/, (c) => c.toUpperCase())}
              value={userForm[field]}
              onChange={handleUserChange}
              className="p-2 rounded border border-[#2d3e56] bg-[#0d1b2a] focus:ring-2 focus:ring-blue-500 transition-all"
              whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
              variants={fadeInUp}
              custom={i + 2}
            />
          ))}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="col-span-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex justify-center items-center transition-all"
            variants={fadeInUp}
            custom={6}
          >
            <Save size={16} className="mr-2" /> Save User Info
          </motion.button>
        </form>
      </motion.section>

      {/* Company Info */}
      <motion.section
        className="bg-[#1b263b]/50 border border-[#2d3e56] rounded-2xl p-6 shadow-lg shadow-black/30"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={7}
      >
        <h2 className="text-xl font-semibold mb-5 border-b border-[#2d3e56] pb-2">Company Info</h2>
        <form onSubmit={handleSaveCompany} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
          <motion.input
            name="name"
            placeholder="Company Name"
            value={companyForm.name}
            onChange={handleCompanyChange}
            className="p-2 rounded border border-[#2d3e56] bg-[#0d1b2a] focus:ring-2 focus:ring-blue-500 transition-all"
            whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
            variants={fadeInUp}
            custom={8}
          />
          <motion.input
            type="number"
            name="maxUsers"
            placeholder="Max Users"
            value={companyForm.maxUsers}
            onChange={handleCompanyChange}
            className="p-2 rounded border border-[#2d3e56] bg-[#0d1b2a] focus:ring-2 focus:ring-blue-500 transition-all"
            whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
            variants={fadeInUp}
            custom={9}
          />
          <motion.select
            name="status"
            value={companyForm.status}
            onChange={handleCompanyChange}
            className="p-2 rounded border border-[#2d3e56] bg-[#0d1b2a] focus:ring-2 focus:ring-blue-500 transition-all"
            whileFocus={{ scale: 1.02 }}
            variants={fadeInUp}
            custom={10}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </motion.select>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="col-span-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex justify-center items-center transition-all"
            variants={fadeInUp}
            custom={11}
          >
            <Save size={16} className="mr-2" /> Save Company Info
          </motion.button>
        </form>
      </motion.section>

      {/* App Preferences */}
      <motion.section
        className="bg-[#1b263b]/50 border border-[#2d3e56] rounded-2xl p-6 shadow-lg shadow-black/30"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={12}
      >
        <h2 className="text-xl font-semibold mb-5 border-b border-[#2d3e56] pb-2">App Preferences</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base"
          variants={fadeInUp}
          custom={13}
        >
          <div>
            <label className="block mb-1">Theme</label>
            <select className="p-2 rounded border border-[#2d3e56] bg-[#0d1b2a] focus:ring-2 focus:ring-blue-500 transition-all">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Notifications</label>
            <select className="p-2 rounded border border-[#2d3e56] bg-[#0d1b2a] focus:ring-2 focus:ring-blue-500 transition-all">
              <option>All</option>
              <option>Important Only</option>
              <option>None</option>
            </select>
          </div>
        </motion.div>
      </motion.section>
    </motion.main>
  );
};

export default Settings;
