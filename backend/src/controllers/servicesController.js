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

module.exports = {
  getServices,
};
