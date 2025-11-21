const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const News = require("../models/news.model");
const Podcast = require("../models/podcast.model");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { email, password, adminCode } = req.body;

    if (!email || !password)
      return res
        .json({ error: "Email or Password field is missing" })
        .status(400);

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.json({ error: "Email already in use" }).status(409);
    const role = adminCode === process.env.ADMIN_SECRET_KEY ? "admin" : "user";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, role });

    user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.status(201).json({
      token,
      user: { email: user.email, role: user.role },
      message: "User created successfully",
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message | "Signup failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res
      .status(200)
      .json({ token, user: { email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: error.message | "Login failed" });
  }
};

const updateUser = async (req, res) => {
  const jwt_userId = req.user.id;
  const userId = req.params.id;
  const body = req.body;

  try {
    if (jwt_userId !== userId && req.user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!body) {
      return res.status(400).json({ message: "Invalid data" });
    }

    if (body?.role && req.user.role !== "admin") {
      delete body.role;
    }

    const user = await User.findByIdAndUpdate(userId, body, { new: true });

    res.status(200).json({
      user: { email: user.email, name: user?.name, role: user.role },
      message: "Update successful",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const jwt_userId = req.user.id; // from token
  const userId = req.params.id; // from URL

  try {
    // Allow if user is deleting their own account OR if admin
    if (jwt_userId !== userId && req.user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Delete the user
    if (!user) return res.status(404).json({ message: "User not found" });
    const user = await User.findByIdAndDelete(userId);

    // Cascade delete related data
    await News.deleteMany({ user: userId }); // delete all news authored by user
    await Podcast.deleteMany({ user: userId }); // delete all podcasts created by user
    // Add other collections as needed (comments, likes, etc.)

    res
      .status(200)
      .json({ message: "User and related data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signup, login, updateUser, deleteUser };
