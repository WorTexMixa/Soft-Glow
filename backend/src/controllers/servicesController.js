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

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Service title is required",
      });
    }

    const [result] = await db.query(
      `
      UPDATE services
      SET title = ?, description = ?
      WHERE id = ?
      `,
      [title, description || null, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json({
      message: "Service updated successfully",
      service: {
        id: Number(id),
        title,
        description: description || null,
      },
    });
  } catch (error) {
    console.error("Update service error:", error);

    res.status(500).json({
      message: "Failed to update service",
      error: error.message,
    });
  }
};

module.exports = {
  getServices,
  createService,
  updateService,
};
