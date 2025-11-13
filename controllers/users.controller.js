const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
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

module.exports = { signup, login };
