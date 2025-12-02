const User = require('../models/User');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');



const generateUserId = () => `us00-${Math.floor(1000 + Math.random() * 9000)}`;

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, companyId, role, projectType } = req.body;

 
    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ message: "Company not found" });

  
    if (company.users.length >= company.maxUsers) {
      return res.status(400).json({ message: "Company user limit reached" });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

 
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

  
    const user = new User({
      firstName,
      lastName,
      email,
      passwordHash,
      companyId,
      role,
      projectType,
      userId: generateUserId(),
    });

    await user.save();

  
    company.users.push(user._id);
    await company.save();

   
    res.status(201).json({
      message: "User registered successfully",
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
    // console.log(req);
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (user.status !== "Active") {
      return res.status(403).json({ message: "Your account is not active. Please contact admin." });
    }
    
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    
    const token = jwt.sign(
      { id: user._id, userId: user.userId, role: user.role, companyId: user.companyId, },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    
    res.json({
      message: "Login successfull",
      token,
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



exports.forgotPassword = async (req, res) => {
    
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });



    const resetToken = crypto.randomBytes(32).toString("hex");
    // console.log(resetToken);
    user.resetToken = resetToken;
    user.resetExpires = Date.now() + 15 * 60 * 1000; 
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    if (process.env.USE_SMTP === "true") {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });


      try {
        await transporter.verify();
      } catch (smtpErr) {
        console.error("SMTP verification failed:", smtpErr);
        return res.status(500).json({ message: "SMTP verification failed", error: smtpErr.message });
      }

      try {
        await transporter.sendMail({
          from: `"BCBP Support" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Password Reset Request",
          html: `<p>Hello ${user.firstName},</p>
                 <p>You requested a password reset. Click the link below (valid 15 mins):</p>
                 <a href="${resetLink}" target="_blank">${resetLink}</a>`,
        });
      } catch (mailErr) {
        console.error("SMTP send failed:", mailErr);
        return res.status(500).json({ message: "Failed to send email", error: mailErr.message });
      }

      return res.status(200).json({ message: "Password reset email sent successfully" });
    } else {
      return res.status(200).json({ message: "Reset token generated", resetLink });
    }
  } catch (err) {
    console.error("forgotPassword full error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
      return res.status(400).json({ message: "Token and new password required" });

    const user = await User.findOne({
      resetToken: token,
      resetExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined;
    user.resetExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    if (!token) return res.status(400).json({ message: "Token required" });

    const user = await User.findOne({
      resetToken: token,
      resetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    return res.status(200).json({ message: "Valid token" });
  } catch (err) {
    console.error("Verify reset token error:", err);
    res.status(500).json({ message: "Server error" });
  }
};