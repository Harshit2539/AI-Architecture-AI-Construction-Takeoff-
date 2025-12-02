  const User = require('../models/User');
  const Company = require('../models/Company');
  const bcrypt = require('bcryptjs');
  const Team = require('../models/Team');

  // Create user (Admin/Manager)
  exports.createUser = async (req, res) => {
      try {
          const { firstName, lastName, email, password, companyId, role } = req.body;

          const company = await Company.findById(companyId);
          if(!company) return res.status(404).json({ message: "Company not found" });

          if(company.users.length >= company.maxUsers) {
              return res.status(400).json({ message: "Company user limit reached" });
          }

          const existingUser = await User.findOne({ email });
          if(existingUser) return res.status(400).json({ message: "Email already registered" });

          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(password, salt);

          const user = new User({ firstName, lastName, email, passwordHash, companyId, role });
          await user.save();

          company.users.push(user._id);
          await company.save();

          res.status(201).json({ message: "User created successfully", user });
      } catch(err) {
          res.status(500).json({ message: err.message });
      }
  };

  // Get all users (with optional company filter)
  exports.getUsers = async (req, res) => {
      try {
          const { companyId } = req.query;
          const filter = companyId ? { companyId } : {};
          const users = await User.find(filter).populate('companyId', 'name');
          res.json(users);
      } catch(err) {
          res.status(500).json({ message: err.message });
      }
  };
  exports.getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-passwordHash -resetToken -resetExpires');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  // Update user
  exports.updateUser = async (req, res) => {
      try {
          const { id } = req.params;
          const updateData = req.body;

          if(updateData.password) {
              const salt = await bcrypt.genSalt(10);
              updateData.passwordHash = await bcrypt.hash(updateData.password, salt);
              delete updateData.password;
          }

          const user = await User.findByIdAndUpdate(id, updateData, { new: true });
          res.json({ message: "User updated", user });
      } catch(err) {
          res.status(500).json({ message: err.message });
      }
  };

  // Delete user
  // exports.deleteUser = async (req, res) => {
  //     try {
  //         const { id } = req.params;
  //         const user = await User.findByIdAndDelete(id);
  //         if(user) {
  //             // Remove from company users array
  //             await Company.findByIdAndUpdate(user.companyId, { $pull: { users: user._id } });
  //         }
  //         res.json({ message: "User deleted" });
  //     } catch(err) {
  //         res.status(500).json({ message: err.message });
  //     }
  // };
  // controllers/userController.js
  exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      await Team.updateMany(
        { users: user._id },
        { $pull: { users: user._id } }
      );
      await Company.updateOne(
        { _id: user.companyId },
        { $pull: { users: user._id } }
      );
      await User.findByIdAndDelete(id);
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      console.error("Delete user error:", err);
      res.status(500).json({ message: err.message });
    }
  };
