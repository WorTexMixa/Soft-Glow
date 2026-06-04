const db = require("../config/db");

const getServices = async (req, res) => {
  try {
    const [services] = await db.query(`
      SELECT id, title, description, created_at
      FROM services
      ORDER BY id DESC
    `);

    res.json(services);
  } catch (error) {
    console.error("Get services error:", error);

    res.status(500).json({
      message: "Failed to get services",
      error: error.message,
    });
  }
};

const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Service title is required",
      });
    }

    const [result] = await db.query(
      `
      INSERT INTO services (title, description)
      VALUES (?, ?)
      `,
      [title, description || null],
    );

    res.status(201).json({
      message: "Service created successfully",
      service: {
        id: result.insertId,
        title,
        description: description || null,
      },
    });
  } catch (error) {
    console.error("Create service error:", error);

    res.status(500).json({
      message: "Failed to create service",
      error: error.message,
    });
  }
};

module.exports = {
  getServices,
  createService,
};
