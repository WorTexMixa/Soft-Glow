const bcrypt = require("bcrypt");
const db = require("../config/db");

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

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.insertId,
        name,
        email: normalizedEmail,
        role: "user",
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
};

module.exports = {
  register,
};
