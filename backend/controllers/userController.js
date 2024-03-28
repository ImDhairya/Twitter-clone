import {User} from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const Register = async (req, res) => {
  try {
    const {name, username, email, password} = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({email});

    if (user) {
      return res.status(400).json({
        message: "User Already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Accound created successfully ",
      success: true,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({
        message: "User doesnot ",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(user.password, password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect email or pass",
        success: false,
      });
    }

    const token = await jwt.sign({userId: user._id}, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(201)
      .cookie("token", token, {expiresIn: "1d", httpOnly: true})
      .json({
        messagee: `Welcome back ${user.name}`,
        success: true,
      });
  } catch (error) {}
};

export const Logout = async (req, res) => {
  return res.cookie("token", "", {expiresIn: new Date(Date.now())}).json({
    message: "User logged out successfulluy",
    success: true,
  });
};
