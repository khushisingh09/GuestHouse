// controllers/authController.js
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const UserDto = require("../DTO/UserDTO.js");

// Generate random password
const generatePassword = () => {
  return crypto.randomBytes(8).toString("hex");
};

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use any email service

  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Register a new user
exports.registerUser = async (req, res) => {
  const {
    employerId,
    idProof,
    firstName,
    lastName,
    gender,
    employeeType,
    phone,
    email,
  } = req.body;

  if (
    !employerId ||
    !idProof ||
    !firstName ||
    !lastName ||
    !gender ||
    !employeeType ||
    !phone ||
    !email
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      employerId,
      idProof,
      firstName,
      lastName,
      gender,
      employeeType,
      phone,
      email,
      password: password,
    });

    const response = await user.save();
    // console.log("await user.save() response => ", response);
    // console.log("Email", process.env.EMAIL);
    // console.log("Password", process.env.EMAIL_PASSWORD);

    // Send email with credentials
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your Guesthouse Booking System Credentials",
      text: `Welcome to the Guesthouse Booking System.Your username is ${email} and your password is ${password}`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Error sending email", error });
      } else {
        res
          .status(200)
          .json({ message: "User registered successfully and email sent" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Authenticate user and get token
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userData = {};

    res.json({ token, user: new UserDto(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("email", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("email got", email);
    const password = generatePassword();
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    // Send email with new password
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your New Guesthouse Booking System Password",
      text: `Your password has been reset.Your new password is ${password}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log(info.response);
        res
          .status(200)
          .json({
            message: "New password sent to your email",
            response: info.response,
          });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.fetchUser = async (req, res) => {
    const token = req.header('token');
    console.log("Received Token:", token);

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Please authenticate using a valid token',
        });
    }

    try {
        console.log("JWT Secret Key:", process.env.JWT_SECRET);
        const data = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token Data:", data);
        const user = await User.findById(data.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found',
            });
        }

        return res.json({
            user: new UserDto(user),
        });
    } catch (error) {
        console.error("Token Verification Error:", error);
        return res.status(401).json({
            success: false,
            error: 'Please authenticate using a valid token',
        });
    }
};