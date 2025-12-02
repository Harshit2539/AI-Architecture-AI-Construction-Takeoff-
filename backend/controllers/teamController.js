const Team = require('../models/Team');
const User = require('../models/User');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');

const generateUserId = () => `us00-${Math.floor(1000 + Math.random() * 9000)}`;


exports.createTeam = async (req, res) => {
  try {
    const { name, maxUsers } = req.body;
    const companyId = req.user.companyId;

    if (!maxUsers) {
      return res.status(400).json({ message: "maxUsers is required" });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const teamName = name && name.trim() !== "" ? name.trim() : company.name;

    const existingTeam = await Team.findOne({ name: teamName, companyId });
    if (existingTeam) {
      return res.status(400).json({ message: "Team name already exists" });
    }

    const team = new Team({
      name: teamName,
      companyId,
      maxUsers,
      users: []
    });

    await team.save();

    res.status(201).json({
      message: "Team created successfully",
      team
    });
  } catch (err) {
    console.error("Create team error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const teams = await Team.find({ companyId }).populate('users', '-passwordHash');
    res.status(200).json(teams);
  } catch (err) {
    console.error("Get teams error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maxUsers, status } = req.body;
    const companyId = req.user.companyId;

    const team = await Team.findOne({ _id: id, companyId });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (name && name.trim() !== "") team.name = name.trim();
    if (maxUsers) team.maxUsers = maxUsers;
    if (status) team.status = status;

    await team.save();
    res.status(200).json({ message: "Team updated successfully", team });
  } catch (err) {
    console.error("Update team error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const companyId = req.user.companyId;

    const team = await Team.findOneAndDelete({ _id: id, companyId });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (err) {
    console.error("Delete team error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.addUserToTeam = async (req, res) => {
  try {
    const { teamId, email, password, role, firstName, lastName } = req.body;
    const companyId = req.user.companyId;

    if (!teamId || !email || !password || !role || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validRoles = ['admin', 'manager', 'user', 'supervisor'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const team = await Team.findOne({ _id: teamId, companyId });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (team.users.length >= team.maxUsers) {
      return res.status(400).json({ message: "Team user limit reached" });
    }

    let user = await User.findOne({ email });
    if (user) {
      if (team.users.includes(user._id)) {
        return res.status(400).json({ message: "User is already in the team" });
      }
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      const userId = generateUserId();
      user = new User({
        email,
        passwordHash,
        role,
        companyId,
        firstName,
        lastName,
        userId
      });
      await user.save();

      const company = await Company.findById(companyId);
      company.users.push(user._id);
      await company.save();
    }

    team.users.push(user._id);
    await team.save();

    res.status(201).json({
      message: "User added to team successfully",
      user
    });
  } catch (err) {
    console.error("Add user to team error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
