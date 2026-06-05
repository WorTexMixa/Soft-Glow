const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [existingUsers] = await db.query(
      `
      SELECT id
      FROM users
      WHERE email = ?
      `,
      [normalizedEmail],
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.query(
      `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
      `,
      [name, normalizedEmail, hashedPassword, "user"],
    );

    const user = {
      id: result.insertId,
      name,
      email: normalizedEmail,
      role: "user",
    };

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [users] = await db.query(
      `
      SELECT id, name, email, password, role, created_at
      FROM users
      WHERE email = ?
      `,
      [normalizedEmail],
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const foundUser = users[0];

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      created_at: foundUser.created_at,
    };

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Failed to login",
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  res.json({
    user: req.user,
  });
};

module.exports = {
  register,
  login,
  getMe,
};
